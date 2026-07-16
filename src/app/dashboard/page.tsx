"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUser } from "@/features/auth/hooks/use-user";
import { ROLE_ROUTES } from "@/constant/roles";

export default function DashboardPage() {
  const router = useRouter();
  const { data, isLoading } = useUser();

  useEffect(() => {
    if (!isLoading && data?.data.role) {
      const route = ROLE_ROUTES[data.data.role];
      if (route) {
        router.replace(route);
      }
    }
  }, [data, isLoading, router]);

  return null;
}
