"use client";

import { useUserStore } from "@/stores/user.store";
import DashboardCard from "@/components/common/dashboard-card";
import { Users, Layers, ClipboardCheck, Megaphone } from "lucide-react";

export default function AdminDashboardPage() {
  const user = useUserStore((s) => s.user);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Selamat datang, {user?.name}
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Ringkasan kegiatan SAMBA TI 2026
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Total Mahasiswa"
          value="—"
          icon={Users}
          description="Peserta terdaftar"
        />
        <DashboardCard
          title="Total Cluster"
          value="—"
          icon={Layers}
          description="Kelompok mahasiswa"
        />
        <DashboardCard
          title="Total Tugas"
          value="—"
          icon={ClipboardCheck}
          description="Tugas aktif"
        />
        <DashboardCard
          title="Pengumuman"
          value="—"
          icon={Megaphone}
          description="Pengumuman terbaru"
        />
      </div>
    </div>
  );
}
