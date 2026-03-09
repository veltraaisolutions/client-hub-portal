import React from "react";
import { Lock, Construction } from "lucide-react";

const StatsPage = () => {
  return (
    <div className="p-8 space-y-12 max-w-7xl mx-auto bg-background min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10" />

      <header className="text-center space-y-4 max-w-md">
        <div className="flex justify-center">
          <div className="p-4 bg-muted/50 rounded-none border border-border relative">
            <Construction className="size-8 text-primary animate-pulse" />
            <Lock className="size-3 text-muted-foreground absolute bottom-2 right-2" />
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-primary text-[10px] uppercase tracking-[0.4em] font-black">
            System Module
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Module Under{" "}
            <span className="italic font-medium text-primary">Development</span>
          </h1>
        </div>

        <div className="pt-8">
          <div className="inline-flex items-center gap-3 px-6 py-2 border border-border bg-card shadow-sm">
            <div className="size-2 rounded-full bg-amber-500 animate-ping" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-foreground">
              Under Development
            </span>
          </div>
        </div>
      </header>
    </div>
  );
};

export default StatsPage;
