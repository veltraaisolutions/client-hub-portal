"use client";

import { Hero } from "@/components/sections/hero";
import { PioneersSection } from "@/components/sections/pioneers";
import { FeaturesSection } from "@/components/sections/features";
import { CTASection } from "./sections/cta";
import { WhyNowSection } from "./sections/why-now";
import { ResourcesSection } from "./sections/resources";
import { PodcastSection } from "./sections/podcast";
import { StatsSection } from "./sections/stats";
import { IntroPlusSection } from "./sections/intro-plus";

export function LandingContent({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) {
  return (
    <div className="min-h-screen bg-white">
      <Hero isAuthenticated={isAuthenticated} />
      <PioneersSection />
      <FeaturesSection />
      <CTASection />
      <WhyNowSection />
      {/* <ResourcesSection />
      <PodcastSection />
      <StatsSection />
      <IntroPlusSection /> */}
    </div>
  );
}
