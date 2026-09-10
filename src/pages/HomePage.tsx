import { Hero } from "../components/Hero";
import { DurationChoice } from "../components/DurationChoice";
import { FeatureStory } from "../components/FeatureStory";
import { MassageTypes } from "../components/MassageTypes";
import { BenefitsMosaic } from "../components/BenefitsMosaic";
import { ClientMix } from "../components/ClientMix";
import { EditorialQuote } from "../components/EditorialQuote";
import { PromoRibbon } from "../components/PromoRibbon";
import { FAQ } from "../components/FAQ";
import { BookingCTA } from "../components/BookingCTA";
import { PageMeta } from "../components/PageMeta";
import { StickyBookingBar } from "../components/StickyBookingBar";
import { StudioFeature } from "../components/StudioFeature";
import { useLanguage } from "../context/LanguageContext";

/**
 * Booking-first order:
 * offer and availability, trust, duration choice, what the session is like,
 * reviews, then the final individual-booking call to action.
 */
export function HomePage() {
  const { t } = useLanguage();

  return (
    <>
      <PageMeta page="home" />
      <Hero />

      <FeatureStory
        titleKey="about.title"
        descriptionKey="about.body"
        image="/assets/images/stephen.jpg"
        imageAlt={t("about.stephenPhotoAlt")}
        imagePosition="64% 32%"
        actionLabelKey="hero.learnMore"
        actionTo="/about"
        badge={t("about.credential")}
      />

      <DurationChoice />

      <MassageTypes />

      <StudioFeature />

      <BenefitsMosaic />
      <ClientMix />
      <EditorialQuote />
      <PromoRibbon />
      <FAQ />
      <BookingCTA />
      <StickyBookingBar />
    </>
  );
}
