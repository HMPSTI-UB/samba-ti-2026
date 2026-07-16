"use client";

import { useUser } from "@/features/auth/hooks/use-user";

export default function AdminDashboardPage() {
  const { data, isLoading } = useUser();

  if (isLoading) return null;

  return (
    <div>
      <h1>Dashboard Admin — {data?.data.name}</h1>
    </div>
  );
}
