import { Link } from "react-router-dom";
import { readiness } from "../config/readiness";
import { pricingConflicts, sessionRates } from "../config/pricing";
import { useLanguage } from "../context/LanguageContext";
import { formatPrice } from "../lib/money";
import { BookingAction } from "./BookingAction";
import { PendingNote } from "./PendingNote";

const conflictedDurations = new Set(
  pricingConflicts.map((conflict) => conflict.minutes),
);

/**
 * The duration chooser. Ninety minutes carries the recommendation, expressed
 * through an outline, a label and ordering rather than colour alone.
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
          const enquiryOnly = rate.bookingRoute === "enquiry";
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
                    <svg
                      viewBox="0 0 24 24"
                      width="14"
                      height="14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="m5 13 4 4L19 7" />
                    </svg>
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

              {conflictedDurations.has(rate.minutes) ? (
                <PendingNote label={t("prelaunch.previewLabel")}>
                  {t("pricing.conflictNote")}
                </PendingNote>
              ) : null}

              {enquiryOnly ? (
                <p className="psl-duration__note">
                  {t("durations.enquiryNote")}
                </p>
              ) : null}

              <BookingAction
                label={t("durations.cta", { minutes: rate.minutes })}
                enquiryLabel={t("durations.enquiryCta", {
                  minutes: rate.minutes,
                })}
                duration={rate.minutes}
                placement="durations"
                enquiryOnly={enquiryOnly}
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
          {!readiness.bookingReady ? (
            <>
              <PendingNote label={t("prelaunch.previewLabel")}>
                {t("durations.paymentPending")}
              </PendingNote>
              <PendingNote label={t("prelaunch.previewLabel")}>
                {t("durations.cancellationPending")}
              </PendingNote>
            </>
          ) : null}
          <Link to="/condiciones-reserva" className="psl-textlink">
            {t("durations.termsLink")}
          </Link>
        </div>
      )}
    </section>
  );
}
