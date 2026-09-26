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
  onReview?: (submission: MySubmission, status: "ACCEPTED" | "REJECTED", feedback: string, score?: number) => void;
  isPending?: boolean;
  lateMaxScore?: number;
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

export default function SubmissionDetailDialog({ open, onOpenChange, task, onReview, isPending, lateMaxScore }: Props) {
  const submission = task?.submission ?? null;
  const hasValidDates = !!(submission?.submittedAt && task?.deadline);
  const isLate = hasValidDates && submission ? new Date(submission.submittedAt).getTime() > new Date(task!.deadline).getTime() : false;

  const [feedback, setFeedback] = useState(submission?.feedback ?? "");
  const [scoreInput, setScoreInput] = useState(
    submission?.score != null
      ? String(submission.score)
      : isLate && lateMaxScore != null
        ? String(lateMaxScore)
        : "",
  );
  const [error, setError] = useState("");

  if (!task) return null;

  const fieldLabels: Record<string, string> = Object.fromEntries(
    (task.formFields ?? []).map((f) => [f.key, f.label]),
  );
  const fieldTypes: Record<string, string> = Object.fromEntries(
    (task.formFields ?? []).map((f) => [f.key, f.type]),
  );
  const canReview = !!onReview && !!submission;

  function handleReview(status: "ACCEPTED" | "REJECTED") {
    if (!submission) return;

    if (status === "ACCEPTED") {
      const parsed = Number(scoreInput);
      if (scoreInput.trim() === "" || !Number.isInteger(parsed) || parsed < 0 || parsed > 100) {
        setError("Nilai wajib diisi angka bulat 0–100");
        return;
      }
    }

    setError("");
    const parsed = scoreInput.trim() === "" ? undefined : Number(scoreInput);
    onReview?.(submission, status, feedback, parsed);
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
                  {submission.score != null ? `Nilai: ${submission.score}` : "Belum dinilai"}
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
                {isLate && (
                  <p className="rounded-lg border border-red-500/20 bg-red-500/5 px-3 py-2 text-xs text-red-300">
                    Submission terlambat — nilai otomatis mengikuti pengaturan keterlambatan, tetapi tetap bisa diubah.
                  </p>
                )}
                <Input
                  label="Nilai (0–100)"
                  type="number"
                  min={0}
                  max={100}
                  placeholder="Contoh: 85"
                  value={scoreInput}
                  error={error}
                  onChange={(e) => {
                    setScoreInput(e.target.value);
                    if (error) setError("");
                  }}
                />
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
                    {submission.status === "PENDING" ? "Terima" : "Simpan Nilai"}
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
