import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";
import { AddAssetModal } from "@/components/add-asset-modal";
import { TrashActions } from "@/components/trash-actions";
import { Inbox } from "lucide-react";

export default async function RecordsPage() {
  const { userId } = await auth();
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  const { data: records } = await supabase
    .from("investments")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  const isEmpty = !records || records.length === 0;

  return (
    <div className="p-8 space-y-12 max-w-7xl mx-auto bg-background">
      <header className="flex justify-between items-end border-b border-border pb-8">
        <div className="space-y-2">
          <p className="text-primary text-[10px] uppercase tracking-widest font-bold">
            Institutional Ledger
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Investment{" "}
            <span className="italic font-medium text-primary">Records</span>
          </h1>
        </div>
        <AddAssetModal userId={userId!} />
      </header>

      <div className="border border-border bg-card overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-muted/50 border-b border-border">
              <th className="p-4 text-[10px] uppercase font-bold tracking-widest text-muted-foreground">
                Asset Name
              </th>
              <th className="p-4 text-[10px] uppercase font-bold tracking-widest text-muted-foreground">
                Asset Class
              </th>
              <th className="p-4 text-[10px] uppercase font-bold tracking-widest text-muted-foreground">
                Capital Amount
              </th>
              <th className="p-4 text-[10px] uppercase font-bold tracking-widest text-muted-foreground text-right pr-8">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {!isEmpty ? (
              records.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-border hover:bg-muted/30 transition-colors group"
                >
                  <td className="p-4 font-bold text-primary italic">
                    {item.asset_name}
                  </td>
                  <td className="p-4 text-xs font-medium uppercase text-muted-foreground">
                    {item.asset_type}
                  </td>
                  <td className="p-4 font-bold">
                    ${Number(item.amount).toLocaleString()}
                  </td>
                  <td className="p-4 text-right pr-8">
                    <TrashActions
                      id={item.id}
                      assetName={item.asset_name}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="py-32"
                >
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="p-4 bg-muted/30 rounded-full">
                      <Inbox className="size-8 text-muted-foreground/40" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold uppercase tracking-widest text-foreground">
                        No Assets Detected
                      </p>
                      <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-tighter">
                        Awaiting initial capital deployment to the ledger.
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
