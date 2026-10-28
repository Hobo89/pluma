import { spawnSync } from "node:child_process";
import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";

/**
 * Tiny blurred stills for the blur-up image loader.
 * 24px-wide JPEG + gblur, then CSS blur/scale hides the pixel grid.
 */
const WIDTH = 24;
const BLUR = 1.2;
const QUALITY = 12;

const roots = ["public/testimonials", "public/assets/images"];

const skip = new Set([
  "appointment-poster.jpg",
  "candle-leaf.jpg",
  "hero-poster.jpg",
  "mediterranean-gradient.jpg",
  "og-share.jpg",
  "pluma-feather-poster.jpg",
]);

const sources = roots.flatMap((root) =>
  readdirSync(root)
    .filter((name) => /\.jpe?g$/i.test(name))
    .filter((name) => !name.includes(".lqip."))
    .filter((name) => !skip.has(name))
    .filter((name) => !name.startsWith("hero-poster"))
    .map((name) => join(root, name)),
);

if (sources.length === 0) {
  console.error("No source photographs found.");
  process.exit(1);
}

let failed = 0;

for (const src of sources) {
  const dest = src.replace(/\.jpe?g$/i, ".lqip.jpg");
  const result = spawnSync(
    "ffmpeg",
    [
      "-y",
      "-i",
      src,
      "-vf",
      `scale=${WIDTH}:-2:flags=fast_bilinear,gblur=sigma=${BLUR}`,
      "-frames:v",
      "1",
      "-update",
      "1",
      "-q:v",
      String(QUALITY),
      dest,
    ],
    { encoding: "utf8" },
  );

  if (result.status !== 0) {
    failed += 1;
    console.error(result.stderr || `ffmpeg failed for ${src}`);
    continue;
  }

  const bytes = statSync(dest).size;
  console.log(`${dest}  ${bytes}B`);
}

if (failed > 0) process.exit(1);
