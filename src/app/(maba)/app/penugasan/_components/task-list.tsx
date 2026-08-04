"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FaClipboardList,
  FaCircleCheck,
  FaClock,
  FaCircleXmark,
  FaHourglassStart,
  FaAlignLeft,
  FaCalendarDay,
  FaArrowRightLong,
} from "react-icons/fa6";
import { useMyTasks } from "@/features/penugasan/hooks/use-tasks";
import type { MabaTask, MabaTaskStatus } from "@/features/penugasan/types";
import type { IconType } from "react-icons";
import { cn } from "@/lib/cn";

type Filter = "ALL" | "DONE" | "UNDONE";

const FILTERS: { key: Filter; label: string }[] = [
  { key: "ALL", label: "Semua" },
  { key: "DONE", label: "Selesai" },
  { key: "UNDONE", label: "Belum Selesai" },
];

const STATUS_META: Record<
  MabaTaskStatus,
  { label: string; class: string; icon: typeof FaClock }
> = {
  DONE: { label: "Selesai", class: "bg-emerald-500/15 text-emerald-400", icon: FaCircleCheck },
  PENDING: { label: "Menunggu Review", class: "bg-amber-500/15 text-amber-400", icon: FaClock },
  REJECTED: { label: "Perlu Revisi", class: "bg-red-500/15 text-red-400", icon: FaCircleXmark },
  NOT_SUBMITTED: { label: "Belum Dikerjakan", class: "bg-white/5 text-slate-300", icon: FaHourglassStart },
};

function StatusBadge({ status }: { status: MabaTaskStatus }) {
  const meta = STATUS_META[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold capitalize whitespace-nowrap",
        meta.class,
      )}
    >
      <meta.icon className="h-3 w-3" />
      {meta.label}
    </span>
  );
}

function formatDeadline(value: string) {
  return new Date(value).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: IconType;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-white/10 mt-6 pt-6">
      <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white mb-3">
        <Icon className="h-4 w-4 text-sun-gold" />
        {title}
      </h4>
      {children}
    </section>
  );
}

export default function TaskList() {
  const { data } = useMyTasks();
  const [filter, setFilter] = useState<Filter>("ALL");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const tasks = data?.data ?? [];

  const filtered = tasks.filter((t) => {
    if (filter === "DONE") return t.doneStatus === "DONE";
    if (filter === "UNDONE") return t.doneStatus !== "DONE";
    return true;
  });

const activeId = selectedId ?? filtered[0]?.id ?? null;
  const selected: MabaTask | null =
    activeId != null ? filtered.find((t) => t.id === activeId) ?? null : null;
  const done = selected?.doneStatus === "DONE";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[6fr_5fr] gap-6 items-start">
      {/* LEFT — Daftar Tugas */}
      <div className="rounded-2xl border border-white bg-background/30 overflow-hidden flex flex-col">
        <div className="p-4 sm:p-6 border-b border-white">
          <h2 className="text-lg font-black tracking-widest text-white uppercase">Daftar Penugasan</h2>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            {FILTERS.map(({ key, label }) => {
              const count =
                key === "ALL"
                  ? tasks.length
                  : key === "DONE"
                    ? tasks.filter((t) => t.doneStatus === "DONE").length
                    : tasks.filter((t) => t.doneStatus !== "DONE").length;
              return (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className={cn(
                    "rounded-full px-3.5 py-1.5 text-xs font-bold transition-colors border",
                    filter === key
                      ? "bg-electric-blue/20 text-electric-blue border-electric-blue/50"
                      : "bg-white/5 text-slate-400 border-white/10 hover:bg-white/10 hover:text-soft-white",
                  )}
                >
                  {label}
                  <span className="ml-1.5 text-[10px] opacity-70">{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {tasks.length === 0 ? (
            <div className="p-8 text-center">
              <FaClipboardList className="h-8 w-8 text-muted-text mx-auto mb-3" />
              <p className="text-sm text-muted-text">Belum ada penugasan.</p>
            </div>
          ) : filtered.length === 0 ? (
            <p className="px-6 py-8 text-center text-sm text-muted-text">
              Tidak ada penugasan pada filter ini.
            </p>
          ) : (
            <ul className="divide-y divide-white/5">
              {filtered.map((task) => {
                const isActive = task.id === activeId;
                return (
                  <li key={task.id}>
                    <button
                      onClick={() => setSelectedId(task.id)}
                      className={cn(
                        "w-full text-left px-5 py-4 transition-colors border-l-2",
                        isActive
                          ? "bg-white/10 border-electric-blue/60"
                          : "border-transparent hover:bg-white/5 hover:border-white/20",
                      )}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span
                          className={cn(
                            "text-sm font-bold leading-snug",
                            isActive ? "text-white" : "text-soft-white",
                          )}
                        >
                          {task.title}
                        </span>
                        <StatusBadge status={task.doneStatus} />
                      </div>
                      <p className="mt-1.5 flex items-center gap-1.5 text-[11px] text-muted-text">
                        <FaCalendarDay className="h-3 w-3" />
                        {formatDeadline(task.deadline)}
                      </p>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      {/* KANAN — Detail */}
      <div className="rounded-2xl border border-white bg-background/30 overflow-hidden sticky top-24">
        {!selected ? (
          <div className="flex flex-col items-center justify-center p-10 text-center min-h-[320px]">
            <FaClipboardList className="h-10 w-10 text-muted-text mb-3" />
            <p className="text-sm text-muted-text">Pilih tugas di daftar kiri untuk melihat detail.</p>
          </div>
        ) : (
          <div className="p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4 mb-4">
              <h3 className="text-xl font-extrabold text-white leading-tight pr-4">
                {selected.title}
              </h3>
              <StatusBadge status={selected.doneStatus} />
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-text mb-6">
              <FaCalendarDay className="h-3.5 w-3.5" />
              <span>
                Deadline: <span className="font-bold text-soft-white">{formatDeadline(selected.deadline)}</span>
              </span>
            </div>

            <Section icon={FaAlignLeft} title="Deskripsi">
              {selected.description ? (
                <div
                  className="text-sm text-slate-300 prose-sm prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: selected.description }}
                />
              ) : (
                <p className="text-sm text-muted-text">Tidak ada deskripsi.</p>
              )}
            </Section>

            <Section icon={FaClipboardList} title="Prasyarat / Ketentuan">
              {selected.termsConditions.length > 0 ? (
                <ul className="space-y-2">
                  {selected.termsConditions.map((t, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sun-gold" />
                      {t}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-text">Tidak ada prasyarat.</p>
              )}
            </Section>

            <Link
              href={`/app/penugasan/${selected.id}`}
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#FACC15] px-6 py-3 text-sm font-bold text-black hover:bg-[#E6B800] transition-colors shadow-[0_0_20px_rgba(250,204,21,0.25)]"
            >
              {done ? "Lihat Detail" : "Kerjakan"}
              <FaArrowRightLong className="h-3.5 w-3.5" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}