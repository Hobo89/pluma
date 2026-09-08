import { useLanguage } from "../context/LanguageContext";

const typeIds = [
  "pregnancy",
  "relaxingLymphatic",
  "deepTissue",
  "sports",
] as const;

const typeImages: Partial<Record<(typeof typeIds)[number], string>> = {
  pregnancy: "/assets/images/pregnancy-illustration.png",
};

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
        {typeIds.map((id) => {
          const image = typeImages[id];

          return (
            <article key={id} className="psl-product">
              <div
                className={
                  image
                    ? "psl-product__image psl-product__image--illustration"
                    : "psl-product__image psl-product__image--placeholder"
                }
              >
                {image ? (
                  <img
                    src={image}
                    alt={t(`types.${id}Alt`)}
                    loading="lazy"
                    sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 991px) 45vw, 22vw"
                  />
                ) : null}
              </div>
              <div className="psl-product__meta">
                <h3 className="psl-product__name">{t(`types.${id}`)}</h3>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
