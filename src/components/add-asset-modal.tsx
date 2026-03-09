"use client";

import { useState } from "react";
import { Plus, Edit2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

export function AddAssetModal({
  userId,
  initialEmail,
  editData,
}: {
  userId: string;
  initialEmail: string;
  editData?: any;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const isEditing = !!editData;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    // Construct payload - Note: 'id' is intentionally omitted here for Inserts
    const payload = {
      asset_name: formData.get("assetName"),
      assigned_email: formData.get("assignedEmail"),
      amount: Number(formData.get("amount")),
      asset_type: formData.get("type"),
      status: "Active",
      user_id: userId,
    };

    // Validation: Ensure amount is a valid number
    if (isNaN(payload.amount)) {
      toast.error("Invalid amount entered");
      setLoading(false);
      return;
    }

    // Direct operation based on mode
    const { error } = isEditing
      ? await supabase.from("investments").update(payload).eq("id", editData.id)
      : await supabase.from("investments").insert([payload]); // Wrapped in array for insert safety

    if (error) {
      console.error("Supabase Error:", error);
      toast.error(error.message || "Operation Failed");
      setLoading(false);
      return;
    }

    toast.success(isEditing ? "Entry Updated" : "Asset Authorized");
    setOpen(false);
    setLoading(false);
    router.refresh();
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        {isEditing ? (
          <button className="p-2 text-muted-foreground hover:text-primary transition-colors group-hover:opacity-100 opacity-0">
            <Edit2 className="size-4" />
          </button>
        ) : (
          <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-none font-bold uppercase tracking-widest text-[10px] hover:bg-zinc-900 transition-all active:scale-95">
            <Plus className="size-4" /> Authorize New Entry
          </button>
        )}
      </DialogTrigger>

      <DialogContent className="rounded-none border-none max-w-md bg-white p-0 shadow-2xl">
        <div className="h-2 bg-primary w-full" />

        {/* Screen Reader Description - Fixes the Dialog Warning */}
        <div className="sr-only">
          <DialogDescription>
            Management interface for authorizing new assets or updating existing
            ledger records.
          </DialogDescription>
        </div>

        <form
          onSubmit={onSubmit}
          className="p-8 space-y-6"
        >
          <DialogTitle className="text-2xl font-bold italic tracking-tight">
            {isEditing ? "Edit Asset Details" : "New Asset Entry"}
          </DialogTitle>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
                Client Email
              </label>
              <input
                name="assignedEmail"
                defaultValue={
                  isEditing ? editData.assigned_email : initialEmail
                }
                required
                placeholder="client@example.com"
                className="w-full border-b border-border py-2 text-sm font-medium outline-none focus:border-primary bg-transparent transition-colors"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
                Asset Identity
              </label>
              <input
                name="assetName"
                defaultValue={isEditing ? editData.asset_name : ""}
                required
                placeholder="e.g. S&P 500 Index Fund"
                className="w-full border-b border-border py-2 text-sm font-medium outline-none focus:border-primary bg-transparent transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
                  Amount ($)
                </label>
                <input
                  name="amount"
                  type="number"
                  defaultValue={isEditing ? editData.amount : ""}
                  required
                  placeholder="0.00"
                  className="w-full border-b border-border py-2 text-sm font-medium outline-none focus:border-primary bg-transparent transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
                  Asset Class
                </label>
                <select
                  name="type"
                  defaultValue={isEditing ? editData.asset_type : "Equity"}
                  className="w-full border-b border-border py-2 text-sm font-medium bg-transparent outline-none focus:border-primary cursor-pointer"
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
              className="w-full bg-primary text-white font-black py-5 uppercase text-[11px] tracking-[0.2em] hover:bg-zinc-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? "Syncing with Ledger..."
                : isEditing
                  ? "Update Record"
                  : "Confirm & Deploy"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
