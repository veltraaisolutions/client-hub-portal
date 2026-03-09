"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Show,
  UserButton,
  ClerkLoading,
  ClerkLoaded,
  ClerkDegraded,
  ClerkFailed,
} from "@clerk/nextjs";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-md px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo  */}
        <Link
          href="/"
          className="text-2xl font-bold tracking-tighter hover:opacity-80 transition-opacity text-foreground uppercase italic"
        >
          ASSET<span className="text-primary font-light not-italic">CORE</span>
        </Link>

        {/* Auth Section */}
        <div className="flex items-center gap-4">
          {/* 1. LOADING STATE */}
          <ClerkLoading>
            <div className="flex items-center gap-4">
              <div className="h-4 w-20 bg-muted rounded animate-pulse hidden md:block" />
              <div className="h-9 w-9 bg-muted rounded-none animate-pulse border border-border" />
            </div>
          </ClerkLoading>

          {/* 2. LOADED STATE */}
          <ClerkLoaded>
            {/* Signed Out */}
            <Show when="signed-out">
              <Link href="/sign-in">
                <Button
                  variant="ghost"
                  className="text-foreground hover:text-primary hover:bg-transparent font-bold text-sm uppercase tracking-wider"
                >
                  Log In
                </Button>
              </Link>

              <Link href="/sign-up">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none px-6 font-bold shadow-sm uppercase tracking-wider">
                  Join Now
                </Button>
              </Link>
            </Show>

            {/* Signed In */}
            <Show when="signed-in">
              <div className="flex items-center gap-8">
                <Link
                  href="/dashboard"
                  className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest"
                >
                  Dashboard
                </Link>

                <UserButton
                  appearance={{
                    elements: {
                      userButtonAvatarBox:
                        "h-9 w-9 border border-border hover:border-primary transition-all rounded-none",
                      userButtonPopoverCard:
                        "bg-background border border-border text-foreground shadow-xl rounded-none",
                      userButtonPopoverActionButtonText:
                        "text-foreground font-medium",
                      userButtonPopoverFooter: "hidden",
                    },
                  }}
                />
              </div>
            </Show>

            {/* DEGRADED STATE */}
            <ClerkDegraded>
              <div className="text-[10px] text-yellow-600 uppercase tracking-widest px-2 font-bold">
                Network Latency
              </div>
            </ClerkDegraded>
          </ClerkLoaded>

          {/* 3. FAILED STATE */}
          <ClerkFailed>
            <div className="text-[10px] text-destructive uppercase tracking-widest px-2 font-bold">
              System Offline
            </div>
          </ClerkFailed>
        </div>
      </div>
    </nav>
  );
}
