"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { importMaba, type ImportMabaRow } from "@/features/clusters/api/import";

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
    },
  });
}
