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
import { Pencil, Trash2, Eye, ArrowUpDown } from "lucide-react";
import { Table, THead, TBody, TR, TH, TD } from "@/components/ui/table";
import { cn } from "@/lib/cn";
import type { SafeUser } from "@/features/users/api/users";

type Props = {
  data: SafeUser[];
  page: number;
  limit: number;
  clusterNameById: Record<string, string>;
  onEdit: (maba: SafeUser) => void;
  onDelete: (maba: SafeUser) => void;
  onViewDetail: (maba: SafeUser) => void;
};

function genderLabel(gender: string | null): "L" | "P" | null {
  const n = gender?.trim().toUpperCase();
  if (n === "P" || n === "PEREMPUAN") return "P";
  if (n === "L" || n === "LAKI_LAKI") return "L";
  return null;
}

export default function MabaTable({
  data,
  page,
  limit,
  clusterNameById,
  onEdit,
  onDelete,
  onViewDetail,
}: Props) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns: ColumnDef<SafeUser>[] = [
    {
      id: "index",
      header: "No",
      cell: ({ row }) => (
        <span className="text-muted-text">
          {(page - 1) * limit + row.index + 1}
        </span>
      ),
    },
    {
      accessorKey: "name",
      header: "Nama",
      enableSorting: true,
      cell: ({ getValue }) => (
        <span className="font-medium text-soft-white">{getValue<string>()}</span>
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
              "inline-block rounded-full px-2.5 py-0.5 text-xs font-medium",
              gender === "P" ? "bg-pink-500/10 text-pink-400" : "bg-blue-500/10 text-blue-400",
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
      accessorKey: "email",
      header: "Email",
      enableSorting: true,
    },
    {
      accessorKey: "username",
      header: "Username",
      enableSorting: true,
      cell: ({ getValue }) => getValue<string | null>() ?? "—",
    },
    {
      accessorKey: "clusterId",
      header: "Cluster",
      enableSorting: true,
      cell: ({ getValue }) => {
        const cid = getValue<string | null>();
        return cid ? clusterNameById[cid] ?? "—" : "—";
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      enableSorting: true,
      cell: ({ getValue }) => {
        const active = getValue<boolean>();
        return (
          <span
            className={cn(
              "inline-block rounded-full px-2.5 py-0.5 text-xs font-medium",
              active ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400",
            )}
          >
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
            onClick={() => onViewDetail(row.original)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-electric-blue bg-electric-blue/10 hover:bg-electric-blue/20 transition-colors"
          >
            <Eye size={14} />
            Detail
          </button>
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
            <TD colSpan={columns.length} className="py-10 text-center text-sm text-muted-text">
              Tidak ada data MABA
            </TD>
          </TR>
        )}
      </TBody>
    </Table>
  );
}
