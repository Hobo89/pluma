import { useEffect, useMemo, useRef, useState } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { calConfigured, calDirectUrl, calTargetFor } from "../config/cal";
import type { PricingDuration } from "../config/pricing";
import { useLanguage } from "../context/LanguageContext";
import { track } from "../lib/analytics";
import { mailto } from "../lib/contact";

/** How long to wait for the embed to report ready before offering a way out. */
const LOAD_TIMEOUT_MS = 10000;

type Status = "loading" | "ready" | "failed";

export function CalEmbed({ duration }: { duration?: PricingDuration }) {
  const { t, language } = useLanguage();
  const theme = "light" as const;
  const brandColor = "#FF6F0C";

  const [status, setStatus] = useState<Status>("loading");
  const [attempt, setAttempt] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<Status>("loading");

  const target = useMemo(() => calTargetFor(duration), [duration]);
  const locale = language === "es" ? "es" : "en";
  const calLink = target?.link ?? "";
  const embedKey = `${calLink}-${locale}-${attempt}`;

  // Stable objects for @calcom/embed-react — a fresh `config`/`initConfig`
  // each render re-runs its init effect and can wipe in-iframe navigation
  // (event type → calendar back to the profile welcome).
  const initConfig = useMemo(() => ({}), []);
  const config = useMemo(
    () => ({
      ...(target?.params ?? {}),
      layout: "month_view" as const,
      theme,
      locale,
    }),
    [target?.params, theme, locale],
  );

  useEffect(() => {
    if (!calLink) return;

    let cancelled = false;
    statusRef.current = "loading";
    setStatus("loading");

    const timeout = window.setTimeout(() => {
      if (cancelled) return;
      setStatus((current) => {
        if (current === "loading") {
          statusRef.current = "failed";
          track({ name: "booking_widget_failed", reason: "timeout" });
          return "failed";
        }
        return current;
      });
    }, LOAD_TIMEOUT_MS);

    const onReady = () => {
      if (cancelled) return;
      // Cal also fires linkReady when navigating to an event type; keep status
      // stable so we never reconfigure and wipe the calendar view.
      setStatus((current) => (current === "ready" ? current : "ready"));
      if (statusRef.current !== "ready") {
        statusRef.current = "ready";
        track({
          name: "booking_widget_loaded",
          language,
          ...(duration ? { duration } : {}),
        });
      }
    };

    const onFailed = () => {
      if (cancelled) return;
      statusRef.current = "failed";
      setStatus("failed");
      track({ name: "booking_widget_failed", reason: "embed_error" });
    };

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

      api("ui", {
        theme,
        styles: { branding: { brandColor } },
      });
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
    // Re-bind only when the embed instance itself remounts (link / locale / retry).
  }, [embedKey, calLink, duration, language, theme, brandColor]);

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
          className="psl-button"
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
              className="psl-button"
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

      {status !== "failed" ? (
        <div className="psl-embed__frame" data-status={status}>
          <Cal
            key={embedKey}
            calLink={calLink}
            style={{ width: "100%", height: "100%", minHeight: "650px" }}
            config={config}
            initConfig={initConfig}
          />
        </div>
      ) : null}
    </div>
  );
}
