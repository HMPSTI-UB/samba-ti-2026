"use client";

import { usePathname, useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { cn } from "@/lib/cn";
import { logoutAction } from "@/features/auth/api/action";
import { useUserStore } from "@/stores/user.store";
import NavItem from "./nav-item";
import type { DashboardNavItem } from "@/constant/dashboard-nav";

export default function AppSidebar({
  open,
  onOpenChange,
  navItems,
  unreadCount,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  navItems: DashboardNavItem[];
  unreadCount: number;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const clearUser = useUserStore((s) => s.clearUser);

  async function handleLogout() {
    await logoutAction();
    clearUser();
    router.push("/auth/login");
  }

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => onOpenChange(false)}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 m-3 flex flex-col overflow-hidden rounded-2xl border border-white bg-midnight-navy",
          "w-[250px] transition-all duration-300",
          open ? "translate-x-0" : "-translate-x-[120%]",
          "md:relative md:translate-x-0 md:w-[72px] lg:w-[250px]",
        )}
      >
        {/* Logo */}
        <div className="flex flex-col items-center gap-1.5 pt-7 pb-6">
          <img
            src="/logo.png"
            alt="ZENITH 2026"
            className="w-10 shrink-0 object-contain md:w-10 lg:w-[70px]"
          />
          <div className="hidden lg:block text-center leading-tight">
            <span className="block font-heading font-bold text-lg text-soft-white tracking-wide">
              ZENITH
            </span>
            <span className="block text-xs font-medium tracking-[0.35em] text-sun-gold">
              2026
            </span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex flex-1 flex-col gap-1 px-2.5">
          {navItems.map((item) => (
            <NavItem
              key={item.href}
              item={item}
              isActive={pathname === item.href}
              badge={item.unreadBadge ? unreadCount : undefined}
              onNavigate={() => onOpenChange(false)}
            />
          ))}
        </nav>

        {/* Logout */}
        <div className="px-2.5 pb-5 pt-3">
          <button
            onClick={handleLogout}
            className="flex h-[42px] w-full items-center gap-3 rounded-xl px-3.5 text-sm text-destructive transition-all duration-200 hover:translate-x-1 hover:bg-destructive/10"
          >
            <LogOut size={20} className="shrink-0" />
            <span className="hidden lg:inline">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
