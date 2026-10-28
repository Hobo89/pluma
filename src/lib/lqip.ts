const PHOTO_EXT = /\.(jpe?g|png|webp)$/i;

/** Map a full photograph URL onto its ffmpeg-generated 24px placeholder. */
export function lqipSrc(src: string): string {
  const path = src.split("?")[0] ?? src;
  if (path.includes(".lqip.")) return path;
  return path.replace(PHOTO_EXT, ".lqip.jpg");
}
