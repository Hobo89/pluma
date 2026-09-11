import { useEffect, useId, useRef, useState } from "react";
import { useLanguage } from "../context/LanguageContext";

export type PhotoClusterImage = {
  src: string;
  captionKey: string;
  position?: string;
};

export const studioPhotoCluster = [
  {
    src: "/assets/images/studio-staircase.jpg",
    captionKey: "studio.photos.entrance",
    position: "50% 40%",
  },
  {
    src: "/assets/images/studio-hallway.jpg",
    captionKey: "studio.photos.hallway",
    position: "50% 45%",
  },
  {
    src: "/assets/images/studio-room-peek.jpg",
    captionKey: "studio.photos.studioEntrance",
    position: "42% 48%",
  },
  {
    src: "/assets/images/studio-room.jpg",
    captionKey: "studio.photos.studio",
    position: "50% 50%",
  },
  {
    src: "/assets/images/studio-bathroom.jpg",
    captionKey: "studio.photos.bathroom",
    position: "50% 40%",
  },
  {
    src: "/assets/images/studio-draping.jpg",
    captionKey: "studio.photos.towels",
    position: "50% 45%",
  },
] as const satisfies readonly PhotoClusterImage[];

type PhotoClusterProps = {
  images: readonly PhotoClusterImage[];
  label: string;
};

export function PhotoCluster({ images, label }: PhotoClusterProps) {
  const { t } = useLanguage();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const titleId = useId();
  const openImage = openIndex === null ? null : images[openIndex];
  const caption = openImage ? t(openImage.captionKey) : "";

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (openIndex !== null) {
      if (!dialog.open) dialog.showModal();
      return;
    }

    if (dialog.open) dialog.close();
  }, [openIndex]);

  useEffect(() => {
    if (openIndex === null) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        setOpenIndex((index) =>
          index === null ? index : (index + 1) % images.length,
        );
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setOpenIndex((index) =>
          index === null ? index : (index - 1 + images.length) % images.length,
        );
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [images.length, openIndex]);

  return (
    <>
      <ul className="psl-photo-cluster" aria-label={label}>
        {images.map((image, index) => {
          const photoCaption = t(image.captionKey);

          return (
            <li key={image.src} className="psl-photo-cluster__card">
              <figure>
                <button
                  type="button"
                  className="psl-photo-cluster__open"
                  onClick={() => setOpenIndex(index)}
                  aria-label={t("studio.photos.view", { caption: photoCaption })}
                >
                  <img
                    className="psl-photo-cluster__item"
                    src={image.src}
                    alt=""
                    loading="lazy"
                    sizes="(max-width: 767px) 78vw, 18rem"
                    style={
                      image.position
                        ? { objectPosition: image.position }
                        : undefined
                    }
                  />
                </button>
                <figcaption className="psl-photo-cluster__caption">
                  {photoCaption}
                </figcaption>
              </figure>
            </li>
          );
        })}
      </ul>

      <dialog
        ref={dialogRef}
        className="psl-photo-lightbox"
        aria-labelledby={titleId}
        onClose={() => setOpenIndex(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setOpenIndex(null);
        }}
      >
        {openImage ? (
          <div className="psl-photo-lightbox__frame">
            <img
              className="psl-photo-lightbox__image"
              src={openImage.src}
              alt=""
            />
            <p id={titleId} className="psl-photo-lightbox__caption">
              {caption}
            </p>
            <button
              type="button"
              className="psl-photo-lightbox__close"
              onClick={() => setOpenIndex(null)}
            >
              {t("studio.photos.close")}
            </button>
            {images.length > 1 ? (
              <>
                <button
                  type="button"
                  className="psl-photo-lightbox__nav psl-photo-lightbox__nav--prev"
                  onClick={() =>
                    setOpenIndex(
                      (index) =>
                        (index === null
                          ? 0
                          : index - 1 + images.length) % images.length,
                    )
                  }
                >
                  {t("studio.photos.previous")}
                </button>
                <button
                  type="button"
                  className="psl-photo-lightbox__nav psl-photo-lightbox__nav--next"
                  onClick={() =>
                    setOpenIndex(
                      (index) =>
                        (index === null ? 0 : index + 1) % images.length,
                    )
                  }
                >
                  {t("studio.photos.next")}
                </button>
              </>
            ) : null}
          </div>
        ) : null}
      </dialog>
    </>
  );
}
