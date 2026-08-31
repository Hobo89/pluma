import { useLanguage } from "../context/LanguageContext";

const tiles = [
  { slot: "proof", id: "proof" as const, image: null },
  { slot: "leaf", id: "leaf" as const, image: "/assets/images/mediterranean-gradient.png" },
  { slot: "landscape", id: "landscape" as const, image: "/assets/images/mediterranean-gradient.jpg" },
  { slot: "texture", id: "texture" as const, image: "/assets/images/stephen.jpg" },
  { slot: "portrait", id: "portrait" as const, image: "/testimonials/carla.jpg" },
] as const;

export function BenefitsMosaic() {
  const { t } = useLanguage();

  return (
    <section
      aria-labelledby="benefits-heading"
      className="psl-container psl-section--roomy"
    >
      <div className="psl-section-head psl-section-head--center">
        <h2 id="benefits-heading" className="psl-title">
          {t("benefits.title")}
        </h2>
        <p className="psl-copy">{t("benefits.description")}</p>
      </div>

      <div className="psl-bento">
        {tiles.map(({ slot, id, image }) => (
          <article key={id} className={`psl-tile psl-tile--${slot}`}>
            {image && (
              <img
                src={image}
                alt=""
                loading="lazy"
                sizes="(max-width: 767px) calc(100vw - 40px), 30vw"
              />
            )}
            {slot === "proof" ? (
              <div>
                <p className="psl-copy" style={{ maxWidth: "28ch" }}>
                  {t("benefits.proof")}
                </p>
              </div>
            ) : (
              <h3>{t(`benefits.${id}.title`)}</h3>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
