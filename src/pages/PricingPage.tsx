import { Link } from "react-router-dom";
import { PageContainer } from "../components/PageContainer";
import { PageMeta } from "../components/PageMeta";
import { PendingNote } from "../components/PendingNote";
import { BookingAction } from "../components/BookingAction";
import {
  pricingConflicts,
  recommendedDuration,
  sessionRates,
  voucherCards,
} from "../config/pricing";
import { useLanguage } from "../context/LanguageContext";
import { formatPrice } from "../lib/money";

const conflictedDurations = new Set(
  pricingConflicts.map((conflict) => conflict.minutes),
);

export function PricingPage() {
  const { t, language } = useLanguage();

  return (
    <PageContainer>
      <PageMeta page="pricing" />
      <p className="psl-eyebrow">{t("pricing.eyebrow")}</p>
      <h1 className="psl-title">{t("pricing.title")}</h1>
      <p className="psl-copy" style={{ marginBlock: "var(--psl-space-6)" }}>
        {t("pricing.description")}
      </p>

      <section
        className="psl-pricing-section"
        aria-labelledby="pricing-single-heading"
      >
        <div className="psl-section-head psl-section-head--stack">
          <h2 id="pricing-single-heading" className="psl-title">
            {t("pricing.singleTitle")}
          </h2>
        </div>

        <div className="psl-pricing-grid">
          {sessionRates.map((rate) => (
            <article
              key={rate.minutes}
              className={`psl-pricing-card${rate.recommended ? " psl-pricing-card--recommended" : ""}`}
            >
              {rate.recommended ? (
                <p className="psl-pricing-card__flag">
                  {t("durations.recommended")}
                </p>
              ) : null}
              <p className="psl-pricing-card__duration">
                {t("pricing.durationMinutes", { minutes: rate.minutes })}
              </p>
              <p className="psl-pricing-card__price">
                {formatPrice(rate.cents, language)}
              </p>
              <p className="psl-pricing-card__meta">
                {t(`durations.scope.${rate.minutes}`)}
              </p>
              {conflictedDurations.has(rate.minutes) ? (
                <PendingNote label={t("prelaunch.previewLabel")}>
                  {t("pricing.conflictNote")}
                </PendingNote>
              ) : null}
            </article>
          ))}
        </div>

        <p className="psl-copy psl-copy--small">{t("pricing.taxNote")}</p>
      </section>

      <section
        className="psl-pricing-section"
        aria-labelledby="pricing-voucher-heading"
      >
        <div className="psl-section-head psl-section-head--stack">
          <h2 id="pricing-voucher-heading" className="psl-title">
            {t("pricing.voucherTitle")}
          </h2>
          <p className="psl-copy">{t("pricing.voucherDescription")}</p>
        </div>

        <div className="psl-pricing-vouchers">
          {voucherCards.map((card) => (
            <article key={card.sessions} className="psl-pricing-voucher">
              <span className="psl-eyebrow">
                {t(`pricing.voucher${card.sessions}.discount`)}
              </span>
              <h3 className="psl-pricing-voucher__title">
                {t(`pricing.voucher${card.sessions}.title`)}
              </h3>
              <p className="psl-copy psl-copy--small">
                {t("pricing.validity", { months: card.validityMonths })}
              </p>

              <ul className="psl-pricing-voucher__rates">
                {card.rates.map((rate) => (
                  <li key={rate.minutes}>
                    <span className="psl-pricing-voucher__duration">
                      {t("pricing.durationMinutes", { minutes: rate.minutes })}
                    </span>
                    <span className="psl-pricing-voucher__total">
                      {formatPrice(rate.totalCents, language)}{" "}
                      <span className="psl-pricing-voucher__total-label">
                        {t("pricing.total")}
                      </span>
                    </span>
                    <span className="psl-pricing-voucher__per-session">
                      {formatPrice(rate.perSessionCents, language)}{" "}
                      {t("pricing.perSession")}
                    </span>
                    <span className="psl-pricing-voucher__saving">
                      {t("pricing.saving", {
                        amount: formatPrice(rate.savingCents, language),
                      })}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <Link to="/member-card" className="psl-textlink">
          {t("pricing.bonoLink")}
        </Link>
      </section>

      <div className="psl-actions" style={{ marginTop: "var(--psl-space-12)" }}>
        <BookingAction
          label={t("hero.primaryCta")}
          duration={recommendedDuration}
          placement="pricing"
          className="psl-button psl-button--dark"
        />
        <Link to="/condiciones-reserva" className="psl-textlink">
          {t("durations.termsLink")}
        </Link>
      </div>
    </PageContainer>
  );
}
