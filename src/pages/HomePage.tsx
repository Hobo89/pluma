import { Hero } from "../components/Hero";
import { StudioVideo } from "../components/StudioVideo";
import { Testimonials } from "../components/Testimonials";

export function HomePage() {
  return (
    <>
      <Hero />
      <Testimonials />
      <section className="border-t border-border bg-surface py-20 md:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <StudioVideo />
        </div>
      </section>
    </>
  );
}
