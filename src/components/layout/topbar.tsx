"use client";

import { Menu } from "lucide-react";
import UserMenu from "./user-menu";
import NotificationDropdown from "./notification-dropdown";

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
        <NotificationDropdown unreadCount={unreadCount} />
        <UserMenu />
      </div>
    </header>
  );
}
