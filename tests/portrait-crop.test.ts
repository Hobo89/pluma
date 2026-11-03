import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { testimonials } from "../src/content/testimonials.ts";
import { paddedFace, portraitCrop } from "../src/lib/portraitCrop.ts";

function contains(
  window: { x: number; y: number; width: number; height: number },
  box: { left: number; top: number; right: number; bottom: number },
) {
  return (
    window.x <= box.left + 0.002 &&
    window.y <= box.top + 0.002 &&
    window.x + window.width >= box.right - 0.002 &&
    window.y + window.height >= box.bottom - 0.002
  );
}

describe("portrait crop", () => {
  it("keeps every face inside its frame", () => {
    for (const person of testimonials) {
      const crop = portraitCrop(person.imageSize, person.face);
      assert.equal(
        contains(crop.window, paddedFace(person.face)),
        true,
        person.id,
      );
      assert.ok(crop.window.x >= -0.001, person.id);
      assert.ok(crop.window.y >= -0.001, person.id);
      assert.ok(crop.window.x + crop.window.width <= 1.001, person.id);
      assert.ok(crop.window.y + crop.window.height <= 1.001, person.id);
    }
  });

  it("uses a taller frame when a 4:3 crop would cut the face", () => {
    const jesus = testimonials.find((item) => item.id === "jesus");
    const tanja = testimonials.find((item) => item.id === "tanja");
    const charles = testimonials.find((item) => item.id === "charles");
    assert.ok(jesus && tanja && charles);
    assert.ok(portraitCrop(jesus.imageSize, jesus.face).aspectRatio < 1);
    assert.ok(portraitCrop(tanja.imageSize, tanja.face).aspectRatio < 4 / 3);
    assert.equal(
      portraitCrop(charles.imageSize, charles.face).aspectRatio,
      1.333,
    );
  });
});
