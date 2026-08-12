import type { Metadata } from "next";
import Footer from "@/components/layout/footer";
import StarBackground from "@/components/common/star-background";
import ClusterDetail from "./_components/cluster-detail";

export const metadata: Metadata = {
  title: "Detail Cluster — SAMBA TI 2026",
  description: "Lihat daftar anggota cluster SAMBA TI 2026.",
};

export default function ClusterDetailPage() {
  return (
    <main className="bg-deep-space font-poppins text-soft-white">
      <section className="relative overflow-hidden pt-32 md:pt-44 pb-20 md:pb-28">
        <StarBackground />

        <div className="pointer-events-none absolute -top-40 -left-40 z-10 h-100 w-100 rounded-full bg-[#2DD4BF]/15 blur-3xl" />
        <div className="pointer-events-none absolute top-1/4 -right-50 z-10 h-120 w-120 rounded-full bg-[#2DD4BF]/10 blur-3xl" />

        <div className="relative z-20 mx-auto max-w-5xl px-5 md:px-10">
          <ClusterDetail />
        </div>
      </section>
      <Footer />
    </main>
  );
}
