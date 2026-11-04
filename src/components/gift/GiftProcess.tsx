import type { ReactNode } from "react";
import { useLanguage } from "../../context/LanguageContext";

const STEPS = ["receive", "phone", "track"] as const;

const iconProps = {
  viewBox: "0 0 24 24",
  width: 32,
  height: 32,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
};

function MailIcon() {
  return (
    <svg {...iconProps}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg {...iconProps}>
      <rect x="7" y="2.5" width="10" height="19" rx="2" />
      <path d="M11 18.5h2" />
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg {...iconProps}>
      <path d="M20 12a8 8 0 1 1-2.2-5.5" />
      <path d="M20 4.5V9h-4.5" />
    </svg>
  );
}

const ICONS: Record<(typeof STEPS)[number], ReactNode> = {
  receive: <MailIcon />,
  phone: <PhoneIcon />,
  track: <RefreshIcon />,
};

export function GiftProcess() {
  const { t } = useLanguage();

  return (
    <section className="psl-gift-process" aria-labelledby="gift-process-heading">
      <h2 id="gift-process-heading" className="psl-title">
        {t("gift.processTitle")}
      </h2>
      <ol className="psl-gift-process__steps">
        {STEPS.map((id) => (
          <li key={id}>
            {ICONS[id]}
            <h3>{t(`gift.process.${id}.title`)}</h3>
            <p className="psl-copy">{t(`gift.process.${id}.body`)}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
