import {
  useEffect,
  useId,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";

const HOVER_QUERY = "(hover: hover) and (pointer: fine)";
const PULSE_MS = 900;
const REVEAL_EVENT = "pluma:testimonial-reveal";

type RevealMode = "hover" | "touch" | null;

function canHover() {
  return window.matchMedia(HOVER_QUERY).matches;
}

function isHoverPointer(pointerType: string) {
  return pointerType === "mouse" || pointerType === "pen";
}

/**
 * Desktop hover holds the card. Touch toggles a translation, or plays a
 * short lift-and-shine when the quote is already in the reader's language.
 */
export function useTestimonialReveal(canTranslate: boolean) {
  const rootRef = useRef<HTMLElement>(null);
  const instanceId = useId();
  const pointerStart = useRef<{ x: number; y: number } | null>(null);
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

  function onPointerEnter(event: ReactPointerEvent<HTMLElement>) {
    if (!isHoverPointer(event.pointerType) || !canHover()) return;
    clearLeaveWatch();
    stopPulse();
    announce();
    setMode("hover");
  }

  function onPointerLeave(event: ReactPointerEvent<HTMLElement>) {
    if (!isHoverPointer(event.pointerType)) return;
    const card = rootRef.current;
    const track = card?.closest(".psl-testimonial-wall__track");
    if (
      card &&
      track instanceof HTMLElement &&
      track.dataset.wallNudge === "1"
    ) {
      clearLeaveWatch();
      const onMove = (move: PointerEvent) => {
        const hit = document.elementFromPoint(move.clientX, move.clientY);
        if (hit && card.contains(hit)) return;
        clearLeaveWatch();
        setMode((current) => (current === "hover" ? null : current));
      };
      leaveWatch.current = onMove;
      window.addEventListener("pointermove", onMove);
      return;
    }
    setMode((current) => (current === "hover" ? null : current));
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
      onPointerLeave,
      onPointerDown,
      onPointerUp,
      onPointerCancel,
    },
  };
}
