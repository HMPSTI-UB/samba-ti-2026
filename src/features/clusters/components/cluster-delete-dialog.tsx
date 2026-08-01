"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import type { Cluster } from "@/features/clusters/types";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cluster: Cluster | null;
  onConfirm: (id: string) => void;
  isPending?: boolean;
};

export default function ClusterDeleteDialog({ open, onOpenChange, cluster, onConfirm, isPending }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent title="Hapus Cluster" description="">
        <div className="flex flex-col items-center text-center py-4">
          <div className="rounded-full bg-red-500/10 p-4 mb-4">
            <AlertTriangle size={28} className="text-red-500" />
          </div>
          <p className="text-sm text-soft-white font-medium">
            Hapus cluster ini?
          </p>
          <p className="text-xs text-muted-text mt-1">
            Cluster <strong className="text-soft-white">{cluster?.name}</strong> akan dihapus secara permanen.
            Anggota di dalamnya akan kehilangan cluster.
          </p>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
          <Button type="button" variant="ghost" onClick={() => onOpenChange(false)} disabled={isPending}>
            Batal
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={() => { if (cluster) onConfirm(cluster.id); }}
            loading={isPending}
            disabled={isPending}
          >
            Hapus
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
