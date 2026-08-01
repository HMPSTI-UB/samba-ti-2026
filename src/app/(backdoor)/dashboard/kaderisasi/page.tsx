"use client";

import { useUserStore } from "@/stores/user.store";
import DashboardCard from "@/components/common/dashboard-card";
import { ClipboardCheck, Clock, Award, TrendingUp } from "lucide-react";

export default function KaderisasiDashboardPage() {
  const user = useUserStore((s) => s.user);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Dashboard Kaderisasi — {user?.name}
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Pantau perkembangan peserta
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Total Tugas"
          value="—"
          icon={ClipboardCheck}
          description="Tugas dibuat"
        />
        <DashboardCard
          title="Tenggat Hari Ini"
          value="—"
          icon={Clock}
          description="Tugas deadline hari ini"
        />
        <DashboardCard
          title="Rata-rata Nilai"
          value="—"
          icon={Award}
          description="Semua tugas"
        />
        <DashboardCard
          title="Tingkat Partisipasi"
          value="—"
          icon={TrendingUp}
          description="Peserta mengumpulkan"
        />
      </div>
    </div>
  );
}
