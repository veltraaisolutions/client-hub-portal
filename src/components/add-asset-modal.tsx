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

interface Investment {
  id: string;
  asset_name: string;
  assigned_email: string;
  amount: number;
  asset_type: string;
  status: string;
}

export function AddAssetModal({
  userId,
  initialEmail,
  editData,
}: {
  userId: string;
  initialEmail: string;
  editData?: Investment;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const isEditing = !!editData;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    // ✅ Clean values and ensure they are strings/numbers
    const payload = {
      asset_name: (formData.get("assetName")?.toString() || "").trim(),
      assigned_email: (formData.get("assignedEmail")?.toString() || "").trim(),
      amount: Number(formData.get("amount")) || 0,
      asset_type: formData.get("type")?.toString() || "Equity",
      status: "Active",
      user_id: userId || "", // Ensure this is never undefined
    };

    // ✅ Debug Logging
    console.log("Submit Payload:", payload);
    console.log("Operation Mode:", isEditing ? "UPDATE" : "INSERT");

    if (!payload.user_id) {
      toast.error("User Identity missing. Please re-login.");
      setLoading(false);
      return;
    }

    if (isNaN(payload.amount) || payload.amount <= 0) {
      toast.error("Please enter a valid amount");
      setLoading(false);
      return;
    }

    try {
      const { data, error } = isEditing
        ? await supabase
            .from("investments")
            .update(payload)
            .eq("id", editData.id)
            .select()
        : await supabase.from("investments").insert([payload]).select();

      if (error) {
        console.error("Supabase Error Object:", error);
        toast.error(error.message || "Database Operation Failed");
      } else {
        console.log("Operation Success. Result:", data);
        toast.success(isEditing ? "Entry Updated" : "Asset Authorized");
        setOpen(false);
        router.refresh();
      }
    } catch (err) {
      console.error("System Error caught during submission:", err);
      toast.error("Failed to execute request. Check browser console.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        {isEditing ? (
          <button className="p-2 text-muted-foreground hover:text-primary transition-colors">
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
        <div className="sr-only">
          <DialogDescription>Asset management interface.</DialogDescription>
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
                // ✅ Locked field during edit
                readOnly={isEditing}
                placeholder="client@example.com"
                className={`w-full border-b border-border py-2 text-sm font-medium outline-none transition-colors bg-transparent ${
                  isEditing
                    ? "opacity-60 cursor-not-allowed border-dashed"
                    : "focus:border-primary"
                }`}
              />
              {isEditing && (
                <p className="text-[9px] text-amber-600 font-medium uppercase mt-1">
                  Identity locked for existing record
                </p>
              )}
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
                  step="0.01"
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
              className="w-full bg-primary text-white font-black py-5 uppercase text-[11px] tracking-[0.2em] hover:bg-zinc-900 transition-all disabled:opacity-50"
            >
              {loading
                ? "Processing..."
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
