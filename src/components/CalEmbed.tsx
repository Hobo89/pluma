import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { calConfigured, calLink } from "../config/cal";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";

export function CalEmbed() {
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const theme = isDark ? "dark" : "light";
  const brandColor = isDark ? "#4a8f76" : "#2d5a4a";

  useEffect(() => {
    if (!calConfigured) return;

    (async () => {
      const cal = await getCalApi();
      cal("ui", {
        theme,
        styles: { branding: { brandColor } },
      });
    })();
  }, [theme, brandColor]);

  if (!calConfigured) {
    return (
      <div className="rounded-xl border border-border bg-surface px-6 py-10 text-center text-muted">
        <p className="mb-2 font-normal text-text">{t("cal.notConfigured")}</p>
        <p className="text-sm">
          {t("cal.instructions")}{" "}
          <code className="rounded-md border border-border bg-bg px-1.5 py-0.5">
            VITE_CALCOM_LINK
          </code>{" "}
          {t("cal.inFile")}{" "}
          <code className="rounded-md border border-border bg-bg px-1.5 py-0.5">
            .env
          </code>{" "}
          {t("cal.file")}{" "}
          <code className="rounded-md border border-border bg-bg px-1.5 py-0.5">
            your-name/massage
          </code>
          ).
        </p>
      </div>
    );
  }

  return (
    <Cal
      key={theme}
      calLink={calLink}
      style={{ width: "100%", height: "100%", minHeight: "650px", overflow: "scroll" }}
      config={{ layout: "month_view", theme }}
    />
  );
}
