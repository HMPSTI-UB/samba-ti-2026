"use client";

import { useUserStore } from "@/stores/user.store";
import AppShell from "@/components/layout/app-shell";
import AuthGuard from "@/components/common/auth-guard";
import { PANITIA_NAV_ITEMS, SPV_NAV_ITEMS } from "@/constant/dashboard-nav";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = useUserStore((s) => s.user);

  const role = user?.role?.toUpperCase() ?? "";
  const isSpv = role === "SPV";
  const isAdmin = role === "ADMIN";
  const baseNavItems = isSpv ? SPV_NAV_ITEMS : PANITIA_NAV_ITEMS;
  const navItems = baseNavItems.filter((item) => !item.adminOnly || isAdmin);

  return (
    <AuthGuard>
      <AppShell navItems={navItems}>{children}</AppShell>
    </AuthGuard>
  );
}
