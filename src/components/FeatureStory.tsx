import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

type FeatureStoryProps = {
  titleKey: string;
  descriptionKey: string;
  image: string;
  imageAlt: string;
  imagePosition?: string;
  actionLabelKey: string;
  actionTo: string;
  reverse?: boolean;
  badge?: string;
};

export function FeatureStory({
  titleKey,
  descriptionKey,
  image,
  imageAlt,
  imagePosition,
  actionLabelKey,
  actionTo,
  reverse = false,
  badge,
}: FeatureStoryProps) {
  const { t } = useLanguage();

  return (
    <section
      className={`psl-feature psl-container psl-section${reverse ? " psl-feature--reverse" : ""}`}
    >
      <div className="psl-feature__body">
        <h2 className="psl-title">{t(titleKey)}</h2>
        <p className="psl-copy">{t(descriptionKey)}</p>
        <Link to={actionTo} className="psl-button">
          {t(actionLabelKey)}
        </Link>
      </div>
      <figure className="psl-feature__media">
        <img
          src={image}
          alt={imageAlt}
          loading="lazy"
          sizes="(max-width: 767px) calc(100vw - 40px), 40vw"
          style={imagePosition ? { objectPosition: imagePosition } : undefined}
        />
        {badge && <figcaption className="psl-badge">{badge}</figcaption>}
      </figure>
    </section>
  );
}
