# Visual specification

## 1. Design intent

Quiet, editorial, tactile, and botanical. A largely **white** canvas, narrow green serif headlines, modest sans-serif UI, lime pill buttons, and substantial natural-light photography. Space separates sections; cards rarely have borders or shadows. The visual identity depends on photography, type proportions, and a narrow content column as much as color.

Reference: the supplied screenshots in `reference/`. This document separates observations from implementation choices and does not claim exact source fonts, CSS pixels, hover behavior, or breakpoints.

## 2. Color tokens

| Token | Value | Use | Evidence |
| --- | --- | --- | --- |
| `--psl-canvas` | `#FFFFFF` | Page background | Sampled |
| `--psl-surface` | `#F6F6F3` | Product image panels | Sampled |
| `--psl-surface-sage` | `#EFF2EF` | Social-proof panel | Sampled |
| `--psl-heading` | `#082707` | Serif headings | Sampled from desktop heading interiors |
| `--psl-forest` | `#1F2C22` | Footer; dark button option | Sampled |
| `--psl-lime` | `#D7E58E` | Primary buttons, promotional strip, quote mark | Sampled |
| `--psl-text` | `#20251F` | Body and UI | Accessible reconstruction choice |
| `--psl-muted` | `#62695F` | Supporting copy | Accessible reconstruction choice |
| `--psl-line` | `#DDE1D9` | Dividers | Reconstruction choice |
| `--psl-lime-hover` | `#C8D875` | Primary hover | Proposed state, not observed |

Do not turn the whole site beige. Browns, ochres, muted olive, clay, and skin tones principally belong to the photographs. Use lime selectively; avoid lime body text on white. Footer watermark contrast is deliberately decorative; real footer information remains white or lime.

## 3. Typography

The display face is **Parkinsans** at regular weight for pluma.life — a tall, narrow serif feel for headings. Instrument Sans is the body and UI face. Times New Roman / Georgia are offline fallbacks.

| Role | Wide desktop target | Phone target | Line height | Measure |
| --- | --- | --- | --- | --- |
| Hero / closing CTA | 56–72 px | 34–42 px | 1.02–1.08 | 15–19 characters |
| Section heading | 36–48 px | 28–34 px | 1.06–1.12 | 20–28 characters |
| Editorial quotation | 32–40 px | 26–32 px | 1.15 | 28–34 characters |
| Card heading | 20–24 px | 18–22 px | 1.15–1.25 | Contextual |
| Body | 15–16 px | 15–16 px | 1.5–1.6 | 40–55 characters |
| Button / link | 13–14 px | 14 px | 1.25 | One short action |
| Category / nav | 11–12 px | 12 px | 1.3–1.45 | Short uppercase label |

These are recommended CSS sizes, not screenshot pixel measurements. The source screenshots are 1846 × 8192 and 858 × 14487 raster pixels; their device pixel ratios are unknown. Keep real paragraph text readable rather than copying apparent miniature desktop labels.

Headings: regular weight, slightly negative tracking (−0.02em), sentence case. Keep 1 H1. Use intentional widths, not fixed `<br>` elements everywhere; hero line breaks must adapt on phones. Sans-serif controls should be quiet rather than bold, wide, or heavily tracked.

## 4. Geometry and spacing

- At desktop width, the main content occupies approximately 67% of the screenshot, centered. The closing CTA and footer occupy approximately 73%. The hero, promotional ribbon, and portrait strip are full bleed.
- Starter widths: `min(67%, 1240px)` main; `min(73%, 1360px)` wide. Below 992px use 32px side gutters; below 768px use 20px. These breakpoints are implementation choices; intermediate widths were not supplied.
- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 80, 96, 120px. Favor 80–120px between major desktop sections and 56–72px on phones. Use 12–16px gaps in dense card mosaics.
- Border radius: approximately 12–16px for media, 8px for small overlays, 999px for buttons. No default drop shadow. Use fine 1px separators only where they communicate structure.
- Hero target: 44vw tall on wide screens, constrained to 560–820px. Phone: approximately 86svh with a 560px minimum. Do not reproduce the mobile screenshot's black strip below the hero.
- Product imagery: near-square, approximately 1.1:1; use `object-fit: contain` for a supplied transparent product cutout. Product name and price sit **below**, outside the image panel.
- Feature images: near-square to portrait (approximately 0.97:1). Gallery portraits: 4:5. Closing CTA: roughly 2.45:1, with a minimum height for wrapped copy.

## 5. Page composition and responsive map

| Section, in order | Desktop | Phone |
| --- | --- | --- |
| 1. Header + hero | Transparent header over full-bleed photo; logo left, small centered navigation, booking action right. Left-aligned headline and buttons; tiny trust detail low left; scroll cue low right. | Logo, bag if applicable, menu button. Center hero text vertically, aligned left. Two short actions wrap gracefully. Hide optional trust/scroll decoration. |
| 2. Collection / treatments | Heading left and short explanation right; 3 equal cards in one row. | Heading, description, then a single column of cards. |
| 3. Feature story | Image left, narrow copy right, vertically centered. | Copy then image, with a consistent reading order. Keep meaningful photography unless intentionally omitted. |
| 4. Feature story, alternate | Copy left, image right. | Same copy-first mobile order as the preceding story. |
| 5. Benefits mosaic | Centered heading. Left two-thirds: social proof + small leaf tile above two landscape tiles. Right third: one tall portrait spanning both rows. | Stack all meaningful cards; preserve their copy and contrast. The reference appears to omit or fade some tiles; do not infer that all mobile content should disappear. |
| 6. Editorial quote + collage | Centered serif quote, lime quote mark, two rotated floating botanical images; three aligned images below with a taller center portrait. | Omit floating decorative images; retain quote and compact three-image row. |
| 7. Promotional ribbon | Full-width lime band with repeated small text. | Same full-width treatment, clipped visually. One accessible text instance. Static by default. |
| 8. Testimonials | Centered heading; two narrow portrait tiles and one wide feature tile, approximately 1:1:2.4. | Single column, or a deliberately implemented accessible carousel. Do not bake in blur. |
| 9. FAQ | Heading left; accordion list right, approximately equal columns. | Heading above the list. Expand naturally. |
| 10. Portrait strip | Full-bleed horizontal portrait row. | Horizontal, user-scrollable strip with scroll snap. |
| 11. Booking CTA | Wide inset photo panel; centered white serif heading and lime button. | Same composition with stronger crop, sufficient overlay, and no text clipping. |
| 12. Footer | Wide dark green panel with rounded corners. Newsletter / contact left, short nav right; fine divider; oversized subtle wordmark below; small utility links. | Stack content; reduce wordmark to fit. Keep labels and controls readable. |

The responsive CSS intentionally improves incomplete or faded mobile captures. It never sets important content to opacity 0, reserves enormous animation gaps, or relies on hover to reveal core content.

## 6. Component contracts

**Header.** A semantic nav with a logo link and real destinations. Mobile menu needs an accessible label, visible focus, expanded state, Escape-to-close, and closure after choosing a link. The HTML specimen and React example use native `<details>` for open/closed state with Escape handling. Do not add cart controls to a service business without commerce functionality.

**Buttons.** Pill shape, 44px minimum target height, 20–24px horizontal padding. Primary: forest text on lime. Dark: white on forest. Ghost over photography: white text, translucent dark backing, subtle white border. Navigation uses links; form or dialog actions use buttons. Include hover, focus-visible, disabled, and loading behavior where needed. Disabled examples are inert; show loading text with `aria-busy` only when work is actually pending.

**Product / treatment card.** Light image panel, radius 16px, centered subject. Category under panel. Name at left, price at right with wrapping allowed. One meaningful link for the card rather than nested controls. For massage, keep this hierarchy but use a treatment image and a real duration/price.

**Split feature.** Equal columns with 48–72px gap; image near-square; copy limited to approximately 42 characters. One short headline, compact paragraph, optional action. A small translucent image badge is optional; use only verified credentials.

**Mosaic tile.** Photo or subtle surface, rounded clipping, text at bottom with a dark scrim. Unequal sizes supply variety. Avoid an entire page of identical boxed cards.

**Quote / testimonial.** Real quote and attribution. A video play button appears only when it can launch a real video with captions and keyboard controls. Do not invent review stars, client counts, or outcome claims.

**FAQ.** Native details/summary or accessible equivalent. Hairline separators; plus indicator switches to minus when open. Content follows the question naturally, without a fixed height. Use the business's real policies, not the unrelated filler visible in the reference.

**Newsletter / contact field.** Visible or screen-reader label, clear focus, accessible error text, and truthful success feedback from the connected service. The specimen is explicitly disabled and does not submit. In production, do not pretend an email was subscribed without delivery integration.

## 7. Photography and art direction

Use natural skin texture, macro detail, gentle directional light, warm brown backgrounds, leaves, botanical shadows, clay, and muted green props. Avoid glossy plastic skin, heavy pink filters, blue clinical stock imagery, or generic vector illustrations as primary artwork.

Hero crop: an intimate face or tactile care moment, filling the frame; a quiet area behind the text. Feature crop: one striking subject at large scale. Product cutouts: centered and consistently scaled, with ample empty space. Alternate neutral still life, human portrait, macro texture, and greenery in the mosaic.

For Pluma.life: warm treatment-room details, hands at work, linen, oils, and greenery can replace skincare assets. Preserve composition and crop. Avoid adding medical or efficacy claims from the template.

Supply desktop and mobile focal positions independently if the subject moves behind copy. Add explicit dimensions or aspect ratios. Load only hero media eagerly; lazy-load below-fold images. Prefer responsive AVIF/WebP assets with appropriate fallbacks. Decorative images have empty alt text; meaningful treatment/product images have concise descriptions.

## 8. Interaction and accessibility

Motion is proposed, not observed: use 160–240ms color/opacity transitions and at most 2px button movement. Avoid scroll-jacking, automatic video, looping marquee by default, and initial hidden states. Respect `prefers-reduced-motion`.

Use a two-tone focus indicator that remains visible on white, lime, dark green, and photo backgrounds. Normal text should reach 4.5:1 contrast and large display text 3:1. Verify text over each actual photo; a token's contrast ratio cannot establish image-background contrast. Keep tap targets at least 44×44px. Support 200% text zoom, long labels, keyboard-only use, and 320px layouts without horizontal page overflow.

## 9. Guardrails for Cursor

- Preserve the narrow desktop content column and broad whitespace.
- Use the tall regular serif for headlines and neutral sans for controls.
- Keep the base page white; off-white belongs to product panels.
- Preserve the lime/forest relationship and modest media rounding.
- Match the page's asymmetric mosaic and alternating feature rhythm.
- Do not replace the site with a generic SaaS hero, a dense dashboard, huge bold sans headings, purple gradients, glass cards, or excessive shadows.
- Do not copy the template logo, exact marketing claims, screenshots as artwork, blank mobile gaps, or faded-on-load content.
- Keep the existing application framework and functionality. Introduce only the minimum structural changes needed for the reference layout.

## 10. Acceptance checklist

- [ ] Compare at 1440px desktop, 1024px small desktop, 768px tablet, and 390px / 320px phone widths.
- [ ] Hero, ribbon, and portrait strip are full bleed; body and wide panels use their distinct containers.
- [ ] Collection is 3 columns on desktop and 1 on phones; features alternate on desktop and stack consistently on phones.
- [ ] Heading wrap, image crop, section spacing, and product name/price placement resemble the reference.
- [ ] Every photo is intentional and licensed; every claim and testimonial is approved.
- [ ] Navigation, booking, FAQ, and form behavior work with keyboard and touch.
- [ ] Body text remains readable; focus indicators and photo overlays meet contrast needs.
- [ ] Reduced motion and 200% zoom work; no missing media or accidental horizontal page scroll.
- [ ] No screenshot-capture artifacts, demo placeholders, or false submission success remains in production.
