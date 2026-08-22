"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getClusters,
  getCluster,
  getClusterDetail,
  getMyCluster,
  createCluster,
  updateCluster,
  updateClusterWhatsappLink,
  deleteCluster,
  assignSpv,
  getClusterMembers,
  addClusterMembers,
  removeClusterMember,
  getAvailableSpvs,
  getAvailableMabas,
} from "@/features/clusters/api/clusters";
import type { ClusterFormValues } from "@/features/clusters/types";

export function useClusters() {
  return useQuery({
    queryKey: ["clusters"],
    queryFn: getClusters,
  });
}

export function useCluster(id: string) {
  return useQuery({
    queryKey: ["clusters", id],
    queryFn: () => getCluster(id),
    enabled: !!id,
  });
}

export function useClusterDetail(id: string) {
  return useQuery({
    queryKey: ["clusters", id, "detail"],
    queryFn: () => getClusterDetail(id),
    enabled: !!id,
  });
}

export function useMyCluster() {
  return useQuery({
    queryKey: ["clusters", "my"],
    queryFn: getMyCluster,
  });
}

export function useCreateCluster() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: ClusterFormValues) => createCluster(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["clusters"] });
      qc.invalidateQueries({ queryKey: ["audit-logs"] });
    },
  });
}

export function useUpdateCluster() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<ClusterFormValues> }) =>
      updateCluster(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["clusters"] });
      qc.invalidateQueries({ queryKey: ["audit-logs"] });
    },
  });
}

export function useUpdateWhatsappLink() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ clusterId, whatsappGroupLink }: { clusterId: string; whatsappGroupLink: string | null }) =>
      updateClusterWhatsappLink(clusterId, whatsappGroupLink),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["clusters"] });
      qc.invalidateQueries({ queryKey: ["audit-logs"] });
    },
  });
}

export function useDeleteCluster() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteCluster,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["clusters"] });
      qc.invalidateQueries({ queryKey: ["audit-logs"] });
    },
  });
}

export function useAssignSpv() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ clusterId, spvId }: { clusterId: string; spvId: string }) =>
      assignSpv(clusterId, spvId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["clusters"] });
      qc.invalidateQueries({ queryKey: ["audit-logs"] });
    },
  });
}

export function useClusterMembers(clusterId: string) {
  return useQuery({
    queryKey: ["clusters", clusterId, "members"],
    queryFn: () => getClusterMembers(clusterId),
    enabled: !!clusterId,
  });
}

export function useAddClusterMembers() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ clusterId, userIds }: { clusterId: string; userIds: string[] }) =>
      addClusterMembers(clusterId, userIds),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["clusters"] });
      qc.invalidateQueries({ queryKey: ["audit-logs"] });
    },
  });
}

export function useRemoveClusterMember() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ clusterId, userId }: { clusterId: string; userId: string }) =>
      removeClusterMember(clusterId, userId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["clusters"] });
      qc.invalidateQueries({ queryKey: ["audit-logs"] });
    },
  });
}

export function useAvailableSpvs() {
  return useQuery({
    queryKey: ["users", "spvs"],
    queryFn: getAvailableSpvs,
  });
}

export function useAvailableMabas(params: { search?: string; page?: number; limit?: number }) {
  return useQuery({
    queryKey: ["users", "mabas", params],
    queryFn: () => getAvailableMabas(params),
  });
}
