import { sessionRates } from "../config/pricing";
import { useLanguage } from "../context/LanguageContext";
import { formatPrice } from "../lib/money";
import type { AnalyticsEvent } from "../lib/analytics";
import { AnimatedGradient } from "./AnimatedGradient";
import { BookingAction } from "./BookingAction";

type Placement = Extract<
  AnalyticsEvent,
  { name: "booking_cta_clicked" }
>["placement"];

type SessionCardsProps = {
  placement: Extract<Placement, "durations" | "pricing">;
  /** Prefix for per-card heading ids (e.g. `duration` → `duration-60`). */
  headingIdPrefix?: string;
};

const SESSION_GRADIENT = ["#FEF9F1", "#F9FBFA", "#FEF6EC"] as const;

/**
 * Shared session duration cards for Home and Prices: equal-height rows,
 * recommendation badge, and explicit booking actions.
 */
export function SessionCards({
  placement,
  headingIdPrefix = "session",
}: SessionCardsProps) {
  const { t, language } = useLanguage();

  return (
    <ul className="psl-session-cards">
      {sessionRates.map((rate) => {
        const headingId = `${headingIdPrefix}-${rate.minutes}`;
        const recommended = rate.recommended;

        return (
          <li
            key={rate.minutes}
            className={`psl-session-card${recommended ? " psl-session-card--recommended" : ""}`}
          >
            <span className="psl-session-card__wash">
              <AnimatedGradient
                colors={[...SESSION_GRADIENT]}
                speed={10}
                blur="medium"
              />
            </span>

            <div className="psl-session-card__content">
              <div className="psl-session-card__badge-row">
                {recommended ? (
                  <span className="psl-session-card__badge">
                    {t("durations.recommended")}
                  </span>
                ) : null}
              </div>

              <h3 id={headingId} className="psl-session-card__title">
                <span>
                  {t("durations.cardTitle", { minutes: rate.minutes })} /
                </span>{" "}
                <span>{formatPrice(rate.cents, language)}</span>
              </h3>

              <p className="psl-session-card__description">
                {t(`durations.scope.${rate.minutes}`)}
              </p>

              <div className="psl-session-card__action">
                <BookingAction
                  label={t("durations.cta", { minutes: rate.minutes })}
                  duration={rate.minutes}
                  placement={placement}
                  className={`psl-button${recommended ? "" : " psl-button--ghost"}`}
                />
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
