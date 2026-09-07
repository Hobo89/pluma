import { Hero } from "../components/Hero";
import { Treatments } from "../components/Treatments";
import { FeatureStory } from "../components/FeatureStory";
import { MassageTypes } from "../components/MassageTypes";
import { BenefitsMosaic } from "../components/BenefitsMosaic";
import { EditorialQuote } from "../components/EditorialQuote";
import { PromoRibbon } from "../components/PromoRibbon";
import { FAQ } from "../components/FAQ";
import { PortraitStrip } from "../components/PortraitStrip";
import { BookingCTA } from "../components/BookingCTA";
import { useLanguage } from "../context/LanguageContext";

export function HomePage() {
  const { t } = useLanguage();

  return (
    <>
      <Hero />
      <Treatments />
      <FeatureStory
        titleKey="about.title"
        descriptionKey="about.body"
        image="/assets/images/stephen.jpg"
        imageAlt={t("about.stephenPhotoAlt")}
        imagePosition="64% 32%"
        actionLabelKey="hero.learnMore"
        actionTo="/about"
      />
      <MassageTypes />
      <FeatureStory
        titleKey="studio.title"
        descriptionKey="studio.description"
        image="/assets/images/mediterranean-gradient.jpg"
        imageAlt=""
        actionLabelKey="hero.book"
        actionTo="/book"
        reverse
      />
      <BenefitsMosaic />
      <EditorialQuote />
      <PromoRibbon />
      <FAQ />
      <PortraitStrip />
      <BookingCTA />
    </>
  );
}
