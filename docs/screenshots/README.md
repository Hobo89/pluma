# Delivery screenshots

Full-page captures of the `audit-implementation` branch, taken from the
production build served locally on 9 September 2026. Light theme, all images
forced to load so nothing appears as an empty box.

Naming: `<page>-<language>-<viewport>.webp`

- Pages: `home`, `pricing`, `booking`, `bonos`
- Languages: `en`, `es`
- Viewports: `desktop` (1440×900) and `mobile` (390×844 at 2× density)

The mobile home captures were scaled down to fit WebP's 16383px dimension
limit; everything else is at native capture resolution.

## What these show

- **home** — the booking-first order, the 90-minute recommendation, and the
  testimonial portraits still published and paired with their own reviews.
- **pricing** — the catalogue with the recommendation, the unresolved
  90-minute price note, and bono totals with savings and validity.
- **booking** — duration selection, price, Europe/Madrid note and the privacy
  notice all outside the calendar, plus the prelaunch email fallback. The
  calendar itself is not shown because no Cal.com link is configured.
- **bonos** — the three designs, package selection, exact totals, the labelled
  generic phone illustration, and the prelaunch state with no purchase button.

All four pages are captured with every release flag off, which is the state the
public site would be in today.
