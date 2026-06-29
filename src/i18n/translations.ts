export type Language = "en" | "es";

export const translations = {
  en: {
    meta: {
      description:
        "pluma — restorative massage in a calm home studio. Book your session with Stephen online.",
    },
    nav: {
      about: "About",
      book: "Book",
      contact: "Contact",
      main: "Main",
    },
    language: {
      label: "Language",
      en: "English",
      es: "Spanish",
    },
    theme: {
      toLight: "Switch to light mode",
      toDark: "Switch to dark mode",
    },
    hero: {
      eyebrow: "Home studio massage",
      tagline:
        "Restorative massage in a private home studio — unwind, recover, and feel your best.",
      book: "Book a session",
      learnMore: "Learn more",
    },
    about: {
      eyebrow: "Your masseur",
      title: "About pluma",
      body: "pluma is a calm, private home studio offering thoughtful, personalized massage therapy. No waiting room, no rush — just a quiet space where every session is tailored to you, whether you need deep tissue work, relaxation, or recovery support.",
      stephen:
        "I'm Stephen, your masseur. I welcome you into my home studio with the same care I bring to every session — warm, professional, and focused entirely on what your body needs.",
      stephenPhotoAlt: "Stephen, masseur at pluma home studio",
    },
    booking: {
      eyebrow: "Book a session",
      title: "Schedule your visit",
      description:
        "Choose a time that works for you. You'll receive a confirmation email with directions to the home studio and everything you need before your appointment.",
    },
    contact: {
      title: "Contact",
      body: "Add a contact form here — Web3Forms or Formspree work great with static deploys. Replace this section when you are ready.",
    },
    cal: {
      notConfigured: "Cal.com not configured yet",
      instructions: "Add your booking link to",
      inFile: "in a",
      file: "file (e.g.",
    },
    footer: {
      copyright: "pluma",
    },
    testimonials: {
      eyebrow: "Testimonials",
      title: "What clients say",
      carla: {
        name: "Carla M.",
        quote:
          "I left feeling completely renewed. The home studio is so calming and every session feels tailored to exactly what my body needs.",
      },
      sara: {
        name: "Sara L.",
        quote:
          "The best massage I've had in years. Thoughtful, unhurried, and I slept better that night than I have in months.",
      },
      candice: {
        name: "Candice R.",
        quote:
          "Warm, professional, and genuinely caring. pluma has become part of my monthly self-care routine.",
      },
      beatrice: {
        name: "Beatrice H.",
        quote:
          "I came in tense and left floating. The private home setting and quiet atmosphere make all the difference.",
      },
    },
    studio: {
      eyebrow: "The studio",
      title: "A calm home studio",
      description:
        "Step inside the space where sessions take place — a private, peaceful room designed for rest and recovery.",
      videoLabel: "Tour of the pluma home studio",
    },
  },
  es: {
    meta: {
      description:
        "pluma — masaje restaurativo en un tranquilo estudio en casa. Reserva tu sesión con Stephen en línea.",
    },
    nav: {
      about: "Sobre nosotros",
      book: "Reservar",
      contact: "Contacto",
      main: "Principal",
    },
    language: {
      label: "Idioma",
      en: "Inglés",
      es: "Español",
    },
    theme: {
      toLight: "Cambiar a modo claro",
      toDark: "Cambiar a modo oscuro",
    },
    hero: {
      eyebrow: "Masaje en estudio en casa",
      tagline:
        "Masaje restaurativo en un estudio privado en casa — relájate, recupérate y siéntete mejor.",
      book: "Reservar sesión",
      learnMore: "Saber más",
    },
    about: {
      eyebrow: "Tu masajista",
      title: "Sobre pluma",
      body: "pluma es un estudio tranquilo y privado en casa que ofrece masaje terapéutico personalizado. Sin sala de espera, sin prisas — solo un espacio silencioso donde cada sesión se adapta a ti, ya sea tejido profundo, relajación o recuperación.",
      stephen:
        "Soy Stephen, tu masajista. Te recibo en mi estudio en casa con el mismo cuidado que pongo en cada sesión — cálido, profesional y centrado en lo que tu cuerpo necesita.",
      stephenPhotoAlt: "Stephen, masajista en el estudio en casa pluma",
    },
    booking: {
      eyebrow: "Reservar sesión",
      title: "Agenda tu visita",
      description:
        "Elige el horario que te convenga. Recibirás un correo de confirmación con indicaciones al estudio en casa y todo lo que necesitas antes de tu cita.",
    },
    contact: {
      title: "Contacto",
      body: "Añade un formulario de contacto aquí — Web3Forms o Formspree funcionan muy bien con sitios estáticos. Sustituye esta sección cuando estés listo.",
    },
    cal: {
      notConfigured: "Cal.com aún no está configurado",
      instructions: "Añade tu enlace de reservas en",
      inFile: "en un archivo",
      file: "(p. ej.",
    },
    footer: {
      copyright: "pluma",
    },
    testimonials: {
      eyebrow: "Testimonios",
      title: "Lo que dicen nuestros clientes",
      carla: {
        name: "Carla M.",
        quote:
          "Salí sintiéndome completamente renovada. El estudio en casa es tan tranquilo y cada sesión se adapta exactamente a lo que mi cuerpo necesita.",
      },
      sara: {
        name: "Sara L.",
        quote:
          "El mejor masaje que he tenido en años. Atento, sin prisas, y dormí mejor esa noche que en meses.",
      },
      candice: {
        name: "Candice R.",
        quote:
          "Cálida, profesional y con un cuidado genuino. pluma ya forma parte de mi rutina mensual de autocuidado.",
      },
      beatrice: {
        name: "Beatrice H.",
        quote:
          "Llegué tensa y salí flotando. El entorno privado en casa y el ambiente tranquilo marcan la diferencia.",
      },
    },
    studio: {
      eyebrow: "El estudio",
      title: "Un estudio tranquilo en casa",
      description:
        "Entra en el espacio donde tienen lugar las sesiones — una habitación privada y pacífica diseñada para el descanso y la recuperación.",
      videoLabel: "Recorrido del estudio en casa pluma",
    },
  },
} as const;

export type TranslationKey = keyof typeof translations.en;

function getNestedValue(
  obj: Record<string, unknown>,
  path: string,
): string | undefined {
  return path.split(".").reduce<unknown>((current, key) => {
    if (current && typeof current === "object" && key in current) {
      return (current as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj) as string | undefined;
}

export function translate(language: Language, key: string): string {
  const value =
    getNestedValue(translations[language], key) ??
    getNestedValue(translations.en, key);

  return value ?? key;
}

export function detectLanguage(): Language {
  const stored = localStorage.getItem("language");
  if (stored === "en" || stored === "es") return stored;

  const browserLanguages = [
    navigator.language,
    ...(navigator.languages ?? []),
  ];

  const prefersSpanish = browserLanguages.some((lang) =>
    lang.toLowerCase().startsWith("es"),
  );

  return prefersSpanish ? "es" : "en";
}
