import { FOOTER_DATA } from "@/constants/footer-links";
import { notFound } from "next/navigation";
import { Globe, Shield, Users, Clock } from "lucide-react";

export default async function InfoPage({ params }: any) {
  const { slug } = await params;

  // Flattening footer data to find the specific link object
  const allLinks = FOOTER_DATA.flatMap((section) => section.links);
  const pageData = allLinks.find((link) => link.slug === slug);

  if (!pageData) notFound();

  return (
    <main className="min-h-screen bg-white">
      {/* HERO SECTION - DYNAMIC TITLE & CONTENT */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-serif text-[#001a33] mb-10 leading-tight">
          {pageData.name}
        </h1>
        <div className="text-xl text-zinc-600 max-w-5xl leading-relaxed whitespace-pre-line">
          {pageData.content}
        </div>
      </section>

      {/* PILLAR GRID - DYNAMIC BRANDING */}
      <section className="px-6 pb-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            {
              Icon: Clock,
              label: "50+ Years",
              sub: "Experience in the market.",
            },
            {
              Icon: Shield,
              label: "Institutional",
              sub: "Built for professional investors.",
            },
            {
              Icon: Globe,
              label: "Global Reach",
              sub: "Spanning major financial hubs.",
            },
            {
              Icon: Users,
              label: "Expert Team",
              sub: "Dedicated to your specific goals.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-[#f0f4f8] p-10 space-y-6"
            >
              <item.Icon className="h-10 w-10 text-blue-600" />
              <h3 className="text-2xl font-bold text-[#001a33]">
                {item.label}
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                {item.sub}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* LOWER CONTENT - DYNAMIC TEXT */}
      <section className="bg-white py-24 px-6 border-t border-zinc-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-serif text-[#001a33] mb-12">
            Why Choose {pageData.name}?
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div className="space-y-8">
              <p className="text-lg text-zinc-600 leading-relaxed">
                Pacific Client Hub provides the scale, access, and disciplined
                approach required to navigate complex markets.
              </p>
              <h4 className="text-2xl font-bold text-[#001a33]">
                Our Strategic Approach
              </h4>
              <p className="text-zinc-600 leading-relaxed">
                For {pageData.name}, we leverage a time-tested process designed
                to help provide our clients with an edge in their long-term
                goals.
              </p>
            </div>
            {/* Diagram area as seen in PIMCO site */}
            <div className="bg-zinc-50 h-[400px] flex items-center justify-center border border-zinc-100">
              <div className="text-center p-8">
                <div className="w-48 h-48 rounded-full border-8 border-blue-600 border-t-zinc-200 mx-auto flex items-center justify-center">
                  <span className="text-[10px] font-bold text-[#001a33] text-center uppercase tracking-tighter">
                    PACIFIC CLIENT
                    <br />
                    HUB PORTFOLIO
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER DISCLAIMER - DYNAMIC SITE NAME */}
      <section className="py-12 px-6 bg-white border-t border-zinc-100">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs text-zinc-400 uppercase tracking-widest font-bold mb-4">
            Professional Investors Only
          </p>
          <p className="text-[13px] text-zinc-500 max-w-4xl">
            This information regarding <strong>{pageData.name}</strong> is
            institutional content for Pacific Client Hub Global. All information
            is strictly for professional investors.
          </p>
        </div>
      </section>
    </main>
  );
}
