"use client";

import { useQuery } from "@tanstack/react-query";
import { getMabaDashboard } from "@/features/maba/api/dashboard";

export function useMabaDashboard() {
  return useQuery({
    queryKey: ["maba", "dashboard"],
    queryFn: getMabaDashboard,
  });
}