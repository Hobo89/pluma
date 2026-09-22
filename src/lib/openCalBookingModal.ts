import { getCalApi } from "@calcom/embed-react";
import {
  calConfigured,
  calFloatingNamespace,
  calTargetFor,
} from "../config/cal";
import type { PricingDuration } from "../config/pricing";

/** Open the shared Cal.com booking modal (same path as BookingAction). */
export async function openCalBookingModal(
  duration?: PricingDuration,
  theme: "light" | "dark" = "light",
): Promise<boolean> {
  const target = calTargetFor(duration);
  if (!calConfigured || !target) return false;

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
  return true;
}
