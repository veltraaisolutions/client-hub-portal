"use client";

import { useState } from "react";
import { Plus, ShieldCheck } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function AddAssetModal({ userId }: { userId: string }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Initialize Supabase Client for client-side insertion
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const assetName = formData.get("assetName") as string;
    const amount = Number(formData.get("amount"));
    const type = formData.get("type") as string;

    const { error } = await supabase.from("investments").insert({
      user_id: userId,
      asset_name: assetName,
      asset_type: type,
      amount: amount,
      status: "Active",
    });

    if (error) {
      toast.error("Authorization Failed", {
        description: "The system could not verify the asset credentials.",
      });
      setLoading(false);
      return;
    }

    // Success Sequence: Toast + Refresh
    toast.success("Asset Authorized", {
      description: `${assetName} has been successfully deployed to the ledger.`,
    });

    setOpen(false);
    setLoading(false);
    router.refresh(); // Triggers Server Component re-fetch for Overview/Records
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-none font-bold uppercase tracking-widest text-[10px] hover:bg-zinc-900 transition-all shadow-lg shadow-primary/10">
          <Plus className="size-4" />
          Authorize New Entry
        </button>
      </DialogTrigger>

      <DialogContent className="rounded-none border-none max-w-md bg-white p-0 overflow-hidden">
        {/* Visual accent bar for PIMCO style */}
        <div className="h-2 bg-primary w-full" />

        <form
          onSubmit={onSubmit}
          className="p-8 space-y-8"
        >
          <DialogHeader>
            <div className="flex items-center gap-2 mb-1">
              <ShieldCheck className="size-4 text-primary" />
              <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">
                Institutional Security
              </span>
            </div>
            <DialogTitle className="text-3xl font-bold italic tracking-tight text-foreground">
              New{" "}
              <span className="not-italic font-black text-primary">
                Asset Entry
              </span>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div className="space-y-1 group">
              <label className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest group-focus-within:text-primary transition-colors">
                Asset Identity
              </label>
              <input
                name="assetName"
                required
                className="w-full border-b border-border py-2 outline-none focus:border-primary transition-all text-sm font-medium bg-transparent"
                placeholder="e.g. London Residential Complex"
              />
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-1 group">
                <label className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest group-focus-within:text-primary transition-colors">
                  Capital Amount ($)
                </label>
                <input
                  name="amount"
                  type="number"
                  required
                  className="w-full border-b border-border py-2 outline-none focus:border-primary text-sm font-medium bg-transparent"
                  placeholder="50000"
                />
              </div>

              <div className="space-y-1 group">
                <label className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest group-focus-within:text-primary transition-colors">
                  Asset Class
                </label>
                <select
                  name="type"
                  className="w-full border-b border-border py-2 outline-none bg-transparent text-sm font-medium"
                >
                  <option value="Equity">Equity</option>
                  <option value="Real Estate">Real Estate</option>
                  <option value="Fixed Income">Fixed Income</option>
                  <option value="Commodities">Commodities</option>
                </select>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white font-bold py-5 uppercase tracking-[0.3em] text-[10px] hover:bg-zinc-900 transition-all disabled:opacity-50"
            >
              {loading
                ? "Verifying Credentials..."
                : "Confirm & Deploy Capital"}
            </button>
            <p className="text-[9px] text-center text-muted-foreground mt-4 uppercase tracking-tighter font-medium">
              * This action will be recorded in the immutable audit trail
            </p>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
