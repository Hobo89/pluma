import { Link } from "react-router-dom";
import { BonoCardStrip } from "../components/BonoCardStrip";
import { BrandMarkedHeading } from "../components/BrandMarkedHeading";
import { PageContainer } from "../components/PageContainer";
import { PageMeta } from "../components/PageMeta";
import { CopyBlocks } from "../components/CopyBlocks";
import { BookingAction } from "../components/BookingAction";
import { mailto } from "../lib/contact";
import {
  sessionRates,
  voucherCards,
  type VoucherDuration,
} from "../config/pricing";
import { useLanguage } from "../context/LanguageContext";
import { formatPrice } from "../lib/money";

const faqGroups = [
  {
    id: "buying",
    items: ["include", "arrange", "share", "prices"],
  },
  {
    id: "using",
    items: ["after", "book"],
  },
  {
    id: "validity",
    items: ["valid", "expire"],
  },
  {
    id: "changes",
    items: ["change", "plumaCancel", "extend", "refund"],
  },
] as const;

function isClientFavorite(sessions: number, minutes: number) {
  return sessions === 5 && minutes === 60;
}

export function BonosPage() {
  const { t, language } = useLanguage();
  const voucherDurations = sessionRates
    .map((rate) => rate.minutes)
    .filter((minutes): minutes is VoucherDuration => minutes === 60 || minutes === 90);
  const voucherCombos = voucherCards.flatMap((card) =>
    card.rates.map((rate) => ({ card, rate })),
  );

  return (
    <PageContainer>
      <PageMeta page="bonos" />

      <BrandMarkedHeading
        as="h1"
        className="psl-title"
        text={t("bonos.title")}
        word={t("bonos.titleHighlight")}
      />
      <div className="psl-bono-intro">
        <CopyBlocks text={t("bonos.pageIntro")} />
      </div>

      <section
        className="psl-section"
        aria-labelledby="voucher-options-heading"
      >
        <BrandMarkedHeading
          id="voucher-options-heading"
          className="psl-title"
          text={t("bonos.optionsHeading")}
          word={t("bonos.optionsHeadingHighlight")}
        />
        <p className="psl-copy">{t("bonos.optionsSupport")}</p>

        <ul className="psl-voucher-cards">
          {voucherCombos.map(({ card, rate }) => {
            const favorite = isClientFavorite(card.sessions, rate.minutes);
            return (
              <li
                key={`${card.sessions}-${rate.minutes}`}
                className={`psl-voucher-card${favorite ? " psl-voucher-card--favorite" : ""}`}
              >
                {favorite ? (
                  <span className="psl-voucher-card__flag">
                    {t("pricing.clientFavorite")}
                  </span>
                ) : null}
                <p className="psl-voucher-card__title">
                  {t(`pricing.voucher${card.sessions}.title`)}
                  <span className="psl-save-pill">
                    {t(`pricing.voucher${card.sessions}.discount`)}
                  </span>
                </p>
                <p className="psl-voucher-card__duration">
                  {t("durations.cardTitle", { minutes: rate.minutes })}
                </p>
                <p className="psl-voucher-card__price">
                  <strong>{formatPrice(rate.totalCents, language)}</strong>
                  <span>
                    {formatPrice(rate.perSessionCents, language)}{" "}
                    {t("pricing.perSession")}
                  </span>
                </p>
                <p className="psl-voucher-card__saving">
                  {t("pricing.saving", {
                    amount: formatPrice(rate.savingCents, language),
                  })}
                </p>
              </li>
            );
          })}
        </ul>

        <div className="psl-voucher-table-wrap">
          <table className="psl-voucher-table">
            <thead>
              <tr>
                <th scope="col">{t("bonos.optionsTitle")}</th>
                {voucherCards.map((card) => (
                  <th key={card.sessions} scope="col">
                    {t(`pricing.voucher${card.sessions}.title`)}
                    <span className="psl-save-pill">
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
                      )}{" "}
                      <span className="psl-voucher-table__single-label">
                        {t("pricing.singleSessionPrice")}
                      </span>
                    </span>
                  </th>
                  {voucherCards.map((card) => {
                    const rate = card.rates.find(
                      (entry) => entry.minutes === minutes,
                    );
                    if (!rate) return <td key={card.sessions} />;
                    const favorite = isClientFavorite(card.sessions, minutes);
                    return (
                      <td
                        key={card.sessions}
                        className={favorite ? "psl-voucher-table__favorite" : undefined}
                      >
                        {favorite ? (
                          <span className="psl-voucher-card__flag">
                            {t("pricing.clientFavorite")}
                          </span>
                        ) : null}
                        <strong>{formatPrice(rate.totalCents, language)}</strong>
                        <span>
                          {formatPrice(rate.perSessionCents, language)}{" "}
                          {t("pricing.perSession")}
                        </span>
                        <span className="psl-voucher-table__saving">
                          {t("pricing.saving", {
                            amount: formatPrice(rate.savingCents, language),
                          })}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="psl-voucher-notes">
          <p className="psl-copy psl-copy--small">{t("bonos.pricesNote")}</p>
          <p className="psl-copy psl-copy--small">{t("bonos.validityNote")}</p>
        </div>
      </section>

      <BonoCardStrip />

      <section
        className="psl-section psl-bono-inquiry"
        aria-labelledby="voucher-inquiry-heading"
      >
        <h2 id="voucher-inquiry-heading" className="psl-title">
          {t("bonos.interestedTitle")}
        </h2>
        <a
          href={mailto(t("bonos.enquirySubject"), t("bonos.enquiryBody"))}
          className="psl-button psl-button--dark"
        >
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
        <BrandMarkedHeading
          id="voucher-faq-heading"
          className="psl-title"
          text={t("bonos.faqTitle")}
          word={t("bonos.faqTitleHighlight")}
        />
        {faqGroups.map((group) => (
          <div key={group.id} className="psl-faq__group">
            <h3 className="psl-faq__group-title">
              {t(`bonos.faqGroups.${group.id}`)}
            </h3>
            {group.items.map((id) => (
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
        ))}
      </section>

      <section className="psl-bono-return" aria-labelledby="bono-return-heading">
        <h2 id="bono-return-heading" className="psl-bono-return__title">
          {t("bonos.returnTitle")}
        </h2>
        <BookingAction
          label={t("bonos.returnCta")}
          placement="bono_return"
          className="psl-button psl-button--ghost"
        />
      </section>
    </PageContainer>
  );
}
