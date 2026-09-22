import { useLanguage } from "../context/LanguageContext";
import { BookingAction } from "./BookingAction";

const POSTER = "/assets/images/appointment-poster.jpg";

/**
 * Closing invitation. Uses the existing still poster instead of autoplaying
 * the below-the-fold decorative loop for launch.
 */
export function BookingCTA() {
  const { t } = useLanguage();

  return (
    <section className="psl-cta psl-cta--video psl-container psl-container--wide">
      <img
        className="psl-cta__image"
        src={POSTER}
        alt=""
        aria-hidden="true"
        loading="lazy"
      />
      <h2 className="psl-display">{t("cta.heading")}</h2>
      <p className="psl-copy">{t("cta.body")}</p>
      <BookingAction label={t("hero.book")} placement="footer_cta" />
    </section>
  );
}
