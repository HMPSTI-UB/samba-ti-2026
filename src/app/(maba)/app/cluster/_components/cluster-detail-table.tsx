"use client";

import {
flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
  getSortedRowModel,
  getFilteredRowModel,
  type ColumnFiltersState,
} from "@tanstack/react-table";
import { useState } from "react";
import { ArrowUpDown, Search } from "lucide-react";
import { Table, THead, TBody, TR, TH, TD } from "@/components/ui/table";
import { cn } from "@/lib/cn";
import type { ClusterMemberDetail } from "@/features/maba/api/cluster";

type Props = {
  data: ClusterMemberDetail[];
  totalTasks: number;
};

export default function ClusterDetailTable({ data, totalTasks }: Props) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const columns: ColumnDef<ClusterMemberDetail>[] = [
    {
      id: "index",
      header: "No",
      cell: ({ row }) => <span className="text-muted-text">{row.index + 1}</span>,
    },
    {
      accessorKey: "name",
      header: "Nama Mahasiswa",
      enableSorting: true,
      cell: ({ row }) => <span className="font-medium text-soft-white">{row.original.name}</span>,
    },
    {
      accessorKey: "nim",
      header: "NIM",
      enableSorting: true,
      cell: ({ getValue }) => (
        <span className="text-muted-text">{getValue<string | null>() ?? "—"}</span>
      ),
    },
    {
      id: "progress",
      header: "Progres Tugas",
      cell: ({ row }) => {
        const m = row.original;
        const percent = totalTasks > 0 ? Math.round((m.doneCount / totalTasks) * 100) : 0;
        return (
          <div className="flex flex-col gap-1.5 min-w-[140px]">
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
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnFilters },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="rounded-2xl border border-white bg-background/30 overflow-hidden flex flex-col">
      <div className="p-4 sm:p-6 border-b border-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-lg font-black tracking-widest text-white uppercase">Teman Se-Cluster</h2>

        <div className="relative w-full sm:max-w-xs">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-muted-text" />
          </div>
          <input
            type="text"
            placeholder="Cari nama..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
            className="block w-full pl-9 pr-3 py-2 border border-white/20 rounded-lg text-sm bg-black/20 text-white placeholder-muted-text focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-colors"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
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
            {table.getRowModel().rows.length === 0 && (
              <TR>
                <TD colSpan={columns.length} className="py-10 text-center text-sm text-muted-text">
                  Pencarian tidak ditemukan atau belum ada anggota.
                </TD>
              </TR>
            )}
          </TBody>
        </Table>
      </div>
    </div>
  );
}