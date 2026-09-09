/**
 * Record of processing carried out through this website.
 *
 * Built from what the code actually does and what the site actually loads, not
 * from a template. Payment and wallet services are absent because none are
 * connected; they must be added here at the same time as they are integrated.
 *
 * Each field holds a translation key so the table renders in both languages.
 */

export type ProcessingEntry = {
  id: string;
  data: { en: string; es: string };
  purpose: { en: string; es: string };
  basis: { en: string; es: string };
  recipients: { en: string; es: string };
  retention: { en: string; es: string };
  /** True when the entry depends on an owner answer that is still missing. */
  pending?: boolean;
};

export const processingInventory: readonly ProcessingEntry[] = [
  {
    id: "booking",
    data: {
      en: "Name, email address, selected date, time and session length",
      es: "Nombre, correo electrónico, fecha, hora y duración de la sesión",
    },
    purpose: {
      en: "Arranging, confirming and carrying out your appointment",
      es: "Organizar, confirmar y realizar tu cita",
    },
    basis: {
      en: "Performance of a contract at your request (GDPR Art. 6(1)(b))",
      es: "Ejecución de un contrato a petición tuya (art. 6.1.b RGPD)",
    },
    recipients: {
      en: "Cal.com, which operates the booking calendar",
      es: "Cal.com, que gestiona el calendario de reservas",
    },
    retention: {
      en: "Pending: the retention period is being set with an adviser",
      es: "Pendiente: el plazo de conservación se está fijando con un asesor",
    },
    pending: true,
  },
  {
    id: "enquiry",
    data: {
      en: "Your email address and whatever you write in your message",
      es: "Tu dirección de correo y lo que escribas en el mensaje",
    },
    purpose: {
      en: "Answering an enquiry sent to the studio",
      es: "Responder a una consulta enviada al estudio",
    },
    basis: {
      en: "Steps taken at your request before a contract (GDPR Art. 6(1)(b))",
      es: "Actuaciones precontractuales a petición tuya (art. 6.1.b RGPD)",
    },
    recipients: {
      en: "The email provider that hosts the pluma inbox",
      es: "El proveedor de correo que aloja el buzón de pluma",
    },
    retention: {
      en: "Pending: the retention period is being set with an adviser",
      es: "Pendiente: el plazo de conservación se está fijando con un asesor",
    },
    pending: true,
  },
  {
    id: "preferences",
    data: {
      en: "Chosen language and light or dark theme",
      es: "Idioma elegido y tema claro u oscuro",
    },
    purpose: {
      en: "Remembering the display preference you selected",
      es: "Recordar la preferencia de visualización que elegiste",
    },
    basis: {
      en: "Strictly necessary to provide a feature you asked for; stored in your browser only",
      es: "Estrictamente necesario para una función que has solicitado; se guarda solo en tu navegador",
    },
    recipients: {
      en: "Nobody. The values never leave your device",
      es: "Nadie. Los valores no salen de tu dispositivo",
    },
    retention: {
      en: "Until you clear your browser data for this site",
      es: "Hasta que borres los datos del navegador para este sitio",
    },
  },
  {
    id: "hosting",
    data: {
      en: "IP address and browser request details, in standard server logs",
      es: "Dirección IP y datos de la petición, en registros estándar del servidor",
    },
    purpose: {
      en: "Delivering the website and keeping it secure",
      es: "Servir el sitio web y mantenerlo seguro",
    },
    basis: {
      en: "Legitimate interest in operating a working, secure website (GDPR Art. 6(1)(f))",
      es: "Interés legítimo en operar un sitio web seguro y funcional (art. 6.1.f RGPD)",
    },
    recipients: {
      en: "GitHub Pages, which hosts the site",
      es: "GitHub Pages, que aloja el sitio",
    },
    retention: {
      en: "Pending: the host's log retention has not been confirmed",
      es: "Pendiente: no se ha confirmado la conservación de registros del proveedor",
    },
    pending: true,
  },
  {
    id: "fonts",
    data: {
      en: "IP address and browser details, sent when fonts are requested",
      es: "Dirección IP y datos del navegador, al solicitar las tipografías",
    },
    purpose: {
      en: "Loading the display and body typefaces",
      es: "Cargar las tipografías de titulares y texto",
    },
    basis: {
      en: "Legitimate interest in presenting the site as designed (GDPR Art. 6(1)(f))",
      es: "Interés legítimo en presentar el sitio tal como está diseñado (art. 6.1.f RGPD)",
    },
    recipients: {
      en: "Google Fonts (fonts.googleapis.com, fonts.gstatic.com)",
      es: "Google Fonts (fonts.googleapis.com, fonts.gstatic.com)",
    },
    retention: {
      en: "Set by Google. Self-hosting the fonts would remove this entirely",
      es: "Lo determina Google. Alojar las tipografías eliminaría esto por completo",
    },
    pending: true,
  },
];
