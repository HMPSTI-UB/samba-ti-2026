"use client";

import { useQuery } from "@tanstack/react-query";
import { getAuditLogs } from "@/features/audit-logs/api/audit-logs";
import type { AuditLogFilters } from "@/features/audit-logs/types";

export function useAuditLogs(filters: AuditLogFilters, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ["audit-logs", filters],
    queryFn: () => getAuditLogs(filters),
    enabled: options?.enabled,
  });
}