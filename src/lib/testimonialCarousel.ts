/** Events carousel timing. The collage carousel keeps its own interval. */
export const EVENT_CAROUSEL_INTERVAL_MS = 6000;
export const EVENT_CAROUSEL_TRANSITION_MS = 900;

/** Visual rotation for an unbounded step. Last-to-first keeps moving forward. */
export function carouselRotationDegrees(step: number, count: number): number {
  if (count <= 0) return 0;
  return step * (360 / count);
}

export function carouselActiveIndex(step: number, count: number): number {
  if (count <= 0) return 0;
  return ((step % count) + count) % count;
}

/** Cylinder radius that seats `count` faces of `width` edge to edge. */
export function carouselRadius(width: number, count: number): number {
  if (count < 2 || width <= 0) return 0;
  return width / 2 / Math.tan(Math.PI / count);
}
