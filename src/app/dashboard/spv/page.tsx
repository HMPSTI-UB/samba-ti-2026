"use client";

import { useUserStore } from "@/stores/user.store";
import DashboardCard from "@/components/common/dashboard-card";
import { Users, ClipboardCheck, Clock, Star } from "lucide-react";

export default function SpvDashboardPage() {
  const user = useUserStore((s) => s.user);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Dashboard SPV — {user?.name}
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Kelola anggota cluster Anda
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Anggota Cluster"
          value="—"
          icon={Users}
          description="Mahasiswa binaan"
        />
        <DashboardCard
          title="Tugas Perlu Review"
          value="—"
          icon={ClipboardCheck}
          description="Menunggu penilaian"
        />
        <DashboardCard
          title="Tenggat Terdekat"
          value="—"
          icon={Clock}
          description="Deadline tugas"
        />
        <DashboardCard
          title="Rata-rata Cluster"
          value="—"
          icon={Star}
          description="Performa anggota"
        />
      </div>
    </div>
  );
}
