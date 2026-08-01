"use client";

import { useUser } from "@/features/auth/hooks/use-user";

export default function DashboardContent() {
  const { data, isLoading } = useUser();

  if (isLoading) return null;

  return (
    <div>
      <h1 className="text-2xl font-bold text-soft-white">
        Selamat datang, {data?.data.name}
      </h1>
      <p className="mt-2 text-muted-text">Dashboard MABA siap dikembangkan.</p>
    </div>
  );
}
