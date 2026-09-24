# Cursor implementation brief: Pluma hero opening reliability

Implement and verify a focused reliability and performance fix for the homepage hero opening animation.

The live production behavior was inspected on 24 September 2026. The production bundle showed two concrete races:

1. During `preparing`, the hero starts video playback and waits for its first frame. An IntersectionObserver or resize path can call the normal playback reconciler before readiness is settled. Because `usedVideo` is still false, that reconciler pauses the same video whose first frame is being awaited.
2. The first-paint guard is loaded by dynamically appending `/pluma-hero/boot.js`. It can therefore execute after the application has mounted and the intro has begun, add `data-ph-intro-pending` late, and hide content until the watchdog releases it.

The current controller also pauses its Web Animations API reveals and manually seeks them on every `requestAnimationFrame`, while that same callback updates two SVG paths. This unnecessarily couples all reveal motion to main-thread SVG work.

## Operating rules

You must follow these rules:

- Work in the original, unminified source files. Never edit generated bundles, hashed assets, `dist`, `build`, or deployed files.
- Inspect repository instructions and the existing package scripts before editing.
- Preserve the visual design, scene randomization, feather contraction, responsive desktop/mobile video selection, navigation, language controls, reduced-motion behavior, Save-Data behavior, poster fallback, editor/scrubbing controls, and public controller API.
- Do not add a dependency.
- Do not preload all hero videos.
- Do not fetch a video as a Blob during ordinary playback. Preserve any existing Blob path that is used only for editor seeking or scrubbing.
- Do not change the animation timing in this task. Timing changes are an optional follow-up after reliability is verified.
- Do not suppress errors globally or add an arbitrary delay to conceal the race.
- Do not claim the SVG clip animation is compositor-only.
- Keep the patch limited to the hero controller, homepage boot guard, directly related hero styles, and meaningful tests.
- If the source architecture differs from the observed production behavior, implement the behavior described below using the repository's abstractions. Do not copy minified identifiers into source.

## Required discovery before editing

Find and record in your final report:

- The source component that renders `.ph-hero`, `.ph-media`, `.ph-video`, `.ph-massage-photo`, and the SVG clip paths.
- The controller functions responsible for preparation, first-frame readiness, playback reconciliation, timeline advancement, completion, resize, visibility, and destruction.
- The source of the head script that currently loads `/pluma-hero/boot.js`.
- The styles controlling `data-ph-intro-pending`, `data-phase="preparing"`, `.ph-nav`, and its backdrop filter.
- Existing tests and the package commands for type checking, unit tests, production build, and end-to-end/browser tests.

Stop and report a blocker only if the original source is absent or the repository cannot be built. A changed function name or different file layout is not a blocker.

## Required implementation

### 1. Make first-frame readiness reliable

Replace the current readiness helper with a single-settlement helper that:

- Registers its readiness listeners or callback before `play()` is called.
- Uses `HTMLVideoElement.requestVideoFrameCallback()` when available. Success means a frame reached the compositor.
- Uses `playing` as the fallback signal only when `requestVideoFrameCallback` is unavailable, and only if `readyState >= HAVE_CURRENT_DATA` and the video is not paused.
- Does not use `loadeddata` alone as proof that playback started.
- Resolves `false` on `error` or a 1500 ms timeout.
- Always settles and removes listeners, clears its timer, and cancels a pending video-frame callback when applicable.
- Resolves `false` when its preparation token is stale or the controller has been destroyed.

Use a named source-level function such as `waitForFirstPresentedFrame(video, token, isCurrent)` rather than a minified name.

### 2. Give preparation ownership of video playback

While controller phase is `preparing`, the normal playback reconciler must return without pausing, replacing, or reloading the video.

The preparation sequence must:

1. Increment/capture its generation token.
2. Establish the first-frame wait.
3. Set `preload = "auto"`, `defaultMuted = true`, `muted = true`, and `playsInline = true`.
4. Select the existing mobile or desktop source.
5. Assign the source and call `play()`, catching rejection without throwing.
6. Decode essential static assets concurrently with the video-frame wait.
7. Apply exactly one readiness outcome: video or poster fallback.

IntersectionObserver, ResizeObserver, ordinary resize, and visibility reconciliation must not interrupt this sequence. Destruction, replay, or a newer generation must invalidate it safely.

### 3. Decode the responsive image actually selected

Do not separately request a fixed medium massage asset for readiness. Wait for/decode the `.ph-massage-photo` element's selected `currentSrc`, falling back to its `src` only if `currentSrc` is empty.

Keep its existing `srcset`, `sizes`, intrinsic dimensions, `decoding="async"`, and high fetch priority unless repository evidence shows they are incorrect. Ensure the head preload uses matching `imagesrcset` and `imagesizes` values.

### 4. Decouple native reveals from the SVG frame loop

For ordinary intro playback:

- Start the photo, eyebrow, wordmark, and any equivalent opacity/transform Web Animations API effects with `.play()`.
- Set their initial `currentTime` and `playbackRate` once when the timeline starts.
- Do not assign their `currentTime` on every animation frame.

For editor/preview/scrubbing mode:

- Preserve deterministic manual seeking of those animations.
- Preserve replay, seek, speed, pause/resume, and sequence-editing behavior exposed by the existing controller API.

Continue using the existing animation-frame loop for the SVG feather and photo-edge paths. Avoid writing an identical `clip-path` style or identical SVG `d` value when it has not changed. Remove `clip-path` from `will-change`; retain only justified `transform` and `opacity` hints and clear them on completion/destruction.

### 5. Make the first-paint guard deterministic

Replace the dynamic creation of `/pluma-hero/boot.js` with an equivalent guard that executes synchronously in the document head before the application module.

The guard must:

- Run only on `/` and `/index.html`, after normalizing trailing slashes.
- Skip pending state when reduced motion is requested or Save-Data is enabled.
- Create `window.__plumaHeroBoot` and set `data-ph-intro-pending` before the application module can execute.
- Expose an idempotent `release(reason = "controller")` method.
- Remove the pending attribute and clear its timer on release.
- Fail open after 4000 ms if the controller never mounts.
- On watchdog release, also ensure a mounted-but-not-ready hero cannot remain hidden by `data-phase="preparing"`.
- Use the repository's existing CSP nonce/hash strategy if a Content Security Policy exists. Do not weaken CSP.

Remove the now-unused external boot-script request and source file only if repository references and deployment configuration confirm it is safe. Otherwise leave the file unused and explain why.

### 6. Reduce glass cost during the intro

During pending/preparing/intro phases, remove the navigation backdrop blur and give the navigation an opaque warm-ivory background. Restore the existing glass appearance after completion.

Use selectors that cover the actual navigation mount location. If the navigation is outside `.ph-hero`, use the application's existing state/class plumbing where practical. `:has()` may be progressive enhancement but must not be the sole mechanism required for correctness.

On mobile, cap the completed-state blur to 16 px unless visual regression evidence shows this materially changes the approved design. Keep the existing `prefers-reduced-transparency` behavior.

## Required tests

Add meaningful tests around state transitions rather than tests that repeat implementation details.

At minimum cover:

- First-frame callback success chooses video.
- Error, timeout, unavailable callback fallback, play rejection, stale generation, and destroyed controller choose poster fallback without leaving content hidden.
- Observer and resize callbacks during `preparing` do not pause or replace the video.
- A later generation cannot be completed by an earlier readiness result.
- Normal intro plays reveal animations natively; scrub/editor mode still seeks them deterministically.
- The guard is present before the application entry executes and releases idempotently.
- Reduced motion and Save-Data skip pending animation state.
- The watchdog fails open.
- Destruction clears timers, listeners, animation frames, video-frame callbacks, observers, and temporary `will-change` values.

Use fake timers and media API stubs where the test environment lacks browser media support. Do not add timing sleeps to the test suite.

## Required verification

Run every applicable repository command:

1. Formatting/linting.
2. Type checking.
3. Focused hero tests.
4. Full unit test suite.
5. Production build.
6. Existing end-to-end/browser tests.

Then manually verify, or provide a precise unverified checklist when the environment lacks the browsers:

- Cold load and five reloads per scene: `sky`, `trees`, `fabric`, and `water`.
- iOS Safari, macOS Safari, Android Chrome, desktop Chrome/Edge, and Firefox.
- Slow network and CPU throttling.
- Autoplay denied and video blocked.
- Reduced motion and Save-Data.
- Background/foreground, back-forward cache, scroll-away, and orientation/resize during intro.
- Editor seek, replay, speed, and sequence controls.
- No request for `/pluma-hero/boot.js`.
- No persistent pending/preparing attribute and no permanently hidden brand/photo.
- No console errors, unhandled promise rejections, or duplicate media requests.

## Acceptance criteria

The task is complete only when all of these are true:

- The hero never depends on `loadeddata` alone to declare video readiness.
- No observer can pause the preparation video before readiness settles.
- The first-paint guard cannot execute after application startup.
- Every asynchronous preparation attempt settles once and stale attempts cannot mutate current state.
- The intro always completes to visible content using either video or poster.
- Normal text/photo reveals are not manually sought every frame.
- Scrubbing/editor behavior remains functional.
- Reduced-motion, Save-Data, autoplay rejection, video error, and timeout paths fail open.
- Generated production bundles are unchanged in source control; a normal build creates them if the repository tracks build output.
- All applicable automated checks pass, or each pre-existing/environmental failure is reported with its exact command and output summary.

## Final response format

Return:

1. Files changed and the purpose of each.
2. The two races fixed and how the new state transitions prevent recurrence.
3. Tests and builds run, with pass/fail status.
4. Browser/device validation completed and what remains unverified.
5. Any measured performance difference; do not invent measurements.
6. Remaining risks, limited to evidence from the implementation or validation.

Supporting references in this package:

- `README.md` contains the production analysis.
- `controller-changes.md` maps the observed minified implementation to the intended behavior.
- `boot.inline.js` and `hero-performance.css` are illustrative references, not files to copy blindly.
- `reference-patched-bundle.mjs` is a syntax-checked comparison artifact and must never be deployed.

