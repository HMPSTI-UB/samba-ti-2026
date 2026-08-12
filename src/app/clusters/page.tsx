import Footer from "@/components/layout/footer";
import StarBackground from "@/components/common/star-background";
import Reveal from "@/components/common/reveal";
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
      <section className="relative overflow-hidden pt-32 md:pt-44 pb-20 md:pb-28">
        <StarBackground />

        <div className="pointer-events-none absolute -top-40 -left-40 z-10 h-100 w-100 rounded-full bg-[#2DD4BF]/15 blur-3xl" />
        <div className="pointer-events-none absolute top-1/4 -right-50 z-10 h-120 w-120 rounded-full bg-[#2DD4BF]/10 blur-3xl" />

        <div className="relative z-20 mx-auto max-w-7xl px-5 md:px-10">
          <Reveal from="bottom">
            <p className="text-center text-xs md:text-sm font-bold uppercase tracking-[0.4em] text-[#2DD4BF]">
              SAMBA TI 2026
            </p>
            <h2 className="mt-4 text-center font-poppins text-4xl sm:text-6xl md:text-7xl font-bold uppercase tracking-wide text-soft-white">
              Cluster
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-center text-sm font-medium text-muted-text md:text-lg">
              12 nama bintang, 12 cerita. Kamu bakal ditaruh di mana?
            </p>
          </Reveal>

          {clusters.length === 0 ? (
            <p className="py-20 text-center text-muted-text">
              Data cluster belum tersedia.
            </p>
          ) : (
            <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {clusters.map((cluster, i) => (
                <Reveal key={cluster.id} from="bottom" delay={(i % 4) * 100}>
                  <ClusterCard cluster={cluster} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}
