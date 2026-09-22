# Pluma: comparison with the September 17 report

Live retest: 22 September 2026. Companion to [the plain-English audit](PLUMA_LAUNCH_AUDIT.md).

“Fixed” applies only to the stated concern and tested conditions. “Not verified” means there is insufficient evidence to close the historical finding; it does not mean it remains a defect. The old report was reference material, not instructions to change the site.

| ID | Earlier finding | Status | Live evidence / remaining check |
| --- | --- | --- | --- |
| F01 | Booking exposed while launch prerequisites are unfinished | Still present | Legal, booking, privacy and cookie pages retain incomplete/prelaunch notices. Booking reaches the final form. No appointment was submitted. |
| F02 | Mandatory phone number omitted from data inventory | Still present | Phone is marked required in the 90-minute form; privacy inventory and /book notice still omit it. |
| F03 | Valencia-time promise versus London calendar | Not verified | All three sampled modal durations and sampled forms show Europe/Madrid. Earlier mismatch not reproduced. Other visitor timezones, daylight-saving dates and confirmations were not tested, so a universal fix is not established. |
| F04 | Keyboard focus behind booking overlay | Still present | Opening Book 90 minutes left focus on the trigger; Tab moved to underlying Book 120 minutes. Modal iframe title remains “Book a call”. Standalone iframe has a better massage-specific title. |
| F05 | Main booking route bypasses health-note warning | Still present | /book has a warning, but the modal form's broad preferences prompt has no adjacent equivalent guidance. |
| F06 | Booking does not follow site language | Still present | Spanish site produces English calendar controls. The 60-minute description is Spanish; 90/120 are English. Also found hero language becoming out of sync after switching. |
| F07 | Loading label persists after calendar is usable | Still present | /book retains Loading the calendar / Cargando el calendario with dates and times available, including after a 120-minute switch. |
| F08 | Floating booking button has low contrast | Partly fixed | Old green floating button not present on inspected pages; new orange navigation button replaces the role. White 16px text still has low contrast, approximately 1.93–2.49:1 against gradient endpoints. |
| F09 | Pricing and voucher page-wide overflow | Fixed | Document width equals viewport width at 390, 768 and 1366 pixels on both pages in this browser. Mobile vouchers render as cards. Classic-scrollbar/cross-browser retests remain prudent. Separate homepage overflow newly confirmed. |
| F10 | Incomplete motion pause controls | Still present | Studio and closing videos play off-screen with controls disabled. Testimonial Pause works. Old ribbon not found in homepage snapshot; reduced-motion behaviour not emulated. |
| F11 | Large videos dominate delivery cost | Not verified | Hero implementation and asset paths changed. Current transfer sizes and slow-network performance not measured; do not carry forward old 24.25 MB figure as current. Off-screen playback remains observed. |
| F12 | Certification wording conflicts with legal notice | Still present | Homepage/About say Certified masseur / Masajista certificado; legal notice says qualification and insurance details are unconfirmed. This does not establish that qualifications are absent. |
| F13 | Voucher inquiry route contradicts terms | Still present | Offer uses mailto:hello@pluma.life. Terms refer to a Cal inquiry link not provided and list stephen@pluma.life. |
| F14 | Cookie policy understates Cal loading | Still present | Cookie page says Cal loads only when opening booking; its own rendered document includes app.cal.com/embed/embed.js. Script-presence evidence, not a complete request/storage inventory. |
| F15 | Retention and processor details are placeholders | Still present | English and Spanish privacy text mark retention, identity/address and transfer details as pending. |
| F16 | Missing browser security headers | Not verified | This visitor-experience pass did not retrieve or validate response headers. No security conclusion. |
| F17 | Public directions and calendar differ | Still present | Footer map targets Pl. de les Escoles Pies; calendar says Carrer de Balmes, 15. Their intended relationship and confirmation instructions require owner verification. |
| F18 | Mobile visual order differs from reading order | Still present | At 390px, 90 minutes is visually first, then 60/120. Document order remains 60/90/120. Now checked in a rendered phone-width layout rather than inferred from code. |
| F19 | Pricing cards lack visible booking cue | Still present | Cards open booking and have accessible Book labels, but visible content remains duration, price, recommendation and description. |
| F20 | Review provenance and mixed-language presentation | Still present | Dedicated /reviews exists, but inspected reviews have no dates/source links and retain original languages without translation labels. |
| F21 | Small copy issues | Partly fixed | Pricing title is now “Single massage prices.” and duration wording improved. “Don't over think it”, duplicated total-price wording and “my my” / “5 minutes walk” remain. |
| F22 | Search indexing intentionally disabled | Still present | Inspected document metadata says noindex, nofollow. A launch decision, not an accidental defect. Actual search-engine indexing was not tested. |
| F23 | No meaningful no-JavaScript fallback | Not verified | Rendered pages work; initial HTML delivery, disabled JavaScript and bundle-failure behaviour were not tested. |
| F24 | Social preview and delivery polish | Partly fixed | Cookie-page rendered head contains dedicated /assets/images/og-share.jpg plus another og:image pointing to favicon.png. Dedicated asset added, but duplicate metadata remains; actual previews and caching not checked. |

## New or newly verified findings

- **Homepage overflow:** scroll width 409px at both 390px and 320px viewport widths. Studio feature body, feature list and media extend to x=409. Horizontal scrolling inside a gallery is a separate behaviour.
- **Two visual systems:** hero background is rgb(251,250,245), while the inspected page uses its dark theme. Orange navigation actions coexist with lime section actions. Hero/navigation uses Arial; other headings use Parkinsans and body text uses Instrument Sans.
- **Orange CTA contrast:** white text at 16px over a gradient from rgb(255,129,43) to rgb(245,172,69). Calculated endpoint contrast: 2.49:1 and 1.93:1. Sampled colours, not an all-states accessibility audit.
- **Hero language:** after loading the homepage in Spanish and switching to English, body/navigation updated but the hero retained “estudio de masaje en casa” and Spanish alternative text. The inverse mismatch was also observed earlier in the session.
- **Spanish voucher terms:** /condiciones-bonos in Spanish supplies only an unfinished-translation notice referring to English terms. The English page contains full conditions.
- **Hero clarity:** first screen identifies a home massage studio but omits the city and practitioner; the fixed booking action remains visible. Adding service/location information is an editorial recommendation, not a measured conversion claim.
- **Translucent navigation:** text/controls behind the fixed bar show through on pricing and in the opened phone menu. Improve background solidity rather than reproducing this weakness across the design.

## Executed checks

| Area | What was actually checked |
| --- | --- |
| Public pages | /, /about, /pricing, /member-card, /reviews, /book, /aviso-legal, /privacidad, /cookies, /condiciones-reserva, /condiciones-bonos rendered. HTTP status codes were not separately measured. |
| Desktop, 1366 × 900 | Hero, scrolled homepage, pricing/vouchers, 60/90/120 calendars, 90-minute final form, keyboard overlay behaviour and generic footer booking. |
| Phone, 390 × 844 | Hero/menu, homepage duration strip, pricing, voucher cards, About, navigation booking through date/time to 90-minute form and reachable Pay at location. Standalone /book load and 90-to-120 switch. |
| Tablet, 768 × 1024 | Pricing two-column layout, voucher layout/width, homepage measurements, gallery opening/next/close and focus return, technique expansion, testimonial pause and FAQ. |
| Additional sizes | Homepage hero/navigation and overflow at 320 × 568; homepage hero/navigation at 844 × 390. Targeted checks, not full-journey passes at each size. |
| Language | English/Spanish homepage, About, pricing, voucher offers, booking and key policies. Cal controls/descriptions compared with surrounding language. |
| Forms | 90-minute modal and standalone forms inspected without typing or submitting. Other durations checked through calendar opening/price, not through every field. |
| Working controls | Gallery focus starts on Close; right arrow changes Entrance to Hallway; Escape restores View Entrance. Technique reports expanded state. Testimonial control changes to Play; selected testimonial stays stable during subsequent checks. |

The navigation button serves as the hero's visible booking action. Generic navigation/footer booking, all three homepage duration buttons and a pricing card were tested. Studio-section and closing-section booking buttons were identified but not separately activated; include these in implementation acceptance checks.

Not tested: physical devices, alternate browsers, separate light-theme render, virtual keyboards, screen readers, 200% text/400% zoom, all focus permutations, reduced-motion emulation, other timezones, final submissions, email/calendar invitations, rescheduling/cancellation, provider failure, performance, security headers or complete storage/network behaviour. Viewport override was reset after testing.

## Source trail

Current evidence: live rendering, screenshots, visible text, accessibility trees and read-only DOM/style measurements in the permitted browser, 22 September 2026. No website or booking configuration was edited.

Historical baseline: Pluma_Comprehensive_Website_Review_2026-09-17_EN.pdf, supplied by the owner, findings F01–F24. Its September 8 comparison was not independently rerun. Historical screenshots and sizes were not treated as current evidence.
