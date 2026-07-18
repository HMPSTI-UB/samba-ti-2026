import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

type PaginationProps = {
  page: number;
  totalPages: number;
  total: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({ page, totalPages, total, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  function getPages(): (number | "...")[] {
    const pages: (number | "...")[] = [];
    const delta = 1;
    const left = Math.max(2, page - delta);
    const right = Math.min(totalPages - 1, page + delta);

    pages.push(1);
    if (left > 2) pages.push("...");
    for (let i = left; i <= right; i++) pages.push(i);
    if (right < totalPages - 1) pages.push("...");
    if (totalPages > 1) pages.push(totalPages);

    return pages;
  }

  return (
    <div className="flex items-center justify-between px-2 py-4">
      <p className="text-sm text-slate-500">
        {total === 0 ? "Tidak ada data" : `${total} total`}
      </p>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className={cn(
            "inline-flex h-8 w-8 items-center justify-center rounded-md text-sm transition-colors",
            page <= 1
              ? "text-slate-300 cursor-not-allowed"
              : "text-slate-600 hover:bg-slate-100",
          )}
        >
          <ChevronLeft size={16} />
        </button>
        {getPages().map((p, i) =>
          p === "..." ? (
            <span key={`ellipsis-${i}`} className="px-2 text-sm text-slate-400">
              ...
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={cn(
                "inline-flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium transition-colors",
                p === page
                  ? "bg-cosmic-purple/10 text-cosmic-purple"
                  : "text-slate-600 hover:bg-slate-100",
              )}
            >
              {p}
            </button>
          ),
        )}
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className={cn(
            "inline-flex h-8 w-8 items-center justify-center rounded-md text-sm transition-colors",
            page >= totalPages
              ? "text-slate-300 cursor-not-allowed"
              : "text-slate-600 hover:bg-slate-100",
          )}
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
