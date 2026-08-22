"use client";

import { Megaphone } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

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
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: {
    title: string;
    desc: string;
    targetType: "ALL" | "SPV" | "MABA";
    createdAt: string;
  };
};

export default function AnnouncementDetailDialog({ open, onOpenChange, item }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        title={item.title}
        description={new Date(item.createdAt).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      >
        <div className="mb-4 flex items-center gap-2">
          <span
            className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${targetColors[item.targetType]}`}
          >
            {targetLabels[item.targetType]}
          </span>
        </div>
        <div className="flex items-start gap-3">
          <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cosmic-purple/20">
            <Megaphone size={18} className="text-electric-blue" />
          </span>
          <div
            className="rich-text flex-1"
            dangerouslySetInnerHTML={{ __html: item.desc }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}