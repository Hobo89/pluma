import { useMemo, useRef, type CSSProperties } from "react";
import { useDimensions } from "../hooks/useDimensions";

type AnimatedGradientProps = {
  colors: string[];
  speed?: number;
  blur?: "light" | "medium" | "heavy";
  className?: string;
};

type CircleSeed = {
  top: number;
  left: number;
  sizeScale: number;
  tx1: number;
  ty1: number;
  tx2: number;
  ty2: number;
  tx3: number;
  ty3: number;
  tx4: number;
  ty4: number;
};

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function buildSeeds(count: number): CircleSeed[] {
  return Array.from({ length: count }, () => ({
    top: randomBetween(0, 50),
    left: randomBetween(0, 50),
    sizeScale: randomBetween(0.5, 1.5),
    tx1: Math.random() - 0.5,
    ty1: Math.random() - 0.5,
    tx2: Math.random() - 0.5,
    ty2: Math.random() - 0.5,
    tx3: Math.random() - 0.5,
    ty3: Math.random() - 0.5,
    tx4: Math.random() - 0.5,
    ty4: Math.random() - 0.5,
  }));
}

/**
 * Soft animated wash from blurred SVG circles. Seeds are memoized so
 * positions do not jump on every parent re-render.
 */
export function AnimatedGradient({
  colors,
  speed = 10,
  blur = "medium",
  className,
}: AnimatedGradientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dimensions = useDimensions(containerRef);
  const colorsKey = colors.join(",");

  const seeds = useMemo(() => buildSeeds(colors.length), [colorsKey]);

  const circleSize = useMemo(
    () => Math.max(dimensions.width, dimensions.height, 120),
    [dimensions.height, dimensions.width],
  );

  const blurClass =
    blur === "light"
      ? "psl-animated-gradient__blur--light"
      : blur === "heavy"
        ? "psl-animated-gradient__blur--heavy"
        : "psl-animated-gradient__blur--medium";

  return (
    <div
      ref={containerRef}
      className={["psl-animated-gradient", className].filter(Boolean).join(" ")}
      aria-hidden="true"
    >
      <div className={`psl-animated-gradient__blur ${blurClass}`}>
        {colors.map((color, index) => {
          const seed = seeds[index] ?? seeds[0]!;
          const size = circleSize * seed.sizeScale;
          const style = {
            animationDuration: `${speed}s`,
            top: `${seed.top}%`,
            left: `${seed.left}%`,
            "--tx-1": seed.tx1,
            "--ty-1": seed.ty1,
            "--tx-2": seed.tx2,
            "--ty-2": seed.ty2,
            "--tx-3": seed.tx3,
            "--ty-3": seed.ty3,
            "--tx-4": seed.tx4,
            "--ty-4": seed.ty4,
          } as CSSProperties;

          return (
            <svg
              key={`${color}-${index}`}
              className="psl-animated-gradient__circle"
              width={size}
              height={size}
              viewBox="0 0 100 100"
              style={style}
            >
              <circle cx="50" cy="50" r="50" fill={color} />
            </svg>
          );
        })}
      </div>
    </div>
  );
}
