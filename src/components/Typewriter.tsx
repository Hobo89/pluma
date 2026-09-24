import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ElementType,
  type HTMLAttributes,
  type ReactNode,
} from "react";

type TypewriterProps = {
  text: string | string[];
  as?: ElementType;
  speed?: number;
  initialDelay?: number;
  waitTime?: number;
  deleteSpeed?: number;
  loop?: boolean;
  className?: string;
  showCursor?: boolean;
  hideCursorOnType?: boolean;
  cursorChar?: string | ReactNode;
  cursorClassName?: string;
  onComplete?: () => void;
} & HTMLAttributes<HTMLElement>;

/**
 * Types text one character at a time. Cursor blink uses CSS so we avoid
 * adding a motion dependency for this single effect.
 */
export function Typewriter({
  text,
  as: Tag = "div",
  speed = 50,
  initialDelay = 0,
  waitTime = 2000,
  deleteSpeed = 30,
  loop = true,
  className,
  showCursor = true,
  hideCursorOnType = false,
  cursorChar = "|",
  cursorClassName = "psl-typewriter__cursor",
  onComplete,
  ...props
}: TypewriterProps) {
  const texts = useMemo(
    () => (Array.isArray(text) ? text : [text]),
    [text],
  );
  const textsKey = texts.join("\u0000");
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [started, setStarted] = useState(initialDelay === 0);
  const [finished, setFinished] = useState(false);

  const reduceMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    setDisplayText("");
    setCurrentIndex(0);
    setIsDeleting(false);
    setCurrentTextIndex(0);
    setStarted(initialDelay === 0);
    setFinished(false);
  }, [textsKey, initialDelay]);

  useEffect(() => {
    if (!reduceMotion) return;
    setDisplayText(texts[0] ?? "");
    setCurrentIndex(texts[0]?.length ?? 0);
    setFinished(true);
    onCompleteRef.current?.();
  }, [reduceMotion, texts, textsKey]);

  useEffect(() => {
    if (reduceMotion || started || finished) return;
    const delay = window.setTimeout(() => setStarted(true), initialDelay);
    return () => window.clearTimeout(delay);
  }, [finished, initialDelay, reduceMotion, started]);

  useEffect(() => {
    if (reduceMotion || !started || finished) return;

    const currentText = texts[currentTextIndex] ?? "";
    let timeout: number;

    if (isDeleting) {
      if (displayText === "") {
        setIsDeleting(false);
        if (currentTextIndex === texts.length - 1 && !loop) {
          setFinished(true);
          onCompleteRef.current?.();
          return;
        }
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        setCurrentIndex(0);
        return;
      }
      timeout = window.setTimeout(() => {
        setDisplayText((prev) => prev.slice(0, -1));
      }, deleteSpeed);
    } else if (currentIndex < currentText.length) {
      timeout = window.setTimeout(() => {
        setDisplayText((prev) => prev + currentText[currentIndex]!);
        setCurrentIndex((prev) => prev + 1);
      }, speed);
    } else if (texts.length > 1 && (loop || currentTextIndex < texts.length - 1)) {
      timeout = window.setTimeout(() => {
        setIsDeleting(true);
      }, waitTime);
    } else {
      setFinished(true);
      onCompleteRef.current?.();
    }

    return () => {
      if (timeout) window.clearTimeout(timeout);
    };
  }, [
    currentIndex,
    currentTextIndex,
    deleteSpeed,
    displayText,
    finished,
    isDeleting,
    loop,
    reduceMotion,
    speed,
    started,
    texts,
    waitTime,
  ]);

  const typing =
    currentIndex < (texts[currentTextIndex]?.length ?? 0) || isDeleting;
  const hideCursor = hideCursorOnType && typing;

  return (
    <Tag
      className={["psl-typewriter", className].filter(Boolean).join(" ")}
      {...props}
    >
      <span className="psl-typewriter__text">{displayText}</span>
      {showCursor && !hideCursor && !finished ? (
        <span className={cursorClassName} aria-hidden="true">
          {cursorChar}
        </span>
      ) : null}
    </Tag>
  );
}
