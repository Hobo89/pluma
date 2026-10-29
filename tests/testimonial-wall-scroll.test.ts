import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  hoverPointerParked,
  loopProgress,
  pointerInWallFade,
  trackNudgeY,
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
