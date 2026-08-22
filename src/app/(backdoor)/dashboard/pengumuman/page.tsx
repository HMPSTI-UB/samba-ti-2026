"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import ConfirmDialog from "@/components/common/confirm-dialog";
import { useUserStore } from "@/stores/user.store";
import {
  useAnnouncements,
  useCreateAnnouncement,
  useUpdateAnnouncement,
  useDeleteAnnouncement,
  useMarkAsRead,
} from "@/features/pengumuman/hooks/use-announcements";
import AnnouncementList from "@/features/pengumuman/components/announcement-list";
import AnnouncementFilter from "@/features/pengumuman/components/announcement-filter";
import AnnouncementCreateDialog from "@/features/pengumuman/components/announcement-create-dialog";
import { useSweetAlert } from "@/components/common/sweet-alert-provider";
import type { AnnouncementRow } from "@/features/pengumuman/types";

export default function PengumumanPage() {
  const user = useUserStore((s) => s.user);
  const role = user?.role ?? "";
  const isAdmin = role.toUpperCase() === "ADMIN" || role.toUpperCase() === "KADERISASI";

  const [page, setPage] = useState(1);
  const [unreadOnly, setUnreadOnly] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<AnnouncementRow | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deletingAnnouncement, setDeletingAnnouncement] = useState<AnnouncementRow | null>(null);

  const { data: announcementsRes, isLoading: listLoading } = useAnnouncements({
    page,
    limit: 10,
    unreadOnly: unreadOnly || undefined,
  });

  const createMutation = useCreateAnnouncement();
  const updateMutation = useUpdateAnnouncement();
  const deleteMutation = useDeleteAnnouncement();
  const markReadMutation = useMarkAsRead();
  const { success: alertSuccess, error: alertError } = useSweetAlert();

  function handleSubmit(data: { title: string; desc: string; targetType: "ALL" | "SPV" | "MABA" }) {
    if (editingAnnouncement) {
      updateMutation.mutate(
        { id: editingAnnouncement.id, data },
        {
          onSuccess: () => {
            alertSuccess("Pengumuman berhasil diperbarui");
            setCreateOpen(false);
            setEditingAnnouncement(null);
          },
          onError: () => alertError("Gagal memperbarui pengumuman"),
        },
      );
      return;
    }
    createMutation.mutate(data, {
      onSuccess: () => {
        alertSuccess("Pengumuman berhasil dikirim");
        setCreateOpen(false);
      },
      onError: () => alertError("Gagal mengirim pengumuman"),
    });
  }

  function handleEdit(item: AnnouncementRow) {
    setEditingAnnouncement(item);
    setCreateOpen(true);
  }

  function handleOpenDelete(item: AnnouncementRow) {
    setDeletingAnnouncement(item);
    setDeleteOpen(true);
  }

  function handleDelete() {
    if (!deletingAnnouncement) return;
    deleteMutation.mutate(deletingAnnouncement.id, {
      onSuccess: () => {
        alertSuccess("Pengumuman berhasil dihapus");
        setDeleteOpen(false);
        setDeletingAnnouncement(null);
      },
      onError: () => alertError("Gagal menghapus pengumuman"),
    });
  }

  function handleMarkRead(id: string) {
    markReadMutation.mutate(id, {
      onError: () => alertError("Gagal menandai pengumuman"),
    });
  }

  function handleToggleFilter() {
    setUnreadOnly((prev) => !prev);
    setPage(1);
  }

  const announcements = announcementsRes?.data.data ?? [];
  const total = announcementsRes?.data.total ?? 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-soft-white">Pengumuman</h1>
          <p className="text-sm text-muted-text mt-0.5">
            Kelola pengumuman untuk peserta
          </p>
        </div>
        <div className="flex items-center gap-3">
          <AnnouncementFilter unreadOnly={unreadOnly} onToggle={handleToggleFilter} />
          {isAdmin && (
            <Button
              variant="primary"
              onClick={() => {
                setEditingAnnouncement(null);
                setCreateOpen(true);
              }}
              className="gap-2"
            >
              <Plus size={16} />
              Buat
            </Button>
          )}
        </div>
      </div>

      <AnnouncementList
        data={announcements}
        total={total}
        page={page}
        limit={10}
        isPending={listLoading}
        onMarkRead={handleMarkRead}
        onPageChange={setPage}
        markReadPending={markReadMutation.isPending}
        onEdit={isAdmin ? handleEdit : undefined}
        onDelete={isAdmin ? handleOpenDelete : undefined}
      />

      <AnnouncementCreateDialog
        open={createOpen}
        onOpenChange={(v) => {
          setCreateOpen(v);
          if (!v) setEditingAnnouncement(null);
        }}
        editingAnnouncement={editingAnnouncement}
        onSubmit={handleSubmit}
        isPending={createMutation.isPending || updateMutation.isPending}
      />

      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={(v) => {
          setDeleteOpen(v);
          if (!v) setDeletingAnnouncement(null);
        }}
        title="Hapus Pengumuman"
        description={`Yakin ingin menghapus pengumuman "${deletingAnnouncement?.title ?? ""}"? Tindakan ini tidak bisa dibatalkan.`}
        confirmLabel="Hapus"
        cancelLabel="Batal"
        destructive
        onConfirm={handleDelete}
        isPending={deleteMutation.isPending}
      />
    </div>
  );
}