"use client";

import { Search, X } from "lucide-react";
import { Select } from "@/components/ui/select";
import type { Cluster } from "@/features/clusters/types";

type Props = {
  search: string;
  clusterId: string;
  limit: number;
  clusters: Cluster[];
  pageSizeOptions: number[];
  onSearchChange: (v: string) => void;
  onClusterChange: (v: string) => void;
  onLimitChange: (v: string) => void;
};

export default function MabaFilter({
  search,
  clusterId,
  limit,
  clusters,
  pageSizeOptions,
  onSearchChange,
  onClusterChange,
  onLimitChange,
}: Props) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="relative flex-1 min-w-[200px]">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-text" />
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Cari nama, NIM, atau username..."
          className="w-full h-10 pl-9 pr-8 rounded-lg border border-white/10 bg-transparent text-sm text-soft-white placeholder:text-muted-text focus:outline-none focus:ring-2 focus:ring-electric-blue/30 focus:border-electric-blue/50"
        />
        {search && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-text hover:text-soft-white"
          >
            <X size={16} />
          </button>
        )}
      </div>

      <Select
        items={[
          { value: "", label: "Semua Cluster" },
          ...clusters.map((c) => ({ value: c.id, label: c.name })),
        ]}
        value={clusterId}
        onValueChange={onClusterChange}
        placeholder="Semua Cluster"
        className="w-44"
      />

      <div className="ml-auto flex items-center gap-2">
        <span className="text-sm text-muted-text">Tampilkan</span>
        <Select
          items={pageSizeOptions.map((n) => ({
            value: String(n),
            label: n >= 10000 ? "Semua" : String(n),
          }))}
          value={String(limit)}
          onValueChange={onLimitChange}
          className="w-20"
        />
        <span className="text-sm text-muted-text">per halaman</span>
      </div>
    </div>
  );
}
