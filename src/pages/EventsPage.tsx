import { useId, useMemo, useRef, useState, type FormEvent, type ReactNode } from "react";
import { TestimonialCard } from "../components/TestimonialCard";
import { TestimonialStrip } from "../components/Testimonials";
import { BlurUpImage } from "../components/BlurUpImage";
import { PageMeta } from "../components/PageMeta";
import {
  eventBentoTestimonialIds,
  eventClientTestimonials,
  testimonialById,
} from "../content/testimonials";
import { useLanguage } from "../context/LanguageContext";
import {
  eventEnquiryErrors,
  submitEventEnquiry,
  type EventEnquiryField,
  type EventEnquiryInput,
} from "../lib/eventEnquiry";
import { useScrollFill } from "../lib/useScrollFill";

const EMPTY: EventEnquiryInput = {
  name: "",
  email: "",
  location: "",
  when: "",
  guests: "",
  gathering: "",
  plans: "",
};

const HERO = {
  room: {
    src: "/assets/images/events/massage-room.jpg",
    width: 576,
    height: 1024,
    altKey: "events.hero.roomAlt",
  },
  pool: {
    src: "/assets/images/events/poolside.jpg",
    width: 788,
    height: 1400,
    altKey: "events.hero.poolAlt",
  },
  hands: {
    src: "/assets/images/events/head-in-hands.webp",
    width: 1920,
    height: 895,
    altKey: "events.hero.handsAlt",
  },
} as const;

const GATHERINGS = ["retreat", "villa", "office", "other"] as const;

const BENEFITS = [
  { id: "atmosphere", Icon: StudioIcon },
  { id: "touch", Icon: TouchIcon },
  { id: "personal", Icon: PersonalIcon },
] as const;

export function EventsPage() {
  const { t, language } = useLanguage();
  const clients = useMemo(() => eventClientTestimonials(), []);
  const featured = useMemo(
    () => eventBentoTestimonialIds.map((id) => testimonialById(id)),
    [],
  );
  const galleryRef = useScrollFill<HTMLDivElement>({
    property: "--psl-events-arrive",
    start: 0.5,
    end: 0.14,
  });
  const formId = useId();
  const nameRef = useRef<HTMLInputElement>(null);
  const openRef = useRef<HTMLButtonElement>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [values, setValues] = useState<EventEnquiryInput>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<EventEnquiryField, string>>>(
    {},
  );
  const [notSent, setNotSent] = useState(false);

  const openForm = () => {
    setFormOpen(true);
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches
      ? "auto"
      : "smooth";
    window.setTimeout(() => {
      document.getElementById(formId)?.scrollIntoView({
        behavior,
        block: "start",
      });
      nameRef.current?.focus();
    }, 0);
  };

  const closeForm = () => {
    setFormOpen(false);
    setNotSent(false);
    openRef.current?.focus();
  };

  const update = (field: EventEnquiryField, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
    setNotSent(false);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = eventEnquiryErrors(values);
    setErrors(nextErrors);
    const firstInvalid = (
      ["name", "email", "location", "when", "guests", "plans"] as const
    ).find((field) => nextErrors[field]);
    if (firstInvalid) {
      setNotSent(false);
      document.getElementById(`events-${firstInvalid}`)?.focus();
      return;
    }

    const result = submitEventEnquiry(values);
    if (!result.delivered) setNotSent(true);
  };

  return (
    <div className="psl-page psl-container psl-events">
      <PageMeta page="events" />

      <header className="psl-events__intro">
        <h1 className="psl-display psl-events__title">{t("events.hero.title")}</h1>
        <p className="psl-copy psl-events__support">{t("events.hero.support")}</p>
      </header>

      <figure className="psl-events__hero">
        <div ref={galleryRef} className="psl-events__gallery">
          {(
            [
              ["room", "psl-events__shot--room"],
              ["pool", "psl-events__shot--pool"],
              ["hands", "psl-events__shot--hands"],
            ] as const
          ).map(([key, className]) => {
            const image = HERO[key];
            return (
              <div key={key} className={`psl-events__shot ${className}`}>
                <BlurUpImage
                  src={image.src}
                  alt={t(image.altKey)}
                  width={image.width}
                  height={image.height}
                  fill
                  eager
                  sizes="(max-width: 660px) 46vw, 32vw"
                />
              </div>
            );
          })}
        </div>
      </figure>

      <section className="psl-events__benefits" aria-label={t("events.benefits.label")}>
        {BENEFITS.map(({ id, Icon }) => (
          <article key={id} className="psl-events__benefit">
            <span className="psl-events__benefit-icon">
              <Icon />
            </span>
            <h2>{t(`events.benefits.${id}.title`)}</h2>
            <p>{t(`events.benefits.${id}.body`)}</p>
          </article>
        ))}
      </section>

      <section className="psl-events__words" aria-labelledby="events-words">
        <div>
          <h2 id="events-words" className="psl-title psl-events__section-title">
            {t("events.words.title")}
          </h2>
          <div className="psl-events__bento">
            <div className="psl-events__bento-organiser">
              <TestimonialCard
                variant="hero"
                attribution="organizer"
                roleLabel={t("events.organiser.role")}
                id="anna-michalska"
                name="Anna"
                quote={t("events.organiser.quote")}
                locale={language}
                image="/testimonials/organiser.jpg"
                imageSize={{ width: 1028, height: 1216 }}
                face={{ left: 0.36, top: 0.16, right: 0.74, bottom: 0.5 }}
                flags={[{ type: "emoji", glyph: "🇬🇧" }]}
                countriesKey="uk"
                areas={[]}
                objectPosition="center 8%"
                quoteFontSize={19}
                business="Anna Michalska art"
                socials={[
                  {
                    href: "https://www.instagram.com/annamichalskaart/",
                    label: "Instagram",
                  },
                ]}
              />
            </div>
            {featured.map((item) => (
              <div
                key={item.id}
                className={`psl-events__bento-client psl-events__bento-client--${item.id}`}
              >
                <TestimonialCard {...item} />
              </div>
            ))}
          </div>
        </div>

        <div className="psl-events__clients">
          <h3 id="events-studio-clients" className="psl-events__clients-label">
            {t("events.clients.label")}
          </h3>
          <p className="psl-events__note">{t("events.clients.note")}</p>
          <TestimonialStrip
            items={clients}
            labelledBy="events-studio-clients"
          />
        </div>
      </section>

      <section className="psl-events__practical">
        <div>
          <div className="psl-events__host">
            <BlurUpImage
              className="psl-events__avatar"
              src="/assets/images/stephen-portrait.jpg"
              alt={t("events.host.photoAlt")}
              width={763}
              height={1024}
              fill
              sizes="48px"
            />
            <div>
              <p className="psl-events__host-name">{t("events.host.name")}</p>
              <p className="psl-events__host-meta">{t("events.host.meta")}</p>
            </div>
          </div>
          <div className="psl-events__answers">
            <article className="psl-events__answer">
              <h2>{t("events.answers.experience.title")}</h2>
              <p>{t("events.answers.experience.body")}</p>
            </article>
            <article className="psl-events__answer">
              <h2>{t("events.answers.arrange.title")}</h2>
              <p>{t("events.answers.arrange.body")}</p>
            </article>
            <article className="psl-events__answer">
              <h2>{t("events.answers.cost.title")}</h2>
              <p>{t("events.answers.cost.body")}</p>
            </article>
          </div>
        </div>

        <aside className="psl-events__request">
          <h2>{t("events.request.title")}</h2>
          <p className="psl-copy">{t("events.request.body")}</p>
          <button
            ref={openRef}
            type="button"
            className="psl-button"
            aria-expanded={formOpen}
            aria-controls={formId}
            onClick={openForm}
          >
            {t("events.request.button")}
          </button>
          <p className="psl-events__micro">{t("events.request.micro")}</p>
          <p className="psl-events__region">{t("events.request.region")}</p>
        </aside>
      </section>

      <section
        id={formId}
        className="psl-events__form"
        aria-labelledby="events-form-title"
        hidden={!formOpen}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            event.preventDefault();
            closeForm();
          }
        }}
      >
        <div className="psl-events__form-head">
          <div>
            <h2 id="events-form-title">{t("events.form.title")}</h2>
            <p className="psl-copy">{t("events.form.intro")}</p>
          </div>
          <button
            type="button"
            className="psl-events__close"
            aria-label={t("events.form.close")}
            onClick={closeForm}
          >
            ×
          </button>
        </div>

        <form noValidate onSubmit={onSubmit}>
          <div className="psl-events__fields">
            <Field
              id="events-name"
              label={t("events.form.name")}
              error={errors.name ? t(errors.name) : undefined}
            >
              <input
                ref={nameRef}
                id="events-name"
                name="name"
                autoComplete="name"
                value={values.name}
                placeholder={t("events.form.namePlaceholder")}
                aria-invalid={errors.name ? true : undefined}
                aria-describedby={errors.name ? "events-name-error" : undefined}
                onChange={(event) => update("name", event.target.value)}
              />
            </Field>
            <Field
              id="events-email"
              label={t("events.form.email")}
              error={errors.email ? t(errors.email) : undefined}
            >
              <input
                id="events-email"
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                value={values.email}
                placeholder={t("events.form.emailPlaceholder")}
                aria-invalid={errors.email ? true : undefined}
                aria-describedby={errors.email ? "events-email-error" : undefined}
                onChange={(event) => update("email", event.target.value)}
              />
            </Field>
            <Field
              id="events-location"
              label={t("events.form.where")}
              error={errors.location ? t(errors.location) : undefined}
            >
              <input
                id="events-location"
                name="location"
                value={values.location}
                placeholder={t("events.form.wherePlaceholder")}
                aria-invalid={errors.location ? true : undefined}
                aria-describedby={
                  errors.location ? "events-location-error" : undefined
                }
                onChange={(event) => update("location", event.target.value)}
              />
            </Field>
            <Field
              id="events-when"
              label={t("events.form.when")}
              error={errors.when ? t(errors.when) : undefined}
            >
              <input
                id="events-when"
                name="when"
                value={values.when}
                placeholder={t("events.form.whenPlaceholder")}
                aria-invalid={errors.when ? true : undefined}
                aria-describedby={errors.when ? "events-when-error" : undefined}
                onChange={(event) => update("when", event.target.value)}
              />
            </Field>
            <Field
              id="events-guests"
              label={t("events.form.guests")}
              error={errors.guests ? t(errors.guests) : undefined}
            >
              <input
                id="events-guests"
                name="guests"
                inputMode="numeric"
                value={values.guests}
                placeholder={t("events.form.guestsPlaceholder")}
                aria-invalid={errors.guests ? true : undefined}
                aria-describedby={
                  errors.guests ? "events-guests-error" : undefined
                }
                onChange={(event) => update("guests", event.target.value)}
              />
            </Field>
            <Field
              id="events-gathering"
              label={t("events.form.gathering")}
              hint={t("events.form.optional")}
            >
              <select
                id="events-gathering"
                name="gathering"
                value={values.gathering}
                onChange={(event) => update("gathering", event.target.value)}
              >
                <option value="">{t("events.form.gatheringEmpty")}</option>
                {GATHERINGS.map((id) => (
                  <option key={id} value={id}>
                    {t(`events.form.gatherings.${id}`)}
                  </option>
                ))}
              </select>
            </Field>
            <Field
              id="events-plans"
              className="psl-events__field--wide"
              label={t("events.form.plans")}
              error={errors.plans ? t(errors.plans) : undefined}
              hintBelow={t("booking.practicalNote")}
            >
              <textarea
                id="events-plans"
                name="plans"
                value={values.plans}
                placeholder={t("events.form.plansPlaceholder")}
                aria-invalid={errors.plans ? true : undefined}
                aria-describedby={
                  errors.plans
                    ? "events-plans-error events-plans-hint"
                    : "events-plans-hint"
                }
                onChange={(event) => update("plans", event.target.value)}
              />
            </Field>
          </div>

          <div className="psl-events__submit">
            <button type="submit" className="psl-button">
              {t("events.form.submit")}
            </button>
            <p>{t("events.form.deposit")}</p>
          </div>
          <p className="psl-events__preview">{t("events.form.preview")}</p>
          {notSent ? (
            <p className="psl-events__preview" role="status">
              {t("events.form.notSent")}
            </p>
          ) : null}
        </form>
      </section>
    </div>
  );
}

function StudioIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 20V9.5A2.5 2.5 0 0 1 6.5 7h11A2.5 2.5 0 0 1 20 9.5V20" />
      <path d="M4 20h16" />
      <path d="M12 7v13" />
      <path d="M4 13.5h16" />
    </svg>
  );
}

function TouchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18 11V6a2 2 0 0 0-4 0" />
      <path d="M14 10V4a2 2 0 0 0-4 0v2" />
      <path d="M10 10.5V6a2 2 0 0 0-4 0v8" />
      <path d="M18 8a2 2 0 0 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.9-6-2.3l-3.6-3.6a2 2 0 0 1 2.8-2.8L7 15" />
    </svg>
  );
}

function PersonalIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="8.25" />
      <circle cx="12" cy="10" r="2.15" />
      <path d="M7.6 16.8c.75-2.05 2.35-3.15 4.4-3.15s3.65 1.1 4.4 3.15" />
    </svg>
  );
}

function Field({
  id,
  label,
  hint,
  hintBelow,
  error,
  className,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  hintBelow?: string;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={["psl-field", className].filter(Boolean).join(" ")}>
      <label htmlFor={id}>
        {label}
        {hint ? <span className="psl-events__optional"> {hint}</span> : null}
      </label>
      {children}
      {hintBelow ? (
        <p id={`${id}-hint`} className="psl-events__hint psl-copy">
          {hintBelow}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="psl-field__error">
          {error}
        </p>
      ) : null}
    </div>
  );
}
