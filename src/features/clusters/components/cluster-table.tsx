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
import { ArrowUpDown, Pencil, Trash2, Users, Shield, Link } from "lucide-react";
import type { Cluster } from "@/features/clusters/types";

type Props = {
  data: Cluster[];
  onEdit: (cluster: Cluster) => void;
  onDelete: (cluster: Cluster) => void;
  onAssignSpv: (cluster: Cluster) => void;
  onManageMembers: (cluster: Cluster) => void;
};

export default function ClusterTable({ data, onEdit, onDelete, onAssignSpv, onManageMembers }: Props) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns: ColumnDef<Cluster>[] = [
    {
      accessorKey: "name",
      header: "Nama Cluster",
      enableSorting: true,
      cell: ({ getValue, row }) => (
        <div>
          <span className="font-medium text-slate-900">{getValue<string>()}</span>
          <span className="ml-2 text-xs text-slate-400">({row.original.slug})</span>
        </div>
      ),
    },
    {
      accessorKey: "spvName",
      header: "SPV",
      enableSorting: true,
      cell: ({ getValue }) => (
        <div className="flex items-center gap-1.5">
          <Shield size={14} className="text-slate-400" />
          <span className="text-sm">{getValue<string | null>() ?? "—"}</span>
        </div>
      ),
    },
    {
      accessorKey: "memberCount",
      header: "Anggota",
      enableSorting: true,
      cell: ({ getValue }) => (
        <div className="flex items-center gap-1.5">
          <Users size={14} className="text-slate-400" />
          <span className="text-sm font-medium">{getValue<number>()}</span>
        </div>
      ),
    },
    {
      accessorKey: "whatsappGroupLink",
      header: "Grup WA",
      cell: ({ getValue }) => {
        const link = getValue<string | null>();
        return link ? (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-electric-blue hover:underline"
          >
            <Link size={14} />
            Buka Grup
          </a>
        ) : (
          <span className="text-sm text-slate-400">—</span>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Dibuat",
      enableSorting: true,
      cell: ({ getValue }) => (
        <span className="text-sm text-slate-500">
          {new Date(getValue<string>()).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </span>
      ),
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <div className="flex justify-end gap-1">
          <button
            onClick={() => onManageMembers(row.original)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
            title="Atur Anggota"
          >
            <Users size={13} />
          </button>
          <button
            onClick={() => onAssignSpv(row.original)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-cosmic-purple bg-cosmic-purple/10 hover:bg-cosmic-purple/20 transition-colors"
            title="Assign SPV"
          >
            <Shield size={13} />
          </button>
          <button
            onClick={() => onEdit(row.original)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-electric-blue bg-electric-blue/10 hover:bg-electric-blue/20 transition-colors"
            title="Edit"
          >
            <Pencil size={13} />
          </button>
          <button
            onClick={() => onDelete(row.original)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
            title="Hapus"
          >
            <Trash2 size={13} />
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
              Belum ada cluster
            </TD>
          </TR>
        )}
      </TBody>
    </Table>
  );
}
