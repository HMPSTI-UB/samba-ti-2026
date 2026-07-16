"use client";

import { useUser } from "@/features/auth/hooks/use-user";

export default function KaderisasiDashboardPage() {
  const { data, isLoading } = useUser();

  if (isLoading) return null;

  return (
    <div>
      <h1>Dashboard Kaderisasi — {data?.data.name}</h1>
    </div>
  );
}
