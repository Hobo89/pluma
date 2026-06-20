export function Hero() {
  return (
    <section className="py-16 md:py-20">
      <p className="mb-2 text-sm font-semibold tracking-widest text-accent uppercase">
        Welcome
      </p>
      <h1 className="mb-4 text-5xl leading-tight font-semibold tracking-tight md:text-6xl">
        Pluma
      </h1>
      <p className="mb-8 max-w-xl text-lg text-muted">
        A React + Tailwind starter for{" "}
        <a
          href="https://pluma.life"
          className="text-accent hover:text-accent-hover"
        >
          pluma.life
        </a>
        . Edit <code className="rounded-md border border-border bg-surface px-1.5 py-0.5 text-[0.9em]">src/App.tsx</code>{" "}
        and push to deploy.
      </p>
      <div className="flex flex-wrap gap-3">
        <a
          href="#about"
          className="inline-block rounded-xl bg-accent px-5 py-3 font-semibold text-white no-underline transition-colors hover:bg-accent-hover"
        >
          Learn more
        </a>
        <a
          href="https://github.com/Hobo89/pluma"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-xl border border-border bg-surface px-5 py-3 font-semibold text-text no-underline transition-colors hover:border-accent hover:text-accent"
        >
          View on GitHub
        </a>
      </div>
    </section>
  );
}
