export type PhotoClusterSlot = "top" | "left" | "right" | "bottom";

export type PhotoClusterImage = {
  src: string;
  slot: PhotoClusterSlot;
  position?: string;
};

export const studioPhotoCluster = [
  { src: "/assets/images/studio-shelf.jpg", slot: "top", position: "50% 40%" },
  { src: "/assets/images/studio-doorway.jpg", slot: "left", position: "60% 50%" },
  { src: "/assets/images/studio-table.jpg", slot: "right", position: "45% 55%" },
  {
    src: "/assets/images/studio-still-life.jpg",
    slot: "bottom",
    position: "50% 42%",
  },
] as const satisfies readonly PhotoClusterImage[];

type PhotoClusterProps = {
  images: readonly PhotoClusterImage[];
  label: string;
};

export function PhotoCluster({ images, label }: PhotoClusterProps) {
  return (
    <figure className="psl-photo-cluster" aria-label={label}>
      {images.map((image) => (
        <img
          key={image.slot}
          className={`psl-photo-cluster__item psl-photo-cluster__item--${image.slot}`}
          src={image.src}
          alt=""
          loading="lazy"
          sizes="(max-width: 767px) 42vw, 18vw"
          style={
            image.position ? { objectPosition: image.position } : undefined
          }
        />
      ))}
    </figure>
  );
}
