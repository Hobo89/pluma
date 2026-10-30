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

export type TestimonialFocalPoint = {
  x: number;
  y: number;
};

/** Language the client wrote in. Catalan, French, Chinese, and Croatian are not Spanish or English. */
export type QuoteLocale = "en" | "es" | "ca" | "fr" | "zh" | "hr";

export type TestimonialRecord = {
  id: string;
  name: string;
  quote: string;
  locale: QuoteLocale;
  /** Site-language versions, omitted when the original is already that language. */
  translations?: Partial<Record<"en" | "es", string>>;
  image: string;
  flags: readonly TestimonialFlag[];
  areas: readonly AreaId[];
  countriesKey?: string;
  objectPosition?: string;
  quoteFontSize?: number;
  focalPoint?: TestimonialFocalPoint;
  stackedFocalPoint?: TestimonialFocalPoint;
};

/**
 * Exact client wording from the trimmed testimonials sheet.
 * Quotes stay in the language they were written in until a reader
 * reveals a site-language version on the card.
 */
export const featuredReviewId = "candice";

export const testimonials: readonly TestimonialRecord[] = [
  {
    id: "sarah",
    name: "Sarah",
    quote:
      "Je viens régulièrement me faire masser ici et j’apprécie beaucoup la technique, l’ambiance et la pression exercée pendant le massage.",
    locale: "fr",
    translations: {
      en: "I come regularly to get massages here and I really appreciate the technique, the atmosphere, and the pressure applied during the massage.",
      es: "Vengo con regularidad a recibir masajes aquí y aprecio mucho la técnica, el ambiente y la presión ejercida durante el masaje.",
    },
    image: "/testimonials/sarah.jpg",
    flags: [{ type: "emoji", glyph: "🇫🇷" }],
    countriesKey: "france",
    areas: ["fullBody"],
    objectPosition: "center 18%",
  },
  {
    id: "allison",
    name: "Allison",
    quote:
      "孕中期的按摩体验，缓解双腿疲劳与精神疲惫，度过了一段非常美好的时光！Stephen提供的环境令人安心，更棒的是他擅于倾听",
    locale: "zh",
    translations: {
      en: "A second-trimester massage that eased the tiredness in my legs and the mental fatigue. I spent a truly lovely time. The setting Stephen provides feels reassuring, and even better, he really listens.",
      es: "Un masaje en el segundo trimestre que alivió el cansancio de las piernas y la fatiga mental. Pasé un rato precioso. El ambiente que ofrece Stephen transmite tranquilidad y, mejor aún, sabe escuchar.",
    },
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
      "Després d'un projecte de feina exigent, vaig gaudir d'una sessió de massatge fantàstica amb l'Stephen. Aquella nit, vaig dormir com un nen petit i vaig poder recuperar forces!",
    locale: "ca",
    translations: {
      en: "After a demanding work project, I enjoyed a fantastic massage session with Stephen. That night I slept like a baby and was able to get my strength back.",
      es: "Después de un proyecto de trabajo exigente, disfruté de una sesión de masaje fantástica con Stephen. Esa noche dormí como un niño y pude recuperar las fuerzas.",
    },
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
    locale: "es",
    translations: {
      en: "I slept wonderfully after the session.",
    },
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
    locale: "es",
    translations: {
      en: "The massage Stephen gave me was an incredibly comforting experience. From the first moment he conveyed professionalism and calm, and as the session went on I felt all the tension leave my body, leaving a lightness and a sense of physical and mental well-being I had not felt in a long time.",
    },
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
      "Uživala sam na masaži! Oduševila me kombinacija tehnika, istovremeno je duboka i opuštajuća masaža. Stephan je vrlo pažljiv i tijekom cijelog tretmana sam se osjećala jako ugodno.",
    locale: "hr",
    translations: {
      en: "I enjoyed the massage! I loved the combination of techniques — a deep and relaxing massage at the same time. Stephen is very attentive, and I felt very comfortable throughout the whole treatment.",
      es: "¡He disfrutado del masaje! Me ha encantado la combinación de técnicas: es un masaje profundo y relajante a la vez. Stephen es muy atento y durante todo el tratamiento me he sentido muy a gusto.",
    },
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
    locale: "fr",
    translations: {
      en: "The massage I had was done very professionally, with both energy and gentleness. When I come back to Valencia I will book another.",
      es: "El masaje que recibí se hizo con mucha profesionalidad, con energía y a la vez con suavidad. Cuando vuelva a Valencia repetiré.",
    },
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
    locale: "fr",
    translations: {
      en: "A made-to-measure massage of nearly two hours in a calm, hushed atmosphere. I stayed suspended between drowsiness and the relaxation of every part of my body, through a subtle balance of tone and delicacy. A very good connection with Stephen, before as well as after the massage. I floated for the rest of the day.",
      es: "Un masaje a medida de casi dos horas en un ambiente tranquilo y recogido. Me quedé suspendido entre el sopor y la relajación de cada parte del cuerpo, en un equilibrio sutil entre tono y delicadeza. Muy buena conexión con Stephen, antes y después del masaje. Floté el resto del día.",
    },
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
    locale: "es",
    translations: {
      en: "I had a massage with Stephen and it was incredible. I will definitely come back.",
    },
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
    locale: "en",
    translations: {
      es: "Es muy poco habitual tener un masaje de hora y media o dos horas, y eso marca la diferencia. La primera hora es solo el calentamiento para por fin relajarse. Después, es puro disfrute. Y Stephen lo hace maravillosamente bien, adaptando el masaje a lo que necesitas. En mi caso fue casi por completo la parte alta de la espalda. ¿Te imaginas tanto tiempo en una zona tan pequeña? ❤️",
    },
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
    locale: "en",
    translations: {
      es: "Me he hecho dos masajes con Stephen y, de verdad, han sido de los mejores que he recibido. Se nota que está del todo presente y que disfruta con lo que hace, algo menos habitual de lo que parece. Pone mucho cuidado y atención en su trabajo, y se nota. Cada sesión se sintió pensada y personal, no un masaje estándar. Salí sintiéndome profundamente cuidada cada vez. Lo recomiendo sin dudarlo.",
    },
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
    locale: "es",
    translations: {
      en: "A phenomenal 90-minute massage, therapeutic and relaxing, which considerably improved my back pain. I felt much lighter. A good therapist: professional and empathetic.",
    },
    image: "/testimonials/carla.jpg",
    flags: [{ type: "emoji", glyph: "🇪🇸" }],
    countriesKey: "spain",
    areas: ["fullBody"],
    objectPosition: "center top",
  },
  {
    id: "jed",
    name: "Jed",
    quote:
      "I came to Stephen with a neck that had been stiff for weeks, and this massage helped so much. I really appreciate how he focuses on the parts of my body that I need help with, and will go as light or deep as I need. I'll be back!",
    locale: "en",
    translations: {
      es: "Llegué a Stephen con el cuello rígido desde hacía semanas, y este masaje me ayudó muchísimo. Valoro de verdad que se centre en las zonas que necesito y que vaya tan suave o tan profundo como haga falta. Volveré.",
    },
    image: "/testimonials/jed.jpg",
    flags: [{ type: "emoji", glyph: "🇺🇸" }],
    countriesKey: "unitedStates",
    areas: ["neck"],
    objectPosition: "center 22%",
    stackedFocalPoint: { x: 50, y: 40 },
  },
  {
    id: "candice",
    name: "Candice",
    quote:
      "Great experience! Stephen was professional, attentive, and highly skilled. He listened to my needs and focused on the areas that needed the most work. I left feeling relaxed, refreshed, and pain-free. Highly recommend!",
    locale: "en",
    translations: {
      es: "Una experiencia estupenda. Stephen fue profesional, atento y muy hábil. Escuchó lo que necesitaba y se centró en las zonas que más trabajo pedían. Salí relajada, renovada y sin dolor. Lo recomiendo mucho.",
    },
    image: "/testimonials/candice.jpg",
    flags: [
      { type: "emoji", glyph: "🇺🇸" },
      { type: "emoji", glyph: "🇮🇳" },
    ],
    countriesKey: "unitedStatesIndia",
    areas: ["face", "head", "neck", "upperBack"],
    objectPosition: "center top",
    stackedFocalPoint: { x: 50, y: 22 },
  },
];

export function testimonialById(id: string): TestimonialRecord {
  const entry = testimonials.find((item) => item.id === id);
  if (!entry) throw new Error(`No testimonial for id "${id}"`);
  return entry;
}
