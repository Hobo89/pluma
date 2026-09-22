export const areaIds = [
  "fullBody",
  "pregnancy",
  "back",
  "neck",
  "upperBack",
  "lowerBack",
  "feet",
  "legs",
  "face",
  "head",
] as const;

export type AreaId = (typeof areaIds)[number];

export type TestimonialFlag =
  | { type: "emoji"; glyph: string }
  | { type: "image"; src: string };

export type TestimonialRecord = {
  id: string;
  name: string;
  quote: string;
  image: string;
  flags: readonly TestimonialFlag[];
  areas: readonly AreaId[];
  countriesKey?: string;
  objectPosition?: string;
};

/**
 * Exact client wording from the trimmed testimonials sheet.
 * Quotes stay in the language they were written in.
 */
export const featuredReviewId = "candice";

export const testimonials: readonly TestimonialRecord[] = [
  {
    id: "sarah",
    name: "Sarah",
    quote:
      "Regularly get massaged here and really enjoy the technique, atmosphere and strength.",
    image: "/testimonials/sarah.jpg",
    flags: [{ type: "emoji", glyph: "🇫🇷" }],
    countriesKey: "france",
    areas: ["fullBody"],
    objectPosition: "center 18%",
  },
  {
    id: "allison",
    name: "Allison",
    quote: "Had a great time, felt listened to and safe 🫶",
    image: "/testimonials/allison.jpg",
    flags: [{ type: "emoji", glyph: "🇨🇳" }],
    countriesKey: "china",
    areas: ["pregnancy"],
    objectPosition: "center 22%",
  },
  {
    id: "jordi",
    name: "Jordi",
    quote:
      "Vaig tenir una sessió increïble després d’un projecte de feina dur… vaig quedar-me adormit durant molta estona després de la sessió, es nota molt la diferència quan fas una migdiada.",
    image: "/testimonials/jordi.jpg",
    flags: [{ type: "image", src: "/assets/flags/catalonia.svg" }],
    countriesKey: "catalonia",
    areas: ["fullBody"],
    objectPosition: "center 12%",
  },
  {
    id: "jesus",
    name: "Jesus",
    quote: "He dormido fenomenal después de la sesión.",
    image: "/testimonials/jesus.jpg",
    flags: [{ type: "emoji", glyph: "🇪🇸" }],
    countriesKey: "spain",
    areas: ["fullBody"],
    objectPosition: "center 12%",
  },
  {
    id: "dana",
    name: "Dana",
    quote:
      "El masaje que me dio Stephen fue una experiencia increíblemente reconfortante; desde el primer momento transmitió profesionalidad y calma, y a medida que avanzaba la sesión sentí cómo toda la tensión de mi cuerpo desaparecía, dejándome una sensación de ligereza y bienestar tanto físico como mental que hacía tiempo no experimentaba.",
    image: "/testimonials/dana.jpg",
    flags: [{ type: "emoji", glyph: "🇦🇷" }],
    countriesKey: "argentina",
    areas: ["back", "neck", "upperBack"],
    objectPosition: "center 18%",
  },
  {
    id: "tanja",
    name: "Tanja",
    quote:
      "He disfrutado muchísimo, me ha encantado la combinación de técnicas de masaje descontracturante y relajante al mismo tiempo. Stephen es muy atento y me he sentido muy cómoda y cuidada.",
    image: "/testimonials/tanja.jpg",
    flags: [{ type: "emoji", glyph: "🇭🇷" }],
    countriesKey: "croatia",
    areas: ["fullBody"],
    objectPosition: "center 20%",
  },
  {
    id: "beatrice",
    name: "Beatrice",
    quote:
      "Le massage que j’ai eu a été fait très professionnellement, à la fois avec de l’énergie mais aussi en douceur. Quand je retournerai à VLC j’en reprendrai un.",
    image: "/testimonials/beatrice.jpg",
    flags: [{ type: "emoji", glyph: "🇧🇪" }],
    countriesKey: "belgium",
    areas: ["feet", "legs", "lowerBack", "upperBack"],
    objectPosition: "center top",
  },
  {
    id: "charles",
    name: "Charles",
    quote:
      "Un massage sur mesure pour près de 2h dans une atmosphère calme et feutrée. Je suis resté suspendu entre et la torpeur et la relaxation de chaque membre de mon corps, à travers un subtil équilibre entre tonus et delicatesse. Trés bonne connexion avec Stephen, avant comme après le massage. J'ai flotté pour le restant de la journée.",
    image: "/testimonials/charles.jpg",
    flags: [{ type: "emoji", glyph: "🇫🇷" }],
    countriesKey: "france",
    areas: ["fullBody"],
    objectPosition: "center 20%",
  },
  {
    id: "juanma",
    name: "Juanma",
    quote: "Me hice un masaje con Stephen y fue brutal. Repetiré seguro.",
    image: "/testimonials/juanma.jpg",
    flags: [{ type: "emoji", glyph: "🇪🇸" }],
    countriesKey: "spain",
    areas: ["fullBody"],
    objectPosition: "center 18%",
  },
  {
    id: "ruben",
    name: "Ruben",
    quote:
      "It’s very rare to have a 1h30 to 2h long massage and it makes the difference. The first hour is the just the warm up to finally be relaxed. After that, it’s pure joy. And Stephen does it wonderfully well, adapting his massage to your needs. For me it meant almost entirely my upper back. Can you imagine so long on such a small zone? ❤️",
    image: "/testimonials/ruben.jpg",
    flags: [{ type: "emoji", glyph: "🇧🇪" }],
    countriesKey: "belgium",
    areas: ["back", "face", "head"],
    objectPosition: "center 22%",
  },
  {
    id: "sara",
    name: "Sara",
    quote:
      "I've had two massages from Stephen, and they were genuinely some of the best I've ever had. You can feel that he's fully present and actually enjoys what he's doing—which isn't as common as you'd think. He brings a lot of care and attention to his work, and it shows. Each session felt thoughtful and personal rather than just a standard massage. Left feeling deeply cared for every time. Would absolutely recommend him.",
    image: "/testimonials/sara.jpg",
    flags: [{ type: "emoji", glyph: "🇲🇦" }],
    countriesKey: "morocco",
    areas: ["fullBody", "neck", "upperBack"],
    objectPosition: "center 18%",
  },
  {
    id: "carla",
    name: "Carla",
    quote:
      "Fenomenal masaje de 90 minutos terapéutico y relajante,que mejoró considerablemente mi dolor de espalda. Me sentí mucho más ligera. Buen terapeuta, profesional y empático.",
    image: "/testimonials/carla.jpg",
    flags: [{ type: "emoji", glyph: "🇪🇸" }],
    countriesKey: "spain",
    areas: ["fullBody"],
    objectPosition: "center top",
  },
  {
    id: "candice",
    name: "Candice",
    quote:
      "Great experience—Stephen was professional, attentive, and highly skilled. He listened to my needs and focused on the areas that needed the most work. I left feeling relaxed, refreshed, and pain-free. Highly recommend!",
    image: "/testimonials/candice.jpg",
    flags: [
      { type: "emoji", glyph: "🇺🇸" },
      { type: "emoji", glyph: "🇮🇳" },
    ],
    countriesKey: "unitedStatesIndia",
    areas: ["face", "head", "neck", "upperBack"],
    objectPosition: "center top",
  },
];

export function testimonialById(id: string): TestimonialRecord {
  const entry = testimonials.find((item) => item.id === id);
  if (!entry) throw new Error(`No testimonial for id "${id}"`);
  return entry;
}
