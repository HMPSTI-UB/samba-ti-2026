"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Search, ListChecks } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { useTask, useTaskSubmissions, useReviewSubmission } from "@/features/penugasan/hooks/use-tasks";
import type { Submission } from "@/features/penugasan/types";
import { useClusters } from "@/features/clusters/hooks/use-clusters";
import SubmissionViewer from "@/features/penugasan/components/submission-viewer";
import { useSweetAlert } from "@/components/common/sweet-alert-provider";
import { cn } from "@/lib/cn";

export default function TaskDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = params.id;

  const [search, setSearch] = useState("");
  const [clusterId, setClusterId] = useState("");

  const { data: taskRes, isLoading: taskLoading } = useTask(id);
  const { data: subsRes, isLoading: subsLoading } = useTaskSubmissions(id, { search, clusterId });
  const { data: clustersRes } = useClusters();
  const reviewMutation = useReviewSubmission();
  const alert = useSweetAlert();

  const task = taskRes?.data;
  const submissions = subsRes?.data ?? [];
  const clusters = clustersRes?.data ?? [];

  function handleReview(sub: Submission, status: "ACCEPTED" | "REJECTED", feedback: string) {
    reviewMutation.mutate(
      { taskId: sub.taskId, id: sub.id, status, feedback },
      {
        onSuccess: () => alert.success("Review berhasil disimpan"),
        onError: (err: Error) => alert.error(err.message),
      },
    );
  }

  if (taskLoading) {
    return (
      <div className="flex h-60 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-electric-blue/30 border-t-electric-blue" />
      </div>
    );
  }

  if (!task) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <p className="text-muted-text">Tugas tidak ditemukan</p>
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft size={16} /> Kembali
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-card-bg text-muted-text transition-colors hover:bg-white/5 hover:text-soft-white"
        >
          <ArrowLeft size={18} />
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="truncate text-2xl font-bold text-soft-white">{task.title}</h1>
          <div className="flex items-center gap-3 mt-1">
            <span
              className={cn(
                "inline-block rounded-full px-2.5 py-0.5 text-xs font-medium",
                task.status === "PUBLISHED" ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"
              )}
            >
              {task.status === "PUBLISHED" ? "Terbit" : "Draft"}
            </span>
            <span className="text-sm text-muted-text">
              Tenggat: {new Date(task.deadline).toLocaleString("id-ID", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Detail Tugas */}
        <div className="lg:col-span-1 space-y-4">
          <div className="rounded-xl border border-white/10 bg-card-bg p-5">
            <h3 className="font-semibold text-soft-white mb-3">Deskripsi</h3>
            <div
              className="prose prose-invert prose-sm text-muted-text"
              dangerouslySetInnerHTML={{ __html: task.description }}
            />

            {task.termsConditions && task.termsConditions.length > 0 && (
              <div className="mt-6">
                <h3 className="font-semibold text-soft-white mb-3">Prasyarat</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm text-muted-text">
                  {task.termsConditions.map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Submissions */}
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-xl border border-white/10 bg-card-bg overflow-hidden">
            <div className="p-5 border-b border-white/10 space-y-4">
              <div className="flex items-center gap-2 text-electric-blue">
                <ListChecks size={20} />
                <h3 className="font-semibold text-soft-white">Submissions</h3>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative flex-1 min-w-[200px]">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-text" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Cari nama MABA..."
                    className="w-full h-10 pl-9 pr-4 rounded-lg border border-white/10 bg-transparent text-sm text-soft-white placeholder:text-muted-text focus:outline-none focus:ring-2 focus:ring-electric-blue/30 focus:border-electric-blue/50"
                  />
                </div>
                <Select
                  items={[
                    { value: "", label: "Semua Cluster" },
                    ...clusters.map((c) => ({ value: c.id, label: c.name })),
                  ]}
                  value={clusterId}
                  onValueChange={setClusterId}
                  placeholder="Filter Cluster"
                  className="w-48"
                />
              </div>
            </div>

            {subsLoading ? (
              <div className="p-10 text-center text-sm text-muted-text">Memuat submissions...</div>
            ) : (
              <SubmissionViewer
                submissions={submissions}
                onReview={handleReview}
                isPending={reviewMutation.isPending}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
