"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FOOTER_DATA } from "@/constants/footer-links";
import {
  Show,
  UserButton,
  ClerkLoading,
  ClerkLoaded,
  ClerkDegraded,
  ClerkFailed,
} from "@clerk/nextjs";

export default function Navbar() {
  const menuSections = FOOTER_DATA.filter(
    (section) => section.category !== "Legal",
  );

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-slate-100 px-8">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between h-24">
        {/* LEFT SECTION: LOGO AND MENU */}
        <div className="flex items-center gap-12">
          {/* LOGO */}
          <Link
            href="/"
            className="flex items-center gap-1 hover:opacity-80 transition-opacity"
          >
            <span className="text-2xl font-bold tracking-tighter text-black uppercase italic">
              Stonepeak
            </span>
            <span className="text-2xl font-light tracking-tighter text-[#0070f3] uppercase">
              Partners
            </span>
          </Link>

          {/* DYNAMIC MENU FROM FOOTER LINKS */}
          <div className="hidden md:flex items-center gap-8">
            {menuSections.map((section) => (
              <div
                key={section.category}
                className="relative group"
              >
                <button className="flex items-center gap-1.5 text-[12px] font-bold text-slate-500 hover:text-[#0070f3] transition-colors uppercase tracking-[0.2em]">
                  {section.category}
                  <ChevronDown className="h-3 w-3 transition-transform group-hover:rotate-180" />
                </button>

                {/* DROPDOWN BOX */}
                <div className="absolute left-0 top-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="w-64 bg-white border border-slate-100 shadow-2xl p-4 space-y-3">
                    {section.links.map((link) => (
                      <Link
                        key={link.slug}
                        href={`/info/${link.slug}`}
                        className="block text-[11px] font-bold text-slate-400 hover:text-[#0070f3] uppercase tracking-widest transition-colors"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AUTH SECTION (RIGHT) */}
        <div className="flex items-center gap-8">
          <ClerkLoading>
            <div className="h-10 w-24 bg-slate-50 animate-pulse border border-slate-100" />
          </ClerkLoading>

          <ClerkLoaded>
            {/* Signed Out */}
            <Show when="signed-out">
              <Button
                variant="outline"
                asChild
                className="rounded-none border-[#0070f3] border-[1.5px] text-[#0070f3] bg-transparent hover:bg-[#0070f3] hover:text-white font-bold text-[12px] uppercase tracking-[0.2em] px-8 h-12 transition-all duration-300 shadow-none"
              >
                <Link href="/sign-in">Log In</Link>
              </Button>
            </Show>

            {/* Signed In */}
            <Show when="signed-in">
              <div className="flex items-center gap-10">
                <Link
                  href="/dashboard"
                  className="text-[12px] font-bold text-black hover:text-[#0070f3] transition-colors uppercase tracking-[0.2em]"
                >
                  Dashboard
                </Link>

                <UserButton
                  appearance={{
                    elements: {
                      userButtonAvatarBox:
                        "h-10 w-10 border border-[#0070f3] rounded-none hover:opacity-80 transition-all",
                      userButtonPopoverCard:
                        "bg-white border border-slate-200 shadow-xl rounded-none",
                      userButtonPopoverFooter: "hidden",
                    },
                  }}
                />
              </div>
            </Show>

            <ClerkDegraded>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Connecting...
              </span>
            </ClerkDegraded>
          </ClerkLoaded>

          <ClerkFailed>
            <span className="text-[10px] font-bold uppercase tracking-widest text-red-500">
              Offline
            </span>
          </ClerkFailed>
        </div>
      </div>
    </nav>
  );
}
