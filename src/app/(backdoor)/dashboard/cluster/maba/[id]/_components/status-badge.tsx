"use client";

import { CheckCircle2, Clock3, XCircle, CircleDashed } from "lucide-react";
import { cn } from "@/lib/cn";
import type { MabaTaskStatus } from "@/features/penugasan/types";

export const STATUS_META: Record<MabaTaskStatus, { label: string; class: string; icon: typeof Clock3 }> = {
  NOT_SUBMITTED: { label: "Belum Dikerjakan", class: "bg-white/5 text-slate-300", icon: CircleDashed },
  PENDING: { label: "Menunggu Review", class: "bg-amber-500/15 text-amber-400", icon: Clock3 },
  REJECTED: { label: "Perlu Revisi", class: "bg-red-500/15 text-red-400", icon: XCircle },
  DONE: { label: "Selesai", class: "bg-emerald-500/15 text-emerald-400", icon: CheckCircle2 },
};

export default function TaskStatusBadge({ status }: { status: MabaTaskStatus }) {
  const meta = STATUS_META[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold whitespace-nowrap",
        meta.class,
      )}
    >
      <meta.icon className="h-3 w-3" />
      {meta.label}
    </span>
  );
}
