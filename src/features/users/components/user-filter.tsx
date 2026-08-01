"use client";

import { Search, X } from "lucide-react";
import { Select } from "@/components/ui/select";

type Props = {
  search: string;
  role: string;
  status: string;
  onSearchChange: (v: string) => void;
  onRoleChange: (v: string) => void;
  onStatusChange: (v: string) => void;
};

export default function UserFilter({
  search,
  role,
  status,
  onSearchChange,
  onRoleChange,
  onStatusChange,
}: Props) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="relative flex-1 min-w-[200px]">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-text" />
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Cari nama..."
          className="w-full h-10 pl-9 pr-8 rounded-lg border border-white/10 bg-transparent text-sm text-soft-white placeholder:text-muted-text focus:outline-none focus:ring-2 focus:ring-electric-blue/30 focus:border-electric-blue/50"
        />
        {search && (
          <button onClick={() => onSearchChange("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-text hover:text-soft-white">
            <X size={16} />
          </button>
        )}
      </div>

      <Select
        items={[
          { value: "", label: "Semua Role" },
          { value: "ADMIN", label: "Admin" },
          { value: "KADERISASI", label: "Kaderisasi" },
          { value: "SPV", label: "SPV" },
          { value: "MABA", label: "MABA" },
        ]}
        value={role}
        onValueChange={onRoleChange}
        placeholder="Semua Role"
      />

      <Select
        items={[
          { value: "", label: "Semua Status" },
          { value: "true", label: "Aktif" },
          { value: "false", label: "Nonaktif" },
        ]}
        value={status}
        onValueChange={onStatusChange}
        placeholder="Semua Status"
      />
    </div>
  );
}
