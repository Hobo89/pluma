import { Link } from "react-router-dom";

export function Hero() {
  return (
    <section className="py-16 md:py-20">
      <p className="mb-2 text-sm font-semibold tracking-widest text-accent uppercase">
        Massage therapy
      </p>
      <h1 className="mb-4 text-5xl leading-tight font-semibold tracking-tight md:text-6xl">
        Pluma
      </h1>
      <p className="mb-8 max-w-xl text-lg text-muted">
        Restorative massage to help you unwind, recover, and feel your best.
        Book your session online in just a few clicks.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link
          to="/book"
          className="inline-block rounded-xl bg-accent px-5 py-3 font-semibold text-white no-underline transition-colors hover:bg-accent-hover"
        >
          Book a session
        </Link>
        <Link
          to="/about"
          className="inline-block rounded-xl border border-border bg-surface px-5 py-3 font-semibold text-text no-underline transition-colors hover:border-accent hover:text-accent"
        >
          Learn more
        </Link>
      </div>
    </section>
  );
}
