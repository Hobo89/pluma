import { Link } from "react-router-dom";
import { sessionRates } from "../config/pricing";
import { useLanguage } from "../context/LanguageContext";
import { useInViewOnce } from "../lib/useInViewOnce";
import { useOrbitStrokeMask } from "../lib/orbitStrokeMask";
import { formatPrice } from "../lib/money";
import { BookingAction } from "./BookingAction";

/**
 * The duration chooser. Ninety minutes is marked as Stephen's recommendation,
 * through an outline, a label, and first position in the mobile strip.
 */
export function DurationChoice({ compact = false }: { compact?: boolean }) {
  const { t, language } = useLanguage();
  const recommended = useInViewOnce<HTMLLIElement>();
  useOrbitStrokeMask(recommended.ref);

  return (
    <section
      id="durations"
      aria-labelledby="durations-heading"
      className="psl-container psl-section--roomy"
    >
      <div className="psl-section-head psl-section-head--stack">
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
              ref={rate.recommended ? recommended.ref : undefined}
              className={`psl-duration${rate.recommended ? " psl-duration--recommended" : ""}${rate.recommended && recommended.inView ? " is-inview" : ""}`}
            >
              <div className="psl-duration__head">
                <h3 id={headingId} className="psl-duration__title">
                  <span>
                    {t("durations.cardTitle", { minutes: rate.minutes })} /
                  </span>{" "}
                  <span>{formatPrice(rate.cents, language)}</span>
                </h3>
              </div>

              <p className="psl-duration__scope">
                {t(`durations.scope.${rate.minutes}`)}
              </p>

              <BookingAction
                label={t("durations.cta", { minutes: rate.minutes })}
                duration={rate.minutes}
                placement="durations"
                className={`psl-button${rate.recommended ? " psl-button--dark" : " psl-button--ghost"} psl-duration__cta`}
              />

              {rate.recommended ? (
                <span className="psl-duration__flag">
                  {t("durations.recommended")}
                </span>
              ) : null}
            </li>
          );
        })}
      </ul>

      {compact ? null : (
        <p className="psl-copy psl-copy--small psl-durations__terms">
          {t("durations.priceNote")} {t("pricing.taxNote")}{" "}
          <Link to="/condiciones-reserva" className="psl-textlink">
            {t("durations.termsLink")}
          </Link>
        </p>
      )}
    </section>
  );
}
