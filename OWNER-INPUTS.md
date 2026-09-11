# Owner inputs

Facts the website needs from Stephen, a gestor or an adviser before the
corresponding part of the site can go live. Nothing in this list has been
guessed or filled in with a placeholder value on the public site: where an
answer is missing, the page says so in visible text.

**How to use this file.** Fill in *Value* and *Evidence* as answers are
confirmed, then set the matching release flag in `.env` (see
`src/config/readiness.ts`). Do not enable a flag before its blocking scope is
genuinely satisfied — the flag is an assertion, not a switch.

Legend for *Status*: `open` (no answer yet) · `partial` (some of it is known) ·
`confirmed` (answered, with evidence recorded).

---

## 1. Business release — blocks everything transactional

Flag: `VITE_READY_BUSINESS` → `readiness.businessReady`

| # | Input | Status | Value | Evidence | Owner |
|---|---|---|---|---|---|
| 1.1 | Full legal name for the operator | open | | | Stephen |
| 1.2 | NIF | open | | | Gestor |
| 1.3 | Lawful business and contact address for the legal notice, and how it differs from the private arrival address given to clients | open | | | Gestor |
| 1.4 | Hacienda / RETA registration status and the permitted start date for the activity | open — owner states registration is not complete | | | Gestor |
| 1.5 | Premises activity classification and permission for a home studio; use compatibility, applicable activity procedure, access and fire requirements, lease or community restrictions | open | | | Technician / Ajuntament de València |
| 1.6 | Whether any healthcare-centre authorisation applies to the actual activities offered | open | | | Adviser |
| 1.7 | Official Generalitat complaint forms: obtained, and any notice obligation fulfilled | open | | | Stephen |

The legal notice currently publishes the trading name and email, and states
plainly that 1.1–1.5 are unconfirmed. It must not be changed to imply
otherwise before these are answered.

## 2. Qualifications, scope and insurance

**Owner decision, 9 September 2026.** Stephen confirmed he is a certified
masseur and that he is trained for the pregnancy and lymphatic work the studio
offers. The site was updated accordingly: it now says "Stephen · your certified
masseur" / "Stephen · masajista certificado", and pregnancy, relaxing and
lymphatic, deep tissue and sports are all published as offered services.

What remains is documentary, not a question of whether to publish: file the
certificate details so the claim can be evidenced if anyone asks.

| # | Input | Status | Value | Evidence | Owner |
|---|---|---|---|---|---|
| 2.1 | Exact qualification, issuing body, year and professional scope | confirmed by owner; document to be filed | Certified masseur | To be filed | Stephen |
| 2.2 | Professional liability insurance: insurer, cover, dates | open | | | Stephen |
| 2.3 | Training for pregnancy massage | confirmed by owner; document to be filed | Trained | To be filed | Stephen |
| 2.4 | Training for lymphatic drainage | confirmed by owner; document to be filed | Trained | To be filed | Stephen |

## 3. Prices and tax

Booking is live (`readiness.bookingReady` now defaults on), so these are no
longer blockers in the code. They are live commercial risks instead.

| # | Input | Status | Value | Evidence | Owner |
|---|---|---|---|---|---|
| 3.1 | **Price for 90 minutes. URGENT.** The website says €65 and the Cal.com event description says €55. Customers can now book, so a visitor reads €65 on the site and €55 in the calendar in the same journey. Fix one or the other today. | open — live conflict | | | Stephen |
| 3.2 | Confirm the full catalogue: 30 / 60 / 90 / 120 minutes at €25 / €45 / €65 / €85 | partial — audited baseline only | | | Stephen |
| 3.3 | Whether 30 minutes stays in the catalogue | open | | | Stephen |
| 3.4 | VAT treatment and rate. AEAT places masoterapistas outside the medical exemption, so do not assume the service is exempt. | open | | | Gestor |
| 3.5 | Invoicing arrangements, including for prepaid bonos | open | | | Gestor |

The catalogue lives in `src/config/pricing.ts` in integer cents. Change it
there and every price, saving and duration label on the site follows. The
90-minute conflict stays recorded in `pricingConflicts` for the record; the
customer-facing note was removed when booking went live, because an internal
"pending approval" banner does not belong on a page people are buying from.
Delete that entry once 3.1 is settled.

**Also urgent: the 120-minute session.** The site sells 120 minutes at €85 and
its Book button now goes to the calendar, but the Cal.com event only offers
30m, 1h and 1h 30m. Either add a 120-minute option to the event or remove the
120-minute card from `sessionRates`.

## 4. Payment and booking operations — blocks booking

| # | Input | Status | Value | Evidence | Owner |
|---|---|---|---|---|---|
| 4.1 | Accepted payment methods | open | | | Stephen |
| 4.2 | When payment is taken (at booking, on arrival, after) | open | | | Stephen |
| 4.3 | Whether a deposit applies, and how much | open | | | Stephen |
| 4.4 | Cancellation notice period and how to cancel | open | | | Stephen |
| 4.5 | Rescheduling rules | open | | | Stephen |
| 4.6 | Lateness and no-show consequences, including any charge | open | | | Stephen |
| 4.7 | How the statutory 14-day distance withdrawal right applies to a dated appointment | open | | | Adviser |
| 4.8 | Exact Cal.com event URL or ID per duration, and per language if separate events are used | partial | Default event https://cal.com/pluma-massage/valencia. Per-duration and per-language events still unset. | Owner-supplied URL | Stephen |
| 4.9 | Whether the default event is multi-duration and accepts the `duration` parameter | open | | | Stephen |
| 4.10 | Real working days, buffers, minimum notice, advance window, daily workload | open | | | Stephen |
| 4.11 | Whether the mandatory WhatsApp field is justified or should become optional | open | | | Stephen |

No arbitrary 24-hour deadline or forfeiture rule has been invented. The booking
terms page states that these are undecided. The default calendar is
`pluma-massage/valencia`. Supply remaining per-duration events through
`VITE_CALCOM_LINK_30/60/90/120` in `.env` if they are created.

## 5. Bono commercial terms — blocks bono sales

Flag: `VITE_READY_BONO_SALES` → `readiness.bonoSalesReady`

| # | Input | Status | Value | Evidence | Owner |
|---|---|---|---|---|---|
| 5.1 | Validity lengths | confirmed — 5 sessions / 3 months, 10 sessions / 6 months | 3 and 6 months | Owner decision in the brief | Stephen |
| 5.2 | **When validity starts** (purchase, first use, or another trigger) | open | | | Stephen |
| 5.3 | End-of-month handling for calendar-month expiry | open | | | Stephen |
| 5.4 | Whether extensions are possible and on what basis | open | | | Stephen |
| 5.5 | Whether a bono can be shared or gifted | open | | | Stephen |
| 5.6 | Whether session lengths can be mixed within one bono | open | | | Stephen |
| 5.7 | Treatment of unused sessions at expiry | open | | | Stephen + adviser |
| 5.8 | What happens if pluma cannot provide the sessions | open | | | Stephen + adviser |
| 5.9 | Refund and reversal policy | open | | | Stephen + adviser |
| 5.10 | When a credit is reserved, redeemed and restored (cancellation, no-show) | open | | | Stephen |
| 5.11 | Statutory withdrawal right for an open-dated prepaid package | open | | | Adviser |

`VALIDITY_START_RULE` in `src/config/bonos.ts` is an explicit placeholder for
5.2. Months must be computed as calendar months in Europe/Madrid once decided;
do not substitute 90 or 180 days.

## 6. Payment provider, email and wallets — blocks capability claims

Flags: `VITE_READY_BONO_SALES`, `VITE_READY_APPLE_WALLET`,
`VITE_READY_GOOGLE_WALLET`, `VITE_READY_BALANCE_UPDATES`

| # | Input | Status | Value | Evidence | Owner |
|---|---|---|---|---|---|
| 6.1 | Payment provider | open — not yet identified | | | Stephen |
| 6.2 | Email delivery provider for issuing the pass | open | | | Stephen |
| 6.3 | Pass provider and which wallets are actually supported | open | | | Stephen |
| 6.4 | Mechanism for updating remaining sessions, and the measured refresh delay | open | | | Stephen |
| 6.5 | Staff authentication method for redeeming a session | open | | | Stephen |

The bono page presents purchase, wallet delivery and session updates as
planned, never as current. The phone illustration is labelled as generic and
its count as a sample.

## 7. Data protection — blocks relevant collection

| # | Input | Status | Value | Evidence | Owner |
|---|---|---|---|---|---|
| 7.1 | Processor agreement with Cal.com, and any international transfer mechanism | open | | | Stephen |
| 7.2 | Hosting provider log retention | open | | | Stephen |
| 7.3 | Email provider and its processing terms | open | | | Stephen |
| 7.4 | Retention period for booking records, and for enquiry emails | open | | | Adviser |
| 7.5 | Whether a separate, protected intake process for health information is wanted, and its lawful basis | open | | | Adviser |
| 7.6 | Exact field list collected by the Cal.com form | open | | | Stephen |

The processing inventory is in `src/config/processing.ts` and renders as a
table on the privacy page. Rows whose retention is unknown say so. Add payment
and wallet processors to that file at the same time as they are integrated,
not before.

## 8. Practical facts about the visit — blocks related copy

| # | Input | Status | Value | Evidence | Owner |
|---|---|---|---|---|---|
| 8.1 | One consistent walking time from the Central Market. The audit found the calendar saying three minutes and the site saying about five. | open — conflict | | | Stephen |
| 8.2 | Floor, lift, steps and step-free access | open | | | Stephen |
| 8.3 | Whether the booked time includes consultation and changing, or is hands-on time only | open | | | Stephen |
| 8.4 | Whether outcall or mobile massage will be offered, and when | open | | | Stephen |

The site currently avoids a specific walking time and says "a short walk". No
wheelchair access is claimed. Do not add an access claim without 8.2.

## 9. Reviews and photographs

| # | Input | Status | Value | Evidence | Owner |
|---|---|---|---|---|---|
| 9.1 | Provenance of each published review | open | | | Stephen |
| 9.2 | Written permission for each client portrait | open | | | Stephen |
| 9.3 | Basis for the 70% / 30% visitor split shown in "Who visits" | open — owner restored the section on 9 September 2026 | 70% women, 30% men | To be filed | Stephen |

**The existing testimonial photographs stay published.** They are part of the
current design and each one belongs with its own review. An unconfirmed
permission status is not authorisation to remove them. If a genuine legal or
technical blocker appears, leave the photographs in place and raise it for a
human decision.

---

## Sign-off record

Keep a private record for each confirmed item: the fact, the supporting
document or provider setting, the date, and who reviewed it. None of the
supporting documents need to be published.

| Date | Item | Confirmed by | Evidence held | Reviewer |
|---|---|---|---|---|
| | | | | |
