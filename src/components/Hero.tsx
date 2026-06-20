import { Link } from "react-router-dom";

// Pre-encoded forward → reverse → loop (seamless ping-pong)
const VIDEO_SRC = "/videos/hero.mp4";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden="true"
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/45" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 py-32 text-center text-white">
        <p className="mb-3 text-sm font-semibold tracking-[0.2em] text-white/80 uppercase">
          Massage therapy
        </p>
        <h1 className="mb-4 text-5xl leading-tight font-semibold tracking-tight md:text-7xl">
          Pluma
        </h1>
        <p className="mx-auto mb-10 max-w-xl text-lg text-white/85">
          Restorative massage to help you unwind, recover, and feel your best.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to="/book"
            className="inline-block rounded-xl bg-accent px-6 py-3 font-semibold text-white no-underline transition-colors hover:bg-accent-hover"
          >
            Book a session
          </Link>
          <Link
            to="/about"
            className="inline-block rounded-xl border border-white/40 bg-white/10 px-6 py-3 font-semibold text-white no-underline backdrop-blur-sm transition-colors hover:bg-white/20"
          >
            Learn more
          </Link>
        </div>
      </div>
    </section>
  );
}
