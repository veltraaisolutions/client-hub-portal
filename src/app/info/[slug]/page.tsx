import { FOOTER_DATA } from "@/constants/footer-links";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Globe, Shield, Users, Clock, ArrowUpRight } from "lucide-react";

const TIMELINE_ITEMS = [
  {
    year: "Foundation",
    title: "Built on Alignment",
    desc: "Stonepeak Partners was established with a simple model: no management fees, and we only succeed when our clients do.",
  },
  {
    year: "Growth | £300M AUM",
    title: "Institutional-Grade Strategies",
    desc: "Expanded our managed account service, giving clients full ownership of capital with active professional management and full transparency.",
  },
  {
    year: "Today | FCA Regulated",
    title: "Transparent, Performance-Led",
    desc: "Authorised and regulated by the FCA, with FSCS protection up to £120,000. Client funds protected. Every position is intentional.",
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function InfoPage({ params }: any) {
  const { slug } = await params;

  const allLinks = FOOTER_DATA.flatMap((section) => section.links);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pageData = allLinks.find((link) => link.slug === slug) as any;

  if (!pageData) notFound();

  const heroImage: string = pageData.heroImage ?? "";
  const timelineImages: string[] = pageData.timelineImages ?? ["", "", ""];
  const contactImage: string = pageData.contactImage ?? "";

  return (
    <main className="min-h-screen bg-white font-sans">
      {/* ── HERO BANNER ─────────────────────────────────────────── */}
      <section
        className="relative w-full overflow-hidden"
        style={{ minHeight: 420 }}
      >
        {heroImage && (
          <div
            className="absolute right-0 top-0 h-full"
            style={{ width: "52%", zIndex: 0 }}
          >
            <Image
              src={heroImage}
              alt={pageData.name}
              fill
              style={{ objectFit: "cover", objectPosition: "center" }}
              priority
            />
          </div>
        )}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, #001a40 0%, #001a40 55%, rgba(0,26,64,0.15) 75%, transparent 100%)",
            zIndex: 1,
          }}
        />
        <div
          className="absolute"
          style={{
            left: "50%",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 2,
          }}
        >
          <svg
            width="80"
            height="120"
            viewBox="0 0 80 120"
            fill="none"
          >
            <path
              d="M10 10 L70 60 L10 110"
              stroke="#1d4ed8"
              strokeWidth="5"
              fill="none"
            />
          </svg>
        </div>
        <div
          className="relative max-w-7xl mx-auto px-6 py-24 flex flex-col justify-center"
          style={{ zIndex: 3, minHeight: 420 }}
        >
          <h1
            className="text-white font-bold mb-6 leading-tight"
            style={{ fontSize: "clamp(2rem,4vw,3rem)", maxWidth: 520 }}
          >
            {pageData.name}
          </h1>
        </div>
      </section>

      {/* ── STATS GRID ──────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2
            className="font-bold text-[#001a40] mb-4"
            style={{ fontSize: "clamp(1.5rem,3vw,2.25rem)" }}
          >
            The Full Force of Stonepeak Partners Behind You
          </h2>
          <p
            className="text-zinc-600 max-w-3xl mb-12 leading-relaxed"
            style={{ fontSize: 17 }}
          >
            {pageData.content} Our extensive resources, global presence and
            time-tested investment process are designed to help give our clients
            an edge as they pursue their long-term goals.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              {
                Icon: Clock,
                stat: "£300M+ AUM",
                sub: "Assets under management, entrusted to us by our clients.",
              },
              {
                Icon: Shield,
                stat: "FCA Regulated",
                sub: "Authorised and regulated by the Financial Conduct Authority.",
              },
              {
                Icon: Globe,
                stat: "FSCS Protected",
                sub: "Client funds protected up to £120,000, subject to eligibility.",
              },
              {
                Icon: Users,
                stat: "0% management Fee",
                sub: "Performance fee of 20% on profits only. We only earn when you do.",
              },
            ].map(({ Icon, stat, sub }, i) => (
              <div
                key={i}
                className="p-8"
                style={{ background: "#f0f4f8" }}
              >
                <div
                  className="flex items-center justify-center mb-6"
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    background: "#1d4ed8",
                  }}
                >
                  <Icon
                    size={26}
                    color="white"
                  />
                </div>
                <h3
                  className="font-bold text-[#001a40] mb-3"
                  style={{ fontSize: "1.2rem" }}
                >
                  {stat}
                </h3>
                <p className="text-zinc-600 text-sm leading-relaxed">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR APPROACH ────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-white border-t border-zinc-100">
        <div className="max-w-7xl mx-auto">
          <h2
            className="font-bold text-[#001a40] mb-4"
            style={{ fontSize: "clamp(1.5rem,3vw,2.25rem)" }}
          >
            We Innovate to Help Give Clients an Edge
          </h2>
          <p className="text-zinc-600 max-w-2xl mb-10 leading-relaxed">
            For {pageData.name}, we leverage a time-tested process designed to
            help provide our clients with an edge in their long-term goals
            across every market cycle.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              {[
                {
                  title: "Rigorous Research",
                  desc: "Fundamental analysis, technical indicators, macroeconomic trends, and market sentiment — every position is backed by data and disciplined execution.",
                },
                {
                  title: "Risk Management",
                  desc: "Capital preservation is our first priority. Proprietary risk controls actively monitor and adjust positions in real time to mitigate downside risk.",
                },
                {
                  title: "Aligned Incentives",
                  desc: "No management fees. A 20% performance fee on profits only. We only succeed when our clients do — full stop.",
                },
              ].map(({ title, desc }) => (
                <div
                  key={title}
                  className="flex gap-4"
                >
                  <div
                    style={{
                      width: 4,
                      minWidth: 4,
                      background: "#1d4ed8",
                      borderRadius: 2,
                      marginTop: 4,
                    }}
                  />
                  <div>
                    <h4 className="font-bold text-[#001a40] mb-1">{title}</h4>
                    <p className="text-zinc-600 text-sm leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div
              className="flex items-center justify-center"
              style={{
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                height: 380,
              }}
            >
              <div
                className="relative flex items-center justify-center"
                style={{ width: 240, height: 240 }}
              >
                <svg
                  width="240"
                  height="240"
                  viewBox="0 0 240 240"
                  style={{ position: "absolute" }}
                >
                  <circle
                    cx="120"
                    cy="120"
                    r="110"
                    stroke="#e2e8f0"
                    strokeWidth="12"
                    fill="none"
                  />
                  <circle
                    cx="120"
                    cy="120"
                    r="110"
                    stroke="#1d4ed8"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray="440"
                    strokeDashoffset="110"
                    strokeLinecap="round"
                    transform="rotate(-90 120 120)"
                  />
                </svg>
                <div
                  className="text-center"
                  style={{ zIndex: 1 }}
                >
                  <p className="font-bold text-[#001a40] text-xs uppercase tracking-widest leading-tight">
                    Stonepeak Partners
                    <br />
                    PORTFOLIO
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TIMELINE ────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-white border-t border-zinc-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-start justify-between mb-12">
            <div>
              <h2
                className="font-bold text-[#001a40] mb-4"
                style={{ fontSize: "clamp(1.5rem,3vw,2.25rem)" }}
              >
                Our History of Innovation
              </h2>
              <p className="text-zinc-600 max-w-2xl leading-relaxed">
                Innovation has been central to our culture since founding.
                Explore our leading-edge history and the forward-looking
                solutions we have built for clients over the years.
              </p>
            </div>
            <div className="flex gap-2 mt-1 shrink-0">
              {["←", "→"].map((arrow, i) => (
                <button
                  key={i}
                  className="flex items-center justify-center rounded-full"
                  style={{
                    width: 44,
                    height: 44,
                    cursor: "pointer",
                    background: "white",
                    fontSize: 18,
                    border: i === 1 ? "2px solid #1d4ed8" : "2px solid #d1d5db",
                    color: i === 1 ? "#1d4ed8" : "#9ca3af",
                  }}
                >
                  {arrow}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TIMELINE_ITEMS.map(({ year, title, desc }, i) => (
              <div
                key={year}
                style={{ border: "1px solid #e2e8f0", overflow: "hidden" }}
              >
                <div
                  className="relative"
                  style={{ height: 220 }}
                >
                  {timelineImages[i] ? (
                    <Image
                      src={timelineImages[i]}
                      alt={title}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  ) : (
                    <div
                      style={{
                        height: "100%",
                        background: "linear-gradient(135deg,#94a3b8,#64748b)",
                      }}
                    />
                  )}
                </div>
                <div
                  className="p-6"
                  style={{ background: "#f8fafc" }}
                >
                  <p className="text-xs text-zinc-500 mb-2 font-medium">
                    {year}
                  </p>
                  <h3
                    className="font-bold text-[#001a40] mb-2"
                    style={{ fontSize: "1.05rem" }}
                  >
                    {title}
                  </h3>
                  <p className="text-zinc-600 text-sm leading-relaxed">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── JOIN / TEAM ──────────────────────────────────────────── */}
      <section
        className="py-20 px-6"
        style={{ background: "#001a40" }}
      >
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="text-white lg:w-1/2">
            <h2
              className="font-bold mb-5"
              style={{ fontSize: "clamp(1.75rem,3.5vw,2.5rem)" }}
            >
              Join Stonepeak Partners
            </h2>
            <p
              className="text-blue-200 leading-relaxed mb-8"
              style={{ fontSize: 17 }}
            >
              We are always looking for driven individuals with a passion for
              markets. Work alongside experienced professionals, gain exposure
              to live trading environments, and be rewarded based on
              performance. We value ambition, discipline, and results.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 font-semibold text-white"
              style={{ textDecoration: "underline", fontSize: 15 }}
            >
              Explore careers <ArrowUpRight size={16} />
            </a>
          </div>
          <div className="lg:w-1/2">
            <div
              className="grid"
              style={{
                gridTemplateColumns: "repeat(5,1fr)",
                gap: 6,
                border: "2px solid #1d4ed8",
                padding: 6,
              }}
            >
              {[
                "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80",
                "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80",
                "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80",
                "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
                "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=80",
                "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
                "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=200&q=80",
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80",
                "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80",
                "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&q=80",
                "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&q=80",
                "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&q=80",
              ].map((src, i) => (
                <div
                  key={i}
                  className="relative overflow-hidden"
                  style={{
                    height: 80,
                    clipPath: "polygon(8% 0%,100% 0%,92% 100%,0% 100%)",
                  }}
                >
                  <Image
                    src={src}
                    alt="Team member"
                    fill
                    style={{ objectFit: "cover", filter: "grayscale(100%)" }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "rgba(29,78,216,0.45)",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ─────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-white border-t border-zinc-100">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/2">
            <h2
              className="font-bold text-[#001a40] mb-4"
              style={{ fontSize: "clamp(1.5rem,3vw,2.25rem)" }}
            >
              How Can We Help You?
            </h2>
            <p className="text-zinc-600 mb-8 leading-relaxed">
              For helpful resources, account assistance, and general contact
              regarding <strong>{pageData.name}</strong>, visit our Contact &
              Support Center.
            </p>
            <button
              className="font-semibold px-6 py-3 text-sm"
              style={{
                border: "2px solid #1d4ed8",
                color: "#1d4ed8",
                background: "white",
                cursor: "pointer",
              }}
            >
              Contact & Support
            </button>
            <div className="mt-10">
              {["Firm Leadership", "Our Offices", "Media Enquiries"].map(
                (item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between py-5"
                    style={{
                      borderBottom: "1px solid #e5e7eb",
                      cursor: "pointer",
                    }}
                  >
                    <span className="font-bold text-[#001a40]">{item}</span>
                  </div>
                ),
              )}
            </div>
          </div>
          <div
            className="lg:w-1/2 relative overflow-hidden"
            style={{ minHeight: 360 }}
          >
            {contactImage ? (
              <Image
                src={contactImage}
                alt="Contact"
                fill
                style={{ objectFit: "cover" }}
              />
            ) : (
              <div
                style={{
                  height: "100%",
                  background: "linear-gradient(135deg,#94a3b8,#475569)",
                }}
              />
            )}
          </div>
        </div>
      </section>

      {/* ── DISCLAIMER ──────────────────────────────────────────── */}
      <section className="py-10 px-6 bg-white border-t border-zinc-100">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-3">
            Professional Investors Only
          </p>
          <p className="text-xs text-zinc-400 max-w-4xl leading-relaxed">
            This information regarding <strong>{pageData.name}</strong> is
            institutional content for Stonepeak Partners Global. All information
            is strictly for professional investors. Past performance is not a
            guarantee or a reliable indicator of future results. Stonepeak
            Partners is authorised and regulated by the Financial Conduct
            Authority (FCA). Client funds are protected under the Financial
            Services Compensation Scheme (FSCS) up to £120,000, subject to
            eligibility.
          </p>
        </div>
      </section>
    </main>
  );
}
