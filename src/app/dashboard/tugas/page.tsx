"use client";

import { useState } from "react";
import { Plus, Send, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/stores/user.store";
import { useTasks, useCreateTask, useSubmissions, useReviewSubmission } from "@/features/penugasan/hooks/use-tasks";
import TaskTable from "@/features/penugasan/components/task-table";
import CreateTaskDialog from "@/features/penugasan/components/create-task-dialog";
import SubmissionViewer from "@/features/penugasan/components/submission-viewer";
import FormRenderer from "@/features/penugasan/components/form-renderer";
import { toast } from "sonner";
import type { Task, CreateTaskInput } from "@/features/penugasan/types";

export default function TugasPage() {
  const user = useUserStore((s) => s.user);
  const role = user?.role ?? "";
  const isKaderisasi = role.toUpperCase() === "KADERISASI" || role.toUpperCase() === "ADMIN";
  const isSpv = role.toUpperCase() === "SPV";
  const isMaba = role.toUpperCase() === "MABA";

  const [createOpen, setCreateOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const { data: tasksRes, isLoading: tasksLoading } = useTasks();
  const createMutation = useCreateTask();
  const { data: submissionsRes, isLoading: subsLoading } = useSubmissions();
  const reviewMutation = useReviewSubmission();

  const tasks = tasksRes?.data ?? [];
  const submissions = submissionsRes?.data ?? [];

  function handleCreate(data: CreateTaskInput) {
    createMutation.mutate(data, {
      onSuccess: () => {
        toast.success("Tugas berhasil dibuat");
        setCreateOpen(false);
      },
      onError: () => toast.error("Gagal membuat tugas"),
    });
  }

  function handleReview(id: string, status: "ACCEPTED" | "REJECTED", feedback: string) {
    reviewMutation.mutate({ id, status, feedback }, {
      onSuccess: () => toast.success("Review berhasil disimpan"),
      onError: () => toast.error("Gagal menyimpan review"),
    });
  }

  function handleSubmitTask() {
    if (!selectedTask) return;

    const errs: Record<string, string> = {};
    selectedTask.formFields.forEach((f) => {
      if (f.isRequired && !formValues[f.key]?.trim()) {
        errs[f.key] = `${f.label} wajib diisi`;
      }
    });

    if (Object.keys(errs).length > 0) {
      setFormErrors(errs);
      return;
    }

    toast.success("Tugas berhasil dikirim (simulasi)");
    setSelectedTask(null);
    setFormValues({});
    setFormErrors({});
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Tugas</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            {isKaderisasi && "Buat dan kelola tugas untuk MABA"}
            {isSpv && "Review submission MABA di cluster Anda"}
            {isMaba && "Kerjakan tugas yang diberikan"}
          </p>
        </div>

        {isKaderisasi && (
          <Button variant="primary" onClick={() => setCreateOpen(true)} className="gap-2">
            <Plus size={16} />
            Buat Tugas
          </Button>
        )}
      </div>

      {/* Kaderisasi: Task Table */}
      {isKaderisasi && (
        <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100">
            <h2 className="text-sm font-semibold text-slate-900">Daftar Tugas</h2>
          </div>
          <div className="p-5">
            <TaskTable
              data={tasks}
              onSelect={(task) => {
                setSelectedTask(task);
                setFormValues({});
                setFormErrors({});
              }}
            />
          </div>
        </div>
      )}

      {/* SPV: Submission Viewer */}
      {isSpv && (
        <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100">
            <h2 className="text-sm font-semibold text-slate-900">Submission MABA</h2>
          </div>
          <div className="p-5">
            <SubmissionViewer
              submissions={submissions}
              onReview={handleReview}
              isPending={reviewMutation.isPending}
            />
          </div>
        </div>
      )}

      {/* MABA: Task list + submit */}
      {isMaba && (
        <div className="space-y-4">
          {tasks.length === 0 && !tasksLoading && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <ClipboardList size={32} className="text-slate-400 mb-3" />
              <p className="text-sm text-slate-500">Belum ada tugas</p>
            </div>
          )}

          {tasks.map((task) => (
            <div key={task.id} className="rounded-xl border border-slate-200 bg-white overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-100">
                <h3 className="text-sm font-semibold text-slate-900">{task.title}</h3>
                {task.deadline && (
                  <p className="text-xs text-slate-400 mt-0.5">
                    Deadline: {new Date(task.deadline).toLocaleDateString("id-ID", {
                      day: "numeric", month: "long", year: "numeric",
                    })}
                  </p>
                )}
              </div>

              <div className="p-5 space-y-4">
                <div>
                  <p className="text-sm text-slate-600 whitespace-pre-wrap">{task.description}</p>
                  {task.termsConditions && (
                    <div className="mt-3 rounded-lg bg-amber-50 border border-amber-200 p-3">
                      <p className="text-xs font-medium text-amber-800 mb-1">Syarat & Ketentuan</p>
                      <p className="text-xs text-amber-700 whitespace-pre-wrap">{task.termsConditions}</p>
                    </div>
                  )}
                </div>

                {selectedTask?.id === task.id ? (
                  <div className="space-y-4 pt-2 border-t border-slate-100">
                    <FormRenderer
                      fields={task.formFields}
                      values={formValues}
                      onChange={(key, val) => setFormValues((prev) => ({ ...prev, [key]: val }) )}
                      errors={formErrors}
                    />
                    <div className="flex justify-end gap-3">
                      <Button variant="ghost" size="sm" onClick={() => { setSelectedTask(null); setFormValues({}); setFormErrors({}); }}>
                        Batal
                      </Button>
                      <Button variant="primary" size="sm" onClick={handleSubmitTask} className="gap-1.5">
                        <Send size={14} />
                        Kirim
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => { setSelectedTask(task); setFormValues({}); setFormErrors({}); }}
                    className="gap-1.5"
                  >
                    Kerjakan
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Task Dialog */}
      <CreateTaskDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        onSubmit={handleCreate}
        isPending={createMutation.isPending}
      />
    </div>
  );
}
