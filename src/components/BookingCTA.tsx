import { useEffect, useRef } from "react";
import { recommendedDuration } from "../config/pricing";
import { useLanguage } from "../context/LanguageContext";
import { BookingAction } from "./BookingAction";

const VIDEO_SRC = "/videos/appointment-loop.mp4";
const POSTER = "/assets/images/appointment-poster.jpg";

/**
 * The clip is encoded forward then reverse, so a normal loop plays back and
 * forth without snapping to the first frame.
 */
export function BookingCTA() {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const syncMotion = () => {
      if (motion.matches) {
        video.pause();
        video.currentTime = 0;
        return;
      }
      void video.play();
    };

    syncMotion();
    motion.addEventListener("change", syncMotion);
    return () => motion.removeEventListener("change", syncMotion);
  }, []);

  return (
    <section className="psl-cta psl-cta--video psl-container psl-container--wide">
      <video
        ref={videoRef}
        className="psl-cta__image"
        autoPlay
        loop
        muted
        playsInline
        poster={POSTER}
        aria-hidden="true"
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>
      <h2 className="psl-display">{t("booking.title")}</h2>
      <BookingAction
        label={t("hero.book")}
        duration={recommendedDuration}
        placement="footer_cta"
      />
    </section>
  );
}
