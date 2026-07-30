"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/cn";
import { useUserStore } from "@/stores/user.store";
import { logoutAction } from "@/features/auth/api/action";
import {
  LayoutDashboard,
  Users,
  ClipboardCheck,
  Megaphone,
  LogOut,
  ChevronLeft,
  ChevronRight,
  X,
  Layers,
} from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUnreadCount } from "@/features/pengumuman/api/announcements";

type NavItem = { label: string; href: string; icon: React.ComponentType<{ size?: number }> };

const ALL_NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Cluster", href: "/dashboard/clusters", icon: Layers },
  { label: "User", href: "/dashboard/users", icon: Users },
  { label: "Tugas", href: "/dashboard/tugas", icon: ClipboardCheck },
  { label: "Pengumuman", href: "/dashboard/pengumuman", icon: Megaphone },
];

function getNavItems(role: string): NavItem[] {
  const roleLower = role.toLowerCase();
  const adminOnly = ["/dashboard/users"];
  const adminKaderisasi = ["/dashboard/clusters"];
  if (roleLower === "admin") return ALL_NAV_ITEMS;
  if (roleLower === "kaderisasi") return ALL_NAV_ITEMS.filter((i) => !adminOnly.includes(i.href));
  if (roleLower === "spv") return ALL_NAV_ITEMS.filter((i) => !adminOnly.includes(i.href) && !adminKaderisasi.includes(i.href));
  return [];
}

export default function DashboardSidebar({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const pathname = usePathname();
  const user = useUserStore((s) => s.user);
  const role = user?.role ?? "";
  const [collapsed, setCollapsed] = useState(false);

  const navItems = getNavItems(role);

  const { data: unreadData } = useQuery({
    queryKey: ["announcements", "unread-count"],
    queryFn: getUnreadCount,
    refetchInterval: 30_000,
  });
  const unreadCount = unreadData?.data?.unreadCount ?? 0;

  return (
    <>
      {/* Overlay (mobile only) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => onOpenChange(false)}
        />
      )}

      <aside
        className={cn(
          "flex flex-col bg-deep-space border-r border-white/10 transition-all duration-300 z-40 w-60",
          // Desktop: normal flex flow, collapsible
          "md:relative md:flex",
          collapsed && "md:w-16",
          // Mobile: fixed drawer that slides in from left
          "fixed inset-y-0 left-0",
          open ? "max-md:translate-x-0" : "max-md:-translate-x-full",
        )}
      >
      {/* Logo */}
      <div className="flex items-start justify-between px-4 py-3 border-b border-white/10">
        {!collapsed && (
          <Link href="/dashboard" className="flex items-center gap-3" onClick={() => onOpenChange(false)}>
            <img src="/logo.png" alt="Logo" className="w-10 h-10 object-contain shrink-0" />
            <div className="leading-tight">
              <span className="block text-[10px] font-medium text-electric-blue tracking-[0.15em] uppercase">
                SAMBA TI 2026
              </span>
              <span className="block font-heading font-bold text-base text-soft-white tracking-tight">
                ZENITH
              </span>
            </div>
          </Link>
        )}
        {collapsed && (
          <Link href="/dashboard" className="mx-auto" onClick={() => onOpenChange(false)}>
            <img src="/logo.png" alt="Logo" className="w-10 h-10 object-contain" />
          </Link>
        )}
        <button
          onClick={() => onOpenChange(false)}
          className="md:hidden p-1 rounded-lg text-muted-text hover:text-soft-white hover:bg-white/5 transition-colors mt-1"
        >
          <X size={18} />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 space-y-1 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => onOpenChange(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all font-body text-sm relative",
                isActive
                  ? "bg-cosmic-purple/20 text-electric-blue font-semibold"
                  : "text-muted-text hover:text-soft-white hover:bg-white/5",
                collapsed && "justify-center px-2",
              )}
            >
              <item.icon size={20} />
              {!collapsed && <span>{item.label}</span>}
              {item.label === "Pengumuman" && unreadCount > 0 && (
                <span className={cn(
                  "ml-auto flex items-center justify-center min-w-[20px] h-5 rounded-full bg-destructive text-[10px] font-bold text-white px-1.5",
                  collapsed && "ml-0 absolute -top-1 -right-1",
                )}>
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Collapse toggle (desktop only) */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="mx-2 mb-2 max-md:hidden flex items-center justify-center h-8 rounded-lg text-muted-text hover:text-soft-white hover:bg-white/5 transition-all"
      >
        {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </button>

      {/* User */}
      <div className="border-t border-white/10 p-4">
        <UserSection collapsed={collapsed} />
      </div>
    </aside>
    </>
  );
}

function UserSection({ collapsed }: { collapsed: boolean }) {
  const router = useRouter();
  const user = useUserStore((s) => s.user);
  const clearUser = useUserStore((s) => s.clearUser);
  const initial = user?.name?.charAt(0)?.toUpperCase() ?? "U";

  async function handleLogout() {
    await logoutAction();
    clearUser();
    router.push("/auth/login");
  }

  if (collapsed) {
    return (
      <div className="flex justify-center">
        <button onClick={handleLogout} className="w-8 h-8 rounded-full bg-cosmic-purple/30 flex items-center justify-center text-soft-white text-xs font-bold hover:bg-destructive/50 transition-colors">
          {initial}
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-full bg-cosmic-purple/30 flex items-center justify-center text-soft-white text-sm font-bold shrink-0">
        {initial}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-soft-white truncate">{user?.name ?? "User"}</p>
        <p className="text-xs text-muted-text truncate capitalize">{user?.role ?? "-"}</p>
      </div>
      <button onClick={handleLogout} className="text-muted-text hover:text-destructive transition-colors">
        <LogOut size={16} />
      </button>
    </div>
  );
}
