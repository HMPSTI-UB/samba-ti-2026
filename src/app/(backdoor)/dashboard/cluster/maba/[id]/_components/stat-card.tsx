"use client";

import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

type Props = {
  label: string;
  value: number | string;
  icon: LucideIcon;
  accent: string;
};

export default function StatCard({ label, value, icon: Icon, accent }: Props) {
  return (
    <div className="rounded-xl border border-white/10 bg-card-bg p-5">
      <div className={cn("mb-2", accent)}>
        <Icon size={20} />
      </div>
      <p className="text-3xl font-bold text-soft-white">{value}</p>
      <p className="mt-1 text-sm text-muted-text">{label}</p>
    </div>
  );
}
