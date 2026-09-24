import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import {
  featuredReviewId,
  testimonialById,
} from "../content/testimonials";
import { BrandMarkedHeading } from "./BrandMarkedHeading";
import { HashLink } from "./HashLink";
import { ReviewCard } from "./ReviewCard";
import { Typewriter } from "./Typewriter";

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
  const { t, language } = useLanguage();
  const featured = showReview ? testimonialById(featuredReviewId) : null;
  const HeadingTag = headingLevel;
  const welcome = t("about.meetWelcome");
  const rest = t("about.meetTitle");
  const titleText = `${welcome}\n${rest}`;
  const [typed, setTyped] = useState(false);
  const markTyped = useCallback(() => setTyped(true), []);

  useEffect(() => {
    setTyped(false);
  }, [language, titleText]);

  return (
    <section
      id="stephen"
      className={`psl-meet${nested ? "" : " psl-container psl-section--roomy"}${showReview ? " psl-meet--with-review" : ""}${showMedia ? "" : " psl-meet--text-only"}`}
      aria-labelledby="meet-stephen-heading"
    >
      <div className="psl-meet__intro">
        <div className="psl-meet__body">
          {typed ? (
            <BrandMarkedHeading
              as={headingLevel}
              id="meet-stephen-heading"
              className="psl-title psl-meet__title"
              text={titleText}
              word={t("about.meetTitleHighlight")}
            />
          ) : (
            <HeadingTag
              key={`${language}:${titleText}`}
              id="meet-stephen-heading"
              className="psl-title psl-meet__title"
            >
              <Typewriter
                as="span"
                text={titleText}
                speed={55}
                initialDelay={200}
                loop={false}
                showCursor
                cursorChar="|"
                className="psl-meet__typewriter"
                onComplete={markTyped}
              />
            </HeadingTag>
          )}
          <p className="psl-copy psl-copy--lead">{t("about.facts")}</p>
          <p className="psl-copy">{t("about.adapt")}</p>
          {showAboutLink ? (
            <Link to="/about" className="psl-button psl-button--ghost">
              {t("hero.learnMore")}
            </Link>
          ) : null}
        </div>

        {showMedia ? (
          <Link
            to="/about"
            className="psl-meet__media-link"
            aria-label={t("about.stephenPhotoAlt")}
          >
            <figure className="psl-meet__media">
              <img
                src="/assets/images/stephen.jpg"
                alt=""
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
          </Link>
        ) : null}
      </div>

      {featured ? (
        <aside className="psl-meet__review" aria-label={t("reviews.featuredLabel")}>
          <ReviewCard {...featured} />
          <HashLink to="/#reviews" className="psl-button psl-button--ghost">
            {t("about.seeReviews")}
          </HashLink>
        </aside>
      ) : null}
    </section>
  );
}
