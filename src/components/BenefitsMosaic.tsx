import { useLanguage } from "../context/LanguageContext";

type BenefitCard = {
  id: "arrive" | "settle" | "privacy";
  image: string;
  imagePosition?: string;
};

const cards: BenefitCard[] = [
  {
    id: "arrive",
    image: "/assets/images/stephen.jpg",
    imagePosition: "62% 28%",
  },
  {
    id: "settle",
    image: "/assets/images/studio-room.jpg",
    imagePosition: "42% 78%",
  },
  {
    id: "privacy",
    image: "/assets/images/session-attention.jpg",
  },
];

const stripItems = [
  "attention",
  "languages",
  "changing",
  "draping",
  "market",
] as const;

export function BenefitsMosaic() {
  const { t } = useLanguage();

  return (
    <section
      aria-labelledby="benefits-heading"
      className="psl-container psl-section--roomy psl-benefits"
    >
      <div className="psl-section-head psl-section-head--stack">
        <p className="psl-eyebrow">{t("benefits.eyebrow")}</p>
        <h2 id="benefits-heading" className="psl-title">
          {t("benefits.title")}
        </h2>
        <p className="psl-copy">{t("benefits.description")}</p>
      </div>

      <div className="psl-bento psl-bento--benefits">
        {cards.map(({ id, image, imagePosition }) => (
          <article key={id} className={`psl-tile psl-tile--${id}`}>
            <img
              src={image}
              alt=""
              loading="lazy"
              sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 991px) 30vw, 22vw"
              style={
                imagePosition ? { objectPosition: imagePosition } : undefined
              }
            />
            <div className="psl-tile__copy">
              <h3>{t(`benefits.${id}.title`)}</h3>
              <p className="psl-copy">{t(`benefits.${id}.body`)}</p>
            </div>
          </article>
        ))}
      </div>

      <ul className="psl-benefits-strip">
        {stripItems.map((id) => (
          <li key={id}>{t(`benefits.strip.${id}`)}</li>
        ))}
      </ul>
    </section>
  );
}
