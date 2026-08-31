import { site } from "../config/site";

type LogoProps = {
  className?: string;
  height?: number;
};

export function Logo({ className, height = 32 }: LogoProps) {
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
        src={site.logos.featherOnly}
        alt=""
        className="psl-logo__feather"
        width={width}
        height={featherHeight}
        decoding="async"
      />
    </span>
  );
}
