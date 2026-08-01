"use client";

import { Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnnouncementCard from "./announcement-card";
import Pagination from "@/components/ui/pagination";
import type { AnnouncementRow } from "@/features/pengumuman/types";

type Props = {
  data: AnnouncementRow[];
  total: number;
  page: number;
  limit: number;
  isPending: boolean;
  onMarkRead: (id: string) => void;
  onPageChange: (page: number) => void;
  markReadPending: boolean;
};

export default function AnnouncementList({
  data,
  total,
  page,
  limit,
  isPending,
  onMarkRead,
  onPageChange,
  markReadPending,
}: Props) {
  if (isPending) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-32 rounded-xl border border-white/10 bg-card-bg animate-pulse p-5"
          >
            <div className="h-4 w-1/3 bg-white/10 rounded mb-3" />
            <div className="h-3 w-2/3 bg-white/10 rounded mb-2" />
            <div className="h-3 w-1/2 bg-white/10 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="rounded-full bg-white/10 p-4 mb-4">
          <Megaphone size={32} className="text-muted-text" />
        </div>
        <p className="text-sm font-medium text-soft-white">Belum ada pengumuman</p>
        <p className="text-xs text-muted-text mt-1">
          Pengumuman akan muncul di sini setelah dibuat.
        </p>
      </div>
    );
  }

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="space-y-3">
      <div className="space-y-3">
        {data.map((item) => (
          <AnnouncementCard
            key={item.id}
            item={item}
            onMarkRead={onMarkRead}
            isPending={markReadPending}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pt-4">
          <Pagination
            page={page}
            totalPages={totalPages}
            total={total}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
}
