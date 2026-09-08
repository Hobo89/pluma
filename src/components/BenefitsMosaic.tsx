import { useLanguage } from "../context/LanguageContext";

const tiles: {
  slot: "proof" | "leaf" | "landscape" | "texture" | "languages";
  id: "proof" | "leaf" | "landscape" | "texture" | "languages";
  image: string | null;
  imagePosition?: string;
}[] = [
  { slot: "proof", id: "proof", image: null },
  {
    slot: "leaf",
    id: "leaf",
    image: "/assets/images/candle-leaf.jpg",
    imagePosition: "50% 45%",
  },
  { slot: "landscape", id: "landscape", image: "/assets/images/mediterranean-gradient.jpg" },
  { slot: "texture", id: "texture", image: "/assets/images/stephen.jpg" },
  { slot: "languages", id: "languages", image: null },
];

export function BenefitsMosaic() {
  const { t } = useLanguage();

  return (
    <section
      aria-labelledby="benefits-heading"
      className="psl-container psl-section--roomy"
    >
      <div className="psl-section-head psl-section-head--stack">
        <h2 id="benefits-heading" className="psl-title">
          {t("benefits.title")}
        </h2>
        <p className="psl-copy">{t("benefits.description")}</p>
      </div>

      <div className="psl-bento psl-bento--benefits">
        {tiles.map(({ slot, id, image, imagePosition }) => (
          <article key={id} className={`psl-tile psl-tile--${slot}`}>
            {image && (
              <img
                src={image}
                alt=""
                loading="lazy"
                sizes="(max-width: 767px) calc(100vw - 40px), 30vw"
                style={imagePosition ? { objectPosition: imagePosition } : undefined}
              />
            )}
            <div className="psl-tile__copy">
              <h3>{t(`benefits.${id}.title`)}</h3>
              <p className="psl-copy">{t(`benefits.${id}.body`)}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
