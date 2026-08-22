"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { Clock, Eye, ImageIcon, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { countImages, stripImages } from "@/features/pengumuman/utils/images";
import AnnouncementDetailDialog from "./announcement-detail-dialog";
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
  onEdit?: (item: AnnouncementRow) => void;
  onDelete?: (item: AnnouncementRow) => void;
};

export default function AnnouncementCard({ item, onMarkRead, isPending, onEdit, onDelete }: Props) {
  const [detailOpen, setDetailOpen] = useState(false);
  const imgCount = countImages(item.desc);
  const previewHtml = stripImages(item.desc);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => setDetailOpen(true)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setDetailOpen(true);
        }
      }}
      className={cn(
        "cursor-pointer rounded-xl border p-5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue",
        item.isRead
          ? "border-white/10 bg-card-bg hover:border-electric-blue/40"
          : "border-cosmic-purple/30 bg-cosmic-purple/[0.08] hover:border-cosmic-purple/60",
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

          <h3 className="text-sm font-semibold text-soft-white leading-snug">
            {item.title}
          </h3>

          <div
            className="rich-text line-clamp-3 text-sm text-muted-text leading-relaxed"
            dangerouslySetInnerHTML={{ __html: previewHtml }}
          />

          {imgCount > 0 && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 text-xs text-muted-text">
              <ImageIcon size={13} className="text-electric-blue" />
              {imgCount} gambar
            </span>
          )}

          <div className="flex items-center gap-4 pt-1">
            <span className="flex items-center gap-1 text-xs text-muted-text">
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

        <div className="flex flex-col items-end gap-2 shrink-0">
          {onEdit && onDelete && (
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(item);
                }}
                className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-cosmic-purple bg-cosmic-purple/10 hover:bg-cosmic-purple/20 hover:text-electric-blue transition-colors"
              >
                <Pencil size={13} />
                Edit
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(item);
                }}
                className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-red-400 bg-red-500/10 hover:bg-red-500/20 hover:text-red-300 transition-colors"
              >
                <Trash2 size={13} />
                Hapus
              </button>
            </div>
          )}

          {!item.isRead && (
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onMarkRead(item.id);
              }}
              disabled={isPending}
              className="gap-1.5 text-xs"
            >
              <Eye size={14} />
              Tandai dibaca
            </Button>
          )}
        </div>
      </div>

      <AnnouncementDetailDialog
        open={detailOpen}
        onOpenChange={setDetailOpen}
        item={item}
      />
    </div>
  );
}
