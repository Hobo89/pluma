import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const heroSource = readFileSync(join(root, "src/pluma-hero/hero.js"), "utf8");
const bootSource = readFileSync(join(root, "public/pluma-hero/boot.js"), "utf8");

test("hero controller exposes preparing/intro/complete phases", () => {
  assert.match(heroSource, /setPhase\('preparing'\)/);
  assert.match(heroSource, /setPhase\(editing \? 'preview' : 'intro'\)/);
  assert.match(heroSource, /setPhase\('complete'\)/);
});

test("hero waits for video frame or readiness deadline before starting", () => {
  assert.match(heroSource, /requestVideoFrameCallback/);
  assert.match(heroSource, /readinessDeadlineMs/);
  assert.match(heroSource, /readiness-deadline/);
  assert.match(heroSource, /video-frame/);
  assert.match(heroSource, /poster-fallback/);
});

test("hero does not finish intro on incidental pointer or key events", () => {
  assert.doesNotMatch(
    heroSource,
    /listen\(document,'pointerdown'.*finish/s,
  );
  assert.doesNotMatch(
    heroSource,
    /listen\(document,'keydown'.*finish/s,
  );
  assert.match(heroSource, /scroll-away/);
});

test("boot watchdog no longer skips intro on interaction timers", () => {
  assert.match(bootSource, /watchdog/);
  assert.doesNotMatch(bootSource, /setTimeout\(skip,\s*4000\)/);
  assert.doesNotMatch(bootSource, /addEventListener\('scroll',\s*skip/);
});

test("hero keeps prepare cancellation separate from playback attempts", () => {
  assert.match(heroSource, /playAttempt/);
  assert.match(heroSource, /Bumped only on destroy/);
  assert.doesNotMatch(
    heroSource,
    /function syncPlayback\(\) \{\s*const attemptToken = \+\+generation/s,
  );
});
