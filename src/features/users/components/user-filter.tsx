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
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Cari nama..."
          className="w-full h-10 pl-9 pr-8 rounded-lg border border-slate-200 bg-white text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cosmic-purple/20 focus:border-cosmic-purple"
        />
        {search && (
          <button onClick={() => onSearchChange("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
            <X size={16} />
          </button>
        )}
      </div>

      <Select
        variant="light"
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
        variant="light"
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
