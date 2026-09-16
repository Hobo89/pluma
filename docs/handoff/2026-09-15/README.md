# Pluma website copy — Cursor handoff

This package is the authoritative implementation handoff for the current Pluma staging site.

## Start here

1. Read `reference/DECISIONS.md` for the locked product and copy decisions.
2. Follow `IMPLEMENTATION.md` in order.
3. Use `copy/website-copy-en-US.md` as the exact English source of truth.
4. Use `copy/website-copy-es-ES.md` as the exact Spanish source of truth.
5. Use `copy/voucher-terms-en-US.md` for the voucher page, FAQ, terms, and internal operating instructions. Publish only the sections explicitly marked as customer-facing.
6. Complete `QA_CHECKLIST.md` before handing the build back for human review.

## Precedence

If any earlier audit, existing website text, or source-code comment conflicts with this package, use this order:

1. `reference/DECISIONS.md`
2. `copy/website-copy-en-US.md`
3. `copy/website-copy-es-ES.md`
4. `copy/voucher-terms-en-US.md`
5. `IMPLEMENTATION.md`
6. Existing code and older audit material

Do not improvise replacement marketing copy. If the code contains a surface not covered here, preserve it unless `IMPLEMENTATION.md` explicitly says to remove or hide it.

## Intended result

The site should feel like Stephen speaking directly to one person:

- American English in the English locale
- natural Spain Spanish, localized by meaning rather than word for word
- first-person, calm, attentive, and specific
- three single-session lengths: 60, 90, and 120 minutes
- vouchers available through an inquiry flow and delivered by email
- no mention of a digital wallet, wallet compatibility, or wallet work in progress
- no public internal-status language on marketing pages
- noindex/nofollow kept in place

## Important boundaries

- Work in source files, not generated production bundles.
- Preserve Pluma’s existing visual identity, responsive behavior, photography, testimonials, and animation system unless a change is explicitly requested here.
- Do not remove testimonial photographs.
- Do not invent testimonials, qualifications, legal details, or client statistics.
- Do not add checkout, payment, digital-wallet, CRM, or backend functionality.
- The Notion voucher record remains a manual internal process; it is not a website integration task.
- Keep the website unindexed until Stephen makes a separate launch decision.

