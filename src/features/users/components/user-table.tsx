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
import { Table, THead, TBody, TR, TH, TD } from "@/components/ui/table";
import { cn } from "@/lib/cn";
import { ArrowUpDown } from "lucide-react";
import type { SafeUser } from "@/features/users/api/users";

type Props = {
  data: SafeUser[];
  onEdit: (user: SafeUser) => void;
  onDelete: (user: SafeUser) => void;
};

export default function UserTable({ data, onEdit, onDelete }: Props) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns: ColumnDef<SafeUser>[] = [
    {
      accessorKey: "name",
      header: "Nama",
      enableSorting: true,
    },
    {
      accessorKey: "email",
      header: "Email",
      enableSorting: true,
    },
    {
      accessorKey: "nim",
      header: "NIM",
      enableSorting: true,
      cell: ({ getValue }) => getValue<string | null>() ?? "—",
    },
    {
      accessorKey: "role",
      header: "Role",
      enableSorting: true,
      cell: ({ getValue }) => {
        const role = getValue<string>();
        const colors: Record<string, string> = {
          ADMIN: "bg-cosmic-purple/10 text-cosmic-purple",
          KADERISASI: "bg-electric-blue/10 text-electric-blue",
          SPV: "bg-supernova-orange/10 text-supernova-orange",
          MABA: "bg-star-gold/10 text-star-gold",
        };
        return (
          <span className={cn("inline-block rounded-full px-2.5 py-0.5 text-xs font-medium", colors[role] ?? "bg-slate-100 text-slate-600")}>
            {role}
          </span>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      enableSorting: true,
      cell: ({ getValue }) => {
        const active = getValue<boolean>();
        return (
          <span className={cn(
            "inline-block rounded-full px-2.5 py-0.5 text-xs font-medium",
            active ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700",
          )}>
            {active ? "Aktif" : "Nonaktif"}
          </span>
        );
      },
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <div className="flex justify-end gap-2">
          <button
            onClick={() => onEdit(row.original)}
            className="text-xs text-slate-500 hover:text-cosmic-purple transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(row.original)}
            className="text-xs text-slate-500 hover:text-destructive transition-colors"
          >
            Hapus
          </button>
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

  return (
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
                    <ArrowUpDown size={12} className="text-slate-400" />
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
        {data.length === 0 && (
          <TR>
            <TD colSpan={columns.length} className="text-center text-slate-400 py-10">
              Tidak ada user ditemukan
            </TD>
          </TR>
        )}
      </TBody>
    </Table>
  );
}
