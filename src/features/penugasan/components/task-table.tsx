"use client";

import { Table, THead, TBody, TR, TH, TD } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { Clock, ListChecks, Pencil, Trash2 } from "lucide-react";
import type { Task, CampaignLetter } from "@/features/penugasan/types";

const LETTER_COLORS: Record<string, string> = {
  Z: "bg-purple-500/10 text-purple-400",
  E: "bg-blue-500/10 text-blue-400",
  N: "bg-emerald-500/10 text-emerald-400",
  I: "bg-amber-500/10 text-amber-400",
  T: "bg-rose-500/10 text-rose-400",
  H: "bg-cyan-500/10 text-cyan-400",
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
        <div className="rounded-full bg-white/10 p-4 mb-4">
          <ListChecks size={32} className="text-muted-text" />
        </div>
        <p className="text-sm font-medium text-soft-white">Belum ada tugas</p>
        <p className="text-xs text-muted-text mt-1">Tugas akan muncul di sini setelah dibuat.</p>
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
            className="cursor-pointer hover:bg-white/5 transition-colors"
            onClick={() => onSelect(task)}
          >
            <TD>
              {task.letter && (
                <span className={cn(
                  "inline-flex items-center justify-center w-7 h-7 rounded-md text-xs font-bold border",
                  LETTER_COLORS[task.letter] || "bg-white/10 text-muted-text border-white/10",
                )}>
                  {task.letter}
                </span>
              )}
            </TD>
            <TD className="font-medium text-soft-white">{task.title}</TD>
            <TD>
              <span className="inline-flex items-center gap-1 text-sm text-muted-text">
                {task.formFields.length} field
              </span>
            </TD>
            <TD>
              <span className="inline-flex items-center gap-1.5 text-sm text-muted-text">
                <Clock size={14} />
                {new Date(task.deadline).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </TD>
            <TD className="text-sm text-muted-text">
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
                    <Button variant="ghost" size="sm" onClick={() => onEdit(task)} className="text-muted-text hover:text-soft-white hover:bg-white/10">
                      <Pencil size={14} />
                    </Button>
                  )}
                  {onDelete && (
                    <Button variant="ghost" size="sm" onClick={() => onDelete(task)} className="text-red-400 hover:text-red-300 hover:bg-red-500/10">
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
