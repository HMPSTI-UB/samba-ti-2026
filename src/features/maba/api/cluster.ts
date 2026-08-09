import { clientApi } from "@/lib/api/client";
import { useQuery } from "@tanstack/react-query";

export type ClusterMemberDetail = {
  id: string;
  name: string;
  nim: string | null;
  doneCount: number;
  pendingCount: number;
};

export type ClusterDetail = {
  cluster: {
    id: string;
    name: string;
    slug: string;
    clusterNumber: number | null;
    clusterMeaning: string | null;
    spvName: string | null;
    spvAvatarUrl: string | null;
    whatsappGroupLink: string | null;
  };
  totalTasks: number;
  members: ClusterMemberDetail[];
};

export function getClusterDetail(id: string) {
  return clientApi.get<ClusterDetail>(`/clusters/${id}/detail`);
}

export function useClusterDetail(id: string | undefined) {
  return useQuery({
    queryKey: ["cluster-detail", id],
    queryFn: () => getClusterDetail(id!),
    enabled: !!id,
  });
}
