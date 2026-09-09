import { Link } from "react-router-dom";
import { readiness } from "../config/readiness";
import type { PricingDuration } from "../config/pricing";
import { useLanguage } from "../context/LanguageContext";
import { track, type AnalyticsEvent } from "../lib/analytics";
import { mailto } from "../lib/contact";

type Placement = Extract<
  AnalyticsEvent,
  { name: "booking_cta_clicked" }
>["placement"];

type BookingActionProps = {
  label: string;
  /** Shown when the control resolves to an email enquiry. */
  enquiryLabel?: string;
  duration?: PricingDuration;
  placement: Placement;
  className?: string;
  /** Forces the email route regardless of readiness, e.g. 120 minutes. */
  enquiryOnly?: boolean;
};

/**
 * The single place that decides what a booking call to action actually does.
 *
 * Until `bookingReady` is set, or for a duration with no calendar event, the
 * control is an email enquiry rather than a button that looks like it will
 * confirm an appointment.
 */
export function BookingAction({
  label,
  enquiryLabel,
  duration,
  placement,
  className = "psl-button",
  enquiryOnly = false,
}: BookingActionProps) {
  const { t, language } = useLanguage();
  const useEmail = enquiryOnly || !readiness.bookingReady;

  const onActivate = () => {
    track({
      name: "booking_cta_clicked",
      placement,
      language,
      ...(duration ? { duration } : {}),
    });
  };

  if (useEmail) {
    const subject = duration
      ? `${t("booking.enquirySubject")} · ${duration} min`
      : t("booking.enquirySubject");

    return (
      <a
        href={mailto(subject, t("booking.enquiryBody"))}
        className={className}
        onClick={onActivate}
      >
        {enquiryLabel ?? t("prelaunch.emailCta")}
      </a>
    );
  }

  return (
    <Link
      to={duration ? `/book?duration=${duration}` : "/book"}
      className={className}
      onClick={onActivate}
    >
      {label}
    </Link>
  );
}
