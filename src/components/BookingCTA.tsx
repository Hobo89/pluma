import { recommendedDuration } from "../config/pricing";
import { useLanguage } from "../context/LanguageContext";
import { BookingAction } from "./BookingAction";

export function BookingCTA() {
  const { t } = useLanguage();

  return (
    <section className="psl-cta psl-container psl-container--wide">
      <img
        className="psl-cta__image"
        src="/assets/images/mediterranean-gradient.jpg"
        alt=""
        loading="lazy"
        sizes="(max-width: 991px) 95vw, 73vw"
      />
      <h2 className="psl-display" style={{ color: "var(--psl-white)" }}>
        {t("booking.title")}
      </h2>
      <BookingAction
        label={t("hero.primaryCta")}
        duration={recommendedDuration}
        placement="footer_cta"
      />
    </section>
  );
}
