import { Link } from "react-router-dom";
import { bonoDesignById, defaultBonoDesign } from "../config/bonos";
import { readiness } from "../config/readiness";
import { useLanguage } from "../context/LanguageContext";
import { BonoCard } from "./BonoCard";

/**
 * A compact pointer to the bono page.
 *
 * Deliberately not the full selector: a repeat-visit product must not sit
 * between a first-time visitor and booking a single session.
 */
export function BonoTeaser() {
  const { t } = useLanguage();
  const design = bonoDesignById(defaultBonoDesign);

  return (
    <section
      aria-labelledby="bono-teaser-heading"
      className="psl-container psl-bono-teaser"
    >
      <div className="psl-bono-teaser__body">
        <p className="psl-eyebrow">{t("bonos.eyebrow")}</p>
        <h2 id="bono-teaser-heading" className="psl-bono-teaser__title">
          {t("bonos.title")}
        </h2>
        <p className="psl-copy">
          {readiness.bonoSalesReady
            ? t("bonos.subtitle")
            : t("prelaunch.bonoNotice")}
        </p>
        <Link to="/member-card" className="psl-button psl-button--ghost">
          {t("pricing.bonoLink")}
        </Link>
      </div>

      <BonoCard
        design={design}
        alt=""
        sizes="(max-width: 767px) 60vw, 260px"
        className="psl-bono-teaser__art"
      />
    </section>
  );
}
