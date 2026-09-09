# Pluma.life — Cursor implementation instructions

Prepared 9 September 2026. Implement the changes below in the existing repository. Deliver a reviewable branch, screenshots and a completion report; do not deploy automatically. Read the repository's instructions and brand sources first. Adapt component names and paths to the actual framework; do not migrate frameworks just to follow this brief.

## 1. Objective and source hierarchy

Primary outcome: more completed individual massage bookings, with **90 minutes as the recommended duration**. Bonos support repeat visits and must remain secondary to first-time booking. Preserve Pluma's quiet, contemporary, Mediterranean, tactile and human identity.

Use sources in this order: current owner decisions below; verified repository business configuration and original brand assets; attached audit; recommendations in this brief. Where current values conflict, expose the conflict in the owner checklist rather than silently choosing a new commercial policy.

Evidence: the attached MHTML audit, dated 8 September 2026, contains PL-01–PL-27 and two screenshots. Findings are historical observations, not newly reproduced results. The preparation of this brief included reading the full audit and its screenshots; web retrieval of the live homepage failed. Do not interpret that retrieval failure as an outage, indexing problem or security finding. Reproduce relevant defects in the repository/preview before claiming they are fixed.

### Owner-confirmed decisions

- Prioritise individual bookings; recommend 90 minutes.
- Digital bono payment, email delivery, wallet support and updated balance are in development, not live. Payment provider is not yet live or identified.
- Five-session bono: three months' validity. Ten-session bono: six months' validity. Start date and extension rules are unresolved.
- Owner is not yet registered as an autónomo. Use explicit internal placeholders for legal/professional facts; do not imply registration, insurance, certification or premises authorisation is confirmed.
- Cursor has the source repository and assets. Cal.com account changes are for the owner to perform manually using `pluma-calcom-manual.md`.

### Commercial baseline from the audit — not newly approved pricing

| Duration | Website price in audit | Action |
|---|---:|---|
| 30 minutes | €25 | Retain as a secondary choice if still in the source catalogue; do not remove silently. |
| 60 minutes | €45 | Secondary choice. |
| 90 minutes | €65 | Recommend this duration; calendar instead showed €55. Owner must settle this conflict before release. |
| 120 minutes | €85 | Do not offer a working-looking booking CTA until there is a matching event or a confirmed enquiry process. |

| Bono | Audited discount | Audited total | Per session | Owner-confirmed validity |
|---|---:|---:|---:|---|
| 5 × 60 min | 10% | €202.50 | €40.50 | 3 months |
| 5 × 90 min | 10% | €292.50 | €58.50 | 3 months |
| 10 × 60 min | 15% | €382.50 | €38.25 | 6 months |
| 10 × 90 min | 15% | €552.50 | €55.25 | 6 months |

Prepare previews using this baseline if no newer authoritative repository values exist. Record the unresolved price conflict prominently in the implementation report. Never silently add VAT on top of the displayed consumer price or change discounts. Use integer cents and one catalogue for every website price, savings calculation and duration label. Payment and calendar configuration must be reconciled with it before launch.

## 2. Release states and unresolved facts

Implement separate release controls following repository conventions:

- `businessReady`: initially false until owner confirms registration, permitted operation and complete mandatory disclosures.
- `bookingReady`: owner-verified event mapping, price, payment timing, terms and end-to-end confirmation.
- `bonoSalesReady`: provider configured, terms approved, verified paid-order issuance and delivery.
- `appleWalletReady`, `googleWalletReady`, `balanceUpdatesReady`: independent capability checks, not decorative switches that assert readiness.

Build the complete booking-first experience in staging. In a public prelaunch state use honest availability copy and a working enquiry email, not a form that confirms appointments or takes payment. Suggested copy: EN “Bookings opening soon. Have a question? Email Stephen.” ES “Próximamente podrás reservar. ¿Tienes alguna pregunta? Escríbele a Stephen.” Do not switch the current live site or external calendar off yourself; surface this proposed release behaviour to the owner in the reviewable branch. A website flag does not regularise the underlying business, and existing external booking links need owner review too.

Incomplete facts belong in a typed internal configuration/checklist, never literal public `TODO`, invented NIF, fake certificate number or a disabled legal-page link. Preview-only placeholders are allowed and must be visibly labelled. Before a transactional release, require all relevant facts. Nonessential unsupported badges can simply be omitted.

Create `OWNER-INPUTS.md` with value, evidence, owner and blocking scope for:

| Input | Initial status | Scope |
|---|---|---|
| Full legal name, NIF, lawful business/contact address | Name appears in audit; exact legal fields unverified | Business release |
| Hacienda/RETA status and permitted start date | Not registered per owner | Business release |
| Premises activity classification/permission | Unverified; home studio | Business release |
| Exact qualification, issuer, year, professional scope; insurance | Unverified | Related claims/services |
| Approved prices and tax treatment | 90-minute discrepancy unresolved | Booking/sales |
| Payment methods, timing, deposit | Unconfirmed | Booking/sales |
| Cancellation, lateness, rescheduling, no-show consequences | Unconfirmed | Booking/sales |
| Bono validity start, extensions, sharing/gifting, duration mixing, unused-credit/refund rules | Only 3/6-month lengths confirmed | Bono sales |
| Email/pass provider, supported wallets, update mechanism and measured delay | In development | Capability promises |
| Processor contracts, transfers, retention and rights process | Unverified | Relevant data collection |
| Access details, walking time, hands-on versus appointment time | Unverified | Related copy |
| Review provenance and portrait permissions | Unverified | Social proof |

## 3. Booking-first information architecture and copy

Use existing routes where practical. Main navigation: About / Prices / Bonos plus a prominent booking action. Rename “Member Card” / “Tarjeta de miembro” to “Digital bonos” / “Bonos digitales”. Keep `/member-card` as the substantive canonical bono page initially; only rename its URL with permanent redirects and updated internal links. Do not introduce duplicate competing package pages.

### Homepage order

1. Concrete offer and direct availability action.
2. Brief trust/practical reassurance with a real Stephen portrait or real studio photograph.
3. Duration choices, with 90 minutes recommended.
4. What the session is like and verified service options.
5. Genuine, attributable reviews if available.
6. First-visit FAQ and location context.
7. Small secondary bono teaser, followed by the final individual-booking CTA.

Avoid popups, countdowns, fake scarcity and unsupported “most popular” claims. Use “Recommended” because it reflects the owner's recommendation, not sales data.

### Hero copy for the booking-ready version

| Element | English | Español |
|---|---|---|
| Eyebrow | Private massage studio · Valencia | Estudio privado de masajes · Valencia |
| H1 | A little more time for you. | Un poco más de tiempo para ti. |
| Supporting line | A personalised massage with Stephen, in a quiet home studio near the Central Market. | Un masaje personalizado con Stephen, en un tranquilo estudio en casa cerca del Mercado Central. |
| Featured offer | 90 minutes · {approved price} | 90 minutos · {precio aprobado} |
| Primary CTA | Find a 90-minute appointment | Ver horarios de 90 minutos |
| Secondary text link | Explore session lengths | Ver todas las duraciones |

Use the location description only after confirming it matches the real studio. Put the service and city in accessible text above the fold; do not rely on an atmospheric image alone. Link the primary CTA to `/book?duration=90` or the repository's equivalent. Preserve selection on navigation, refresh and fallback; do not imply the calendar is preselected if the actual provider cannot do so.

On mobile, use one unobtrusive sticky booking button after the hero CTA leaves view. Respect safe areas; do not cover the consent banner, focused input, footer links or calendar actions. Remove redundant sticky controls on the booking page. Make the price readable without tiny fine print. If not business/booking ready, substitute the prelaunch state consistently.

### Duration choice

90-minute card: stronger outline or existing primary accent, “Recommended / Recomendado”, full approved price and one CTA. Suggested description: EN “Time for a full-body session and extra attention where you want it.” ES “Tiempo para un masaje de cuerpo completo y más atención donde la necesites.” Owner must verify this describes the actual session.

60 minutes: “A shorter full-body session / Una sesión de cuerpo completo más breve.” 30 minutes, if retained: “Focused time for one area / Una sesión centrada en una zona.” 120 minutes: “An unhurried, extended session / Una sesión más larga, sin prisas.” Do not equate duration with mandatory deep pressure or promise every body area can always be covered.

Put confirmed payment timing/methods, final tax-inclusive pricing and cancellation summary next to the choice and again before confirmation. Format with `Intl.NumberFormat` for EN/ES; Spanish examples: `65 €`, `292,50 €`. No payment-provider logo until the method is actually accepted.

### Trust, scope and first visit

- Introduce Stephen using a real approved portrait and verifiable training details. Until verified use “Stephen · your masseur” / “Stephen · masajista”; omit certification seals.
- Explain personalisation through agreed pressure, areas of focus, and preferences. Keep EN/FR/ES language support in its own block if verified; fix the duplicated language paragraph.
- Describe private changing, professional draping, the ability to request changes or stop, and arrival procedure only as actual practices. Confirm floor, lift, steps and access limitations. Do not claim wheelchair accessibility without evidence.
- Clarify whether booked time includes consultation/changing or is hands-on time. Avoid silently promising extra time.
- Explain relaxation and firmer massage in plain experiential language. Specialised pregnancy/lymphatic offerings require verified training, scope and suitability process before being selectable. Keep unverified offers unpublished in a draft, not merely renamed while still promising the same medical intervention.
- Keep mobile/outcall massage out of the main current offer until confirmed available. A “coming soon” block must not contain an active booking CTA.
- Remove unsupported audience percentages. **Do not remove, replace, hide, crop out, or otherwise alter the existing testimonial pictures. They are an intentional part of the current Pluma design and must remain publicly visible alongside their respective testimonials.** Preserve their existing source files and testimonial-to-picture associations. Cursor may improve responsive sizing, loading, accessible alt text, and layout without changing the people shown or separating a picture from its review. Verify review provenance and portrait permissions as an owner follow-up; an unverified permission status is **not** authorisation to remove the pictures. If a genuine legal or technical blocker is discovered, leave the current pictures unchanged, flag it for human review, and do not decide unilaterally. Do not add generated customer faces, invented ratings or therapeutic outcome claims.
- Use consistent “masseur / masajista”; where verified use “masajista certificado”, not “certificada”. Brand wordmark remains lowercase `pluma`.

## 4. Digital bono page and visual implementation

The three supplied aqua, sand and tree images are **design choices for the same digital product**, not different benefits, tiers or physical cards. Use the exact artwork and original feather asset from the repository. Do not redraw, recolour or distort the feather. The RTF attachment is a container for SVG text, not an image file: prefer the clean original SVG already in the repository, or extract and validate the embedded SVG without changing its path geometry.

Use a native accessible layout, not a screenshot of a page. Review references are in `pluma-visual-review/`; they are proposed compositions, not approved production UI or actual Apple/Google pass screenshots. Their sample balance is illustrative.

### Page structure

1. Heading “Your massages, on your phone.” / “Tus masajes, en tu móvil.”
2. Subhead “A digital bono, delivered by email.” / “Un bono digital que recibirás por email.” For prelaunch use future/coming-soon language immediately adjacent.
3. Simple three-step explanation below.
4. Package selection: duration (60/90 if catalogue confirmed), sessions (5/10), total, unit price, saving and validity.
5. Small design selector: Aqua / Sand / Tree. Explain “Same bono. Your choice of design.” / “El mismo bono. Elige tu diseño.” Persist variant through checkout and into issuance.
6. Purchase summary, material terms and correct state-specific CTA.
7. Return path: “Prefer one session? Book a massage.” / “¿Prefieres una sesión suelta? Reserva un masaje.”

Bonos must never be the default upsell that blocks individual booking. On the homepage show a compact teaser rather than the entire selector.

### Three steps, with balance included in step three

| Step | English launch copy | Español de lanzamiento | Icon |
|---|---|---|---|
| 1 | Choose your bono. Select your sessions and card design, then pay online. | Elige tu bono. Selecciona las sesiones y el diseño, y paga online. | Shopping bag |
| 2 | Check your email. Your digital card and instructions arrive by email. | Revisa tu email. Recibirás tu tarjeta digital y las instrucciones. | Envelope |
| 3 | Add it to your phone. Save it to your compatible wallet and see your remaining sessions. | Añádelo a tu móvil. Guárdalo en tu wallet compatible y consulta las sesiones que te quedan. | Phone with small check |

Below step three, after actual update behaviour is proven: “Your remaining sessions update after each recorded visit.” / “Tus sesiones restantes se actualizan después de registrar cada visita.” Use **“remaining sessions / sesiones restantes”**, not a cash account balance for a session product. Do not promise instantaneous or real-time wallet display until latency, connectivity and pass refresh behaviour are verified. A server ledger updating immediately does not prove an offline wallet is current.

Suggested compact prelaunch message: EN “Digital bonos are coming soon: choose a design, receive your card by email and keep it on your phone. Online purchase is not available yet.” ES “Próximamente: elige un diseño, recibe tu bono por email y llévalo en el móvil. La compra online aún no está disponible.” Present planned wallet/update functionality as planned, not a current benefit. CTA can be a verified enquiry email (“Ask about bonos / Consulta sobre los bonos”), not “Buy” and not a notification form unless its delivery and privacy handling exist.

### Visual rules and accessibility

- Place the existing art within a clearly labelled generic phone/pass preview to explain digital delivery. Keep art intact with proportional scaling; do not make physical-card thickness/shipping the hero visual.
- Use original Parkinsans Light for display if confirmed by repository assets. Preserve the established body font, improving weight/contrast for small UI text. References use a local fallback font; they do not authorise a typography change.
- Ink `#092707`; use existing ivory/surface and accent tokens, not a fresh palette sampled from a screenshot. Retain coherent dark mode. Avoid orange text on low-contrast light backgrounds.
- Included icons are original 24×24 SVG line icons, stroke 1.5, rounded joins, stroke-only, visually compatible with the established minimal direction. They are not claimed to be official Iconoir assets. Use the repository's matching licensed Iconoir icons if available; retain notices.
- Select designs with a labelled native radio group and named thumbnail buttons. Keyboard arrows and selected announcements must work. A tick/outline and name express selection independently of colour. Do not make customers swipe through an auto-rotating carousel to compare three choices.
- Icons accompanying visible text are decorative (`aria-hidden`). Informative standalone previews need concise alt text, e.g. “Illustration of a digital bono on a phone; sample remaining-session count”.
- At narrow widths, put text before the preview and stack the three steps vertically. Avoid hover-only information.

### Scope of forthcoming integrations

Reuse the existing in-progress system. Do not invent a payment provider, rebuild a wallet platform or claim a feature flag is a completed integration. Create clean disabled integration boundaries and document absent credentials/services. No production payment collection until readiness is proven.

When connecting the real system: verify payment server-side before issuance; use provider event IDs for idempotency; preserve design, purchased duration/count, paid amount and approved expiry terms in the order; handle delayed/duplicate payment notifications and email retries without creating duplicate credit. Wallet QR/barcodes must not expose personal/health data or let an unauthenticated person decrement credits. A scan alone is not authorisation for redemption. Use an authoritative server ledger, authenticated staff redemption and audit history, with safe reversal/refund handling. Prove that users cannot read another person's pass/account by changing an identifier. These are integration acceptance criteria; report externally owned gaps rather than implementing speculative infrastructure.

Display the 3/6-month validity lengths but keep the start trigger explicit in staging: `{VALIDITY_START_RULE}`. Do not automatically equate months with 90/180 days. Once approved, compute calendar-month expiry in Europe/Madrid with a documented end-of-month rule and test boundary dates. State and show actual expiry date in confirmation/pass. Support a non-wallet way to view the bono if the purchased promise requires it; don't invent this as already working.

## 5. Booking page — repository work only

- Read the installed embed integration and current official provider documentation before changing API parameters. Do not guess locale or duration options.
- Keep the selected duration, approved total, Valencia-local time explanation, payment information and Pluma policy links outside the iframe and visible before personal data entry.
- Pass selected website locale to the embed where supported; safely update/remount a previously loaded widget. Avoid duplicate script loading, duplicate listeners and hidden stale iframe instances.
- Initialise with 90 minutes from the primary CTA if supported. If provider-controlled duration UI is inaccessible or cannot preselect reliably, use owner-created separate event links and a native website radio selector, with an explicit verified mapping. Never manipulate cross-origin iframe DOM.
- Provide reserved layout space, a readable loading state, an actionable timeout and a direct verified calendar link plus nearby email fallback. Do not assert booking success when the embed loads or the user opens the contact form.
- Set a meaningful iframe title, e.g. “Book an in-person massage with Stephen”. Respect the existing architecture's supported attributes.
- In-person times must clearly reference **Europe/Madrid**. Actual account settings and confirmation messages remain manual tasks. Do not hard-code UTC+1/+2.
- Catalogue unbookable services explicitly; resolve 120 minutes via owner event creation or a working, accurately labelled enquiry route. Do not redirect a 120-minute CTA to a 90-minute event silently.

## 6. Legal, privacy and consumer implementation

Read `pluma-legal-launch-checks.md`. It contains dated official sources, applicability distinctions and owner checks. This is a requirements brief, not a certification of compliance. Website changes cannot establish registration, qualifications or premises permission.

Implement complete, linked Spanish legal/privacy/cookie and booking/bono terms pages, with matching English versions for the English sales flow. Reuse current legal routes; separate legal notice, privacy, cookies and commercial terms by purpose. Avoid a generic copied policy that names services not used.

Create a processing inventory from actual code/network and confirmed operations: field, purpose, legal basis, processor/recipient, transfer mechanism, retention/criteria and deletion owner. Include Cal.com, hosting, email, payment and wallet services only when used. Make the general booking comment field optional and logistics-only; prefer removing it if unnecessary. Example ES helper: “Solo preferencias prácticas; no incluyas datos médicos.” Establish a separate protected intake process before collecting health details. Marketing opt-in, if implemented, must be optional and separate from operational booking information.

Place a short Pluma privacy notice with a link beside its forms and immediately above the calendar. A provider policy link alone does not describe Pluma's processing. Do not require “consent to the privacy policy” as a substitute for choosing and explaining the correct processing basis. Owner handles equivalent provider-form fields manually.

Inventory cookies, local storage and third-party requests before and after interaction. Load no nonessential tracking until a valid choice where required. If a consent UI is necessary, use balanced accept/reject actions, granular settings and easy withdrawal; preserve booking when analytics is refused. If only exempt necessary storage is used, document that instead of adding a decorative banner. Prefer self-hosted licensed fonts. Do not assume a provider or “cookieless” analytics is automatically exempt.

## 7. Routing, performance, metadata and security

### HTTP and SEO

- Fix known route delivery at the host/server, not only in the client router. Existing routes must return 200 on direct GET and reload; unknown routes must return a real 404. A blanket fallback making every URL 200 is not acceptance.
- Prefer the existing framework's prerender/SSR facilities for the homepage, pricing, about, bonos and legal pages. Do not rebuild the app solely to adopt another framework.
- Give each indexable page a unique service/city-aware title and description, canonical, Open Graph and social preview. Do not stuff keywords or publish fabricated review/schema data.
- Prefer stable `/es/...` and `/en/...` paths if feasible within the current router, with self-canonicals and reciprocal hreflang only for actual translated pages. Preserve old public links through explicit redirects; set a documented default language. If deferred, retain a coherent current canonical strategy and report language-indexing limits; never emit two hreflang variants pointing at the same language-switched URL.
- Return genuine XML `/sitemap.xml` and text `/robots.txt`. Sitemap lists only canonical indexable 200 pages; exclude checkout, account/pass links, staging and private data. Staging must be access-controlled/noindex; robots alone is not privacy protection.
- Use accurate LocalBusiness/service structured data only when business facts are complete. Do not use MedicalClinic/Physician types for an unverified non-healthcare service. Do not expose private arrival details in metadata or schema accidentally. Required legal address disclosure still needs resolution separately.

### Performance and motion

- Start with a lightweight poster for the audited 13.64 MB decorative video. Prefer a real existing studio/practitioner photograph for trust where suitable; keep nature imagery as atmosphere. Do not generate a fictional studio or substitute person and present them as real.
- Proposed budget: mobile hero poster ≤200 KB where visual quality permits; no video download on initial mobile load, reduced motion or data-saving mode; defer desktop video until useful content is available. These are implementation targets, not measured results.
- Use responsive WebP/AVIF with fallbacks, explicit dimensions, appropriate crop and lazy loading below the fold. Do not lazy-load the principal LCP image. Keep meaningful copy and CTA usable before media loads.
- Prefer static reviews. If motion remains, provide pause/stop controls usable by keyboard and touch; pause on focus, honour reduced motion and hide duplicate decorative content from assistive technology.
- Verify contrast, focus, labels and reflow against WCAG 2.2 AA as a quality target. Preserve skip navigation. Aim for 44px interactive targets, with at least applicable WCAG target-size requirements. This brief does not determine statutory accessibility-law applicability for the business.

### Security

Preserve HTTPS/HSTS. Add `X-Content-Type-Options: nosniff`, an appropriate Referrer-Policy and least-privilege Permissions-Policy. Design CSP against the actual script/frame/font/connect/image dependencies; start report-only, then enforce after testing. Use a considered `frame-ancestors` policy (and compatible X-Frame-Options if appropriate); this controls who embeds Pluma, not whether Pluma may embed Cal.com. Keep payment/booking functional. Do not treat wildcard CORS on public static assets as a discovered leak. Never place provider secrets in frontend bundles or analytics.

## 8. Measurement and acceptance

Implement the smallest useful measurement plan permitted by the actual privacy setup. No invasive session replay.

| Event | Trigger | Safe properties |
|---|---|---|
| `booking_cta_clicked` | Individual booking CTA activated | placement, language, selected duration |
| `booking_widget_loaded` | Verified embed-ready signal | language, duration |
| `booking_widget_failed` | Genuine error/timeout | coarse error category |
| `booking_confirmed` | Verified provider success event/server evidence | duration, language if reliably linked |
| `bono_checkout_started` | Actual checkout initiated after launch | package ID, design |
| `bono_purchase_confirmed` | Server-verified payment | package ID, design |

No names, email, phone, notes, health information, booking tokens or full sensitive URLs in analytics. Deduplicate confirmations using a secure internal mechanism. Do not infer cross-origin steps without a supported event. If confirmations cannot be linked safely, report aggregate counts separately; do not divide incompatible datasets and call the result conversion.

Primary measure: unique confirmed individual bookings / eligible visits under a defined, consistent measurement method. Secondary: 90-minute booking share, calendar errors, booking entry and attended appointments if operationally recorded. Segment only when sample size permits. Establish a baseline before claiming uplift; the audit did not measure conversion rates. Report consent/sample limitations. No guaranteed percentage improvement.

### Required checks

1. EN/ES, desktop and 320/360/390/768px widths: price, recommended duration, CTA selection continuity and layout. Check keyboard navigation, visible focus, text zoom/reflow, reduced motion and both themes.
2. Known direct routes return 200; random nonexistent route 404; redirects, canonical/hreflang and sitemap agree.
3. Test happy path and blocked/slow provider, refused nonessential cookies, locale switching after embed load and Europe/Madrid time display. Manual-provider dependencies may remain pending but must be named.
4. Validate catalogue arithmetic using integer cents, expiry month boundaries once start rule is approved, and design selection persistence. Do not charge a real card or create a real appointment for QA.
5. On an authorised sandbox/test event, verify confirmation, price/duration, arrival details, delivery, cancellation and rescheduling. Future bono integration also needs duplicate webhook, failed payment, email retry, supported wallet refresh, refund/reversal and unauthorised-account access checks before activation.
6. Scan public output for unresolved placeholders and unsupported claims. Test false readiness states: no functioning purchase button, wallet promise or fake balance appears as live.
7. Run three cold-cache mobile performance measurements before/after with the same conditions. Report measured LCP/CLS and transfer bytes; report INP only if actually measured with interactions/field data, not invented from Lighthouse. Target good Core Web Vitals where field evidence exists: LCP ≤2.5s, INP ≤200ms, CLS ≤0.1. Identify unavailable real-device/field tests.

## 9. Audit traceability and delivery

| Audit IDs | Implementation home | Ownership |
|---|---|---|
| PL-01, 03, 11, 26 | Catalogue, duration availability, terms, payment disclosure | Cursor + owner/Cal.com |
| PL-02, 22, 23 | HTTP routes, metadata, canonical/languages, sitemap | Cursor/host configuration |
| PL-04, 05, 06 | Legal fields, processing inventory and notices | Cursor + owner legal/operations |
| PL-07, 08 | Locale, in-person timezone and confirmation | Cursor embed + manual Cal.com |
| PL-09 | Unified digital bono page | Cursor |
| PL-10 | Clear approved cancellation rules | Owner policy; Cursor publication |
| PL-12, 13, 14 | Service guidance, verified training, outcall availability | Cursor + owner evidence |
| PL-15, 16, 17 | Hero, personalisation, terminology and localisation | Cursor |
| PL-18 | Review provenance and supported claims | Owner evidence + Cursor |
| PL-19, 25 | Media loading and motion controls | Cursor |
| PL-20, 24 | Embed reliability, fallback, native accessible controls | Cursor + provider/manual dependencies |
| PL-21 | Response security headers | Cursor/host configuration |
| PL-27 | Accurate first-visit and access information | Owner facts + Cursor |

Deliver: implementation commits; screenshots of homepage, pricing, booking fallback and bono page in EN/ES on mobile/desktop; `OWNER-INPUTS.md`; a factual test report; and a PL-01–PL-27 status matrix using fixed / already resolved / waiting on owner / provider limitation / not reproduced. The before/after homepage screenshots must show that the existing testimonial pictures remain present and correctly associated with their testimonials. Distinguish proposed copy from verified operational claims. Include the exact Cal.com handoff values and open event links, without modifying the owner's account. Complete all independent code/content work even if some launch facts remain unresolved.

### Technical references

- [Google Search: HTTP and network errors](https://developers.google.com/search/docs/crawling-indexing/http-network-errors): distinguish real HTTP responses from client-side visual rendering.
- [Google web.dev: Web Vitals](https://web.dev/articles/vitals): LCP, INP and CLS definitions and good-experience thresholds; field and lab evidence differ.
- [W3C: Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html): evaluate automatically moving/updating content rather than relying on CSS presence.

Legal/operational sources and applicability limits are in `pluma-legal-launch-checks.md`. The attached audit remains the source of historical Pluma observations.
