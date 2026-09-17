import { useLanguage } from "../context/LanguageContext";
import { useAmbientVideo } from "../lib/useAmbientVideo";
import { BookingAction } from "./BookingAction";

const VIDEO_SRC = "/videos/appointment-loop.mp4";
const POSTER = "/assets/images/appointment-poster.jpg";

/**
 * The clip is encoded forward then reverse, so a normal loop plays back and
 * forth without snapping to the first frame.
 */
export function BookingCTA() {
  const { t } = useLanguage();
  const videoRef = useAmbientVideo();

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
      <h2 className="psl-display">{t("cta.heading")}</h2>
      <p className="psl-copy">{t("cta.body")}</p>
      <BookingAction
        label={t("hero.book")}
        placement="footer_cta"
      />
    </section>
  );
}
