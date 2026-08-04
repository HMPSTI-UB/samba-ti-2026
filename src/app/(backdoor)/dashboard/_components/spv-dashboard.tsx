"use client";

import { Users, ClipboardCheck, Clock, Star } from "lucide-react";
import DashboardCard from "@/components/common/dashboard-card";
import { useMyCluster } from "@/features/clusters/hooks/use-clusters";
import { useClusterDetail } from "@/features/clusters/hooks/use-clusters";
import { useSubmissions, useTasks } from "@/features/penugasan/hooks/use-tasks";
import type { Task } from "@/features/penugasan/types";

function nearestDeadline(tasks: Task[] | undefined): string {
  const published = (tasks ?? []).filter((t) => t.status === "PUBLISHED" && t.deadline);
  if (published.length === 0) return "—";
  const sorted = [...published].sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
  return new Date(sorted[0].deadline).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function SpvDashboard() {
  const { data: myClusterRes } = useMyCluster();
  const { data: subsRes } = useSubmissions();
  const { data: tasksRes } = useTasks();

  const clusterId = myClusterRes?.data?.id;
  const { data: detailRes } = useClusterDetail(clusterId ?? "");

  const members = detailRes?.data?.members ?? [];
  const totalTasks = detailRes?.data?.totalTasks ?? 0;
  const submissions = subsRes?.data ?? [];

  const pendingReview = submissions.filter((s) => s.status === "PENDING").length;
  const avgProgress =
    members.length > 0 && totalTasks > 0
      ? Math.round((members.reduce((acc, m) => acc + m.doneCount, 0) / (members.length * totalTasks)) * 100)
      : 0;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <DashboardCard
        title="Anggota Cluster"
        value={clusterId ? members.length : "—"}
        icon={Users}
        description="Mahasiswa binaan"
      />
      <DashboardCard
        title="Tugas Perlu Review"
        value={clusterId ? pendingReview : "—"}
        icon={ClipboardCheck}
        description="Menunggu penilaian"
      />
      <DashboardCard
        title="Tenggat Terdekat"
        value={clusterId ? nearestDeadline(tasksRes?.data) : "—"}
        icon={Clock}
        description="Deadline tugas"
      />
      <DashboardCard
        title="Rata-rata Cluster"
        value={clusterId ? `${avgProgress}%` : "—"}
        icon={Star}
        description="Performa anggota"
      />
    </div>
  );
}
