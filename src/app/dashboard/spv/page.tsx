"use client";

import { useUser } from "@/features/auth/hooks/use-user";

export default function SpvDashboardPage() {
  const { data, isLoading } = useUser();

  if (isLoading) return null;

  return (
    <div>
      <h1>Dashboard SPV — {data?.data.name}</h1>
    </div>
  );
}
