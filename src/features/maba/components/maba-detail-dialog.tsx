"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import type { SafeUser } from "@/features/users/api/users";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  maba: SafeUser | null;
  clusterName: string;
};

function formatDate(dateStr?: string) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function genderLabel(gender: string | null): string {
  const n = gender?.trim().toUpperCase();
  if (n === "P" || n === "PEREMPUAN") return "Perempuan";
  if (n === "L" || n === "LAKI_LAKI") return "Laki-laki";
  return "—";
}

export default function MabaDetailDialog({ open, onOpenChange, maba, clusterName }: Props) {
  if (!maba) return null;

  const details = [
    { label: "Nama Lengkap", value: maba.name },
    { label: "NIM", value: maba.nim ?? "—" },
    { label: "Jenis Kelamin", value: genderLabel(maba.gender) },
    { label: "Email", value: maba.email },
    { label: "Username", value: maba.username ?? "—" },
    { label: "Cluster", value: clusterName || "Belum ada cluster" },
    {
      label: "Status Akun",
      value: (
        <span
          className={cn(
            "inline-block rounded-full px-2.5 py-0.5 text-xs font-medium",
            maba.status ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400",
          )}
        >
          {maba.status ? "Aktif" : "Nonaktif"}
        </span>
      ),
    },
    { label: "Terdaftar Pada", value: formatDate(maba.createdAt) },
    { label: "Terakhir Diubah", value: formatDate(maba.updatedAt) },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent title="Detail Informasi MABA" className="max-w-md">
        <div className="space-y-4 py-2">
          <div className="flex flex-col items-center gap-2 pb-4 border-b border-white/10">
            <div className="w-16 h-16 rounded-full bg-electric-blue/10 flex items-center justify-center text-electric-blue font-bold text-2xl">
              {maba.name.charAt(0).toUpperCase()}
            </div>
            <h3 className="font-semibold text-soft-white text-lg text-center mt-1">{maba.name}</h3>
            <p className="text-xs text-muted-text">{maba.nim ?? "Mahasiswa Baru"}</p>
          </div>

          <div className="divide-y divide-white/5">
            {details.map((d, i) => (
              <div key={i} className="flex justify-between py-2.5 text-sm">
                <span className="text-muted-text">{d.label}</span>
                <span className="font-medium text-soft-white text-right break-all max-w-[200px]">
                  {d.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-white/10 mt-4">
          <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
            Tutup
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
