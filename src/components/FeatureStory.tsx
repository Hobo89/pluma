import { Link } from "react-router-dom";
import { recommendedDuration } from "../config/pricing";
import { useLanguage } from "../context/LanguageContext";
import type { AnalyticsEvent } from "../lib/analytics";
import { BookingAction } from "./BookingAction";
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
  portrait?: string;
  portraitAlt?: string;
  collage?: readonly PhotoClusterImage[];
  collageLabelKey?: string;
  video?: string;
  videoPoster?: string;
  videoLabelKey?: string;
  actionLabelKey: string;
  actionTo?: string;
  bookingPlacement?: Extract<
    AnalyticsEvent,
    { name: "booking_cta_clicked" }
  >["placement"];
  reverse?: boolean;
  badge?: string;
  highlights?: "studio";
  noteKey?: string;
};

export function FeatureStory({
  titleKey,
  descriptionKey,
  image,
  imageAlt = "",
  imagePosition,
  portrait,
  portraitAlt = "",
  collage,
  collageLabelKey,
  video,
  videoPoster,
  videoLabelKey,
  actionLabelKey,
  actionTo,
  bookingPlacement,
  reverse = false,
  badge,
  highlights,
  noteKey,
}: FeatureStoryProps) {
  const { t } = useLanguage();
  const hasCollage = Boolean(collage?.length);
  const hasVideo = Boolean(video);
  const stillsBelowVideo = hasVideo && hasCollage;

  return (
    <section
      className={`psl-feature psl-container psl-section${reverse ? " psl-feature--reverse" : ""}${hasVideo ? " psl-feature--video" : ""}${stillsBelowVideo ? " psl-feature--stills" : ""}`}
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
        {bookingPlacement ? (
          <BookingAction
            label={t(actionLabelKey)}
            duration={recommendedDuration}
            placement={bookingPlacement}
          />
        ) : (
          <Link to={actionTo ?? "/"} className="psl-button">
            {t(actionLabelKey)}
          </Link>
        )}
        {noteKey ? (
          <p className="psl-feature__note" role="note">
            <span className="psl-feature__note-icon" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4" />
                <path d="M12 8h.01" />
              </svg>
            </span>
            {t(noteKey)}
          </p>
        ) : null}
      </div>
      {video ? (
        <figure className="psl-feature__media psl-feature__media--video">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster={videoPoster}
            aria-label={
              videoLabelKey ? t(videoLabelKey) : t(collageLabelKey ?? titleKey)
            }
          >
            <source src={video} type="video/mp4" />
          </video>
        </figure>
      ) : hasCollage && collage ? (
        <div className="psl-feature__media psl-feature__media--cluster">
          <PhotoCluster
            images={collage}
            label={collageLabelKey ? t(collageLabelKey) : t(titleKey)}
          />
        </div>
      ) : (
        <figure
          className={`psl-feature__media${portrait ? " psl-feature__media--with-portrait" : ""}`}
        >
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
          {portrait && (
            <img
              className="psl-feature__portrait"
              src={portrait}
              alt={portraitAlt}
              loading="lazy"
              sizes="(max-width: 767px) 40vw, 12vw"
            />
          )}
          {badge && <figcaption className="psl-badge">{badge}</figcaption>}
        </figure>
      )}
      {stillsBelowVideo && collage ? (
        <div className="psl-feature__stills">
          <PhotoCluster
            images={collage}
            label={collageLabelKey ? t(collageLabelKey) : t(titleKey)}
          />
        </div>
      ) : null}
    </section>
  );
}
