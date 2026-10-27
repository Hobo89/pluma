import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import {
  testimonials,
  type TestimonialRecord,
} from "../content/testimonials";
import { TestimonialCard } from "./TestimonialCard";

const COLUMN_DURATIONS = [42, 56, 48] as const;
const MOBILE_DURATION = 110;

function columnCountFromViewport() {
  if (typeof window === "undefined") return 3;
  if (window.innerWidth <= 767) return 1;
  if (window.innerWidth <= 1099) return 2;
  return 3;
}

function useColumnCount() {
  const [count, setCount] = useState(columnCountFromViewport);

  useEffect(() => {
    const update = () => setCount(columnCountFromViewport());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return count;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduced;
}

function splitColumns(
  items: readonly TestimonialRecord[],
  count: number,
): TestimonialRecord[][] {
  const columns: TestimonialRecord[][] = Array.from(
    { length: count },
    () => [],
  );

  items.forEach((item, index) => {
    columns[index % count].push(item);
  });

  return columns;
}

export function Testimonials() {
  const { t } = useLanguage();
  const columnCount = useColumnCount();
  const reducedMotion = usePrefersReducedMotion();
  const columns = useMemo(
    () => splitColumns(testimonials, columnCount),
    [columnCount],
  );

  return (
    <section
      id="reviews"
      aria-labelledby="testimonials-heading"
      className="psl-testimonial-wall"
    >
      <h2 id="testimonials-heading" className="psl-sr-only">
        {t("testimonials.title")}
      </h2>

      <div
        className={`psl-testimonial-wall__viewport${
          reducedMotion ? " psl-testimonial-wall__viewport--static" : ""
        }`}
      >
        {columns.map((column, columnIndex) => {
          const loop = reducedMotion ? column : [...column, ...column];
          const reverse = !reducedMotion && columnIndex === 1;

          return (
            <div
              key={`column-${columnCount}-${columnIndex}`}
              className="psl-testimonial-wall__column"
            >
              <div
                className={[
                  "psl-testimonial-wall__track",
                  reverse ? "psl-testimonial-wall__track--reverse" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                style={{
                  animationDuration: `${
                    columnCount === 1
                      ? MOBILE_DURATION
                      : (COLUMN_DURATIONS[columnIndex] ?? 50)
                  }s`,
                }}
              >
                {loop.map((item, index) => (
                  <TestimonialCard
                    key={`${item.id}-${columnIndex}-${index}`}
                    {...item}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
