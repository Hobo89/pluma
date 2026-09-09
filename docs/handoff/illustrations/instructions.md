# Cursor implementation instructions — Pluma illustrations

Implement this package in the existing pluma.life source repository. Inspect its framework, card components, styles, asset pipeline and local instructions first. Complete integration and the repository's required checks; do not stop at recommending code changes.

## Approved assets

| Existing massage card | File / geometry key | React component | Selected concept | Total reveal |
| --- | --- | --- | --- | --- |
| Embarazo | `assets/pregnancy.svg` / `pregnancy` | `MassageIllustrationPregnancy` | 01 | 1.50 s |
| Relajante y linfático | `assets/relaxing.svg` / `relaxing` | `MassageIllustrationRelaxing` | 02 | 1.85 s |
| Tejido profundo | `assets/deep-tissue.svg` / `deep-tissue` | `MassageIllustrationDeepTissue` | 02 | 1.60 s |
| Deportivo | `assets/sports.svg` / `sports` | `MassageIllustrationSports` | 03 | 1.25 s |

These are manually traced, cleaned cubic Bézier paths from `reference/approved-artboard.png`. Use the supplied geometry. Preserve the intentional open contours, gaps, positions and proportions. Do not regenerate, auto-vectorize, substitute icons, add detail, redraw poses or use the other artboard concepts. The reference's tapered raster strokes are normalized to the requested fine rounded monoline. Do not include artboard headings, captions, numbers or separators in the cards.

The pale movement gesture follows the selected drawing. It is separate geometry, not a replacement or deformation of the Pluma logo. Do not insert the orange logo into these drawings. The supplied logo itself is not modified by this package.

## Scope and preservation

- Replace only each selected massage-card illustration slot.
- Preserve existing card copy, typography, grid, rounded surface, proportions, responsive spacing, semantic markup, links, accessible names and all booking interactions.
- Preserve all testimonial photographs. Do not remove or replace them during asset cleanup.
- Do not alter pricing, booking flows, payment availability, navigation, service claims or unrelated imagery.
- Keep the existing warm card surface. SVG backgrounds are transparent; the preview's background and typography are demonstration styling only.
- Remove old illustration placeholders only after checking all imports, URLs and usages. Never bulk-delete image directories.
- Keep `reference/`, preview files, verification scripts and this handoff out of the public bundle. The reference PNG is for fidelity checks only.

## Integration route

Choose the route matching the existing project. Do not install React or an animation dependency to use this package.

### Existing React project

1. Copy `src/MassageIllustrations.jsx`, `src/illustrations.mjs`, `src/animate.mjs` and `src/pluma-illustrations.css` into the relevant source folder.
2. Import the stylesheet once through the project's permitted CSS entry, before the illustration component mounts. For Next.js, use the existing global stylesheet/layout convention.
3. Render the corresponding named component in each existing illustration slot:

```jsx
import { MassageIllustrationPregnancy } from './illustrations/MassageIllustrations.jsx';

// Inside the existing pregnancy card's existing visual container:
<MassageIllustrationPregnancy />
```

4. The wrapper is a small client component; its SVG markup can still be server-rendered. It never accesses browser globals during render. Leave the initial server and client SVG static and identical.
5. Adapt file extensions/types/import paths to the repository if needed. If converting to strict TypeScript, define the four literal `kind` values, type the SVG ref, and extend `React.CSSProperties` with the four `--pluma-*` timing properties. Preserve the actual markup and motion behavior.
6. Each mounted wrapper uses the same shared initializer and CSS. There is one observer per wrapper; four small observers in this route. If the existing card-list architecture favors a collection-level effect, call `initPlumaIllustrations(listRef.current)` once and use static markup in its child wrappers instead. Do not initialize the same nodes both ways.

### Other frontend frameworks / HTML templates

1. Inline the corresponding contents of `assets/*.svg` in the existing templates. Do not use `<img src="…svg">` for animated illustrations: the initializer and CSS need access to the paths.
2. Load `src/pluma-illustrations.css` once.
3. After all four inline SVGs have mounted, initialize their common container:

```js
import { initPlumaIllustrations } from './illustrations/animate.mjs';
const dispose = initPlumaIllustrations(massageSectionElement);
// On route/component teardown:
dispose();
```

4. Use the framework's existing mount/unmount lifecycle. Render SVG markup at build/render time; do not fetch or inject SVG strings after page load. The supplied SVGs are complete static fallbacks.

## Motion behavior to retain

- Default viewport threshold: 0.30. By default observe the SVG within each card so long card copy does not prevent it reaching the threshold. If observing the whole card is appropriate, add `data-pluma-trigger` to its ancestor; ensure that ancestor can reach 30% visibility on a short mobile viewport.
- Only illustrations below the viewport at initialization are armed. Illustrations already visible, partially visible, or above the viewport remain complete. This deliberate exception avoids visible → hidden flicker with SSR, slow scripts, scroll restoration and anchor navigation.
- Each armed illustration starts independently when it reaches the threshold. It settles permanently, unobserves after completion, and does not replay on ordinary scrolling. Full navigation/remount can reveal a new DOM instance.
- Pregnancy: upper contour leads into the belly, with the back supporting the sequence. Relaxing: overlapping contours flow through the reclining body. Deep tissue: exterior ends at 630 ms, then a 200 ms pause precedes the deeper contour. Sports: the long line travels from the lower extremity upward, then the bent limb resolves.
- All totals include the accent fade. Accent durations are 550–700 ms; it fades after the principal form is established. No hover motion, translations, loops or perpetual motion are included.
- `pathLength="1"` normalizes each stroke. CSS uses `stroke-dasharray: 1 1` and offset 1 → 0. Paths remain open, with round caps and joins. Hidden delayed strokes suppress cap dots using opacity.
- The natural state has no stroke dashing or animation. Only the installed observer callback can apply `armed`. Completion and cleanup restore the static state; one completion timer per active illustration is also a fallback if CSS animation events are absent.
- Reduced motion renders all paths and accents immediately. Changing that preference while the page is open settles all illustrations and cancels pending reveal behavior for those nodes. Switching it off does not replay them.
- Keep the observer cleanup and preference-listener cleanup. Do not replace this with scroll listeners, polling, requestAnimationFrame loops, GSAP, Lottie, video or canvas.

## Appearance and layout

The four assets use `viewBox="0 0 360 260"`, dark ink `#092707`, a 1.5 px non-scaling stroke, rounded caps/joins and a pale `#EAD5B6` accent at 0.36 opacity. Keep that accent treatment consistent. The cream is a sampled visual match chosen for this set, not a new global brand token.

SVG `width` and `height` attributes reserve the natural aspect ratio even without CSS. Shared CSS is narrowly scoped to `.pluma-illustration`. Do not make the drawings cover/crop like photographs. If the site's existing image slot uses a different ratio, retain the slot's dimensions and center the SVG with contained sizing, for example `width:100%; height:100%; object-fit:contain` on an appropriately constrained SVG, or a centered inner wrapper. Check the resulting negative space at actual card size; do not stretch the axes independently.

Keep `aria-hidden="true"` and `focusable="false"`: the card's existing service heading and link provide meaning. Do not add extra keyboard stops, nested links or redundant screen-reader labels.

`src/illustrations.mjs` is the geometry/timing source used by the React wrapper. `assets/*.svg` are matching standalone exports for other frameworks. Use one production route; avoid shipping duplicate exports unnecessarily. If future geometry changes are authorized, keep exported SVGs and the data file in sync.

## Preview and acceptance

Open `preview.html` directly in a browser; its ordinary script works from `file://`. Scroll down. Reload to replay. This preview is not a replacement page for pluma.life.

Before declaring the integration ready to merge:

1. Compare the four final forms with the selected artboard cells. Keep the main silhouette, pale gesture and negative space.
2. Use widths 320, 375, 390, 430, 768 and desktop; inspect both short and normal viewport heights. Confirm no clipping, distortion, overflow or added layout shift.
3. In Chrome and Safari, confirm below-fold cards start independently and once, all delayed paths appear, and final linework stays complete when scrolling away and back.
4. Test reduced motion at page load and when toggled during a reveal. Test JavaScript disabled, delayed scripts, unavailable IntersectionObserver, and route teardown while armed/playing.
5. Test a direct anchor/scroll-restored load at the cards: already-visible drawings should stay static without a flash.
6. Verify keyboard navigation, full card click area, touch scrolling, service links and booking actions against the original behavior. Confirm testimonial pictures remain.
7. Run the repository's required lint/type/build checks. Inspect the console and network/bundle output: no new animation dependency, raster reference in production, missing files or unintended asset duplication.
8. Report actual changed files, route chosen, checks run and any remaining limitations. Do not claim repository integration or browser checks that have not actually been performed.

See `implementation-notes.md` for package-level verification. The original detailed brief is retained in `reference/original-brief.md`; this file supplies the concrete implementation route and resolves the static-first initialization detail.
