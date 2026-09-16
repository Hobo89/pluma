import { Link } from "react-router-dom";
import { PageContainer } from "../components/PageContainer";
import { PageMeta } from "../components/PageMeta";
import { CopyBlocks } from "../components/CopyBlocks";
import { BookingAction } from "../components/BookingAction";
import { voucherInquiryUrl } from "../config/cal";
import {
  recommendedDuration,
  sessionRates,
  voucherCards,
  type VoucherDuration,
} from "../config/pricing";
import { useLanguage } from "../context/LanguageContext";
import { formatPrice } from "../lib/money";

const faqIds = [
  "include",
  "arrange",
  "after",
  "active",
  "valid",
  "book",
  "change",
  "plumaCancel",
  "extend",
  "share",
  "prices",
  "refund",
  "expire",
  "lost",
] as const;

export function BonosPage() {
  const { t, language } = useLanguage();
  const voucherDurations = sessionRates
    .map((rate) => rate.minutes)
    .filter((minutes): minutes is VoucherDuration => minutes === 60 || minutes === 90);

  return (
    <PageContainer>
      <PageMeta page="bonos" />

      <h1 className="psl-title">{t("bonos.title")}</h1>
      <div className="psl-bono-intro">
        <CopyBlocks text={t("bonos.pageIntro")} />
        <CopyBlocks text={t("bonos.body")} />
      </div>

      <section
        className="psl-section"
        aria-labelledby="voucher-options-heading"
      >
        <h2 id="voucher-options-heading" className="psl-title">
          {t("bonos.optionsTitle")}
        </h2>

        <div className="psl-voucher-table-wrap">
          <table className="psl-voucher-table">
            <thead>
              <tr>
                <th scope="col">{t("bonos.optionsTitle")}</th>
                {voucherCards.map((card) => (
                  <th key={card.sessions} scope="col">
                    {t(`pricing.voucher${card.sessions}.title`)}
                    <span className="psl-voucher-table__discount">
                      {t(`pricing.voucher${card.sessions}.discount`)}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {voucherDurations.map((minutes) => (
                <tr key={minutes}>
                  <th scope="row">
                    {t("pricing.durationMinutes", { minutes })}
                    <span className="psl-voucher-table__single">
                      {formatPrice(
                        sessionRates.find((rate) => rate.minutes === minutes)
                          ?.cents ?? 0,
                        language,
                      )}
                    </span>
                  </th>
                  {voucherCards.map((card) => {
                    const rate = card.rates.find(
                      (entry) => entry.minutes === minutes,
                    );
                    if (!rate) return <td key={card.sessions} />;
                    return (
                      <td key={card.sessions}>
                        <strong>{formatPrice(rate.totalCents, language)}</strong>
                        <span>
                          {formatPrice(rate.perSessionCents, language)}{" "}
                          {t("pricing.perSession")}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="psl-copy psl-copy--small">{t("bonos.pricesNote")}</p>
      </section>

      <section
        className="psl-section psl-bono-inquiry"
        aria-labelledby="voucher-inquiry-heading"
      >
        <h2 id="voucher-inquiry-heading" className="psl-title">
          {t("bonos.interestedTitle")}
        </h2>
        <p className="psl-copy">{t("bonos.interestedBody")}</p>
        <a href={voucherInquiryUrl} className="psl-button psl-button--dark">
          {t("bonos.cta")}
        </a>
        <p className="psl-copy psl-copy--small">
          {t("bonos.termsAgree")}{" "}
          <Link to="/condiciones-bonos" className="psl-textlink">
            {t("bonos.termsLink")}
          </Link>
        </p>
      </section>

      <section className="psl-faq" aria-labelledby="voucher-faq-heading">
        <h2 id="voucher-faq-heading" className="psl-title">
          {t("bonos.faqTitle")}
        </h2>
        <div>
          {faqIds.map((id) => (
            <details key={id}>
              <summary>
                {t(`bonos.faq.${id}.question`)}
                <span className="psl-faq__icon" aria-hidden="true" />
              </summary>
              {t(`bonos.faq.${id}.answer`)
                .split("\n\n")
                .map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
            </details>
          ))}
        </div>
      </section>

      <section className="psl-bono-return" aria-labelledby="bono-return-heading">
        <h2 id="bono-return-heading" className="psl-bono-return__title">
          {t("bonos.returnTitle")}
        </h2>
        <BookingAction
          label={t("bonos.returnCta")}
          duration={recommendedDuration}
          placement="bono_return"
          className="psl-button psl-button--ghost"
        />
      </section>
    </PageContainer>
  );
}
