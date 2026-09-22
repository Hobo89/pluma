import { Hero } from "../components/Hero";
import { MeetStephen } from "../components/MeetStephen";
import { DurationChoice } from "../components/DurationChoice";
import { MassageTypes } from "../components/MassageTypes";
import { SafetyControl } from "../components/SafetyControl";
import { EditorialQuote } from "../components/EditorialQuote";
import { FAQ } from "../components/FAQ";
import { BookingCTA } from "../components/BookingCTA";
import { PageMeta } from "../components/PageMeta";
import { StudioFeature } from "../components/StudioFeature";

export function HomePage() {
  return (
    <>
      <PageMeta page="home" />
      <Hero />
      <MeetStephen showReview showAboutLink />
      <StudioFeature highlightTitle />
      <EditorialQuote />
      <DurationChoice />
      <MassageTypes />
      <SafetyControl />
      <FAQ />
      <BookingCTA />
    </>
  );
}
