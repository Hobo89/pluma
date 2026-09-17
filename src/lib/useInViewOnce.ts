import { useEffect, useRef, useState } from "react";

/**
 * Adds a one-shot in-view flag. The observer disconnects after the first
 * qualifying intersection so off-screen elements do not keep painting.
 */
export function useInViewOnce<T extends HTMLElement>(
  threshold = 0.35,
) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || inView) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) {
      setInView(true);
      return;
    }

    if (!window.IntersectionObserver) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio >= threshold) {
            setInView(true);
            observer.disconnect();
            return;
          }
        }
      },
      { threshold: [0, threshold] },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [inView, threshold]);

  return { ref, inView };
}
