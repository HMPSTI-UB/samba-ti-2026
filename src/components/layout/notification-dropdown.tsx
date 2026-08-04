"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import { Bell, CheckCheck, Inbox } from "lucide-react";
import { cn } from "@/lib/cn";
import { useUserStore } from "@/stores/user.store";
import { markAsRead } from "@/features/pengumuman/api/announcements";
import { useAnnouncements, useMarkAsRead } from "@/features/pengumuman/hooks/use-announcements";

const targetColors: Record<string, string> = {
  ALL: "bg-electric-blue/10 text-electric-blue",
  SPV: "bg-supernova-orange/10 text-supernova-orange",
  MABA: "bg-star-gold/10 text-star-gold",
};

const targetLabels: Record<string, string> = {
  ALL: "Semua",
  SPV: "SPV",
  MABA: "MABA",
};

export default function NotificationDropdown({ unreadCount }: { unreadCount: number }) {
  const user = useUserStore((s) => s.user);
  const isMaba = user?.role.toUpperCase() === "MABA";
  const allUrl = isMaba ? "/app/pengumuman" : "/dashboard/pengumuman";

  const [open, setOpen] = useState(false);
  const [markingAll, setMarkingAll] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { data, isLoading } = useAnnouncements({ page: 1, limit: 5 }, { enabled: open });
  const markReadMutation = useMarkAsRead();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!open) return;
    function handlePointerDown(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const announcements = data?.data?.data ?? [];
  const unreadIds = announcements.filter((a) => !a.isRead).map((a) => a.id);

  async function handleMarkAllRead() {
    if (unreadIds.length === 0 || markingAll) return;
    setMarkingAll(true);
    try {
      await Promise.all(unreadIds.map((id) => markAsRead(id)));
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
      queryClient.invalidateQueries({ queryKey: ["announcements", "unread-count"] });
    } finally {
      setMarkingAll(false);
    }
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Notifikasi"
        className="relative rounded-full p-2 text-muted-text transition-colors hover:bg-white/5 hover:text-soft-white"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-white">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-11 z-50 w-80 overflow-hidden rounded-2xl border border-white/10 bg-midnight-navy shadow-2xl shadow-black/50">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <span className="text-sm font-semibold text-soft-white">Notifikasi</span>
            {unreadIds.length > 0 && (
              <button
                onClick={handleMarkAllRead}
                disabled={markingAll}
                className="flex items-center gap-1.5 text-xs text-electric-blue transition-colors hover:underline disabled:opacity-50"
              >
                <CheckCheck size={14} />
                Tandai semua dibaca
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto">
            {isLoading ? (
              <div className="space-y-3 p-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse space-y-2">
                    <div className="h-3 w-1/4 rounded bg-white/10" />
                    <div className="h-3 w-2/3 rounded bg-white/10" />
                    <div className="h-2.5 w-1/2 rounded bg-white/10" />
                  </div>
                ))}
              </div>
            ) : announcements.length === 0 ? (
              <div className="flex flex-col items-center justify-center px-4 py-10 text-center">
                <div className="mb-3 rounded-full bg-white/10 p-3">
                  <Inbox size={20} className="text-muted-text" />
                </div>
                <p className="text-sm font-medium text-soft-white">Belum ada notifikasi</p>
                <p className="mt-1 text-xs text-muted-text">
                  Pengumuman baru akan muncul di sini.
                </p>
              </div>
            ) : (
              <div>
                {announcements.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => markReadMutation.mutate(item.id)}
                    className={cn(
                      "flex w-full gap-3 px-4 py-3 text-left transition-colors hover:bg-white/5",
                      !item.isRead && "bg-cosmic-purple/[0.06]",
                    )}
                  >
                    <span
                      className={cn(
                        "mt-1.5 h-2 w-2 shrink-0 rounded-full",
                        item.isRead ? "bg-white/15" : "bg-cosmic-purple",
                      )}
                    />
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center justify-between gap-2">
                        <span
                          className={cn(
                            "inline-block rounded-full px-2 py-0.5 text-[10px] font-medium",
                            targetColors[item.targetType],
                          )}
                        >
                          {targetLabels[item.targetType]}
                        </span>
                        <span className="text-[11px] text-muted-text">
                          {new Date(item.createdAt).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </span>
                      <span className="mt-1 block truncate text-sm font-medium text-soft-white">
                        {item.title}
                      </span>
                      <span className="block truncate text-xs text-muted-text">
                        {item.desc}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link
            href={allUrl}
            onClick={() => setOpen(false)}
            className="block border-t border-white/10 px-4 py-3 text-center text-xs font-medium text-electric-blue transition-colors hover:bg-white/5"
          >
            Lihat Semua
          </Link>
        </div>
      )}
    </div>
  );
}
