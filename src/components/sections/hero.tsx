"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero({ isAuthenticated }: { isAuthenticated: boolean }) {
  return (
    <section className="relative h-[85vh] min-h-[600px] w-full flex items-center justify-center bg-[#001a33] px-6 overflow-hidden">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: `radial-gradient(circle at center, #004080 0%, #001a33 70%)`,
        }}
      />

      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-12">
        <h1 className="text-4xl md:text-7xl font-serif text-white tracking-tight leading-[1.1] drop-shadow-sm">
          Pacific Client Hub is the <br />
          dedicated wealth solutions platform.
        </h1>

        <p className="text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto font-light leading-relaxed opacity-90">
          For over 50 years, we’ve invested with conviction to help{" "}
          <br className="hidden md:block" />
          clients achieve their financial goals.
        </p>

        <div className="flex justify-center pt-4">
          <Button
            size="lg"
            className="bg-transparent border-2 border-[#ff5a5f] text-white hover:bg-[#ff5a5f] px-12 h-16 text-sm font-bold rounded-none transition-all duration-300 uppercase tracking-[0.2em] shadow-lg"
            asChild
          >
            {/* Redirects to /dashboard if logged in, otherwise /sign-in */}
            <Link href={isAuthenticated ? "/dashboard" : "/sign-in"}>
              {isAuthenticated ? "Access Dashboard" : "Connect with us"}
              <ArrowRight className="ml-3 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
