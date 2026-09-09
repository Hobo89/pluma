import { Link } from "react-router-dom";
import type { PricingDuration } from "../config/pricing";
import { useLanguage } from "../context/LanguageContext";
import { track, type AnalyticsEvent } from "../lib/analytics";

type Placement = Extract<
  AnalyticsEvent,
  { name: "booking_cta_clicked" }
>["placement"];

type BookingActionProps = {
  label: string;
  duration?: PricingDuration;
  placement: Placement;
  className?: string;
};

/**
 * The single place that decides where a booking call to action goes.
 *
 * Every one of them leads to the booking page and the Cal.com calendar. The
 * selected duration travels in the URL so it survives a refresh or a shared
 * link.
 */
export function BookingAction({
  label,
  duration,
  placement,
  className = "psl-button",
}: BookingActionProps) {
  const { language } = useLanguage();

  return (
    <Link
      to={duration ? `/book?duration=${duration}` : "/book"}
      className={className}
      onClick={() =>
        track({
          name: "booking_cta_clicked",
          placement,
          language,
          ...(duration ? { duration } : {}),
        })
      }
    >
      {label}
    </Link>
  );
}
