"use client";

import { Filter } from "lucide-react";

type Props = {
  unreadOnly: boolean;
  onToggle: () => void;
};

export default function AnnouncementFilter({ unreadOnly, onToggle }: Props) {
  return (
    <button
      onClick={onToggle}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
        unreadOnly
          ? "bg-cosmic-purple/10 text-cosmic-purple border border-cosmic-purple/30"
          : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300"
      }`}
    >
      <Filter size={16} />
      {unreadOnly ? "Belum dibaca" : "Semua"}
    </button>
  );
}
