import HeroSection from "@/components/home/HeroSection";
import MapPreview from "@/components/home/MapPreview";
import DisasterCards from "@/components/home/DisasterCards";
import InstitutionalBanners from "@/components/home/InstitutionalBanners";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MapPreview />
      <DisasterCards />
      <InstitutionalBanners />
    </>
  );
}
