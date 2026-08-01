"use client";

import AppShell from "@/components/layout/app-shell";
import { MABA_NAV_ITEMS } from "@/constant/dashboard-nav";

export default function MabaAppLayout({ children }: { children: React.ReactNode }) {
  return <AppShell navItems={MABA_NAV_ITEMS}>{children}</AppShell>;
}
