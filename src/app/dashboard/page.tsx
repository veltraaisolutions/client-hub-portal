import { auth, currentUser } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";
import { MOCK_STATS } from "@/data/mock-records";

export default async function DashboardPage() {
  const { userId } = await auth();
  const user = await currentUser();

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  const { data: profile } = await supabase
    .from("profiles")
    .upsert(
      {
        clerk_id: userId,
        email: user?.emailAddresses[0].emailAddress,
        full_name: `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim(),
      },
      { onConflict: "clerk_id" },
    )
    .select()
    .single();

  const memberSince = profile
    ? new Date(profile.created_at).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "09 March 2026";

  return (
    <div className="p-8 space-y-12 max-w-7xl mx-auto bg-background text-foreground">
      {/* HEADER SECTION */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-8">
        <div className="space-y-2">
          <p className="text-primary text-[10px] uppercase tracking-[0.3em] font-bold">
            AssetCore Global Command
          </p>
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-foreground italic">
            Welcome back,{" "}
            <span className="not-italic font-bold">
              {profile?.full_name?.split(" ")[0]}
            </span>
          </h1>
        </div>

        <div className="text-left md:text-right space-y-1">
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold">
            Account Verified Since
          </p>
          <p className="text-sm font-medium text-foreground">{memberSince}</p>
        </div>
      </header>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Total Portfolio Value"
          value={`$${MOCK_STATS.totalPortfolio.toLocaleString()}`}
          isPrimary
        />
        <StatCard
          label="Active Assets"
          value={MOCK_STATS.activeAssets}
        />
        <StatCard
          label="Monthly Dividends"
          value={`$${MOCK_STATS.monthlyDividends}`}
        />
        <StatCard
          label="Pending Requests"
          value={MOCK_STATS.pendingRequests}
          isWarning={Number(MOCK_STATS.pendingRequests) > 0}
        />
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  isPrimary = false,
  isWarning = false,
}: {
  label: string;
  value: string | number;
  isPrimary?: boolean;
  isWarning?: boolean;
}) {
  return (
    <div
      className={`p-8 rounded-none border ${isPrimary ? "border-primary bg-primary/5" : "border-border bg-card"} shadow-sm transition-all hover:shadow-md`}
    >
      <p className="text-muted-foreground text-[10px] uppercase tracking-[0.2em] font-bold mb-4">
        {label}
      </p>
      <p
        className={`text-3xl font-bold tracking-tighter ${isPrimary ? "text-primary" : "text-foreground"}`}
      >
        {value}
      </p>
      {isWarning && (
        <div className="mt-4 flex items-center gap-2">
          <div className="size-1.5 rounded-full bg-amber-500 animate-pulse" />
          <span className="text-[9px] font-bold uppercase tracking-widest text-amber-600">
            Action Required
          </span>
        </div>
      )}
    </div>
  );
}
