import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  calConfigured,
  calTargetFor,
} from "../config/cal";
import type { PricingDuration } from "../config/pricing";
import { useLanguage } from "../context/LanguageContext";
import { track, type AnalyticsEvent } from "../lib/analytics";
import { useBookingModal } from "./BookingModal";

type Placement = Extract<
  AnalyticsEvent,
  { name: "booking_cta_clicked" }
>["placement"];

type BookingActionProps = {
  label: string;
  duration?: PricingDuration;
  placement: Placement;
  className?: string;
  onTriggered?: () => void;
  children?: ReactNode;
};

/**
 * Single booking entry point: opens the app-owned accessible dialog with an
 * inline Cal embed, or routes to /book when Cal is not configured.
 */
export function BookingAction({
  label,
  duration,
  placement,
  className = "psl-button",
  onTriggered,
  children,
}: BookingActionProps) {
  const { language } = useLanguage();
  const { openBooking } = useBookingModal();
  const target = calTargetFor(duration);
  const content = children ?? label;
  const labelledByChildren = Boolean(children);

  if (!calConfigured || !target) {
    return (
      <Link
        to={duration ? `/book?duration=${duration}` : "/book"}
        className={className}
        aria-label={labelledByChildren ? label : undefined}
        onClick={() => {
          track({
            name: "booking_cta_clicked",
            placement,
            language,
            ...(duration ? { duration } : {}),
          });
          onTriggered?.();
        }}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={className}
      aria-label={labelledByChildren ? label : undefined}
      onClick={() => {
        track({
          name: "booking_cta_clicked",
          placement,
          language,
          ...(duration ? { duration } : {}),
        });
        onTriggered?.();
        openBooking(duration);
      }}
    >
      {content}
    </button>
  );
}
