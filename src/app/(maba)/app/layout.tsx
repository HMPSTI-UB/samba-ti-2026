"use client";

import AppShell from "@/components/layout/app-shell";
import AuthGuard from "@/components/common/auth-guard";
import { MABA_NAV_ITEMS } from "@/constant/dashboard-nav";

export default function MabaAppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <AppShell navItems={MABA_NAV_ITEMS}>{children}</AppShell>
    </AuthGuard>
  );
}
