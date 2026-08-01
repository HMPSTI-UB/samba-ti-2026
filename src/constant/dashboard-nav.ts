import type { LucideIcon } from "lucide-react";
import {
  House,
  ClipboardList,
  Users,
  Clock3,
  Megaphone,
  User,
  LayoutDashboard,
  Layers,
  ClipboardCheck,
} from "lucide-react";

export type DashboardNavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  unreadBadge?: boolean;
};

export const MABA_NAV_ITEMS: DashboardNavItem[] = [
  { label: "Dashboard", href: "/app/dashboard", icon: House },
  { label: "Penugasan", href: "/app/penugasan", icon: ClipboardList },
  { label: "Cluster", href: "/app/cluster", icon: Users },
  { label: "Timeline", href: "/app/timeline", icon: Clock3 },
  { label: "Pengumuman", href: "/app/pengumuman", icon: Megaphone, unreadBadge: true },
  { label: "Profil", href: "/app/profil", icon: User },
];

export const PANITIA_NAV_ITEMS: DashboardNavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Cluster", href: "/dashboard/clusters", icon: Layers },
  { label: "Users", href: "/dashboard/users", icon: Users },
  { label: "Tugas", href: "/dashboard/tugas", icon: ClipboardCheck },
  { label: "Pengumuman", href: "/dashboard/pengumuman", icon: Megaphone, unreadBadge: true },
];
