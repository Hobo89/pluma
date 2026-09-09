import { useEffect, useState } from "react";
import { recommendedDuration } from "../config/pricing";
import { useLanguage } from "../context/LanguageContext";
import { BookingAction } from "./BookingAction";

/**
 * One unobtrusive booking control on small screens, shown only after the hero
 * call to action has scrolled out of view.
 *
 * Rendered on the home page only, so it cannot cover the calendar's own
 * actions on the booking page. Safe-area padding is applied in CSS.
 */
export function StickyBookingBar() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // One rect read per scroll event on a single element. Deliberately not an
    // IntersectionObserver or a rAF loop: both are throttled or suspended in
    // background and embedded views, where this would silently never appear.
    const measure = () => {
      const heroActions = document.querySelector("[data-hero-actions]");
      if (!heroActions) return;
      setVisible(heroActions.getBoundingClientRect().bottom <= 0);
    };

    measure();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure, { passive: true });

    return () => {
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, []);

  // Not rendered while hidden, so the button never sits off-screen in the tab
  // order or behind `aria-hidden`.
  if (!visible) return null;

  return (
    <div className="psl-sticky-book">
      <BookingAction
        label={t("sticky.label")}
        duration={recommendedDuration}
        placement="sticky"
        className="psl-button psl-button--dark psl-sticky-book__button"
      />
    </div>
  );
}
