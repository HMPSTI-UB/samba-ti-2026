"use client";

import { useState } from "react";
import Pagination from "@/components/ui/pagination";
import { useAuditLogs } from "@/features/audit-logs/hooks/use-audit-logs";
import AuditLogTable from "@/features/audit-logs/components/audit-log-table";
import AuditLogFilter from "@/features/audit-logs/components/audit-log-filter";
import type { AuditAction } from "@/features/audit-logs/types";

const LIMIT = 20;

export default function AuditLogsPage() {
  const [entityType, setEntityType] = useState("");
  const [action, setAction] = useState<AuditAction | "">("");
  const [page, setPage] = useState(1);

  const { data, isLoading } = useAuditLogs({
    page,
    limit: LIMIT,
    entityType: entityType || undefined,
    action: action || undefined,
  });

  const logs = data?.data.data ?? [];
  const total = data?.data.pagination.total ?? 0;
  const totalPages = data ? Math.ceil(data.data.pagination.total / LIMIT) : 1;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-soft-white">Log Aktivitas</h1>
        <p className="text-sm text-muted-text mt-0.5">
          Jejak perubahan data (siapa, kapan, aksi apa) di seluruh modul
        </p>
      </div>

      <AuditLogFilter
        entityType={entityType}
        action={action}
        onEntityTypeChange={(v) => { setEntityType(v); setPage(1); }}
        onActionChange={(v) => { setAction(v); setPage(1); }}
      />

      <div className="rounded-xl border border-white/10 bg-card-bg overflow-hidden">
        {isLoading ? (
          <div className="p-10 text-center text-sm text-muted-text">Memuat data...</div>
        ) : (
          <AuditLogTable data={logs} />
        )}
        <Pagination page={page} totalPages={totalPages} total={total} onPageChange={setPage} />
      </div>
    </div>
  );
}