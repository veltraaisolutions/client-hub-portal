"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRight, Shield, Activity, Zap } from "lucide-react";

export function LandingContent({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* HERO SECTION */}
      <section className="relative pt-20 pb-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] -z-10 opacity-40" />

        <div className="max-w-6xl mx-auto space-y-10">
          <div className="space-y-6 max-w-4xl">
            <Badge
              variant="outline"
              className="border-primary/30 bg-primary/5 text-primary rounded-none px-3 py-1 text-[10px] font-bold tracking-[0.2em] uppercase"
            >
              Institutional Grade Infrastructure
            </Badge>

            {/*  Header  */}
            <h1 className="text-5xl md:text-7xl font-medium tracking-tight leading-[1.1] text-foreground">
              You Face Challenges. <br />
              <span className="italic font-light text-muted-foreground block mt-1">
                We See Possibilities.
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed font-light">
              For over 50 years, we’ve invested with conviction, partnering with
              clients around the world to help them achieve their financial
              goals.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
            {!isAuthenticated ? (
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-10 h-14 text-base font-bold rounded-none w-full sm:w-auto transition-all"
                asChild
              >
                <Link href="/sign-up">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            ) : (
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/5 px-10 h-14 text-base font-bold rounded-none w-full sm:w-auto transition-all"
                asChild
              >
                <Link href="/dashboard">Access Dashboard</Link>
              </Button>
            )}
          </div>
        </div>
      </section>

      <section className="bg-secondary/50 py-24 border-y border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "About Us",
                desc: "We believe that active management is the most responsible way to invest for the long term.",
              },
              {
                icon: Activity,
                title: "Our Process",
                desc: "Honed over more than five decades, our investment process is rigorous and time-tested.",
              },
              {
                icon: Zap,
                title: "Experts",
                desc: "Meet Pacific client hub experts across the globe who are dedicated to helping you reach your goals.",
              },
            ].map((pillar, i) => (
              <div
                key={i}
                className="bg-card p-12 border border-border shadow-sm hover:shadow-md transition-shadow space-y-6"
              >
                <h3 className="text-2xl font-semibold tracking-tight text-foreground">
                  {pillar.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {pillar.desc}
                </p>
                <Link
                  href="#"
                  className="inline-flex items-center text-primary font-bold text-sm group"
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
