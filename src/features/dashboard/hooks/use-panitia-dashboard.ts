"use client";

import { useQuery } from "@tanstack/react-query";
import { getPanitiaDashboard } from "@/features/dashboard/api/dashboard";

export function usePanitiaDashboard() {
  return useQuery({
    queryKey: ["panitia", "dashboard"],
    queryFn: getPanitiaDashboard,
    refetchInterval: 30_000,
  });
}
