import Link from "next/link";
import { Globe, ArrowUpRight } from "lucide-react";
import { FOOTER_DATA } from "@/constants/footer-links";

export function Footer() {
  const mainSections = FOOTER_DATA.filter(
    (section) => section.category !== "Legal",
  );
  const legalSection = FOOTER_DATA.find(
    (section) => section.category === "Legal",
  );

  return (
    <footer className="bg-[#001a33] text-white pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        {/* MAIN NAVIGATION GRID (4 Columns) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 border-b border-white/10 pb-16">
          {mainSections.map((section) => (
            <div
              key={section.category}
              className="space-y-6"
            >
              <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-400">
                {section.category}
              </h4>
              <ul className="space-y-4 text-sm font-medium">
                {section.links.map((link) => (
                  <li key={link.slug}>
                    <Link
                      href={`/info/${link.slug}`}
                      className="hover:underline underline-offset-4 opacity-80 hover:opacity-100 transition-all flex items-center"
                    >
                      {link.name}
                      {/* Show arrow icon for careers to match PIMCO style */}
                      {link.slug === "careers" && (
                        <ArrowUpRight className="inline h-3 w-3 ml-1 opacity-50" />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* LOGO AND REGIONAL SELECTOR */}
        <div className="py-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="font-bold tracking-tighter text-2xl uppercase italic">
              Stonepeak Partners
            </span>
          </div>
          <div className="flex items-center gap-6 text-xs font-bold tracking-widest uppercase text-zinc-400">
            <div className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors">
              <Globe className="h-4 w-4" />
              United Arab Emirates (ex ADGM)
            </div>
          </div>
        </div>

        {/* LEGAL DISCLOSURES & BOTTOM LINKS */}
        <div className="space-y-6 text-[11px] leading-relaxed text-zinc-500 max-w-5xl">
          <p>
            © 2026 Stonepeak Partners Global Infrastructure. All rights
            reserved. Stonepeak Partners is a trademark of Stonepeak Partners
            Global Infrastructure LLC.
          </p>
          <p>
            <b>Professional Investors Only.</b> This website is intended for
            professional investors as defined by local jurisdiction. Past
            performance is not a guarantee of future results.
          </p>

          <div className="flex flex-wrap gap-x-6 gap-y-2 font-bold uppercase tracking-widest pt-4">
            {legalSection?.links.map((item) => (
              <Link
                key={item.slug}
                href={`/info/${item.slug}`}
                className="hover:text-white transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
