import { useEffect, useState } from "react";
import { recommendedDuration } from "../config/pricing";
import { useLanguage } from "../context/LanguageContext";
import { BookingAction } from "./BookingAction";

const MOBILE_BOOKING_BAR = "(max-width: 767px)";

/**
 * Full-width booking control on small screens. The Cal.com floating button is
 * removed while this is on screen so the two CTAs do not stack.
 *
 * Rendered on the home page only, so it cannot cover the calendar's own
 * actions on the booking page. Safe-area padding is applied in CSS.
 */
export function StickyBookingBar() {
  const { t } = useLanguage();
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia(MOBILE_BOOKING_BAR).matches,
  );

  useEffect(() => {
    const media = window.matchMedia(MOBILE_BOOKING_BAR);
    const sync = () => setIsMobile(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    document.documentElement.toggleAttribute("data-psl-sticky-book", isMobile);
    return () =>
      document.documentElement.removeAttribute("data-psl-sticky-book");
  }, [isMobile]);

  if (!isMobile) return null;

  return (
    <div className="psl-sticky-book">
      <BookingAction
        label={t("sticky.label")}
        duration={recommendedDuration}
        placement="sticky"
        className="psl-button psl-sticky-book__button"
      />
    </div>
  );
}
