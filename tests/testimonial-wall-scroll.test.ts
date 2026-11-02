import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  hoverPointerParked,
  loopProgress,
  pointerInWallFade,
  trackCenterDelta,
  trackNudgeY,
  wheelScrollDelta,
  wrapLoopOffset,
  loopedShift,
} from "../src/lib/testimonialWallScroll.ts";

describe("testimonial wall nudge", () => {
  const safeTop = 100;
  const safeBottom = 700;

  it("leaves a card that is already fully inside", () => {
    assert.equal(trackNudgeY(140, 420, safeTop, safeBottom), 0);
  });

  it("moves a bottom-clipped card up until it clears the fade", () => {
    assert.equal(trackNudgeY(480, 860, safeTop, safeBottom), -160);
  });

  it("moves a top-clipped card down until it clears the fade", () => {
    assert.equal(trackNudgeY(40, 280, safeTop, safeBottom), 60);
  });

  it("pins a card taller than the opening to the top", () => {
    assert.equal(trackNudgeY(80, 900, safeTop, safeBottom), 20);
  });
});

describe("horizontal strip centering", () => {
  it("leaves a card whose midpoint already matches the viewport", () => {
    assert.equal(trackCenterDelta(100, 300, 0, 400), 0);
  });

  it("moves a card that sits to the right back to the middle", () => {
    assert.equal(trackCenterDelta(250, 450, 0, 400), -150);
  });

  it("moves a card that sits to the left toward the middle", () => {
    assert.equal(trackCenterDelta(-50, 150, 0, 400), 150);
  });
});

describe("looped shift", () => {
  it("keeps a short move inside one cycle", () => {
    assert.deepEqual(loopedShift(-100, -20, 400), { from: -100, to: -120 });
    assert.deepEqual(loopedShift(-30, 50, 400), { from: -430, to: -380 });
    assert.deepEqual(loopedShift(-390, -30, 400), { from: 10, to: -20 });
  });

  it("preserves the distance the card travels", () => {
    for (const [current, delta] of [
      [-30, 50],
      [-390, -30],
      [-100, -20],
    ] as const) {
      const { from, to } = loopedShift(current, delta, 400);
      assert.equal(to - from, delta);
    }
  });
});

describe("edge hover guards", () => {
  it("treats the top and bottom fades as a dead zone", () => {
    assert.equal(pointerInWallFade(110, 100, 800, 40), true);
    assert.equal(pointerInWallFade(770, 100, 800, 40), true);
    assert.equal(pointerInWallFade(140, 100, 800, 40), true);
    assert.equal(pointerInWallFade(200, 100, 800, 40), false);
    assert.equal(pointerInWallFade(400, 100, 800, 0), false);
  });

  it("treats a pointer that has not moved as parked", () => {
    assert.equal(hoverPointerParked(100, 500, 100, 500), true);
    assert.equal(hoverPointerParked(104, 503, 100, 500), true);
    assert.equal(hoverPointerParked(112, 500, 100, 500), false);
  });
});

describe("marquee loop progress", () => {
  it("maps the start and the loop point onto the same cycle", () => {
    assert.equal(loopProgress(0, 400), 0);
    assert.equal(loopProgress(-400, 400), 0);
    assert.equal(loopProgress(-100, 400), 0.25);
  });

  it("wraps a nudge that passes the loop seam", () => {
    assert.ok(Math.abs(loopProgress(40, 400) - 0.9) < 1e-10);
    assert.ok(Math.abs(loopProgress(-440, 400) - 0.1) < 1e-10);
  });
});

describe("free scroll wrapping", () => {
  it("keeps a drag inside one marquee cycle", () => {
    assert.equal(wrapLoopOffset(0, 400), 0);
    assert.equal(wrapLoopOffset(-400, 400), 0);
    assert.equal(wrapLoopOffset(-100, 400), -100);
    assert.equal(wrapLoopOffset(40, 400), -360);
    assert.equal(wrapLoopOffset(-440, 400), -40);
  });

  it("matches loop progress before and after wrapping", () => {
    const wrapped = (offset: number) =>
      loopProgress(wrapLoopOffset(offset, 400), 400);
    assert.ok(Math.abs(wrapped(40) - loopProgress(40, 400)) < 1e-10);
    assert.ok(Math.abs(wrapped(-440) - loopProgress(-440, 400)) < 1e-10);
  });
});

describe("wheel scroll direction", () => {
  it("moves a vertical column against the wheel", () => {
    assert.equal(wheelScrollDelta("y", 0, 120), -120);
    assert.equal(wheelScrollDelta("y", 40, -30), 30);
  });

  it("lets a horizontal strip follow the stronger delta", () => {
    assert.equal(wheelScrollDelta("x", 0, 80), -80);
    assert.equal(wheelScrollDelta("x", 50, 10), -50);
  });
});
