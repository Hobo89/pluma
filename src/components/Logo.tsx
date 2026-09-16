import { site } from "../config/site";

type LogoProps = {
  className?: string;
  height?: number;
  variant?: "mark" | "fullWhite" | "fullColor";
  alt?: string;
};

export function Logo({
  className,
  height = 32,
  variant = "mark",
  alt,
}: LogoProps) {
  const label = alt ?? site.businessName;

  if (variant === "fullWhite") {
    return (
      <img
        src={site.logos.fullWhiteSvg}
        alt={label}
        className={className}
        width={318}
        height={144}
        decoding="async"
      />
    );
  }

  if (variant === "fullColor") {
    return (
      <img
        src={site.logos.fullColor}
        alt={label}
        className={className}
        width={1024}
        height={462}
        decoding="async"
      />
    );
  }

  const width = Math.round((318 / 144) * height);
  const featherHeight = Math.round((33 / 144) * height);

  return (
    <span
      className={`psl-logo${className ? ` ${className}` : ""}`}
      style={{ ["--psl-logo-height" as string]: `${height}px` }}
      aria-hidden="true"
    >
      <span className="psl-logo__wordmark">{site.businessName}</span>
      <img
        src={site.logos.featherOnlySvg}
        alt=""
        className="psl-logo__feather"
        width={width}
        height={featherHeight}
        decoding="async"
      />
    </span>
  );
}
