"use client";

import { cn } from "@/lib/cn";
import { Clock, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { AnnouncementRow } from "@/features/pengumuman/types";

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

type Props = {
  item: AnnouncementRow;
  onMarkRead: (id: string) => void;
  isPending?: boolean;
};

export default function AnnouncementCard({ item, onMarkRead, isPending }: Props) {
  return (
    <div
      className={cn(
        "rounded-xl border p-5 transition-all",
        item.isRead
          ? "border-slate-200 bg-white"
          : "border-cosmic-purple/30 bg-cosmic-purple/[0.03]",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1.5 flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            {!item.isRead && (
              <span className="inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-cosmic-purple/10 text-cosmic-purple">
                Baru
              </span>
            )}
            <span
              className={cn(
                "inline-block rounded-full px-2.5 py-0.5 text-xs font-medium",
                targetColors[item.targetType],
              )}
            >
              {targetLabels[item.targetType]}
            </span>
          </div>

          <h3 className="text-sm font-semibold text-slate-900 leading-snug">
            {item.title}
          </h3>

          <p className="text-sm text-slate-500 line-clamp-3 leading-relaxed">
            {item.desc}
          </p>

          <div className="flex items-center gap-4 pt-1">
            <span className="flex items-center gap-1 text-xs text-slate-400">
              <Clock size={12} />
              {new Date(item.createdAt).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>

        {!item.isRead && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onMarkRead(item.id)}
            disabled={isPending}
            className="shrink-0 gap-1.5 text-xs"
          >
            <Eye size={14} />
            Tandai dibaca
          </Button>
        )}
      </div>
    </div>
  );
}
