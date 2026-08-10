import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/components/layout/footer";
import { getPublicCluster } from "@/features/clusters/api/public-clusters";
import MemberList from "./_components/member-list";

type Props = {
  params: Promise<{ slug: string }>;
};

export const metadata: Metadata = {
  title: "Detail Cluster — SAMBA TI 2026",
  description: "Lihat daftar anggota cluster SAMBA TI 2026.",
};

export default async function ClusterDetailPage({ params }: Props) {
  const { slug } = await params;

  let detail;
  try {
    const res = await getPublicCluster(slug);
    detail = res.data;
  } catch {
    notFound();
  }

  const { cluster, members } = detail!;

  return (
    <main className="bg-deep-space font-poppins text-soft-white">
      <section className="relative overflow-hidden bg-[#2D160E] pb-28 pt-32 md:pb-40 md:pt-44">
        <div className="absolute -top-50 left-0 right-0 z-0 h-50 bg-linear-to-t from-[#2D160E] from-20% to-transparent" />

        <div className="pointer-events-none absolute -left-40 top-16 z-20 opacity-40 md:top-24 md:opacity-100">
          <div className="scale-50 md:scale-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/hero/left-cloud-sm.png"
              width={630}
              height={209}
              alt=""
            />
          </div>
        </div>
        <div className="pointer-events-none absolute -right-45 -top-5 z-20 opacity-40 md:top-10 md:opacity-100">
          <div className="scale-50 md:scale-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/hero/right-cloud-sm.png"
              width={630}
              height={209}
              alt=""
            />
          </div>
        </div>

        <div className="absolute left-1/2 top-30 z-10 h-50 w-[1200px] -translate-x-1/2 rounded-[110%] bg-[#2D160E] md:top-70 md:w-[2000px]" />

        <div className="relative z-50 mx-auto max-w-7xl px-5 md:px-10">
          <div className="text-center">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-[#B95C00]/30 bg-[#B95C00]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#EFA15B]">
              Cluster {cluster.clusterNumber ?? "?"}
            </span>

            <h2 className="mt-5 text-4xl font-sonsie italic text-[#B95C00] md:text-[70px]">
              {cluster.name}
            </h2>

            {cluster.clusterMeaning && (
              <p className="mx-auto mt-6 max-w-2xl text-sm font-medium leading-relaxed text-white/80 md:text-lg">
                {cluster.clusterMeaning}
              </p>
            )}
          </div>

          <div className="mt-14">
            <MemberList members={members} />
          </div>
        </div>

        <div className="absolute bottom-0 left-1/2 z-20 h-100 w-[700px] -translate-x-1/2 rounded-[300%] bg-[#2D160E] md:w-[1500px]" />
        <div className="absolute bottom-0 left-1/2 z-10 h-50 w-[700px] -translate-x-1/2 rounded-[300%] bg-linear-to-b from-[#EFA15B] from-70% to-transparent blur-3xl md:w-[1700px]" />
      </section>
      <Footer />
    </main>
  );
}
