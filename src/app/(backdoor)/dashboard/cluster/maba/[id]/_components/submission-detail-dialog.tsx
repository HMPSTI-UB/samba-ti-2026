"use client";

import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, XCircle } from "lucide-react";
import { FaRegMessage } from "react-icons/fa6";
import type { MemberTask, MySubmission } from "@/features/penugasan/types";
import TaskStatusBadge from "./status-badge";
import { cn } from "@/lib/cn";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task: MemberTask | null;
  onReview?: (submission: MySubmission, status: "ACCEPTED" | "REJECTED", feedback: string) => void;
  isPending?: boolean;
};

function formatDate(value: string) {
  return new Date(value).toLocaleString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function SubmissionDetailDialog({ open, onOpenChange, task, onReview, isPending }: Props) {
  const [feedback, setFeedback] = useState(task?.submission?.feedback ?? "");

  if (!task) return null;

  const fieldLabels: Record<string, string> = Object.fromEntries(
    (task.formFields ?? []).map((f) => [f.key, f.label]),
  );
  const fieldTypes: Record<string, string> = Object.fromEntries(
    (task.formFields ?? []).map((f) => [f.key, f.type]),
  );
  const submission = task.submission;
  const canReview = !!onReview && !!submission && submission.status === "PENDING";

  const hasValidDates = !!(submission?.submittedAt && task.deadline);
  const isLate = hasValidDates ? new Date(submission!.submittedAt).getTime() > new Date(task.deadline).getTime() : false;

  function handleReview(status: "ACCEPTED" | "REJECTED") {
    if (!submission) return;
    onReview?.(submission, status, feedback);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent title="Detail Submission" description={task.title}>
        {!submission ? (
          <p className="text-sm text-muted-text">Belum ada submission untuk tugas ini.</p>
        ) : (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <TaskStatusBadge status={task.doneStatus} />
                <span className="text-xs font-medium text-muted-text">
                  {task.doneStatus === "DONE" && "Nilai: 100"}
                  {task.doneStatus === "REJECTED" && "Nilai: 0"}
                  {task.doneStatus === "PENDING" && "Menunggu Penilaian"}
                </span>
                {hasValidDates && (
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                      isLate ? "bg-red-500/10 text-red-500" : "bg-emerald-500/10 text-emerald-500"
                    )}
                  >
                    {isLate ? "Terlambat" : "Tepat Waktu"}
                  </span>
                )}
              </div>
              <span className="text-xs text-muted-text">
                Dikumpulkan {formatDate(submission.submittedAt)}
              </span>
            </div>

            <div className="space-y-4">
              {Object.entries(submission.submissionData ?? {}).map(([key, value]) => (
                <div key={key}>
                  <label className="block text-xs font-medium text-muted-text mb-1">
                    {fieldLabels[key] ?? key}
                  </label>
                  {fieldTypes[key] === "link" && value ? (
                    <a
                      href={value}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex max-w-full items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-electric-blue underline break-all hover:bg-white/10"
                    >
                      {value}
                    </a>
                  ) : (
                    <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-soft-white whitespace-pre-wrap break-words">
                      {value || <span className="text-muted-text">—</span>}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {submission.feedback && (
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <p className="flex items-center gap-1.5 text-xs font-bold text-slate-300 mb-1.5">
                  <FaRegMessage className="h-3.5 w-3.5" />
                  Feedback Panitia
                </p>
                <p className="text-sm text-slate-300">{submission.feedback}</p>
              </div>
            )}

            {canReview && (
              <>
                <Input
                  label="Feedback"
                  placeholder="Masukkan feedback untuk MABA"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                />
                <div className="flex justify-end gap-3 pt-2">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleReview("REJECTED")}
                    disabled={isPending}
                    className="gap-1.5"
                  >
                    <XCircle size={14} />
                    Tolak
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleReview("ACCEPTED")}
                    disabled={isPending}
                    className="gap-1.5"
                  >
                    <CheckCircle size={14} />
                    Terima
                  </Button>
                </div>
              </>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
