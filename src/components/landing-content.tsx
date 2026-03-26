"use client";

import { Hero } from "@/components/sections/hero";
import { PioneersSection } from "@/components/sections/pioneers";
import { FeaturesSection } from "@/components/sections/features";

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
    </div>
  );
}
