import { useEffect, useRef, type CSSProperties } from "react";
import { illustrations, type IllustrationKind } from "./illustrations";
import { initPlumaIllustrations } from "./animate";

// `src/styles/pluma-illustrations.css` is imported once from `src/index.css`.

/** The four custom properties the stylesheet reads for per-path timing. */
type PlumaStyle = CSSProperties & {
  "--pluma-accent-delay"?: string;
  "--pluma-accent-duration"?: string;
  "--pluma-delay"?: string;
  "--pluma-duration"?: string;
};

type AnimatedMassageIllustrationProps = {
  kind: IllustrationKind;
  className?: string;
  threshold?: number;
};

/**
 * The markup is static on first render and identical on the server and the
 * client. Only the observer installed in the effect can arm an illustration,
 * so with no JavaScript the finished drawing is what shows.
 */
export function AnimatedMassageIllustration({
  kind,
  className = "",
  threshold = 0.3,
}: AnimatedMassageIllustrationProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const drawing = illustrations[kind];

  useEffect(
    () => initPlumaIllustrations(svgRef.current, { threshold }),
    [kind, threshold],
  );

  return (
    <svg
      ref={svgRef}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 360 260"
      width="360"
      height="260"
      className={`pluma-illustration ${className}`.trim()}
      data-pluma-illustration={kind}
      data-pluma-total={drawing.total}
      aria-hidden="true"
      focusable="false"
      style={
        {
          "--pluma-accent-delay": `${drawing.accentDelay}ms`,
          "--pluma-accent-duration": `${drawing.accentDuration}ms`,
        } as PlumaStyle
      }
    >
      <g data-pluma-accent="" fill="#EAD5B6" opacity="0.36">
        <path d={drawing.accent} />
      </g>
      <g
        fill="none"
        stroke="#092707"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {drawing.paths.map((path) => (
          <path
            key={path.name}
            data-pluma-line={path.name}
            d={path.d}
            pathLength="1"
            vectorEffect="non-scaling-stroke"
            style={
              {
                "--pluma-delay": `${path.delay}ms`,
                "--pluma-duration": `${path.duration}ms`,
              } as PlumaStyle
            }
          />
        ))}
      </g>
    </svg>
  );
}

type Props = Omit<AnimatedMassageIllustrationProps, "kind">;

export const MassageIllustrationPregnancy = (props: Props) => (
  <AnimatedMassageIllustration {...props} kind="pregnancy" />
);
export const MassageIllustrationRelaxing = (props: Props) => (
  <AnimatedMassageIllustration {...props} kind="relaxing" />
);
export const MassageIllustrationDeepTissue = (props: Props) => (
  <AnimatedMassageIllustration {...props} kind="deep-tissue" />
);
export const MassageIllustrationSports = (props: Props) => (
  <AnimatedMassageIllustration {...props} kind="sports" />
);
