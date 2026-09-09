import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "../context/LanguageContext";

/**
 * All clients in the quote carousel (left-to-right cycle order).
 *
 * The portraits are part of the design and each one belongs with its own
 * review. Do not remove a portrait, swap which person appears beside a quote,
 * or replace these files.
 */
export const QUOTE_TESTIMONIALS = [
  { id: "carla", image: "/testimonials/carla.jpg", flags: ["🇪🇸"] },
  { id: "sara", image: "/testimonials/sara.jpg", flags: ["🇲🇦"] },
  { id: "candice", image: "/testimonials/candice.jpg", flags: ["🇺🇸", "🇮🇳"] },
  { id: "beatrice", image: "/testimonials/beatrice.jpg", flags: ["🇧🇪"] },
  { id: "jesus", image: "/testimonials/jesus.jpg", flags: ["🇪🇸"] },
  { id: "juanma", image: "/testimonials/juanma.jpg", flags: ["🇪🇸"] },
  { id: "sarah", image: "/testimonials/sarah.jpg", flags: ["🇬🇧"] },
] as const;

const COUNT = QUOTE_TESTIMONIALS.length;
const INTERVAL_MS = 6000;
const VISIBLE_OFFSETS = [-2, -1, 0, 1, 2] as const;

function wrapIndex(index: number) {
  return (index + COUNT) % COUNT;
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <rect x="7" y="5" width="4" height="14" rx="1" />
      <rect x="13" y="5" width="4" height="14" rx="1" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M8 5.5v13a1 1 0 0 0 1.54.84l10-6.5a1 1 0 0 0 0-1.68l-10-6.5A1 1 0 0 0 8 5.5Z" />
    </svg>
  );
}

export function EditorialQuote() {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [compact, setCompact] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const active = QUOTE_TESTIMONIALS[activeIndex];
  const visibleOffsets = compact ? ([-1, 0, 1] as const) : VISIBLE_OFFSETS;

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setCompact(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  // Rotation starts only when motion is welcome. Someone who has asked for
  // reduced motion gets a static quote they can still step through.
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPlaying(!media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!playing || interacting) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => wrapIndex(current + 1));
    }, INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [playing, interacting]);

  const step = useCallback((delta: number) => {
    setActiveIndex((current) => wrapIndex(current + delta));
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="quote-heading"
      className="psl-container psl-section"
      // Rotation stops while a pointer or the keyboard is inside the section,
      // so the quote cannot change out from under someone reading it.
      onMouseEnter={() => setInteracting(true)}
      onMouseLeave={() => setInteracting(false)}
      onFocus={() => setInteracting(true)}
      onBlur={(event) => {
        if (!sectionRef.current?.contains(event.relatedTarget as Node)) {
          setInteracting(false);
        }
      }}
    >
      <h2 id="quote-heading" className="psl-sr-only">
        {t("quote.title")}
      </h2>

      <figure className="psl-quote">
        <span className="psl-quote__mark" aria-hidden="true">
          &ldquo;
        </span>
        <div className="psl-quote__body">
          <blockquote aria-live={playing && !interacting ? "off" : "polite"}>
            {t(`testimonials.${active.id}.quote`)}
          </blockquote>
          <figcaption className="psl-quote__meta">
            {active.flags.length > 0 && (
              <span
                className="psl-quote__flags"
                role="img"
                aria-label={t(`testimonials.${active.id}.countries`)}
              >
                {active.flags.join("\u2009")}
              </span>
            )}
            <span>{t(`testimonials.${active.id}.name`)}</span>
          </figcaption>
        </div>
      </figure>

      <div
        className={`psl-collage psl-collage--interactive${compact ? "" : " psl-collage--extended"}`}
        role="group"
        aria-label={t("quote.collageLabel")}
      >
        {visibleOffsets.map((offset) => {
          const index = wrapIndex(activeIndex + offset);
          const item = QUOTE_TESTIMONIALS[index];
          const isSpotlight = offset === 0;
          const isEdge = Math.abs(offset) === 2;

          return (
            <button
              key={`${offset}-${item.id}`}
              type="button"
              className={[
                "psl-collage__item",
                isSpotlight && "psl-collage__item--spotlight",
                isEdge && "psl-collage__item--edge",
                offset === -1 && "psl-collage__item--before",
                offset === 1 && "psl-collage__item--after",
                offset === -2 && "psl-collage__item--edge-left",
                offset === 2 && "psl-collage__item--edge-right",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => setActiveIndex(index)}
              aria-pressed={isSpotlight}
              aria-label={t(`testimonials.${item.id}.name`)}
            >
              <img
                src={item.image}
                alt=""
                loading="lazy"
                sizes="(max-width: 767px) 28vw, 14vw"
              />
            </button>
          );
        })}
      </div>

      <div className="psl-quote__controls">
        <button
          type="button"
          className="psl-quote__control"
          onClick={() => step(-1)}
          aria-label={t("quote.previous")}
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
        <button
          type="button"
          className="psl-quote__control"
          onClick={() => setPlaying((value) => !value)}
        >
          {playing ? <PauseIcon /> : <PlayIcon />}
          {playing ? t("quote.pause") : t("quote.play")}
        </button>
        <button
          type="button"
          className="psl-quote__control"
          onClick={() => step(1)}
          aria-label={t("quote.next")}
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m9 6 6 6-6 6" />
          </svg>
        </button>
      </div>

      <p className="psl-copy psl-copy--small psl-quote__provenance">
        {t("quote.provenanceNote")}
      </p>
    </section>
  );
}
