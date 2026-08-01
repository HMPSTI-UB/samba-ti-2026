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
import { ArrowUpDown, Pencil, Trash2 } from "lucide-react";
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
          <span className={cn("inline-block rounded-full px-2.5 py-0.5 text-xs font-medium", colors[role] ?? "bg-white/10 text-muted-text")}>
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
            active ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400",
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
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-cosmic-purple bg-cosmic-purple/10 hover:bg-cosmic-purple/20 hover:text-electric-blue transition-colors"
          >
            <Pencil size={14} />
            Edit
          </button>
          <button
            onClick={() => onDelete(row.original)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-red-400 bg-red-500/10 hover:bg-red-500/20 hover:text-red-300 transition-colors"
          >
            <Trash2 size={14} />
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
        {data.length === 0 && (
          <TR>
            <TD colSpan={columns.length} className="text-center text-muted-text py-10">
              Tidak ada user ditemukan
            </TD>
          </TR>
        )}
      </TBody>
    </Table>
  );
}
