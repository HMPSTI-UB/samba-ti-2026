"use client";

import { useState, useCallback } from "react";
import { Plus, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/stores/user.store";
import { useClusters, useCreateCluster, useUpdateCluster, useDeleteCluster, useAssignSpv } from "@/features/clusters/hooks/use-clusters";
import { searchMabas } from "@/features/clusters/api/clusters";
import MabaSearchBar, { type MabaSearchItem } from "@/features/clusters/components/maba-search-bar";
import ClusterTable from "@/features/clusters/components/cluster-table";
import ClusterFormDialog from "@/features/clusters/components/cluster-form-dialog";
import ClusterDeleteDialog from "@/features/clusters/components/cluster-delete-dialog";
import AssignSpvDialog from "@/features/clusters/components/assign-spv-dialog";
import ManageMembersDialog from "@/features/clusters/components/manage-members-dialog";
import ImportMabaDialog from "@/features/clusters/components/import-maba-dialog";
import { useSweetAlert } from "@/components/common/sweet-alert-provider";
import type { Cluster, ClusterFormValues } from "@/features/clusters/types";

export default function ClustersPage() {
  const user = useUserStore((s) => s.user);
  const isAdmin = user?.role?.toUpperCase() === "ADMIN";
  const isKaderisasi = user?.role?.toUpperCase() === "KADERISASI";

  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [assignOpen, setAssignOpen] = useState(false);
  const [membersOpen, setMembersOpen] = useState(false);
  const [importOpen, setImportOpen] = useState(false);

  const [selectedCluster, setSelectedCluster] = useState<Cluster | null>(null);
  const [editingCluster, setEditingCluster] = useState<Cluster | null>(null);
  const [deletingCluster, setDeletingCluster] = useState<Cluster | null>(null);

  const { data: clustersRes, isLoading } = useClusters();
  const createMutation = useCreateCluster();
  const updateMutation = useUpdateCluster();
  const deleteMutation = useDeleteCluster();
  const assignMutation = useAssignSpv();
  const { success: alertSuccess, error: alertError } = useSweetAlert();

  const clusters = clustersRes?.data ?? [];
  const clusterNameById = Object.fromEntries(clusters.map((c) => [c.id, c.name]));

  const handleMabaSearch = useCallback(
    async (q: string): Promise<MabaSearchItem[]> => {
      const res = await searchMabas({ search: q, limit: 8 });
      return res.data.map((m) => ({
        id: m.id,
        name: m.name,
        nim: m.nim,
        clusterLabel: m.clusterId ? clusterNameById[m.clusterId] ?? null : null,
        href: m.clusterId ? `/dashboard/clusters/${m.clusterId}` : null,
      }));
    },
    [clusterNameById],
  );

  function handleCreate(data: ClusterFormValues) {
    createMutation.mutate(data, {
      onSuccess: () => {
        alertSuccess("Cluster berhasil dibuat");
        setCreateOpen(false);
      },
      onError: () => alertError("Gagal membuat cluster"),
    });
  }

  function handleUpdate(data: ClusterFormValues) {
    if (!editingCluster) return;
    updateMutation.mutate(
      { id: editingCluster.id, data },
      {
        onSuccess: () => {
          alertSuccess("Cluster berhasil diupdate");
          setEditOpen(false);
          setEditingCluster(null);
        },
        onError: () => alertError("Gagal mengupdate cluster"),
      },
    );
  }

  function handleDelete(id: string) {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        alertSuccess("Cluster berhasil dihapus");
        setDeleteOpen(false);
        setDeletingCluster(null);
      },
      onError: () => alertError("Gagal menghapus cluster"),
    });
  }

  function handleAssignSpv(clusterId: string, spvId: string) {
    assignMutation.mutate(
      { clusterId, spvId },
      {
        onSuccess: () => {
          alertSuccess("SPV berhasil diassign");
          setAssignOpen(false);
          setSelectedCluster(null);
        },
        onError: () => alertError("Gagal assign SPV"),
      },
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-soft-white">Cluster</h1>
          <p className="text-sm text-muted-text mt-1">Kelola cluster dan anggotanya</p>
        </div>
        {(isAdmin || isKaderisasi) && (
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setImportOpen(true)} className="gap-2">
              <Upload className="w-4 h-4" />
              Import MABA
            </Button>
            <Button variant="primary" onClick={() => setCreateOpen(true)} className="gap-2">
              <Plus className="w-4 h-4" />
              Buat Cluster
            </Button>
          </div>
        )}
      </div>

      <MabaSearchBar searchFn={handleMabaSearch} />

      <div className="rounded-xl border border-white/10 bg-card-bg overflow-hidden">
        {isLoading ? (
          <div className="p-10 text-center text-sm text-muted-text">Memuat data...</div>
        ) : (
          <ClusterTable
            data={clusters}
            onEdit={(cluster) => { setEditingCluster(cluster); setEditOpen(true); }}
            onDelete={(cluster) => { setDeletingCluster(cluster); setDeleteOpen(true); }}
            onAssignSpv={(cluster) => { setSelectedCluster(cluster); setAssignOpen(true); }}
            onManageMembers={(cluster) => { setSelectedCluster(cluster); setMembersOpen(true); }}
          />
        )}
      </div>

      <ClusterFormDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        onSubmit={handleCreate}
        isPending={createMutation.isPending}
      />

      <ClusterFormDialog
        open={editOpen}
        onOpenChange={(v) => { setEditOpen(v); if (!v) setEditingCluster(null); }}
        editingCluster={editingCluster}
        onSubmit={handleUpdate}
        isPending={updateMutation.isPending}
      />

      <ClusterDeleteDialog
        open={deleteOpen}
        onOpenChange={(v) => { setDeleteOpen(v); if (!v) setDeletingCluster(null); }}
        cluster={deletingCluster}
        onConfirm={handleDelete}
        isPending={deleteMutation.isPending}
      />

      <AssignSpvDialog
        open={assignOpen}
        onOpenChange={(v) => { setAssignOpen(v); if (!v) setSelectedCluster(null); }}
        cluster={selectedCluster}
        onAssign={handleAssignSpv}
        isPending={assignMutation.isPending}
      />

      <ManageMembersDialog
        open={membersOpen}
        onOpenChange={(v) => { setMembersOpen(v); if (!v) setSelectedCluster(null); }}
        cluster={selectedCluster}
      />

      <ImportMabaDialog
        open={importOpen}
        onOpenChange={setImportOpen}
      />
    </div>
  );
}
