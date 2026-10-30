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
                <BlurUpImage
                  src="/assets/images/stephen.jpg"
                  alt=""
                  width={1024}
                  height={576}
                  fill
                  eager={headingLevel === "h1"}
                  sizes="(max-width: 767px) calc(100vw - 40px), 40vw"
                  style={{ objectPosition: "64% 18%" }}
                />
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
