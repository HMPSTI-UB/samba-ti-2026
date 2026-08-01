"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/user.store";
import { ROLE_ROUTES } from "@/constant/roles";
import AppShell from "@/components/layout/app-shell";
import { PANITIA_NAV_ITEMS } from "@/constant/dashboard-nav";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const user = useUserStore((s) => s.user);

  useEffect(() => {
    if (user?.role?.toLowerCase() === "mahasiswa") {
      router.replace(ROLE_ROUTES.mahasiswa);
    }
  }, [user, router]);

  return <AppShell navItems={PANITIA_NAV_ITEMS}>{children}</AppShell>;
}
