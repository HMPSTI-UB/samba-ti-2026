"use client";

import { useUserStore } from "@/stores/user.store";
import SpvDashboard from "./_components/spv-dashboard";
import PanitiaDashboard from "./_components/panitia-dashboard";

const GREETINGS: Record<string, string> = {
  ADMIN: "Ringkasan kegiatan SAMBA TI 2026",
  KADERISASI: "Pantau perkembangan peserta",
  SPV: "Kelola anggota cluster Anda",
};

export default function DashboardPage() {
  const user = useUserStore((s) => s.user);
  const role = user?.role?.toUpperCase() ?? "ADMIN";
  const isSpv = role === "SPV";
  const greeting = GREETINGS[role] ?? GREETINGS.ADMIN;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-soft-white">Selamat datang, {user?.name}</h1>
        <p className="text-sm text-muted-text mt-1">{greeting}</p>
      </div>

      {isSpv ? <SpvDashboard /> : <PanitiaDashboard />}
    </div>
  );
}
