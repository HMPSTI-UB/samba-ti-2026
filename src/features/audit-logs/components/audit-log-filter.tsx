"use client";

import { Select } from "@/components/ui/select";
import type { AuditAction } from "@/features/audit-logs/types";

type Props = {
  entityType: string;
  action: AuditAction | "";
  onEntityTypeChange: (value: string) => void;
  onActionChange: (value: AuditAction | "") => void;
};

const ENTITY_OPTIONS = [
  { value: "", label: "Semua Entity" },
  { value: "user", label: "User" },
  { value: "maba", label: "Maba" },
  { value: "cluster", label: "Cluster" },
  { value: "task", label: "Tugas" },
  { value: "task_submission", label: "Submission" },
  { value: "election", label: "Election" },
];

const ACTION_OPTIONS: { value: AuditAction | ""; label: string }[] = [
  { value: "", label: "Semua Aksi" },
  { value: "CREATE", label: "CREATE" },
  { value: "UPDATE", label: "UPDATE" },
  { value: "DELETE", label: "DELETE" },
];

export default function AuditLogFilter({ entityType, action, onEntityTypeChange, onActionChange }: Props) {
  return (
    <div className="flex flex-wrap gap-3">
      <div className="w-48">
        <Select
          placeholder="Entity"
          items={ENTITY_OPTIONS}
          value={entityType}
          onValueChange={onEntityTypeChange}
        />
      </div>
      <div className="w-48">
        <Select
          placeholder="Aksi"
          items={ACTION_OPTIONS}
          value={action}
          onValueChange={(value) => onActionChange(value as AuditAction | "")}
        />
      </div>
    </div>
  );
}