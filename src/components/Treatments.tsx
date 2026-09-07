import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

const services: {
  id: "atStudio" | "onSite";
  image: string;
  imagePosition?: string;
  comingSoon?: boolean;
}[] = [
  {
    id: "atStudio",
    image: "/assets/images/at-studio.jpg",
    imagePosition: "52% 28%",
  },
  {
    id: "onSite",
    image: "/assets/images/valencia-map.svg",
    comingSoon: true,
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

      <div className="psl-product-grid psl-product-grid--pair">
        {services.map(({ id, image, imagePosition, comingSoon }) => {
          const body = (
            <>
              <div className="psl-product__image">
                <img
                  src={image}
                  alt=""
                  loading="lazy"
                  sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 991px) 45vw, 33vw"
                  style={
                    imagePosition ? { objectPosition: imagePosition } : undefined
                  }
                />
              </div>
              <div className="psl-product__meta">
                <div className="psl-product__heading">
                  <h3 className="psl-product__name">
                    {t(`treatments.${id}.name`)}
                  </h3>
                  {comingSoon ? (
                    <span className="psl-product__soon">
                      {t("treatments.comingSoon")}
                    </span>
                  ) : null}
                </div>
                <p className="psl-product__description">
                  {t(`treatments.${id}.description`)}
                </p>
              </div>
            </>
          );

          return (
            <article
              key={id}
              className={`psl-product${comingSoon ? " psl-product--soon" : ""}`}
            >
              {comingSoon ? (
                body
              ) : (
                <Link to="/book" className="psl-product__link">
                  {body}
                </Link>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
