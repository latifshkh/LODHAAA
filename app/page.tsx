import HeroSection from "./components/Herosection";
import FeaturedProperties from "./components/Featuredproperties";
import { LegacySection, DestinationsStrip, CTASection } from "./components/sections";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProperties />
      <LegacySection />
      <DestinationsStrip />
      <CTASection />
    </>
  );
}