"use client";

import Link from "next/link";
import { ArrowRight, Megaphone } from "lucide-react";
import { useAnnouncements, useMarkAsRead } from "@/features/pengumuman/hooks/use-announcements";
import AnnouncementCard from "@/features/pengumuman/components/announcement-card";

export default function AnnouncementsPanel() {
  const { data, isLoading } = useAnnouncements({ page: 1, limit: 3 });
  const { mutate: markAsRead, isPending: markReadPending } = useMarkAsRead();

  const announcements = data?.data?.data ?? [];

  return (
    <div className="rounded-xl border border-white/10 bg-card-bg p-6 shadow-sm flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-soft-white text-base">Pengumuman Terbaru</h3>
        <Link
          href="/app/pengumuman"
          className="text-xs text-electric-blue hover:underline flex items-center gap-1"
        >
          Lihat Semua
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      <div className="flex-1 flex flex-col gap-3 justify-center">
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="h-20 rounded-xl border border-white/10 bg-white/[0.02] animate-pulse p-4"
              >
                <div className="h-3 w-1/3 bg-white/10 rounded mb-2" />
                <div className="h-2.5 w-2/3 bg-white/10 rounded" />
              </div>
            ))}
          </div>
        ) : announcements.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <Megaphone size={24} className="text-muted-text mb-2" />
            <p className="text-sm font-medium text-soft-white">Belum ada pengumuman</p>
          </div>
        ) : (
          <div className="space-y-3">
            {announcements.map((item) => (
              <AnnouncementCard
                key={item.id}
                item={item}
                onMarkRead={(id) => markAsRead(id)}
                isPending={markReadPending}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}