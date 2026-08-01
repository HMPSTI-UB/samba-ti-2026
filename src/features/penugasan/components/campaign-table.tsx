"use client";

import { useMemo } from "react";
import { Table, THead, TBody, TR, TH, TD } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { Clock, Pencil, Trash2, FileText } from "lucide-react";
import type { Task, CampaignLetter } from "@/features/penugasan/types";
import { CAMPAIGN_LETTERS } from "@/features/penugasan/types";

type Props = {
  data: Task[];
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
};

const LETTER_COLORS: Record<CampaignLetter, string> = {
  Z: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  E: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  N: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  I: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  T: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  H: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
};

export default function CampaignTable({ data, onEdit, onDelete }: Props) {
  const grouped = useMemo(() => {
    const map: Record<string, Task[]> = {};
    CAMPAIGN_LETTERS.forEach((l) => {
      map[l] = [];
    });
    data.forEach((task) => {
      if (map[task.letter]) {
        map[task.letter].push(task);
      } else {
        map[task.letter] = [task];
      }
    });
    return map;
  }, [data]);

  const totalTasks = data.length;

  return (
    <div className="space-y-6">
      {CAMPAIGN_LETTERS.map((letter) => {
        const tasks = grouped[letter];
        return (
          <div key={letter} className="rounded-xl border border-white/10 bg-card-bg overflow-hidden">
            <div className="px-5 py-3 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className={cn(
                  "inline-flex items-center justify-center w-8 h-8 rounded-lg text-sm font-bold border",
                  LETTER_COLORS[letter],
                )}>
                  {letter}
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-soft-white">
                    Letter {letter}
                  </h3>
                  <p className="text-xs text-muted-text">
                    {tasks.length} tugas
                  </p>
                </div>
              </div>
            </div>

            {tasks.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <FileText size={24} className="text-muted-text mb-2" />
                <p className="text-sm text-muted-text">Belum ada tugas</p>
              </div>
            ) : (
              <Table>
                <THead>
                  <TR>
                    <TH>Judul Tugas</TH>
                    <TH>Deadline</TH>
                    <TH>Dibuat</TH>
                    <TH className="w-24 text-right">Aksi</TH>
                  </TR>
                </THead>
                <TBody>
                  {tasks.map((task) => (
                    <TR key={task.id}>
                      <TD className="font-medium text-soft-white">{task.title}</TD>
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
                      <TD className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onEdit(task)}
                            className="text-muted-text hover:text-soft-white hover:bg-white/10"
                          >
                            <Pencil size={14} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onDelete(task)}
                            className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </TD>
                    </TR>
                  ))}
                </TBody>
              </Table>
            )}
          </div>
        );
      })}

      {totalTasks === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="rounded-full bg-white/10 p-4 mb-4">
            <FileText size={32} className="text-muted-text" />
          </div>
          <p className="text-sm font-medium text-soft-white">Belum ada tugas di campaign</p>
          <p className="text-xs text-muted-text mt-1">Buat tugas baru untuk memulai campaign ZENITH.</p>
        </div>
      )}
    </div>
  );
}
