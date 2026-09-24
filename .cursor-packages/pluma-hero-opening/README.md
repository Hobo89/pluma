# Pluma hero — suggested performance patch

## Cursor handoff

Open this folder as Cursor context, then paste the contents of `CURSOR_PROMPT.md` into a new agent chat. The binding implementation specification is `CURSOR_IMPLEMENTATION.md`; the matching project rule is `.cursor/rules/pluma-hero-opening.mdc`; and `ACCEPTANCE_CHECKLIST.md` is the completion gate.

Copy these instruction files into the target source repository, preserving the `.cursor/rules` path. The remaining files in this folder are production-analysis references. Cursor must implement against the target repository's original source and must not deploy `reference-patched-bundle.mjs`.

Inspected 24 September 2026: https://pluma.life/, /pluma-hero/boot.js, /assets/index-CPIK3q96.js and /assets/index-NAiT6F1Q.css. This is an analysis of fetched production code, not a reproduced browser performance trace. The browser connection failed in this session. No website was changed.

## Findings

1. **Confirmed readiness race.** Preparation calls `video.play()` while `I` (usedVideo) is false. The initial IntersectionObserver callback calls `Ve()`, which pauses when `!I`. Resize callbacks can do the same. That interferes with the playback being tested. `loadeddata` is accepted as success even when playback has been paused, so a static frame may pass readiness. The proposed change gives preparation exclusive ownership of playback and waits for a compositor frame where the API is supported.
2. **Confirmed boot ordering race.** The head dynamically inserts boot.js, which executes asynchronously. If the app mounts first, its optional release call does nothing; boot.js can subsequently hide the brand and photo during an already running intro. The eight-second guard later removes that hiding. This can explain timing-dependent reload behavior. Inline the tiny guard before the application module.
3. **Confirmed main-thread dependency; performance impact needs profiling.** All three reveal animations are paused and manually advanced every requestAnimationFrame. That same callback transforms an SVG clip path and rewrites a second SVG path. A busy main thread therefore affects the mask and all reveals together. Play opacity/transform animations natively during ordinary playback; retain seeking only for the editor.
4. **Confirmed unnecessary asset work.** Readiness explicitly loads massage-1280.webp even when the responsive image selects 640 or 1920. Decode the image's selected currentSrc. Align the preload and image sizes with the actual layout in the source.
5. **Rendering hypothesis.** A 48px backdrop blur overlaps the full-screen changing video and clip. Temporarily replacing that glass with an opaque ivory background should lower rendering cost, but measure on Safari and Android to confirm.
6. The animation intentionally delays the photo until 2.8 seconds and the brand until 3.05 seconds after readiness. With a 1.5-second readiness budget, full reveal is about 5.25 seconds after controller startup. The preparation watchdog can extend this. A pause near the end is not necessarily a network wait: once the intro begins, its timeline does not await media.

## Apply

- Replace the dynamic head loader for `/pluma-hero/boot.js` with the contents of `boot.inline.js` inside a script tag. Keep it before the application module. If a Content Security Policy is present, use its existing nonce/hash mechanism.
- Port the nine replacements in `controller-changes.md` into the original hero controller and rebuild. The deployed identifiers are provided for locating the corresponding source functions. This retains scene randomization, mobile sources, the feather outline, timing controls, reduced motion, and poster fallback.
- Append `hero-performance.css` after the existing hero stylesheet. The temporary opaque nav is an intentional small visual tradeoff.
- `reference-patched-bundle.mjs` is a syntax-checked reference showing all controller changes together. Do not deploy it directly: original sources, hashed assets, and any integrity/cache references should be rebuilt normally.

## Optional timing adjustment

After verifying the fixes, shorten the existing configuration from `{hold:300, contract:2500, reveal:700, brandOffset:250}` to `{hold:150, contract:1600, reveal:500, brandOffset:0}`. This makes the photo and brand begin together at 1.75 seconds and finish at 2.25 seconds after readiness. It changes the pacing; it is not a substitute for fixing the races.

## Media delivery follow-up

The page already chooses separate desktop and mobile MP4 files and already includes muted, playsinline and loop. Keep these. The patch sets preload to auto only when motion is allowed and preparation starts; autoplay can still be denied, in which case the poster should animate normally.

Check all four scene pairs, not only sky. Verify MP4 fast-start metadata, H.264 compatibility, reasonable mobile dimensions/bitrate, byte-range support and cache headers. These asset/server properties were not measured in this review. Do not fetch each video as a Blob in normal playback; the existing Blob path is for editing/scrubbing and should remain there. Do not preload all eight videos.

## Validation before release

Syntax checks passed for the reference bundle and inline guard. This does not establish smoothness or cross-browser correctness. Test the rebuilt source on real iOS Safari, macOS Safari, Android Chrome, desktop Chrome/Edge and Firefox:

- Cold cache and repeat reloads; test each `?ph-scene=sky|trees|fabric|water` separately.
- Throttled connection and CPU: video or poster contracts continuously; photo/brand reveal without a long hidden interval.
- Block boot.js: it should no longer be requested. Delay the application bundle: the inline guard must release safely.
- Deny autoplay, block video, and enable reduced motion/data saving: content remains accessible, no endless preparation.
- Background/foreground, back-forward cache, scroll away and rotate during intro: final layout is correct and no replay or hidden content remains.
- Test editor seek/replay/speed controls after changing normal playback to native animations.
- Use a performance recording to check long tasks, dropped frames and paint cost. The SVG clip still needs main-thread work; if it remains the bottleneck, prototype a static feather mask on a transformed wrapper with inverse video scaling as a separate visual change. Do not claim SVG clip updates are GPU-only.

## References

- Live source: https://pluma.life/assets/index-CPIK3q96.js
- Live guard: https://pluma.life/pluma-hero/boot.js
- First presented video frame: https://developer.mozilla.org/en-US/docs/Web/API/HTMLVideoElement/requestVideoFrameCallback
- Autoplay rejection handling: https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play
- Rendering cost and transform/opacity: https://web.dev/articles/animations-guide
