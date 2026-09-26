"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getSettings, updateSettings } from "@/features/settings/api/settings";
import type { UpdateSettingsInput } from "@/features/settings/types";

export function useSettings(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
    enabled: options?.enabled,
  });
}

export function useUpdateSettings() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateSettingsInput) => updateSettings(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["settings"] });
      qc.invalidateQueries({ queryKey: ["audit-logs"] });
    },
  });
}
