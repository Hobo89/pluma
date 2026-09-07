import type { CSSProperties } from "react";
import { clientMix } from "../config/clients";
import { useLanguage } from "../context/LanguageContext";

export function ClientMix() {
  const { t } = useLanguage();
  const { femalePercent, malePercent } = clientMix;

  return (
    <section
      aria-labelledby="clients-heading"
      className="psl-container psl-section--roomy"
    >
      <div className="psl-section-head psl-section-head--stack">
        <h2 id="clients-heading" className="psl-title">
          {t("clients.title")}
        </h2>
        <p className="psl-copy">{t("clients.description")}</p>
      </div>

      <p className="psl-sr-only">
        {t("clients.summary")
          .replace("{female}", String(femalePercent))
          .replace("{male}", String(malePercent))}
      </p>

      <div
        className="psl-client-mix"
        style={
          {
            "--psl-client-female": `${femalePercent}fr`,
            "--psl-client-male": `${malePercent}fr`,
          } as CSSProperties
        }
      >
        <article className="psl-client-mix__panel psl-client-mix__panel--female">
          <p className="psl-client-mix__value" aria-hidden="true">
            {femalePercent}%
          </p>
          <p className="psl-client-mix__label" aria-hidden="true">
            {t("clients.female")}
          </p>
        </article>
        <article className="psl-client-mix__panel psl-client-mix__panel--male">
          <p className="psl-client-mix__value" aria-hidden="true">
            {malePercent}%
          </p>
          <p className="psl-client-mix__label" aria-hidden="true">
            {t("clients.male")}
          </p>
        </article>
      </div>
    </section>
  );
}
