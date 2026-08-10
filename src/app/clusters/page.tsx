import Image from "next/image";
import Footer from "@/components/layout/footer";
import { getPublicClusters } from "@/features/clusters/api/public-clusters";
import type { PublicCluster } from "@/features/clusters/types";
import ClusterCard from "./_components/cluster-card";

export const metadata = {
  title: "Cluster — SAMBA TI 2026",
  description: "Kenali 12 cluster bintang SAMBA TI 2026 beserta maknanya.",
};

export default async function ClustersPage() {
  let clusters: PublicCluster[] = [];
  try {
    const res = await getPublicClusters();
    clusters = res.data ?? [];
  } catch {
    clusters = [];
  }

  return (
    <main className="bg-deep-space font-poppins text-soft-white">
      <section className="relative overflow-hidden bg-[#2D160E] pb-28 pt-32 md:pb-40 md:pt-44">
        <div className="absolute -top-50 left-0 right-0 z-0 h-50 bg-linear-to-t from-[#2D160E] from-20% to-transparent" />

        <div className="pointer-events-none absolute -left-40 top-16 z-20 opacity-40 md:top-24 md:opacity-100">
          <div className="scale-50 md:scale-100">
            <Image
              src="/assets/hero/left-cloud-sm.png"
              width={630}
              height={209}
              alt=""
            />
          </div>
        </div>
        <div className="pointer-events-none absolute -right-45 -top-5 z-20 opacity-40 md:top-10 md:opacity-100">
          <div className="scale-50 md:scale-100">
            <Image
              src="/assets/hero/right-cloud-sm.png"
              width={630}
              height={209}
              alt=""
            />
          </div>
        </div>

        <div className="absolute left-1/2 top-30 z-10 h-50 w-[1200px] -translate-x-1/2 rounded-[110%] bg-[#2D160E] md:top-70 md:w-[2000px]" />

        <div className="relative z-50 mx-auto max-w-7xl px-5 md:px-10">
          <h2 className="text-center text-4xl font-sonsie italic text-[#B95C00] md:text-[70px]">
            CLUSTER
          </h2>
          <p className="mt-6 text-center text-sm font-medium text-white/80 md:text-lg">
            Kenali 12 kelompok bintang SAMBA TI 2026 beserta maknanya.
          </p>

          {clusters.length === 0 ? (
            <p className="py-20 text-center text-muted-text">
              Data cluster belum tersedia.
            </p>
          ) : (
            <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {clusters.map((cluster) => (
                <ClusterCard key={cluster.id} cluster={cluster} />
              ))}
            </div>
          )}
        </div>

        <div className="absolute bottom-0 left-1/2 z-20 h-100 w-[700px] -translate-x-1/2 rounded-[300%] bg-[#2D160E] md:w-[1500px]" />
        <div className="absolute bottom-0 left-1/2 z-10 h-50 w-[700px] -translate-x-1/2 rounded-[300%] bg-linear-to-b from-[#EFA15B] from-70% to-transparent blur-3xl md:w-[1700px]" />
      </section>
      <Footer />
    </main>
  );
}
