import { useLanguage } from "../context/LanguageContext";

const typeIds = [
  "pregnancy",
  "relaxingLymphatic",
  "deepTissue",
  "sports",
] as const;

export function MassageTypes() {
  const { t } = useLanguage();

  return (
    <section
      className="psl-container psl-section"
      aria-labelledby="massage-types-heading"
    >
      <div className="psl-section-head psl-section-head--stack">
        <h2 id="massage-types-heading" className="psl-title">
          {t("types.title")}
        </h2>
      </div>

      <div className="psl-product-grid psl-product-grid--types">
        {typeIds.map((id) => (
          <article key={id} className="psl-product">
            <div
              className="psl-product__image psl-product__image--placeholder"
              aria-hidden="true"
            />
            <div className="psl-product__meta">
              <h3 className="psl-product__name">{t(`types.${id}`)}</h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
