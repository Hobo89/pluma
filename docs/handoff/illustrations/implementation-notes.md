# Implementation notes

## Delivered

- Four cleaned, transparent SVGs with matching reusable React components.
- Shared dependency-free IntersectionObserver lifecycle and CSS stroke animation.
- Four distinct timing sequences, accent fades, reduced-motion handling and static fallbacks.
- A standalone `preview.html` with `preview.js`, ready to open locally without a server.
- `instructions.md`: the source-code implementation task for Cursor.
- `reference/approved-artboard.png` and the original brief, for review only.
- `preview-static.png`: a rendered side-by-side view of the final vector geometry, ordered pregnancy, relaxing, deep tissue, sports.
- `verification/lifecycle.mjs`: dependency-free behavioral checks. Run with `node verification/lifecycle.mjs` from this directory.

## Design decisions

The approved silhouettes are manually redrawn as smooth cubic Bézier paths. Intentional open endpoints and gaps are preserved. The source's tapered strokes become consistent 1.5 px rounded monoline, as requested. Each drawing includes a separate low-opacity sand gesture placed behind the dark paths. None contains the literal logo, embedded bitmap, facial detail, new massage hands or additional anatomy.

Pregnancy has three outline paths; deep tissue and sports have four each. Relaxing has seven outline paths to preserve its separate hair, shoulder and reclining-body gestures without connecting gaps absent from the artboard. Each also has one filled accent path. Assets have no filters, masks, clipping, gradients or external references.

Only below-viewport illustrations are armed. Initially visible drawings remain static to avoid a visible-to-hidden flash with slow hydration. No optional hover animation is included. The completed drawing is still and fully visible.

React and plain-template routes share the same initializer and timing source. The React route uses a tiny observer per mounted illustration; the plain-template route can observe all four through one initializer. No new runtime dependency is required beyond React when already used by the site.

## Size

| SVG | Uncompressed bytes |
| --- | ---: |
| Pregnancy | 1,215 |
| Relaxing | 2,097 |
| Deep tissue | 1,457 |
| Sports | 1,479 |
| All four SVGs | 6,248 |

All source files plus the four SVG exports total 18,902 uncompressed bytes. A production integration should select one geometry route, so it need not ship both the SVG exports and the React data module. The much larger reference artboard belongs only in the handoff, not the website bundle.

## Verification performed

- Parsed all SVG exports as XML; checked path counts and sizes.
- Rendered all four vectors together using an SVG rasterizer, inspected them visually against the selected artboard cells, and checked line weight, shape, spacing and accent consistency.
- Passed dependency-free lifecycle tests covering independent triggering, threshold behavior, one-time completion, unobserving, live reduced-motion changes, initially visible/above-viewport fallbacks, missing/failed observer initialization, cleanup, reinitialization and a server-safe entry point.
- Verified JavaScript syntax using Node's syntax checker.

## Checks requiring the target project

The pluma.life source repository was not supplied, so its cards have not been edited and placeholder assets have not been removed. The supplied React wrapper has not been compiled against the site's React/TypeScript configuration.

Chrome/Playwright execution was attempted, but browser binaries were absent and the installation download timed out. Real Chrome/Safari rendering, mobile viewport behavior, CSS animation appearance, JavaScript-disabled browsing, hydration, keyboard/click behavior, console output and measured layout shift remain integration acceptance checks for Cursor. Lifecycle tests are not a substitute for those browser checks. See the concrete checklist in `instructions.md`.
