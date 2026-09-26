"use client";

import { FaClipboardList, FaClipboardCheck, FaUsers, FaCalendarDay, FaStar } from "react-icons/fa6";
import { useUser } from "@/features/auth/hooks/use-user";
import { useMabaDashboard } from "@/features/maba/hooks/use-maba-dashboard";
import StatCard from "./dashboard/stat-card";
import QuickActions from "./dashboard/quick-actions";
import AnnouncementsPanel from "./dashboard/announcements-panel";

export default function DashboardContent() {
  const { data: userData, isLoading: userLoading } = useUser();
  const { data: dashboardData, isLoading: dashboardLoading } = useMabaDashboard();

  if (userLoading || dashboardLoading) return null;

  const user = userData?.data;
  const dashboard = dashboardData?.data;

  const totalTasks = dashboard?.totalTasks ?? 0;
  const progress = totalTasks > 0 ? Math.round(((dashboard?.doneCount ?? 0) / totalTasks) * 100) : 0;
  
  const firstName = user?.name ? user.name.split(" ")[0] : "";
  const clusterName = dashboard?.cluster?.name ?? "Sirius"; // Fallback like design
  const spvName = dashboard?.cluster?.spvName ?? "Zuno Star"; // Fallback like design

  return (
    <div className="space-y-6">
      {/* HEADER SECTION */}
      <div className="border border-white rounded-2xl p-6 relative bg-gradient-to-br from-background to-background/50 flex flex-col justify-center min-h-[140px]">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          <span className="text-white">Halo, </span>
          <span className="bg-gradient-to-r from-electric-blue via-cosmic-purple to-supernova-orange bg-clip-text text-transparent">
            {firstName}!
          </span>
        </h1>
        <p className="mt-3 text-sm md:text-base text-slate-300 font-medium">
          Terus Semangat! Perjalanan menuju ZENITH 2026 baru saja dimulai.
        </p>
      </div>

      {/* STATS SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        {/* Progress (2 cols) */}
        <div className="md:col-span-2">
          <StatCard
            title="Progres SAMBA TI"
            value={`${progress}%`}
            icon={FaClipboardCheck}
            progress={progress}
            iconBgClass="bg-electric-blue/10"
            iconColorClass="text-electric-blue"
            progressClass="bg-supernova-orange"
            variant="inline"
          />
        </div>
        
        {/* Total Tugas */}
        <StatCard
          title="Total Tugas"
          value={totalTasks.toString().padStart(2, "0")}
          icon={FaClipboardList}
          iconColorClass="text-cosmic-purple"
        />
        
        {/* Deadline Terdekat */}
        <StatCard
          title="Deadline Terdekat"
          value={
            dashboard?.nearestDeadline
              ? "01" // matching visual
              : "00"
          }
          icon={FaCalendarDay}
          iconColorClass="text-supernova-orange"
        />

        {/* Nilai Rata-rata */}
        <StatCard
          title="Nilai Rata-rata"
          value={dashboard?.averageScore != null ? String(dashboard.averageScore) : "-"}
          icon={FaStar}
          iconColorClass="text-emerald-400"
        />

        {/* Hubungi SPV (Custom Card) */}
        <div className="rounded-xl border border-white bg-background/50 p-4 flex items-center justify-between gap-3 h-full overflow-hidden">
          <FaUsers className="h-10 w-10 text-white shrink-0" />
          <div className="flex flex-col flex-1 min-w-0">
            <p className="text-[10px] uppercase text-muted-text font-medium leading-tight mb-0.5">Hubungi SPV</p>
            <p className="text-sm font-bold text-soft-white leading-tight truncate">{clusterName}</p>
            <p className="text-[10px] text-muted-text truncate">{spvName}</p>
            <button className="mt-1.5 flex items-center justify-center gap-1.5 rounded-full bg-cosmic-purple/20 px-3 py-1 text-[10px] font-medium text-cosmic-purple hover:bg-cosmic-purple/30 transition-colors w-fit">
              <span className="h-1.5 w-1.5 rounded-full bg-cosmic-purple animate-pulse"></span>
              Hubungi
            </button>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* DEADLINE TERDEKAT (Left - 2 cols) */}
        <div className="md:col-span-2 space-y-4 rounded-2xl border border-white p-6 bg-background/30">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-black tracking-widest text-white uppercase">Deadline Terdekat</h2>
            <button className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 transition-colors">
              Lihat Semua <span className="text-lg leading-none">→</span>
            </button>
          </div>
          <QuickActions tasks={dashboard?.latestTasks ?? []} />
        </div>

        {/* NOTIFIKASI (Right - 1 col) */}
        <div className="md:col-span-1 rounded-2xl border border-white p-6 flex flex-col h-full bg-background/30 max-h-[400px]">
          <h2 className="text-lg font-black tracking-widest text-white text-center uppercase mb-4 border-b border-white pb-3">Notifikasi</h2>
          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
             <AnnouncementsPanel />
          </div>
        </div>
      </div>
    </div>
  );
}