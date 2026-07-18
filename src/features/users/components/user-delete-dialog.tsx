"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import type { SafeUser } from "@/features/users/api/users";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: SafeUser | null;
  onConfirm: () => void;
  isPending?: boolean;
};

export default function UserDeleteDialog({ open, onOpenChange, user, onConfirm, isPending }: Props) {
  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent title="Hapus User">
        <div className="flex flex-col items-center text-center gap-4 py-2">
          <div className="rounded-full bg-red-50 p-3">
            <AlertTriangle className="h-6 w-6 text-destructive" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-900">
              Yakin ingin menghapus user ini?
            </p>
            <p className="text-sm text-slate-500 mt-1">
              <span className="font-medium">{user.name}</span> ({user.email})
            </p>
            <p className="text-xs text-slate-400 mt-2">
              Tindakan ini tidak dapat dibatalkan.
            </p>
          </div>
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="ghost" onClick={() => onOpenChange(false)} disabled={isPending}>
            Batal
          </Button>
          <Button type="button" variant="destructive" loading={isPending} disabled={isPending} onClick={onConfirm}>
            Hapus
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
