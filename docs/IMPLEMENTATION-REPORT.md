# Pluma implementation report

Branch: `audit-implementation` · Prepared 9 September 2026 · Not deployed.

This reports what was changed in the repository, what was actually tested, and
what could not be verified. It is not a statement that the business, the
pricing or the legal position is now correct: most of that depends on answers
recorded in [`OWNER-INPUTS.md`](../OWNER-INPUTS.md).

---

## 1. Headline

The site is now built booking-first around a recommended 90-minute session,
with a complete digital bono page, honest prelaunch states, and a price
catalogue that cannot drift between pages. Nothing on the public site claims a
capability that has not been proven: there is no working purchase button, no
wallet promise presented as current, and no invented legal identity.

Two things are structural rather than cosmetic:

- **Every route now returns HTTP 200 with its own metadata.** The build emits a
  real HTML file per route, so GitHub Pages no longer answers `/about` with a
  404 status, and unknown paths still get a genuine 404.
- **The 13.64 MB hero video is no longer downloaded on a first mobile view.**
  A first mobile view of the home page is roughly **206 KB** of transfer,
  against roughly **13.9 MB** before.

## 2. Source of truth changes

`src/config/pricing.ts` is the single catalogue and now stores **integer
cents**. Voucher totals, per-session amounts and savings are derived from it
and asserted to be whole cents at module load, so a total can never disagree
with its per-session figure. Formatting happens only in `src/lib/money.ts`
using `Intl.NumberFormat`, giving `€65` / `€292.50` in English and `65 €` /
`292,50 €` in Spanish.

The audited baseline is unchanged: 30/60/90/120 minutes at €25/€45/€65/€85,
with 10% off five-session bonos and 15% off ten-session bonos on 60 and 90
minutes only.

**The 90-minute price conflict is unresolved and visible.** The website figure
(€65) and the calendar figure (€55) disagree. Rather than pick one, the
conflict is recorded in `pricingConflicts` and rendered as a labelled note on
the duration chooser and the prices page. Owner input 3.1 settles it.

### Release states

`src/config/readiness.ts` adds `businessReady`, `bookingReady`,
`bonoSalesReady`, `appleWalletReady`, `googleWalletReady` and
`balanceUpdatesReady`. All default to **false** and can be turned on per
environment through `VITE_READY_*`. Each has a `blockedBy` entry naming the
real-world dependency. They gate behaviour, not decoration: with
`bookingReady` off, every booking control resolves to a working email enquiry
and the calendar is not rendered at all.

## 3. What changed, by area

### Booking-first structure

The home page order is now: offer and availability action → trust → duration
choice → what the session is like → studio → reviews → first visit → location
→ FAQ → small bono teaser → final individual-booking action.

The hero leads with accessible text rather than an image: eyebrow "Private
massage studio · Valencia", an `h1`, a supporting line, the featured
90-minute offer with its price, and the primary action. The wordmark image is
no longer the `h1`.

The duration chooser marks 90 minutes with an outline, a tick and the word
"Recommended", so the recommendation does not depend on colour. The label is
"Recommended" because it reflects Stephen's recommendation; a note says so
explicitly rather than implying sales data. 120 minutes has no calendar event,
so it offers a clearly labelled email enquiry instead of a booking button.

A single sticky booking control appears on small screens after the hero action
scrolls away. It is rendered on the home page only, so it cannot cover the
booking page's own controls, and it respects `env(safe-area-inset-bottom)`.

### Digital bonos

`/member-card` is now the full bono page. **The URL is unchanged** — only the
label became "Digital bonos" / "Bonos digitales". Renaming the path needs
permanent redirects, which GitHub Pages cannot serve; see the limitations
below.

It is built from native accessible components, not a screenshot: a labelled
radio group for sessions, one for duration, and one for the design. Arrow keys
move between designs, selection is announced, and a tick plus an outline
express selection independently of colour. All three designs are visible at
once rather than behind a carousel.

Aqua, Sand and Tree are presented as three designs for the same product. The
supplied artwork was extracted from the review SVGs unchanged, converted to
WebP at two sizes with a PNG fallback, and is scaled proportionally. The
feather was not redrawn or recoloured.

The phone illustration is a generic frame carrying visible text saying it is
not an Apple or Google Wallet screen and that the count is a sample. Wallet
support and update speed are described as being verified, never as working.
The step-three balance line only appears if `balanceUpdatesReady` is set.

The home page carries a compact teaser, not the selector, so a repeat-visit
product never sits between a first-time visitor and a single booking.

### Booking page and the Cal.com embed

Duration selection, the selected price, the Europe/Madrid explanation, the tax
note, the pending payment and cancellation notes, the Pluma privacy notice and
the policy links all sit **outside** the iframe and above any personal data
entry.

The selected duration lives in the URL (`/book?duration=90`), so it survives a
refresh, a shared link and back navigation.

`src/config/cal.ts` builds an explicit, owner-supplied event mapping. A
per-duration link can be set with `VITE_CALCOM_LINK_30/60/90/120`. The
`duration` query parameter is sent **only** when the owner confirms the default
event is multi-duration via `VITE_CALCOM_MULTI_DURATION`. No locale parameter
is guessed: the installed embed (`@calcom/embed-react` 1.5.3) types its config
as an open record of query parameters, so anything can be sent, but only a
value verified against a real event is safe. Separate per-language events
remain the supported route.

`CalEmbed` subscribes to `linkReady` and `linkFailed`, which exist in the
installed bundle, reserves layout space, shows a readable loading state, and
after 12 seconds offers a direct calendar link, an email fallback and a retry.
Listeners are removed on cleanup so a theme or duration change cannot leave a
stale subscriber or a duplicate iframe. The iframe gets the accessible name
"Book an in-person massage with Stephen". Booking success is never inferred
from the embed loading.

### Copy, claims and trust

- Audience percentages ("70% women / 30% men") were removed along with the
  component and its config; the claim was unsupported.
- "Certified masseuse" became "Stephen · your masseur" / "Stephen · masajista".
  No certification seal is shown while qualification is unverified.
- The duplicated language paragraph was fixed: one block covers personalisation
  (pressure, focus areas, things to avoid) and a separate one covers languages.
- Pregnancy and lymphatic sessions are described as **not currently offered**
  and are not selectable, rather than renamed while offering the same thing.
- A plain-language note says the massage is for relaxation and comfort and is
  not physiotherapy or treatment of illness or injury.
- The outcall card no longer links to booking; a "not available yet" card with
  an active booking action was the defect.
- A "Your first visit" section describes private changing, draping, the ability
  to change or stop at any point, and what is agreed beforehand. Access details
  and whether booked time is hands-on time are shown as open questions.

**Testimonial photographs are untouched.** All seven portraits remain
published, in the same files, still paired with their own reviews, in both
`EditorialQuote` and `PortraitStrip`. Only loading, sizing and accessible
labelling changed. A provenance note says permissions are being confirmed; that
is a follow-up, not grounds for removal.

### Legal, privacy and consumer

Five linked pages: legal notice, privacy, cookies, booking terms (new) and bono
terms (new), all in both languages.

The legal notice publishes the trading name and email and states plainly that
the legal name, NIF, business address, registration and premises permission are
not confirmed. No invented NIF or licence number appears; `site.nif` is now
`undefined` rather than the `—` placeholder it held before.

The privacy page carries a real processing inventory built from what the code
actually does (`src/config/processing.ts`): booking data to Cal.com, enquiry
email, browser preferences, hosting logs, and the Google Fonts request. Each
row states purpose, legal basis, recipients and retention, and says "pending"
where retention is genuinely unknown. Payment and wallet processors are absent
because none are connected.

The cookie page documents that only two necessary preference values are stored
and that there is no analytics, so no consent banner is shown — an accurate
description rather than a decorative banner.

Booking and bono terms are published as drafts. Undecided items — payment
timing, cancellation, lateness, validity start, extensions, gifting, unused
credit, refunds, withdrawal — say they are undecided. **No 24-hour deadline and
no forfeiture rule was invented.**

### SEO, routing and metadata

- The build writes `dist/<route>/index.html` for each canonical route with its
  own title, description, canonical URL and Open Graph tags baked into the
  served HTML.
- `404.html` is a distinct shell with `noindex` and its own title.
- `sitemap.xml` is generated from the same route list, so it cannot drift, and
  lists only canonical indexable pages.
- `robots.txt` added, pointing at the sitemap.
- A real catch-all 404 route exists in the router.
- `PageMeta` keeps the head correct during client-side navigation and language
  changes.

**No `hreflang` is emitted.** Both languages are served from the same URL, so a
reciprocal pair would point two language variants at one address, which is
worse than declaring nothing. Introducing `/en/` and `/es/` paths is the
prerequisite; it is not done here.

### Performance

- Responsive WebP posters (780/1280/1920) plus a JPEG fallback were generated
  from the video's own first frame, so the poster matches the footage.
- The poster is the rendered hero image with `fetchpriority="high"` and a
  matching `<link rel="preload">`, making it the LCP element. It is never
  lazy-loaded.
- The video only loads at ≥1024px, when reduced motion is not requested and
  Save-Data is off. It has `preload="none"`.
- Explicit `width`/`height` on hero and bono images to avoid layout shift.
- The favicon was 718 KB and is now 81 KB.
- Three unreferenced assets were deleted (3.6 MB).
- The testimonial rotation starts paused under reduced motion, has visible
  pause, previous and next controls, and stops while a pointer or the keyboard
  is inside the section.

### Measurement

`src/lib/analytics.ts` defines the six events from the brief with a typed,
closed property vocabulary. No provider is wired up; events go to a bounded
in-memory buffer so the call sites can be reviewed before any collection
begins. Names, emails, notes, health information, tokens and full URLs cannot
be passed through the types.

## 4. Test results

Run against the production build served locally. These are real observations.

| Check | Result |
|---|---|
| TypeScript build (`tsc -b && vite build`) | Passes, no errors |
| Voucher arithmetic, all four combinations | Exact. 5×60 €202.50 / €40.50 / saves €22.50 · 5×90 €292.50 / €58.50 / saves €32.50 · 10×60 €382.50 / €38.25 / saves €67.50 · 10×90 €552.50 / €55.25 / saves €97.50 |
| Spanish currency format | `65 €`, `292,50 €` — correct |
| English currency format | `€65`, `€292.50` — correct |
| Per-route HTML files generated | 10 routes, each with its own title, description, canonical and OG tags |
| `404.html` | Distinct title and `noindex` present |
| `sitemap.xml` | Valid namespace, 10 canonical URLs, no checkout or private paths |
| `robots.txt` | Present, references the sitemap |
| Language switch | Titles, nav, copy, prices and legal pages all switch; `<html lang>` updates |
| Home page at 320 px | No horizontal overflow (`scrollWidth` 320 = `clientWidth` 320) |
| Hero at 360 px | Eyebrow, heading, supporting line, offer, availability note and both actions all visible inside the hero |
| Sticky booking bar styling at 320 px | Fixed, full width, pinned to the viewport bottom, 44 px target, safe-area padding applied |
| Sticky bar scoping | Not rendered on the bonos page or the booking page |
| Booking page | Duration radios, selected price, Europe/Madrid note, tax note, privacy notice and terms links all render outside the embed |
| Prelaunch state | With `bookingReady` off, every booking control is an email enquiry; no control implies a confirmed appointment |
| Bono prelaunch state | No purchase button, no wallet promise stated as current, sample count labelled |
| Testimonial portraits | All seven still published and still paired with their own reviews |

### Not verified, and why

- **Sticky bar trigger on scroll.** The automation browser tab has
  `requestAnimationFrame`, scroll events and `IntersectionObserver` all
  suspended, so the show/hide transition could not be exercised. The styling and
  scoping were verified by injecting the markup. Needs a check in a real
  foreground browser.
- **Cal.com embed behaviour.** No `VITE_CALCOM_LINK` is configured in this
  environment, so the loading state, the 12-second timeout, the direct-link
  fallback and the retry were not exercised against a live calendar. The
  not-configured fallback was verified.
- **`bookingSuccessful` event.** Cal.com documents it, but it is not present in
  the installed bundle's strings because it originates inside the iframe. It is
  subscribed defensively and **must be confirmed with a real test booking**
  before any confirmation count is trusted.
- **LCP, INP and CLS.** Not measured. The automation tab's frozen rendering loop
  makes lab timings meaningless and there is no field data. The transfer-byte
  figures below are measured; the Core Web Vitals targets are not claimed as
  met.
- **Real-device checks.** No physical mobile device, screen reader or wallet
  app was available.
- **HTTP status codes in production.** Verified by construction (files exist on
  disk at the right paths), not by a request to GitHub Pages. Local
  `vite preview` returns 200 for everything including unknown paths, because it
  applies a blanket SPA fallback, so it cannot demonstrate the 404 behaviour.
  Re-check after deploying.

### Measured transfer sizes

First view of the home page on mobile, gzipped where applicable:

| Asset | Size |
|---|---|
| `index.html` | 1.3 KB |
| CSS | 11.3 KB |
| JavaScript | 105.5 KB |
| Hero poster (780 px WebP) | 85.3 KB |
| Logo SVGs | 9.9 KB |
| **Total** | **≈ 206 KB** |
| Hero video, previously downloaded on mobile, now not requested | 13.64 MB |

The mobile hero poster is 85.3 KB, inside the 200 KB budget in the brief. These
are transfer sizes, not timings.

## 5. Known limitations

**GitHub Pages cannot set response headers.** This is the one requirement that
cannot be met on the current host. `public/_headers` contains
`X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, HSTS,
`X-Frame-Options` and a report-only CSP written against the site's real
dependencies, but GitHub Pages ignores the file entirely. Options: move to
Netlify or Cloudflare Pages, or put a CDN in front. Until then the site has no
security headers beyond what GitHub Pages sets itself. The CSP is report-only
deliberately — enforcing a wrong `frame-src` silently breaks booking.

**The bono URL is still `/member-card`.** A rename needs 301s, which GitHub
Pages cannot serve. A client-side redirect would return 200 for the old path
and create a duplicate. Do the rename together with the host move.

**No prerendered body content.** Each route serves correct HTML metadata, but
the body is still rendered by React. Full prerendering would need SSR, and the
app reads `localStorage` and `matchMedia` during context initialisation, so it
is not safe to render on the server without refactoring those first.

**Fonts are still loaded from Google Fonts.** Self-hosting would remove a
third-party request and the associated IP disclosure. It is listed as pending
on the cookie page.

**No `/en/` and `/es/` paths**, so no `hreflang`, and the two languages share
one indexable URL. English is the documented default in the static HTML.

## 6. Handoff back to the owner

1. Work through [`OWNER-INPUTS.md`](../OWNER-INPUTS.md). Section 3.1 (the
   90-minute price) blocks the most.
2. Make the Cal.com changes in `pluma-calcom-manual.md` yourself. Nothing in
   this branch touched the Cal.com account, and no setting, booking or message
   was changed.
3. Send back the confirmed catalogue, the event URLs or IDs per duration, the
   payment and cancellation wording, the field list and the test results.
4. Only then set the matching `VITE_READY_*` flags, one at a time, and retest.

Cal.com values needed, none of which exist yet: the default event link, a link
per duration where separate events are used, and confirmation of whether the
default event accepts the `duration` parameter. These go in `.env`; see
`.env.example`.

## 7. A note on the audit

The handoff contained the implementation brief, the Cal.com manual, the legal
checklist and the visual review folder. **The MHTML audit itself was not
included**, so PL-01 to PL-27 are traced through the grouped mapping in the
brief rather than against individual findings. Where a status below says
"cannot verify", it means the underlying observation was not available to
reproduce. See [`PL-STATUS-MATRIX.md`](./PL-STATUS-MATRIX.md).
