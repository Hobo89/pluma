/**
 * Digital bono configuration.
 *
 * Aqua, Sand and Tree are three design choices for the same product. They are
 * not tiers, benefits or physical cards, and nothing here may present them as
 * differing in price, validity or entitlement.
 */

export type BonoDesignId = "aqua" | "sand" | "tree";

export type BonoDesign = {
  id: BonoDesignId;
  /** Proper noun, identical in both languages. */
  name: string;
  /** 376px-wide WebP, with a 2x source and a PNG fallback beside it. */
  webp: string;
  webp2x: string;
  png: string;
  width: number;
  height: number;
};

export const bonoDesigns: readonly BonoDesign[] = [
  {
    id: "aqua",
    name: "Aqua",
    webp: "/assets/bonos/bono-aqua.webp",
    webp2x: "/assets/bonos/bono-aqua@2x.webp",
    png: "/assets/bonos/bono-aqua.png",
    width: 752,
    height: 552,
  },
  {
    id: "sand",
    name: "Sand",
    webp: "/assets/bonos/bono-sand.webp",
    webp2x: "/assets/bonos/bono-sand@2x.webp",
    png: "/assets/bonos/bono-sand.png",
    width: 752,
    height: 552,
  },
  {
    id: "tree",
    name: "Tree",
    webp: "/assets/bonos/bono-tree.webp",
    webp2x: "/assets/bonos/bono-tree@2x.webp",
    png: "/assets/bonos/bono-tree.png",
    width: 752,
    height: 552,
  },
] as const;

export const defaultBonoDesign: BonoDesignId = "aqua";

/** Visual finishes for the marquee. Same voucher; colour is the only difference. */
export const bonoStripCards = [
  {
    id: "gold",
    png: "/assets/bonos/pluma-bono-gold.png",
    width: 730,
    height: 477,
  },
  {
    id: "cyan",
    png: "/assets/bonos/pluma-bono-cyan.png",
    width: 730,
    height: 477,
  },
  {
    id: "green",
    png: "/assets/bonos/pluma-bono-green.png",
    width: 730,
    height: 477,
  },
  {
    id: "pink",
    png: "/assets/bonos/pluma-bono-pink.png",
    width: 730,
    height: 477,
  },
] as const;

export function isBonoDesignId(value: unknown): value is BonoDesignId {
  return bonoDesigns.some((design) => design.id === value);
}

export function bonoDesignById(id: BonoDesignId): BonoDesign {
  const design = bonoDesigns.find((entry) => entry.id === id);
  if (!design) throw new Error(`Unknown bono design: ${id}`);
  return design;
}

/**
 * Validity lengths are owner-confirmed (5 sessions / 3 months, 10 sessions /
 * 6 months). What is *not* confirmed is when the clock starts, so the start
 * trigger stays an explicit placeholder rather than a guessed default.
 *
 * Months must be computed as calendar months in Europe/Madrid once approved;
 * do not substitute 90 or 180 days.
 */
export const VALIDITY_START_RULE = "{VALIDITY_START_RULE}" as const;

export const bonoTermsResolved = false;

/** Wallet platforms the pass could target. Each needs its own proven flag. */
export const walletPlatforms = ["apple", "google"] as const;
export type WalletPlatform = (typeof walletPlatforms)[number];
