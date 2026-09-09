import { bonoDesignById, type BonoDesignId } from "../config/bonos";
import { readiness } from "../config/readiness";
import type { VoucherDuration, VoucherSessions } from "../config/pricing";
import { useLanguage } from "../context/LanguageContext";
import { BalanceIcon } from "./BonoIcons";

type BonoPhonePreviewProps = {
  design: BonoDesignId;
  sessions: VoucherSessions;
  minutes: VoucherDuration;
};

/**
 * A generic phone frame that explains digital delivery.
 *
 * It is not a rendering of an Apple or Google Wallet pass and the session count
 * is illustrative, both of which are stated in visible text next to it.
 */
export function BonoPhonePreview({
  design,
  sessions,
  minutes,
}: BonoPhonePreviewProps) {
  const { t } = useLanguage();
  const art = bonoDesignById(design);

  // Illustrative only: one session used out of the selected total.
  const remaining = sessions - 1;

  return (
    <figure className="psl-bono-phone">
      <div className="psl-bono-phone__frame">
        <span className="psl-bono-phone__speaker" aria-hidden="true" />
        <div className="psl-bono-phone__screen">
          <p className="psl-bono-phone__label">{t("bonos.previewTitle")}</p>
          <img
            src={art.webp}
            srcSet={`${art.webp} 376w, ${art.webp2x} 752w`}
            sizes="220px"
            alt={t("bonos.previewAlt")}
            width={art.width}
            height={art.height}
            loading="lazy"
            decoding="async"
            className="psl-bono-phone__art"
          />
          <p className="psl-bono-phone__caption">
            {t("bonos.previewRemaining")}
          </p>
          <p className="psl-bono-phone__count">
            {remaining} / {sessions}
          </p>
          <p className="psl-bono-phone__meta">
            {t("pricing.durationMinutes", { minutes })}
          </p>
          <p className="psl-bono-phone__sample">
            <BalanceIcon className="psl-bono-phone__sample-icon" />
            {t("bonos.previewSample")}
          </p>
          {readiness.balanceUpdatesReady ? (
            <p className="psl-bono-phone__note">{t("bonos.remainingReady")}</p>
          ) : null}
        </div>
      </div>
      <figcaption className="psl-bono-phone__disclaimer">
        {t("bonos.previewNote")}
      </figcaption>
    </figure>
  );
}
