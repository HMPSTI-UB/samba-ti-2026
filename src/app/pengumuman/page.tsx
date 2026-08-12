import type { Metadata } from "next";
import Footer from "@/components/layout/footer";
import StarBackground from "@/components/common/star-background";
import Reveal from "@/components/common/reveal";
import PengumumanFeed from "./_components/pengumuman-feed";

export const metadata: Metadata = {
  title: "Pengumuman — SAMBA TI 2026",
  description: "Info dan pengumuman terbaru dari panitia SAMBA TI 2026.",
};

export default function PengumumanPage() {
  return (
    <main className="bg-deep-space font-poppins text-soft-white">
      <section className="relative overflow-hidden pt-32 md:pt-44 pb-20 md:pb-28">
        <StarBackground />

        <div className="pointer-events-none absolute -top-40 -left-40 z-10 h-100 w-100 rounded-full bg-[#2DD4BF]/15 blur-3xl" />
        <div className="pointer-events-none absolute top-1/4 -right-50 z-10 h-120 w-120 rounded-full bg-[#2DD4BF]/10 blur-3xl" />

        <div className="relative z-20 mx-auto max-w-7xl px-5 md:px-10">
          <Reveal from="bottom">
            <div className="text-center">
              <p className="text-xs md:text-sm font-bold uppercase tracking-[0.4em] text-[#2DD4BF]">
                Info Terbaru
              </p>
              <h2 className="mt-4 text-center font-poppins text-4xl sm:text-6xl md:text-7xl font-bold uppercase tracking-wide text-soft-white">
                Pengumuman
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-sm font-medium text-muted-text md:text-lg">
                Info dan pengumuman terbaru dari panitia SAMBA TI 2026.
              </p>
            </div>
          </Reveal>

          <div className="mx-auto mt-14 max-w-3xl">
            <PengumumanFeed />
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
