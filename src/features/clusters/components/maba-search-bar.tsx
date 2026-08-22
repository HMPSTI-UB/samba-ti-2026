"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Search, X, Loader2, Users } from "lucide-react";
import { cn } from "@/lib/cn";

export type MabaSearchItem = {
  id: string;
  name: string;
  nim: string | null;
  clusterLabel: string | null;
  href: string | null;
};

type Props = {
  searchFn: (q: string) => Promise<MabaSearchItem[]>;
  placeholder?: string;
};

export default function MabaSearchBar({ searchFn, placeholder = "Cari nama / NIM MABA..." }: Props) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [debounced, setDebounced] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(search), 300);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => {
    if (!open) return;
    function handlePointerDown(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const { data: results, isLoading } = useQuery({
    queryKey: ["maba-search", debounced.trim()],
    queryFn: () => searchFn(debounced),
    enabled: debounced.trim().length > 0,
  });

  function handleNavigate(href: string | null) {
    setOpen(false);
    setSearch("");
    setDebounced("");
    if (href) router.push(href);
  }

  const showDropdown = open && debounced.trim().length > 0;

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-text" />
        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          className="flex h-11 w-full rounded-xl border border-white/10 bg-card-bg px-3 py-2 pl-10 pr-9 text-sm text-soft-white placeholder:text-muted-text focus:outline-none focus:ring-2 focus:ring-electric-blue/30 focus:border-electric-blue/50"
        />
        {search && (
          <button
            onClick={() => {
              setSearch("");
              setDebounced("");
              setOpen(false);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-text hover:text-soft-white"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {showDropdown && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-white/10 bg-midnight-navy shadow-2xl shadow-black/50">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 size={18} className="animate-spin text-muted-text" />
            </div>
          ) : !results || results.length === 0 ? (
            <p className="px-4 py-6 text-center text-sm text-muted-text">Tidak ditemukan</p>
          ) : (
            <ul className="max-h-80 overflow-y-auto divide-y divide-white/5">
              {results.map((m) => {
                const clickable = !!m.href;
                return (
                  <li key={m.id}>
                    <button
                      type="button"
                      disabled={!clickable}
                      onClick={() => handleNavigate(m.href)}
                      className={cn(
                        "flex w-full items-center gap-3 px-4 py-3 text-left transition-colors",
                        clickable ? "hover:bg-white/5" : "cursor-default opacity-70",
                      )}
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cosmic-purple/20">
                        <Users size={16} className="text-electric-blue" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-soft-white">{m.name}</p>
                        <p className="truncate text-xs text-muted-text">{m.nim ?? "—"}</p>
                      </div>
                      {m.clusterLabel ? (
                        <span className="shrink-0 rounded-full bg-electric-blue/10 px-2.5 py-1 text-xs font-medium text-electric-blue">
                          {m.clusterLabel}
                        </span>
                      ) : (
                        <span className="shrink-0 rounded-full bg-white/10 px-2.5 py-1 text-xs text-muted-text">
                          Tanpa cluster
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}