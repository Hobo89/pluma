import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

const services: {
  id: "atStudio" | "onSite" | "events";
  image: string;
  imagePosition?: string;
}[] = [
  {
    id: "atStudio",
    image: "/assets/images/candle-leaf.jpg",
    imagePosition: "50% 45%",
  },
  {
    id: "onSite",
    image: "/assets/images/stephen.jpg",
  },
  {
    id: "events",
    image: "/assets/images/stephen-company-event-massage.jpg",
  },
];

export function Treatments() {
  const { t } = useLanguage();

  return (
    <section
      id="treatments"
      aria-labelledby="treatments-heading"
      className="psl-container psl-section--roomy"
    >
      <div className="psl-section-head psl-section-head--stack">
        <h2 id="treatments-heading" className="psl-title">
          {t("treatments.title")}
        </h2>
        <p className="psl-copy">{t("treatments.description")}</p>
      </div>

      <div className="psl-product-grid">
        {services.map(({ id, image, imagePosition }) => (
          <article key={id} className="psl-product">
            <Link to="/book" className="psl-product__link">
              <div className="psl-product__image">
                <img
                  src={image}
                  alt=""
                  loading="lazy"
                  sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 991px) 30vw, 22vw"
                  style={imagePosition ? { objectPosition: imagePosition } : undefined}
                />
              </div>
              <div className="psl-product__meta">
                <h3 className="psl-product__name">
                  {t(`treatments.${id}.name`)}
                </h3>
                <p className="psl-product__description">
                  {t(`treatments.${id}.description`)}
                </p>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
