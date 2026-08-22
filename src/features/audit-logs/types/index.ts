export type AuditAction = "CREATE" | "UPDATE" | "DELETE";

export type AuditLog = {
  id: string;
  entityType: string;
  entityId: string | null;
  action: AuditAction;
  performedByRole: string;
  changes: Record<string, unknown> | null;
  createdAt: string;
  performerName: string;
};

export type AuditLogsResponse = {
  data: AuditLog[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export type AuditLogFilters = {
  page: number;
  limit: number;
  entityType?: string;
  action?: AuditAction | "";
};