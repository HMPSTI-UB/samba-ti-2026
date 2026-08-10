"use client";

import { useMemo, useState } from "react";
import { Search, Users, SearchX } from "lucide-react";
import type { PublicClusterMember } from "@/features/clusters/types";

export default function MemberList({
  members,
}: {
  members: PublicClusterMember[];
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return members;
    return members.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        (m.nim ?? "").toLowerCase().includes(q),
    );
  }, [members, query]);

  return (
    <div className="overflow-hidden rounded-2xl border border-[#B95C00]/25 bg-gradient-to-b from-[#3A1E0F] to-[#241007]">
      <div className="flex flex-col gap-4 border-b border-[#B95C00]/15 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#B95C00]/30 bg-[#B95C00]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#EFA15B]">
            <Users size={14} />
            {members.length} Anggota
          </span>
        </div>

        <div className="relative w-full sm:max-w-xs">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-4 w-4 text-white/40" />
          </div>
          <input
            type="text"
            placeholder="Cari nama / NIM..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="block w-full rounded-lg border border-[#B95C00]/25 bg-black/20 py-2 pl-9 pr-3 text-sm text-white placeholder-white/40 transition-colors focus:border-[#EFA15B] focus:outline-none focus:ring-1 focus:ring-[#EFA15B]"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <SearchX className="mb-4 h-12 w-12 text-white/20" />
          <p className="text-sm font-medium text-white/70">
            {query
              ? "Pencarian tidak ditemukan."
              : "Belum ada anggota di cluster ini."}
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-[#B95C00]/10">
          {filtered.map((member, i) => (
            <li
              key={member.id}
              className="flex items-center gap-4 px-6 py-4 transition-colors hover:bg-[#B95C00]/5"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#B95C00]/15 text-sm font-bold text-[#EFA15B]">
                {i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-white">
                  {member.name}
                </p>
                {member.nim && (
                  <p className="truncate text-xs text-white/40">{member.nim}</p>
                )}
              </div>
              {member.gender && (
                <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white/50">
                  {member.gender}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
