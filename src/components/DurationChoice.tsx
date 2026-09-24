import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { SessionCards } from "./SessionCards";

/**
 * Homepage duration chooser: shared session cards plus section framing.
 */
export function DurationChoice({ compact = false }: { compact?: boolean }) {
  const { t } = useLanguage();

  return (
    <section
      id="durations"
      aria-labelledby="durations-heading"
      className="psl-container psl-section--roomy"
    >
      <div className="psl-section-head psl-section-head--stack">
        <h2 id="durations-heading" className="psl-title">
          {t("durations.title")}
        </h2>
        <p className="psl-copy">{t("durations.description")}</p>
        <p className="psl-copy">{t("durations.principle")}</p>
      </div>

      <SessionCards placement="durations" headingIdPrefix="duration" />

      {compact ? null : (
        <p className="psl-copy psl-copy--small psl-durations__terms">
          {t("pricing.taxNote")}{" "}
          <Link to="/condiciones-reserva" className="psl-textlink">
            {t("durations.termsLink")}
          </Link>
        </p>
      )}
    </section>
  );
}
