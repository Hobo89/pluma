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
  /** Public-facing neighbourhood only. The lawful business address is unresolved. */
  address: "Pl. de les Escoles Pies, Ciutat Vella, 46001 València, Valencia",
  email: "hello@pluma.life",
  phone: undefined as string | undefined,
  timezone: "Europe/Madrid",
  socialImage: "/assets/images/hero-poster.jpg",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Pl.+de+les+Escoles+Pies,+46001+Val%C3%A8ncia,+Spain",
} as const;
