import { CalEmbed } from "../components/CalEmbed";
import { PageContainer } from "../components/PageContainer";

export function BookingPage() {
  return (
    <PageContainer>
      <p className="mb-2 text-sm font-semibold tracking-widest text-accent uppercase">
        Book a session
      </p>
      <h1 className="mb-3 text-4xl font-semibold tracking-tight md:text-5xl">
        Schedule your massage
      </h1>
      <p className="mb-8 max-w-2xl text-muted">
        Choose a time that works for you. You’ll receive a confirmation email
        with all the details after booking.
      </p>
      <div className="overflow-hidden rounded-xl border border-border bg-surface">
        <CalEmbed />
      </div>
    </PageContainer>
  );
}
