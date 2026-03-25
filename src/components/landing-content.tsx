"use client";

import { Shield, Activity, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Hero } from "@/components/sections/hero";

export function LandingContent({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) {
  return (
    <div className="min-h-screen bg-white">
      <Hero isAuthenticated={isAuthenticated} />

      {/* PILLARS SECTION */}
      <section className="bg-[#fcfcfc] py-28 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              {
                icon: Shield,
                title: "About Us",
                slug: "who-we-are",
                desc: "We believe that active management is the most responsible way to invest for the long term.",
              },
              {
                icon: Activity,
                title: "Our Process",
                slug: "our-process",
                desc: "Honed over more than five decades, our investment process is rigorous and time-tested.",
              },
              {
                icon: Zap,
                title: "Experts",
                slug: "experts",
                desc: "Meet Pacific client hub experts across the globe who are dedicated to helping you reach your goals.",
              },
            ].map((pillar, i) => (
              <div
                key={i}
                className="group space-y-6"
              >
                <div className="w-16 h-16 bg-[#0070f3]/5 flex items-center justify-center rounded-full mb-8 group-hover:bg-[#0070f3]/10 transition-colors">
                  <pillar.icon className="h-8 w-8 text-[#0070f3]" />
                </div>
                <h3 className="text-2xl font-semibold tracking-tight text-slate-900">
                  {pillar.title}
                </h3>
                <p className="text-slate-500 text-base leading-relaxed">
                  {pillar.desc}
                </p>
                <Link
                  href={`/info/${pillar.slug}`}
                  className="inline-flex items-center text-[#0070f3] font-bold text-xs uppercase tracking-widest pt-4"
                >
                  Learn More{" "}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
