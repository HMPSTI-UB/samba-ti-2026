"use client";

import { useParams } from "next/navigation";
import { useUserStore } from "@/stores/user.store";
import ClusterDetailView from "@/features/clusters/components/cluster-detail-view";

export default function ClusterDetailPage() {
  const params = useParams<{ id: string }>();
  const user = useUserStore((s) => s.user);
  const role = user?.role?.toUpperCase();
  const canManage = role === "ADMIN" || role === "KADERISASI";

  return <ClusterDetailView clusterId={params.id} canManage={canManage} />;
}
