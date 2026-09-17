import { useEffect, type RefObject } from "react";

/** Extra space around the card so the thickest part of the stroke is not clipped. */
export const ORBIT_PAD_PX = 6;

const ORBIT_MS = 4300;
const SAMPLE_COUNT = 192;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

/**
 * Calligraphic width along the perimeter. `phase` rotates the profile so the
 * thick and thin stretches travel with the gradient.
 */
function orbitWidth(t: number, phase: number) {
  const angle = t * Math.PI * 2 - phase;
  return clamp(
    2.5 + 1.35 * Math.sin(angle * 2 + 0.55) + 0.45 * Math.sin(angle * 5 - 0.8),
    1.75,
    4.5,
  );
}

function roundedRectPath(
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  const r = Math.min(radius, width / 2, height / 2);
  return [
    `M${fmt(x + r)} ${fmt(y)}`,
    `H${fmt(x + width - r)}`,
    `A${fmt(r)} ${fmt(r)} 0 0 1 ${fmt(x + width)} ${fmt(y + r)}`,
    `V${fmt(y + height - r)}`,
    `A${fmt(r)} ${fmt(r)} 0 0 1 ${fmt(x + width - r)} ${fmt(y + height)}`,
    `H${fmt(x + r)}`,
    `A${fmt(r)} ${fmt(r)} 0 0 1 ${fmt(x)} ${fmt(y + height - r)}`,
    `V${fmt(y + r)}`,
    `A${fmt(r)} ${fmt(r)} 0 0 1 ${fmt(x + r)} ${fmt(y)}`,
    "Z",
  ].join(" ");
}

function fmt(value: number) {
  return value.toFixed(2);
}

type Point = { x: number; y: number };
type Sample = Point & { nx: number; ny: number; t: number };

function sampleRoundedRect(
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
  count = SAMPLE_COUNT,
): Sample[] {
  const r = Math.min(radius, width / 2, height / 2);
  const straightX = width - 2 * r;
  const straightY = height - 2 * r;
  const arc = (Math.PI / 2) * r;
  const perimeter = 2 * straightX + 2 * straightY + 4 * arc;
  const samples: Sample[] = [];

  for (let i = 0; i < count; i += 1) {
    const t = i / count;
    let s = t * perimeter;
    let px: number;
    let py: number;
    let nx: number;
    let ny: number;

    const take = (length: number) => {
      if (s <= length) {
        const at = s;
        s = Infinity;
        return at;
      }
      s -= length;
      return null;
    };

    const top = take(straightX);
    if (top !== null) {
      px = x + r + top;
      py = y;
      nx = 0;
      ny = -1;
    } else {
      const tr = take(arc);
      if (tr !== null) {
        const theta = -Math.PI / 2 + tr / r;
        px = x + width - r + r * Math.cos(theta);
        py = y + r + r * Math.sin(theta);
        nx = Math.cos(theta);
        ny = Math.sin(theta);
      } else {
        const right = take(straightY);
        if (right !== null) {
          px = x + width;
          py = y + r + right;
          nx = 1;
          ny = 0;
        } else {
          const br = take(arc);
          if (br !== null) {
            const theta = br / r;
            px = x + width - r + r * Math.cos(theta);
            py = y + height - r + r * Math.sin(theta);
            nx = Math.cos(theta);
            ny = Math.sin(theta);
          } else {
            const bottom = take(straightX);
            if (bottom !== null) {
              px = x + width - r - bottom;
              py = y + height;
              nx = 0;
              ny = 1;
            } else {
              const bl = take(arc);
              if (bl !== null) {
                const theta = Math.PI / 2 + bl / r;
                px = x + r + r * Math.cos(theta);
                py = y + height - r + r * Math.sin(theta);
                nx = Math.cos(theta);
                ny = Math.sin(theta);
              } else {
                const left = take(straightY);
                if (left !== null) {
                  px = x;
                  py = y + height - r - left;
                  nx = -1;
                  ny = 0;
                } else {
                  const tl = take(arc) ?? 0;
                  const theta = Math.PI + tl / r;
                  px = x + r + r * Math.cos(theta);
                  py = y + r + r * Math.sin(theta);
                  nx = Math.cos(theta);
                  ny = Math.sin(theta);
                }
              }
            }
          }
        }
      }
    }

    samples.push({ x: px, y: py, nx, ny, t });
  }

  return samples;
}

/** Soften sharp joins from outward normals so the stroke does not jitter. */
function chaikinClosed(points: Point[], iterations = 2): Point[] {
  let current = points;
  for (let pass = 0; pass < iterations; pass += 1) {
    const next: Point[] = [];
    for (let i = 0; i < current.length; i += 1) {
      const a = current[i];
      const b = current[(i + 1) % current.length];
      next.push(
        { x: 0.75 * a.x + 0.25 * b.x, y: 0.75 * a.y + 0.25 * b.y },
        { x: 0.25 * a.x + 0.75 * b.x, y: 0.25 * a.y + 0.75 * b.y },
      );
    }
    current = next;
  }
  return current;
}

function outerOffsetPoints(samples: Sample[], phase: number): Point[] {
  return chaikinClosed(
    samples.map(({ x, y, nx, ny, t }) => {
      const width = orbitWidth(t, phase);
      return { x: x + nx * width, y: y + ny * width };
    }),
  );
}

function pointsToPath(points: Point[]) {
  if (points.length === 0) return "";
  return (
    `M${fmt(points[0].x)} ${fmt(points[0].y)}` +
    points
      .slice(1)
      .map((point) => `L${fmt(point.x)} ${fmt(point.y)}`)
      .join("") +
    "Z"
  );
}

function orbitRingPath(samples: Sample[], inner: string, phase: number) {
  return `${pointsToPath(outerOffsetPoints(samples, phase))}${inner}`;
}

/**
 * Drives the 90-minute card orbit. Updates an inline SVG path each frame
 * instead of rewriting a CSS data-URI mask (which breaks down on mobile).
 */
export function useOrbitStrokeMask(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const svg = node.querySelector<SVGSVGElement>(".psl-duration__orbit");
    const path = node.querySelector<SVGPathElement>(".psl-duration__orbit-path");
    const gradient = node.querySelector<SVGLinearGradientElement>(
      ".psl-duration__orbit-grad",
    );
    if (!svg || !path || !gradient) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let samples: Sample[] = [];
    let inner = "";
    let boxW = 0;
    let boxH = 0;
    let frame = 0;
    let elapsed = 0;
    let last = 0;

    const paint = (phase: number) => {
      if (boxW < 8 || boxH < 8 || samples.length === 0) return;

      const pad = ORBIT_PAD_PX;
      const svgW = boxW + pad * 2;
      const svgH = boxH + pad * 2;
      svg.setAttribute("viewBox", `0 0 ${svgW} ${svgH}`);
      path.setAttribute("d", orbitRingPath(samples, inner, phase));

      const angle = ((phase * 180) / Math.PI) % 360;
      const cx = svgW / 2;
      const cy = svgH / 2;
      gradient.setAttribute("x1", "0");
      gradient.setAttribute("y1", String(cy));
      gradient.setAttribute("x2", String(svgW));
      gradient.setAttribute("y2", String(cy));
      gradient.setAttribute(
        "gradientTransform",
        `rotate(${angle.toFixed(2)} ${cx.toFixed(2)} ${cy.toFixed(2)})`,
      );
    };

    const measure = () => {
      const radius =
        Number.parseFloat(getComputedStyle(node).borderTopLeftRadius) || 16;
      boxW = node.offsetWidth;
      boxH = node.offsetHeight;
      inner = roundedRectPath(ORBIT_PAD_PX, ORBIT_PAD_PX, boxW, boxH, radius);
      samples = sampleRoundedRect(
        ORBIT_PAD_PX,
        ORBIT_PAD_PX,
        boxW,
        boxH,
        radius,
      );
    };

    const tick = (now: number) => {
      elapsed += now - last;
      last = now;
      const rect = node.getBoundingClientRect();
      const viewport = window.innerHeight || 0;
      if (rect.bottom > 0 && rect.top < viewport) {
        paint((elapsed / ORBIT_MS) * Math.PI * 2);
      }
      frame = requestAnimationFrame(tick);
    };

    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const start = () => {
      if (frame || motion.matches || document.hidden) return;
      last = performance.now();
      frame = requestAnimationFrame(tick);
    };

    measure();
    paint(0);
    start();

    const resize = new ResizeObserver(() => {
      measure();
      if (!frame) paint((elapsed / ORBIT_MS) * Math.PI * 2);
    });
    resize.observe(node);

    const onVisibility = () => {
      if (document.hidden || motion.matches) {
        stop();
        if (motion.matches) paint(0);
        return;
      }
      start();
    };

    document.addEventListener("visibilitychange", onVisibility);
    motion.addEventListener("change", onVisibility);

    return () => {
      stop();
      resize.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      motion.removeEventListener("change", onVisibility);
    };
  }, [ref]);
}
