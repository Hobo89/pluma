import { Link } from "react-router-dom";
import { PageContainer } from "../components/PageContainer";
import { formatEuro, sessionRates, voucherCards } from "../config/pricing";
import { useLanguage } from "../context/LanguageContext";

export function PricingPage() {
  const { t } = useLanguage();

  return (
    <PageContainer>
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
            <article key={rate.minutes} className="psl-pricing-card">
              <p className="psl-pricing-card__duration">
                {t("pricing.durationMinutes").replace(
                  "{minutes}",
                  String(rate.minutes),
                )}
              </p>
              <p className="psl-pricing-card__price">{formatEuro(rate.single)}</p>
              <p className="psl-pricing-card__meta">
                {t(`pricing.durationScope.${rate.minutes}`)}
              </p>
            </article>
          ))}
        </div>
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

              <ul className="psl-pricing-voucher__rates">
                {card.rates.map((rate) => (
                  <li key={rate.minutes}>
                    <span className="psl-pricing-voucher__duration">
                      {t("pricing.durationMinutes").replace(
                        "{minutes}",
                        String(rate.minutes),
                      )}
                    </span>
                    <span className="psl-pricing-voucher__total">
                      {formatEuro(rate.total)}{" "}
                      <span className="psl-pricing-voucher__total-label">
                        {t("pricing.total")}
                      </span>
                    </span>
                    <span className="psl-pricing-voucher__per-session">
                      {formatEuro(rate.perSession)}{" "}
                      {t("pricing.perSession")}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <div className="psl-actions" style={{ marginTop: "var(--psl-space-12)" }}>
        <Link to="/book" className="psl-button psl-button--dark">
          {t("pricing.book")}
        </Link>
      </div>
    </PageContainer>
  );
}
