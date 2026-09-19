"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Users, Shield, Link as LinkIcon, Loader2, RefreshCw, ClipboardCheck, ListChecks, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSweetAlert } from "@/components/common/sweet-alert-provider";
import ConfirmDialog from "@/components/common/confirm-dialog";
import { cn } from "@/lib/cn";
import {
  useCluster,
  useClusterDetail,
  useAssignSpv,
  useRemoveClusterMember,
  useUpdateWhatsappLink,
} from "@/features/clusters/hooks/use-clusters";
import AssignSpvDialog from "@/features/clusters/components/assign-spv-dialog";
import ManageMembersDialog from "@/features/clusters/components/manage-members-dialog";
import ClusterMembersTable from "@/features/clusters/components/cluster-members-table";
import EditWhatsappDialog from "@/features/clusters/components/edit-whatsapp-dialog";
import SubmissionViewer from "@/features/penugasan/components/submission-viewer";
import { ClusterOverrideForm } from "@/features/clusters/components/cluster-override-form";
import { Star, Zap } from "lucide-react";
import { useSubmissions, useReviewSubmission } from "@/features/penugasan/hooks/use-tasks";
import type { Submission } from "@/features/penugasan/types";

type Props = {
  clusterId: string;
  canManage: boolean;
  showBack?: boolean;
};

export default function ClusterDetailView({ clusterId, canManage, showBack = true }: Props) {
  const router = useRouter();
  const alert = useSweetAlert();

  const [assignOpen, setAssignOpen] = useState(false);
  const [membersOpen, setMembersOpen] = useState(false);
  const [waOpen, setWaOpen] = useState(false);
  const [removeTarget, setRemoveTarget] = useState<{ id: string; name: string } | null>(null);

  const { data: clusterRes, isLoading: clusterLoading } = useCluster(clusterId);
  const { data: detailRes, isLoading: detailLoading } = useClusterDetail(clusterId);
  const { data: subsRes, isLoading: subsLoading } = useSubmissions({ enabled: !canManage });
  const assignMutation = useAssignSpv();
  const removeMutation = useRemoveClusterMember();
  const reviewMutation = useReviewSubmission();
  const waMutation = useUpdateWhatsappLink();

  const cluster = clusterRes?.data;
  const clusterNumberLabel = cluster?.clusterNumber != null ? `Cluster ${cluster.clusterNumber}` : "";
  const detail = detailRes?.data;
  const members = detail?.members ?? [];
  const skorFinal = detail?.skor_final_cluster ?? 0;
  const kecepatan = detail?.kecepatan_cluster;
  const deduction = detail?.total_deduction ?? 0;
  const totalTasks = detail?.totalTasks ?? 0;
  const submissions = subsRes?.data ?? [];

  function handleAssignSpv(cid: string, spvId: string) {
    assignMutation.mutate(
      { clusterId: cid, spvId },
      {
        onSuccess: () => {
          alert.success("SPV berhasil diassign");
          setAssignOpen(false);
        },
        onError: (err: Error) => alert.error(err.message),
      },
    );
  }

  function requestRemoveMember(userId: string) {
    const member = members.find((m) => m.id === userId);
    setRemoveTarget({ id: userId, name: member?.name ?? "MABA ini" });
  }

  function handleRemoveMember() {
    if (!removeTarget) return;
    removeMutation.mutate(
      { clusterId, userId: removeTarget.id },
      {
        onSuccess: () => {
          alert.success("Anggota berhasil dikeluarkan");
          setRemoveTarget(null);
        },
        onError: (err: Error) => alert.error(err.message),
      },
    );
  }

  function handleReview(sub: Submission, status: "ACCEPTED" | "REJECTED", feedback: string) {
    reviewMutation.mutate(
      { taskId: sub.taskId, id: sub.id, status, feedback },
      {
        onSuccess: () => alert.success("Review berhasil disimpan"),
        onError: (err: Error) => alert.error(err.message),
      },
    );
  }

  function handleSaveWhatsapp(cid: string, link: string | null) {
    waMutation.mutate(
      { clusterId: cid, whatsappGroupLink: link },
      {
        onSuccess: () => {
          alert.success("Link grup WhatsApp berhasil disimpan");
          setWaOpen(false);
        },
        onError: (err: Error) => alert.error(err.message),
      },
    );
  }

  if (clusterLoading || detailLoading) {
    return (
      <div className="flex h-60 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-electric-blue" />
      </div>
    );
  }

  if (!cluster) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <p className="text-muted-text">Cluster tidak ditemukan</p>
        {showBack && (
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft size={16} /> Kembali
          </Button>
        )}
      </div>
    );
  }

  const avgProgress =
    members.length > 0 && totalTasks > 0
      ? members.reduce((acc, m) => acc + m.doneCount, 0) / (members.length * totalTasks)
      : 0;

  const maleCount = members.filter((m) => m.gender === "L" || m.gender === "LAKI_LAKI").length;
  const femaleCount = members.filter((m) => m.gender === "P" || m.gender === "PEREMPUAN").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        {showBack && (
          <button
            onClick={() => router.back()}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-card-bg text-muted-text transition-colors hover:bg-white/5 hover:text-soft-white"
          >
            <ArrowLeft size={18} />
          </button>
        )}
        <div className="flex-1 min-w-0">
          <h1 className="truncate text-2xl font-bold text-soft-white">{cluster.name}</h1>
          <p className="text-sm text-muted-text">
            {clusterNumberLabel}
            {clusterNumberLabel && cluster.slug ? " · " : ""}
            {cluster.slug}
          </p>
          {cluster.clusterMeaning && (
            <p className="mt-1 max-w-xl text-sm text-muted-text line-clamp-2">
              {cluster.clusterMeaning}
            </p>
          )}
        </div>
        {!canManage && (
          <div className="flex shrink-0 items-center gap-2">
            {cluster.whatsappGroupLink && (
              <Button variant="outline" asChild className="hidden sm:flex">
                <a href={cluster.whatsappGroupLink} target="_blank" rel="noopener noreferrer">
                  <LinkIcon size={16} /> Grup WA
                </a>
              </Button>
            )}
            <Button variant="primary" onClick={() => setWaOpen(true)} className="gap-1.5">
              <Pencil size={16} />
              {cluster.whatsappGroupLink ? "Edit Grup WA" : "Atur Grup WA"}
            </Button>
          </div>
        )}
      </div>

      <div className={cn("grid gap-4 sm:grid-cols-2", canManage ? "lg:grid-cols-5" : "lg:grid-cols-4")}>
        <div className="rounded-xl border border-white/10 bg-card-bg p-5">
          <div className="flex items-center gap-3 text-electric-blue mb-2">
            <Shield size={20} />
            <h3 className="font-medium">Supervisor (SPV)</h3>
          </div>
          {cluster.spvName ? (
            <div className="mt-3">
              <p className="font-semibold text-soft-white">{cluster.spvName}</p>
              {canManage && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2 h-8 px-2 text-xs -ml-2"
                  onClick={() => setAssignOpen(true)}
                >
                  <RefreshCw size={12} className="mr-1.5" /> Ganti SPV
                </Button>
              )}
            </div>
          ) : (
            <div className="mt-3">
              <p className="text-sm text-muted-text mb-2">Belum ada SPV</p>
              {canManage && (
                <Button variant="outline" size="sm" onClick={() => setAssignOpen(true)}>
                  Assign SPV
                </Button>
              )}
            </div>
          )}
        </div>

        <div className="rounded-xl border border-white/10 bg-card-bg p-5">
          <div className="flex items-center gap-3 text-cosmic-purple mb-2">
            <Users size={20} />
            <h3 className="font-medium">Anggota</h3>
          </div>
          <div className="mt-3">
            <p className="text-3xl font-bold text-soft-white">{members.length}</p>
            <p className="text-sm text-muted-text mt-1">
              {maleCount} Laki-laki · {femaleCount} Perempuan
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-card-bg p-5">
          <div className="flex items-center gap-3 text-sun-gold mb-2">
            <ClipboardCheck size={20} />
            <h3 className="font-medium">Rata-rata Progress</h3>
          </div>
          <div className="mt-3">
            <p className="text-3xl font-bold text-soft-white">{Math.round(avgProgress * 100)}%</p>
            <p className="text-sm text-muted-text mt-1">{totalTasks} total tugas tersedia</p>
          </div>
        </div>

        <div className="col-span-1 sm:col-span-2 lg:col-span-1 rounded-xl border border-white/10 bg-card-bg p-5">
          <div className="flex items-center gap-3 text-emerald-400 mb-2">
            <Star size={20} />
            <h3 className="font-medium">Skor Akhir</h3>
          </div>
          <div className="mt-3 flex justify-between items-end">
            <div>
              <p className="text-3xl font-bold text-soft-white">{skorFinal}</p>
              <p className="text-sm text-muted-text mt-1">
                Deduksi: <span className="text-red-400">-{deduction}</span>
              </p>
            </div>
            {canManage && <ClusterOverrideForm clusterId={clusterId} />}
          </div>
        </div>

        {canManage && (
          <div className="rounded-xl border border-white/10 bg-card-bg p-5">
            <div className="flex items-center gap-3 text-cyan-400 mb-2">
              <Zap size={20} />
              <h3 className="font-medium">Kecepatan</h3>
            </div>
            <div className="mt-3">
              <p className="text-3xl font-bold text-soft-white">{kecepatan !== null && kecepatan !== undefined ? Math.round(kecepatan) + "%" : "-"}</p>
              <p className="text-sm text-muted-text mt-1">Submit maba</p>
            </div>
          </div>
        )}
      </div>

      <div className="rounded-xl border border-white/10 bg-card-bg overflow-hidden">
        <div className="flex items-center justify-between border-b border-white/10 p-5">
          <h2 className="text-lg font-bold text-soft-white">Daftar Anggota</h2>
          {canManage && (
            <Button variant="primary" onClick={() => setMembersOpen(true)}>
              <Users size={16} /> Kelola Anggota
            </Button>
          )}
        </div>

        <ClusterMembersTable
          data={members}
          totalTasks={totalTasks}
          onViewDetail={(m) => router.push(`/dashboard/cluster/maba/${m.id}`)}
          onRemoveMember={canManage ? requestRemoveMember : undefined}
        />
      </div>

      {!canManage && (
        <div className="rounded-xl border border-white/10 bg-card-bg overflow-hidden">
          <div className="flex items-center gap-2 border-b border-white/10 p-5 text-electric-blue">
            <ListChecks size={20} />
            <h2 className="text-lg font-bold text-soft-white">Submissions</h2>
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
      )}

      {canManage && (
        <>
          <AssignSpvDialog
            open={assignOpen}
            onOpenChange={setAssignOpen}
            cluster={cluster}
            onAssign={handleAssignSpv}
            isPending={assignMutation.isPending}
          />

          <ManageMembersDialog
            open={membersOpen}
            onOpenChange={setMembersOpen}
            cluster={cluster}
          />
        </>
      )}

      {!canManage && waOpen && (
        <EditWhatsappDialog
          onClose={() => setWaOpen(false)}
          cluster={cluster}
          onSave={handleSaveWhatsapp}
          isPending={waMutation.isPending}
        />
      )}

      <ConfirmDialog
        open={removeTarget !== null}
        onOpenChange={(v) => { if (!v) setRemoveTarget(null); }}
        title="Keluarkan Anggota"
        description={`Yakin ingin mengeluarkan ${removeTarget?.name ?? "MABA ini"} dari cluster?`}
        confirmLabel="Keluarkan"
        destructive
        onConfirm={handleRemoveMember}
        isPending={removeMutation.isPending}
      />
    </div>
  );
}
