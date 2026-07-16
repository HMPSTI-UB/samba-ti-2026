"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUser } from "@/features/auth/hooks/use-user";
import { ROLE_ROUTES } from "@/constant/roles";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data, isLoading } = useUser();

  useEffect(() => {
    if (!isLoading && data?.data.role && data.data.role === "mahasiswa") {
      router.replace(ROLE_ROUTES.mahasiswa);
    }
  }, [data, isLoading, router]);

  if (isLoading) return null;

  return <>{children}</>;
}
