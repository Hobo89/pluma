import { useId } from "react";

const brushPaths = [
  "M6 10 C3 8 4 4 10 4 H302 C308 3 312 7 310 12 V366 C312 372 306 376 300 374 H12 C6 375 3 370 5 364 Z",
  "M8 6 C5 5 6 2 12 3 H306 C311 2 315 6 313 11 V370 C314 376 308 378 303 376 H10 C5 377 2 372 4 366 Z",
  "M5 12 C2 9 3 5 9 5 H308 C314 4 317 9 315 14 V368 C317 374 311 377 305 375 H8 C4 376 1 371 3 365 Z",
  "M10 8 C7 6 8 3 14 4 H304 C310 3 313 8 311 13 V372 C313 377 307 380 301 378 H12 C7 379 4 374 6 368 Z",
  "M4 9 C1 7 2 3 8 3 H310 C316 2 319 7 317 12 V367 C319 373 313 375 307 373 H6 C3 374 0 369 2 363 Z",
  "M7 11 C4 8 5 4 11 5 H305 C311 4 314 9 312 15 V369 C314 375 308 377 302 375 H9 C5 376 2 371 4 365 Z",
  "M9 7 C6 5 7 2 13 3 H307 C312 2 316 6 314 11 V371 C316 376 310 379 304 377 H11 C6 378 3 373 5 367 Z",
];

type TestimonialBrushBorderProps = {
  variant: number;
};

export function TestimonialBrushBorder({ variant }: TestimonialBrushBorderProps) {
  const uid = useId().replace(/:/g, "");
  const gradientId = `testimonial-grad-${uid}`;
  const path = brushPaths[variant % brushPaths.length];

  return (
    <svg
      className="testimonial-brush-border"
      viewBox="0 0 320 380"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#d45628" />
          <stop offset="45%" stopColor="#e07838" />
          <stop offset="100%" stopColor="#edd9a8" />
        </linearGradient>
      </defs>
      <path
        d={path}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="1.15"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
