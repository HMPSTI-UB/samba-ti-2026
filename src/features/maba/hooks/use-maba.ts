"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUsers } from "@/features/users/hooks/use-users";
import { createUser, updateUser, deleteUser } from "@/features/users/api/users";
import { getMabaExportData, getMabaSeedData, resetMabaData } from "@/features/maba/api/maba";
import { buildMabaWorkbook, buildMabaSeedCsv } from "@/features/maba/utils/maba-export";

export function useMabaList(filters: { search?: string; clusterId?: string; page: number; limit: number }) {
  return useUsers({ ...filters, role: "MABA" });
}

export function useCreateMaba() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      name: string;
      email: string;
      password?: string;
      nim?: string;
      gender?: "L" | "P";
      username?: string;
    }) => createUser({ ...data, role: "MABA" }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

export function useUpdateMaba() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: { name?: string; email?: string; username?: string; gender?: "L" | "P" | null; status?: boolean; nim?: string };
    }) => updateUser(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

export function useMabaExport() {
  return useMutation({
    mutationFn: async () => {
      const res = await getMabaExportData();
      await buildMabaWorkbook(res.data);
    },
  });
}

export function useMabaSeedExport() {
  return useMutation({
    mutationFn: async () => {
      const res = await getMabaSeedData();
      buildMabaSeedCsv(res.data);
    },
  });
}

export function useDeleteMaba() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

export function useResetMaba() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: resetMabaData,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["users"] });
      qc.invalidateQueries({ queryKey: ["clusters"] });
    },
  });
}
