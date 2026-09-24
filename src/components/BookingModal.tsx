import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { PricingDuration } from "../config/pricing";
import { site } from "../config/site";
import { useLanguage } from "../context/LanguageContext";
import { registerBookingOpener } from "../lib/openCalBookingModal";
import { CalEmbed } from "./CalEmbed";

type BookingRequest = {
  duration?: PricingDuration;
};

type BookingModalContextValue = {
  openBooking: (duration?: PricingDuration) => void;
  closeBooking: () => void;
  isOpen: boolean;
};

const BookingModalContext = createContext<BookingModalContextValue | null>(
  null,
);

export function BookingModalProvider({ children }: { children: ReactNode }) {
  const { t, language } = useLanguage();
  const [request, setRequest] = useState<BookingRequest | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const isOpen = request !== null;

  const openBooking = useCallback((duration?: PricingDuration) => {
    restoreFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    setRequest({ duration });
  }, []);

  const closeBooking = useCallback(() => {
    setRequest(null);
  }, []);

  useEffect(() => {
    registerBookingOpener(openBooking);
    return () => registerBookingOpener(null);
  }, [openBooking]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) dialog.showModal();
      closeRef.current?.focus({ preventScroll: true });
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previousOverflow;
      };
    }

    if (dialog.open) dialog.close();
    restoreFocusRef.current?.focus({ preventScroll: true });
    restoreFocusRef.current = null;
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const dialog = dialogRef.current;
    if (!dialog) return;

    const onCancel = (event: Event) => {
      event.preventDefault();
      closeBooking();
    };
    dialog.addEventListener("cancel", onCancel);
    return () => dialog.removeEventListener("cancel", onCancel);
  }, [closeBooking, isOpen]);

  return (
    <BookingModalContext.Provider value={{ openBooking, closeBooking, isOpen }}>
      {children}
      <dialog
        ref={dialogRef}
        className="psl-booking-dialog"
        aria-labelledby={titleId}
        lang={language === "es" ? "es" : "en"}
      >
        {isOpen ? (
          <div className="psl-booking-dialog__panel">
            <div className="psl-booking-dialog__chrome">
              <h2 id={titleId} className="psl-booking-dialog__title">
                {t("booking.dialogTitle")}
              </h2>
              <button
                ref={closeRef}
                type="button"
                className="psl-booking-dialog__close"
                onClick={closeBooking}
              >
                {t("booking.close")}
              </button>
            </div>
            <div className="psl-booking-dialog__intro">
              <p className="psl-copy psl-copy--small psl-booking-dialog__note">
                {t("booking.dialogWelcome")}
              </p>
              <p className="psl-copy psl-copy--small psl-booking-dialog__note">
                <span aria-hidden="true">📨 </span>
                {t("booking.dialogConfirmation")}
              </p>
              <div className="psl-booking-dialog__map">
                <iframe
                  title={t("booking.mapTitle")}
                  src={site.mapsEmbedUrl}
                  width="100%"
                  height="300"
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </div>
            <div className="psl-booking-dialog__embed">
              <CalEmbed duration={request?.duration} />
            </div>
          </div>
        ) : null}
      </dialog>
    </BookingModalContext.Provider>
  );
}

export function useBookingModal() {
  const context = useContext(BookingModalContext);
  if (!context) {
    throw new Error("useBookingModal must be used within BookingModalProvider");
  }
  return context;
}
