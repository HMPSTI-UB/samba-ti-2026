import { clientApi } from "@/lib/api/client";
import type { AuditLogsResponse, AuditAction } from "@/features/audit-logs/types";

export function getAuditLogs(params: { page: number; limit: number; entityType?: string; action?: AuditAction | "" }) {
  const searchParams = new URLSearchParams();
  searchParams.set("page", String(params.page));
  searchParams.set("limit", String(params.limit));
  if (params.entityType) searchParams.set("entityType", params.entityType);
  if (params.action) searchParams.set("action", params.action);

  return clientApi.get<AuditLogsResponse>(`/audit-logs?${searchParams.toString()}`);
}