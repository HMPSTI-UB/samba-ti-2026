"use client";

import { useMabaDashboard } from "@/features/maba/hooks/use-maba-dashboard";
import { useClusterDetail } from "@/features/maba/api/cluster";
import { FaUsers, FaClipboardList, FaSpinner, FaWhatsapp, FaUserTie } from "react-icons/fa6";
import ClusterDetailTable from "./_components/cluster-detail-table";
import ClusterStatCard from "./_components/cluster-stat-card";

export default function MabaClusterPage() {
  const { data: dashboardData, isLoading: dashboardLoading } = useMabaDashboard();
  const clusterId = dashboardData?.data?.cluster?.id;

  const { data: detailData, isLoading: detailLoading } = useClusterDetail(clusterId);

  if (dashboardLoading || (clusterId && detailLoading)) {
    return (
      <div className="flex h-[50vh] items-center justify-center text-white/50">
        <FaSpinner className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!clusterId) {
    return (
      <div className="rounded-2xl border border-white/20 p-8 text-center bg-background/50">
        <FaUsers className="h-12 w-12 text-muted-text mx-auto mb-4" />
        <h2 className="text-xl font-bold text-soft-white">Belum Bergabung dengan Cluster</h2>
        <p className="text-muted-text mt-2">Anda belum diarahkan ke cluster manapun. Silakan hubungi panitia.</p>
      </div>
    );
  }

  const detail = detailData?.data;
  if (!detail) return null;

  const { cluster, totalTasks, members } = detail;
  const totalMembers = members.length;
  const cohesion =
    totalTasks > 0 && totalMembers > 0
      ? Math.round((members.reduce((acc, m) => acc + m.doneCount, 0) / (totalTasks * totalMembers)) * 100)
      : 0;

  const topMembers = [...members].sort((a, b) => b.doneCount - a.doneCount).slice(0, 3);
  const hasAnySubmission = members.some((m) => m.doneCount > 0);

  return (
    <div className="space-y-6">
      <div className="border border-white rounded-2xl p-6 relative bg-gradient-to-br from-background to-background/50 flex flex-col justify-center min-h-[140px]">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
          <span className="text-white">Cluster </span>
          <span className="bg-gradient-to-r from-electric-blue via-cosmic-purple to-supernova-orange bg-clip-text text-transparent">
            {detail.cluster.name}
          </span>
        </h1>
        {detail.cluster.clusterNumber != null && (
          <span className="mt-3 inline-flex w-fit items-center rounded-full border border-cosmic-purple/30 bg-cosmic-purple/15 px-3 py-1 text-xs font-bold text-cosmic-purple">
            Cluster #{detail.cluster.clusterNumber}
          </span>
        )}
        <p className="mt-3 text-sm md:text-base text-slate-300 font-medium">
          {detail.cluster.clusterMeaning
            ? detail.cluster.clusterMeaning
            : "Mari wujudkan visi bersama dan saling bantu!"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="md:col-span-2">
          <ClusterStatCard
            title="Kekompakan Cluster"
            value={`${cohesion}%`}
            icon={FaUsers}
            iconColorClass="text-electric-blue"
            variant="progress"
            progress={cohesion}
            description={`Rata-rata progres ${totalMembers} anggota`}
          />
        </div>

        <ClusterStatCard
          title="Total Anggota"
          value={totalMembers.toString().padStart(2, "0")}
          icon={FaUsers}
          iconColorClass="text-cosmic-purple"
        />

        <ClusterStatCard
          title="Total Tugas"
          value={totalTasks.toString().padStart(2, "0")}
          icon={FaClipboardList}
          iconColorClass="text-supernova-orange"
        />

        <div className="rounded-xl border border-white bg-background/50 p-4 flex items-center justify-between gap-3 h-full overflow-hidden">
          <FaWhatsapp className="h-10 w-10 text-emerald-500 shrink-0" />
          <div className="flex flex-col flex-1 min-w-0">
            <p className="text-[10px] uppercase text-muted-text font-medium leading-tight mb-0.5">
              Grup WhatsApp
            </p>
            <p className="text-sm font-bold text-soft-white leading-tight truncate">
              {cluster.whatsappGroupLink ? "Terhubung" : "Belum ada link"}
            </p>
            {cluster.whatsappGroupLink ? (
              <a
                href={cluster.whatsappGroupLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1.5 flex items-center justify-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1 text-[10px] font-medium text-emerald-400 hover:bg-emerald-500/30 transition-colors w-fit"
              >
                Join Grup
              </a>
            ) : (
              <span className="mt-1.5 text-[10px] text-muted-text">Segera hadir</span>
            )}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-white bg-background/30 p-5 flex items-center gap-4">
        {cluster.spvAvatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={cluster.spvAvatarUrl}
            alt={cluster.spvName ?? "SPV"}
            className="h-12 w-12 shrink-0 rounded-full border border-white/15 object-cover"
          />
        ) : (
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-cosmic-purple/20">
            <FaUserTie className="h-6 w-6 text-cosmic-purple" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="text-[10px] uppercase tracking-wider text-muted-text font-medium">
            Supervisor Cluster (SPV)
          </p>
          <p className="truncate text-lg font-bold text-white">
            {cluster.spvName ?? "Belum ditugaskan"}
          </p>
        </div>
        {cluster.spvName && (
          <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-cosmic-purple/20 px-3 py-1 text-[10px] font-medium text-cosmic-purple">
            <span className="h-1.5 w-1.5 rounded-full bg-cosmic-purple animate-pulse"></span>
            Pendamping clustermu
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 min-w-0">
          <ClusterDetailTable data={members} totalTasks={totalTasks} />
        </div>

        <div className="md:col-span-1 rounded-2xl border border-white bg-background/30 flex flex-col h-full max-h-[400px]">
          <h2 className="text-lg font-black tracking-widest text-white text-center uppercase mb-4 border-b border-white p-6 pb-4">
            Anggota Teraktif
          </h2>
          <div className="flex-1 overflow-y-auto px-6 pb-6 custom-scrollbar space-y-3">
            {!hasAnySubmission ? (
              <p className="text-sm text-center text-slate-400 py-6">
                Belum ada yang mengumpulkan tugas. Ayo dong, jadilah yang pertama!
              </p>
            ) : (
              topMembers.map((m, i) => (
                <div
                  key={m.id}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-3"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cosmic-purple/20 text-sm font-black text-cosmic-purple">
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-bold text-white">{m.name}</p>
                    <p className="text-[11px] text-slate-400">{m.nim ?? "—"}</p>
                  </div>
                  <span className="flex items-center gap-1 text-xs font-bold text-supernova-orange">
                    <FaClipboardList className="h-3.5 w-3.5" />
                    {m.doneCount}/{totalTasks}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}