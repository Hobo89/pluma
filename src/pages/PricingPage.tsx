import { Link } from "react-router-dom";
import { PageContainer } from "../components/PageContainer";
import { PageMeta } from "../components/PageMeta";
import { BookingAction } from "../components/BookingAction";
import { PricingVoucherInvite } from "../components/PricingVoucherInvite";
import { sessionRates } from "../config/pricing";
import { useLanguage } from "../context/LanguageContext";
import { formatPrice } from "../lib/money";

export function PricingPage() {
  const { t, language } = useLanguage();

  return (
    <PageContainer>
      <PageMeta page="pricing" />

      <section
        className="psl-pricing-section"
        aria-labelledby="pricing-single-heading"
      >
        <div className="psl-section-head psl-section-head--stack">
          <h1 id="pricing-single-heading" className="psl-title">
            {t("pricing.singleTitle")}
          </h1>
        </div>

        <div className="psl-pricing-grid">
          {sessionRates.map((rate) => (
            <BookingAction
              key={rate.minutes}
              label={t("durations.cta", { minutes: rate.minutes })}
              duration={rate.minutes}
              placement="pricing"
              className={`psl-pricing-card${rate.recommended ? " psl-pricing-card--recommended" : ""}`}
            >
              {rate.recommended ? (
                <span className="psl-pricing-card__flag">
                  {t("durations.recommended")}
                </span>
              ) : null}
              <span className="psl-pricing-card__duration">
                <span>
                  {t("durations.cardTitle", { minutes: rate.minutes })} /
                </span>{" "}
                <span>{formatPrice(rate.cents, language)}</span>
              </span>
              <span className="psl-pricing-card__meta">
                {t(`durations.scope.${rate.minutes}`)}
              </span>
            </BookingAction>
          ))}
        </div>

        <p className="psl-copy psl-copy--small psl-pricing-terms">
          {t("pricing.taxNote")}{" "}
          <Link to="/condiciones-reserva" className="psl-textlink">
            {t("durations.termsLink")}
          </Link>
        </p>
      </section>

      <PricingVoucherInvite />
    </PageContainer>
  );
}
