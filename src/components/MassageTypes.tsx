import { useLanguage } from "../context/LanguageContext";

const styles = ["relaxing", "firm"] as const;

/**
 * How a session can feel, in plain experiential language.
 *
 * Pregnancy and lymphatic work are named here only as things that are *not*
 * currently offered. They stay unpublished as selectable services until the
 * training, scope and suitability process behind them have been verified;
 * renaming them while still offering the same intervention would not fix the
 * underlying claim.
 */
export function MassageTypes() {
  const { t } = useLanguage();

  return (
    <section
      className="psl-container psl-section"
      aria-labelledby="massage-types-heading"
    >
      <div className="psl-section-head psl-section-head--stack">
        <p className="psl-eyebrow">{t("types.eyebrow")}</p>
        <h2 id="massage-types-heading" className="psl-title">
          {t("types.title")}
        </h2>
        <p className="psl-copy">{t("types.description")}</p>
      </div>

      <div className="psl-styles">
        {styles.map((id) => (
          <article key={id} className="psl-style">
            <h3 className="psl-style__title">{t(`types.${id}.title`)}</h3>
            <p className="psl-style__body">{t(`types.${id}.body`)}</p>
          </article>
        ))}
      </div>

      <p className="psl-copy psl-copy--small psl-styles__note">
        {t("types.note")}
      </p>

      <div className="psl-styles__draft">
        <h3 className="psl-styles__draft-title">{t("types.draft.title")}</h3>
        <p className="psl-copy psl-copy--small">{t("types.draft.body")}</p>
      </div>
    </section>
  );
}
