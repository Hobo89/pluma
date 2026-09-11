import { Link } from "react-router-dom";
import { sessionRates } from "../config/pricing";
import { useLanguage } from "../context/LanguageContext";
import { formatPrice } from "../lib/money";
import { BookingAction } from "./BookingAction";

/**
 * The duration chooser. Ninety minutes is marked as the client favourite,
 * through an outline, a label, and first position in the mobile strip.
 */
export function DurationChoice({ compact = false }: { compact?: boolean }) {
  const { t, language } = useLanguage();

  return (
    <section
      id="durations"
      aria-labelledby="durations-heading"
      className="psl-container psl-section--roomy"
    >
      <div className="psl-section-head psl-section-head--stack">
        <p className="psl-eyebrow">{t("durations.eyebrow")}</p>
        <h2 id="durations-heading" className="psl-title">
          {t("durations.title")}
        </h2>
        <p className="psl-copy">{t("durations.description")}</p>
      </div>

      <ul className="psl-durations">
        {sessionRates.map((rate) => {
          const headingId = `duration-${rate.minutes}`;

          return (
            <li
              key={rate.minutes}
              className={`psl-duration${rate.recommended ? " psl-duration--recommended" : ""}`}
            >
              <div className="psl-duration__head">
                <h3 id={headingId} className="psl-duration__title">
                  {t("pricing.durationMinutes", { minutes: rate.minutes })}
                </h3>
                {rate.recommended ? (
                  <span className="psl-duration__flag">
                    {t("durations.recommended")}
                  </span>
                ) : null}
              </div>

              <p className="psl-duration__price">
                {formatPrice(rate.cents, language)}
              </p>
              <p className="psl-duration__scope">
                {t(`durations.scope.${rate.minutes}`)}
              </p>

              <BookingAction
                label={t("durations.cta", { minutes: rate.minutes })}
                duration={rate.minutes}
                placement="durations"
                className={`psl-button${rate.recommended ? " psl-button--dark" : " psl-button--ghost"} psl-duration__cta`}
              />
            </li>
          );
        })}
      </ul>

      {compact ? null : (
        <div className="psl-durations__terms">
          <p className="psl-copy psl-copy--small">{t("durations.priceNote")}</p>
          <p className="psl-copy psl-copy--small">{t("pricing.taxNote")}</p>
          <Link to="/condiciones-reserva" className="psl-textlink">
            {t("durations.termsLink")}
          </Link>
        </div>
      )}
    </section>
  );
}
