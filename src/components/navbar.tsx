"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Show, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-black/60 backdrop-blur-xl px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold tracking-tighter hover:opacity-80 transition-opacity text-white uppercase"
        >
          ASSET<span className="text-zinc-500">CORE</span>
        </Link>

        {/* Dynamic Auth Section */}
        <div className="flex items-center gap-4">
          {/* Visible ONLY when logged out */}
          <Show when="signed-out">
            <Link href="/sign-in">
              <Button
                variant="ghost"
                className="text-zinc-400 hover:text-white hover:bg-zinc-900 font-medium"
              >
                Sign In
              </Button>
            </Link>

            <Link href="/sign-up">
              <Button className="bg-white text-black hover:bg-zinc-200 rounded-sm px-6 font-semibold shadow-sm">
                Get Started
              </Button>
            </Link>
          </Show>

          {/* Visible ONLY when logged in */}
          <Show when="signed-in">
            <div className="flex items-center gap-6">
              <Link
                href="/dashboared"
                className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
              >
                Dashboard
              </Link>

              {/* This component shows the user's profile picture and a logout menu */}
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox:
                      "h-9 w-9 border border-white/10 hover:border-white/20 transition-all",
                    userButtonPopoverCard:
                      "bg-zinc-950 border border-white/10 text-white",
                    userButtonPopoverActionButtonText: "text-zinc-400",
                    userButtonPopoverFooter: "hidden", // Optional: hides the "Powered by Clerk" link
                  },
                }}
              />
            </div>
          </Show>
        </div>
      </div>
    </nav>
  );
}
