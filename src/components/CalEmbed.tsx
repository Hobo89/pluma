import { useEffect, useRef, useState } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { calConfigured, calDirectUrl, calTargetFor } from "../config/cal";
import type { PricingDuration } from "../config/pricing";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import { track } from "../lib/analytics";
import { mailto } from "../lib/contact";

/** How long to wait for the embed to report itself ready before offering a way out. */
const LOAD_TIMEOUT_MS = 12000;

type Status = "loading" | "ready" | "failed";

export function CalEmbed({ duration }: { duration?: PricingDuration }) {
  const { isDark } = useTheme();
  const { t, language } = useLanguage();
  const theme = isDark ? "dark" : "light";
  const brandColor = isDark ? "#4a8f76" : "#2d5a4a";

  const [status, setStatus] = useState<Status>("loading");
  const [attempt, setAttempt] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const target = calTargetFor(duration);

  useEffect(() => {
    if (!target) return;

    let cancelled = false;
    setStatus("loading");

    const timeout = window.setTimeout(() => {
      if (cancelled) return;
      setStatus((current) => {
        if (current === "loading") {
          track({ name: "booking_widget_failed", reason: "timeout" });
          return "failed";
        }
        return current;
      });
    }, LOAD_TIMEOUT_MS);

    // The embed API is a singleton keyed by namespace. Listeners are removed on
    // cleanup so a language or duration change cannot leave a stale subscriber
    // behind or load the script twice.
    const onReady = () => {
      if (cancelled) return;
      setStatus("ready");
      track({
        name: "booking_widget_loaded",
        language,
        ...(duration ? { duration } : {}),
      });
    };

    const onFailed = () => {
      if (cancelled) return;
      setStatus("failed");
      track({ name: "booking_widget_failed", reason: "embed_error" });
    };

    // Documented by Cal.com but not verifiable from the installed bundle, so it
    // is subscribed defensively and must be confirmed against a real test
    // booking before any confirmation figure is trusted.
    const onBooked = () => {
      if (cancelled) return;
      track({
        name: "booking_confirmed",
        language,
        ...(duration ? { duration } : {}),
      });
    };

    let api: Awaited<ReturnType<typeof getCalApi>> | null = null;

    (async () => {
      api = await getCalApi();
      if (cancelled) return;

      api("ui", { theme, styles: { branding: { brandColor } } });
      api("on", { action: "linkReady", callback: onReady });
      api("on", { action: "linkFailed", callback: onFailed });
      api("on", { action: "bookingSuccessful", callback: onBooked });
    })();

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
      api?.("off", { action: "linkReady", callback: onReady });
      api?.("off", { action: "linkFailed", callback: onFailed });
      api?.("off", { action: "bookingSuccessful", callback: onBooked });
    };
  }, [attempt, brandColor, duration, language, target, theme]);

  // Set the accessible name on the generated iframe. The embed does not expose
  // a title option, and `iframeAttrs` is applied before the element exists.
  useEffect(() => {
    if (status !== "ready") return;
    const iframe = containerRef.current?.querySelector("iframe");
    iframe?.setAttribute("title", t("booking.iframeTitle"));
  }, [status, t]);

  if (!calConfigured || !target) {
    return (
      <div className="psl-embed-fallback">
        <p className="psl-embed-fallback__title">{t("cal.notConfigured")}</p>
        <p className="psl-copy">{t("cal.notConfiguredBody")}</p>
        <a
          className="psl-button psl-button--dark"
          href={mailto(t("booking.enquirySubject"), t("booking.enquiryBody"))}
        >
          {t("booking.emailFallback")}
        </a>
      </div>
    );
  }

  return (
    <div className="psl-embed" ref={containerRef}>
      {status === "loading" ? (
        <p className="psl-embed__status" role="status">
          {t("booking.loading")}
        </p>
      ) : null}

      {status === "failed" ? (
        <div className="psl-embed-fallback" role="alert">
          <p className="psl-embed-fallback__title">
            {t("booking.timeoutTitle")}
          </p>
          <p className="psl-copy">{t("booking.timeoutBody")}</p>
          <div className="psl-actions">
            <a
              className="psl-button psl-button--dark"
              href={calDirectUrl(target)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("booking.openCalendar")}
            </a>
            <a
              className="psl-button psl-button--ghost"
              href={mailto(
                t("booking.enquirySubject"),
                t("booking.enquiryBody"),
              )}
            >
              {t("booking.emailFallback")}
            </a>
            <button
              type="button"
              className="psl-textlink"
              onClick={() => setAttempt((value) => value + 1)}
            >
              {t("booking.retry")}
            </button>
          </div>
        </div>
      ) : null}

      <div
        className="psl-embed__frame"
        data-status={status}
        // Space is reserved up front so the calendar appearing does not shift
        // the page content below it.
      >
        <Cal
          key={`${target.link}-${theme}-${attempt}`}
          calLink={target.link}
          style={{ width: "100%", height: "100%", minHeight: "650px" }}
          config={{
            ...target.params,
            layout: "month_view",
            theme,
          }}
        />
      </div>
    </div>
  );
}
