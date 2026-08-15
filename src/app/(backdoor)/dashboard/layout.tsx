"use client";

import { useUserStore } from "@/stores/user.store";
import AppShell from "@/components/layout/app-shell";
import AuthGuard from "@/components/common/auth-guard";
import { PANITIA_NAV_ITEMS, SPV_NAV_ITEMS } from "@/constant/dashboard-nav";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = useUserStore((s) => s.user);

  const isSpv = user?.role?.toUpperCase() === "SPV";
  const navItems = isSpv ? SPV_NAV_ITEMS : PANITIA_NAV_ITEMS;

  return (
    <AuthGuard>
      <AppShell navItems={navItems}>{children}</AppShell>
    </AuthGuard>
  );
}
