# Pluma launch corrections: master coding-agent brief

Prepared 22 September 2026. Implementation handoff, not a record of completed fixes.

## Read this first

Patch the actual Pluma website repository using the work packages below. Preserve the current hero's creative direction: warm ivory, peach/orange branding, real massage photography, video contracting into the feather, then the photograph and brand reveal. Make that sequence dependable on a first visit. Carry its visual language through the site and repair the verified usability defects.

This brief consolidates the live audit, the comparison with September 17 findings F01–F24, and the owner's subsequent report of intermittent hero failures. It is the implementation handoff; the earlier reports remain evidence snapshots.

**Implement deterministic code fixes now. Put unresolved business facts, legal wording and provider-account decisions in the companion [human-review report](HUMAN_REVIEW_REQUIRED.md). Do not invent answers or silently mark those items resolved.**

The original audit was prepared in a reference workspace, not a verified checkout of production; its `sources/` files were read-only. A saved `outputs/pluma-responsive-hero/` prototype informed the hypotheses below but was not proven identical to deployment and is not included in this portable handoff. Work in the actual website repository and find the real implementation before editing. Do not patch only a prototype or generated bundle and call the website fixed.

### Evidence and boundaries

- **Live-confirmed:** keyboard focus escapes the booking overlay; booking language mismatch; persistent loading label; homepage phone overflow; session-card order mismatch; mixed visual styles; orange-button contrast; hero language out of sync; unfinished/conflicting published information.
- **Owner-reported, not independently reproduced under cold-load tracing:** video/mask/reveal glitches, especially first visit, with intermittent instant reveal.
- **Local-code-confirmed risks, not confirmed production causes:** animation starts before video readiness; four-second boot guard skips; resize/scroll/pointer/key handlers finish the intro; random video selection changes load conditions.
- **Not established:** current media byte totals, performance scores, security headers, no-script fallback quality, confirmation delivery or behaviour in every timezone.

Keep existing verified prices and services: 60 minutes €45, 90 minutes €65, 120 minutes €85. Keep voucher totals, real imagery, third-floor/no-lift information, comfort/consent copy, gallery keyboard support and working testimonial pause. Do not change transactions, publish policy promises, send messages or make live test bookings as part of this brief. Deliver the code patch, preview and verification record; deployment and real transaction tests are separate actions.

## Execution order

1. Identify the actual hero, navigation, theme, translations, booking adapter and route components. Read repository instructions and available test/build commands. Record the current commit and baseline behaviour.
2. Implement **P1 hero reliability** before visual changes so cause and effect remain clear.
3. Implement **P2 booking behaviour**, **P3 responsive layout**, then **P4 visual consistency**.
4. Implement **P5 language/copy**, **P6 motion/loading**, and the bounded checks in **P7**.
5. Run acceptance checks, reconcile all historical IDs and produce the final handoff. Continue independent coding when a human item is unanswered; mark its dependent task blocked rather than guessing.

## P1. Stabilise the hero animation — before launch

**New finding N01.** Inspect production equivalents of `boot.js`, `hero.js`, `hero.css` and the component wrapper. In the saved package, review `run`, `startIntro`, `syncPlayback`, `finish`, resize handling, `pageshow` and component cleanup. Reproduce before attributing the production bug to any one of these.

### Required behaviour

Use explicit states: **preparing → intro → complete**, with a controlled fallback and teardown. One controller owns the sequence and its callbacks. Do not have CSS, a boot timer and a component effect independently reveal the composition.

1. **First paint:** reserve the final hero geometry. Show a matching poster immediately, with working navigation/booking. Avoid a flash of the complete composition before hiding it. Essential controls must not depend on successful video playback or remain hidden behind a startup timer.
2. **Preparation:** select one video once per homepage mount, using its matching poster and correct mobile/desktop source. Start fetching only that clip. Decode the photograph, wordmark and image-based masks needed for the transition. Inline SVG geometry may be prepared synchronously. Wait for the first presented video frame where supported, using `requestVideoFrameCallback`; use a bounded ready-state/playing fallback otherwise. A `play()` call alone is not proof that a frame is visible.
3. **Start:** measure once after required assets are ready, then start the animation clock. Preserve the deployed approved timing/easing if present. If none is configured, use the reference timings: 300 ms hold, 2500 ms contraction, 700 ms photo reveal; brand and navigation decoration start 250 ms after the contraction; photo-edge morph follows the brand. Keep controls usable even if their decoration is animated.
4. **One timeline:** synchronise mask, photo, wordmark and eyebrow to one elapsed-time source. Do not animate layout dimensions. Cache geometry; avoid layout reads inside the animation frame loop. Do not repeatedly rebuild animations or toggle clip strategies while running.
5. **Readiness deadline:** allow up to 1500 ms after controller initialisation for video readiness. If it misses the deadline but the poster/assets are ready, run the same contraction/reveal with the still poster. If essential visual assets also fail or are delayed, show the usable final fallback; do not hold a blank screen. A late video must not restart or jump the sequence. Keep a separate script-failure watchdog that releases hidden content; do not simply extend the old four-second timer.
6. **Layout changes:** harmless resize/layout events must not call `finish()`. Remeasure on the next animation frame and preserve current progress. A real orientation change may smoothly settle to the final state over about 200 ms if preserving the mask is unsafe. Do not swap video sources halfway through the transition.
7. **Interaction:** do not finish on every pointer-down or unrelated key. Let explicit navigation work immediately. If the visitor deliberately scrolls away, settle the decorative sequence without blocking scrolling or leaving layers on screen. Incidental layout/scroll-restoration events must not trigger an unpredictable partial reveal.
8. **Lifecycle:** ordinary rerenders and language changes update the existing controller rather than replaying it. Cancel timers, listeners, observers, frame callbacks and playback attempts on teardown. Use a generation/cancellation token so an old media promise cannot change a new mount. Back/forward restoration shows the final composition; an ordinary fresh homepage load may run the intro. A restored position below the hero does not replay it.
9. **Reduced motion/data saving:** show the final still composition immediately, without downloading the intro video. If a user requests motion pause, retain that choice during the page visit.

Retain the existing scene collection if it is intentional; do not remove creative variants just to hide an unreliable file. Add a development-only way to select each scene deterministically for testing. Never download all scenes up front. Verify every candidate before allowing random selection in production.

### Rendering/performance work

First fix sequencing, then profile video decoding, mask painting and competing work. Prefer transform/opacity where the effect permits. If tracing identifies expensive mask updates, simplify the animated geometry or composite a stable mask; preserve the silhouette and visual result. Do not blindly replace it with canvas or add permanent GPU-promoted layers. Limit `will-change` to active animation and clear it afterwards.

Defer below-the-fold video and booking-provider initialisation during the intro. Verify appropriate mobile encodings, fast-start media delivery and matching posters. Do not quote the old 24.25 MB measurement as current.

### P1 acceptance

- For every selectable scene: at least five uncached loads and five cached loads at desktop and phone width. No black flash, unmasked flash, missing photograph, instant unintended completion or late replay.
- Repeat with constrained network/CPU, blocked video, failed poster, denied autoplay, resize, rotation, tab hide/show, language changes, route leave/return and reduced motion.
- Record the scene, readiness outcome and reason for early completion in development logs only. Logs must contain no visitor data.
- Capture before/after traces and a short recording for representative cold loads. In a controlled foreground test, target animation frames within the display's frame budget and no hero-attributable tasks over 50 ms; investigate repeated dropped-frame clusters rather than claiming a universal frame-rate guarantee.
- Treat the poster transition as a valid designed fallback. A fallback must not be falsely reported as successful video playback.

## P2. Repair booking behaviour — before launch

**F03, F04, F05, F06, F07, F14; human dependencies H03–H05, H09.**

- Centralise navigation, hero, studio, duration cards, pricing, closing invitation, footer and `/book` on the same booking adapter. Preserve intended duration, price and selected language. Do not create or rename remote Cal events blindly.
- Own one accessible modal in the application, using the repository's proven dialog component and a supported inline Cal embed. Avoid stacking an application dialog over the provider's own modal. Provide a visible close button and meaningful dialog/iframe names: “Book a massage with Stephen” / “Reserva un masaje con Stephen”. Make background content inert; handle focus on open, Tab/Shift+Tab, close and focus restoration. Verify keyboard traversal into and out of the cross-origin iframe, not just between host controls. If the provider cannot support an accessible modal, route every affected action to the accessible standalone `/book` flow and record the change.
- Use the provider's currently supported ready/error events and correct instance/namespace. Maintain one truthful loading/ready/error state. Ready removes the loading label. After 10 seconds without readiness, show retry, a verified direct booking link and the existing contact route. A later valid ready event may replace that error with the working calendar. Destroy the old instance when changing event type; no duplicate embeds.
- Pass the selected EN/ES locale through supported provider configuration. Custom descriptions/questions may need provider-account work; put that work under H09 if it cannot be applied from the repository. Do not manipulate cross-origin DOM or invent unsupported parameters.
- Preserve the site's stated Europe/Madrid appointment-time policy. Test browser contexts in Madrid, London and New York, including a daylight-saving boundary. Verify what the provider actually displays. If supported configuration cannot enforce the existing promise, report the limitation under H09; do not publish misleading explanatory text. Confirmation emails/invites remain an owner-authorised test.
- Show existing practical-note guidance in every host booking surface, in both languages. Proposed field-adjacent text: “Please use this field for practical preferences only. Do not include medical or health information.” / “Utiliza este campo solo para preferencias prácticas. No incluyas información médica ni de salud.” Put the same instruction beside the provider field where supported. Host-only guidance is a partial fix if the remote field still lacks it.
- Load Cal on booking intent, not automatically on policy pages. `/book` is already an explicit booking intent. Inspect actual requests/storage before claiming the cookie-policy discrepancy resolved; script deferral is not a legal determination about consent.
- Do not decide phone-number necessity, legal basis, retention or cancellation policy. Implement approved answers from the human report when supplied.

**Acceptance:** all listed entry points open the correct flow; 60/90/120 show €45/€65/€85; keyboard works through the final form; language and time are clear; loading clears; delayed/blocked provider yields a usable fallback. Submit no production form.

## P3. Fix responsive layout and choice clarity — before launch

**F09 regression protection, F18, F19; new homepage overflow.**

- Fix the studio section's intrinsic-width constraint. Use shrinkable grid/flex children (`min-width: 0` where appropriate), wrapping feature text and fluid media. At narrow widths use one feature-list column if two cannot fit. Do not hide the symptom with global horizontal clipping.
- Below 768px, stack homepage duration cards in document order 60, 90, 120. Remove visual reordering. Keep the 90-minute recommendation. No horizontal swipe is required to discover a session.
- Add visible “Book 60 minutes” / “Reservar 60 minutos” actions, and equivalent labels for 90/120, to pricing cards. Use one coherent interactive element per action; no nested buttons or links.
- Preserve voucher mobile cards and the already corrected pricing/voucher page widths. Internal data-table scrolling is acceptable where genuinely needed and must have visible cues and keyboard access.
- Reserve space for fixed navigation at the end of content, account for safe areas, and provide scroll clearance for focused elements. Keep menu links and close controls reachable at short viewport heights. Opening/closing restores focus predictably.

**Acceptance:** check 320, 390, 430, 768, 992 and 1366px widths, 844 × 390 landscape, 200% text and 400% zoom/reflow. No page-wide overflow, clipped required content or unreachable actions. Reading/focus/visual session order agrees. Recheck long Spanish labels.

## P4. Align the design with the current hero — launch styling pass

**F08; new theme, typography and navigation consistency findings.**

Use a single warm light theme for this launch. Prevent stored/system dark preference from producing dark-green lower sections under the ivory hero. Do not delete unrelated browser preferences. Defer dark-theme UI, and report any privacy-copy statement about stored theme preferences for H05 review.

Use these shared starting tokens, then measure all actual rendered combinations:

| Role | Value / rule |
| --- | --- |
| Page / solid navigation | `#FBFAF5` |
| Card surface | `#F4EFE7` |
| Strong text / CTA text | `#2B2823` |
| Body / secondary text | `#595650` |
| Decorative border | `#D8CEC0`; do not rely on this alone for an essential control boundary |
| Primary CTA | Existing orange gradient `#FF812B` → `#F5AC45`, with `#2B2823` text |
| Focus indicator | `#7A3E1B`, clearly visible outline with offset |
| Typeface | `Arial, Helvetica, sans-serif`, matching current hero/navigation; preserve wordmark artwork |

Remove lime booking buttons and isolated green surfaces. Use one primary button component and a quiet outlined secondary component. Apply to homepage, About, prices, vouchers, reviews, policies and booking host; use supported provider theming for the calendar. Do not stretch the logo or recolour authentic photographs.

Use an opaque ivory navigation/menu surface so page text does not show through. Keep its existing shape and position. Use consistent card padding/corners and readable text sizing: 16px body minimum, about 1.5 line height; policy prose should have comfortable line lengths. Preserve hero composition rather than rebuilding it around unrelated components.

**Acceptance:** normal/hover/focus/pressed text meets at least 4.5:1 at normal sizes; meaningful control boundaries and focus cues remain visible. Test gradients, provider controls and long translations. Confirm no initial dark-theme flash and no new layout shift from font changes.

## P5. Synchronise language and implement safe copy fixes

**F06, F21; new hero-language mismatch.**

- One locale source controls body, navigation, hero labels/alternative text, document language, metadata and booking configuration. Use the hero controller's language-update method instead of tearing down its animation. Match initial server/build markup to the initial locale; no mixed-language first paint.
- Do not put a second heading over the logo. Add a short visible service line to the hero, with a layout reserved before animation. Use the implementation copy below; prices reflect the audited offer and must still match the repository/provider.

| Placement | English | Spanish |
| --- | --- | --- |
| Hero service line | Personalized massage with Stephen in Valencia’s Old Town. | Masaje personalizado con Stephen en el casco antiguo de Valencia. |
| Hero session line | 60, 90 or 120 minutes · from €45 | 60, 90 o 120 minutos · desde 45 € |
| Prices heading | Single-session pricing | Precios por sesión |
| Total-price note | Prices include tax. The amount shown is the total you pay. | Los precios incluyen impuestos. El importe mostrado es el total que pagas. |
| Closing line | Don’t overthink it. | No le des tantas vueltas. |
| Practitioner sentence | I adapt the pressure, pace and techniques—and remember what worked next time. | Adapto la presión, el ritmo y las técnicas, y tengo en cuenta lo que funcionó en tus sesiones anteriores. |
| Voucher nav label | Vouchers | Bonos |

Remove redundant total-price statements, not useful price/terms information. Standardise English on the site's existing American “personalized” spelling. For the provider introduction, remove duplicated “my” and use “a five-minute walk from the Central Market”; if provider copy is not repository-managed, list it under H09.

Do not translate unfinished legal terms into supposedly final policy, invent qualifications, alter testimonial quotations or claim source verification. Those are human items. Safe infrastructure for both languages can be completed now.

**Acceptance:** switch EN→ES→EN before, during and after the intro; navigate away/back; reload each locale. Hero, main content and accessible names agree, and switching does not restart the animation.

## P6. Control nonessential motion and competing loads

**F10, F11 verification.**

- Keep the hero animation with its P1 safeguards. For immediate launch, use the existing still posters for the off-screen studio and closing background videos instead of automatic playback. Keep their layout and useful alt/context text. Do not create new imagery.
- Preserve testimonial pause/navigation. Respect reduced motion by starting testimonials without automatic advancement. Any retained looping decorative hero video needs a keyboard/touch-operable Pause motion / Pausar movimiento control; manual pause must not be undone by observers.
- Do not load dormant below-fold videos or all random hero candidates. Defer Cal as in P2; avoid unnecessary font downloads after P4's system-font change.
- Measure current cold-load transfer and browser performance after fixes. Use current evidence; do not claim that previously measured file sizes still apply. Record lab conditions and distinguish lab results from real-user metrics.

## P7. Bounded technical checks and regression protection

**F16, F22, F23, F24.** These items must not expand the patch into a framework migration or hosting redesign.

- Remove duplicate `og:image` declarations through one metadata owner. Keep the existing dedicated share image, verify it loads and use consistent EN/ES titles/descriptions. Do not add unverified address/qualification structured data.
- Preserve the current noindex state until the human launch decision H08 is resolved. Do not silently expose the site to search as a side effect of cleanup.
- Inspect disabled-JavaScript and failed-bundle behaviour. If basic information disappears, provide static service/contact content through the existing build setup and a useful no-script fallback. Do not introduce a new rendering framework for this launch.
- Read current response headers only where tooling permits. If hardening is missing, document the host capability and a tested proposal; do not apply a broad CSP that breaks Cal, media or fonts. Hosting/account changes belong under H09.
- Preserve F09's corrected pricing/voucher widths, working routes, correct amounts, accessible gallery, first-visit details and voucher calculations.

## Complete mapping of the previous report

Statuses below are the September 22 audit state, **not post-patch results**. Recheck the actual checkout/deployment before assuming an item still applies.

| Prior ID | Audit state | Coding action / human dependency |
| --- | --- | --- |
| F01 | Still present | H01/H02/H03 decide launch and complete business/booking information. P2 can proceed independently. |
| F02 | Still present | H04 decides phone-field policy; P2 integrates supplied answer. |
| F03 | Not verified; Madrid observed | P2 cross-timezone tests; H09 for provider settings/confirmation checks. |
| F04 | Still present | P2 accessible booking container and iframe name. |
| F05 | Still present | P2 consistent practical-note warning; H04/H09 for field/process changes. |
| F06 | Still present | P2/P5 locale propagation; H09 for remote descriptions/questions. |
| F07 | Still present | P2 correct ready/error lifecycle. |
| F08 | Partly fixed; new CTA also fails | P4 measured contrast across states. |
| F09 | Fixed at sampled widths | P3 regression checks; separately fix new homepage overflow. |
| F10 | Still present | P1/P6 pause/reduced-motion and still lower-page media. |
| F11 | Not verified | P1/P6 current measurement and loading priorities. |
| F12 | Still present | H02 verifies claims; integrate approved copy only. |
| F13 | Still present | H06 chooses inquiry/contact process; align pages after answer. |
| F14 | Still present | P2 defer provider; H05 reviews actual storage/request disclosures. |
| F15 | Still present | H05 supplies retention/controller/processor decisions. |
| F16 | Not verified | P7 inspect; H09 for hosting changes. |
| F17 | Still present; accuracy unresolved | H07 confirms area, entrance and arrival information. |
| F18 | Still present | P3 stack cards in matching order. |
| F19 | Still present | P3 explicit visible booking actions. |
| F20 | Still present | H10 review provenance, permissions and translation treatment. |
| F21 | Partly fixed | P5 editorial corrections; H09 remote copy. |
| F22 | Still present, intentional | Preserve noindex; H08 owns activation decision. |
| F23 | Not verified | P7 inspect and add bounded static fallback if needed. |
| F24 | Partly fixed | P7 deduplicate social metadata; defer unverified schema/cache changes. |

New items: N01 hero reliability → P1; N02 homepage overflow → P3; N03 theme/type/navigation mismatch → P4; N04 hero locale mismatch → P5; N05 Spanish voucher terms missing → H06; N06 first-screen offer clarity → P5.

## Verification and completion handoff

Run the repository's relevant lint/type/build checks. Add focused behavioural tests for the hero lifecycle/readiness/fallback and booking state/focus regressions where supported. Do not add tests that merely repeat CSS values. Use rendered browser tests and recordings for visual claims.

Check EN/ES across the homepage, About, pricing, vouchers, reviews, `/book` and policy routes at the sizes in P3. Exercise every booking entry point, each duration, close/reopen, keyboard traversal, language changes, failed/slow provider and final-form reachability without submission. Restore temporary browser settings after testing.

Produce `PATCH_COMPLETION_REPORT.md` with:

1. Actual repository/commit, changed components and concise reasons.
2. P1–P7 and F01–F24 outcomes: fixed with evidence, partial, still present, not applicable, unverified, or awaiting a named H item.
3. Test conditions, results, screenshots/recordings and any failed/unavailable checks. Separate cold-load tests from cached refreshes.
4. Outstanding Cal/hosting tasks, owner answers needed and files where supplied copy must be integrated.
5. A truthful distinction between “code patch ready” and “public launch ready”. Human items cannot be cleared by a successful build.

Sources: [live audit](reference/PLUMA_LAUNCH_AUDIT.md), [historical comparison](reference/PREVIOUS_REPORT_COMPARISON.md), the owner-supplied September 17 PDF and the saved responsive-hero package. The PDF and prototype are provenance references, not required inputs included in this handoff. Verify provider/browser APIs against current official documentation during implementation; do not treat old integration examples as production configuration.
