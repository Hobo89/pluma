# PL-01 – PL-27 status

Branch `audit-implementation`, 9 September 2026.

The MHTML audit was **not included** in the handoff zip, so individual finding
texts were not available. Each ID below is traced through the grouped mapping
in section 9 of the implementation brief, and the "Subject" column repeats that
grouping rather than quoting the original finding. Where an observation could
not be reproduced without the audit, the status says so.

Status values: **fixed** · **already resolved** · **waiting on owner** ·
**provider limitation** · **not reproduced**.

| ID | Subject (from the brief's mapping) | Status | What was done, and what remains |
|---|---|---|---|
| PL-01 | Catalogue and duration availability | fixed + waiting on owner | Single catalogue in integer cents; 30/60/90/120 all present with scope descriptions. 120 minutes has no calendar event, so it routes to a labelled enquiry rather than a booking button. Whether 30 minutes stays is owner input 3.3. |
| PL-02 | HTTP route delivery | fixed | The build emits a real HTML file per route, so GitHub Pages returns 200 instead of 404 for `/about` and the rest. `404.html` stays a genuine 404 for unknown paths. Not yet confirmed against the live host. |
| PL-03 | Duration availability and booking route | fixed + waiting on owner | Duration is selectable outside the iframe and carried in the URL. Per-duration Cal.com links are supported but unset; owner input 4.8. |
| PL-04 | Legal identity fields | waiting on owner | The legal notice states in visible text that legal name, NIF, address, registration and premises permission are unconfirmed. The `—` NIF placeholder was removed rather than replaced. Owner inputs 1.1–1.5. |
| PL-05 | Processing inventory | fixed | Real inventory in `src/config/processing.ts`, rendered as a table: booking data to Cal.com, enquiry email, browser preferences, hosting logs, Google Fonts. Retention rows say "pending" where genuinely unknown (owner inputs 7.1–7.4). |
| PL-06 | Privacy notices at collection | fixed | A short Pluma privacy notice sits immediately above the calendar with a link to the full policy, and asks visitors not to include health information. Provider-form fields remain a manual Cal.com task. |
| PL-07 | Embed locale | provider limitation + waiting on owner | No locale parameter is guessed. The installed embed accepts arbitrary query parameters, so a wrong value would fail silently. Separate per-language events are supported through config; owner input 4.8. |
| PL-08 | In-person timezone and confirmation | fixed + waiting on owner | "All times are Valencia local time (Europe/Madrid)" shown outside the iframe, plus a note that the appointment is in person. No UTC offset is hard-coded. Confirmation message wording is a manual Cal.com task. |
| PL-09 | Unified digital bono page | fixed | `/member-card` rebuilt as the single bono page with native accessible controls, three designs, package selection, exact totals and savings, and a correct prelaunch state. No competing package page was added. |
| PL-10 | Cancellation rules | waiting on owner | Booking terms published as a draft stating that notice period, rescheduling, lateness and no-show consequences are undecided. No 24-hour deadline or forfeiture rule was invented. Owner inputs 4.4–4.6. |
| PL-11 | Terms availability | fixed + waiting on owner | New booking terms and bono terms pages in both languages, linked from the footer, the duration chooser, the booking page and the bono summary. Content is draft pending owner inputs 4 and 5. |
| PL-12 | Service guidance | fixed | Relaxation and firmer work described in plain experiential language, with an explicit note that this is not physiotherapy or treatment of illness or injury. Duration is not equated with mandatory deep pressure. |
| PL-13 | Verified training and specialised services | fixed + waiting on owner | Pregnancy and lymphatic sessions are unpublished as bookable services and described as not currently offered, rather than renamed. "Certified masseuse" replaced with "Stephen · your masseur". Owner inputs 2.1–2.4. |
| PL-14 | Outcall availability | fixed | The outcall card no longer links to booking. It states outcall is not available yet and offers an email enquiry. |
| PL-15 | Hero | fixed | Service and city are in accessible text above the fold, the `h1` is real text rather than the wordmark image, and the featured 90-minute offer with its price and a single primary action lead the page. |
| PL-16 | Personalisation copy | fixed | Personalisation explained as agreed pressure, focus areas and things to avoid. The duplicated language paragraph was split so one block covers personalisation and a separate one covers languages. |
| PL-17 | Terminology and localisation | fixed | Consistent "masseur / masajista"; the incorrect "masajista certificada" removed. Lowercase `pluma` wordmark kept. All new copy exists in both languages, and prices use `Intl.NumberFormat` per locale. |
| PL-18 | Review provenance | fixed + waiting on owner | A visible note says reviews were shared by clients and photograph permissions are being confirmed. **All seven portraits remain published and paired with their own reviews.** No generated faces, ratings or outcome claims were added. Owner inputs 9.1–9.2. |
| PL-19 | Media loading | fixed | The 13.64 MB video is not requested on a first mobile view. Responsive WebP posters generated from the video's own frame; the mobile poster is 85.3 KB. Favicon reduced from 718 KB to 81 KB; 3.6 MB of unreferenced assets deleted. |
| PL-20 | Embed reliability and fallback | fixed, partly unverified | Reserved layout space, readable loading state, 12-second timeout, direct calendar link, email fallback and retry. Listeners are cleaned up to prevent duplicate iframes. Not exercised against a live calendar because no Cal.com link is configured here. |
| PL-21 | Response security headers | provider limitation | `public/_headers` provides nosniff, Referrer-Policy, Permissions-Policy, HSTS, `X-Frame-Options` and a report-only CSP matched to the site's real dependencies. **GitHub Pages ignores it and cannot set custom headers.** Requires a host or CDN change. |
| PL-22 | Metadata, canonical and languages | fixed, with a stated gap | Unique service- and city-aware title, description, canonical and Open Graph tags per page, baked into the served HTML and maintained on client navigation. **No `hreflang`**, because both languages share one URL; `/en/` and `/es/` paths are the prerequisite and are not implemented. |
| PL-23 | Sitemap and robots | fixed | Genuine XML `sitemap.xml` generated from the same route list the build uses, listing only canonical indexable pages. `robots.txt` added. No fabricated structured data was published. |
| PL-24 | Native accessible controls | fixed | Duration, sessions and design are native radio groups with visible legends, keyboard support and non-colour selection indicators. The design choices are all visible rather than in an auto-rotating carousel. The booking iframe has a meaningful title. |
| PL-25 | Motion controls | fixed | The testimonial rotation starts paused under reduced motion, has visible pause, previous and next controls, pauses on pointer and keyboard focus, and slows from 4 s to 6 s. Portraits are decorative to assistive technology; the quote is not announced while auto-rotating. |
| PL-26 | Payment disclosure | waiting on owner | Payment methods and timing are shown as being confirmed, in a labelled placeholder, next to the duration choice and on the booking page. No payment-provider logo appears. A note states the displayed price is the total and nothing is added later. Owner inputs 4.1–4.3 and 3.4. |
| PL-27 | First-visit and access information | fixed + waiting on owner | A "Your first visit" section covers private changing, draping, stopping at any point, and what is agreed beforehand. Step-free access, lift availability, exact walking time and whether booked time is hands-on time are shown as open questions. No wheelchair access is claimed. Owner inputs 8.1–8.3. |

## Summary

| Status | Count |
|---|---|
| fixed (including fixed + waiting on owner) | 20 |
| waiting on owner only | 3 (PL-04, PL-10, PL-26) |
| provider limitation | 2 (PL-07, PL-21) |
| not reproduced | 0 |

No finding is marked "not reproduced" because the audit document was not
supplied; the groupings in the brief were sufficient to act on every ID, but
individual observations could not be re-checked against the original evidence.

**Nothing here is a claim that a launch condition is met.** Every item marked
"waiting on owner" blocks the corresponding release flag in
`src/config/readiness.ts`, and all six flags are currently off.
