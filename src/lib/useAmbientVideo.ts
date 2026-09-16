import { useEffect, useRef } from "react";

/**
 * Keep muted looping background clips playing even when the OS asks for
 * reduced motion. CSS motion (marquees, hovers) still respects that setting.
 */
export function useAmbientVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const play = () => {
      void video.play().catch(() => {
        // The browser can still refuse autoplay (low power, data saver).
      });
    };

    play();
    video.addEventListener("loadeddata", play);
    return () => video.removeEventListener("loadeddata", play);
  }, []);

  return ref;
}
