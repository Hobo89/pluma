import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  quoteCharacterCount,
  quoteFontSizePx,
} from "../src/lib/quoteSize.ts";

describe("quote length to font size", () => {
  it("uses 25px for the short Allison quote", () => {
    const quote = "Had a great time, felt listened to and safe 🫶";
    assert.equal(quoteCharacterCount(quote), 45);
    assert.equal(quoteFontSizePx(quote), 25);
  });

  it("uses 15px for Sara's long quote", () => {
    const quote =
      "I've had two massages from Stephen, and they were genuinely some of the best I've ever had. You can feel that he's fully present and actually enjoys what he's doing—which isn't as common as you'd think. He brings a lot of care and attention to his work, and it shows. Each session felt thoughtful and personal rather than just a standard massage. Left feeling deeply cared for every time. Would absolutely recommend him.";
    assert.equal(quoteFontSizePx(quote), 15);
  });

  it("honors an in-range override", () => {
    assert.equal(quoteFontSizePx("Short quote", 18), 18);
  });

  it("ignores an out-of-range override", () => {
    assert.equal(quoteFontSizePx("Short quote", 12), 25);
  });

  it("normalizes whitespace before counting", () => {
    assert.equal(
      quoteCharacterCount("Had   a   great   time"),
      quoteCharacterCount("Had a great time"),
    );
  });
});
