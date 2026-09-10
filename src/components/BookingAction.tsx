import { getCalApi } from "@calcom/embed-react";
import { Link } from "react-router-dom";
import {
  calConfigured,
  calFloatingNamespace,
  calTargetFor,
} from "../config/cal";
import type { PricingDuration } from "../config/pricing";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
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
  onTriggered?: () => void;
};

function modalConfig(
  params: Record<string, string>,
  theme: "light" | "dark",
) {
  return {
    layout: "month_view" as const,
    useSlotsViewOnSmallScreen: "true",
    theme,
    ...params,
  };
}

/**
 * The single place that decides how a booking call to action opens Cal.com.
 *
 * Configured bookings use the element-click modal from the Cal.com snippet
 * (`data-cal-link` on the control). If the embed is not ready yet, the same
 * modal is opened through the API. Unconfigured bookings still go to `/book`.
 */
export function BookingAction({
  label,
  duration,
  placement,
  className = "psl-button",
  onTriggered,
}: BookingActionProps) {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const target = calTargetFor(duration);

  if (!calConfigured || !target) {
    return (
      <Link
        to={duration ? `/book?duration=${duration}` : "/book"}
        className={className}
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
        {label}
      </Link>
    );
  }

  const config = modalConfig(target.params, theme);

  return (
    <button
      type="button"
      className={className}
      data-cal-namespace={calFloatingNamespace}
      data-cal-link={target.link}
      data-cal-config={JSON.stringify(config)}
      onClick={async (event) => {
        track({
          name: "booking_cta_clicked",
          placement,
          language,
          ...(duration ? { duration } : {}),
        });
        onTriggered?.();

        // The snippet listener only works after embed.js has defined the
        // namespace. Open the same modal ourselves if the visitor is faster.
        if (!window.Cal?.ns?.[calFloatingNamespace]) {
          event.stopPropagation();
          const cal = await getCalApi({ namespace: calFloatingNamespace });
          cal("modal", {
            calLink: target.link,
            config: {
              layout: "month_view",
              useSlotsViewOnSmallScreen: "true",
              theme,
              ...target.params,
            },
          });
        }
      }}
    >
      {label}
    </button>
  );
}
