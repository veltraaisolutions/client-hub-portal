import { auth, currentUser } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";
import { MOCK_STATS } from "@/data/mock-records";

// IMPORTANT: This must be "export default"
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
    : "06 March 2026";

  return (
    <div className="p-8 space-y-10 max-w-6xl">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold tracking-tight text-white italic underline decoration-zinc-800">
            Welcome back, {profile?.full_name?.split(" ")[0]}
          </h1>
          <p className="text-zinc-500 text-sm font-medium tracking-wide">
            AssetCore Command Center
          </p>
        </div>
        <div className="text-left md:text-right border-l md:border-l-0 md:border-r border-zinc-800 pl-4 md:pr-4">
          <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold">
            Member Since {memberSince}
          </p>
          <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-800 font-mono mt-1 break-all">
            ID: {profile?.id}
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Portfolio"
          value={`$${MOCK_STATS.totalPortfolio.toLocaleString()}`}
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
        />
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/5">
      <p className="text-zinc-500 text-[10px] uppercase tracking-wider font-bold mb-2">
        {label}
      </p>
      <p className="text-2xl font-bold text-white tracking-tight">{value}</p>
    </div>
  );
}
