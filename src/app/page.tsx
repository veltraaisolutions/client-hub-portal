import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Show } from "@clerk/nextjs";
import { ArrowRight, Shield, Activity, Zap } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100">
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-24 px-6">
        {/* Radial glow for depth */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-900/10 blur-[120px] rounded-full -z-10" />

        <div className="max-w-4xl mx-auto text-center space-y-10">
          <Badge
            variant="outline"
            className="border-blue-500/30 bg-blue-500/5 text-blue-400 px-4 py-1.5 rounded-full text-xs font-medium tracking-wide animate-pulse"
          >
            V1.0 IN BETA MODE
          </Badge>

          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.85] text-white">
            The future of <br /> wealth management.
          </h1>

          <p className="text-lg md:text-xl text-zinc-500 max-w-xl mx-auto leading-relaxed">
            Secure, streamlined, and built for performance. Access your
            portfolio through our high-performance client hub.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* DYNAMIC BUTTON LOGIC */}

            {/* Show this if user is NOT signed in */}
            <Show when="signed-out">
              <Button
                size="lg"
                className="bg-white text-black hover:bg-zinc-200 px-10 h-14 text-base font-semibold rounded-sm w-full sm:w-auto"
                asChild
              >
                <Link href="/sign-up">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </Show>

            {/* Show this if user IS signed in */}
            <Show when="signed-in">
              <Button
                size="lg"
                className="bg-white text-black hover:bg-zinc-200 px-10 h-14 text-base font-semibold rounded-sm w-full sm:w-auto"
                asChild
              >
                <Link href="/dashboard">
                  Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </Show>
          </div>
        </div>
      </section>

      {/* CORE PILLARS */}
      <section className="max-w-6xl mx-auto px-6 py-24 border-t border-zinc-900/50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="space-y-4 group">
            <div className="p-3 bg-zinc-900 w-fit rounded-lg border border-zinc-800 group-hover:border-blue-500/50 transition-colors">
              <Shield className="text-white h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold">Tier-1 Security</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Multi-layer encryption ensures your assets and personal identity
              remain completely private.
            </p>
          </div>

          <div className="space-y-4 group">
            <div className="p-3 bg-zinc-900 w-fit rounded-lg border border-zinc-800 group-hover:border-blue-500/50 transition-colors">
              <Activity className="text-white h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold">Live Analytics</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Monitor your total portfolio value and investment activity through
              a precision-engineered dashboard.
            </p>
          </div>

          <div className="space-y-4 group">
            <div className="p-3 bg-zinc-900 w-fit rounded-lg border border-zinc-800 group-hover:border-blue-500/50 transition-colors">
              <Zap className="text-white h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold">Rapid Execution</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Simplified workflows allow for seamless capital management without
              the traditional overhead.
            </p>
          </div>
        </div>
      </section>

      <footer className="py-16 text-center border-t border-zinc-900 text-zinc-700 text-[10px] tracking-[0.2em] uppercase">
        © 2026 AssetCore Global Infrastructure.
      </footer>
    </div>
  );
}
