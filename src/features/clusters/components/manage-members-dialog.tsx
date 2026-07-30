"use client";

import { useState, useEffect, useCallback } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, UserPlus, X, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/cn";
import { useAvailableMabas, useClusterMembers, useAddClusterMembers, useRemoveClusterMember } from "@/features/clusters/hooks/use-clusters";
import type { Cluster } from "@/features/clusters/types";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cluster: Cluster | null;
};

export default function ManageMembersDialog({ open, onOpenChange, cluster }: Props) {
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);

  const { data: mabasRes, isLoading: mabasLoading } = useAvailableMabas({ search, page, limit: 50 });
  const { data: membersRes, isLoading: membersLoading } = useClusterMembers(cluster?.id ?? "");
  const addMutation = useAddClusterMembers();
  const removeMutation = useRemoveClusterMember();

  const mabas = (mabasRes as any)?.data ?? [];
  const totalMabas = (mabasRes as any)?.total ?? 0;
  const members = (membersRes as any)?.data ?? membersRes ?? [];
  const memberIds = new Set(Array.isArray(members) ? members.map((m: any) => m.id) : []);

  const filteredMabas = Array.isArray(mabas)
    ? mabas.filter((m: any) => !memberIds.has(m.id))
    : [];

  const currentMembers = Array.isArray(members) ? members : [];

  useEffect(() => {
    if (!open) {
      setSearch("");
      setSelectedIds(new Set());
      setPage(1);
    }
  }, [open]);

  function toggleSelect(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function handleAddMembers() {
    if (!cluster || selectedIds.size === 0) return;
    addMutation.mutate(
      { clusterId: cluster.id, userIds: Array.from(selectedIds) },
      { onSuccess: () => setSelectedIds(new Set()) },
    );
  }

  function handleRemoveMember(userId: string) {
    if (!cluster) return;
    removeMutation.mutate({ clusterId: cluster.id, userId });
  }

  const totalPages = Math.ceil(totalMabas / 50);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent title="Atur Anggota" description={cluster?.name ?? ""} variant="light">
        <div className="space-y-4">
          {/* Current Members */}
          <div>
            <h4 className="text-sm font-medium text-slate-900 mb-2">
              Anggota Saat Ini ({currentMembers.length})
            </h4>
            <div className="max-h-40 overflow-y-auto space-y-1">
              {membersLoading ? (
                <div className="flex items-center justify-center py-4">
                  <Loader2 size={16} className="animate-spin text-slate-400" />
                </div>
              ) : currentMembers.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-4">Belum ada anggota</p>
              ) : (
                currentMembers.map((m: any) => (
                  <div key={m.id} className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-50">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-slate-900 truncate">{m.name}</p>
                      <p className="text-xs text-slate-500 truncate">{m.email} {m.nim ? `· ${m.nim}` : ""}</p>
                    </div>
                    <button
                      onClick={() => handleRemoveMember(m.id)}
                      disabled={removeMutation.isPending}
                      className="p-1 rounded text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-200" />

          {/* Add Members */}
          <div>
            <h4 className="text-sm font-medium text-slate-900 mb-2">Tambah Anggota</h4>
            <div className="relative mb-3">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                className="flex h-10 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 pl-9 text-sm text-slate-700 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue"
                placeholder="Cari MABA..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              />
            </div>

            <div className="max-h-52 overflow-y-auto space-y-1">
              {mabasLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 size={16} className="animate-spin text-slate-400" />
                </div>
              ) : filteredMabas.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-8">
                  {search ? "Tidak ditemukan" : "Semua MABA sudah menjadi anggota"}
                </p>
              ) : (
                filteredMabas.map((m: any) => (
                  <button
                    key={m.id}
                    onClick={() => toggleSelect(m.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors",
                      selectedIds.has(m.id)
                        ? "bg-electric-blue/10 border border-electric-blue/30"
                        : "hover:bg-slate-50 border border-transparent",
                    )}
                  >
                    <div className={cn(
                      "w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors",
                      selectedIds.has(m.id)
                        ? "bg-electric-blue border-electric-blue"
                        : "border-slate-300",
                    )}>
                      {selectedIds.has(m.id) && <Check size={12} className="text-white" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-slate-900 truncate">{m.name}</p>
                      <p className="text-xs text-slate-500 truncate">{m.email} {m.nim ? `· ${m.nim}` : ""}</p>
                    </div>
                  </button>
                ))
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                  className="text-xs text-slate-500 hover:text-slate-700 disabled:opacity-40"
                >
                  Sebelumnya
                </button>
                <span className="text-xs text-slate-400">
                  {page} / {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page >= totalPages}
                  className="text-xs text-slate-500 hover:text-slate-700 disabled:opacity-40"
                >
                  Selanjutnya
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 mt-4">
          <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
            Tutup
          </Button>
          <Button
            type="button"
            variant="primary"
            onClick={handleAddMembers}
            disabled={selectedIds.size === 0 || addMutation.isPending}
            loading={addMutation.isPending}
            className="gap-2"
          >
            <UserPlus size={14} />
            Tambah ({selectedIds.size})
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
