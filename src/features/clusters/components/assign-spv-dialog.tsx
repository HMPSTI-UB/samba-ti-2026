"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Shield } from "lucide-react";
import { cn } from "@/lib/cn";
import { useAvailableSpvs } from "@/features/clusters/hooks/use-clusters";
import type { Cluster } from "@/features/clusters/types";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cluster: Cluster | null;
  onAssign: (clusterId: string, spvId: string) => void;
  isPending?: boolean;
};

export default function AssignSpvDialog({ open, onOpenChange, cluster, onAssign, isPending }: Props) {
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { data: spvsRes, isLoading } = useAvailableSpvs();

  const spvs = (spvsRes?.data ?? spvsRes ?? []) as { id: string; name: string; email: string }[];

  const filtered = Array.isArray(spvs)
    ? spvs.filter(
        (s) =>
          s.name.toLowerCase().includes(search.toLowerCase()) ||
          s.email.toLowerCase().includes(search.toLowerCase()),
      )
    : [];

  useEffect(() => {
    if (!open) {
      setSearch("");
      setSelectedId(null);
    }
  }, [open]);

  function handleAssign() {
    if (!cluster || !selectedId) return;
    onAssign(cluster.id, selectedId);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent title="Assign SPV" description={`Pilih SPV untuk ${cluster?.name ?? ""}`} variant="light">
        <div className="space-y-4">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              className="flex h-10 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 pl-9 text-sm text-slate-700 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue"
              placeholder="Cari SPV..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="max-h-60 overflow-y-auto space-y-1">
            {isLoading ? (
              <p className="text-sm text-slate-400 text-center py-8">Memuat...</p>
            ) : filtered.length === 0 ? (
              <p className="text-sm text-slate-400 text-center py-8">Tidak ada SPV ditemukan</p>
            ) : (
              filtered.map((spv) => (
                <button
                  key={spv.id}
                  onClick={() => setSelectedId(spv.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors",
                    selectedId === spv.id
                      ? "bg-cosmic-purple/10 border border-cosmic-purple/30"
                      : "hover:bg-slate-50 border border-transparent",
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold",
                    selectedId === spv.id
                      ? "bg-cosmic-purple text-white"
                      : "bg-slate-100 text-slate-500",
                  )}>
                    <Shield size={14} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">{spv.name}</p>
                    <p className="text-xs text-slate-500 truncate">{spv.email}</p>
                  </div>
                  {selectedId === spv.id && (
                    <div className="w-5 h-5 rounded-full bg-cosmic-purple flex items-center justify-center">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  )}
                </button>
              ))
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 mt-4">
          <Button type="button" variant="ghost" onClick={() => onOpenChange(false)} disabled={isPending}>
            Batal
          </Button>
          <Button type="button" variant="primary" onClick={handleAssign} disabled={!selectedId || isPending} loading={isPending}>
            Assign
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
