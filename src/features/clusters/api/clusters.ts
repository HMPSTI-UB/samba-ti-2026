import { clientApi } from "@/lib/api/client";
import type { Cluster, ClusterMember, ClusterFormValues, ClusterDetail } from "@/features/clusters/types";

export function getClusters() {
  return clientApi.get<Cluster[]>("/clusters");
}

export function getCluster(id: string) {
  return clientApi.get<Cluster>(`/clusters/${id}`);
}

export function getClusterDetail(id: string) {
  return clientApi.get<ClusterDetail>(`/clusters/${id}/detail`);
}

export function getMyCluster() {
  return clientApi.get<Cluster>("/spv/cluster");
}

export function createCluster(data: ClusterFormValues) {
  return clientApi.post<Cluster>("/clusters", data);
}

export function updateCluster(id: string, data: Partial<ClusterFormValues>) {
  return clientApi.patch<Cluster>(`/clusters/${id}`, data);
}

export function updateClusterWhatsappLink(clusterId: string, whatsappGroupLink: string | null) {
  return clientApi.patch<Cluster>(`/clusters/${clusterId}/whatsapp-link`, { whatsappGroupLink });
}

export function deleteCluster(id: string) {
  return clientApi.delete<{ message: string }>(`/clusters/${id}`);
}

export function assignSpv(clusterId: string, spvId: string) {
  return clientApi.post<Cluster>(`/clusters/${clusterId}/assign-spv`, { spvId });
}

export function getClusterMembers(clusterId: string) {
  return clientApi.get<ClusterMember[]>(`/clusters/${clusterId}/members`);
}

export function addClusterMembers(clusterId: string, userIds: string[]) {
  return clientApi.post<{ message: string }>(`/clusters/${clusterId}/members`, { userIds });
}

export function removeClusterMember(clusterId: string, userId: string) {
  return clientApi.delete<{ message: string }>(`/clusters/${clusterId}/members/${userId}`);
}

export function getAvailableSpvs() {
  return clientApi.get<{ data: { id: string; name: string; email: string }[] }>("/users?role=SPV&limit=100");
}

export function getAvailableMabas(params: { search?: string; page?: number; limit?: number }) {
  const searchParams = new URLSearchParams();
  if (params.search) searchParams.set("search", params.search);
  searchParams.set("role", "MABA");
  searchParams.set("unassigned", "true");
  searchParams.set("page", String(params.page ?? 1));
  searchParams.set("limit", String(params.limit ?? 50));

  return clientApi.get<{ data: { id: string; name: string; email: string; nim: string | null; clusterId: string | null }[]; total: number }>(`/users?${searchParams.toString()}`);
}

export type MabaSearchResult = {
  data: { id: string; name: string; nim: string | null; email: string; username: string | null; clusterId: string | null }[];
  total: number;
};

export function searchMabas(params: { search: string; limit?: number }): Promise<MabaSearchResult> {
  const searchParams = new URLSearchParams();
  searchParams.set("search", params.search);
  searchParams.set("role", "MABA");
  searchParams.set("page", "1");
  searchParams.set("limit", String(params.limit ?? 8));

  return clientApi.get(`/users?${searchParams.toString()}`) as unknown as Promise<MabaSearchResult>;
}
