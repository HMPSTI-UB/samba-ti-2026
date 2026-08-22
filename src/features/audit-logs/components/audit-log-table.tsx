"use client";

import { Fragment, useState } from "react";
import { Table, THead, TBody, TR, TH, TD } from "@/components/ui/table";
import { cn } from "@/lib/cn";
import { ChevronDown, ChevronRight } from "lucide-react";
import type { AuditLog, AuditAction } from "@/features/audit-logs/types";

const actionColors: Record<AuditAction, string> = {
  CREATE: "bg-emerald-500/10 text-emerald-400",
  UPDATE: "bg-electric-blue/10 text-electric-blue",
  DELETE: "bg-red-500/10 text-red-400",
};

const roleColors: Record<string, string> = {
  ADMIN: "bg-cosmic-purple/10 text-cosmic-purple",
  KADERISASI: "bg-electric-blue/10 text-electric-blue",
  SPV: "bg-supernova-orange/10 text-supernova-orange",
  MABA: "bg-star-gold/10 text-star-gold",
};

function entityLabel(entityType: string): string {
  const map: Record<string, string> = {
    user: "User",
    maba: "Maba",
    cluster: "Cluster",
    task: "Tugas",
    task_submission: "Submission",
    announcement: "Pengumuman",
    election: "Election",
  };
  return map[entityType] ?? entityType;
}

function formatDate(value: string): string {
  return new Date(value).toLocaleString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AuditLogTable({ data }: { data: AuditLog[] }) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (data.length === 0) {
    return (
      <div className="p-10 text-center text-sm text-muted-text">
        Tidak ada log ditemukan
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <THead>
          <TR>
            <TH>Waktu</TH>
            <TH>Pelaku</TH>
            <TH>Role</TH>
            <TH>Aksi</TH>
            <TH>Entity</TH>
            <TH>Detail</TH>
          </TR>
        </THead>
        <TBody>
          {data.map((log) => {
            const expanded = expandedId === log.id;
            return (
              <Fragment key={log.id}>
                <TR>
                  <TD className="whitespace-nowrap text-xs text-muted-text">
                    {formatDate(log.createdAt)}
                  </TD>
                  <TD className="font-medium text-soft-white">{log.performerName}</TD>
                  <TD>
                    <span
                      className={cn(
                        "inline-block rounded-full px-2.5 py-0.5 text-xs font-medium",
                        roleColors[log.performedByRole] ?? "bg-white/10 text-muted-text",
                      )}
                    >
                      {log.performedByRole}
                    </span>
                  </TD>
                  <TD>
                    <span
                      className={cn(
                        "inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold",
                        actionColors[log.action],
                      )}
                    >
                      {log.action}
                    </span>
                  </TD>
                  <TD className="text-sm text-soft-white">{entityLabel(log.entityType)}</TD>
                  <TD>
                    <button
                      onClick={() => setExpandedId(expanded ? null : log.id)}
                      className="flex items-center gap-1 text-xs text-electric-blue hover:underline"
                    >
                      {expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                      {expanded ? "Tutup" : "Lihat"}
                    </button>
                  </TD>
                </TR>
                {expanded && (
                  <TR>
                    <TD colSpan={6} className="bg-black/20">
                      <div className="rounded-lg border border-white/10 bg-deep-space p-4">
                        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-text">
                          Perubahan (changes)
                        </p>
                        <pre className="rich-text whitespace-pre-wrap text-xs text-white/80">
                          {JSON.stringify(log.changes ?? {}, null, 2)}
                        </pre>
                      </div>
                    </TD>
                  </TR>
                )}
              </Fragment>
            );
          })}
        </TBody>
      </Table>
    </div>
  );
}