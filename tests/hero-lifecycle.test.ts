import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const heroSource = readFileSync(join(root, "src/pluma-hero/hero.js"), "utf8");
const indexSource = readFileSync(join(root, "index.html"), "utf8");

test("hero controller exposes preparing/intro/complete phases", () => {
  assert.match(heroSource, /setPhase\('preparing'\)/);
  assert.match(heroSource, /setPhase\(editing \? 'preview' : 'intro'\)/);
  assert.match(heroSource, /setPhase\('complete'\)/);
});

test("hero waits for presented frame or readiness deadline before starting", () => {
  assert.match(heroSource, /waitForFirstPresentedFrame/);
  assert.match(heroSource, /requestVideoFrameCallback/);
  assert.match(heroSource, /readinessDeadlineMs/);
  assert.match(heroSource, /readiness-deadline/);
  assert.match(heroSource, /video-frame/);
  assert.match(heroSource, /poster-fallback/);
  assert.doesNotMatch(heroSource, /addEventListener\('loadeddata'/);
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

test("index inline boot is the active guard; external boot.js is unused by entry", () => {
  assert.match(indexSource, /__plumaHeroBoot/);
  assert.match(indexSource, /watchdog/);
  assert.doesNotMatch(indexSource, /\/pluma-hero\/boot\.js/);
  assert.doesNotMatch(indexSource, /setTimeout\(skip,\s*4000\)/);
});

test("hero keeps prepare cancellation separate from playback attempts", () => {
  assert.match(heroSource, /playAttempt/);
  assert.match(heroSource, /Bumped only on destroy/);
  assert.doesNotMatch(
    heroSource,
    /function syncPlayback\(\) \{\s*const attemptToken = \+\+generation/s,
  );
});
