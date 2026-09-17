import { useLanguage } from "../context/LanguageContext";
import { BrandMarkedHeading } from "./BrandMarkedHeading";

type BenefitCard = {
  id: "arrive" | "return" | "recover" | "yours";
  image: string;
};

const cards: BenefitCard[] = [
  {
    id: "arrive",
    image: "/assets/images/session-arrive.jpg",
  },
  {
    id: "return",
    image: "/assets/images/session-attention.jpg",
  },
  {
    id: "recover",
    image: "/assets/images/studio-room.jpg",
  },
  {
    id: "yours",
    image: "/assets/images/studio-tools.jpg",
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
        <BrandMarkedHeading
          id="benefits-heading"
          className="psl-title"
          text={t("benefits.title")}
          word={t("benefits.titleHighlight")}
        />
        <p className="psl-copy">{t("benefits.description")}</p>
      </div>

      <div className="psl-bento psl-bento--benefits">
        {cards.map(({ id, image }) => (
          <article key={id} className={`psl-tile psl-tile--${id}`}>
            <img
              src={image}
              alt=""
              loading="lazy"
              sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 991px) 45vw, 22vw"
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
