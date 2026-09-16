import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  recommendedDuration,
  sessionRates,
  voucherRateFor,
} from "../src/config/pricing.ts";

describe("canonical session catalogue", () => {
  it("offers only 60, 90 and 120 minutes", () => {
    assert.deepEqual(
      sessionRates.map((rate) => rate.minutes),
      [60, 90, 120],
    );
  });

  it("uses the locked consumer prices", () => {
    assert.equal(sessionRates.find((rate) => rate.minutes === 60)?.cents, 4500);
    assert.equal(sessionRates.find((rate) => rate.minutes === 90)?.cents, 6500);
    assert.equal(sessionRates.find((rate) => rate.minutes === 120)?.cents, 8500);
  });

  it("recommends 90 minutes", () => {
    assert.equal(recommendedDuration, 90);
    assert.equal(
      sessionRates.find((rate) => rate.recommended)?.minutes,
      90,
    );
  });
});

describe("canonical voucher catalogue", () => {
  it("prices five- and ten-session cards for 60 and 90 minutes only", () => {
    assert.equal(voucherRateFor(5, 60).totalCents, 20250);
    assert.equal(voucherRateFor(5, 60).perSessionCents, 4050);
    assert.equal(voucherRateFor(5, 90).totalCents, 29250);
    assert.equal(voucherRateFor(5, 90).perSessionCents, 5850);
    assert.equal(voucherRateFor(10, 60).totalCents, 38250);
    assert.equal(voucherRateFor(10, 60).perSessionCents, 3825);
    assert.equal(voucherRateFor(10, 90).totalCents, 55250);
    assert.equal(voucherRateFor(10, 90).perSessionCents, 5525);
  });
});
