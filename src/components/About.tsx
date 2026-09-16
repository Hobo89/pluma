import { CopyBlocks } from "./CopyBlocks";
import { StudioFeature } from "./StudioFeature";
import { useLanguage } from "../context/LanguageContext";

const sections = [
  {
    id: "how",
    image: "/assets/images/stephen-portrait-smile.jpg",
    imageAltKey: "about.stephenPhotoAlt",
    placeholder: false,
  },
  {
    id: "origin",
    image: null,
    imageAltKey: "about.origin.imageLabel",
    placeholder: true,
  },
  {
    id: "why",
    image: "/assets/images/pluma-logo-feather-only.svg",
    imageAltKey: "about.why.photoAlt",
    placeholder: false,
    imageClass: "psl-about-block__feather",
  },
] as const;

export function About() {
  const { t } = useLanguage();

  return (
    <>
      <div className="psl-container psl-page psl-about-page">
        {sections.map((section, index) => (
          <article
            key={section.id}
            className={`psl-about-block${index % 2 === 1 ? " psl-about-block--reverse" : ""}`}
          >
            <figure className="psl-about-block__media">
              {section.placeholder ? (
                <div
                  className="psl-about-placeholder"
                  aria-hidden="true"
                >
                  <span className="psl-about-placeholder__mark" />
                  <span className="psl-about-placeholder__label">
                    {t(section.imageAltKey)}
                  </span>
                </div>
              ) : (
                <img
                  src={section.image}
                  alt={t(section.imageAltKey)}
                  className={"imageClass" in section ? section.imageClass : undefined}
                  width={section.id === "how" ? 768 : 480}
                  height={section.id === "how" ? 1024 : 640}
                  loading={index === 0 ? "eager" : "lazy"}
                />
              )}
              {section.placeholder ? (
                <figcaption className="psl-sr-only">
                  {t(section.imageAltKey)}
                </figcaption>
              ) : null}
            </figure>
            <div className="psl-about-block__body">
              <h2 className="psl-title">{t(`about.${section.id}.heading`)}</h2>
              <CopyBlocks text={t(`about.${section.id}.body`)} />
            </div>
          </article>
        ))}
      </div>

      <StudioFeature />
    </>
  );
}
