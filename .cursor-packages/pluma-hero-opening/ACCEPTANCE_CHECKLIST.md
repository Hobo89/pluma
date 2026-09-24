# Acceptance checklist

## Source and scope

- [ ] Original unminified source identified and edited.
- [ ] No generated/minified/deployed asset edited by hand.
- [ ] No dependency added.
- [ ] Visual design, scene selection, responsive video selection, localization, accessibility, and controller/editor API preserved.
- [ ] Animation timing unchanged.

## Readiness and fallback

- [ ] First-frame listeners/callback registered before `play()`.
- [ ] `requestVideoFrameCallback` used when available.
- [ ] Fallback `playing` signal requires current data and an unpaused video.
- [ ] `loadeddata` alone cannot produce success.
- [ ] Error, play rejection, and 1500 ms readiness timeout fail to poster.
- [ ] Readiness settles exactly once and cleans up listeners, timers, and frame callbacks.
- [ ] Stale/destroyed generations cannot mutate current state.
- [ ] Observers and resize cannot interrupt playback during `preparing`.
- [ ] Hero content cannot remain hidden on any fallback path.

## Rendering

- [ ] Selected responsive massage image is decoded without a duplicate fixed-size request.
- [ ] Head preload and image `srcset`/`sizes` agree.
- [ ] Normal reveal effects play natively.
- [ ] Editor/preview/scrubbing effects remain manually seekable.
- [ ] Identical clip-path and SVG path values are not rewritten.
- [ ] `clip-path` removed from `will-change`.
- [ ] Temporary rendering hints are cleared after completion and destruction.
- [ ] Navigation blur disabled during pending/preparing/intro and restored at completion.
- [ ] Mobile completed-state blur capped at 16 px unless an evidenced visual regression prevents it.

## Guard

- [ ] Guard executes synchronously before the application module.
- [ ] Guard applies only to `/` and `/index.html`.
- [ ] Reduced motion and Save-Data skip pending state.
- [ ] Release is idempotent.
- [ ] Watchdog fails open after 4000 ms.
- [ ] No network request remains for `/pluma-hero/boot.js`.
- [ ] CSP remains intact.

## Verification

- [ ] Formatting/lint passes.
- [ ] Type checking passes.
- [ ] Focused hero tests pass.
- [ ] Full unit test suite passes.
- [ ] Production build passes.
- [ ] Existing browser/end-to-end tests pass.
- [ ] Four scenes tested with cold and repeat loads.
- [ ] Autoplay denial and blocked video tested.
- [ ] Reduced motion and Save-Data tested.
- [ ] Slow network and CPU throttling tested.
- [ ] Visibility, back-forward cache, scrolling, resize, and orientation transitions tested.
- [ ] Editor controls tested.
- [ ] Remaining real-device coverage explicitly reported.

