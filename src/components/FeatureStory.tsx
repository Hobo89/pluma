import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import {
  FeatureHighlights,
  studioHighlightIds,
} from "./FeatureHighlights";
import { PhotoCluster, type PhotoClusterImage } from "./PhotoCluster";

type FeatureStoryProps = {
  titleKey: string;
  descriptionKey: string;
  image?: string;
  imageAlt?: string;
  imagePosition?: string;
  collage?: readonly PhotoClusterImage[];
  collageLabelKey?: string;
  actionLabelKey: string;
  actionTo: string;
  reverse?: boolean;
  badge?: string;
  highlights?: "studio";
};

export function FeatureStory({
  titleKey,
  descriptionKey,
  image,
  imageAlt = "",
  imagePosition,
  collage,
  collageLabelKey,
  actionLabelKey,
  actionTo,
  reverse = false,
  badge,
  highlights,
}: FeatureStoryProps) {
  const { t } = useLanguage();
  const hasCollage = Boolean(collage?.length);

  return (
    <section
      className={`psl-feature psl-container psl-section${reverse ? " psl-feature--reverse" : ""}`}
    >
      <div className="psl-feature__body">
        <h2 className="psl-title">{t(titleKey)}</h2>
        <p className="psl-copy">{t(descriptionKey)}</p>
        {highlights === "studio" && (
          <FeatureHighlights
            ids={studioHighlightIds}
            label={(id) => t(`studio.highlights.${id}`)}
          />
        )}
        <Link to={actionTo} className="psl-button">
          {t(actionLabelKey)}
        </Link>
      </div>
      {hasCollage && collage ? (
        <div className="psl-feature__media psl-feature__media--cluster">
          <PhotoCluster
            images={collage}
            label={collageLabelKey ? t(collageLabelKey) : t(titleKey)}
          />
        </div>
      ) : (
        <figure className="psl-feature__media">
          {image && (
            <img
              src={image}
              alt={imageAlt}
              loading="lazy"
              sizes="(max-width: 767px) calc(100vw - 40px), 40vw"
              style={
                imagePosition ? { objectPosition: imagePosition } : undefined
              }
            />
          )}
          {badge && <figcaption className="psl-badge">{badge}</figcaption>}
        </figure>
      )}
    </section>
  );
}
