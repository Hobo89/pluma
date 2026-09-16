# Implementation instructions for Cursor

## 1. Inspect before editing

Find the actual source components, locale dictionaries, rate configuration, routes, and tests. Do not edit minified or generated files such as `dist/`, `build/`, or hashed JavaScript bundles.

Useful current-copy search anchors include:

```text
Restorative massage in a private home studio
Ninety minutes is the length Stephen recommends
Client favorite
Who visits
Digital bonos are coming soon
Wallet compatibility
Preview placeholder
The price for 90 minutes is being confirmed
Photograph permissions are being confirmed
```

Map every rendered surface to its source before making changes.

## 2. Update language configuration

- Treat English as `en-US`, including spelling, punctuation, and formatting.
- Keep Spanish as `es-ES`.
- Replace British spellings wherever they remain in the English interface or metadata. Examples: `personalised` → `personalized`, `enquiry` → `inquiry`, `cancelled` → `canceled`.
- Do not change the brand name `pluma` or proper place names.
- Preserve language switching and stored language preferences.

## 3. Replace website copy

- Replace English marketing and booking copy with `copy/website-copy-en-US.md`.
- Replace the corresponding Spanish copy with `copy/website-copy-es-ES.md`.
- Preserve existing translation keys when they still describe the same semantic element.
- Rename or add keys where necessary for the new About, safety, and voucher content.
- Remove keys only after confirming they have no runtime references.
- Do not translate legal or internal operating text from English automatically.

## 4. Hero and calls to action

- Render the approved hero eyebrow, headline, and support text.
- Primary hero action: **Book a massage** / **Reservar un masaje**.
- Route the primary action into the booking flow.
- Secondary hero action: **See the studio** / **Ver el estudio**.
- Route it to the studio section or page using an accessible anchor or existing route.
- Keep the CTA hierarchy clear on desktop and mobile.

## 5. Session configuration: remove 30 minutes

Update the canonical rate/session configuration to:

```text
60 minutes  → €45
90 minutes  → €65  → recommended
120 minutes → €85
```

Remove 30 minutes from all of the following, wherever present:

- homepage duration cards
- pricing page
- booking radio buttons or selectors
- URL/query-parameter parsing and validation
- default/fallback rate arrays
- Cal.com duration mappings
- structured data or metadata
- tests, fixtures, snapshots, and analytics labels
- English and Spanish locale strings

Keep 90 minutes as the default selection if the current architecture requires a default. Change the visible badge from **Client favorite** to **My recommendation** and from **Favorito de clientes** to **Mi recomendación**. Remove any disclaimer explaining that the recommendation is not a sales-volume claim.

## 6. Homepage information architecture

Keep the existing overall design system, then implement these copy/content changes:

1. Hero with direct booking CTA.
2. Three session lengths: 60, 90, 120.
3. First-person Stephen introduction.
4. Technique section framed around adapting rather than choosing a fixed treatment.
5. Relationship-led benefits section from the approved copy.
6. Safety and control section in the main page flow, before testimonials or the final booking decision.
7. Philosophy copy lower on the page.
8. Final booking CTA.

Remove the **Who visits** gender-percentage section and its visualization. It should not be replaced with another demographic claim. The safety/control section carries the reassurance more credibly.

## 7. About page

Replace the current short About page with three sections:

1. How I work / Cómo trabajo
2. Where it started / Dónde empezó todo
3. Why Pluma? / ¿Por qué Pluma?

Use the exact copy in both locale files.

Add one responsive editorial image area to each section. Until approved images exist:

- render a neutral Pluma-styled placeholder rather than a broken image
- use warm ivory, deep green, and restrained orange
- include a short staging label identifying the intended shot
- do not load external stock photography
- do not expose implementation instructions in alt text
- keep layout stable when the final image replaces the placeholder

The placeholder for the origin story must not simulate or generate a photograph of Stephen’s mother.

## 8. Trust, safety, and credentials

- Add the full approved safety/control block to the homepage.
- Keep the practical first-visit FAQ covering pressure, focus areas, draping, changing space, and the right to stop.
- Convert third-person references to Stephen into first person where Stephen is the narrator.
- Do not repeatedly use `certified masseur` as promotional copy.
- Do not invent or expand qualification or insurance claims. If a verified qualification is already represented elsewhere in the codebase, preserve the factual reference only where appropriate.

## 9. Testimonials

- Preserve every current testimonial photograph and its layout.
- Do not substitute stock images.
- Do not fabricate, paraphrase, or “improve” client quotes.
- If photo consent or quote provenance is not represented in the code, add a non-rendered source comment/TODO for human verification.
- Remove any customer-visible text saying permissions are “being confirmed.”

## 10. Voucher page and terms

Vouchers are available. They are not “coming soon.”

Build the customer page using the **Customer-facing voucher page** and **Voucher FAQ** sections in `copy/voucher-terms-en-US.md`, plus the shorter approved voucher copy in each locale file.

Required behavior:

- Show 5- and 10-session vouchers.
- Show only 60- and 90-minute voucher options.
- Show final totals and per-session prices.
- Show three-month validity for five sessions and six-month validity for ten sessions.
- Explain that validity begins with the first session and that the first session must occur within 30 days after issue.
- State that the digital voucher is delivered by email.
- Use **Ask about a voucher** / **Preguntar por un bono**.
- Route the CTA to `https://cal.com/pluma-massage/valencia`.
- Link the English customer flow to the permanent Voucher Terms route.
- Do not add a checkout, payment button, card form, price-payment disclosure, or payment provider.

Remove every rendered reference to:

- `coming soon`
- wallet or phone-wallet compatibility
- Apple Wallet or Google Wallet
- digital passes
- real-time or automatic balance updates
- sample balance counts
- preview placeholders
- pending approval
- the Notion CRM

The Notion process in the terms document is an internal manual procedure and must never render on the website.

The authoritative Spanish translation of the legal Voucher Terms is outside this handoff. Do not silently machine-translate legal clauses. Keep that route staging-only until reviewed.

## 11. Prices and pricing page

Use one canonical rate source across cards, pricing, booking, and vouchers.

### Single sessions

| Session | Price |
|---|---:|
| 60 minutes | €45 |
| 90 minutes | €65 |
| 120 minutes | €85 |

### Vouchers

| Session length | Individual price | 5 sessions — 10% off | 10 sessions — 15% off |
|---|---:|---:|---:|
| 60 minutes | €45 | €202.50 (€40.50 each) | €382.50 (€38.25 each) |
| 90 minutes | €65 | €292.50 (€58.50 each) | €552.50 (€55.25 each) |

Delete any rendered price-conflict notice. Add tests that assert these values from the canonical configuration.

## 12. Metadata

Use American English for English metadata.

### English (`en-US`)

| Page | Title | Description |
|---|---|---|
| Home | Massage in Valencia with Stephen · pluma | Personalized massage in a quiet home studio near Valencia’s Central Market. Choose a 60-, 90-, or 120-minute session with Stephen. |
| About | About Stephen · pluma massage Valencia | Meet Stephen and learn how each massage is shaped around what your body needs that day. |
| Prices | Massage prices in Valencia · pluma | See prices for 60-, 90-, and 120-minute massages at Pluma’s quiet home studio in Valencia. |
| Book | Book a massage in Valencia · pluma | Choose a 60-, 90-, or 120-minute massage and find a time with Stephen in Valencia. |
| Vouchers | Massage vouchers in Valencia · pluma | Choose a five- or ten-session Pluma voucher for 60- or 90-minute massages and ask about it through the booking calendar. |

### Spanish (`es-ES`)

| Página | Título | Descripción |
|---|---|---|
| Inicio | Masaje en Valencia con Stephen · pluma | Masaje personalizado en un estudio tranquilo cerca del Mercado Central de Valencia. Elige una sesión de 60, 90 o 120 minutos con Stephen. |
| Sobre mí | Sobre Stephen · masaje pluma Valencia | Conoce a Stephen y descubre cómo adapta cada masaje a lo que tu cuerpo necesita ese día. |
| Precios | Precios de masaje en Valencia · pluma | Consulta los precios de los masajes de 60, 90 y 120 minutos en el estudio de Pluma en Valencia. |
| Reservar | Reservar un masaje en Valencia · pluma | Elige un masaje de 60, 90 o 120 minutos y encuentra una hora con Stephen en Valencia. |
| Bonos | Bonos de masaje en Valencia · pluma | Elige un bono Pluma de cinco o diez sesiones de 60 o 90 minutos y solicita información desde el calendario. |

Keep the existing canonical URL behavior. Preserve `noindex, nofollow` on all applicable pages.

## 13. Remove public staging language

Search every locale and component for rendered phrases such as:

```text
being confirmed
pending
preview placeholder
owner approval
not yet reconciled
permissions are being confirmed
still being verified
coming soon
```

Remove them from marketing, pricing, booking, testimonial, and voucher UI. Convert unresolved implementation work into source comments or project tasks.

Exception: do not invent missing legal-operator facts. Legal placeholders may remain on staging-only legal routes while the site stays unindexed.

## 14. Preserve indexing state

- Keep `<meta name="robots" content="noindex, nofollow">` or the existing equivalent.
- Do not add indexing, sitemap submission, or search-console work.
- Add a source comment that indexing requires a separate explicit launch decision; do not render that comment to visitors.

## 15. Validate and hand back

- Run the project’s formatter, linter, type checker, and test suite.
- Build the production bundle.
- Test both locales on desktop and mobile.
- Follow every CTA and link.
- Confirm that source changes—not generated-bundle edits—produce the final output.
- Report the files changed, tests run, and any factual/legal item that still needs human input.

