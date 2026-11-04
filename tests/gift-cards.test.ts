import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { rateFor, voucherRateFor } from "../src/config/pricing.ts";
import { giftCardDesigns, tallyEmbedSrc } from "../src/config/giftCards.ts";
import { translations } from "../src/i18n/translations.ts";
import { translations as heroCopy } from "../src/pluma-hero/hero.js";

const products = JSON.parse(
  readFileSync(new URL("../src/config/gift-card-products.json", import.meta.url), "utf8"),
) as Array<{
  code: string;
  sessions: number;
  session_minutes: number;
  total_cents: number;
}>;

const designs = JSON.parse(
  readFileSync(new URL("../src/config/gift-card-designs.json", import.meta.url), "utf8"),
) as Array<{ label: string; design_id: string; file: string }>;

describe("gift card catalogue", () => {
  it("keeps the seven eligible prices aligned with pricing.ts", () => {
    const expected = [
      ["PLM-1x60", 1, 60, rateFor(60).cents],
      ["PLM-1x90", 1, 90, rateFor(90).cents],
      ["PLM-1x120", 1, 120, rateFor(120).cents],
      ["PLM-5x60", 5, 60, voucherRateFor(5, 60).totalCents],
      ["PLM-5x90", 5, 90, voucherRateFor(5, 90).totalCents],
      ["PLM-10x60", 10, 60, voucherRateFor(10, 60).totalCents],
      ["PLM-10x90", 10, 90, voucherRateFor(10, 90).totalCents],
    ] as const;

    assert.deepEqual(
      products.map((product) => [
        product.code,
        product.sessions,
        product.session_minutes,
        product.total_cents,
      ]),
      expected.map((row) => [...row]),
    );
    assert.equal(
      products.some((product) => product.sessions > 1 && product.session_minutes === 120),
      false,
    );
  });

  it("maps the four card designs without renaming the artwork", () => {
    assert.deepEqual(
      giftCardDesigns.map((design) => [design.label, design.designId, design.file]),
      designs.map((design) => [design.label, design.design_id, design.file]),
    );
  });

  it("prefills only an allowlisted design id", () => {
    const src = new URL(tallyEmbedSrc("Coral"));
    assert.equal(src.searchParams.get("design_id"), "Coral");
    assert.equal(src.searchParams.get("hideTitle"), "1");
    assert.equal(src.searchParams.get("dynamicHeight"), "1");
    assert.equal(src.pathname, "/embed/rD529L");
  });
});

describe("gift card english copy", () => {
  it("uses the exact navigation label", () => {
    assert.equal(translations.en.nav.bonos, "gift card & passes");
    assert.equal(heroCopy.en.vouchers, "gift card & passes");
  });

  it("does not end headings with a period", () => {
    const gift = translations.en.gift;
    const headings = [
      gift.heroTitle,
      gift.benefits.rhythm.title,
      gift.benefits.unwind.title,
      gift.benefits.care.title,
      gift.personalizeTitle,
      gift.processTitle,
      gift.process.receive.title,
      gift.process.phone.title,
      gift.process.track.title,
      gift.faqTitle,
      gift.unpublishedTitle,
    ];
    for (const heading of headings) {
      assert.equal(heading.endsWith("."), false, heading);
    }
    assert.equal(gift.heroCta, "Choose your card");
    assert.equal(gift.benefits.rhythm.body.endsWith("."), true);
  });
});
