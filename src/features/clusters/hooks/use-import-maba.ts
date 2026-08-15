"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { importMaba, type ImportMabaRow } from "@/features/clusters/api/import";
import { getMabaSeedData } from "@/features/maba/api/maba";

type ImportPayload = ImportMabaRow[] | { rows: ImportMabaRow[]; seed?: boolean };

export function useImportMaba() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: ImportPayload) => {
      if (Array.isArray(payload)) return importMaba(payload);
      return importMaba(payload.rows, { seed: payload.seed ?? false });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["clusters"] });
      qc.invalidateQueries({ queryKey: ["users"] });
      qc.invalidateQueries({ queryKey: ["maba", "seed"] });
    },
  });
}

export function useExistingNims(enabled = true) {
  const { data, isLoading } = useQuery({
    queryKey: ["maba", "seed"],
    queryFn: () => getMabaSeedData(),
    enabled,
    staleTime: 60 * 1000,
  });

  const existingNims = new Set(
    (data?.data ?? [])
      .map((m) => m.nim)
      .filter((n): n is string => !!n),
  );

  return { existingNims, isLoading };
}
