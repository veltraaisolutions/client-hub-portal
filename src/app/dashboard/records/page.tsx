import { auth, currentUser } from "@clerk/nextjs/server";
import { supabase } from "@/lib/supabase";
import { AddAssetModal } from "@/components/add-asset-modal";
import { TrashActions } from "@/components/trash-actions";
import { Inbox } from "lucide-react";

export default async function RecordsPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const { userId } = await auth();
  const user = await currentUser();
  const params = await searchParams;

  const MASTER_USER_ID = "user_3BTsg6kSbYZtxfN2v95I3mUEnyj";
  const isMaster = userId === MASTER_USER_ID;

  const userEmail = user?.primaryEmailAddress?.emailAddress;

  /** *
   * If an email is in the URL (?email=...), use it.
   * Otherwise, fall back to the logged-in user's email.
   */
  const targetEmail = params.email || userEmail;

  // Fetching data
  let query = supabase.from("investments").select("*");

  //  Only filter if we actually have an email to filter by
  if (targetEmail) {
    query = query.eq("assigned_email", targetEmail);
  }

  const { data: records } = await query.order("created_at", {
    ascending: false,
  });

  const isEmpty = !records || records.length === 0;

  return (
    <div className="p-8 space-y-12 max-w-7xl mx-auto bg-background min-h-screen">
      <header className="flex justify-between items-end border-b border-border pb-8">
        <div className="space-y-2">
          <p className="text-primary text-[10px] uppercase tracking-widest font-bold">
            {isMaster && params.email
              ? `Administering Client: ${targetEmail}`
              : isMaster
                ? "Master Ledger (Global)"
                : "Institutional Ledger"}
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Investment{" "}
            <span className="italic font-medium text-primary">Records</span>
          </h1>
        </div>

        {isMaster && (
          <AddAssetModal
            userId={userId!}
            // s Passing targetEmail here ensures new entries
            // inherit the email you are currently viewing.
            initialEmail={targetEmail || ""}
          />
        )}
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
                  <td className="p-4 text-right pr-8 flex items-center justify-end gap-2">
                    {isMaster ? (
                      <>
                        <AddAssetModal
                          userId={userId!}
                          initialEmail={item.assigned_email}
                          editData={item}
                        />
                        <TrashActions
                          id={item.id}
                          assetName={item.asset_name}
                        />
                      </>
                    ) : (
                      <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-tighter bg-emerald-50 px-2 py-1 border border-emerald-100">
                        {item.status}
                      </span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="py-32 text-center"
                >
                  <Inbox className="size-8 mx-auto text-muted-foreground/40 mb-4" />
                  <p className="text-sm font-bold uppercase">
                    No Assets Detected for {targetEmail}
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
