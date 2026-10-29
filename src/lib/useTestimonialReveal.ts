import {
  useEffect,
  useId,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import {
  hoverPointerParked,
  pointerInWallFade,
} from "./testimonialWallScroll";

const HOVER_QUERY = "(hover: hover) and (pointer: fine)";
const PULSE_MS = 900;
const REVEAL_EVENT = "pluma:testimonial-reveal";

type RevealMode = "hover" | "touch" | null;
type Point = { x: number; y: number };

/** Where the pointer was when the current card took hover. Shared so a card sliding underneath cannot steal it. */
let hoverAnchor: Point | null = null;

function canHover() {
  return window.matchMedia(HOVER_QUERY).matches;
}

function isHoverPointer(pointerType: string) {
  return pointerType === "mouse" || pointerType === "pen";
}

function pointerParked(x: number, y: number) {
  return (
    hoverAnchor !== null &&
    hoverPointerParked(x, y, hoverAnchor.x, hoverAnchor.y)
  );
}

function pointerRestsInFade(card: HTMLElement, pointerY: number) {
  const wall = card.closest(".psl-testimonial-wall");
  if (!(wall instanceof HTMLElement)) return false;
  const rect = wall.getBoundingClientRect();
  const fade = Number.parseFloat(getComputedStyle(wall, "::before").height);
  return pointerInWallFade(
    pointerY,
    rect.top,
    rect.bottom,
    Number.isFinite(fade) ? fade : 0,
  );
}

/**
 * Desktop hover holds the card. Touch toggles a translation, or plays a
 * short lift-and-shine when the quote is already in the reader's language.
 */
export function useTestimonialReveal(canTranslate: boolean) {
  const rootRef = useRef<HTMLElement>(null);
  const instanceId = useId();
  const pointerStart = useRef<Point | null>(null);
  const ownAnchor = useRef<Point | null>(null);
  const pulseTimer = useRef(0);
  const leaveWatch = useRef<((event: PointerEvent) => void) | null>(null);
  const [mode, setMode] = useState<RevealMode>(null);
  const [pulsing, setPulsing] = useState(false);

  function clearLeaveWatch() {
    if (!leaveWatch.current) return;
    window.removeEventListener("pointermove", leaveWatch.current);
    leaveWatch.current = null;
  }

  useEffect(
    () => () => {
      window.clearTimeout(pulseTimer.current);
      clearLeaveWatch();
    },
    [],
  );

  useEffect(() => {
    const onOpen = (event: Event) => {
      const detail = (event as CustomEvent<string>).detail;
      if (detail === instanceId) return;
      setMode((current) => (current === "touch" ? null : current));
    };

    window.addEventListener(REVEAL_EVENT, onOpen);
    return () => window.removeEventListener(REVEAL_EVENT, onOpen);
  }, [instanceId]);

  useEffect(() => {
    if (mode !== "touch") return;

    const close = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (rootRef.current?.contains(target)) return;
      setMode(null);
    };

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMode(null);
    };

    document.addEventListener("pointerdown", close);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", close);
      window.removeEventListener("keydown", onKey);
    };
  }, [mode]);

  function announce() {
    window.dispatchEvent(
      new CustomEvent(REVEAL_EVENT, { detail: instanceId }),
    );
  }

  function stopPulse() {
    window.clearTimeout(pulseTimer.current);
    setPulsing(false);
  }

  function pulse() {
    stopPulse();
    setPulsing(true);
    pulseTimer.current = window.setTimeout(() => setPulsing(false), PULSE_MS);
  }

  function beginHover(x: number, y: number) {
    clearLeaveWatch();
    const point = { x, y };
    hoverAnchor = point;
    ownAnchor.current = point;
    stopPulse();
    announce();
    setMode("hover");
  }

  function onPointerEnter(event: ReactPointerEvent<HTMLElement>) {
    if (!isHoverPointer(event.pointerType) || !canHover()) return;
    if (pointerParked(event.clientX, event.clientY)) return;
    const card = rootRef.current;
    if (card && pointerRestsInFade(card, event.clientY)) return;
    beginHover(event.clientX, event.clientY);
  }

  function onPointerMove(event: ReactPointerEvent<HTMLElement>) {
    if (!isHoverPointer(event.pointerType) || !canHover()) return;
    if (mode !== null) return;
    if (pointerParked(event.clientX, event.clientY)) return;
    const card = rootRef.current;
    if (!card || pointerRestsInFade(card, event.clientY)) return;
    beginHover(event.clientX, event.clientY);
  }

  function releaseHover() {
    ownAnchor.current = null;
    setMode((current) => (current === "hover" ? null : current));
  }

  function onPointerLeave(event: ReactPointerEvent<HTMLElement>) {
    if (!isHoverPointer(event.pointerType)) return;
    const card = rootRef.current;
    const mine = ownAnchor.current;
    if (
      card &&
      mine &&
      hoverPointerParked(event.clientX, event.clientY, mine.x, mine.y)
    ) {
      clearLeaveWatch();
      const onMove = (move: PointerEvent) => {
        if (hoverPointerParked(move.clientX, move.clientY, mine.x, mine.y)) {
          return;
        }
        const hit = document.elementFromPoint(move.clientX, move.clientY);
        if (hit && card.contains(hit)) return;
        clearLeaveWatch();
        releaseHover();
      };
      leaveWatch.current = onMove;
      window.addEventListener("pointermove", onMove);
      return;
    }
    releaseHover();
  }

  function onPointerDown(event: ReactPointerEvent<HTMLElement>) {
    if (isHoverPointer(event.pointerType)) return;
    pointerStart.current = { x: event.clientX, y: event.clientY };
  }

  function onPointerUp(event: ReactPointerEvent<HTMLElement>) {
    if (isHoverPointer(event.pointerType)) return;
    const start = pointerStart.current;
    pointerStart.current = null;
    if (!start) return;
    if (Math.hypot(event.clientX - start.x, event.clientY - start.y) > 12) {
      return;
    }

    if (!canTranslate) {
      announce();
      pulse();
      return;
    }

    if (mode === "touch") {
      setMode(null);
      return;
    }

    announce();
    setMode("touch");
  }

  function onPointerCancel() {
    pointerStart.current = null;
  }

  const lit = mode !== null;

  return {
    rootRef,
    lit,
    pulsing,
    handlers: {
      onPointerEnter,
      onPointerMove,
      onPointerLeave,
      onPointerDown,
      onPointerUp,
      onPointerCancel,
    },
  };
}
