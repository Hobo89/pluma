import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import { useLanguage } from "../context/LanguageContext";
import {
  testimonials,
  type AreaId,
  type TestimonialFlag,
  type TestimonialRecord,
} from "../content/testimonials";
import {
  carouselActiveIndex,
  carouselRadius,
  carouselRotationDegrees,
  EVENT_CAROUSEL_INTERVAL_MS,
  EVENT_CAROUSEL_TRANSITION_MS,
} from "../lib/testimonialCarousel";
import { TestimonialCard } from "./TestimonialCard";

export const QUOTE_TESTIMONIALS = testimonials;

const COUNT = QUOTE_TESTIMONIALS.length;
const INTERVAL_MS = 9000;
const VISIBLE_OFFSETS = [-2, -1, 0, 1, 2] as const;
const SWIPE_THRESHOLD_PX = 40;

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

function FlagMarks({
  flags,
  label,
}: {
  flags: readonly TestimonialFlag[];
  label?: string;
}) {
  if (flags.length === 0) return null;

  return (
    <span className="psl-quote__flags" role="img" aria-label={label}>
      {flags.map((flag) =>
        flag.type === "emoji" ? (
          <span key={flag.glyph}>{flag.glyph}</span>
        ) : (
          <img
            key={flag.src}
            src={flag.src}
            alt=""
            className="psl-quote__flag-image"
          />
        ),
      )}
    </span>
  );
}

function AreaBadges({ areas }: { areas: readonly AreaId[] }) {
  const { t } = useLanguage();

  if (areas.length === 0) return null;

  return (
    <ul className="psl-quote__areas">
      {areas.map((area) => (
        <li key={area}>{t(`testimonials.areas.${area}`)}</li>
      ))}
    </ul>
  );
}

type EditorialQuoteProps = {
  /** `cards` is the events-page opt-in. The default collage is unchanged. */
  presentation?: "collage" | "cards";
  items?: readonly TestimonialRecord[];
  label?: string;
  labelledBy?: string;
};

type MotionChoice = "auto" | "paused" | "playing";

function EditorialQuoteCards({
  items,
  label,
  labelledBy,
}: {
  items: readonly TestimonialRecord[];
  label?: string;
  labelledBy?: string;
}) {
  const { t } = useLanguage();
  const count = items.length;
  const [step, setStep] = useState(0);
  const [motionChoice, setMotionChoice] = useState<MotionChoice>("auto");
  const [reducedMotion, setReducedMotion] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const [inView, setInView] = useState(false);
  const [pageHidden, setPageHidden] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const swipeRef = useRef<{ x: number; y: number; moved: boolean } | null>(null);
  const manualStep = useRef(false);

  const activeIndex = carouselActiveIndex(step, count);
  const playing =
    motionChoice === "playing" || (motionChoice === "auto" && !reducedMotion);
  const rotating =
    playing && !interacting && inView && !pageHidden && count > 1;

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const update = () => setPageHidden(document.hidden);
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setInView(
          Boolean(entry?.isIntersecting && entry.intersectionRatio >= 0.35),
        );
      },
      { threshold: [0, 0.35] },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!rotating) return;
    const timer = window.setTimeout(() => {
      setStep((current) => current + 1);
    }, EVENT_CAROUSEL_INTERVAL_MS);
    return () => window.clearTimeout(timer);
  }, [rotating, step]);

  useEffect(() => {
    if (!manualStep.current) return;
    manualStep.current = false;
    const item = items[activeIndex];
    if (!item) return;
    setAnnouncement(
      t("events.carousel.announced", {
        name: item.name,
        current: activeIndex + 1,
        total: count,
      }),
    );
  }, [activeIndex, count, items, t]);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    const ring = ringRef.current;
    if (!stage || !ring) return;

    if (reducedMotion) {
      stage.style.height = "";
      return;
    }

    const measure = () => {
      const cards = [
        ...stage.querySelectorAll<HTMLElement>(".psl-testimonial-card"),
      ];
      if (cards.length === 0) return;
      const width = cards[0].getBoundingClientRect().width;
      const height = Math.max(
        ...cards.map((card) => card.getBoundingClientRect().height),
      );
      stage.style.setProperty(
        "--events-radius",
        `${carouselRadius(width, cards.length)}px`,
      );
      stage.style.height = `${Math.ceil(height + 48)}px`;
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    stage
      .querySelectorAll(".psl-testimonial-card")
      .forEach((card) => observer.observe(card));
    const frame = window.requestAnimationFrame(() => {
      ring.classList.add("is-ready");
    });
    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [reducedMotion, count, items]);

  const advance = useCallback((delta: number, manual: boolean) => {
    if (manual) manualStep.current = true;
    setStep((current) => current + delta);
  }, []);

  const onPointerDown = useCallback((event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "touch") return;
    swipeRef.current = { x: event.clientX, y: event.clientY, moved: false };
    setInteracting(true);
  }, []);

  const onPointerMove = useCallback((event: PointerEvent<HTMLDivElement>) => {
    const start = swipeRef.current;
    if (!start || event.pointerType !== "touch") return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) > 12 && Math.abs(dx) > Math.abs(dy)) start.moved = true;
  }, []);

  const finishSwipe = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      const start = swipeRef.current;
      swipeRef.current = null;
      if (!start || event.pointerType !== "touch") return;
      const dx = event.clientX - start.x;
      const dy = event.clientY - start.y;
      const swiped =
        start.moved &&
        Math.abs(dx) >= SWIPE_THRESHOLD_PX &&
        Math.abs(dx) > Math.abs(dy) * 1.25;
      if (swiped) advance(dx < 0 ? 1 : -1, true);
      window.setTimeout(() => setInteracting(false), swiped ? 1200 : 0);
    },
    [advance],
  );

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    advance(event.key === "ArrowRight" ? 1 : -1, true);
  };

  return (
    <div
      ref={rootRef}
      className="psl-events-carousel"
      data-reduced={reducedMotion ? "true" : "false"}
      role="region"
      aria-roledescription="carousel"
      aria-label={labelledBy ? undefined : label}
      aria-labelledby={labelledBy}
      style={
        {
          "--events-turn": `${carouselRotationDegrees(step, count)}deg`,
          "--events-transition": `${EVENT_CAROUSEL_TRANSITION_MS}ms`,
        } as CSSProperties
      }
      onMouseEnter={() => setInteracting(true)}
      onMouseLeave={() => setInteracting(false)}
      onFocus={() => setInteracting(true)}
      onBlur={(event) => {
        if (!rootRef.current?.contains(event.relatedTarget as Node)) {
          setInteracting(false);
        }
      }}
      onKeyDown={onKeyDown}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={finishSwipe}
      onPointerCancel={finishSwipe}
    >
      <div className="psl-events-carousel__clip">
        <div ref={stageRef} className="psl-events-carousel__stage">
          <div ref={ringRef} className="psl-events-carousel__ring">
            {items.map((item, index) => {
              const active = index === activeIndex;
              return (
                <div
                  key={item.id}
                  className={[
                    "psl-events-carousel__face",
                    active ? "is-active" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  style={
                    {
                      "--events-face-angle": `${carouselRotationDegrees(index, count)}deg`,
                    } as CSSProperties
                  }
                  aria-hidden={active ? undefined : true}
                  inert={active ? undefined : true}
                >
                  <TestimonialCard {...item} />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="psl-quote__controls">
        <button
          type="button"
          className="psl-quote__control"
          onClick={() => advance(-1, true)}
          aria-label={t("quote.previous")}
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
        <span className="psl-events-carousel__count" aria-hidden="true">
          {t("events.carousel.count", {
            current: count === 0 ? 0 : activeIndex + 1,
            total: count,
          })}
        </span>
        <button
          type="button"
          className="psl-quote__control"
          onClick={() => advance(1, true)}
          aria-label={t("quote.next")}
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m9 6 6 6-6 6" />
          </svg>
        </button>
        <button
          type="button"
          className="psl-quote__control"
          onClick={() =>
            setMotionChoice((current) =>
              current === "paused" || (current === "auto" && reducedMotion)
                ? "playing"
                : "paused",
            )
          }
        >
          {playing ? <PauseIcon /> : <PlayIcon />}
          {playing ? t("quote.pause") : t("quote.play")}
        </button>
      </div>
      <p className="psl-sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </p>
    </div>
  );
}

export function EditorialQuote({
  presentation = "collage",
  items,
  label,
  labelledBy,
}: EditorialQuoteProps = {}) {
  if (presentation === "cards") {
    return (
      <EditorialQuoteCards
        items={items ?? []}
        label={label}
        labelledBy={labelledBy}
      />
    );
  }

  return <EditorialQuoteCollage />;
}

function EditorialQuoteCollage() {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [compact, setCompact] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const swipeRef = useRef<{
    x: number;
    y: number;
    moved: boolean;
  } | null>(null);
  const suppressClickRef = useRef(false);

  const active = QUOTE_TESTIMONIALS[activeIndex];
  const visibleOffsets = compact ? ([-1, 0, 1] as const) : VISIBLE_OFFSETS;
  const countriesLabel = active.countriesKey
    ? t(`testimonials.countries.${active.countriesKey}`)
    : undefined;

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

  const onCollagePointerDown = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (event.pointerType !== "touch") return;
      suppressClickRef.current = false;
      swipeRef.current = {
        x: event.clientX,
        y: event.clientY,
        moved: false,
      };
      setInteracting(true);
    },
    [],
  );

  const onCollagePointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      const start = swipeRef.current;
      if (!start || event.pointerType !== "touch") return;
      const dx = event.clientX - start.x;
      const dy = event.clientY - start.y;
      if (Math.abs(dx) > 12 && Math.abs(dx) > Math.abs(dy)) {
        start.moved = true;
      }
    },
    [],
  );

  const finishCollageSwipe = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      const start = swipeRef.current;
      swipeRef.current = null;
      if (!start || event.pointerType !== "touch") return;

      const dx = event.clientX - start.x;
      const dy = event.clientY - start.y;
      const swiped =
        start.moved &&
        Math.abs(dx) >= SWIPE_THRESHOLD_PX &&
        Math.abs(dx) > Math.abs(dy) * 1.25;

      if (swiped) {
        suppressClickRef.current = true;
        step(dx < 0 ? 1 : -1);
      }

      // Keep autoplay paused briefly after a swipe so the new quote can settle.
      window.setTimeout(() => setInteracting(false), swiped ? 1200 : 0);
    },
    [step],
  );

  return (
    <section
      id="reviews"
      ref={sectionRef}
      aria-labelledby="quote-heading"
      className="psl-audience__quotes"
      tabIndex={-1}
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
            {active.quote}
          </blockquote>
          <figcaption className="psl-quote__meta">
            <span className="psl-quote__name">{active.name}</span>
            {active.flags.length > 0 ? (
              <span className="psl-quote__from">
                <FlagMarks flags={active.flags} label={countriesLabel} />
              </span>
            ) : null}
            <AreaBadges areas={active.areas} />
          </figcaption>
        </div>
      </figure>

      <div
        className={`psl-collage psl-collage--interactive${compact ? "" : " psl-collage--extended"}`}
        role="group"
        aria-label={t("quote.collageLabel")}
        onPointerDown={onCollagePointerDown}
        onPointerMove={onCollagePointerMove}
        onPointerUp={finishCollageSwipe}
        onPointerCancel={finishCollageSwipe}
      >
        {visibleOffsets.map((offset) => {
          const index = wrapIndex(activeIndex + offset);
          const item: TestimonialRecord = QUOTE_TESTIMONIALS[index];
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
              onClick={() => {
                // A completed swipe should not also activate the portrait under
                // the finger.
                if (suppressClickRef.current) {
                  suppressClickRef.current = false;
                  return;
                }
                setActiveIndex(index);
              }}
              aria-pressed={isSpotlight}
              aria-label={item.name}
            >
              <img
                src={item.image}
                alt=""
                loading="lazy"
                draggable={false}
                sizes="(max-width: 767px) 28vw, 14vw"
                style={
                  item.objectPosition
                    ? { objectPosition: item.objectPosition }
                    : undefined
                }
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
    </section>
  );
}
