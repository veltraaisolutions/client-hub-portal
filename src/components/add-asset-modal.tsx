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
  buy_price: number;
  sell_price?: number;
  transaction_date: string;
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

    const payload = {
      asset_name: (formData.get("assetName")?.toString() || "").trim(),
      assigned_email: (formData.get("assignedEmail")?.toString() || "").trim(),
      amount: Number(formData.get("amount")) || 0,
      asset_type: (formData.get("type")?.toString() || "").trim(),
      buy_price: Number(formData.get("buyPrice")) || 0,
      sell_price: Number(formData.get("sellPrice")) || 0,
      transaction_date: formData.get("timestamp")
        ? new Date(formData.get("timestamp") as string).toISOString()
        : new Date().toISOString(),
      status: "Active",
      user_id: userId || "",
    };

    if (!payload.user_id) {
      toast.error("User Identity missing. Please re-login.");
      setLoading(false);
      return;
    }

    try {
      const { error } = isEditing
        ? await supabase
            .from("investments")
            .update(payload)
            .eq("id", editData.id)
        : await supabase.from("investments").insert([payload]);

      if (error) {
        toast.error(error.message || "Database Operation Failed");
      } else {
        toast.success(isEditing ? "Entry Updated" : "Asset Authorized");
        setOpen(false);
        router.refresh();
      }
    } catch (err) {
      toast.error("Failed to execute request.");
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
            {/* Client Email */}
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

            {/* Asset Identity */}
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

            {/* Asset Class & Timestamp */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
                  Asset Class
                </label>
                <input
                  name="type"
                  defaultValue={isEditing ? editData.asset_type : ""}
                  required
                  placeholder="e.g. Equity"
                  className="w-full border-b border-border py-2 text-sm font-medium outline-none focus:border-primary bg-transparent transition-colors"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
                  Timestamp
                </label>
                <input
                  name="timestamp"
                  type="datetime-local"
                  defaultValue={
                    isEditing
                      ? new Date(editData.transaction_date)
                          .toISOString()
                          .slice(0, 16)
                      : ""
                  }
                  className="w-full border-b border-border py-2 text-sm font-medium outline-none focus:border-primary bg-transparent transition-colors"
                />
              </div>
            </div>

            {/* Buy & Sell Price */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
                  Buy Price ($)
                </label>
                <input
                  name="buyPrice"
                  type="number"
                  step="0.01"
                  defaultValue={isEditing ? editData.buy_price : ""}
                  required
                  placeholder="0.00"
                  className="w-full border-b border-border py-2 text-sm font-medium outline-none focus:border-primary bg-transparent transition-colors"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
                  Sell Price ($)
                </label>
                <input
                  name="sellPrice"
                  type="number"
                  step="0.01"
                  defaultValue={isEditing ? editData.sell_price : ""}
                  placeholder="0.00"
                  className="w-full border-b border-border py-2 text-sm font-medium outline-none focus:border-primary bg-transparent transition-colors"
                />
              </div>
            </div>

            {/* Total Amount */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
                Total Portfolio Value ($)
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
