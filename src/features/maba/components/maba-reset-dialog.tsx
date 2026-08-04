"use client";

import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  total: number;
  onConfirm: () => void;
  isPending?: boolean;
};

export default function MabaResetDialog({ open, onOpenChange, total, onConfirm, isPending }: Props) {
  const [confirmText, setConfirmText] = useState("");

  const handleOpenChange = (v: boolean) => {
    setConfirmText("");
    onOpenChange(v);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent title="Reset Data MABA" description="Tindakan ini bersifat destruktif dan tidak dapat dibatalkan.">
        <div className="space-y-4">
          <p className="text-sm text-muted-text">
            Seluruh data MABA (<span className="font-medium text-soft-white">{total} user</span>) beserta
            data terkaitnya (submission tugas, vote, kandidat, dll.) akan{" "}
            <span className="font-medium text-red-400">dihapus permanen</span>. Struktur cluster tetap
            dipertahankan.
          </p>
          <div>
            <label className="text-sm font-medium text-muted-text">
              Ketik <span className="font-semibold text-soft-white">RESET</span> untuk konfirmasi
            </label>
            <input
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="RESET"
              className="mt-1.5 w-full h-10 rounded-lg border border-white/10 bg-transparent px-3 text-sm text-soft-white placeholder:text-muted-text focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500/50"
            />
          </div>
        </div>
        <div className="mt-4 flex justify-end gap-3">
          <Button type="button" variant="ghost" onClick={() => handleOpenChange(false)} disabled={isPending}>
            Batal
          </Button>
          <Button
            type="button"
            variant="destructive"
            loading={isPending}
            disabled={isPending || confirmText !== "RESET"}
            onClick={onConfirm}
          >
            Reset Semua Data
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
