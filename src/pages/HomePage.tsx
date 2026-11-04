import { Hero } from "../components/Hero";
import { MeetStephen } from "../components/MeetStephen";
import { DurationChoice } from "../components/DurationChoice";
import { MassageTypes } from "../components/MassageTypes";
import { SafetyControl } from "../components/SafetyControl";
import { Testimonials } from "../components/Testimonials";
import { FAQ } from "../components/FAQ";
import { BookingCTA } from "../components/BookingCTA";
import { FeatureStory } from "../components/FeatureStory";
import { PageMeta } from "../components/PageMeta";
import { StudioFeature } from "../components/StudioFeature";
import { useLanguage } from "../context/LanguageContext";

function RetreatsEntry() {
  const { t } = useLanguage();

  return (
    <FeatureStory
      id="retreats"
      titleKey="events.home.title"
      descriptionKey="events.home.body"
      image="/assets/images/events/poolside.jpg"
      imageAlt={t("events.hero.poolAlt")}
      imagePosition="50% 61%"
      actionLabelKey="events.home.link"
      actionTo="/retreats"
      mediaTo="/retreats"
    />
  );
}

export function HomePage() {
  return (
    <>
      <PageMeta page="home" />
      <Hero />
      <MeetStephen showReview showAboutLink />
      <StudioFeature highlightTitle />
      <Testimonials />
      <DurationChoice />
      <MassageTypes />
      <SafetyControl />
      <FAQ />
      <RetreatsEntry />
      <BookingCTA />
    </>
  );
}
