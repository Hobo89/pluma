import type { BonoDesign } from "../config/bonos";

type BonoCardProps = {
  design: BonoDesign;
  alt: string;
  /** Rendered width the browser should plan for. */
  sizes: string;
  className?: string;
  loading?: "eager" | "lazy";
};

/**
 * The supplied card artwork, unmodified and scaled proportionally.
 *
 * The image is never cropped or recoloured and the feather is not redrawn;
 * only the rendered size changes.
 */
export function BonoCard({
  design,
  alt,
  sizes,
  className,
  loading = "lazy",
}: BonoCardProps) {
  return (
    <picture>
      <source
        type="image/webp"
        srcSet={`${design.webp} 376w, ${design.webp2x} 752w`}
        sizes={sizes}
      />
      <img
        src={design.png}
        alt={alt}
        width={design.width}
        height={design.height}
        loading={loading}
        decoding="async"
        className={className}
        sizes={sizes}
      />
    </picture>
  );
}
