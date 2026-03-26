import { auth, currentUser } from "@clerk/nextjs/server";
import { supabase } from "@/lib/supabase"; // ✅ Shared DB
import { ShieldCheck, Calculator, Landmark } from "lucide-react";

export default async function OverviewPage() {
  const { userId } = await auth();
  const user = await currentUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress;
  console.log("Current Logged In ID:", userId);

  const MASTER_IDS = [
    // "user_3AYuN7sMwNBznIoceq9c7psqbeT", // veltra
    "user_3BTsg6kSbYZtxfN2v95I3mUEnyj", // Stonepeak
  ];

  const isMaster = userId ? MASTER_IDS.includes(userId) : false;

  // Fetching data using the shared singleton
  let query = supabase.from("investments").select("amount, asset_type");
  if (!isMaster && userEmail) {
    query = query.eq("assigned_email", userEmail);
  }

  const { data: investments } = await query;

  const YIELD_RULES = {
    Equity: 0.1,
    "Real Estate": 0.07,
    "Fixed Income": 0.05,
    Commodities: 0.04,
  };

  const totalValue =
    investments?.reduce((sum, inv) => sum + Number(inv.amount), 0) || 0;

  const annualProfit =
    investments?.reduce((total, inv) => {
      const rate =
        YIELD_RULES[inv.asset_type as keyof typeof YIELD_RULES] || 0.04;
      return total + Number(inv.amount) * rate;
    }, 0) || 0;

  return (
    <div className="p-8 space-y-12 max-w-7xl mx-auto bg-background min-h-screen">
      <header className="flex justify-between items-end border-b border-border pb-8">
        <div className="space-y-1">
          <p className="text-primary text-[10px] uppercase tracking-[0.4em] font-bold">
            {isMaster ? "Veltra Administration" : "Client Asset Ledger"}
          </p>
          <h1 className="text-4xl font-light tracking-tight text-foreground">
            Welcome, <span className="font-bold italic">{user?.firstName}</span>
          </h1>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          label={isMaster ? "Total Managed Capital" : "Portfolio Value"}
          value={`$${totalValue.toLocaleString()}`}
          isPrimary
        />
        <StatCard
          label="Active Assets"
          value={investments?.length || 0}
        />
        <StatCard
          label="Projected Annual Profit"
          value={`$${annualProfit.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
        />
      </div>

      <section className="border border-border bg-white">
        <div className="bg-primary p-3 flex items-center gap-3">
          <ShieldCheck className="size-3.5 text-white" />
          <h2 className="text-[9px] font-bold uppercase tracking-[0.25em] text-white">
            Yield Calculation Methodology
          </h2>
        </div>

        <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="space-y-4">
            <h3 className="text-[10px] font-bold uppercase text-primary tracking-widest flex items-center gap-2">
              <Calculator className="size-3" /> The Formula
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed font-light">
              Annual profit is calculated by applying a weighted benchmark to
              each specific asset class within the ledger.
            </p>
            <p className="text-[11px] font-mono text-primary bg-zinc-50 p-3 border border-border/50">
              Profit = Σ (Principal × Class Rate)
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-[10px] font-bold uppercase text-primary tracking-widest flex items-center gap-2">
              <Landmark className="size-3" /> Asset Benchmarks
            </h3>
            <div className="grid grid-cols-2 gap-y-4 gap-x-8">
              {Object.entries(YIELD_RULES).map(([type, rate]) => (
                <div
                  key={type}
                  className="border-l border-border pl-4"
                >
                  <p className="text-[9px] uppercase text-muted-foreground font-medium">
                    {type}
                  </p>
                  <p className="text-lg font-bold italic text-foreground">
                    {(rate * 100).toFixed(0)}%{" "}
                    <span className="text-[9px] not-italic font-normal opacity-40 uppercase">
                      APR
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function StatCard({
  label,
  value,
  isPrimary,
}: {
  label: string;
  value: string | number;
  isPrimary?: boolean;
}) {
  return (
    <div
      className={`p-8 border ${isPrimary ? "border-primary bg-primary/[0.01]" : "border-border bg-card"} space-y-3`}
    >
      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">
        {label}
      </p>
      <p
        className={`text-4xl font-bold tracking-tighter ${isPrimary ? "text-primary" : "text-foreground"}`}
      >
        {value}
      </p>
    </div>
  );
}
