"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  FaArrowLeft,
  FaArrowRightLong,
  FaCalendarDay,
  FaSpinner,
  FaCircleCheck,
  FaClock,
  FaCircleXmark,
  FaClipboardList,
  FaRegMessage,
} from "react-icons/fa6";
import { useTask, useMySubmission, useSubmitTask } from "@/features/penugasan/hooks/use-tasks";
import FormRenderer from "@/features/penugasan/components/form-renderer";
import type { MySubmission } from "@/features/penugasan/types";
import { useSweetAlert } from "@/components/common/sweet-alert-provider";
import { cn } from "@/lib/cn";

type Status = "NOT_SUBMITTED" | "PENDING" | "ACCEPTED" | "REJECTED";

const STATUS_META: Record<
  Status,
  { label: string; class: string; icon: typeof FaClock }
> = {
  NOT_SUBMITTED: { label: "Belum Dikerjakan", class: "bg-white/5 text-slate-300", icon: FaClock },
  PENDING: { label: "Menunggu Review", class: "bg-amber-500/15 text-amber-400", icon: FaClock },
  ACCEPTED: { label: "Selesai", class: "bg-emerald-500/15 text-emerald-400", icon: FaCircleCheck },
  REJECTED: { label: "Perlu Revisi", class: "bg-red-500/15 text-red-400", icon: FaCircleXmark },
};

function formatDeadline(value: string) {
  return new Date(value).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function submissionStatus(sub: MySubmission | null): Status {
  if (!sub) return "NOT_SUBMITTED";
  if (sub.status === "ACCEPTED") return "ACCEPTED";
  if (sub.status === "REJECTED") return "REJECTED";
  return "PENDING";
}

function StatusBadge({ status }: { status: Status }) {
  const meta = STATUS_META[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold capitalize whitespace-nowrap",
        meta.class,
      )}
    >
      <meta.icon className="h-3 w-3" />
      {meta.label}
    </span>
  );
}

function AnswerList({ data, fieldLabels }: { data: Record<string, string>; fieldLabels: Record<string, string> }) {
  const entries = Object.entries(data ?? {});
  if (entries.length === 0) return <p className="text-sm text-muted-text">Tidak ada jawaban.</p>;
  return (
    <div className="space-y-4">
      {entries.map(([key, value]) => (
        <div key={key}>
          <label className="block text-xs font-medium text-muted-text mb-1">
            {fieldLabels[key] ?? key}
          </label>
          <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-soft-white whitespace-pre-wrap">
            {value || <span className="text-muted-text">—</span>}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function MabaTaskDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = params.id;

  const { data: taskRes, isLoading: taskLoading } = useTask(id);
  const { data: submissionRes, isLoading: subLoading } = useMySubmission(id);
  const submitMutation = useSubmitTask();
  const { success: alertSuccess, error: alertError } = useSweetAlert();

  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const task = taskRes?.data;
  const submission = submissionRes?.data ?? null;
  const status = submissionStatus(submission);

  const isLoading = taskLoading || subLoading;

  function handleChange(key: string, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }

  function validate(): boolean {
    const next: Record<string, string> = {};
    (task?.formFields ?? []).forEach((f) => {
      if (f.isRequired && !(values[f.key] ?? "").trim()) {
        next[f.key] = "Field ini wajib diisi";
      }
    });
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit() {
    if (!validate()) return;
    submitMutation.mutate(
      { taskId: id, data: values },
      {
        onSuccess: () => {
          alertSuccess("Tugas berhasil dikumpulkan");
        },
        onError: (err: Error) => alertError(err.message),
      },
    );
  }

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center text-white/50">
        <FaSpinner className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!task) {
    return (
      <div className="rounded-2xl border border-white/20 p-8 text-center bg-background/50">
        <FaClipboardList className="h-12 w-12 text-muted-text mx-auto mb-4" />
        <h2 className="text-xl font-bold text-soft-white">Tugas Tidak Ditemukan</h2>
        <button
          onClick={() => router.push("/app/penugasan")}
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#FACC15] px-5 py-2.5 text-sm font-bold text-black hover:bg-[#E6B800] transition-colors"
        >
          <FaArrowLeft className="h-3.5 w-3.5" />
          Kembali ke Daftar
        </button>
      </div>
    );
  }

  const fieldLabels: Record<string, string> = Object.fromEntries(
    (task.formFields ?? []).map((f) => [f.key, f.label]),
  );
  const prefill = status === "REJECTED" ? (submission?.submissionData ?? {}) : {};

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-card-bg text-muted-text transition-colors hover:bg-white/5 hover:text-soft-white"
        >
          <FaArrowLeft className="h-4 w-4" />
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="truncate text-2xl font-bold text-soft-white">{task.title}</h1>
          <div className="mt-1 flex items-center gap-3">
            <StatusBadge status={status} />
            <span className="text-sm text-muted-text flex items-center gap-1.5">
              <FaCalendarDay className="h-3.5 w-3.5" />
              Tenggat: {formatDeadline(task.deadline)}
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 items-start">
        {/* KIRI — Info Tugas */}
        <div className="rounded-2xl border border-white bg-background/30 p-6 space-y-6">
          <div>
            <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white mb-3">
              <FaClipboardList className="h-4 w-4 text-sun-gold" />
              Deskripsi
            </h3>
            {task.description ? (
              <div
                className="rich-text"
                dangerouslySetInnerHTML={{ __html: task.description }}
              />
            ) : (
              <p className="text-sm text-muted-text">Tidak ada deskripsi.</p>
            )}
          </div>

          {task.termsConditions && task.termsConditions.length > 0 && (
            <div className="border-t border-white/10 pt-6">
              <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white mb-3">
                <FaClipboardList className="h-4 w-4 text-sun-gold" />
                Prasyarat / Ketentuan
              </h3>
              <ul className="space-y-2">
                {task.termsConditions.map((t, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sun-gold" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* KANAN — Form / Status */}
        <div className="rounded-2xl border border-white bg-background/30 p-6">
          {status === "ACCEPTED" && (
            <div className="space-y-5">
              <div className="flex items-center gap-2 text-emerald-400">
                <FaCircleCheck className="h-5 w-5" />
                <h3 className="font-bold text-white">Tugas Selesai</h3>
              </div>
              <AnswerList data={submission?.submissionData ?? {}} fieldLabels={fieldLabels} />
              {submission?.feedback && (
                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <p className="flex items-center gap-1.5 text-xs font-bold text-slate-300 mb-1.5">
                    <FaRegMessage className="h-3.5 w-3.5" />
                    Feedback Panitia
                  </p>
                  <p className="text-sm text-slate-300">{submission.feedback}</p>
                </div>
              )}
            </div>
          )}

          {status === "PENDING" && (
            <div className="space-y-5">
              <div className="flex items-center gap-2 text-amber-400">
                <FaClock className="h-5 w-5" />
                <h3 className="font-bold text-white">Menunggu Review</h3>
              </div>
              <p className="text-sm text-slate-300">
                Jawabanmu sedang ditinjau oleh panitia. Kamu akan mendapat notifikasi setelah
                direview.
              </p>
              <AnswerList data={submission?.submissionData ?? {}} fieldLabels={fieldLabels} />
            </div>
          )}

          {(status === "NOT_SUBMITTED" || status === "REJECTED") && (
            <div className="space-y-5">
              {status === "REJECTED" && (
                <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-4">
                  <p className="flex items-center gap-1.5 text-xs font-bold text-red-400 mb-1.5">
                    <FaCircleXmark className="h-3.5 w-3.5" />
                    Perlu Revisi
                  </p>
                  <p className="text-sm text-slate-300">
                    {submission?.feedback ?? "Jawabanmu perlu diperbaiki. Silakan kirim ulang."}
                  </p>
                </div>
              )}

              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-4">
                  {status === "REJECTED" ? "Perbaiki Jawaban" : "Isi Tugas"}
                </h3>
                <FormRenderer
                  fields={task.formFields ?? []}
                  values={{ ...prefill, ...values }}
                  onChange={handleChange}
                  errors={errors}
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={submitMutation.isPending}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#FACC15] px-6 py-3 text-sm font-bold text-black hover:bg-[#E6B800] transition-colors shadow-[0_0_20px_rgba(250,204,21,0.25)] disabled:opacity-60"
              >
                {submitMutation.isPending ? (
                  <FaSpinner className="h-4 w-4 animate-spin" />
                ) : status === "REJECTED" ? (
                  "Kirim Ulang"
                ) : (
                  "Kumpulkan Tugas"
                )}
                {!submitMutation.isPending && <FaArrowRightLong className="h-3.5 w-3.5" />}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}