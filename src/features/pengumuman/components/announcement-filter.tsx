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
          : "bg-transparent text-muted-text border border-white/10 hover:border-white/30"
      }`}
    >
      <Filter size={16} />
      {unreadOnly ? "Belum dibaca" : "Semua"}
    </button>
  );
}
