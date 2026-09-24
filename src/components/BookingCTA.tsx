import { useLanguage } from "../context/LanguageContext";
import { useAmbientVideo } from "../lib/useAmbientVideo";
import { BookingAction } from "./BookingAction";

const VIDEO = "/videos/appointment-loop.mp4";
const POSTER = "/assets/images/appointment-poster.jpg";

/**
 * Closing invitation with a muted ambient loop. Poster remains the
 * first paint / fallback when autoplay is blocked.
 */
export function BookingCTA() {
  const { t } = useLanguage();
  const videoRef = useAmbientVideo({ whenVisible: true });

  return (
    <section className="psl-cta psl-cta--video psl-container psl-container--wide">
      <video
        ref={videoRef}
        className="psl-cta__image"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster={POSTER}
        aria-hidden="true"
      >
        <source src={VIDEO} type="video/mp4" />
      </video>
      <h2 className="psl-page-title">{t("cta.heading")}</h2>
      <p className="psl-copy">{t("cta.body")}</p>
      <BookingAction label={t("hero.book")} placement="footer_cta" />
    </section>
  );
}
