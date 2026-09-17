import { Hero } from "../components/Hero";
import { DurationChoice } from "../components/DurationChoice";
import { FeatureStory } from "../components/FeatureStory";
import { MassageTypes } from "../components/MassageTypes";
import { BenefitsMosaic } from "../components/BenefitsMosaic";
import { SafetyControl } from "../components/SafetyControl";
import { EditorialQuote } from "../components/EditorialQuote";
import { PromoRibbon } from "../components/PromoRibbon";
import { FAQ } from "../components/FAQ";
import { BookingCTA } from "../components/BookingCTA";
import { PageMeta } from "../components/PageMeta";
import { StickyBookingBar } from "../components/StickyBookingBar";
import { StudioFeature } from "../components/StudioFeature";
import { useLanguage } from "../context/LanguageContext";

export function HomePage() {
  const { t } = useLanguage();

  return (
    <>
      <PageMeta page="home" />
      <Hero />
      <DurationChoice />

      <FeatureStory
        titleKey="about.title"
        titleHighlightKey="about.titleHighlight"
        descriptionKey="about.body"
        trustKey="about.languages"
        image="/assets/images/stephen.jpg"
        imageAlt={t("about.stephenPhotoAlt")}
        imagePosition="64% 32%"
        portrait="/assets/images/stephen-portrait.jpg"
        portraitAlt={t("about.stephenPhotoAlt")}
        actionLabelKey="hero.learnMore"
        actionTo="/about"
        mediaTo="/about"
      />

      <StudioFeature highlightTitle />
      <MassageTypes />
      <BenefitsMosaic />
      <SafetyControl />
      <EditorialQuote />
      <PromoRibbon />
      <FAQ />
      <BookingCTA />
      <StickyBookingBar />
    </>
  );
}
