"use client";

import { useState } from "react";
import { Plus, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/stores/user.store";
import { useClusters, useCreateCluster, useUpdateCluster, useDeleteCluster, useAssignSpv } from "@/features/clusters/hooks/use-clusters";
import ClusterTable from "@/features/clusters/components/cluster-table";
import ClusterFormDialog from "@/features/clusters/components/cluster-form-dialog";
import ClusterDeleteDialog from "@/features/clusters/components/cluster-delete-dialog";
import AssignSpvDialog from "@/features/clusters/components/assign-spv-dialog";
import ManageMembersDialog from "@/features/clusters/components/manage-members-dialog";
import ImportMabaDialog from "@/features/clusters/components/import-maba-dialog";
import { toast } from "sonner";
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

  const clusters = clustersRes?.data ?? [];

  function handleCreate(data: ClusterFormValues) {
    createMutation.mutate(data, {
      onSuccess: () => {
        toast.success("Cluster berhasil dibuat");
        setCreateOpen(false);
      },
      onError: () => toast.error("Gagal membuat cluster"),
    });
  }

  function handleUpdate(data: ClusterFormValues) {
    if (!editingCluster) return;
    updateMutation.mutate(
      { id: editingCluster.id, data },
      {
        onSuccess: () => {
          toast.success("Cluster berhasil diupdate");
          setEditOpen(false);
          setEditingCluster(null);
        },
        onError: () => toast.error("Gagal mengupdate cluster"),
      },
    );
  }

  function handleDelete(id: string) {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        toast.success("Cluster berhasil dihapus");
        setDeleteOpen(false);
        setDeletingCluster(null);
      },
      onError: () => toast.error("Gagal menghapus cluster"),
    });
  }

  function handleAssignSpv(clusterId: string, spvId: string) {
    assignMutation.mutate(
      { clusterId, spvId },
      {
        onSuccess: () => {
          toast.success("SPV berhasil diassign");
          setAssignOpen(false);
          setSelectedCluster(null);
        },
        onError: () => toast.error("Gagal assign SPV"),
      },
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Cluster</h1>
          <p className="text-sm text-slate-500 mt-1">Kelola cluster dan anggotanya</p>
        </div>
        {(isAdmin || isKaderisasi) && (
          <div className="flex items-center gap-2">
            <Button variant="primary" onClick={() => setImportOpen(true)} className="gap-2 !bg-white !text-slate-700 !border !border-slate-300 hover:!bg-slate-50 !shadow-none">
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

      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
        {isLoading ? (
          <div className="p-10 text-center text-sm text-slate-400">Memuat data...</div>
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
