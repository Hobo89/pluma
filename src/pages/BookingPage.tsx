import { Link, useSearchParams } from "react-router-dom";
import { CalEmbed } from "../components/CalEmbed";
import { PageContainer } from "../components/PageContainer";
import { PageMeta } from "../components/PageMeta";
import {
  parseDuration,
  rateFor,
  recommendedDuration,
  sessionRates,
} from "../config/pricing";
import { useLanguage } from "../context/LanguageContext";
import { formatPrice } from "../lib/money";

export function BookingPage() {
  const { t, language } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();

  // The selection survives a refresh and a shared link because it lives in the
  // URL rather than in component state.
  const selected = parseDuration(searchParams.get("duration")) ?? recommendedDuration;
  const rate = rateFor(selected);

  const bookable = sessionRates.filter(
    (entry) => entry.bookingRoute === "calendar",
  );

  return (
    <PageContainer wide>
      <PageMeta page="book" />

      <p className="psl-eyebrow">{t("booking.eyebrow")}</p>
      <h1 className="psl-title">{t("booking.title")}</h1>
      <p className="psl-copy" style={{ marginBlock: "var(--psl-space-6)" }}>
        {t("booking.description")}
      </p>

      {/* Everything a visitor needs in order to decide sits outside the iframe
          and stays visible before any personal data is entered. */}
      <div className="psl-booking-context">
        <fieldset className="psl-booking-durations">
          <legend className="psl-booking-durations__legend">
            {t("booking.changeDuration")}
          </legend>
          <div className="psl-booking-durations__options">
            {bookable.map((entry) => (
              <label key={entry.minutes} className="psl-bono-chip">
                <input
                  type="radio"
                  name="booking-duration"
                  value={entry.minutes}
                  checked={entry.minutes === selected}
                  onChange={() =>
                    setSearchParams(
                      { duration: String(entry.minutes) },
                      { replace: true },
                    )
                  }
                />
                <span>
                  {t("pricing.durationMinutes", { minutes: entry.minutes })}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <dl className="psl-booking-summary">
          <div>
            <dt>{t("booking.selected")}</dt>
            <dd>
              {t("pricing.durationMinutes", { minutes: selected })} ·{" "}
              {formatPrice(rate.cents, language)}
            </dd>
          </div>
        </dl>

        <p className="psl-copy psl-copy--small">{t("booking.inPerson")}</p>
        <p className="psl-copy psl-copy--small">{t("booking.timezone")}</p>
        <p className="psl-copy psl-copy--small">{t("pricing.taxNote")}</p>

        <div className="psl-booking-privacy">
          <p className="psl-copy psl-copy--small">
            {t("booking.privacyNotice")}
          </p>
          <p className="psl-booking-privacy__links">
            <Link to="/privacidad" className="psl-textlink">
              {t("booking.privacyLink")}
            </Link>
            <Link to="/condiciones-reserva" className="psl-textlink">
              {t("durations.termsLink")}
            </Link>
          </p>
        </div>
      </div>

      <div className="psl-booking-embed">
        <CalEmbed duration={selected} />
      </div>
    </PageContainer>
  );
}
