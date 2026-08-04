"use client";

import { useState } from "react";
import { useAnnouncements, useMarkAsRead } from "@/features/pengumuman/hooks/use-announcements";
import AnnouncementList from "@/features/pengumuman/components/announcement-list";
import AnnouncementFilter from "@/features/pengumuman/components/announcement-filter";
import { useSweetAlert } from "@/components/common/sweet-alert-provider";

export default function MabaPengumumanPage() {
  const [page, setPage] = useState(1);
  const [unreadOnly, setUnreadOnly] = useState(false);

  const { data: announcementsRes, isLoading: listLoading } = useAnnouncements({
    page,
    limit: 10,
    unreadOnly: unreadOnly || undefined,
  });

  const markReadMutation = useMarkAsRead();
  const { error: alertError } = useSweetAlert();

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
      <div className="border border-white rounded-2xl p-6 relative bg-gradient-to-br from-background to-background/50 flex flex-col justify-center min-h-[140px]">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-electric-blue via-cosmic-purple to-supernova-orange bg-clip-text text-transparent">
            Pengumuman
          </span>
        </h1>
        <p className="mt-3 text-sm md:text-base text-slate-300 font-medium">
          Info dan pengumuman terbaru dari panitia
        </p>
      </div>

      <div className="flex justify-end">
        <AnnouncementFilter unreadOnly={unreadOnly} onToggle={handleToggleFilter} />
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
    </div>
  );
}
