"use client";

import { useState, useCallback } from "react";
import { Download, AlertTriangle, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/ui/pagination";
import { useSweetAlert } from "@/components/common/sweet-alert-provider";
import {
  useMabaList,
  useMabaExport,
  useResetMaba,
  useCreateMaba,
  useUpdateMaba,
  useDeleteMaba,
} from "@/features/maba/hooks/use-maba";
import { useClusters } from "@/features/clusters/hooks/use-clusters";
import MabaTable from "@/features/maba/components/maba-table";
import MabaFilter from "@/features/maba/components/maba-filter";
import MabaFormDialog, { type MabaFormData } from "@/features/maba/components/maba-form-dialog";
import MabaDeleteDialog from "@/features/maba/components/maba-delete-dialog";
import MabaDetailDialog from "@/features/maba/components/maba-detail-dialog";
import MabaResetDialog from "@/features/maba/components/maba-reset-dialog";
import type { SafeUser } from "@/features/users/api/users";

const PAGE_SIZE_OPTIONS = [10, 20, 50, 100, 10000];

export default function MabaPage() {
  const [search, setSearch] = useState("");
  const [clusterId, setClusterId] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [formOpen, setFormOpen] = useState(false);
  const [editingMaba, setEditingMaba] = useState<SafeUser | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deletingMaba, setDeletingMaba] = useState<SafeUser | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [viewMaba, setViewMaba] = useState<SafeUser | null>(null);
  const [resetOpen, setResetOpen] = useState(false);

  const { data, isLoading } = useMabaList({ search, clusterId, page, limit });
  const { data: clustersRes } = useClusters();
  const { success: notifySuccess, error: notifyError } = useSweetAlert();
  const exportMutation = useMabaExport();
  const resetMutation = useResetMaba();
  const createMutation = useCreateMaba();
  const updateMutation = useUpdateMaba();
  const deleteMutation = useDeleteMaba();

  const clusters = clustersRes?.data ?? [];
  const clusterNameById = Object.fromEntries(clusters.map((c) => [c.id, c.name]));

  const handleExport = useCallback(() => {
    exportMutation.mutate(undefined, {
      onSuccess: () => notifySuccess("File Excel berhasil diunduh"),
      onError: (err: Error) => notifyError(err.message),
    });
  }, [exportMutation, notifySuccess, notifyError]);

  const handleCreate = useCallback(
    (formData: MabaFormData) => {
      createMutation.mutate(
        {
          name: formData.name,
          email: formData.email,
          nim: formData.nim || undefined,
          gender: (formData.gender as "L" | "P" | undefined) || undefined,
          username: formData.username || undefined,
          password: formData.password || undefined,
        },
        {
          onSuccess: () => {
            notifySuccess("MABA berhasil ditambahkan");
            setFormOpen(false);
          },
          onError: (err: Error) => notifyError(err.message),
        },
      );
    },
    [createMutation, notifySuccess, notifyError],
  );

  const handleUpdate = useCallback(
    (formData: MabaFormData) => {
      if (!editingMaba) return;
      updateMutation.mutate(
        {
          id: editingMaba.id,
          data: {
            name: formData.name,
            email: formData.email,
            nim: formData.nim || undefined,
            gender: (formData.gender as "L" | "P" | undefined) || null,
            username: formData.username || undefined,
            status: formData.status === "true",
            password: formData.password || undefined,
          },
        },
        {
          onSuccess: () => {
            notifySuccess("MABA berhasil diupdate");
            setFormOpen(false);
            setEditingMaba(null);
          },
          onError: (err: Error) => notifyError(err.message),
        },
      );
    },
    [editingMaba, updateMutation, notifySuccess, notifyError],
  );

  const handleDelete = useCallback(() => {
    if (!deletingMaba) return;
    deleteMutation.mutate(deletingMaba.id, {
      onSuccess: () => {
        notifySuccess("MABA berhasil dihapus");
        setDeleteOpen(false);
        setDeletingMaba(null);
      },
      onError: (err: Error) => notifyError(err.message),
    });
  }, [deletingMaba, deleteMutation, notifySuccess, notifyError]);

  const handleReset = useCallback(() => {
    resetMutation.mutate(undefined, {
      onSuccess: () => {
        notifySuccess("Semua data MABA berhasil direset");
        setResetOpen(false);
      },
      onError: (err: Error) => notifyError(err.message),
    });
  }, [resetMutation, notifySuccess, notifyError]);

  const totalPages = data ? Math.ceil(data.total / limit) : 1;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-soft-white">Daftar Maba</h1>
          <p className="text-sm text-muted-text mt-1">Kelola dan export data MABA</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="destructive" onClick={() => setResetOpen(true)}>
            <AlertTriangle className="w-4 h-4" />
            Reset Data
          </Button>
          <Button variant="primary" loading={exportMutation.isPending} onClick={handleExport}>
            <Download className="w-4 h-4" />
            Export Excel
          </Button>
          <Button variant="primary" onClick={() => { setEditingMaba(null); setFormOpen(true); }}>
            <Plus className="w-4 h-4" />
            Tambah MABA
          </Button>
        </div>
      </div>

      <MabaFilter
        search={search}
        clusterId={clusterId}
        limit={limit}
        clusters={clusters}
        pageSizeOptions={PAGE_SIZE_OPTIONS}
        onSearchChange={(v) => { setSearch(v); setPage(1); }}
        onClusterChange={(v) => { setClusterId(v); setPage(1); }}
        onLimitChange={(v) => { setLimit(Number(v)); setPage(1); }}
      />

      <div className="rounded-xl border border-white/10 bg-card-bg overflow-hidden">
        {isLoading ? (
          <div className="p-10 text-center text-sm text-muted-text">Memuat data...</div>
        ) : (
          <MabaTable
            data={data?.data ?? []}
            page={page}
            limit={limit}
            clusterNameById={clusterNameById}
            onEdit={(maba) => { setEditingMaba(maba); setFormOpen(true); }}
            onDelete={(maba) => { setDeletingMaba(maba); setDeleteOpen(true); }}
            onViewDetail={(maba) => { setViewMaba(maba); setDetailOpen(true); }}
          />
        )}
        <Pagination
          page={page}
          totalPages={totalPages}
          total={data?.total ?? 0}
          onPageChange={setPage}
        />
      </div>

      <MabaFormDialog
        open={formOpen}
        onOpenChange={(v) => { setFormOpen(v); if (!v) setEditingMaba(null); }}
        editingMaba={editingMaba}
        onSubmit={editingMaba ? handleUpdate : handleCreate}
        isPending={createMutation.isPending || updateMutation.isPending}
      />

      <MabaDetailDialog
        open={detailOpen}
        onOpenChange={(v) => { setDetailOpen(v); if (!v) setViewMaba(null); }}
        maba={viewMaba}
        clusterName={viewMaba?.clusterId ? clusterNameById[viewMaba.clusterId] : ""}
      />

      <MabaDeleteDialog
        open={deleteOpen}
        onOpenChange={(v) => { setDeleteOpen(v); if (!v) setDeletingMaba(null); }}
        maba={deletingMaba}
        onConfirm={handleDelete}
        isPending={deleteMutation.isPending}
      />

      <MabaResetDialog
        open={resetOpen}
        onOpenChange={setResetOpen}
        total={data?.total ?? 0}
        onConfirm={handleReset}
        isPending={resetMutation.isPending}
      />
    </div>
  );
}
