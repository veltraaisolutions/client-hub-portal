import Link from "next/link";
import { Globe, ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#001a33] text-white pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        {/* MAIN NAVIGATION GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 border-b border-white/10 pb-16">
          <div className="space-y-6">
            <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-400">
              Investments
            </h4>
            <ul className="space-y-4 text-sm font-medium">
              <li>
                <Link
                  href="#"
                  className="hover:underline underline-offset-4"
                >
                  Investment Strategies
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:underline underline-offset-4"
                >
                  Alternatives
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:underline underline-offset-4"
                >
                  Asset-Based Finance
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:underline underline-offset-4"
                >
                  Sustainable Investing
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-400">
              Tools & Resources
            </h4>
            <ul className="space-y-4 text-sm font-medium">
              <li>
                <Link
                  href="#"
                  className="hover:underline underline-offset-4"
                >
                  Resource Centre
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:underline underline-offset-4"
                >
                  Education & Engagement
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:underline underline-offset-4"
                >
                  Ways to Invest
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-400">
              Insights
            </h4>
            <ul className="space-y-4 text-sm font-medium">
              <li>
                <Link
                  href="#"
                  className="hover:underline underline-offset-4"
                >
                  Latest Insights
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:underline underline-offset-4"
                >
                  Market Commentary
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:underline underline-offset-4"
                >
                  Secular Outlook
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-400">
              About Us
            </h4>
            <ul className="space-y-4 text-sm font-medium">
              <li>
                <Link
                  href="#"
                  className="hover:underline underline-offset-4"
                >
                  Who We Are
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:underline underline-offset-4"
                >
                  Our Process
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:underline underline-offset-4"
                >
                  Our Offices
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:underline underline-offset-4"
                >
                  Careers <ArrowUpRight className="inline h-3 w-3 ml-1" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* LOGO AND REGIONAL SELECTOR */}
        <div className="py-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="font-bold tracking-tighter text-2xl uppercase italic">
              AssetCore
            </span>
          </div>
          <div className="flex items-center gap-6 text-xs font-bold tracking-widest uppercase text-zinc-400">
            <div className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors">
              <Globe className="h-4 w-4" />
              United Arab Emirates (ex ADGM)
            </div>
          </div>
        </div>

        {/* LEGAL DISCLOSURES */}
        <div className="space-y-6 text-[11px] leading-relaxed text-zinc-500 max-w-5xl">
          <p>
            © 2026 AssetCore Global Infrastructure. All rights reserved.
            AssetCore is a trademark of AssetCore Global Infrastructure LLC in
            the United States and elsewhere.
          </p>
          <p>
            <b>Professional Investors Only.</b> This website is intended for
            professional investors as defined by the local jurisdiction. The
            products and services described on this website are not available to
            all persons in all locations. Past performance is not a guarantee or
            a reliable indicator of future results.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 font-bold uppercase tracking-widest pt-4">
            <Link
              href="#"
              className="hover:text-white transition-colors"
            >
              Legal
            </Link>
            <Link
              href="#"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <li>
              <Link
                href="#"
                className="hover:text-white transition-colors"
              >
                Cookie Policy
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-white transition-colors"
              >
                Terms of Use
              </Link>
            </li>
          </div>
        </div>
      </div>
    </footer>
  );
}
