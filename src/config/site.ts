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
  ownerEmail: "stephen@pluma.life",
  phone: undefined as string | undefined,
  timezone: "Europe/Madrid",
  socialImage: "/assets/images/og-share.jpg?v=4",
  /**
   * When false, every HTML response is `noindex, nofollow` and no sitemap is
   * published. Crawlers are still allowed to fetch pages so they can see that
   * tag and drop already-indexed URLs; blocking the crawl would leave those
   * listings stuck.
   */
  searchIndexing: false,
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Pl.+de+les+Escoles+Pies,+46001+Val%C3%A8ncia,+Spain",
  mapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3079.8013835526226!2d-0.38207579999999997!3d39.4738155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd604f4e4d0e9615%3A0xdb53b68fa89b11ce!2sPl.%20de%20les%20Escoles%20Pies%2C%20Ciutat%20Vella%2C%2046001%20Val%C3%A8ncia!5e0!3m2!1sen!2ses!4v1790275580832!5m2!1sen!2ses",
} as const;
