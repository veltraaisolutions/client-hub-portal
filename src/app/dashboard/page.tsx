import { auth, currentUser } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { MOCK_STATS } from "@/data/mock-investments";

export default async function DashboardPage() {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) redirect("/sign-in");

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  const { data: profile } = await supabase
    .from("profiles")
    .upsert(
      {
        clerk_id: userId,
        email: user.emailAddresses[0].emailAddress,
        full_name: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
        avatar_url: user.imageUrl,
      },
      { onConflict: "clerk_id" },
    )
    .select()
    .single();

  // Formatting: 06 March 2026
  const memberSince = profile
    ? new Date(profile.created_at).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "Pending";

  return (
    <div className="min-h-screen bg-black text-white p-8 pt-24">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header with Meta on the Right */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/5 pb-8">
          <div className="space-y-1">
            <h1 className="text-4xl font-bold tracking-tight">
              Welcome back, {profile?.full_name?.split(" ")[0]}
            </h1>
            <p className="text-zinc-500 text-sm">
              Your AssetCore command center is active.
            </p>
          </div>

          <div className="text-left md:text-right space-y-1">
            <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-medium">
              Member Since {memberSince}
            </p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-700 font-mono">
              ID: {profile?.id}
            </p>
          </div>
        </header>

        {/* Stats Grid using imported Mock Data */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-6 rounded-2xl bg-zinc-900/30 border border-white/5 space-y-1">
            <p className="text-zinc-500 text-[10px] uppercase tracking-wider font-semibold">
              Total Portfolio
            </p>
            <p className="text-2xl font-bold text-white/90">
              ${MOCK_STATS.totalPortfolio.toLocaleString()}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900/30 border border-white/5 space-y-1">
            <p className="text-zinc-500 text-[10px] uppercase tracking-wider font-semibold">
              Active Assets
            </p>
            <p className="text-2xl font-bold text-white/90">
              {MOCK_STATS.activeAssets}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900/30 border border-white/5 space-y-1">
            <p className="text-zinc-500 text-[10px] uppercase tracking-wider font-semibold">
              Monthly Dividends
            </p>
            <p className="text-2xl font-bold text-white/90">
              ${MOCK_STATS.monthlyDividends.toLocaleString()}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900/30 border border-white/5 space-y-1">
            <p className="text-zinc-500 text-[10px] uppercase tracking-wider font-semibold">
              Pending Requests
            </p>
            <p className="text-2xl font-bold text-white/90">
              {MOCK_STATS.pendingRequests}
            </p>
          </div>
        </div>

        {/* Action Center Placeholder */}
        <div className="bg-zinc-950 border border-white/5 rounded-3xl p-20 text-center">
          <p className="text-zinc-600 text-xs uppercase tracking-[0.3em]">
            System Synchronized • Waiting for live data stream
          </p>
        </div>
      </div>
    </div>
  );
}
