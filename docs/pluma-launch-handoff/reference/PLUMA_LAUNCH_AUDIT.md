# Pluma: live website audit

22 September 2026 · Plain-English review · Replaces the provisional report

## Overall assessment

**The new hero gives Pluma a clear visual direction, but the rest of the site has not caught up. Booking works through to the final form, yet important details still need correcting before launch.**

Keep the real photography, personal voice, clear session choices and honest first-visit information. Make the experience feel like one studio, with one visual style and consistent booking instructions.

**First priorities:** finish the published business/booking information; fix booking keyboard access and language; repair phone overflow; improve button readability; align the main page colours with the hero.

My recommendation is to address the “before launch” items below before promoting unrestricted booking. This is an experience review, not a legal certification.

## Usability

### U1. Make booking usable with a keyboard

**Before launch · Homepage booking overlay · Earlier F04**

Opening “Book 90 minutes” left keyboard focus on the page behind the calendar. Pressing Tab moved to “Book 120 minutes” underneath the overlay. The embedded calendar is labelled “Book a call”.

**Why it matters:** someone using a keyboard can navigate hidden content instead of their booking.

**Correction:** move focus into the overlay, keep keyboard navigation inside it, and return focus to the opening button on close. Give the calendar a massage-specific label. The photo gallery already handles opening focus, arrow navigation and Escape correctly in the sampled test.

### U2. Repair the homepage on smaller phones

**Before launch · Homepage studio and duration sections · Earlier F18; new overflow finding**

The homepage measured 409 pixels wide inside both a 390-pixel and a 320-pixel viewport. The studio content extended beyond the available width. Session cards appeared visually as **90, 60, 120 minutes**, while their document reading order remained **60, 90, 120**.

**Why it matters:** content can clip or move sideways, and visitors encounter the choices in different orders.

**Correction:** let the studio feature list and media fit the available width. For launch, stack all three duration cards in 60/90/120 order and keep the recommendation badge on 90 minutes. This is simpler to discover than the current horizontal strip.

### U3. Make the booking action obvious and remove misleading loading text

**Before launch · [Pricing](https://pluma.life/pricing/) and [booking](https://pluma.life/book/) · Earlier F07, F19**

Pricing cards are clickable, but their visible content never says “Book”. The standalone booking page continues to say “Loading the calendar…” after dates and times are usable, including after changing duration.

**Why it matters:** visitors may miss the action or wait for something that has already loaded.

**Correction:** show “Book 60 minutes”, “Book 90 minutes” and “Book 120 minutes” on the cards. Clear the loading message when ready and show a useful alternative if the calendar fails.

### U4. Give visitors control over continuing movement

**Before launch · Homepage videos · Earlier F10**

The studio and closing videos were playing off-screen without playback controls. Testimonial Pause worked, but does not stop those videos.

**Correction:** add a usable pause control or use still photographs for launch. Stop off-screen playback and verify reduced-motion behaviour separately. Current download sizes and slow-network performance were not measured.

## Design consistency: follow the current hero

### D1. Carry the warm hero style through the site

**Before launch for the main colours and buttons; soon after launch for finer spacing**

The [live hero](https://pluma.life/) uses warm ivory, peach/orange branding, a large real photograph and generous space. In this browser session, the rest of the site rendered in a dark green theme, with lime buttons and darker cards. Ivory navigation remains over those dark sections. No visible theme switch was available in the inspected navigation.

**Why it matters:** the transition feels like moving between two different designs.

**Correction:** use the hero's warm ivory as the launch background across the homepage, About, prices, vouchers and information pages. Use dark, readable text and one orange booking-button treatment. Retain real photography and calm spacing. Defer a separate dark theme until it has been designed consistently.

| Element | Direction for the next pass |
| --- | --- |
| Backgrounds | Warm ivory, with slightly different light surfaces to separate sections. |
| Buttons | One primary booking style; a quieter outlined style for secondary actions. |
| Typography | Use the hero/navigation's simple sans-serif character consistently. Current hero/navigation text uses Arial; other headings use Parkinsans and body copy uses Instrument Sans. |
| Cards | Consistent corners, padding and subtle borders. Avoid new accent colours for each section. |
| Imagery | Keep authentic massage, practitioner and studio photographs. Make decorative voucher artwork less prominent than the offer. |

### D2. Improve the orange booking button and floating navigation

**Before launch · Site-wide navigation · Related to earlier F08**

The orange-gradient button uses white, 16-pixel text. Calculated contrast against the gradient endpoints is approximately **2.49:1 and 1.93:1**. The translucent navigation also lets page text and other buttons show through, particularly around the pricing-page voucher invitation.

**Correction:** retain orange as the accent, but use sufficiently dark text or a darker orange background. Aim for at least 4.5:1 for this text size. Give the navigation and opened phone menu a more solid ivory background, and ensure focused controls are not covered by the bar.

## Messaging

### M1. Finish the information people need before committing

**Before launch · Legal, booking and privacy pages · Earlier F01, F02, F05, F12, F15**

The published pages still say they are incomplete and must be resolved before bookings or payments open. Payment and cancellation rules remain undecided. The website calls Stephen a “Certified masseur”, while the legal notice says qualification details are unconfirmed.

The booking form requires a phone number, but the privacy inventory and short booking notice omit it. The main booking overlay also bypasses the warning about not entering health information; its notes prompt broadly invites visitors to share what they want to focus on.

**Why it matters:** the site promises a finished service while its supporting information says otherwise.

**Correction:** supply and verify actual business details, qualifications and operating rules, then align every page and booking form. Explain the information actually requested and put practical-note guidance beside the notes field. These facts need your input; they should not be invented by a developer.

### M2. Make English and Spanish work throughout the journey

**Before launch · Hero, calendar and voucher terms · Earlier F06 plus new findings**

The main pages translate, but the calendar remains in English on the Spanish site. The 60-minute event description is Spanish even on the English site; 90- and 120-minute descriptions are English. After changing language, the hero retained its previous language while the surrounding page updated. Spanish voucher terms contain only a notice that the translation has not been reviewed and the English terms apply.

**Correction:** connect the hero and calendar to the selected site language, translate event content consistently, and provide reviewed Spanish voucher terms. Use “bonos” in navigation unless the offer is specifically a gift product; the current “bonos regalo” leads to multi-session packages.

### M3. Clarify the offer immediately and tidy the wording

**Before launch for the hero proposition; soon after launch for editorial polish · Earlier F21**

The hero says “home massage studio”, but not Valencia or who provides the massage. Session prices appear after the practitioner, studio and reviews. The fixed booking action helps, but the first screen could answer more of a new visitor's questions.

**Suggested hero line:** “Personalised massage with Stephen in Valencia’s Old Town.” Add “60, 90 or 120 minutes · from €45” if these prices remain approved.

Reduce the three repeated total-price statements to “Prices include tax. The amount shown is the total you pay.” Change “Don't over think it” to “Don't overthink it”. Correct “my my home studio” and “a 5 minutes walk” in the booking profile. In Spanish, replace “y recuerdo lo que funcionó la próxima vez” with “y tengo en cuenta lo que funcionó en tus sesiones anteriores”.

### M4. Make vouchers and arrival instructions consistent

**Before launch · Vouchers, voucher terms and location information · Earlier F13, F17**

The voucher page offers email inquiry to **hello@pluma.life**. Its terms tell visitors to use a Cal inquiry link that is not provided and list **stephen@pluma.life**. The footer map points to Pl. de les Escoles Pies, while the calendar shows Carrer de Balmes, 15.

**Correction:** use one clearly explained voucher inquiry route. Confirm arrival information, and label the public map as an approximate area if intentional. Different address references do not, by themselves, prove either address is wrong.

**Soon after launch:** add review dates/source context where available and permitted, and label original-language quotations or provide labelled translations. The new reviews page is useful, but still lacks that context.

## What is working

- The 60/90/120-minute calendars open with €45/€65/€85. Sampled calendars and forms show Europe/Madrid; the earlier London mismatch was not reproduced.
- The 90-minute journey reaches its final form on desktop and at phone width. “Pay at location” is reachable; it was not pressed.
- Pricing and vouchers fit the checked desktop, tablet and phone widths. Vouchers now become separate cards on a phone.
- Practical access information, control over pressure, real photographs, gallery controls and testimonial pause are useful strengths.

## Coverage and next step

Reviewed the homepage, About, prices, vouchers, reviews, standalone booking and five policy pages. Checked English/Spanish content and rendered desktop (1366 × 900), tablet (768 × 1024) and phone (390 × 844) layouts, with additional homepage checks at 320 × 568 and 844 × 390.

These are browser viewport tests, not physical iPhone/Android tests. Light-theme alternatives, screen readers, virtual keyboards, confirmation emails, other timezones, network failure and current performance remain unverified. No booking, purchase, message or personal-data submission was made.

The [comparison with all 24 previous findings](PREVIOUS_REPORT_COMPARISON.md) records what changed and what remains uncertain. Review this audit first; the next pass will turn the agreed corrections into a separate launch instruction file.
