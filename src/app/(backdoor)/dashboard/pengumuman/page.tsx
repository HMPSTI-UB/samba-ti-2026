"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/stores/user.store";
import { useAnnouncements, useCreateAnnouncement, useMarkAsRead } from "@/features/pengumuman/hooks/use-announcements";
import AnnouncementList from "@/features/pengumuman/components/announcement-list";
import AnnouncementFilter from "@/features/pengumuman/components/announcement-filter";
import AnnouncementCreateDialog from "@/features/pengumuman/components/announcement-create-dialog";
import { toast } from "sonner";

export default function PengumumanPage() {
  const user = useUserStore((s) => s.user);
  const role = user?.role ?? "";
  const isAdmin = role.toUpperCase() === "ADMIN" || role.toUpperCase() === "KADERISASI";

  const [page, setPage] = useState(1);
  const [unreadOnly, setUnreadOnly] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);

  const { data: announcementsRes, isLoading: listLoading } = useAnnouncements({
    page,
    limit: 10,
    unreadOnly: unreadOnly || undefined,
  });

  const createMutation = useCreateAnnouncement();
  const markReadMutation = useMarkAsRead();

  async function handleCreate(data: { title: string; desc: string; targetType: "ALL" | "SPV" | "MABA" }) {
    createMutation.mutate(data, {
      onSuccess: () => {
        toast.success("Pengumuman berhasil dikirim");
        setCreateOpen(false);
      },
      onError: () => {
        toast.error("Gagal mengirim pengumuman");
      },
    });
  }

  function handleMarkRead(id: string) {
    markReadMutation.mutate(id, {
      onError: () => toast.error("Gagal menandai pengumuman"),
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
            <Button variant="primary" onClick={() => setCreateOpen(true)} className="gap-2">
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
      />

      <AnnouncementCreateDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        onSubmit={handleCreate}
        isPending={createMutation.isPending}
      />
    </div>
  );
}
