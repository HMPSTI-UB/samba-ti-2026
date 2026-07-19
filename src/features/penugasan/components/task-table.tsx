"use client";

import { Table, THead, TBody, TR, TH, TD } from "@/components/ui/table";
import { cn } from "@/lib/cn";
import { Clock, ListChecks } from "lucide-react";
import type { Task } from "@/features/penugasan/types";

type Props = {
  data: Task[];
  onSelect: (task: Task) => void;
};

export default function TaskTable({ data, onSelect }: Props) {
  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="rounded-full bg-slate-100 p-4 mb-4">
          <ListChecks size={32} className="text-slate-400" />
        </div>
        <p className="text-sm font-medium text-slate-700">Belum ada tugas</p>
        <p className="text-xs text-slate-400 mt-1">Tugas akan muncul di sini setelah dibuat.</p>
      </div>
    );
  }

  return (
    <Table>
      <THead>
        <TR>
          <TH>Judul</TH>
          <TH>Jumlah Field</TH>
          <TH>Deadline</TH>
          <TH>Dibuat</TH>
        </TR>
      </THead>
      <TBody>
        {data.map((task) => (
          <TR
            key={task.id}
            className="cursor-pointer hover:bg-slate-50 transition-colors"
            onClick={() => onSelect(task)}
          >
            <TD className="font-medium text-slate-900">{task.title}</TD>
            <TD>
              <span className="inline-flex items-center gap-1 text-sm text-slate-500">
                {task.formFields.length} field
              </span>
            </TD>
            <TD>
              <span className="inline-flex items-center gap-1.5 text-sm text-slate-500">
                <Clock size={14} />
                {new Date(task.deadline).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </TD>
            <TD className="text-sm text-slate-400">
              {new Date(task.createdAt).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "short",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </TD>
          </TR>
        ))}
      </TBody>
    </Table>
  );
}
