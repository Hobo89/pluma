import { Hero } from "../components/Hero";
import { DurationChoice } from "../components/DurationChoice";
import { FeatureStory } from "../components/FeatureStory";
import { studioPhotoCluster } from "../components/PhotoCluster";
import { FirstVisit } from "../components/FirstVisit";
import { MassageTypes } from "../components/MassageTypes";
import { Treatments } from "../components/Treatments";
import { BenefitsMosaic } from "../components/BenefitsMosaic";
import { ClientMix } from "../components/ClientMix";
import { EditorialQuote } from "../components/EditorialQuote";
import { PromoRibbon } from "../components/PromoRibbon";
import { FAQ } from "../components/FAQ";
import { PortraitStrip } from "../components/PortraitStrip";
import { BonoTeaser } from "../components/BonoTeaser";
import { BookingCTA } from "../components/BookingCTA";
import { PageMeta } from "../components/PageMeta";
import { StickyBookingBar } from "../components/StickyBookingBar";
import { useLanguage } from "../context/LanguageContext";

/**
 * Booking-first order:
 * offer and availability, trust, duration choice, what the session is like,
 * reviews, first-visit and location, then a small bono teaser and the final
 * individual-booking call to action.
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

      <FeatureStory
        titleKey="studio.title"
        descriptionKey="studio.description"
        collage={studioPhotoCluster}
        collageLabelKey="studio.collageLabel"
        actionLabelKey="sticky.label"
        actionTo="/book"
        reverse
        highlights="studio"
      />

      <BenefitsMosaic />
      <ClientMix />
      <EditorialQuote />
      <PromoRibbon />
      <FirstVisit />
      <Treatments />
      <FAQ />
      <PortraitStrip />
      <BonoTeaser />
      <BookingCTA />
      <StickyBookingBar />
    </>
  );
}
