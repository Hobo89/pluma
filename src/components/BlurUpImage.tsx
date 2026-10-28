import { useEffect, useRef, useState, type ImgHTMLAttributes } from "react";
import { lqipSrc } from "../lib/lqip";
import { useNearViewport } from "../lib/useNearViewport";

type BlurUpImageProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "placeholder" | "loading"
> & {
  src: string;
  alt: string;
  /** Stretch to a parent that already has a size (tiles, portraits, media frames). */
  fill?: boolean;
  /** Load the full photograph immediately; still blur-up until it decodes. */
  eager?: boolean;
};

export function BlurUpImage({
  src,
  alt,
  className,
  fill = false,
  eager = false,
  width,
  height,
  sizes,
  style,
  onLoad,
  ...rest
}: BlurUpImageProps) {
  const { ref, near } = useNearViewport<HTMLSpanElement>({ eager });
  const fullRef = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);
  const placeholder = lqipSrc(src);

  useEffect(() => {
    setLoaded(false);
  }, [src]);

  useEffect(() => {
    const image = fullRef.current;
    if (image?.complete && image.naturalWidth > 0) setLoaded(true);
  }, [near, src]);

  return (
    <span
      ref={ref}
      className={[
        "psl-blur-up",
        fill ? "psl-blur-up--fill" : "psl-blur-up--natural",
        loaded ? "is-loaded" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={style}
    >
      <img
        className="psl-blur-up__lqip"
        src={placeholder}
        alt=""
        width={width}
        height={height}
        decoding="async"
        draggable={false}
        aria-hidden="true"
      />
      {near ? (
        <img
          ref={fullRef}
          className="psl-blur-up__full"
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          decoding="async"
          onLoad={(event) => {
            setLoaded(true);
            onLoad?.(event);
          }}
          {...rest}
        />
      ) : null}
    </span>
  );
}
