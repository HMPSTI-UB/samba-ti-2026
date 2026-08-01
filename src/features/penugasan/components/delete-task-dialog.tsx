"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import type { Task } from "@/features/penugasan/types";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task: Task | null;
  onConfirm: (id: string) => void;
  isPending?: boolean;
};

export default function DeleteTaskDialog({ open, onOpenChange, task, onConfirm, isPending }: Props) {
  function handleOpenChange(open: boolean) {
    if (!open) onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent title="Hapus Tugas" description="">
        <div className="flex flex-col items-center text-center py-4">
          <div className="rounded-full bg-red-500/10 p-4 mb-4">
            <AlertTriangle size={28} className="text-red-500" />
          </div>
          <p className="text-sm text-soft-white font-medium">
            Hapus tugas ini?
          </p>
          <p className="text-xs text-muted-text mt-1">
            Tugas <strong className="text-soft-white">{task?.title}</strong> akan dihapus secara permanen.
          </p>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
          <Button type="button" variant="ghost" onClick={() => onOpenChange(false)} disabled={isPending}>
            Batal
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={() => {
              if (task) onConfirm(task.id);
            }}
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
