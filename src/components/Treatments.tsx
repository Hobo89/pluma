import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

const treatments = [
  {
    id: "deepTissue",
    image: "/assets/images/mediterranean-gradient.jpg",
  },
  {
    id: "relaxation",
    image: "/assets/images/stephen.jpg",
  },
  {
    id: "recovery",
    image: "/assets/images/mediterranean-gradient.png",
  },
] as const;

export function Treatments() {
  const { t } = useLanguage();

  return (
    <section
      aria-labelledby="treatments-heading"
      className="psl-container psl-section--roomy"
    >
      <div className="psl-section-head">
        <h2 id="treatments-heading" className="psl-title">
          {t("treatments.title")}
        </h2>
        <p className="psl-copy">{t("treatments.description")}</p>
      </div>

      <div className="psl-product-grid">
        {treatments.map(({ id, image }) => (
          <article key={id} className="psl-product">
            <Link to="/book" className="psl-product__link">
              <div className="psl-product__image">
                <img
                  src={image}
                  alt=""
                  loading="lazy"
                  sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 991px) 30vw, 22vw"
                />
              </div>
              <div className="psl-product__meta">
                <span className="psl-product__category">
                  {t(`treatments.${id}.category`)}
                </span>
                <h3 className="psl-product__name">
                  {t(`treatments.${id}.name`)}
                </h3>
                <span className="psl-product__price">
                  {t(`treatments.${id}.duration`)}
                </span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
