import { Link } from "react-router-dom";
import { PageContainer } from "../components/PageContainer";
import { PageMeta } from "../components/PageMeta";
import { PricingVoucherInvite } from "../components/PricingVoucherInvite";
import { SessionCards } from "../components/SessionCards";
import { useLanguage } from "../context/LanguageContext";

export function PricingPage() {
  const { t } = useLanguage();

  return (
    <PageContainer>
      <PageMeta page="pricing" />

      <section
        className="psl-pricing-section"
        aria-labelledby="pricing-single-heading"
      >
        <div className="psl-section-head psl-section-head--stack">
          <h1 id="pricing-single-heading" className="psl-page-title">
            {t("pricing.singleTitle")}
          </h1>
          <p className="psl-copy">{t("durations.principle")}</p>
        </div>

        <SessionCards placement="pricing" headingIdPrefix="pricing" />

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
