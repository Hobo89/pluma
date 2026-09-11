export const site = {
  businessName: "pluma",
  origin: "https://pluma.life",
  logos: {
    fullColor: "/assets/images/pluma-logo-full-color.png",
    fullWhite: "/assets/images/pluma-logo-full-white.png",
    fullWhiteSvg: "/assets/images/pluma-logo-full-white.svg",
    featherOnly: "/assets/images/pluma-logo-feather-only.png",
    featherOnlySvg: "/assets/images/pluma-logo-feather-only.svg",
  },
  ownerName: "Stephen Michetti",
  /**
   * Legal identity fields are deliberately absent rather than filled with a
   * placeholder. See OWNER-INPUTS.md; the legal notice explains what is missing
   * instead of publishing an invented value.
   */
  legalName: undefined as string | undefined,
  nif: undefined as string | undefined,
  /** Public-facing neighbourhood. English copy uses Old Town, not Ciutat Vella. */
  address: "Pl. de les Escoles Pies, Old Town, 46001 València, Valencia",
  email: "hello@pluma.life",
  phone: undefined as string | undefined,
  timezone: "Europe/Madrid",
  socialImage: "/favicon.png",
  /**
   * When false, every HTML response is `noindex, nofollow` and no sitemap is
   * published. Crawlers are still allowed to fetch pages so they can see that
   * tag and drop already-indexed URLs; blocking the crawl would leave those
   * listings stuck.
   */
  searchIndexing: false,
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Pl.+de+les+Escoles+Pies,+46001+Val%C3%A8ncia,+Spain",
} as const;
