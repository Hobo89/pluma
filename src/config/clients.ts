export const clientMix = {
  femalePercent: 70,
  malePercent: 30,
} as const;

export type ClientMix = typeof clientMix;
