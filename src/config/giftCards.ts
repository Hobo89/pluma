/**
 * Gift card and passes.
 *
 * Design names and artwork files match `gift-card-designs.json`.
 * Eligible prices match `src/config/pricing.ts` and `gift-card-products.json`.
 * The website never treats a query price as payment.
 *
 * Tally form `rD529L` is the published voucher request.
 * Payment is still arranged manually after the request.
 */

export const TALLY_FORM_ID = "rD529L";

export const TALLY_FORM_PUBLISHED = true;

export const giftCardDesigns = [
  {
    label: "Forest",
    designId: "Forest",
    file: "branded_bonocard_tree.png",
  },
  {
    label: "Sand",
    designId: "Sand",
    file: "branded_bonocard_sand.png",
  },
  {
    label: "Coral",
    designId: "Coral",
    file: "branded_bonocard_tree-1.png",
  },
  {
    label: "Aqua",
    designId: "Aqua",
    file: "branded_bonocard_aqua.png",
  },
] as const;

export type GiftDesignId = (typeof giftCardDesigns)[number]["designId"];

export const defaultGiftDesign: GiftDesignId = "Forest";

const CARD_WIDTH = 752;
const CARD_HEIGHT = 552;

export function giftCardImage(file: string) {
  return {
    src: `/assets/gift-cards/${file}`,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
  };
}

export function isGiftDesignId(value: string): value is GiftDesignId {
  return giftCardDesigns.some((design) => design.designId === value);
}

export function giftDesignById(id: GiftDesignId) {
  const design = giftCardDesigns.find((entry) => entry.designId === id);
  if (!design) throw new Error(`Unknown gift card design: ${id}`);
  return design;
}

/** Official embed URL. `design_id` is an inbound preset, not the saved answer. */
export function tallyEmbedSrc(designId: GiftDesignId) {
  const url = new URL(`https://tally.so/embed/${TALLY_FORM_ID}`);
  url.searchParams.set("alignLeft", "1");
  url.searchParams.set("hideTitle", "1");
  url.searchParams.set("transparentBackground", "1");
  url.searchParams.set("dynamicHeight", "1");
  url.searchParams.set("design_id", designId);
  return url.toString();
}

export function tallyPublicSrc(designId: GiftDesignId) {
  const url = new URL(`https://tally.so/r/${TALLY_FORM_ID}`);
  url.searchParams.set("design_id", designId);
  return url.toString();
}
