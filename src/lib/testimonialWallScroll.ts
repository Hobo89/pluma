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
export function loopProgress(translateY: number, distance: number): number {
  if (!(distance > 0) || !Number.isFinite(translateY)) return 0;
  let progress = -translateY / distance;
  progress %= 1;
  if (progress < 0) progress += 1;
  return progress === 0 ? 0 : progress;
}

const generations = new WeakMap<HTMLElement, number>();
const NUDGE_EASE = "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)";

function translateY(element: HTMLElement): number {
  const transform = getComputedStyle(element).transform;
  if (!transform || transform === "none") return 0;
  return new DOMMatrix(transform).m42;
}

function loopDistance(track: HTMLElement): number {
  const gap = Number.parseFloat(getComputedStyle(track).rowGap);
  const halfGap = Number.isFinite(gap) ? gap / 2 : 6;
  return track.offsetHeight / 2 + halfGap;
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
      animation.animationName === "psl-testimonial-wall-scroll",
  );
}

/**
 * Pause the column and ease the card fully inside the visible wall.
 * Returns a release function that continues the marquee from the settled spot.
 */
export function holdTestimonialCard(card: HTMLElement): () => void {
  const track = card.closest(".psl-testimonial-wall__track");
  const viewport = card.closest(".psl-testimonial-wall__viewport");
  if (!(track instanceof HTMLElement) || !(viewport instanceof HTMLElement)) {
    return () => {};
  }
  if (viewport.classList.contains("psl-testimonial-wall__viewport--static")) {
    return () => {};
  }

  const generation = (generations.get(track) ?? 0) + 1;
  generations.set(track, generation);
  let takenOver = false;
  let frame = 0;

  const stillOwned = () => generations.get(track) === generation;

  const apply = () => {
    if (!stillOwned()) return;
    const bounds = safeVerticalBounds(viewport);
    const rect = card.getBoundingClientRect();
    const delta = trackNudgeY(rect.top, rect.bottom, bounds.top, bounds.bottom);
    if (!takenOver) {
      if (Math.abs(delta) < 1) return;
      const frozen = translateY(track);
      track.style.animationName = "none";
      track.style.transition = "none";
      track.style.transform = `translateY(${frozen}px)`;
      takenOver = true;
    }
    moveTrack(track, delta, stillOwned);
  };

  frame = window.requestAnimationFrame(apply);
  const observer = new ResizeObserver(() => apply());
  observer.observe(card);

  return () => {
    window.cancelAnimationFrame(frame);
    observer.disconnect();
    if (!stillOwned()) return;
    generations.delete(track);
    if (takenOver) releaseTrack(track);
  };
}

function moveTrack(
  track: HTMLElement,
  delta: number,
  stillOwned: () => boolean,
): void {
  if (Math.abs(delta) < 1) return;
  const next = translateY(track) + delta;
  if (prefersReducedMotion()) {
    track.style.transition = "none";
    track.style.transform = `translateY(${next}px)`;
    delete track.dataset.wallNudge;
    return;
  }

  track.dataset.wallNudge = "1";
  track.style.transition = "none";
  track.style.transform = `translateY(${translateY(track)}px)`;
  track.getBoundingClientRect();
  track.style.transition = NUDGE_EASE;
  track.style.transform = `translateY(${next}px)`;

  const onEnd = (event: TransitionEvent) => {
    if (event.target !== track || event.propertyName !== "transform") return;
    track.removeEventListener("transitionend", onEnd);
    if (!stillOwned()) return;
    delete track.dataset.wallNudge;
  };
  track.addEventListener("transitionend", onEnd);
}

function releaseTrack(track: HTMLElement): void {
  const y = translateY(track);
  const distance = loopDistance(track);
  const progress = loopProgress(y, distance);
  const reverse = track.classList.contains("psl-testimonial-wall__track--reverse");
  delete track.dataset.wallNudge;
  track.style.transition = "none";
  track.style.transform = "";
  track.style.animationName = "";

  const applyTime = () => {
    const animation = scrollAnimation(track);
    const duration = Number(animation?.effect?.getComputedTiming().duration ?? 0);
    if (!animation || !(duration > 0)) return false;
    const ratio = reverse ? 1 - progress : progress;
    animation.currentTime = ratio * duration;
    return true;
  };

  if (!applyTime()) window.requestAnimationFrame(applyTime);
}
