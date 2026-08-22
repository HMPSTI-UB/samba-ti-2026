import { clientApi } from "@/lib/api/client";
import type { ApiAuditLogsResponse, AuditAction } from "@/features/audit-logs/types";

export function getAuditLogs(params: {
  page: number;
  limit: number;
  entityType?: string;
  action?: AuditAction | "";
}): Promise<ApiAuditLogsResponse> {
  const searchParams = new URLSearchParams();
  searchParams.set("page", String(params.page));
  searchParams.set("limit", String(params.limit));
  if (params.entityType) searchParams.set("entityType", params.entityType);
  if (params.action) searchParams.set("action", params.action);

  return clientApi.get(`/audit-logs?${searchParams.toString()}`) as unknown as Promise<ApiAuditLogsResponse>;
}