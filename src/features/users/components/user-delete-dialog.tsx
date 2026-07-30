"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
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
      <DialogContent title="Hapus User" description="Yakin ingin menghapus user ini?" variant="light">
        <p className="text-sm text-slate-500">
          User <span className="font-medium text-slate-900">{user.name}</span> ({user.email}) akan
          dihapus secara permanen. Tindakan ini tidak dapat dibatalkan.
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
