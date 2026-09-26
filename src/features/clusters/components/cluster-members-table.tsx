"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { Trash2, Eye, ArrowUpDown, Search } from "lucide-react";
import { Table, THead, TBody, TR, TH, TD } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/cn";
import type { ClusterMemberProgress } from "@/features/clusters/types";

type Props = {
  data: ClusterMemberProgress[];
  totalTasks: number;
  onViewDetail: (maba: ClusterMemberProgress) => void;
  onRemoveMember?: (userId: string) => void;
};

type ProgressFilter = "all" | "done" | "pending";

const FILTER_TABS: { value: ProgressFilter; label: string }[] = [
  { value: "all", label: "Semua" },
  { value: "done", label: "Lengkap" },
  { value: "pending", label: "Belum" },
];

function genderLabel(gender: string | null): "L" | "P" | null {
  const n = gender?.trim().toUpperCase();
  if (n === "P" || n === "PEREMPUAN") return "P";
  if (n === "L" || n === "LAKI_LAKI") return "L";
  return null;
}

export default function ClusterMembersTable({ data, totalTasks, onViewDetail, onRemoveMember }: Props) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<ProgressFilter>("all");

  const filteredData = useMemo(() => {
    const q = search.trim().toLowerCase();
    return data.filter((m) => {
      if (q) {
        const haystack = [m.name, m.username ?? "", m.nim ?? ""].join(" ").toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      if (filter === "done") {
        return totalTasks > 0 && m.doneCount === totalTasks;
      }
      if (filter === "pending") {
        return totalTasks === 0 || m.doneCount < totalTasks;
      }
      return true;
    });
  }, [data, search, filter, totalTasks]);

  const columns: ColumnDef<ClusterMemberProgress>[] = [
    {
      id: "index",
      header: "No",
      cell: ({ row }) => <span className="text-muted-text">{row.index + 1}</span>,
    },
    {
      accessorKey: "name",
      header: "Nama MABA",
      enableSorting: true,
      cell: ({ row }) => (
        <div>
          <div className="font-medium text-soft-white">{row.original.name}</div>
          <div className="text-xs text-muted-text">{row.original.username ?? "—"}</div>
        </div>
      ),
    },
    {
      accessorKey: "nim",
      header: "NIM",
      enableSorting: true,
      cell: ({ getValue }) => getValue<string | null>() ?? "—",
    },
    {
      accessorKey: "gender",
      header: "Gender",
      enableSorting: true,
      cell: ({ getValue }) => {
        const gender = genderLabel(getValue<string | null>());
        return gender ? (
          <span
            className={cn(
              "inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold",
              gender === "P" ? "bg-pink-500/20 text-pink-400" : "bg-blue-500/20 text-blue-400",
            )}
          >
            {gender}
          </span>
        ) : (
          <span className="text-muted-text">—</span>
        );
      },
    },
    {
      id: "progress",
      header: "Progress Tugas",
      cell: ({ row }) => {
        const m = row.original;
        const percent = totalTasks > 0 ? Math.round((m.doneCount / totalTasks) * 100) : 0;
        return (
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-soft-white">{percent}%</span>
              <span className="text-muted-text">
                {m.doneCount}/{totalTasks}
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className={cn(
                  "h-full rounded-full transition-all",
                  percent === 100 ? "bg-emerald-500" : "bg-electric-blue",
                )}
                style={{ width: `${percent}%` }}
              />
            </div>
            {m.pendingCount > 0 && (
              <p className="text-[10px] text-amber-400 mt-0.5">
                {m.pendingCount} tugas pending
              </p>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "mabaScore",
      header: "Nilai",
      enableSorting: true,
      cell: ({ getValue }) => {
        const value = getValue<number | null | undefined>();
        return value != null ? (
          <span className="font-semibold text-soft-white">{value}</span>
        ) : (
          <span className="text-muted-text">—</span>
        );
      },
    },
    {
      id: "actions",
      header: "Aksi",
      cell: ({ row }) => (
        <div className="flex gap-1 justify-end">
          <button
            onClick={() => onViewDetail(row.original)}
            className="p-2 text-muted-text hover:bg-electric-blue/10 hover:text-electric-blue rounded-lg transition-colors"
            title="Lihat Detail"
          >
            <Eye size={16} />
          </button>
          {onRemoveMember && (
            <button
              onClick={() => onRemoveMember(row.original.id)}
              className="p-2 text-muted-text hover:bg-red-500/10 hover:text-red-400 rounded-lg transition-colors"
              title="Keluarkan dari cluster"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div>
      <div className="flex flex-col gap-3 border-b border-white/10 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full items-center gap-2 sm:max-w-xs">
          <Search size={16} className="shrink-0 text-muted-text" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama / username / NIM..."
          />
        </div>
        <div className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 p-1">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                filter === tab.value
                  ? "bg-sun-gold font-semibold text-black shadow-md shadow-sun-gold/30"
                  : "text-muted-text hover:text-soft-white",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <Table>
        <THead>
          {table.getHeaderGroups().map((hg) => (
            <TR key={hg.id}>
              {hg.headers.map((header) => (
                <TH
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  className={cn(header.column.getCanSort() && "cursor-pointer select-none")}
                >
                  <div className="flex items-center gap-1">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {header.column.getCanSort() && (
                      <ArrowUpDown size={12} className="text-muted-text" />
                    )}
                  </div>
                </TH>
              ))}
            </TR>
          ))}
        </THead>
        <TBody>
          {table.getRowModel().rows.map((row) => (
            <TR key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TD key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TD>
              ))}
            </TR>
          ))}
          {filteredData.length === 0 && (
            <TR>
              <TD colSpan={columns.length} className="py-10 text-center text-sm text-muted-text">
                {data.length === 0
                  ? "Belum ada anggota di cluster ini"
                  : "Tidak ada anggota yang cocok dengan pencarian/filter"}
              </TD>
            </TR>
          )}
        </TBody>
      </Table>
    </div>
  );
}
