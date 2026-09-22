import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";
import {
  calConfigured,
  calFloatingNamespace,
  calLink,
} from "../config/cal";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";

const BRAND_LIGHT = "#f28c38";
const BRAND_DARK = "#cc762f";

function removeFloatingButtons() {
  document
    .querySelectorAll("cal-floating-button")
    .forEach((el) => el.remove());
}

/**
 * Loads the Cal.com modal API for BookingAction / navbar CTAs without ever
 * injecting the bottom-right floating chip.
 */
export function CalModalBootstrap() {
  const { language } = useLanguage();
  const { theme } = useTheme();

  useEffect(() => {
    if (!calConfigured || !calLink) return;

    let cancelled = false;
    const sweep = () => removeFloatingButtons();
    sweep();
    const observer = new MutationObserver(sweep);
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });

    (async () => {
      const globalCal = window.Cal;
      if (globalCal) {
        globalCal.config = { ...globalCal.config, forwardQueryParams: true };
      }

      const cal = await getCalApi({ namespace: calFloatingNamespace });
      if (cancelled) return;

      cal("ui", {
        theme,
        hideEventTypeDetails: false,
        layout: "month_view",
        cssVarsPerTheme: {
          light: { "cal-brand": BRAND_LIGHT },
          dark: { "cal-brand": BRAND_DARK },
        },
      });
      sweep();
    })();

    return () => {
      cancelled = true;
      observer.disconnect();
      sweep();
    };
  }, [language, theme]);

  return null;
}
