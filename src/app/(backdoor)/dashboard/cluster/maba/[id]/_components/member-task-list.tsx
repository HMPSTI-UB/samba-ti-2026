"use client";

import { useMemo, useState } from "react";
import { ClipboardList, Eye } from "lucide-react";
import { cn } from "@/lib/cn";
import type { MemberTask, MySubmission } from "@/features/penugasan/types";
import TaskStatusBadge from "./status-badge";
import SubmissionDetailDialog from "./submission-detail-dialog";

type Filter = "all" | "submitted" | "overdue" | "not_submitted";

const FILTER_TABS: { value: Filter; label: string }[] = [
  { value: "all", label: "Semua" },
  { value: "submitted", label: "Dikumpulkan" },
  { value: "overdue", label: "Lewat Deadline" },
  { value: "not_submitted", label: "Belum" },
];

function formatDeadline(value: string) {
  return new Date(value).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function MemberTaskList({
  tasks,
  onReview,
  isReviewPending,
}: {
  tasks: MemberTask[];
  onReview?: (submission: MySubmission, status: "ACCEPTED" | "REJECTED", feedback: string) => void;
  isReviewPending?: boolean;
}) {
  const [filter, setFilter] = useState<Filter>("all");
  const [selected, setSelected] = useState<MemberTask | null>(null);
  const [now] = useState(() => Date.now());

  function handleReview(submission: MySubmission, status: "ACCEPTED" | "REJECTED", feedback: string) {
    setSelected(null);
    onReview?.(submission, status, feedback);
  }

  const filtered = useMemo(() => {
    return tasks.filter((t) => {
      if (filter === "submitted") return t.submission !== null;
      if (filter === "overdue") return new Date(t.deadline).getTime() < now;
      if (filter === "not_submitted") return t.submission === null;
      return true;
    });
  }, [tasks, filter, now]);

  return (
    <div className="rounded-xl border border-white/10 bg-card-bg overflow-hidden">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 p-4">
        <h2 className="text-sm font-bold uppercase tracking-widest text-muted-text">Daftar Tugas</h2>
        <div className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 p-1">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                filter === tab.value
                  ? "bg-sun-gold font-semibold text-black shadow-md shadow-sun-gold/30"
                  : "text-muted-text hover:text-soft-white",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <ClipboardList size={32} className="text-muted-text mb-3" />
          <p className="text-sm text-muted-text">Tidak ada tugas pada filter ini</p>
        </div>
      ) : (
        <div className="divide-y divide-white/5">
          {filtered.map((task) => {
            const isOverdue = new Date(task.deadline).getTime() < now;
            return (
              <div key={task.id} className="flex items-center gap-4 p-4">
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-soft-white">{task.title}</p>
                  <p className={cn("mt-0.5 text-xs", isOverdue ? "text-red-400" : "text-muted-text")}>
                    {isOverdue ? "Lewat deadline: " : "Deadline: "}
                    {formatDeadline(task.deadline)}
                  </p>
                </div>
                <div className="hidden sm:flex items-center gap-3">
                  <span className="text-xs font-medium text-muted-text">
                    {task.doneStatus === "DONE" && "Nilai: 100"}
                    {(task.doneStatus === "REJECTED" || task.doneStatus === "NOT_SUBMITTED") && "Nilai: 0"}
                    {task.doneStatus === "PENDING" && "Menunggu Penilaian"}
                  </span>
                  <TaskStatusBadge status={task.doneStatus} />
                </div>
                <button
                  onClick={() => setSelected(task)}
                  disabled={!task.submission}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-electric-blue transition-colors hover:bg-electric-blue/10 disabled:cursor-not-allowed disabled:opacity-40"
                  title={task.submission ? "Lihat submission" : "Belum ada submission"}
                >
                  <Eye size={14} />
                  Lihat
                </button>
              </div>
            );
          })}
        </div>
      )}

      <SubmissionDetailDialog
        key={selected?.id ?? "none"}
        open={!!selected}
        onOpenChange={(open) => { if (!open) setSelected(null); }}
        task={selected}
        onReview={handleReview}
        isPending={isReviewPending}
      />
    </div>
  );
}
