import type { LucideIcon } from "lucide-react";
import {
  House,
  ClipboardList,
  Users,
  Megaphone,
  User,
  UserRound,
  LayoutDashboard,
  Layers,
  ClipboardCheck,
  Settings,
  ScrollText,
} from "lucide-react";

export type DashboardNavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  unreadBadge?: boolean;
  adminOnly?: boolean;
};

export const MABA_NAV_ITEMS: DashboardNavItem[] = [
  { label: "Dashboard", href: "/app/dashboard", icon: House },
  { label: "Penugasan", href: "/app/penugasan", icon: ClipboardList },
  { label: "Cluster", href: "/app/cluster", icon: Users },
  { label: "Pengumuman", href: "/app/pengumuman", icon: Megaphone, unreadBadge: true },
  { label: "Profil", href: "/app/profil", icon: User },
];

export const PANITIA_NAV_ITEMS: DashboardNavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Maba", href: "/dashboard/maba", icon: UserRound },
  { label: "Cluster", href: "/dashboard/clusters", icon: Layers },
  { label: "Users", href: "/dashboard/users", icon: Users },
  { label: "Tugas", href: "/dashboard/tugas", icon: ClipboardCheck },
  { label: "Pengumuman", href: "/dashboard/pengumuman", icon: Megaphone, unreadBadge: true },
  { label: "Log Aktivitas", href: "/dashboard/audit-logs", icon: ScrollText, adminOnly: true },
  { label: "Pengaturan", href: "/dashboard/pengaturan", icon: Settings },
  { label: "Profil", href: "/dashboard/profil", icon: User },
];

export const SPV_NAV_ITEMS: DashboardNavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Cluster", href: "/dashboard/cluster", icon: Layers },
  { label: "Pengumuman", href: "/dashboard/pengumuman", icon: Megaphone, unreadBadge: true },
  { label: "Profil", href: "/dashboard/profil", icon: User },
];
