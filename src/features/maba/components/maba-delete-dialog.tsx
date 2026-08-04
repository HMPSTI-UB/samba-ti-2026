"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { SafeUser } from "@/features/users/api/users";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  maba: SafeUser | null;
  onConfirm: () => void;
  isPending?: boolean;
};

export default function MabaDeleteDialog({ open, onOpenChange, maba, onConfirm, isPending }: Props) {
  if (!maba) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent title="Hapus MABA" description="Yakin ingin menghapus MABA ini?">
        <p className="text-sm text-muted-text">
          MABA <span className="font-medium text-soft-white">{maba.name}</span> ({maba.email}) beserta data
          terkaitnya akan dihapus permanen. Tindakan ini tidak dapat dibatalkan.
        </p>
        <div className="mt-4 flex justify-end gap-3">
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
