import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { testimonials } from "../src/content/testimonials.ts";
import {
  quoteRevealMs,
  quoteTokens,
  quoteTranslation,
  wordDelayMs,
} from "../src/lib/testimonialTranslation.ts";

function byId(id: string) {
  const entry = testimonials.find((item) => item.id === id);
  if (!entry) throw new Error(`Missing testimonial ${id}`);
  return entry;
}

describe("testimonial reader language", () => {
  it("translates Allison and Jordi into Spanish", () => {
    const allison = quoteTranslation(byId("allison"), "es");
    const jordi = quoteTranslation(byId("jordi"), "es");
    assert.equal(typeof allison, "string");
    assert.equal(typeof jordi, "string");
    assert.notEqual(allison, byId("allison").quote);
    assert.notEqual(jordi, byId("jordi").quote);
  });

  it("leaves a Spanish quote alone for a Spanish reader", () => {
    assert.equal(quoteTranslation(byId("jesus"), "es"), null);
    assert.equal(quoteTranslation(byId("dana"), "es"), null);
    assert.equal(quoteTranslation(byId("carla"), "es"), null);
  });

  it("leaves an English quote alone for an English reader", () => {
    assert.equal(quoteTranslation(byId("sarah"), "en"), null);
    assert.equal(quoteTranslation(byId("candice"), "en"), null);
  });

  it("translates every quote that is not already in the reader language", () => {
    for (const item of testimonials) {
      for (const language of ["en", "es"] as const) {
        const translation = quoteTranslation(item, language);
        if (item.locale === language) {
          assert.equal(translation, null, item.id);
        } else {
          assert.equal(typeof translation, "string", `${item.id} ${language}`);
          assert.notEqual(translation, item.quote);
        }
      }
    }
  });
});

describe("progressive quote timing", () => {
  it("rejoins tokens into the original quote", () => {
    const quote = "He dormido fenomenal después de la sesión.";
    const tokens = quoteTokens(quote);
    assert.equal(tokens.map((token) => token.text).join(""), quote);
    assert.ok(tokens.some((token) => token.word));
  });

  it("spreads word delays across the reveal", () => {
    const revealMs = quoteRevealMs(12);
    assert.equal(wordDelayMs(0, 12, revealMs), 0);
    assert.ok(wordDelayMs(11, 12, revealMs) > wordDelayMs(1, 12, revealMs));
    assert.ok(wordDelayMs(11, 12, revealMs) < revealMs);
  });
});
