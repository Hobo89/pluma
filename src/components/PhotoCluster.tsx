export type PhotoClusterImage = {
  src: string;
  position?: string;
};

export const studioPhotoCluster = [
  { src: "/assets/images/studio-staircase.jpg", position: "50% 40%" },
  { src: "/assets/images/studio-hallway.jpg", position: "50% 45%" },
  { src: "/assets/images/studio-room-peek.jpg", position: "42% 48%" },
  { src: "/assets/images/studio-room.jpg", position: "50% 50%" },
  { src: "/assets/images/studio-bathroom.jpg", position: "50% 40%" },
  { src: "/assets/images/studio-draping.jpg", position: "50% 45%" },
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
          key={image.src}
          className="psl-photo-cluster__item"
          src={image.src}
          alt=""
          loading="lazy"
          sizes="(max-width: 767px) 30vw, 12vw"
          style={
            image.position ? { objectPosition: image.position } : undefined
          }
        />
      ))}
    </figure>
  );
}
