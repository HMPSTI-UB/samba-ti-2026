"use client";

import { useRouter } from "next/navigation";
import { Loader2, Users, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMyCluster } from "@/features/clusters/hooks/use-clusters";
import ClusterDetailView from "@/features/clusters/components/cluster-detail-view";

export default function SpvClusterPage() {
  const router = useRouter();
  const { data, isLoading, isError } = useMyCluster();

  if (isLoading) {
    return (
      <div className="flex h-60 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-electric-blue" />
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 py-24 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/5 text-muted-text">
          <Users size={28} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-soft-white">Belum Ada Cluster</h1>
          <p className="mt-2 max-w-md text-sm text-muted-text">
            Anda belum diberi tugas atau cluster tidak ada :( Hubungi tim kaderisasi yah.
          </p>
        </div>
        <Button variant="outline" onClick={() => router.push("/dashboard")}>
          <ArrowLeft size={16} /> Kembali ke Dashboard
        </Button>
      </div>
    );
  }

  return <ClusterDetailView clusterId={data.data.id} canManage={false} showBack={false} />;
}
