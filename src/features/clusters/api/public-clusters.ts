import { serverApi } from "@/lib/api/server";
import type { PublicCluster, PublicClusterDetail } from "@/features/clusters/types";

export function getPublicClusters() {
  return serverApi.get<PublicCluster[]>("/public/clusters", {
    next: { revalidate: 60 },
  });
}

export function getPublicCluster(slug: string) {
  return serverApi.get<PublicClusterDetail>(`/public/clusters/${slug}`, {
    next: { revalidate: 60 },
  });
}
