# Pluma studio layout

A portable visual system for pluma.life — white editorial wellness pages with Parkinsans headings, Instrument Sans body text, lime pill actions, and forest-green footer panels.

## Start here

1. Open `preview.html` in a browser to explore the palette, typography, components, and layout patterns.
2. Import `src/styles/tokens.css`, `src/styles/pluma-studio.css`, and `src/styles/pluma-studio-overrides.css` in your app entry point.
3. Wrap pages in `class="psl"`. All component classes use the `psl-` prefix.
4. Read `DESIGN-SYSTEM.md` for the full section sequence and responsive map.
5. Use `CURSOR-PROMPT.md` as the implementation brief for Cursor.

## Files

| File | Purpose |
| --- | --- |
| `DESIGN-SYSTEM.md` | Visual specification, responsive map, and acceptance checklist |
| `styles/tokens.css` | CSS custom properties |
| `styles/pluma-studio.css` | Scoped typography, layout, and component styles |
| `tokens.json` | Machine-readable token map |
| `CURSOR-PROMPT.md` | Implementation brief |
| `examples/components.tsx` | React component examples |
| `preview.html` | Offline component specimen |
| `reference/` | Reference screenshots |

## Typography

- **Display / headings:** Parkinsans (weights 300–400)
- **Body / UI:** Instrument Sans

## Page sequence

Hero → treatments → feature stories → benefits mosaic → quote/collage → ribbon → testimonials → FAQ → portrait strip → booking CTA → footer
