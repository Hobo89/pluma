/**
 * How far to shift a scrolling column so a card sits fully inside the wall.
 * Positive values move the card downward. A card taller than the opening
 * is pinned to the top so the quote starts in view.
 */
export function trackNudgeY(
  cardTop: number,
  cardBottom: number,
  safeTop: number,
  safeBottom: number,
): number {
  const cardHeight = cardBottom - cardTop;
  const safeHeight = safeBottom - safeTop;
  if (cardHeight <= 0 || safeHeight <= 0) return 0;

  if (cardHeight > safeHeight) return safeTop - cardTop;
  if (cardTop < safeTop) return safeTop - cardTop;
  if (cardBottom > safeBottom) return safeBottom - cardBottom;
  return 0;
}

/**
 * How far to shift a strip so the card sits in the middle of the viewport.
 * Positive values move the card to the right.
 */
export function trackCenterDelta(
  cardStart: number,
  cardEnd: number,
  viewStart: number,
  viewEnd: number,
): number {
  const cardSize = cardEnd - cardStart;
  const viewSize = viewEnd - viewStart;
  if (!(cardSize > 0) || !(viewSize > 0)) return 0;
  return (viewStart + viewEnd) / 2 - (cardStart + cardEnd) / 2;
}

/**
 * Movement small enough to treat the pointer as still. A card that slides
 * under a parked cursor must not count as a new hover.
 */
export const HOVER_PARK_SLOP_PX = 8;

export function hoverPointerParked(
  x: number,
  y: number,
  anchorX: number,
  anchorY: number,
  slop = HOVER_PARK_SLOP_PX,
): boolean {
  return Math.hypot(x - anchorX, y - anchorY) <= slop;
}

/** True when the pointer is inside the wall's top or bottom fade. */
export function pointerInWallFade(
  pointerY: number,
  wallTop: number,
  wallBottom: number,
  fadeHeight: number,
): boolean {
  if (!(fadeHeight > 0) || !(wallBottom > wallTop)) return false;
  return (
    pointerY <= wallTop + fadeHeight || pointerY >= wallBottom - fadeHeight
  );
}

/** Loop progress for a track whose animation runs from 0 to `-distance`. */
export function loopProgress(translate: number, distance: number): number {
  if (!(distance > 0) || !Number.isFinite(translate)) return 0;
  let progress = -translate / distance;
  progress %= 1;
  if (progress < 0) progress += 1;
  return progress === 0 ? 0 : progress;
}

export type ScrollAxis = "x" | "y";

/**
 * Fold a free drag into the marquee's one-cycle range, `(-distance, 0]`.
 * The visual position stays put; only the stored offset wraps.
 */
export function wrapLoopOffset(offset: number, distance: number): number {
  if (!(distance > 0) || !Number.isFinite(offset)) return 0;
  let wrapped = offset % distance;
  if (wrapped > 0) wrapped -= distance;
  if (Object.is(wrapped, -0) || wrapped === -distance) return 0;
  return wrapped;
}

/**
 * Apply `delta` without leaving the marquee's one-cycle range.
 * `to - from` stays equal to `delta`, so the card still moves the short way.
 */
export function loopedShift(
  current: number,
  delta: number,
  distance: number,
): { from: number; to: number } {
  const toRaw = current + delta;
  if (!(distance > 0) || !Number.isFinite(toRaw)) {
    return { from: current, to: toRaw };
  }
  const to = wrapLoopOffset(toRaw, distance);
  return { from: current + (to - toRaw), to };
}

/**
 * Wheel and trackpad deltas move a column like a scrollable list.
 * Vertical columns follow `deltaY`. A horizontal strip follows whichever
 * delta is stronger, so a mouse wheel still travels along the strip.
 * The result is a content translation: positive wheel values move content
 * toward the start.
 */
export function wheelScrollDelta(
  axis: ScrollAxis,
  deltaX: number,
  deltaY: number,
): number {
  const dominant =
    axis === "y" || Math.abs(deltaY) >= Math.abs(deltaX) ? deltaY : deltaX;
  if (!Number.isFinite(dominant)) return 0;
  return -dominant;
}

/** Fired when a visitor takes over a column, so a resting card lets go. */
export const WALL_SCROLL_EVENT = "pluma:testimonial-wall-scroll";

const DRAG_SLOP_PX = 8;
const WHEEL_RELEASE_MS = 140;
const SCROLL_ANIMATION_NAMES = new Set([
  "psl-testimonial-wall-scroll",
  "psl-testimonial-wall-scroll-x",
]);

const generations = new WeakMap<HTMLElement, number>();
const NUDGE_EASE = "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)";

function readTranslate(element: HTMLElement, axis: ScrollAxis): number {
  const transform = getComputedStyle(element).transform;
  if (!transform || transform === "none") return 0;
  const matrix = new DOMMatrix(transform);
  return axis === "x" ? matrix.m41 : matrix.m42;
}

function writeTranslate(
  element: HTMLElement,
  value: number,
  axis: ScrollAxis,
): void {
  element.style.transform =
    axis === "x" ? `translateX(${value}px)` : `translateY(${value}px)`;
}

function trackAxis(track: HTMLElement): ScrollAxis {
  return track.classList.contains("psl-testimonial-wall__track--horizontal")
    ? "x"
    : "y";
}

function loopDistance(track: HTMLElement, axis: ScrollAxis = "y"): number {
  const style = getComputedStyle(track);
  const gap = Number.parseFloat(axis === "x" ? style.columnGap : style.rowGap);
  const halfGap = Number.isFinite(gap) ? gap / 2 : 6;
  const size = axis === "x" ? track.offsetWidth : track.offsetHeight;
  return size / 2 + halfGap;
}

function safeVerticalBounds(viewport: HTMLElement): {
  top: number;
  bottom: number;
} {
  const wall = viewport.closest(".psl-testimonial-wall");
  const fade = wall
    ? Number.parseFloat(getComputedStyle(wall, "::before").height)
    : 0;
  const inset = (Number.isFinite(fade) ? fade : 0) + 8;
  const rect = viewport.getBoundingClientRect();
  return { top: rect.top + inset, bottom: rect.bottom - inset };
}

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function scrollAnimation(track: HTMLElement): CSSAnimation | undefined {
  return [...track.getAnimations()].find(
    (animation): animation is CSSAnimation =>
      animation instanceof CSSAnimation &&
      SCROLL_ANIMATION_NAMES.has(animation.animationName),
  );
}

function wallOf(viewport: HTMLElement): HTMLElement | null {
  const wall = viewport.closest(".psl-testimonial-wall");
  return wall instanceof HTMLElement ? wall : null;
}

function visitorOwnsScroll(track: HTMLElement): boolean {
  const wall = track.closest(".psl-testimonial-wall");
  return (
    wall instanceof HTMLElement &&
    (wall.hasAttribute("data-user-scroll") ||
      wall.hasAttribute("data-scroll-free"))
  );
}

function gestureInProgress(track: HTMLElement): boolean {
  const wall = track.closest(".psl-testimonial-wall");
  return wall instanceof HTMLElement && wall.hasAttribute("data-user-scroll");
}

function nudgeForCard(
  card: HTMLElement,
  viewport: HTMLElement,
  axis: ScrollAxis,
): number {
  const rect = card.getBoundingClientRect();
  if (axis === "x") {
    const view = viewport.getBoundingClientRect();
    return trackCenterDelta(rect.left, rect.right, view.left, view.right);
  }
  const bounds = safeVerticalBounds(viewport);
  return trackNudgeY(rect.top, rect.bottom, bounds.top, bounds.bottom);
}

function centerCardInScroller(card: HTMLElement, scroller: HTMLElement): void {
  const view = scroller.getBoundingClientRect();
  const rect = card.getBoundingClientRect();
  const delta = trackCenterDelta(rect.left, rect.right, view.left, view.right);
  if (Math.abs(delta) < 1) return;
  scroller.scrollTo({
    left: scroller.scrollLeft - delta,
    behavior: prefersReducedMotion() ? "auto" : "smooth",
  });
}

/**
 * Pause the column and ease the card into place.
 * Vertical columns bring the card fully inside the wall.
 * A horizontal strip centers the card in the viewport.
 * Returns a release function that continues the marquee from the settled spot.
 */
export function holdTestimonialCard(card: HTMLElement): () => void {
  const track = card.closest(".psl-testimonial-wall__track");
  const viewport = card.closest(".psl-testimonial-wall__viewport");
  if (!(track instanceof HTMLElement) || !(viewport instanceof HTMLElement)) {
    return () => {};
  }
  if (viewport.classList.contains("psl-testimonial-wall__viewport--static")) {
    if (viewport.scrollWidth > viewport.clientWidth + 1) {
      centerCardInScroller(card, viewport);
    }
    return () => {};
  }

  const axis = trackAxis(track);
  if (axis === "x" ? gestureInProgress(track) : visitorOwnsScroll(track)) {
    return () => {};
  }
  if (axis === "x") {
    track.closest(".psl-testimonial-wall")?.removeAttribute("data-scroll-free");
  }

  const generation = (generations.get(track) ?? 0) + 1;
  generations.set(track, generation);
  let takenOver = false;
  let frame = 0;

  const stillOwned = () => generations.get(track) === generation;

  const apply = () => {
    if (!stillOwned()) return;
    const delta = nudgeForCard(card, viewport, axis);
    if (!takenOver) {
      if (Math.abs(delta) < 1) return;
      const frozen = readTranslate(track, axis);
      track.style.animationName = "none";
      track.style.transition = "none";
      writeTranslate(track, frozen, axis);
      takenOver = true;
    }
    moveTrack(track, delta, axis, stillOwned);
  };

  frame = window.requestAnimationFrame(apply);
  const observer = new ResizeObserver(() => apply());
  observer.observe(card);

  return () => {
    window.cancelAnimationFrame(frame);
    observer.disconnect();
    if (!stillOwned()) return;
    if (takenOver) releaseTrack(track, axis);
    generations.delete(track);
  };
}

function moveTrack(
  track: HTMLElement,
  delta: number,
  axis: ScrollAxis,
  stillOwned: () => boolean,
): void {
  if (Math.abs(delta) < 1) return;
  const { from, to } = loopedShift(
    readTranslate(track, axis),
    delta,
    loopDistance(track, axis),
  );
  if (prefersReducedMotion()) {
    track.style.transition = "none";
    writeTranslate(track, to, axis);
    delete track.dataset.wallNudge;
    return;
  }

  track.dataset.wallNudge = "1";
  track.style.transition = "none";
  writeTranslate(track, from, axis);
  track.getBoundingClientRect();
  track.style.transition = NUDGE_EASE;
  writeTranslate(track, to, axis);

  const onEnd = (event: TransitionEvent) => {
    if (event.target !== track || event.propertyName !== "transform") return;
    track.removeEventListener("transitionend", onEnd);
    if (!stillOwned()) return;
    delete track.dataset.wallNudge;
  };
  track.addEventListener("transitionend", onEnd);
}

function releaseTrack(track: HTMLElement, axis: ScrollAxis): void {
  resumeTrack(track, axis);
}

/**
 * Stop the marquee and hold the track's current position so a drag or
 * wheel gesture can move it. Bumps the hold generation so a hovered card
 * cannot ease the column back.
 */
function seizeTrack(track: HTMLElement, axis: ScrollAxis): number {
  const generation = (generations.get(track) ?? 0) + 1;
  generations.set(track, generation);
  if (track.dataset.wallDrag === "1") return generation;
  const current = readTranslate(track, axis);
  track.style.animationName = "none";
  track.style.transition = "none";
  writeTranslate(track, current, axis);
  track.dataset.wallDrag = "1";
  delete track.dataset.wallNudge;
  return generation;
}

function shiftTrack(
  track: HTMLElement,
  delta: number,
  axis: ScrollAxis,
): void {
  if (!Number.isFinite(delta) || delta === 0) return;
  const next = wrapLoopOffset(
    readTranslate(track, axis) + delta,
    loopDistance(track, axis),
  );
  track.style.transition = "none";
  writeTranslate(track, next, axis);
}

/** Hand the column back to its looping animation at the position where it was released. */
function resumeTrack(track: HTMLElement, axis: ScrollAxis): void {
  const progress = loopProgress(
    readTranslate(track, axis),
    loopDistance(track, axis),
  );
  const reverse = track.classList.contains(
    "psl-testimonial-wall__track--reverse",
  );
  delete track.dataset.wallDrag;
  delete track.dataset.wallNudge;
  track.style.transition = "none";
  track.style.transform = "";
  track.style.animationName = "";

  const applyTime = () => {
    const animation = scrollAnimation(track);
    const duration = Number(
      animation?.effect?.getComputedTiming().duration ?? 0,
    );
    if (!animation || !(duration > 0)) return false;
    const ratio = reverse ? 1 - progress : progress;
    animation.currentTime = ratio * duration;
    return true;
  };

  if (!applyTime()) window.requestAnimationFrame(applyTime);
}

function trackFromTarget(
  target: EventTarget | null,
  viewport: HTMLElement,
): HTMLElement | null {
  if (!(target instanceof Element)) return null;
  const track = target.closest(".psl-testimonial-wall__track");
  if (!(track instanceof HTMLElement) || !viewport.contains(track)) return null;
  return track;
}

function trackAtPoint(
  viewport: HTMLElement,
  x: number,
  y: number,
): HTMLElement | null {
  const columns = viewport.querySelectorAll<HTMLElement>(
    ".psl-testimonial-wall__column",
  );
  let closest: HTMLElement | null = null;
  let best = Infinity;
  for (const column of columns) {
    const rect = column.getBoundingClientRect();
    const track = column.querySelector(".psl-testimonial-wall__track");
    if (!(track instanceof HTMLElement)) continue;
    if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
      return track;
    }
    const distance = Math.abs(x - (rect.left + rect.width / 2));
    if (distance < best) {
      best = distance;
      closest = track;
    }
  }
  return closest;
}

/**
 * Let a visitor drag or wheel a column in either direction. Releasing the
 * pointer, or letting the wheel settle, continues that column's marquee
 * from the new position.
 */
export function bindTestimonialWallScroll(viewport: HTMLElement): () => void {
  let drag: {
    pointerId: number;
    track: HTMLElement;
    axis: ScrollAxis;
    originX: number;
    originY: number;
    last: number;
    seized: boolean;
    generation: number;
  } | null = null;
  let wheelTrack: HTMLElement | null = null;
  let wheelGeneration = 0;
  let wheelTimer = 0;
  let releaseX = 0;
  let releaseY = 0;
  let watchingRelease = false;

  const wall = () => wallOf(viewport);

  const handBack = (
    track: HTMLElement,
    axis: ScrollAxis,
    generation: number,
  ) => {
    if (generations.get(track) !== generation) return;
    wall()?.removeAttribute("data-user-scroll");
    wall()?.setAttribute("data-scroll-free", "");
    resumeTrack(track, axis);
  };

  const onPointerDown = (event: PointerEvent) => {
    if (event.button !== 0) return;
    const track = trackFromTarget(event.target, viewport);
    if (!track) return;
    const axis = trackAxis(track);
    const origin = axis === "x" ? event.clientX : event.clientY;
    drag = {
      pointerId: event.pointerId,
      track,
      axis,
      originX: event.clientX,
      originY: event.clientY,
      last: origin,
      seized: false,
      generation: 0,
    };
  };

  const onPointerMove = (event: PointerEvent) => {
    if (drag && event.pointerId === drag.pointerId) {
      const point = drag.axis === "x" ? event.clientX : event.clientY;
      if (!drag.seized) {
        const dx = event.clientX - drag.originX;
        const dy = event.clientY - drag.originY;
        if (Math.hypot(dx, dy) < DRAG_SLOP_PX) return;
        const along = drag.axis === "x" ? Math.abs(dx) : Math.abs(dy);
        const across = drag.axis === "x" ? Math.abs(dy) : Math.abs(dx);
        const touchScrollsPage = drag.axis === "y" && event.pointerType === "touch";
        if (across > along || touchScrollsPage) {
          drag = null;
          return;
        }
        window.clearTimeout(wheelTimer);
        if (
          wheelTrack &&
          wheelTrack !== drag.track &&
          generations.get(wheelTrack) === wheelGeneration
        ) {
          resumeTrack(wheelTrack, trackAxis(wheelTrack));
        }
        wheelTrack = null;
        drag.seized = true;
        drag.last = drag.axis === "x" ? drag.originX : drag.originY;
        drag.generation = seizeTrack(drag.track, drag.axis);
        wall()?.setAttribute("data-user-scroll", "");
        wall()?.removeAttribute("data-scroll-free");
        watchingRelease = false;
        window.getSelection()?.removeAllRanges();
        window.dispatchEvent(
          new CustomEvent(WALL_SCROLL_EVENT, {
            detail: { x: event.clientX, y: event.clientY },
          }),
        );
      }
      const delta = point - drag.last;
      drag.last = point;
      shiftTrack(drag.track, delta, drag.axis);
      if (drag.seized) {
        try {
          if (!viewport.hasPointerCapture(event.pointerId)) {
            viewport.setPointerCapture(event.pointerId);
          }
        } catch {
          // A pointer that is already gone cannot be captured.
        }
      }
      event.preventDefault();
      return;
    }

    if (!watchingRelease || drag?.seized) return;
    if (Math.hypot(event.clientX - releaseX, event.clientY - releaseY) <= DRAG_SLOP_PX) {
      return;
    }
    watchingRelease = false;
    wall()?.removeAttribute("data-scroll-free");
  };

  const finishPointer = (event: PointerEvent) => {
    if (!drag || event.pointerId !== drag.pointerId) return;
    const current = drag;
    drag = null;
    if (viewport.hasPointerCapture(event.pointerId)) {
      viewport.releasePointerCapture(event.pointerId);
    }
    if (!current.seized) return;
    releaseX = event.clientX;
    releaseY = event.clientY;
    watchingRelease = true;
    handBack(current.track, current.axis, current.generation);
  };

  const onLeave = () => {
    if (drag?.seized) return;
    watchingRelease = false;
    wall()?.removeAttribute("data-scroll-free");
  };

  const onWheel = (event: WheelEvent) => {
    if (event.ctrlKey) return;
    if (drag?.seized) {
      event.preventDefault();
      return;
    }
    const track = trackAtPoint(viewport, event.clientX, event.clientY);
    if (!track || !viewport.contains(track)) return;
    const axis = trackAxis(track);
    const scale =
      event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? viewport.clientHeight : 1;
    const delta = wheelScrollDelta(
      axis,
      event.deltaX * scale,
      event.deltaY * scale,
    );
    if (delta === 0) return;
    event.preventDefault();
    if (wheelTrack !== track || generations.get(track) !== wheelGeneration) {
      if (
        wheelTrack &&
        wheelTrack !== track &&
        generations.get(wheelTrack) === wheelGeneration
      ) {
        resumeTrack(wheelTrack, trackAxis(wheelTrack));
      }
      wheelGeneration = seizeTrack(track, axis);
      wheelTrack = track;
      wall()?.setAttribute("data-user-scroll", "");
      wall()?.removeAttribute("data-scroll-free");
      watchingRelease = false;
      window.dispatchEvent(
        new CustomEvent(WALL_SCROLL_EVENT, {
          detail: { x: event.clientX, y: event.clientY },
        }),
      );
    }
    shiftTrack(track, delta, axis);
    window.clearTimeout(wheelTimer);
    wheelTimer = window.setTimeout(() => {
      const active = wheelTrack;
      const generation = wheelGeneration;
      wheelTrack = null;
      if (!active || drag?.seized) return;
      releaseX = event.clientX;
      releaseY = event.clientY;
      watchingRelease = true;
      handBack(active, trackAxis(active), generation);
    }, WHEEL_RELEASE_MS);
  };

  viewport.addEventListener("pointerdown", onPointerDown);
  viewport.addEventListener("pointermove", onPointerMove);
  viewport.addEventListener("pointerup", finishPointer);
  viewport.addEventListener("pointercancel", finishPointer);
  const onLostCapture = (event: PointerEvent) => {
    if (event.target !== viewport) return;
    finishPointer(event);
  };

  viewport.addEventListener("lostpointercapture", onLostCapture);
  viewport.addEventListener("pointerleave", onLeave);
  viewport.addEventListener("wheel", onWheel, { passive: false });

  return () => {
    window.clearTimeout(wheelTimer);
    viewport.removeEventListener("pointerdown", onPointerDown);
    viewport.removeEventListener("pointermove", onPointerMove);
    viewport.removeEventListener("pointerup", finishPointer);
    viewport.removeEventListener("pointercancel", finishPointer);
    viewport.removeEventListener("lostpointercapture", onLostCapture);
    viewport.removeEventListener("pointerleave", onLeave);
    viewport.removeEventListener("wheel", onWheel);
    wall()?.removeAttribute("data-user-scroll");
    wall()?.removeAttribute("data-scroll-free");
  };
}
