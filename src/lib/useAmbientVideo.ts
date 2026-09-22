import { useEffect, useRef } from "react";

type AmbientVideoOptions = {
  /** Play only while the element intersects the viewport. */
  whenVisible?: boolean;
  /** Fraction of the element that must be visible to start playback. */
  threshold?: number;
};

/**
 * Keep muted looping background clips playing even when the OS asks for
 * reduced motion. CSS motion (marquees, hovers) still respects that setting.
 */
export function useAmbientVideo({
  whenVisible = false,
  threshold = 0.35,
}: AmbientVideoOptions = {}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const play = () => {
      void video.play().catch(() => {
        // The browser can still refuse autoplay (low power, data saver).
      });
    };

    if (!whenVisible || !window.IntersectionObserver) {
      play();
      video.addEventListener("loadeddata", play);
      return () => video.removeEventListener("loadeddata", play);
    }

    let visible = false;
    const onLoaded = () => {
      if (visible) play();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visible =
            entry.isIntersecting && entry.intersectionRatio >= threshold;
          if (visible) {
            if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
              play();
            } else {
              video.load();
            }
          } else {
            video.pause();
          }
        }
      },
      { threshold: [0, threshold] },
    );

    video.addEventListener("loadeddata", onLoaded);
    observer.observe(video);
    return () => {
      observer.disconnect();
      video.removeEventListener("loadeddata", onLoaded);
    };
  }, [threshold, whenVisible]);

  return ref;
}
