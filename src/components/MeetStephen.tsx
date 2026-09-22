import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import {
  featuredReviewId,
  testimonialById,
} from "../content/testimonials";
import { HashLink } from "./HashLink";
import { ReviewCard } from "./ReviewCard";

type MeetStephenProps = {
  headingLevel?: "h1" | "h2";
  showReview?: boolean;
  showAboutLink?: boolean;
  nested?: boolean;
};

export function MeetStephen({
  headingLevel = "h2",
  showReview = false,
  showAboutLink = false,
  nested = false,
}: MeetStephenProps) {
  const { t } = useLanguage();
  const Heading = headingLevel;
  const featured = showReview ? testimonialById(featuredReviewId) : null;

  return (
    <section
      id="stephen"
      className={`psl-meet${nested ? "" : " psl-container psl-section--roomy"}${showReview ? " psl-meet--with-review" : ""}`}
      aria-labelledby="meet-stephen-heading"
    >
      <div className="psl-meet__intro">
        <div className="psl-meet__body">
          <Heading id="meet-stephen-heading" className="psl-title">
            {t("about.meetTitle")}
          </Heading>
          <p className="psl-copy psl-copy--lead">{t("about.facts")}</p>
          <p className="psl-copy">{t("about.adapt")}</p>
          {showAboutLink ? (
            <Link to="/about" className="psl-textlink">
              {t("hero.learnMore")}
            </Link>
          ) : null}
        </div>

        <figure className="psl-meet__media">
          <img
            src="/assets/images/stephen.jpg"
            alt={t("about.stephenPhotoAlt")}
            width={1024}
            height={576}
            loading={headingLevel === "h1" ? "eager" : "lazy"}
            sizes="(max-width: 767px) calc(100vw - 40px), 40vw"
            style={{ objectPosition: "64% 32%" }}
          />
          <img
            className="psl-feature__portrait"
            src="/assets/images/stephen-portrait.jpg"
            alt=""
            width={763}
            height={1024}
            loading="lazy"
            sizes="(max-width: 767px) 40vw, 12vw"
          />
        </figure>
      </div>

      {featured ? (
        <aside className="psl-meet__review" aria-label={t("reviews.featuredLabel")}>
          <ReviewCard {...featured} />
          <HashLink to="/#reviews" className="psl-textlink">
            {t("about.seeReviews")}
          </HashLink>
        </aside>
      ) : null}
    </section>
  );
}
