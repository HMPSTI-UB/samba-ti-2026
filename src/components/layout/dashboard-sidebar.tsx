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
  Calendar,
  Megaphone,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Peserta", href: "/dashboard/admin/users", icon: Users },
  { label: "Tugas", href: "/dashboard/tugas", icon: ClipboardCheck },
  { label: "Jadwal", href: "/dashboard/jadwal", icon: Calendar },
  { label: "Pengumuman", href: "/dashboard/pengumuman", icon: Megaphone },
  { label: "Pengaturan", href: "/dashboard/pengaturan", icon: Settings },
];

export default function DashboardSidebar({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

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
      <div className="flex h-16 items-center justify-between px-4 border-b border-white/10">
        {!collapsed && (
          <Link href="/dashboard" className="flex items-center gap-2" onClick={() => onOpenChange(false)}>
            <div className="w-8 h-8 bg-gradient-to-br from-electric-blue to-cosmic-purple rounded-lg flex items-center justify-center shadow-lg shadow-electric-blue/20">
              <span className="font-heading font-bold text-white text-sm">Z</span>
            </div>
            <span className="font-heading font-bold text-sm text-soft-white tracking-tight">
              ZENITH
            </span>
          </Link>
        )}
        {collapsed && (
          <Link href="/dashboard" className="mx-auto" onClick={() => onOpenChange(false)}>
            <div className="w-8 h-8 bg-gradient-to-br from-electric-blue to-cosmic-purple rounded-lg flex items-center justify-center shadow-lg shadow-electric-blue/20">
              <span className="font-heading font-bold text-white text-sm">Z</span>
            </div>
          </Link>
        )}
        <button
          onClick={() => onOpenChange(false)}
          className="md:hidden p-1 rounded-lg text-muted-text hover:text-soft-white hover:bg-white/5 transition-colors"
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
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all font-body text-sm",
                isActive
                  ? "bg-cosmic-purple/20 text-electric-blue font-semibold"
                  : "text-muted-text hover:text-soft-white hover:bg-white/5",
                collapsed && "justify-center px-2",
              )}
            >
              <item.icon size={20} />
              {!collapsed && <span>{item.label}</span>}
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
