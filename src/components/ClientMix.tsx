import { clientMix } from "../config/clients";
import { site } from "../config/site";
import { useLanguage } from "../context/LanguageContext";

const WHEEL = {
  size: 100,
  radius: 35.5,
  stroke: 19,
} as const;

const CIRCUMFERENCE = 2 * Math.PI * WHEEL.radius;
const GAP = CIRCUMFERENCE * 0.015;

function arcLength(percent: number) {
  return (percent / 100) * (CIRCUMFERENCE - GAP * 2);
}

export function ClientMix() {
  const { t } = useLanguage();
  const { femalePercent, malePercent } = clientMix;
  const femaleArc = arcLength(femalePercent);
  const maleArc = arcLength(malePercent);

  return (
    <section
      aria-labelledby="clients-heading"
      className="psl-container psl-section--roomy"
    >
      <div className="psl-section-head psl-section-head--stack">
        <h2 id="clients-heading" className="psl-title">
          {t("clients.title")}
        </h2>
        <p className="psl-copy">{t("clients.description")}</p>
      </div>

      <div className="psl-client-mix">
        <div className="psl-client-mix__wheel">
          <svg
            viewBox={`0 0 ${WHEEL.size} ${WHEEL.size}`}
            aria-hidden="true"
            focusable="false"
          >
            <circle
              className="psl-client-mix__track"
              cx={WHEEL.size / 2}
              cy={WHEEL.size / 2}
              r={WHEEL.radius}
              fill="none"
              strokeWidth={WHEEL.stroke}
            />
            <circle
              className="psl-client-mix__arc psl-client-mix__arc--female"
              cx={WHEEL.size / 2}
              cy={WHEEL.size / 2}
              r={WHEEL.radius}
              fill="none"
              strokeWidth={WHEEL.stroke}
              strokeDasharray={`${femaleArc} ${CIRCUMFERENCE}`}
              strokeDashoffset={0}
              transform={`rotate(-90 ${WHEEL.size / 2} ${WHEEL.size / 2})`}
            />
            <circle
              className="psl-client-mix__arc psl-client-mix__arc--male"
              cx={WHEEL.size / 2}
              cy={WHEEL.size / 2}
              r={WHEEL.radius}
              fill="none"
              strokeWidth={WHEEL.stroke}
              strokeDasharray={`${maleArc} ${CIRCUMFERENCE}`}
              strokeDashoffset={-(femaleArc + GAP)}
              transform={`rotate(-90 ${WHEEL.size / 2} ${WHEEL.size / 2})`}
            />
          </svg>
          <div className="psl-client-mix__hub">
            <img
              src={site.logos.featherOnlySvg}
              alt=""
              className="psl-client-mix__mark"
              width={478}
              height={52}
              decoding="async"
            />
          </div>
        </div>

        <ul className="psl-client-mix__legend">
          <li>
            <span
              className="psl-client-mix__swatch psl-client-mix__swatch--female"
              aria-hidden="true"
            />
            <span>
              {femalePercent}% {t("clients.female")}
            </span>
          </li>
          <li>
            <span
              className="psl-client-mix__swatch psl-client-mix__swatch--male"
              aria-hidden="true"
            />
            <span>
              {malePercent}% {t("clients.male")}
            </span>
          </li>
        </ul>
      </div>
    </section>
  );
}
