import { auth, currentUser } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";

export default async function OverviewPage() {
  const { userId } = await auth();
  const user = await currentUser();

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  const { data: investments } = await supabase
    .from("investments")
    .select("amount")
    .eq("user_id", userId);

  const totalValue =
    investments?.reduce((sum, inv) => sum + Number(inv.amount), 0) || 0;
  const activeAssets = investments?.length || 0;

  // Format the "Verified Since" date
  // eslint-disable-next-line react-hooks/purity
  const joinDate = new Date(user?.createdAt || Date.now()).toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "long",
      year: "numeric",
    },
  );

  return (
    <div className="p-8 space-y-12 max-w-7xl mx-auto bg-background min-h-screen">
      <header className="flex justify-between items-start">
        <div className="space-y-2">
          <p className="text-primary text-[10px] uppercase tracking-[0.3em] font-bold">
            AssetCore Global Command
          </p>
          <h1 className="text-5xl font-medium tracking-tight text-foreground italic">
            Welcome back,{" "}
            <span className="not-italic font-bold">{user?.firstName}</span>
          </h1>
        </div>
        <div className="text-right hidden md:block">
          <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
            Member Since
          </p>
          <p className="text-sm font-bold text-foreground">{joinDate}</p>
          <p className="text-[9px] text-muted-foreground font-medium uppercase">
            ID: {userId?.slice(-12)}
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          label="Total Portfolio Value"
          value={`$${totalValue.toLocaleString()}`}
          isPrimary
        />
        <StatCard
          label="Active Assets"
          value={activeAssets}
        />
        <StatCard
          label="Monthly Dividends"
          value={`$${(totalValue * 0.007).toLocaleString(undefined, { maximumFractionDigits: 2 })}`}
        />
      </div>
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
      className={`p-8 border ${isPrimary ? "border-primary shadow-lg shadow-primary/5" : "border-border"} bg-card space-y-4`}
    >
      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
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
