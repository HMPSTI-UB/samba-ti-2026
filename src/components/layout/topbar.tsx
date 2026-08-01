"use client";

import { Menu, Bell } from "lucide-react";
import UserMenu from "./user-menu";

export default function Topbar({
  onOpenSidebar,
  unreadCount,
}: {
  onOpenSidebar: () => void;
  unreadCount: number;
}) {
  return (
    <header className="flex items-center justify-between gap-4">
      <button
        onClick={onOpenSidebar}
        className="rounded-xl p-2 text-muted-text transition-colors hover:bg-white/5 hover:text-soft-white md:hidden"
      >
        <Menu size={22} />
      </button>

      <div className="ml-auto flex items-center gap-[18px]">
        <button className="relative rounded-full p-2 text-muted-text transition-colors hover:bg-white/5 hover:text-soft-white">
          <Bell size={20} />
          {unreadCount > 0 && (
            <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-white">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </button>
        <UserMenu />
      </div>
    </header>
  );
}
