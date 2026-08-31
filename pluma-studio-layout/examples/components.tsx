"use client";

// Optional React examples. Import styles/pluma-studio.css ONCE in your app entry.
// No images, routes, prices, reviews, or business claims are invented here.
import type { CSSProperties, ReactNode } from "react";

export type Action = { label: string; href: string };
export type Media = { src: string; alt: string; width: number; height: number; srcSet?: string };

export function ActionLink({ label, href, tone = "primary" }: Action & { tone?: "primary" | "dark" | "ghost" }) {
  return <a className={`psl-button${tone === "primary" ? "" : ` psl-button--${tone}`}`} href={href}>{label}</a>;
}

export function Header({ brand, homeHref, links, action }: {
  brand: string; homeHref: string; links: Action[]; action: Action;
}) {
  return <header className="psl-header psl-container">
    <a className="psl-brand" href={homeHref} aria-label={`${brand} home`}>{brand}</a>
    <nav className="psl-nav" aria-label="Main navigation">
      {links.map(link => <a href={link.href} key={link.href}>{link.label}</a>)}
    </nav>
    <ActionLink {...action} tone="dark" />
    <details className="psl-mobile-menu" onKeyDown={event => {
      if (event.key === "Escape") {
        event.currentTarget.open = false;
        event.currentTarget.querySelector("summary")?.focus();
      }
    }}>
      <summary aria-label="Navigation menu"><span aria-hidden="true">☰</span></summary>
      <nav className="psl-mobile-menu__panel" aria-label="Mobile navigation" onClick={event => {
        if ((event.target as HTMLElement).closest("a")) {
          const details = event.currentTarget.closest("details");
          if (details) details.open = false;
        }
      }}>
        {links.map(link => <a href={link.href} key={link.href}>{link.label}</a>)}
        <ActionLink {...action} />
      </nav>
    </details>
  </header>;
}

export function Hero({ title, image, primary, secondary, header, focalPoint = "50% 50%", mobileFocalPoint = "60% 50%" }: {
  title: string; image: Media; primary: Action; secondary?: Action; header: ReactNode;
  focalPoint?: string; mobileFocalPoint?: string;
}) {
  const style = { "--psl-focal": focalPoint, "--psl-focal-mobile": mobileFocalPoint } as CSSProperties;
  return <section className="psl-hero" style={style}>
    <img className="psl-hero__image" {...image} sizes="100vw" loading="eager" fetchPriority="high" />
    {header}
    <div className="psl-hero__body psl-container">
      <h1 className="psl-display">{title}</h1>
      <div className="psl-actions"><ActionLink {...primary} />{secondary && <ActionLink {...secondary} tone="ghost" />}</div>
    </div>
  </section>;
}

export function CollectionCard({ name, category, price, image, href }: {
  name: string; category: string; price: string; image: Media; href: string;
}) {
  return <article className="psl-product">
    <a href={href} className="psl-product__link">
      <div className="psl-product__image"><img {...image} loading="lazy" sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 991px) 30vw, 22vw" /></div>
      <div className="psl-product__meta">
        <span className="psl-product__category">{category}</span>
        <h3 className="psl-product__name">{name}</h3><span className="psl-product__price">{price}</span>
      </div>
    </a>
  </article>;
}

export function FeatureStory({ title, description, image, action, reverse = false, badge }: {
  title: string; description: string; image: Media; action?: Action; reverse?: boolean; badge?: string;
}) {
  return <section className={`psl-feature psl-container psl-section${reverse ? " psl-feature--reverse" : ""}`}>
    <div className="psl-feature__body">
      <h2 className="psl-title">{title}</h2><p className="psl-copy">{description}</p>
      {action && <ActionLink {...action} />}
    </div>
    <figure className="psl-feature__media">
      <img {...image} loading="lazy" sizes="(max-width: 767px) calc(100vw - 40px), 40vw" />
      {badge && <figcaption className="psl-badge">{badge}</figcaption>}
    </figure>
  </section>;
}

type BenefitSlot = "proof" | "leaf" | "landscape" | "texture" | "portrait";
export type Benefit = { slot: BenefitSlot; title: string; image?: Media };
export function BenefitsMosaic({ title, description, items }: { title: string; description: string; items: Benefit[] }) {
  // Supply one item per slot for the five-card reference composition.
  return <section className="psl-container psl-section">
    <div className="psl-section-head psl-section-head--center"><h2 className="psl-title">{title}</h2><p className="psl-copy">{description}</p></div>
    <div className="psl-bento">{items.map(item => <article className={`psl-tile psl-tile--${item.slot}`} key={item.slot}>
      {item.image && <img {...item.image} loading="lazy" sizes="(max-width: 767px) calc(100vw - 40px), 30vw" />}
      <h3>{item.title}</h3>
    </article>)}</div>
  </section>;
}

export function EditorialQuote({ quote, attribution, images }: { quote: string; attribution: string; images: [Media, Media, Media] }) {
  return <section className="psl-container psl-section">
    <figure className="psl-quote"><span className="psl-quote__mark" aria-hidden="true">“</span>
      <blockquote>{quote}</blockquote><figcaption>{attribution}</figcaption>
    </figure>
    <div className="psl-collage">{images.map((image, index) => <img key={`${image.src}-${index}`} {...image} loading="lazy" sizes="(max-width: 767px) 30vw, 22vw" />)}</div>
  </section>;
}

export function Ribbon({ message }: { message: string }) {
  return <div className="psl-ribbon"><p className="psl-sr-only">{message}</p>
    <div className="psl-ribbon__track" aria-hidden="true">{Array.from({ length: 12 }, (_, i) => <span key={i}>{message} ·</span>)}</div>
  </div>;
}

export function TestimonialPortraits({ title, items }: { title: string; items: { name: string; image: Media; quote?: string }[] }) {
  return <section className="psl-container psl-section">
    <div className="psl-section-head psl-section-head--center"><h2 className="psl-title">{title}</h2></div>
    <div className="psl-testimonials">{items.map(item => <figure className="psl-testimonial" key={item.name}>
      <img className="psl-testimonial__media" {...item.image} loading="lazy" sizes="(max-width: 767px) calc(100vw - 40px), 34vw" />
      <figcaption>{item.name}{item.quote && <blockquote>{item.quote}</blockquote>}</figcaption>
    </figure>)}</div>
  </section>;
}

export function FAQ({ title = "Frequently asked questions", items }: {
  title?: string; items: { id: string; question: string; answer: string }[];
}) {
  return <section className="psl-faq psl-container psl-section">
    <h2 className="psl-title">{title}</h2>
    <div>{items.map(item => <details key={item.id}>
      <summary>{item.question}<span className="psl-faq__icon" aria-hidden="true" /></summary><p>{item.answer}</p>
    </details>)}</div>
  </section>;
}

export function PortraitStrip({ label, images }: { label: string; images: Media[] }) {
  return <div className="psl-gallery" role="region" aria-label={label} tabIndex={0}>
    {images.map((image, index) => <img {...image} key={`${image.src}-${index}`} loading="lazy" sizes="(max-width: 767px) 160px, 17vw" />)}
  </div>;
}

export function BookingCTA({ title, image, action }: { title: string; image: Media; action: Action }) {
  return <section className="psl-cta psl-container psl-container--wide">
    <img className="psl-cta__image" {...image} loading="lazy" sizes="(max-width: 991px) 95vw, 73vw" />
    <h2 className="psl-display">{title}</h2><ActionLink {...action} />
  </section>;
}

export function Footer({ brand, title, links, legal, contact }: {
  brand: string; title: string; links: Action[]; legal: ReactNode; contact: ReactNode;
}) {
  // contact can be your already-connected newsletter form or contact information.
  return <footer className="psl-footer psl-container psl-container--wide">
    <div className="psl-footer__top"><div className="psl-stack"><h2>{title}</h2>{contact}</div>
      <nav className="psl-footer__links" aria-label="Footer navigation">{links.map(link => <a key={link.href} href={link.href}>{link.label}</a>)}</nav>
    </div>
    <div className="psl-footer__utility">{legal}</div>
    <div className="psl-footer__wordmark" aria-hidden="true">{brand}</div>
  </footer>;
}

/* Composition (use your real content):
<div className="psl">
  <a href="#main" className="psl-skip">Skip to content</a>
  <Hero ... header={<Header ... />} />
  <main id="main" tabIndex={-1}>
    <section className="psl-container psl-section--roomy">
      <div className="psl-section-head"><h2 className="psl-title">...</h2><p className="psl-copy">...</p></div>
      <div className="psl-product-grid">{...CollectionCard instances...}</div>
    </section>
    <FeatureStory ... /><FeatureStory ... reverse />
    <BenefitsMosaic ... /><EditorialQuote ... />
    <Ribbon ... /><TestimonialPortraits ... /><FAQ ... />
    <div className="psl-section"><PortraitStrip ... /></div>
    <BookingCTA ... />
  </main>
  <Footer ... />
</div>
*/
