import FeaturedProperties from "./components/Featuredproperties";
import Footer from "./components/Footer";
import HeroSection from "./components/Herosection";
import Navbar from "./components/Navbar";
import { CTASection, DestinationsStrip, LegacySection } from "./components/setions";

export default function HomePage() {
  return (
    <main className="bg-[#080806] min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturedProperties />
      <LegacySection />
      <DestinationsStrip />
      <CTASection />
    </main>
  );
}