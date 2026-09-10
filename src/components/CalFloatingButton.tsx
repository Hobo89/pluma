import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getCalApi } from "@calcom/embed-react";
import {
  calConfigured,
  calFloatingNamespace,
  calLink,
} from "../config/cal";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";

/** Matches the Cal.com floating-popup embed colours. */
const BUTTON_COLOR = "#9daf44";
const BRAND_LIGHT = "#f28c38";
const BRAND_DARK = "#cc762f";

function removeFloatingButton(namespace: string) {
  document
    .querySelectorAll(`cal-floating-button[data-cal-namespace="${namespace}"]`)
    .forEach((el) => el.remove());
}

/** Cal.com hides the icon but leaves the label's left margin in place. */
function dropIconSpacing(namespace: string) {
  const apply = () => {
    const host = document.querySelector(
      `cal-floating-button[data-cal-namespace="${namespace}"]`,
    );
    const label = host?.shadowRoot?.querySelector<HTMLElement>("#button");
    if (!label) return false;
    label.style.marginLeft = "0";
    return true;
  };

  if (apply()) return;

  let frames = 0;
  const retry = () => {
    frames += 1;
    if (apply() || frames > 30) return;
    requestAnimationFrame(retry);
  };
  requestAnimationFrame(retry);
}

/** Same breakpoint as `.psl-sticky-book` and `StickyBookingBar`. */
const MOBILE_BOOKING_BAR = "(max-width: 767px)";

function useStickyBarCoversCal(pathname: string) {
  const [narrow, setNarrow] = useState(
    () => window.matchMedia(MOBILE_BOOKING_BAR).matches,
  );

  useEffect(() => {
    const media = window.matchMedia(MOBILE_BOOKING_BAR);
    const sync = () => setNarrow(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  // Home is the only page that mounts the sticky bar. Decide from the
  // viewport on the first render so Cal never injects a chip underneath it.
  return pathname === "/" && narrow;
}

/**
 * Persistent Cal.com floating booking button on every page except `/book`,
 * where the inline calendar already provides the same flow.
 */
export function CalFloatingButton() {
  const { pathname } = useLocation();
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const stickyCovers = useStickyBarCoversCal(pathname);
  const hidden =
    pathname === "/book" ||
    !calConfigured ||
    !calLink ||
    stickyCovers;

  // Load the Cal.com snippet on every page so booking CTAs can open the
  // element-click modal even when this floating chip is hidden.
  useEffect(() => {
    if (!calConfigured || !calLink) return;

    let cancelled = false;

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
    })();

    return () => {
      cancelled = true;
    };
  }, [language, theme]);

  useEffect(() => {
    if (hidden) {
      const sweep = () => removeFloatingButton(calFloatingNamespace);
      sweep();
      const observer = new MutationObserver(sweep);
      observer.observe(document.documentElement, {
        childList: true,
        subtree: true,
      });
      return () => observer.disconnect();
    }

    let cancelled = false;

    (async () => {
      const cal = await getCalApi({ namespace: calFloatingNamespace });
      if (cancelled) return;

      removeFloatingButton(calFloatingNamespace);

      cal("floatingButton", {
        calLink,
        buttonText: t("floatingButton.label"),
        hideButtonIcon: true,
        buttonColor: BUTTON_COLOR,
        config: {
          layout: "month_view",
          useSlotsViewOnSmallScreen: "true",
        },
      });
      dropIconSpacing(calFloatingNamespace);
    })();

    return () => {
      cancelled = true;
      removeFloatingButton(calFloatingNamespace);
    };
  }, [hidden, language, t]);

  return null;
}
