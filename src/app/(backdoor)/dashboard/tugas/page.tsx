"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/stores/user.store";
import { useTasks, useDeleteTask } from "@/features/penugasan/hooks/use-tasks";
import TaskTable from "@/features/penugasan/components/task-table";
import DeleteTaskDialog from "@/features/penugasan/components/delete-task-dialog";
import { useSweetAlert } from "@/components/common/sweet-alert-provider";
import type { Task } from "@/features/penugasan/types";

export default function TugasPage() {
  const user = useUserStore((s) => s.user);
  const role = user?.role ?? "";
  const isKaderisasi = role.toUpperCase() === "KADERISASI" || role.toUpperCase() === "ADMIN";

  const router = useRouter();

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteTask, setDeleteTask] = useState<Task | null>(null);

  const { data: tasksRes, isLoading: tasksLoading } = useTasks();
  const deleteMutation = useDeleteTask();
  const alert = useSweetAlert();

  const tasks = tasksRes?.data ?? [];

  function handleDelete(id: string) {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        alert.success("Tugas berhasil dihapus");
        setDeleteOpen(false);
        setDeleteTask(null);
      },
      onError: (err: Error) => alert.error(err.message),
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-soft-white">Tugas</h1>
          <p className="text-sm text-muted-text mt-1">Kelola penugasan untuk MABA</p>
        </div>
        {isKaderisasi && (
          <Button variant="primary" onClick={() => router.push("/dashboard/tugas/create")} className="gap-2">
            <Plus className="w-4 h-4" />
            Tambah Tugas
          </Button>
        )}
      </div>

      <div className="rounded-xl border border-white/10 bg-card-bg overflow-hidden">
        {tasksLoading ? (
          <div className="p-10 text-center text-sm text-muted-text">Memuat tugas...</div>
        ) : (
          <TaskTable
            data={tasks}
            onDelete={
              isKaderisasi
                ? (task) => {
                    setDeleteTask(task);
                    setDeleteOpen(true);
                  }
                : undefined
            }
          />
        )}
      </div>

      <DeleteTaskDialog
        open={deleteOpen}
        onOpenChange={(v) => {
          setDeleteOpen(v);
          if (!v) setDeleteTask(null);
        }}
        task={deleteTask}
        onConfirm={handleDelete}
        isPending={deleteMutation.isPending}
      />
    </div>
  );
}
