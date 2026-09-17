import { useEffect, type RefObject } from "react";

/** Extra space around the card so the thickest part of the stroke is not clipped. */
export const ORBIT_PAD_PX = 6;

const ORBIT_MS = 4300;

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
    2.35 + 1.5 * Math.sin(angle * 2 + 0.55) + 0.5 * Math.sin(angle * 5 - 0.8),
    1.15,
    4.6,
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

type Sample = { x: number; y: number; nx: number; ny: number; t: number };

function sampleRoundedRect(
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
  count = 160,
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

function outerOffsetPath(samples: Sample[], phase: number) {
  const points = samples.map(({ x, y, nx, ny, t }) => {
    const width = orbitWidth(t, phase);
    return `${fmt(x + nx * width)} ${fmt(y + ny * width)}`;
  });
  return `M${points[0]}L${points.slice(1).join("L")}Z`;
}

function orbitStrokeMask(
  width: number,
  height: number,
  inner: string,
  samples: Sample[],
  phase: number,
) {
  if (width < 8 || height < 8 || samples.length === 0) return "none";

  const pad = ORBIT_PAD_PX;
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width + pad * 2} ${height + pad * 2}">` +
    `<path fill="white" fill-rule="evenodd" d="${outerOffsetPath(samples, phase)}${inner}"/></svg>`;

  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

export function useOrbitStrokeMask(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let samples: Sample[] = [];
    let inner = "";
    let boxW = 0;
    let boxH = 0;
    let frame = 0;
    let elapsed = 0;
    let last = 0;

    const paint = (phase: number) => {
      node.style.setProperty(
        "--psl-orbit-mask",
        orbitStrokeMask(boxW, boxH, inner, samples, phase),
      );
      node.style.setProperty(
        "--psl-brand-angle",
        `${((phase * 180) / Math.PI) % 360}deg`,
      );
    };

    const measure = () => {
      const radius =
        Number.parseFloat(getComputedStyle(node).borderTopLeftRadius) || 16;
      boxW = node.offsetWidth;
      boxH = node.offsetHeight;
      inner = roundedRectPath(ORBIT_PAD_PX, ORBIT_PAD_PX, boxW, boxH, radius);
      samples = sampleRoundedRect(ORBIT_PAD_PX, ORBIT_PAD_PX, boxW, boxH, radius);
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
      node.style.removeProperty("--psl-orbit-mask");
      node.style.removeProperty("--psl-brand-angle");
    };
  }, [ref]);
}
