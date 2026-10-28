import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { lqipSrc } from "../src/lib/lqip.ts";

describe("lqipSrc", () => {
  it("maps a jpeg path onto the ffmpeg placeholder", () => {
    assert.equal(
      lqipSrc("/testimonials/candice.jpg"),
      "/testimonials/candice.lqip.jpg",
    );
  });

  it("strips cache-busting query strings", () => {
    assert.equal(
      lqipSrc("/assets/images/studio-room.jpg?v=v5-2026-09-23"),
      "/assets/images/studio-room.lqip.jpg",
    );
  });

  it("leaves an existing placeholder path unchanged", () => {
    assert.equal(
      lqipSrc("/testimonials/candice.lqip.jpg"),
      "/testimonials/candice.lqip.jpg",
    );
  });
});
