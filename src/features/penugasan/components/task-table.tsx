"use client";

import { Table, THead, TBody, TR, TH, TD } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { Clock, ListChecks, Pencil, Trash2 } from "lucide-react";
import type { Task, CampaignLetter } from "@/features/penugasan/types";

const LETTER_COLORS: Record<string, string> = {
  Z: "bg-purple-100 text-purple-700",
  E: "bg-blue-100 text-blue-700",
  N: "bg-emerald-100 text-emerald-700",
  I: "bg-amber-100 text-amber-700",
  T: "bg-rose-100 text-rose-700",
  H: "bg-cyan-100 text-cyan-700",
};

type Props = {
  data: Task[];
  onSelect: (task: Task) => void;
  onEdit?: (task: Task) => void;
  onDelete?: (task: Task) => void;
};

export default function TaskTable({ data, onSelect, onEdit, onDelete }: Props) {
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
          <TH className="w-16">Letter</TH>
          <TH>Judul</TH>
          <TH>Jumlah Field</TH>
          <TH>Deadline</TH>
          <TH>Dibuat</TH>
          {(onEdit || onDelete) && <TH className="w-24 text-right">Aksi</TH>}
        </TR>
      </THead>
      <TBody>
        {data.map((task) => (
          <TR
            key={task.id}
            className="cursor-pointer hover:bg-slate-50 transition-colors"
            onClick={() => onSelect(task)}
          >
            <TD>
              {task.letter && (
                <span className={cn(
                  "inline-flex items-center justify-center w-7 h-7 rounded-md text-xs font-bold border",
                  LETTER_COLORS[task.letter] || "bg-slate-100 text-slate-600 border-slate-200",
                )}>
                  {task.letter}
                </span>
              )}
            </TD>
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
            {(onEdit || onDelete) && (
              <TD className="text-right" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-end gap-1">
                  {onEdit && (
                    <Button variant="ghost" size="sm" onClick={() => onEdit(task)} className="text-slate-500 hover:text-slate-800 hover:bg-slate-100">
                      <Pencil size={14} />
                    </Button>
                  )}
                  {onDelete && (
                    <Button variant="ghost" size="sm" onClick={() => onDelete(task)} className="text-red-400 hover:text-red-600 hover:bg-red-50">
                      <Trash2 size={14} />
                    </Button>
                  )}
                </div>
              </TD>
            )}
          </TR>
        ))}
      </TBody>
    </Table>
  );
}
