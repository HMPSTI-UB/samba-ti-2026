"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { importMaba } from "@/features/clusters/api/import";

export function useImportMaba() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (file: File) => importMaba(file),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["clusters"] });
    },
  });
}
