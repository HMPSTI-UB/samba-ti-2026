"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, Pencil, Trash2, ArrowUpDown, ListChecks } from "lucide-react";
import { Table, THead, TBody, TR, TH, TD } from "@/components/ui/table";
import { cn } from "@/lib/cn";
import type { Task } from "@/features/penugasan/types";

type Props = {
  data: Task[];
  onDelete?: (task: Task) => void;
};

export default function TaskTable({ data, onDelete }: Props) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const router = useRouter();

  const columns: ColumnDef<Task>[] = [
    {
      accessorKey: "title",
      header: "Judul",
      enableSorting: true,
      cell: ({ getValue }) => (
        <span className="font-medium text-soft-white">{getValue<string>()}</span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      enableSorting: true,
      cell: ({ getValue }) => {
        const s = getValue<string>();
        return (
          <span
            className={cn(
              "inline-block rounded-full px-2.5 py-0.5 text-xs font-medium",
              s === "PUBLISHED" ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"
            )}
          >
            {s}
          </span>
        );
      },
    },
    {
      id: "fields",
      header: "Jumlah Field",
      cell: ({ row }) => (
        <span className="text-muted-text">{row.original.formFields.length} field</span>
      ),
    },
    {
      accessorKey: "deadline",
      header: "Deadline",
      enableSorting: true,
      cell: ({ getValue }) => {
        const val = getValue<string>();
        return (
          <span className="text-sm text-muted-text">
            {new Date(val).toLocaleString("id-ID", {
              day: "numeric",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        );
      },
    },
    {
      id: "actions",
      header: "Aksi",
      cell: ({ row }) => (
        <div className="flex gap-1 justify-end">
          <button
            onClick={() => router.push(`/dashboard/tugas/${row.original.id}`)}
            className="p-2 text-muted-text hover:bg-emerald-500/10 hover:text-emerald-400 rounded-lg transition-colors"
            title="Lihat Detail / Submissions"
          >
            <Eye size={16} />
          </button>
          <button
            onClick={() => router.push(`/dashboard/tugas/${row.original.id}/edit`)}
            className="p-2 text-muted-text hover:bg-electric-blue/10 hover:text-electric-blue rounded-lg transition-colors"
            title="Edit Tugas"
          >
            <Pencil size={16} />
          </button>
          {onDelete && (
            <button
              onClick={() => onDelete(row.original)}
              className="p-2 text-muted-text hover:bg-red-500/10 hover:text-red-400 rounded-lg transition-colors"
              title="Hapus Tugas"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

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
        {table.getHeaderGroups().map((hg) => (
          <TR key={hg.id}>
            {hg.headers.map((header) => (
              <TH
                key={header.id}
                onClick={header.column.getToggleSortingHandler()}
                className={cn(header.column.getCanSort() && "cursor-pointer select-none", header.id === "actions" && "w-32 text-right")}
              >
                <div className={cn("flex items-center gap-1", header.id === "actions" && "justify-end")}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {header.column.getCanSort() && <ArrowUpDown size={12} className="text-muted-text" />}
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
        {data.length === 0 && (
          <TR>
            <TD colSpan={columns.length} className="py-10 text-center text-sm text-muted-text">
              Tidak ada data tugas
            </TD>
          </TR>
        )}
      </TBody>
    </Table>
  );
}

