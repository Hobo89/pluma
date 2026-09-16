# QA checklist

## Source and build

- [ ] Changes were made in source files, not `dist/`, `build/`, or hashed bundles.
- [ ] Formatter passes.
- [ ] Linter passes.
- [ ] Type checker passes, if configured.
- [ ] Automated tests pass.
- [ ] Production build passes.
- [ ] No console errors appear on the reviewed routes.

## English

- [ ] English locale uses American English consistently.
- [ ] `personalised` does not appear; `personalized` is used.
- [ ] `enquiry` does not appear; `inquiry` is used.
- [ ] The site speaks in Stephen’s first person where appropriate.
- [ ] The live copy matches `copy/website-copy-en-US.md`.
- [ ] English metadata matches `IMPLEMENTATION.md`.

## Spanish

- [ ] Spanish is loaded from the `es-ES` locale.
- [ ] The live copy matches `copy/website-copy-es-ES.md`.
- [ ] Navigation says **Sobre mí**, not **Sobre nosotros**.
- [ ] Spanish reads naturally and is not a word-for-word rendering of English.
- [ ] `masaje restaurativo`, `hecho para cómo llegas`, and `tiempo para instalarte` do not appear.
- [ ] Spanish metadata matches `IMPLEMENTATION.md`.

## Sessions and prices

- [ ] Only 60-, 90-, and 120-minute single sessions render.
- [ ] 30 minutes does not appear in cards, pricing, booking, URLs, configuration, tests, or locale copy.
- [ ] 60 minutes costs €45.
- [ ] 90 minutes costs €65.
- [ ] 120 minutes costs €85.
- [ ] 90 minutes is labeled **My recommendation** / **Mi recomendación**.
- [ ] No “Client favorite” claim or explanatory disclaimer remains.
- [ ] Pricing, booking, and cards read from one canonical rate source.

## Homepage

- [ ] The hero names personalized massage, Stephen, and proximity to the Central Market.
- [ ] **Book a massage** is the primary hero CTA and works.
- [ ] **See the studio** is the secondary CTA and works.
- [ ] The relationship-led benefit copy is present.
- [ ] The safety/control section is in the main journey.
- [ ] The gender-percentage section and chart are removed.
- [ ] The philosophy and final CTA appear lower on the page.

## About

- [ ] How I work, Where it started, and Why Pluma? all render in both languages.
- [ ] Each section has a stable responsive image area.
- [ ] Approved pictures are used where available; otherwise a Pluma-styled staging placeholder renders cleanly.
- [ ] No stock spa photograph was added.
- [ ] No image of Stephen’s mother was generated or invented.
- [ ] Placeholder instructions do not leak into public alt text.

## Testimonials and trust

- [ ] All existing testimonial photographs remain.
- [ ] No client quote was fabricated or rewritten.
- [ ] No customer-visible photo-permission warning remains.
- [ ] Qualification or insurance claims were not invented.
- [ ] Safety language clearly says the client can change pressure, change area, or stop at any time.

## Vouchers

- [ ] Vouchers are presented as available, not coming soon.
- [ ] Voucher quantities are five or ten sessions.
- [ ] Voucher lengths are 60 or 90 minutes only.
- [ ] Five sessions show 10% off and three-month validity.
- [ ] Ten sessions show 15% off and six-month validity.
- [ ] Validity starts with the first session.
- [ ] The first session deadline is 30 days after issue.
- [ ] All four voucher totals and per-session prices are correct.
- [ ] Copy says the digital voucher is delivered by email.
- [ ] **Ask about a voucher** routes to `https://cal.com/pluma-massage/valencia`.
- [ ] The customer-facing Voucher Terms are linked beside the inquiry CTA.
- [ ] No checkout or online payment flow exists.
- [ ] No payment method is disclosed.
- [ ] No wallet, Apple Wallet, Google Wallet, pass, phone-wallet, wallet compatibility, or real-time-balance claim appears.
- [ ] No Notion CRM or internal issuance process renders publicly.
- [ ] English Voucher Terms remain versioned and unchanged for accepted customers.

## Staging and legal

- [ ] `noindex, nofollow` remains in place.
- [ ] No sitemap/indexing work was added.
- [ ] Marketing pages contain no “pending,” “being confirmed,” “preview,” or “WIP” language.
- [ ] Missing legal operator details were not fabricated.
- [ ] Spanish legal terms were not silently machine-translated or treated as legally approved.

## Responsive review

- [ ] Review at 375 px, 768 px, 1024 px, and a wide desktop viewport.
- [ ] Hero CTAs do not wrap or overlap awkwardly.
- [ ] Three session cards remain easy to compare.
- [ ] About-page placeholders maintain their aspect ratios.
- [ ] Voucher price tables do not overflow without a usable horizontal-scroll treatment.
- [ ] Cal.com opens correctly from both locales.
- [ ] Keyboard focus, heading order, button labels, and image alternatives remain accessible.
