export type ImageSize = {
  width: number;
  height: number;
};

/** Face rectangle in the source photo, as fractions from the top-left. */
export type FaceBox = {
  left: number;
  top: number;
  right: number;
  bottom: number;
};

export type PortraitCrop = {
  /** Width divided by height. */
  aspectRatio: number;
  objectPosition: string;
  /** Visible window in source fractions, top-left origin. */
  window: { x: number; y: number; width: number; height: number };
};

const PREFERRED_ASPECT = 4 / 3;
const HAIR_PAD = 0.45;
const CHIN_PAD = 0.12;
const SIDE_PAD = 0.08;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function paddedFace(face: FaceBox): FaceBox {
  const height = face.bottom - face.top;
  const width = face.right - face.left;
  return {
    left: clamp(face.left - width * SIDE_PAD, 0, 1),
    top: clamp(face.top - height * HAIR_PAD, 0, 1),
    right: clamp(face.right + width * SIDE_PAD, 0, 1),
    bottom: clamp(face.bottom + height * CHIN_PAD, 0, 1),
  };
}

function percent(value: number) {
  return `${Math.round(value * 100) / 100}%`;
}

/**
 * Frame a portrait so the face stays fully visible.
 * A 4:3 frame is used when the head fits. Close-ups that are taller than
 * 4:3 get a taller frame instead of a crop through the chin or hair.
 */
export function portraitCrop(image: ImageSize, face: FaceBox): PortraitCrop {
  const head = paddedFace(face);
  const imageAspect = image.width / image.height;
  const headWidth = head.right - head.left;
  const headHeight = head.bottom - head.top;
  const aspectRatio = clamp(
    PREFERRED_ASPECT,
    imageAspect * headWidth,
    imageAspect / headHeight,
  );

  let windowWidth: number;
  let windowHeight: number;
  if (aspectRatio + 1e-9 >= imageAspect) {
    windowWidth = 1;
    windowHeight = imageAspect / aspectRatio;
  } else {
    windowHeight = 1;
    windowWidth = aspectRatio / imageAspect;
  }

  const centerX = (head.left + head.right) / 2;
  const centerY = (head.top + head.bottom) / 2;
  const xLow = Math.max(0, head.right - windowWidth);
  const xHigh = Math.min(head.left, 1 - windowWidth);
  const yLow = Math.max(0, head.bottom - windowHeight);
  const yHigh = Math.min(head.top, 1 - windowHeight);
  const x = clamp(
    centerX - windowWidth / 2,
    Math.min(xLow, xHigh),
    Math.max(xLow, xHigh),
  );
  const y = clamp(
    centerY - windowHeight / 2,
    Math.min(yLow, yHigh),
    Math.max(yLow, yHigh),
  );
  const positionX = windowWidth >= 0.999 ? 50 : (x / (1 - windowWidth)) * 100;
  const positionY =
    windowHeight >= 0.999 ? 50 : (y / (1 - windowHeight)) * 100;

  return {
    aspectRatio: Math.round(aspectRatio * 1000) / 1000,
    objectPosition: `${percent(positionX)} ${percent(positionY)}`,
    window: { x, y, width: windowWidth, height: windowHeight },
  };
}
