"use client";

import { Trash2 } from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";

export function TrashActions({
  id,
  assetName,
}: {
  id: string;
  assetName: string;
}) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  async function handleDelete() {
    if (!confirm(`Are you sure you want to remove ${assetName}?`)) return;

    setIsDeleting(true);
    const { error } = await supabase.from("investments").delete().eq("id", id);

    if (!error) {
      toast.success("Entry Purged", {
        description: `${assetName} removed from ledger.`,
      });
      router.refresh();
    } else {
      toast.error("Error", { description: "Could not delete entry." });
    }
    setIsDeleting(false);
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-muted-foreground hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100"
    >
      <Trash2 className="size-4" />
    </button>
  );
}
