import test from "node:test";
import assert from "node:assert/strict";
import { mock } from "node:test";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { waitForFirstPresentedFrame } from "../src/pluma-hero/hero.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const heroSource = readFileSync(join(root, "src/pluma-hero/hero.js"), "utf8");
const indexSource = readFileSync(join(root, "index.html"), "utf8");
const bootSource = readFileSync(join(root, "public/pluma-hero/boot.js"), "utf8");

function createFakeVideo({
  hasFrameCallback = true,
  readyState = 0,
  paused = true,
} = {}) {
  const listeners = new Map();
  let frameHandle = 0;
  const video = {
    readyState,
    paused,
    requestVideoFrameCallback: hasFrameCallback
      ? (cb) => {
          frameHandle += 1;
          video._frameCallback = cb;
          video._frameHandle = frameHandle;
          return frameHandle;
        }
      : undefined,
    cancelVideoFrameCallback: hasFrameCallback
      ? (handle) => {
          if (handle === video._frameHandle) {
            video._frameCallback = null;
            video._frameHandle = 0;
          }
        }
      : undefined,
    addEventListener(type, fn) {
      const list = listeners.get(type) || [];
      list.push(fn);
      listeners.set(type, list);
    },
    removeEventListener(type, fn) {
      const list = listeners.get(type) || [];
      listeners.set(
        type,
        list.filter((item) => item !== fn),
      );
    },
    dispatch(type) {
      for (const fn of listeners.get(type) || []) fn();
    },
    _listeners: listeners,
  };
  return video;
}

test("requestVideoFrameCallback success resolves true once", async () => {
  const video = createFakeVideo();
  const promise = waitForFirstPresentedFrame(video, 1, (token) => token === 1);
  assert.equal(typeof video._frameCallback, "function");
  video._frameCallback(0, {});
  assert.equal(await promise, true);
  // Second callback must not throw or double-settle.
  video._frameCallback?.(0, {});
});

test("error chooses poster fallback", async () => {
  const video = createFakeVideo();
  const promise = waitForFirstPresentedFrame(video, 1, () => true);
  video.dispatch("error");
  assert.equal(await promise, false);
});

test("timeout chooses poster fallback", async () => {
  mock.timers.enable({ apis: ["setTimeout"] });
  try {
    const video = createFakeVideo();
    const promise = waitForFirstPresentedFrame(video, 1, () => true);
    mock.timers.tick(1500);
    assert.equal(await promise, false);
  } finally {
    mock.timers.reset();
  }
});

test("playing fallback requires current data and unpaused video without RVFC", async () => {
  const video = createFakeVideo({
    hasFrameCallback: false,
    readyState: 1,
    paused: true,
  });
  const promise = waitForFirstPresentedFrame(video, 1, () => true);
  video.dispatch("playing");
  video.readyState = 2;
  video.paused = false;
  video.dispatch("playing");
  assert.equal(await promise, true);
});

test("loadeddata alone cannot produce success", async () => {
  mock.timers.enable({ apis: ["setTimeout"] });
  try {
    const video = createFakeVideo({ hasFrameCallback: false, readyState: 2, paused: true });
    const promise = waitForFirstPresentedFrame(video, 1, () => true);
    video.dispatch("loadeddata");
    mock.timers.tick(1500);
    assert.equal(await promise, false);
  } finally {
    mock.timers.reset();
  }
});

test("stale generation resolves false without mutating caller expectations", async () => {
  const video = createFakeVideo();
  let current = 1;
  const promise = waitForFirstPresentedFrame(video, 1, (token) => token === current);
  current = 2;
  video._frameCallback(0, {});
  assert.equal(await promise, false);
});

test("destroyed controller token resolves false", async () => {
  const video = createFakeVideo();
  const promise = waitForFirstPresentedFrame(video, 7, () => false);
  video._frameCallback(0, {});
  assert.equal(await promise, false);
});

test("preparation owns playback: syncPlayback returns during preparing", () => {
  assert.match(heroSource, /if \(phase === 'preparing'\) return;/);
  assert.match(
    heroSource,
    /Preparation owns playback until readiness settles[\s\S]*if \(phase === 'preparing'\) return;/,
  );
});

test("first-frame wait is registered before play()", () => {
  const prepareBlock = heroSource.slice(
    heroSource.indexOf("async function prepare()"),
    heroSource.indexOf("function closeMenu"),
  );
  const waitIndex = prepareBlock.indexOf("waitForFirstPresentedFrame");
  const playIndex = prepareBlock.indexOf("video.play()");
  assert.ok(waitIndex > -1 && playIndex > waitIndex);
  assert.match(prepareBlock, /const firstFrame = selected/);
  assert.match(prepareBlock, /video\.preload = 'auto'/);
});

test("readiness decodes the responsive photo currentSrc", () => {
  assert.match(
    heroSource,
    /decodeImage\(photoEl\?\.currentSrc \|\| photoEl\?\.src \|\| ''\)/,
  );
  assert.doesNotMatch(
    heroSource,
    /decodeImage\(asset\(c\.assets\.massageMedium/,
  );
});

test("ordinary intro plays reveal animations natively; scrub seeks them", () => {
  assert.match(heroSource, /seekReveals = editing/);
  assert.match(
    heroSource,
    /if \(!editing\) \{\s*for \(const animation of animations\) \{\s*animation\.currentTime = origin;\s*animation\.playbackRate = playbackRate;\s*animation\.play\(\);/,
  );
  assert.match(heroSource, /if \(seekReveals\) \{\s*animations\.forEach/);
});

test("inline boot guard is synchronous before the application module", () => {
  assert.doesNotMatch(indexSource, /\/pluma-hero\/boot\.js/);
  assert.match(indexSource, /window\.__plumaHeroBoot/);
  assert.match(indexSource, /data-ph-intro-pending/);
  assert.match(indexSource, /setTimeout\(\(\) => guard\.release\("watchdog"\), 4000\)/);
  const guardIndex = indexSource.indexOf("__plumaHeroBoot");
  const moduleIndex = indexSource.indexOf('src="/src/main.tsx"');
  assert.ok(guardIndex > -1 && moduleIndex > guardIndex);
});

test("boot guard skips reduced motion and Save-Data", () => {
  assert.match(
    indexSource,
    /prefers-reduced-motion: reduce[\s\S]*navigator\.connection\?\.saveData/,
  );
});

test("boot watchdog fails open and clears preparing on unready heroes", () => {
  assert.match(indexSource, /reason === "watchdog"/);
  assert.match(indexSource, /\.ph-hero:not\(\[data-ready\]\)/);
  assert.match(bootSource, /4000/);
  assert.match(bootSource, /window\.__plumaHeroBoot/);
});

test("boot release is idempotent", () => {
  assert.match(indexSource, /if \(guard\.status === "released"\) return;/);
});

test("will-change omits clip-path and destroy clears temporary hints", () => {
  assert.match(heroSource, /active \? 'transform, opacity' : ''/);
  assert.doesNotMatch(heroSource, /transform, opacity, clip-path/);
  assert.match(heroSource, /media\.style\.removeProperty\('will-change'\)/);
  assert.match(heroSource, /photo\.style\.removeProperty\('will-change'\)/);
  assert.match(heroSource, /clearTimeout\(prepareWatchdog\)/);
  assert.match(heroSource, /data-ph-hero-phase/);
});

test("identical clip-path and photo edge values are not rewritten", () => {
  assert.match(heroSource, /if \(media\.style\.clipPath !== clip\)/);
  assert.match(heroSource, /if \(photoPath\.getAttribute\('d'\) !== d\)/);
});
