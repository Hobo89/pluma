# Pluma launch: decisions for human review

Prepared 22 September 2026. Companion to the [master coding-agent brief](MASTER_CODING_AGENT_BRIEF.md).

These items need business facts, an owner decision, professional review or access to an external account. A coding agent can implement your answers, but should not invent them. This is a decision checklist, not legal advice or a conclusion that the business lacks any particular qualification.

Code work can continue while these are answered. A working website does not settle unfinished booking terms or operational decisions. Record answers here or supply a separate approved document; do not publish the blanks below on the website.

## Decisions needed before public booking launch

### H01 — Confirm the intended launch state

**Related: F01.** Booking reaches the final form, while published pages say business details must be completed before reservations or payments open.

**Please decide:** should public booking remain available during preparation, or should the public site temporarily offer inquiries only? Confirm the target public launch date and who signs off the completed information.

An inquiry-only choice would need consistent changes to navigation, session actions, `/book` and any directly shared provider links. Do not ask the agent simply to erase the incomplete notices and declare the underlying issues solved.

**Answer:** pending.

### H02 — Verify business identity and qualification wording

**Related: F01, F12.** Public copy says “Certified masseur”; the legal notice says qualification and insurance details are unconfirmed.

Supply the actual legal operator name, trading name, tax identifier and appropriate business address for publication. Confirm which qualification can accurately be named, awarding organisation and scope. Confirm any professional-insurance/registration/complaints information that the reviewed notice needs.

**Decision:** approve supported wording, or approve temporary removal/qualification of the claim. Neither outcome should be guessed. Use a suitably qualified adviser for legal requirements that remain unclear.

**Answer / approved wording:** pending.

### H03 — Set single-session payment and cancellation rules

**Related: F01.** The final action says “Pay at location”, while site terms say payment method/timing and cancellation rules are undecided. The FAQ says details will be confirmed with the booking.

Specify accepted payment methods, payment timing, whether a deposit exists, cancellation/rescheduling notice, lateness, no-show consequences and any exceptions. Have the applicable withdrawal/consumer wording reviewed separately from ordinary appointment cancellation. Do not copy the voucher's 24-hour rule into single-session terms without choosing it.

**Answer / approved EN and ES terms:** pending.

### H04 — Decide what the booking form should collect

**Related: F02, F05.** The 90-minute form requires a phone number but the site's data explanation omits it. A broad preferences prompt can invite health details.

Confirm whether a phone number is necessary, optional or unnecessary; what it is used for; and whether WhatsApp is part of the agreed process. Confirm whether practical preferences should remain as a free-text field. If health information is required for the service, define an appropriate separate intake process with reviewed safeguards rather than inventing consent text inside the booking form.

The agent can immediately make the existing “no health information” instruction consistent. Your decision is needed for the actual field set, purposes and intake process.

**Answer:** pending.

### H05 — Complete the privacy and cookie explanation

**Related: F14, F15.** Retention, controller details and transfer arrangements remain pending. The cookie page describes provider loading differently from the observed site behaviour.

Supply or verify controller details, real retention periods/criteria, email/booking/hosting providers, applicable agreements/transfer arrangements, and how access/deletion requests are handled. Have disclosures reviewed against the actual network/storage inventory after the code patch.

The agent will defer Cal until booking intent and remove unnecessary media/font loading where feasible. That does not establish whether any particular processing requires consent. It must not add a generic consent banner or claim “no tracking” without evidence. The planned single light theme may also change the current explanation about saved theme preferences.

**Answer / approved policy:** pending.

### H06 — Confirm voucher operations and approve both languages

**Related: F13; new missing Spanish terms.** The offer uses hello@pluma.life, English terms point to a Cal inquiry link not supplied and name stephen@pluma.life. Spanish terms only say the translation is unfinished.

**Recommended decision:** keep the existing email-led inquiry through hello@pluma.life, if you confirm that inbox is monitored. Confirm whether stephen@pluma.life should remain as a distinct contact or be replaced. Confirm package validity, activation, transfer, cancellation, refund and extension rules reflect what you will actually operate; the current published version is not proof of operational approval.

Obtain approved English terms and a reviewed Spanish equivalent. Confirm how voucher issuance, remaining sessions and expiry are recorded. Version the terms when the agreed content requires it. The agent can apply approved wording and correct links; it should not publish an unreviewed translation as final.

**Answer / approved terms:** pending.

### H07 — Confirm the entrance and public map location

**Related: F17.** The footer refers to Pl. de les Escoles Pies; Cal displays Carrer de Balmes, 15. The website says full arrival details follow confirmation.

Confirm the correct entrance, floor and arrival directions. Decide whether the public map intentionally indicates an approximate area for privacy. If so, approve wording that makes this clear. Confirm the booking provider, confirmation email and calendar invitation use the intended details.

**Answer:** pending. The audit did not establish that either address is wrong.

### H08 — Decide when search indexing turns on

**Related: F22.** Current pages have noindex, nofollow. This is consistent with a prelaunch choice.

Confirm when the public site should become discoverable through search and which pages should be indexable. The code patch will preserve the current setting until you decide. Once approved, the agent can update metadata/robots/sitemap through the actual hosting workflow and verify them.

**Answer:** pending. This blocks a search-acquisition launch, not independent interface fixes.

## External account work and follow-up evidence

### H09 — Cal.com and hosting administration

**Related: F03, F06, F07, F16, F21 and provider-dependent parts of F02/F05.** Some controls/content may be stored in Cal rather than the codebase.

Identify who can apply event-language descriptions, custom questions, field requirements, timezone settings and provider copy corrections. Give the coding agent only the account access needed, through the normal supported sign-in; do not put credentials in the report. If that access is unavailable, the agent must give you a precise settings/copy checklist.

The sampled appointment times showed Madrid, but confirmation email/invite and other visitor zones have not been signed off. Once code/configuration is ready, arrange an authorised test appointment to check time, language, address, price, confirmation, reschedule and cancellation. The current brief does not authorise sending a live booking.

For hosting, confirm who can change response policies if a fresh check finds missing headers. A hosting migration is not assumed. Test any proposed security policy with the actual booking/media integrations before deployment.

**Account owner / authorised test process:** pending.

### H10 — Testimonials and review context

**Related: F20.** Reviews have useful personal detail but no visible source/date information, and languages are mixed.

Supply dates and source links where they exist, confirm permission to publish names/photographs/quotations, and decide whether to show optional labelled translations. Keep quoted meaning intact. Do not invent dates, links, permissions or verification badges. Only publish “recent review” where the date supports that description.

**Answer:** pending. Usually follow-up polish; any known permission concern should be resolved before publishing the affected material.

## How to return decisions to the coding agent

For each H item, provide: **decision/fact; approved public wording in EN/ES if applicable; who approved it; date; any private evidence that should not be published.** A decision may resolve several page inconsistencies at once.

The agent should mark the corresponding patch dependency complete only after integrating the supplied answer and checking every affected page and provider surface. Keep unresolved items visible in the completion report. Do not treat a code build, a translated draft or removal of a warning as human sign-off.

## Already specified — no further design decision required to start

The master brief sets the immediate implementation direction: warm light theme matching the hero; readable dark text on orange actions; consistent typography; stacked phone session cards; controlled hero readiness/fallback; static lower-page video posters; and safe editorial corrections. These changes can proceed independently of the decisions above.
