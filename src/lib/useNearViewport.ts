import { useEffect, useRef, useState } from "react";

type NearViewportOptions = {
  /** Skip the observer and treat the element as in range immediately. */
  eager?: boolean;
  rootMargin?: string;
};

/**
 * One-shot viewport proximity flag. Used to start loading full photographs
 * shortly before they scroll into view.
 */
export function useNearViewport<T extends HTMLElement>({
  eager = false,
  rootMargin = "280px 0px",
}: NearViewportOptions = {}) {
  const ref = useRef<T>(null);
  const [near, setNear] = useState(eager);

  useEffect(() => {
    if (eager) {
      setNear(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    if (!window.IntersectionObserver) {
      setNear(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0.01 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [eager, rootMargin]);

  return { ref, near };
}
