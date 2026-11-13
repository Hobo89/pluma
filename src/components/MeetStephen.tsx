import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import {
  featuredReviewId,
  testimonialById,
  type TestimonialRecord,
} from "../content/testimonials";
import { BlurUpImage } from "./BlurUpImage";
import { BookingAction } from "./BookingAction";
import { BrandMarkedHeading } from "./BrandMarkedHeading";
import { HashLink } from "./HashLink";
import { ReviewCard } from "./ReviewCard";
import { useNearViewport } from "../lib/useNearViewport";

const MEET_MOTION = {
  poster: "/assets/images/stephen-massage-smile-pluma-poster.webp",
  mobile: "/assets/images/stephen-massage-smile-pluma-mobile.webp",
  desktop: "/assets/images/stephen-massage-smile-pluma-desktop.webp",
  width: 1024,
  height: 576,
} as const;

function prefersStillMedia() {
  if (typeof window === "undefined") return true;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return reduce || navigator.connection?.saveData === true;
}

function useStillMedia() {
  const [still, setStill] = useState(prefersStillMedia);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setStill(prefersStillMedia());
    update();
    motion.addEventListener("change", update);
    navigator.connection?.addEventListener?.("change", update);
    return () => {
      motion.removeEventListener("change", update);
      navigator.connection?.removeEventListener?.("change", update);
    };
  }, []);

  return still;
}

/** Portrait crop of the graded smile loop. Phones get the 640 frame; wider
 * screens get the 1024 frame. Reduced motion and data saver stay on the still. */
function MeetMotionPhoto({ eager }: { eager: boolean }) {
  const still = useStillMedia();
  const { ref, near } = useNearViewport<HTMLSpanElement>({ eager });
  const fullRef = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);
  const play = near && !still;
  const [playing, setPlaying] = useState(play);
  if (play !== playing) {
    setPlaying(play);
    setLoaded(false);
  }

  useEffect(() => {
    const image = fullRef.current;
    if (play && image?.complete && image.naturalWidth > 0) setLoaded(true);
  }, [play]);

  return (
    <span
      ref={ref}
      className="psl-blur-up psl-blur-up--fill is-loaded"
      style={{ objectPosition: "64% 18%" }}
    >
      <img
        className="psl-blur-up__full"
        src={MEET_MOTION.poster}
        alt=""
        width={MEET_MOTION.width}
        height={MEET_MOTION.height}
        decoding="async"
        draggable={false}
      />
      {play ? (
        <picture className={`psl-meet__motion${loaded ? " is-ready" : ""}`}>
          <source
            media="(max-width: 767px)"
            srcSet={MEET_MOTION.mobile}
            type="image/webp"
          />
          <source srcSet={MEET_MOTION.desktop} type="image/webp" />
          <img
            ref={fullRef}
            src={MEET_MOTION.desktop}
            alt=""
            width={MEET_MOTION.width}
            height={MEET_MOTION.height}
            decoding="async"
            onLoad={() => setLoaded(true)}
          />
        </picture>
      ) : null}
    </span>
  );
}

function FeaturedReview({ review }: { review: TestimonialRecord }) {
  const { t } = useLanguage();

  return (
    <aside className="psl-meet__review" aria-label={t("reviews.featuredLabel")}>
      <ReviewCard {...review} variant="strip" />
      <HashLink
        to="/#reviews"
        className="psl-button psl-button--ghost psl-meet__reviews"
      >
        {t("about.seeReviews")}
      </HashLink>
    </aside>
  );
}

type MeetStephenProps = {
  headingLevel?: "h1" | "h2";
  showReview?: boolean;
  showAboutLink?: boolean;
  showMedia?: boolean;
  nested?: boolean;
};

export function MeetStephen({
  headingLevel = "h2",
  showReview = false,
  showAboutLink = false,
  showMedia = true,
  nested = false,
}: MeetStephenProps) {
  const { t } = useLanguage();
  const featured = showReview ? testimonialById(featuredReviewId) : null;
  const titleText = `${t("about.meetWelcome")}\n${t("about.meetTitle")}`;

  return (
    <section
      id="stephen"
      className={`psl-meet${nested ? "" : " psl-container psl-section--roomy"}${showReview ? " psl-meet--with-review" : ""}${showMedia ? "" : " psl-meet--text-only"}`}
      aria-labelledby="meet-stephen-heading"
    >
      <div className="psl-meet__intro">
        <div className="psl-meet__body">
          <BrandMarkedHeading
            as={headingLevel}
            id="meet-stephen-heading"
            className="psl-title psl-meet__title"
            text={titleText}
            word={t("about.meetTitleHighlight")}
          />
          <p className="psl-copy psl-copy--lead">{t("about.facts")}</p>
          <p className="psl-copy">{t("about.adapt")}</p>
          {showAboutLink || featured ? (
            <div className="psl-actions psl-meet__actions">
              <BookingAction
                label={t("about.bookMassage")}
                placement="meet"
                className="psl-button psl-meet__book"
              />
              {showAboutLink ? (
                <Link
                  to="/about"
                  className="psl-button psl-button--ghost psl-meet__learn"
                >
                  {t("hero.learnMore")}
                </Link>
              ) : null}
            </div>
          ) : null}
        </div>

        {showMedia ? (
          <div className="psl-meet__stage">
            <Link
              to="/about"
              className="psl-meet__media-link"
              aria-label={t("about.stephenPhotoAlt")}
            >
              <figure className="psl-meet__media">
                <MeetMotionPhoto eager={headingLevel === "h1"} />
              </figure>
              <BlurUpImage
                className="psl-meet__portrait"
                src="/assets/images/stephen-portrait.jpg"
                alt=""
                width={763}
                height={1024}
                fill
                sizes="180px"
              />
            </Link>
            {featured ? <FeaturedReview review={featured} /> : null}
          </div>
        ) : featured ? (
          <FeaturedReview review={featured} />
        ) : null}
      </div>
    </section>
  );
}
