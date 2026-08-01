"use client";

import { useUser } from "@/features/auth/hooks/use-user";

export default function MabaDashboardPage() {
  const { data, isLoading } = useUser();

  if (isLoading) return null;

  return (
    <div>
      <h1>Selamat datang, {data?.data.name}</h1>
    </div>
  );
}
