import { HeroSection } from "@/components/home/hero-section";
import { SmartSearch } from "@/components/home/smart-search";
import { QuickActions } from "@/components/home/quick-actions";
import { CityStatusPanel } from "@/components/home/city-status-panel";
import { ComplaintPreview } from "@/components/home/complaint-preview";
import { GisPreview } from "@/components/home/gis-preview";
import { AnalyticsPreview } from "@/components/home/analytics-preview";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SmartSearch />
      <QuickActions />
      <CityStatusPanel />
      <ComplaintPreview />
      <GisPreview />
      <AnalyticsPreview />
    </>
  );
}
