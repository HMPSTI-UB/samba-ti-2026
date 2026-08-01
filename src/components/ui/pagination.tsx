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
      <p className="text-sm text-muted-text">
        {total === 0 ? "Tidak ada data" : `${total} total`}
      </p>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className={cn(
            "inline-flex h-8 w-8 items-center justify-center rounded-md text-sm transition-colors",
            page <= 1
              ? "text-white/20 cursor-not-allowed"
              : "text-muted-text hover:bg-white/10 hover:text-soft-white",
          )}
        >
          <ChevronLeft size={16} />
        </button>
        {getPages().map((p, i) =>
          p === "..." ? (
            <span key={`ellipsis-${i}`} className="px-2 text-sm text-muted-text">
              ...
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={cn(
                "inline-flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium transition-colors",
                p === page
                  ? "bg-sun-gold text-black"
                  : "text-muted-text hover:bg-white/10 hover:text-soft-white",
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
              ? "text-white/20 cursor-not-allowed"
              : "text-muted-text hover:bg-white/10 hover:text-soft-white",
          )}
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
