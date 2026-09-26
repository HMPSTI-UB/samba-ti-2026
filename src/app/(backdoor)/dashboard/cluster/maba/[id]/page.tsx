"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Loader2,
  ClipboardList,
  CheckCircle2,
  Clock3,
  XCircle,
  CircleDashed,
  CalendarClock,
  Star,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { useSweetAlert } from "@/components/common/sweet-alert-provider";
import { useMemberTasks, useReviewSubmission } from "@/features/penugasan/hooks/use-tasks";
import type { MySubmission } from "@/features/penugasan/types";
import MemberTaskList from "./_components/member-task-list";
import StatCard from "./_components/stat-card";

function genderLabel(gender: string | null): string {
  const n = gender?.trim().toUpperCase();
  if (n === "P" || n === "PEREMPUAN") return "Perempuan";
  if (n === "L" || n === "LAKI_LAKI") return "Laki-laki";
  return "—";
}

export default function MabaDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const mabaId = params.id;

  const { data: res, isLoading, isError } = useMemberTasks(mabaId);
  const reviewMutation = useReviewSubmission();
  const alert = useSweetAlert();
  const [now] = useState(() => Date.now());

  function handleReview(sub: MySubmission, status: "ACCEPTED" | "REJECTED", feedback: string, score?: number) {
    reviewMutation.mutate(
      { taskId: sub.taskId, id: sub.id, status, feedback, score },
      {
        onSuccess: () => alert.success("Review berhasil disimpan"),
        onError: (err: Error) => alert.error(err.message),
      },
    );
  }

  if (isLoading) {
    return (
      <div className="flex h-60 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-electric-blue" />
      </div>
    );
  }

  if (isError || !res?.data) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <p className="text-muted-text">MABA tidak ditemukan atau Anda tidak memiliki akses</p>
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 rounded-xl bg-[#FACC15] px-5 py-2.5 text-sm font-bold text-black transition-colors hover:bg-[#E6B800]"
        >
          <ArrowLeft size={16} /> Kembali
        </button>
      </div>
    );
  }

  const maba = res.data.maba;
  const tasks = res.data.tasks;
  const averageScore = res.data.averageScore;

  const stats = {
    total: tasks.length,
    done: tasks.filter((t) => t.doneStatus === "DONE").length,
    pending: tasks.filter((t) => t.doneStatus === "PENDING").length,
    rejected: tasks.filter((t) => t.doneStatus === "REJECTED").length,
    notSubmitted: tasks.filter((t) => t.doneStatus === "NOT_SUBMITTED").length,
    overdue: tasks.filter((t) => new Date(t.deadline).getTime() < now).length,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-card-bg text-muted-text transition-colors hover:bg-white/5 hover:text-soft-white"
        >
          <ArrowLeft size={18} />
        </button>
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-electric-blue/10 text-xl font-bold text-electric-blue">
          {maba.name.charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-2xl font-bold text-soft-white">{maba.name}</h1>
          <p className="text-sm text-muted-text">
            {maba.nim ?? "Mahasiswa Baru"} · {genderLabel(maba.gender)} · {maba.clusterName ?? "Belum ada cluster"}
          </p>
        </div>
        <span
          className={cn(
            "inline-block shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium",
            maba.status ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400",
          )}
        >
          {maba.status ? "Aktif" : "Nonaktif"}
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
        <StatCard label="Total Tugas" value={stats.total} icon={ClipboardList} accent="text-electric-blue" />
        <StatCard label="Selesai" value={stats.done} icon={CheckCircle2} accent="text-emerald-400" />
        <StatCard label="Menunggu Review" value={stats.pending} icon={Clock3} accent="text-amber-400" />
        <StatCard label="Perlu Revisi" value={stats.rejected} icon={XCircle} accent="text-red-400" />
        <StatCard label="Belum Dikerjakan" value={stats.notSubmitted} icon={CircleDashed} accent="text-slate-300" />
        <StatCard label="Lewat Deadline" value={stats.overdue} icon={CalendarClock} accent="text-sun-gold" />
        <StatCard label="Rata-rata Nilai" value={averageScore != null ? averageScore : "-"} icon={Star} accent="text-emerald-400" />
      </div>

      <MemberTaskList tasks={tasks} onReview={handleReview} isReviewPending={reviewMutation.isPending} />
    </div>
  );
}
