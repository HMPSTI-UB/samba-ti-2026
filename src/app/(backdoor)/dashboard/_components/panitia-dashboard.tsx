"use client";

import Link from "next/link";
import {
  Users,
  UserRound,
  Layers,
  ClipboardCheck,
  Megaphone,
  Clock,
  CalendarClock,
  Hourglass,
  TrendingUp,
  FilePlus,
  Upload,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import DashboardCard from "@/components/common/dashboard-card";
import { useUserStore } from "@/stores/user.store";
import { usePanitiaDashboard } from "@/features/dashboard/hooks/use-panitia-dashboard";
import { useAuditLogs } from "@/features/audit-logs/hooks/use-audit-logs";
import type { DashboardTask } from "@/features/dashboard/types";
import type { AuditAction } from "@/features/audit-logs/types";

const AUDIT_ACTION_COLORS: Record<AuditAction, string> = {
  CREATE: "bg-emerald-500/10 text-emerald-400",
  UPDATE: "bg-electric-blue/10 text-electric-blue",
  DELETE: "bg-red-500/10 text-red-400",
};

const AUDIT_ENTITY_LABELS: Record<string, string> = {
  user: "User",
  maba: "Maba",
  cluster: "Cluster",
  task: "Tugas",
  task_submission: "Submission",
  announcement: "Pengumuman",
  election: "Election",
};

type QuickAction = {
  label: string;
  description: string;
  href: string;
  icon: LucideIcon;
  adminOnly?: boolean;
};

const QUICK_ACTIONS: QuickAction[] = [
  { label: "Tambah Tugas", description: "Buat tugas penugasan baru", href: "/dashboard/tugas/create", icon: FilePlus },
  { label: "Buat Cluster", description: "Buat kelompok mahasiswa baru", href: "/dashboard/clusters", icon: Layers },
  { label: "Import MABA", description: "Import mahasiswa dari CSV", href: "/dashboard/clusters", icon: Upload },
  { label: "Buat Pengumuman", description: "Kirim pengumuman ke peserta", href: "/dashboard/pengumuman", icon: Megaphone },
  { label: "Kelola MABA", description: "Tambah / ubah data mahasiswa", href: "/dashboard/maba", icon: UserRound, adminOnly: true },
];

function formatDeadline(value: string | null): string {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatTime(value: string): string {
  return new Date(value).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function TaskStatusBadge({ status }: { status: DashboardTask["status"] }) {
  if (status === "PUBLISHED") {
    return (
      <span className="shrink-0 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase text-emerald-400">
        Published
      </span>
    );
  }
  return (
    <span className="shrink-0 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase text-muted-text">
      Draft
    </span>
  );
}

export default function PanitiaDashboard() {
  const user = useUserStore((s) => s.user);
  const isAdmin = user?.role?.toUpperCase() === "ADMIN";
  const { data, isLoading } = usePanitiaDashboard();
  const { data: auditData, isLoading: auditLoading } = useAuditLogs(
    { page: 1, limit: 5 },
    { enabled: isAdmin },
  );

  if (isLoading && !data) {
    return <div className="p-10 text-center text-sm text-muted-text">Memuat data...</div>;
  }

  const d = data?.data;
  const actions = QUICK_ACTIONS.filter((a) => !a.adminOnly || isAdmin);
  const latestPending = d?.latestPending ?? [];
  const latestTasks = d?.latestTasks ?? [];
  const recentAuditLogs = auditData?.data ?? [];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Total Mahasiswa"
          value={d?.totalMaba ?? 0}
          icon={Users}
          description="Peserta terdaftar"
          iconBgClass="bg-emerald-500/10"
          iconColorClass="text-emerald-400"
        />
        <DashboardCard
          title="Total SPV"
          value={d?.totalSpv ?? 0}
          icon={UserRound}
          description="Supervisor bertugas"
          iconBgClass="bg-pink-500/10"
          iconColorClass="text-pink-400"
        />
        <DashboardCard
          title="Total Cluster"
          value={d?.totalClusters ?? 0}
          icon={Layers}
          description="Kelompok mahasiswa"
          iconBgClass="bg-cosmic-purple/20"
          iconColorClass="text-cosmic-purple"
        />
        <DashboardCard
          title="Total Tugas"
          value={d?.totalTasks ?? 0}
          icon={ClipboardCheck}
          description={d && d.totalDraftTasks > 0 ? `${d.totalDraftTasks} draft` : "Tugas aktif"}
          iconBgClass="bg-supernova-orange/10"
          iconColorClass="text-supernova-orange"
        />
        <DashboardCard
          title="Perlu Review"
          value={d?.submissions.pending ?? 0}
          icon={Clock}
          description="Menunggu penilaian"
          iconBgClass="bg-sun-gold/10"
          iconColorClass="text-sun-gold"
        />
        <DashboardCard
          title="Tingkat Partisipasi"
          value={`${d?.participationRate ?? 0}%`}
          icon={TrendingUp}
          description="Sudah mengumpulkan tugas"
          iconBgClass="bg-electric-blue/10"
          iconColorClass="text-electric-blue"
        />
        <DashboardCard
          title="Tenggat Hari Ini"
          value={d?.deadlinesToday ?? 0}
          icon={CalendarClock}
          description="Tugas deadline hari ini"
          iconBgClass="bg-red-500/10"
          iconColorClass="text-red-400"
        />
        <DashboardCard
          title="Tenggat Terdekat"
          value={formatDeadline(d?.nearestDeadline ?? null)}
          icon={Hourglass}
          description="Deadline tugas berikutnya"
          iconBgClass="bg-cyan-500/10"
          iconColorClass="text-cyan-400"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="mb-3 text-lg font-bold text-soft-white">Quick Actions</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {actions.map(({ label, description, href, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                className="group flex items-center gap-4 rounded-xl border border-white/10 bg-card-bg p-5 transition-colors hover:border-sun-gold/40 hover:bg-white/5"
              >
                <div className="rounded-lg bg-cosmic-purple/20 p-3">
                  <Icon className="h-5 w-5 text-electric-blue" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-soft-white">{label}</p>
                  <p className="text-xs text-muted-text">{description}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-text transition-transform group-hover:translate-x-1 group-hover:text-sun-gold" />
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-bold text-soft-white">Perlu Review</h2>
            {latestPending.length > 0 && (
              <Link href="/dashboard/tugas" className="flex items-center gap-1 text-xs font-semibold text-electric-blue hover:text-electric-blue/80">
                Lihat Semua <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            )}
          </div>
          <div className="rounded-xl border border-white/10 bg-card-bg overflow-hidden">
            {latestPending.length === 0 ? (
              <p className="p-6 text-center text-sm text-muted-text">
                Tidak ada submission yang menunggu review.
              </p>
            ) : (
              <ul className="divide-y divide-white/5">
                {latestPending.map((s) => (
                  <li key={s.id}>
                    <Link
                      href={`/dashboard/tugas/${s.taskId}`}
                      className="flex items-center gap-3 p-4 transition-colors hover:bg-white/5"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="truncate text-sm font-medium text-soft-white">{s.mabaName}</p>
                        <p className="truncate text-xs text-muted-text">{s.taskTitle}</p>
                        <p className="mt-0.5 flex items-center gap-1.5 text-[11px] text-muted-text">
                          {s.clusterName ? <span>{s.clusterName}</span> : <span className="text-amber-400/80">Tanpa cluster</span>}
                          <span>·</span>
                          <span>{formatTime(s.submittedAt)}</span>
                        </p>
                      </div>
                      <span className="shrink-0 rounded-full bg-yellow-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase text-yellow-400">
                        Review
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {isAdmin && (
            <div className="mt-6">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-lg font-bold text-soft-white">Aktivitas Terbaru</h2>
                <Link href="/dashboard/audit-logs" className="flex items-center gap-1 text-xs font-semibold text-electric-blue hover:text-electric-blue/80">
                  Lihat Semua <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
              <div className="rounded-xl border border-white/10 bg-card-bg overflow-hidden">
                {auditLoading ? (
                  <p className="p-6 text-center text-sm text-muted-text">Memuat...</p>
                ) : recentAuditLogs.length === 0 ? (
                  <p className="p-6 text-center text-sm text-muted-text">
                    Belum ada aktivitas tercatat.
                  </p>
                ) : (
                  <ul className="divide-y divide-white/5">
                    {recentAuditLogs.map((log) => (
                      <li key={log.id} className="flex items-center gap-3 p-4">
                        <span
                          className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${AUDIT_ACTION_COLORS[log.action]}`}
                        >
                          {log.action}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="truncate text-sm font-medium text-soft-white">
                            {AUDIT_ENTITY_LABELS[log.entityType] ?? log.entityType} · {log.performerName}
                          </p>
                          <p className="text-[11px] text-muted-text">{formatTime(log.createdAt)}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-bold text-soft-white">Tugas Terbaru</h2>
          <Link href="/dashboard/tugas" className="flex items-center gap-1 text-xs font-semibold text-electric-blue hover:text-electric-blue/80">
            Lihat Semua <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="rounded-xl border border-white/10 bg-card-bg overflow-hidden">
          {latestTasks.length === 0 ? (
            <p className="p-6 text-center text-sm text-muted-text">Belum ada tugas.</p>
          ) : (
            <ul className="divide-y divide-white/5">
              {latestTasks.map((t) => (
                <li key={t.id}>
                  <Link
                    href={`/dashboard/tugas/${t.id}`}
                    className="flex items-center gap-3 p-4 transition-colors hover:bg-white/5"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-sm font-medium text-soft-white">{t.title}</p>
                      <p className="mt-0.5 flex items-center gap-1.5 text-[11px] text-muted-text">
                        <span>Deadline {formatDeadline(t.deadline)}</span>
                        <span>·</span>
                        <span>Dibuat {formatTime(t.createdAt)}</span>
                      </p>
                    </div>
                    <TaskStatusBadge status={t.status} />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
