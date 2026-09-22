# Pluma patch completion report

Filled 22 September 2026 from branch `audit-pre-launch`. Observed results only.

## Checkout and baseline

- Repository, branch and starting commit: pluma website repo; branch `audit-pre-launch`; baseline `64b6ae08f699e1500776a5225d2dd42e0b8f5573` (`main`)
- Date and agent session: 22 September 2026
- Existing unrelated changes preserved: working tree was clean at branch create
- Framework, package manager and supported commands: React 19 + Vite + TypeScript; `npm run dev` / `npm run build` / `npm test` / `npm run preview`
- Preview URL and how to start it: `npm run dev` → http://localhost:5173
- Baseline reproduced / not reproduced / unavailable: owner-reported intermittent hero instant-reveal not cold-load traced in this session; local code risks (boot skip, finish-on-interaction/resize, start before video readiness) confirmed in source and addressed

## Work packages and source map

| Package | Actual source files | Status | Changes and evidence | Remaining dependency |
|---|---|---|---|---|
| P1 Hero reliability | `src/pluma-hero/hero.js`, `hero.css`, `hero.d.ts`, `public/pluma-hero/boot.js`, `PlumaHero.tsx` | implemented, verification pending | Explicit `preparing → intro → complete`; 1500 ms video readiness with `requestVideoFrameCallback`; poster fallback; no finish on pointer/key/resize; scroll-away settle; bfcache → final; generation token; `?ph-scene=` / dev `localStorage`; boot is script-failure watchdog only | Full cold/cached matrix and recordings still needed |
| P2 Booking | `BookingModal.tsx`, `BookingAction.tsx`, `CalEmbed.tsx`, `Layout.tsx`, `openCalBookingModal.ts`, `CalModalBootstrap.tsx`, `BookingPage.tsx` | implemented, verification pending | App-owned `<dialog>` with inline Cal; locale passed; 10 s ready timeout; practical note; Cal no longer bootstrapped on every route | H03–H05, H09 for provider field copy, timezone display confirmation, confirmation emails |
| P3 Responsive layout | `pluma-studio-overrides.css`, `DurationChoice.tsx`, `FeatureStory.tsx` | implemented, verification pending | Mobile durations stack 60→90→120 (no `order: -1`, no swipe strip); studio `min-width: 0` + single-column feature list; booking CTAs already “Book N minutes” | Manual 320–1366 / zoom recheck |
| P4 Visual consistency | `tokens.css`, `pluma-studio.css`, `hero.css`, `ThemeContext.tsx`, `ThemeToggle.tsx`, `index.html` | implemented, verification pending | Warm ivory tokens; orange gradient CTA with `#2B2823` text; focus `#7A3E1B`; Arial stack; light theme lock (no dark flash); opaque ivory nav | Contrast measurement across all states |
| P5 Language and copy | `hero.js` labels, `translations.ts`, `SiteNav` via hero translations | implemented, verification pending | Hero service/session lines; prices/tax/closing/practitioner/voucher copy; dialog titles EN/ES | H09 remote Cal copy; H02/H06/H07 unfinished legal/claim items |
| P6 Motion and loading | `FeatureStory.tsx`, `BookingCTA.tsx`, hero controller | implemented, verification pending | Below-fold studio/closing stills instead of autoplay; hero reduced-motion/save-data skip; testimonials already start paused under reduced motion | Lab transfer measurement not run here |
| P7 Bounded technical checks | `index.html`, `PageMeta.tsx`, `vite.config.ts`, `site.ts` | implemented, verification pending | Duplicate static `og:image` removed; build plugin uses dedicated share image and strips shell duplicates; `noindex` preserved; noscript service/contact fallback added | H08 indexing; H09 headers/CSP; security headers not probed |

## Historical and new findings

| ID | Status | Evidence or reason | Remaining work / Hxx |
|---|---|---|---|
| F01 | still present | Business/booking completeness is owner-owned | H01/H02/H03 |
| F02 | still present | Phone-field policy not decided | H04 |
| F03 | not verified | Locale/Madrid policy preserved in host copy; cross-TZ provider display not retested | H09 |
| F04 | partly fixed | App dialog + iframe title; cross-origin iframe keyboard not fully retested | Manual keyboard pass |
| F05 | partly fixed | Host practical-note on dialog and `/book`; remote field still H09 | H04/H09 |
| F06 | partly fixed | Locale passed to Cal config; remote descriptions H09 | H09 |
| F07 | partly fixed | Ready clears loading; 10 s fallback with retry + direct link; late ready can remount via retry | Live provider pass |
| F08 | partly fixed | CTA uses dark text on orange gradient; full state contrast not measured | Visual QA |
| F09 | fixed (regression protected) | Prior voucher/pricing width fixes retained | Recheck sampled widths |
| F10 | partly fixed | Below-fold stills; hero reduced-motion; looping hero video still needs dedicated pause control if retained after complete | Optional pause control |
| F11 | not verified | No new transfer measurement claimed | Lab tools |
| F12 | still present | Claims verification is human | H02 |
| F13 | still present | Inquiry/contact process | H06 |
| F14 | partly fixed | Cal loads on booking intent only; cookie legal determination is H05 | H05 |
| F15 | still present | Retention/controller decisions | H05 |
| F16 | not verified | Response headers not read in this environment | H09 |
| F17 | still present | Area/entrance accuracy | H07 |
| F18 | fixed | Mobile duration order matches document order 60/90/120 | — |
| F19 | fixed | Explicit “Book/Reservar N minutos” CTAs on cards | — |
| F20 | still present | Testimonial provenance | H10 |
| F21 | partly fixed | Safe editorial copy applied; remote provider copy H09 | H09 |
| F22 | still present (intentional) | `noindex, nofollow` kept in HTML + PageMeta + `site.searchIndexing: false` | H08 |
| F23 | partly fixed | Noscript static service/contact block added | Bundle-failure UX still limited for SPA |
| F24 | partly fixed | Build plugin now uses `site.socialImage` (not favicon); strips duplicate social tags from shell before injecting one set; PageMeta remains runtime owner | Unverified schema deferred |
| N01 | partly fixed | Sequencing rewrite landed; full acceptance matrix pending | Browser recordings |
| N02 | partly fixed | Studio/feature overflow constraints added | Device recheck |
| N03 | partly fixed | Theme/type/nav tokens aligned to ivory hero; `html.dark` token flip neutralized in `index.css` | Contrast QA |
| N04 | partly fixed | Hero labels follow locale via `setLanguage` without replay | EN↔ES during intro recheck |
| N05 | still present | Spanish voucher terms missing | H06 |
| N06 | partly fixed | Hero service + session lines reserved in markup | Visual QA |

## Verification

- Build/lint/relevant tests: `npm test` → 9 pass (pricing + hero lifecycle source tests). `npm run build` → success (`tsc -b && vite build`).
- Browser/OS matrix, cold/cached hero trials, booking keyboard into iframe, and timezone checks: **not completed in this session**.
- No production booking forms submitted.

## Human and external actions

See `HUMAN_REVIEW_REQUIRED.md` (H01–H10). Items that block public launch: H01/H08 (launch/indexing), H02/H07 (accuracy), H03–H05/H09 (booking/legal/provider), H06 (voucher ES terms / inquiry), H10 (testimonials).

## Ready to resume

- Last completed work package: P1–P7 code patch landed; build green
- Next concrete action: local preview + browser acceptance matrix (hero scenes, booking focus, EN/ES, responsive widths); fill evidence paths
- Known failures or unverified checks: cold-load hero recordings; Cal iframe keyboard; contrast ratios; security headers; performance budgets
- Changed files: see `git status` on `audit-pre-launch`
- Code patch ready for review: **yes** (deterministic fixes + build/tests green; verification evidence incomplete)
- Public launch ready: **no** — human items H01–H10 unanswered; full acceptance matrix not recorded
