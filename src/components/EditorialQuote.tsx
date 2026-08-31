import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "../context/LanguageContext";

/** All clients in the quote carousel (left-to-right cycle order). */
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
const INTERVAL_MS = 4000;
const QUOTE_FADE_MS = 320;
const VISIBLE_OFFSETS = [-2, -1, 0, 1, 2] as const;

function stepForward(index: number) {
  return (index + 1) % COUNT;
}

function stepDirection(from: number, to: number) {
  const forward = (to - from + COUNT) % COUNT;
  return forward === 0 ? 0 : forward <= COUNT / 2 ? 1 : -1;
}

function wrapIndex(index: number) {
  return (index + COUNT) % COUNT;
}

export function EditorialQuote() {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [shownIndex, setShownIndex] = useState(0);
  const [quoteVisible, setQuoteVisible] = useState(true);
  const [direction, setDirection] = useState(1);
  const timerRef = useRef<number | null>(null);
  const [compact, setCompact] = useState(false);

  const shown = QUOTE_TESTIMONIALS[shownIndex];
  const visibleOffsets = compact
    ? ([-1, 0, 1] as const)
    : VISIBLE_OFFSETS;

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setCompact(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const selectIndex = useCallback(
    (next: number) => {
      if (next === activeIndex) return;
      setDirection(stepDirection(activeIndex, next));
      setActiveIndex(next);
    },
    [activeIndex],
  );

  useEffect(() => {
    if (activeIndex === shownIndex) return;

    setQuoteVisible(false);
    const swapTimer = window.setTimeout(() => {
      setShownIndex(activeIndex);
      setQuoteVisible(true);
    }, QUOTE_FADE_MS);

    return () => window.clearTimeout(swapTimer);
  }, [activeIndex, shownIndex]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    if (timerRef.current) window.clearInterval(timerRef.current);

    timerRef.current = window.setInterval(() => {
      setDirection(1);
      setActiveIndex((current) => stepForward(current));
    }, INTERVAL_MS);

    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [activeIndex]);

  return (
    <section
      aria-labelledby="quote-heading"
      className="psl-container psl-section"
    >
      <h2 id="quote-heading" className="psl-sr-only">
        {t("quote.title")}
      </h2>
      <figure
        className={`psl-quote psl-quote--animated psl-quote--${direction >= 0 ? "forward" : "back"}`}
      >
        <span className="psl-quote__mark" aria-hidden="true">
          &ldquo;
        </span>
        <div
          className={`psl-quote__body${quoteVisible ? " psl-quote__body--visible" : " psl-quote__body--hidden"}`}
        >
          <blockquote aria-live="polite">
            {t(`testimonials.${shown.id}.quote`)}
          </blockquote>
          <figcaption className="psl-quote__meta">
            {shown.flags.length > 0 && (
              <span
                className="psl-quote__flags"
                role="img"
                aria-label={t(`testimonials.${shown.id}.countries`)}
              >
                {shown.flags.join("\u2009")}
              </span>
            )}
            <span>{t(`testimonials.${shown.id}.name`)}</span>
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
              onClick={() => selectIndex(index)}
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
    </section>
  );
}
