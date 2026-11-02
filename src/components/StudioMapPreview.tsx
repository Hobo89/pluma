import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { studioMapEmbedUrl } from "../config/site";
import { useLanguage } from "../context/LanguageContext";

/**
 * Map card on the studio tour. The card lifts on hover and the expand mark
 * grows; activating it opens an area map. The street address stays out of
 * the dialog because it is sent after booking.
 */
export function StudioMapPreview() {
  const { t, language } = useLanguage();
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const embedSrc = studioMapEmbedUrl(language);

  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (!dialog.open) dialog.showModal();
    closeRef.current?.focus({ preventScroll: true });

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onCancel = (event: Event) => {
      event.preventDefault();
      setOpen(false);
    };
    dialog.addEventListener("cancel", onCancel);

    return () => {
      dialog.removeEventListener("cancel", onCancel);
      document.body.style.overflow = previousOverflow;
      if (dialog.open) dialog.close();
      openRef.current?.focus({ preventScroll: true });
    };
  }, [open]);

  return (
    <>
      <div className="psl-studio-map">
        <div className="psl-studio-map__canvas" aria-hidden="true">
          <iframe
            title={t("studio.map.frameTitle")}
            src={embedSrc}
            loading="lazy"
            tabIndex={-1}
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
        <button
          ref={openRef}
          type="button"
          className="psl-studio-map__open"
          aria-haspopup="dialog"
          aria-expanded={open}
          onClick={() => setOpen(true)}
        >
          <span className="psl-sr-only">{t("studio.map.open")}</span>
          <span className="psl-studio-map__expand">
            <ExpandIcon />
          </span>
        </button>
      </div>
      {open
        ? createPortal(
            <dialog
              ref={dialogRef}
              className="psl-studio-map-dialog"
              aria-labelledby={titleId}
              onClick={(event) => {
                if (event.target === event.currentTarget) setOpen(false);
              }}
            >
              <div className="psl-studio-map-dialog__panel">
                <button
                  ref={closeRef}
                  type="button"
                  className="psl-studio-map-dialog__close"
                  onClick={() => setOpen(false)}
                >
                  <span className="psl-sr-only">{t("studio.map.close")}</span>
                  <CloseIcon />
                </button>
                <h2 id={titleId} className="psl-studio-map-dialog__title">
                  {t("studio.map.title")}
                </h2>
                <p className="psl-studio-map-dialog__place">
                  {t("studio.map.place")}
                </p>
                <div className="psl-studio-map-dialog__map">
                  <iframe
                    title={t("studio.map.frameTitle")}
                    src={embedSrc}
                    loading="eager"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
                <p className="psl-studio-map-dialog__note">
                  {t("studio.map.exact")}
                </p>
              </div>
            </dialog>,
            document.body,
          )
        : null}
    </>
  );
}

function ExpandIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path
        d="M9 4H4v5M15 4h5v5M9 20H4v-5M15 20h5v-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        d="M6 6l12 12M18 6L6 18"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
