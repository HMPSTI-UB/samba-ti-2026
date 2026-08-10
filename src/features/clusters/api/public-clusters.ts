import { serverApi } from "@/lib/api/server";
import type { PublicCluster } from "@/features/clusters/types";

export function getPublicClusters() {
  return serverApi.get<PublicCluster[]>("/public/clusters", {
    next: { revalidate: 60 },
  });
}
