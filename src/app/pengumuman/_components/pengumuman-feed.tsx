"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Megaphone } from "lucide-react";
import { getPublicAnnouncements } from "@/features/pengumuman/api/announcements";
import Pagination from "@/components/ui/pagination";
import AnnouncementItem from "./announcement-item";

export default function PengumumanFeed() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading } = useQuery({
    queryKey: ["public-announcements", page],
    queryFn: () => getPublicAnnouncements({ page, limit }),
  });

  const announcements = data?.data.data ?? [];
  const total = data?.data.total ?? 0;
  const totalPages = Math.ceil(total / limit);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-40 animate-pulse rounded-2xl border border-[#2DD4BF]/20 bg-[#0B3C42] p-6"
          >
            <div className="h-4 w-1/4 rounded bg-white/10" />
            <div className="mt-4 h-5 w-2/3 rounded bg-white/10" />
            <div className="mt-3 h-3 w-full rounded bg-white/10" />
            <div className="mt-2 h-3 w-1/2 rounded bg-white/10" />
          </div>
        ))}
      </div>
    );
  }

  if (announcements.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="mb-4 rounded-full bg-[#2DD4BF]/10 p-4">
          <Megaphone size={32} className="text-[#2DD4BF]" />
        </div>
        <p className="text-sm font-medium text-soft-white">
          Belum ada pengumuman
        </p>
        <p className="mt-1 text-xs text-muted-text">
          Pengumuman akan muncul di sini setelah dibuat.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {announcements.map((item) => (
        <AnnouncementItem key={item.id} item={item} />
      ))}

      {totalPages > 1 && (
        <div className="pt-2">
          <Pagination
            page={page}
            totalPages={totalPages}
            total={total}
            onPageChange={setPage}
          />
        </div>
      )}
    </div>
  );
}
