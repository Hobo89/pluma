import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import type { AnalyticsEvent } from "../lib/analytics";
import { useAmbientVideo } from "../lib/useAmbientVideo";
import { BookingAction } from "./BookingAction";
import { BrandMarkedHeading } from "./BrandMarkedHeading";
import {
  FeatureHighlights,
  studioHighlightIds,
} from "./FeatureHighlights";
import { PhotoCluster, type PhotoClusterImage } from "./PhotoCluster";

type FeatureStoryProps = {
  id?: string;
  titleKey: string;
  descriptionKey: string;
  extraDescriptionKey?: string;
  trustKey?: string;
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
  titleHighlightKey?: string;
  actionLabelKey?: string;
  actionTo?: string;
  mediaTo?: string;
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
  id,
  titleKey,
  descriptionKey,
  extraDescriptionKey,
  trustKey,
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
  titleHighlightKey,
  actionLabelKey,
  actionTo,
  mediaTo,
  bookingPlacement,
  reverse = false,
  badge,
  highlights,
  noteKey,
}: FeatureStoryProps) {
  const { t } = useLanguage();
  const videoRef = useAmbientVideo({ whenVisible: true });
  const hasCollage = Boolean(collage?.length);
  const hasVideo = Boolean(video);
  const stillsBelowVideo = hasVideo && hasCollage;
  const stillAlts = !mediaTo;
  const mediaLabel = mediaTo
    ? [actionLabelKey ? t(actionLabelKey) : null, imageAlt]
        .filter(Boolean)
        .join(". ")
    : "";
  const stills = (
    <>
      {image && (
        <img
          src={image}
          alt={stillAlts ? imageAlt : ""}
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
          alt={stillAlts ? portraitAlt : ""}
          loading="lazy"
          sizes="(max-width: 767px) 40vw, 12vw"
        />
      )}
    </>
  );

  return (
    <section
      id={id}
      className={`psl-feature psl-container psl-section${reverse ? " psl-feature--reverse" : ""}${hasVideo ? " psl-feature--video" : ""}${stillsBelowVideo ? " psl-feature--stills" : ""}`}
    >
      <div className="psl-feature__body">
        {titleHighlightKey ? (
          <BrandMarkedHeading
            className="psl-title"
            text={t(titleKey)}
            word={t(titleHighlightKey)}
          />
        ) : (
          <h2 className="psl-title">{t(titleKey)}</h2>
        )}
        <p className="psl-copy">{t(descriptionKey)}</p>
        {extraDescriptionKey ? (
          <p className="psl-copy">{t(extraDescriptionKey)}</p>
        ) : null}
        {trustKey ? (
          <p className="psl-copy psl-copy--small">{t(trustKey)}</p>
        ) : null}
        {highlights === "studio" && (
          <FeatureHighlights
            ids={studioHighlightIds}
            label={(highlightId) => t(`studio.highlights.${highlightId}`)}
          />
        )}
        {actionLabelKey && bookingPlacement ? (
          <BookingAction
            label={t(actionLabelKey)}
            placement={bookingPlacement}
          />
        ) : actionLabelKey ? (
          <Link to={actionTo ?? "/"} className="psl-button">
            {t(actionLabelKey)}
          </Link>
        ) : null}
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
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
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
          {mediaTo ? (
            <Link
              to={mediaTo}
              className="psl-feature__media-link"
              aria-label={mediaLabel}
            >
              {stills}
            </Link>
          ) : (
            stills
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
