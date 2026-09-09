import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PageContainer } from "../components/PageContainer";
import { PageMeta } from "../components/PageMeta";
import { PendingNote } from "../components/PendingNote";
import { BonoDesignPicker } from "../components/BonoDesignPicker";
import { BonoPhonePreview } from "../components/BonoPhonePreview";
import { BuyIcon, EmailIcon, PhoneIcon } from "../components/BonoIcons";
import {
  defaultBonoDesign,
  isBonoDesignId,
  type BonoDesignId,
} from "../config/bonos";
import {
  pricingPolicy,
  voucherCards,
  voucherRateFor,
  type VoucherDuration,
  type VoucherSessions,
} from "../config/pricing";
import { readiness } from "../config/readiness";
import { useLanguage } from "../context/LanguageContext";
import { formatPrice } from "../lib/money";
import { mailto } from "../lib/contact";
import { track } from "../lib/analytics";

const DESIGN_STORAGE_KEY = "bonoDesign";

const steps = [
  { id: "buy", Icon: BuyIcon },
  { id: "email", Icon: EmailIcon },
  { id: "phone", Icon: PhoneIcon },
] as const;

function readStoredDesign(): BonoDesignId {
  try {
    const stored = localStorage.getItem(DESIGN_STORAGE_KEY);
    if (isBonoDesignId(stored)) return stored;
  } catch {
    // Blocked storage just means the default design is used.
  }
  return defaultBonoDesign;
}

export function BonosPage() {
  const { t, language } = useLanguage();
  const [design, setDesign] = useState<BonoDesignId>(readStoredDesign);
  const [sessions, setSessions] = useState<VoucherSessions>(5);
  const [minutes, setMinutes] = useState<VoucherDuration>(90);

  // Carried through so the same design reaches checkout and issuance once
  // those exist. Today it also travels in the enquiry email.
  useEffect(() => {
    try {
      localStorage.setItem(DESIGN_STORAGE_KEY, design);
    } catch {
      // Non-fatal.
    }
  }, [design]);

  const card = voucherCards.find((entry) => entry.sessions === sessions);
  const rate = voucherRateFor(sessions, minutes);
  const packageId = `${sessions}x${minutes}`;

  const enquiryBody = `${t("booking.enquiryBody")}%0D%0A%0D%0A${encodeURIComponent(
    `${sessions} × ${minutes} min · ${design}`,
  )}`;

  return (
    <PageContainer>
      <PageMeta page="bonos" />

      <div className="psl-bono-head">
        <div className="psl-bono-head__body">
          <p className="psl-eyebrow">{t("bonos.eyebrow")}</p>
          {!readiness.bonoSalesReady ? (
            <p className="psl-badge-soon">{t("prelaunch.bonoBadge")}</p>
          ) : null}
          <h1 className="psl-title">{t("bonos.title")}</h1>
          <p className="psl-copy psl-copy--lead">
            {readiness.bonoSalesReady
              ? t("bonos.subtitle")
              : t("bonos.subtitleSoon")}
          </p>
          <p className="psl-copy">{t("bonos.intro")}</p>
          {!readiness.bonoSalesReady ? (
            <p className="psl-copy psl-copy--small">{t("prelaunch.bonoNotice")}</p>
          ) : null}
        </div>

        <BonoPhonePreview
          design={design}
          sessions={sessions}
          minutes={minutes}
        />
      </div>

      <section className="psl-section" aria-labelledby="bono-steps-heading">
        <h2 id="bono-steps-heading" className="psl-title">
          {t("bonos.stepsTitle")}
        </h2>
        <ol className="psl-bono-steps">
          {steps.map(({ id, Icon }, index) => (
            <li key={id} className="psl-bono-step">
              <span className="psl-bono-step__icon">
                <Icon />
              </span>
              <span className="psl-bono-step__index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="psl-bono-step__title">
                {t(`bonos.steps.${id}.title`)}
              </h3>
              <p className="psl-bono-step__body">
                {t(`bonos.steps.${id}.body`)}
              </p>
            </li>
          ))}
        </ol>
        {readiness.balanceUpdatesReady ? (
          <p className="psl-copy psl-copy--small">{t("bonos.remainingReady")}</p>
        ) : (
          <PendingNote label={t("prelaunch.previewLabel")}>
            {t("bonos.stepsNote")}
          </PendingNote>
        )}
      </section>

      <section className="psl-section" aria-labelledby="bono-packages-heading">
        <h2 id="bono-packages-heading" className="psl-title">
          {t("bonos.packagesTitle")}
        </h2>
        <p className="psl-copy">{t("bonos.packagesDescription")}</p>

        <div className="psl-bono-choices">
          <fieldset className="psl-bono-choice">
            <legend className="psl-bono-choice__legend">
              {t("bonos.sessionsLabel")}
            </legend>
            <div className="psl-bono-choice__options">
              {voucherCards.map((entry) => (
                <label key={entry.sessions} className="psl-bono-chip">
                  <input
                    type="radio"
                    name="bono-sessions"
                    value={entry.sessions}
                    checked={entry.sessions === sessions}
                    onChange={() => setSessions(entry.sessions)}
                  />
                  <span>
                    {t("bonos.sessionsOption", { count: entry.sessions })}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="psl-bono-choice">
            <legend className="psl-bono-choice__legend">
              {t("bonos.durationLabel")}
            </legend>
            <div className="psl-bono-choice__options">
              {pricingPolicy.voucherCardDurations.map((duration) => (
                <label key={duration} className="psl-bono-chip">
                  <input
                    type="radio"
                    name="bono-duration"
                    value={duration}
                    checked={duration === minutes}
                    onChange={() => setMinutes(duration)}
                  />
                  <span>{t("pricing.durationMinutes", { minutes: duration })}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        <BonoDesignPicker value={design} onChange={setDesign} />

        <div className="psl-bono-summary" aria-live="polite">
          <h3 className="psl-bono-summary__title">{t("bonos.summaryTitle")}</h3>
          <dl className="psl-bono-summary__list">
            <div>
              <dt>{t("bonos.summarySessions", { count: sessions, minutes })}</dt>
              <dd>{t("pricing.durationMinutes", { minutes })}</dd>
            </div>
            <div>
              <dt>{t("bonos.summaryTotal")}</dt>
              <dd className="psl-bono-summary__total">
                {formatPrice(rate.totalCents, language)}
              </dd>
            </div>
            <div>
              <dt>{t("bonos.summaryPerSession")}</dt>
              <dd>{formatPrice(rate.perSessionCents, language)}</dd>
            </div>
            <div>
              <dt>{t("bonos.summarySaving")}</dt>
              <dd>{formatPrice(rate.savingCents, language)}</dd>
            </div>
            <div>
              <dt>{t("bonos.summaryValidity")}</dt>
              <dd>
                {t("bonos.summaryValidityValue", {
                  months: card?.validityMonths ?? 0,
                })}
              </dd>
            </div>
          </dl>

          <PendingNote label={t("prelaunch.previewLabel")}>
            {t("bonos.validityStartPending")}
          </PendingNote>

          {readiness.bonoSalesReady ? (
            <button
              type="button"
              className="psl-button psl-button--dark"
              onClick={() =>
                track({
                  name: "bono_checkout_started",
                  packageId,
                  design,
                })
              }
            >
              {t("bonos.packagesTitle")}
            </button>
          ) : (
            <a
              href={mailto(
                `${t("bonos.eyebrow")} · ${sessions} × ${minutes} min`,
                enquiryBody,
              )}
              className="psl-button psl-button--dark"
            >
              {t("prelaunch.bonoCta")}
            </a>
          )}

          <p className="psl-copy psl-copy--small">{t("pricing.taxNote")}</p>
          <Link to="/condiciones-bonos" className="psl-textlink">
            {t("bonos.termsLink")}
          </Link>
        </div>

        {!readiness.bonoSalesReady ? (
          <PendingNote label={t("prelaunch.previewLabel")}>
            {t("bonos.walletPending")}
          </PendingNote>
        ) : null}
      </section>

      <section className="psl-bono-return" aria-labelledby="bono-return-heading">
        <h2 id="bono-return-heading" className="psl-bono-return__title">
          {t("bonos.returnTitle")}
        </h2>
        <Link
          to="/#durations"
          className="psl-button psl-button--ghost"
          onClick={() =>
            track({
              name: "booking_cta_clicked",
              placement: "bono_return",
              language,
            })
          }
        >
          {t("bonos.returnCta")}
        </Link>
      </section>
    </PageContainer>
  );
}
