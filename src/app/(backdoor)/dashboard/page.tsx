"use client";

import { useUserStore } from "@/stores/user.store";
import DashboardCard from "@/components/common/dashboard-card";
import {
  Users,
  Layers,
  ClipboardCheck,
  Megaphone,
  Clock,
  Star,
  Award,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

type Card = { title: string; value: string; icon: LucideIcon; description: string };

const CARDS: Record<string, Card[]> = {
  ADMIN: [
    { title: "Total Mahasiswa", value: "—", icon: Users, description: "Peserta terdaftar" },
    { title: "Total Cluster", value: "—", icon: Layers, description: "Kelompok mahasiswa" },
    { title: "Total Tugas", value: "—", icon: ClipboardCheck, description: "Tugas aktif" },
    { title: "Pengumuman", value: "—", icon: Megaphone, description: "Pengumuman terbaru" },
  ],
  KADERISASI: [
    { title: "Total Tugas", value: "—", icon: ClipboardCheck, description: "Tugas dibuat" },
    { title: "Tenggat Hari Ini", value: "—", icon: Clock, description: "Tugas deadline hari ini" },
    { title: "Rata-rata Nilai", value: "—", icon: Award, description: "Semua tugas" },
    { title: "Tingkat Partisipasi", value: "—", icon: TrendingUp, description: "Peserta mengumpulkan" },
  ],
  SPV: [
    { title: "Anggota Cluster", value: "—", icon: Users, description: "Mahasiswa binaan" },
    { title: "Tugas Perlu Review", value: "—", icon: ClipboardCheck, description: "Menunggu penilaian" },
    { title: "Tenggat Terdekat", value: "—", icon: Clock, description: "Deadline tugas" },
    { title: "Rata-rata Cluster", value: "—", icon: Star, description: "Performa anggota" },
  ],
};

const GREETINGS: Record<string, string> = {
  ADMIN: "Ringkasan kegiatan SAMBA TI 2026",
  KADERISASI: "Pantau perkembangan peserta",
  SPV: "Kelola anggota cluster Anda",
};

export default function DashboardPage() {
  const user = useUserStore((s) => s.user);
  const role = user?.role?.toUpperCase() ?? "ADMIN";
  const cards = CARDS[role] ?? CARDS.ADMIN;
  const greeting = GREETINGS[role] ?? GREETINGS.ADMIN;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-soft-white">Selamat datang, {user?.name}</h1>
        <p className="text-sm text-muted-text mt-1">{greeting}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <DashboardCard
            key={card.title}
            title={card.title}
            value={card.value}
            icon={card.icon}
            description={card.description}
          />
        ))}
      </div>
    </div>
  );
}
