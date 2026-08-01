"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUserStore } from "@/stores/user.store";
import { ROLE_ROUTES } from "@/constant/roles";

export default function DashboardPage() {
  const router = useRouter();
  const user = useUserStore((s) => s.user);

  useEffect(() => {
    if (user?.role) {
      const route = ROLE_ROUTES[user.role];
      if (route) {
        router.replace(route);
      }
    }
  }, [user, router]);

  return null;
}
