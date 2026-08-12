import Image from "next/image";
import { Info } from "lucide-react";
import Reveal from "@/components/common/reveal";

const NEBULA_DESC =
  "Dalam astronomi, Nebula adalah awan antarbintang tempat lahirnya bintang-bintang baru di alam semesta. Maba memasuki jurusan TI dari berbagai latar belakang yang berbeda, membawa ego dan ketidaktahuan masing-masing (memulai dari nol). Rangkaian OBAMA sebagai \"Nebula\" menggambarkan momen pertama para maba berkumpul, berkenalan, dan mulai membentuk fondasi identitas awal yang kuat sebagai satu angkatan.";

const FUSION_DESC =
  "Fusion merupakan proses di mana sebuah bintang ditempa oleh suatu tekanan di dalam inti bintang itu sendiri agar tetap bersinar. Dalam konteks SAMBA, ini analogi untuk momen di mana mental, logika, dan solidaritas mahasiswa baru angkatan 26 diuji supaya menjadi satu kesatuan yang solid melalui tantangan, penugasan samba, dan dinamika kelompok. Tekanan ini dirancang untuk menciptakan ikatan yang kuat antar maba.";

const SUPERNOVA_DESC =
  "Puncak evolusi bintang. Setelah melewati fase pembentukan (Nebula) dan tekanan (Fusion), bintang itu meledak dalam keindahan (Supernova) yang sinarnya bisa menerangi seluruh galaksi. Ini adalah selebrasi resmi diterimanya mereka yang sekarang sudah siap \"bersinar\" di jurusan TI dan menjadi angkatan yang siap \"meledakkan\" karya, inovasi, dan kontribusi nyata yang cahayanya siap menerangi jurusan TI hingga dunia teknologi luar.";

export default function ZenithPhases() {
  return (
    <section className="pt-150 md:pt-200 pb-50 relative">
      <h2 className="text-3xl md:text-6xl font-bold text-right w-8/10 md:w-1/2 absolute right-5 md:right-20 text-white font-poppins tracking-wide leading-12 md:leading-20 top-1/2 -translate-y-20">
        Rangkaian SAMBA TI <span className="text-[#BB5AFA]">Zenith</span> 2026
      </h2>
      <div className="relative mx-auto px-5 lg:px-0">
        <Reveal from="bottom">
          <Image
            src={"/assets/hero/aurora-trail.png"}
            width={1000}
            height={500}
            alt=""
            className="mx-auto w-full max-w-[1000px] h-auto"
          />
        </Reveal>
        <Reveal from="bottom" className="absolute -left-12 top-12 md:left-0 md:top-45 lg:left-40 lg:top-60">
          <div className="group relative outline-none" tabIndex={0}>
            <div className="scale-60 md:scale-100">
              <Image
                src={"/assets/hero/obama.png"}
                width={200}
                height={100}
                alt=""
                className="mx-auto"
              />
              <div className="absolute left-20 bottom-5 md:right-15 md:-bottom-5 text-center">
                <h5 className="inline-flex items-center gap-1 font-bold text-sm md:text-base">
                  Nebula
                  <Info size={14} className="text-[#BB5AFA]" />
                </h5>
                <p className="text-[#BB5AFA] text-xs md:text-base">Obama</p>
              </div>
            </div>
            <div className="absolute top-full left-0 z-50 mt-3 w-60 md:w-72 rounded-xl border border-electric-blue/30 bg-midnight-navy/95 px-4 py-3 opacity-0 backdrop-blur-md shadow-[0_0_20px_rgba(56,189,248,0.2)] transition-opacity duration-200 pointer-events-none group-hover:opacity-100 group-focus-within:opacity-100">
              <p className="text-[11px] md:text-xs leading-relaxed text-white/80 text-justify">
                {NEBULA_DESC}
              </p>
            </div>
          </div>
        </Reveal>
        <Reveal from="bottom" delay={150} className="absolute -right-15 top-35 md:-right-5 md:top-100 lg:right-40 lg:top-140">
          <div className="group relative outline-none" tabIndex={0}>
            <div className="scale-60 md:scale-100">
              <Image
                src={"/assets/hero/fusion.png"}
                width={200}
                height={100}
                alt=""
                className="mx-auto"
              />
              <div className="absolute left-18 bottom-8 md:right-15 md:-bottom-5 text-center">
                <h5 className="inline-flex items-center gap-1 font-bold text-sm md:text-base">
                  Fusion
                  <Info size={14} className="text-[#BB5AFA]" />
                </h5>
                <p className="text-[#BB5AFA] text-xs md:text-base">Samba TI</p>
              </div>
            </div>
            <div className="absolute top-full right-0 z-50 mt-3 w-60 md:w-72 rounded-xl border border-electric-blue/30 bg-midnight-navy/95 px-4 py-3 opacity-0 backdrop-blur-md shadow-[0_0_20px_rgba(56,189,248,0.2)] transition-opacity duration-200 pointer-events-none group-hover:opacity-100 group-focus-within:opacity-100">
              <p className="text-[11px] md:text-xs leading-relaxed text-white/80 text-justify">
                {FUSION_DESC}
              </p>
            </div>
          </div>
        </Reveal>
        <Reveal from="bottom" delay={300} className="absolute left-5 -bottom-14 md:left-35 md:bottom-0 lg:left-120 lg:bottom-0">
          <div className="group relative outline-none" tabIndex={0}>
            <div className="scale-60 md:scale-100">
              <Image
                src={"/assets/hero/m2m.png"}
                width={200}
                height={100}
                alt=""
                className="mx-auto"
              />
              <div className="absolute left-11 bottom-2 md:right-15 md:-bottom-5 text-center">
                <h5 className="inline-flex items-center gap-1 font-bold text-sm md:text-base">
                  Supernova
                  <Info size={14} className="text-[#BB5AFA]" />
                </h5>
                <p className="text-[#BB5AFA] text-xs md:text-base">
                  M2M &
                  <br />
                  Welcoming Party
                </p>
              </div>
            </div>
            <div className="absolute top-full left-0 z-50 mt-3 w-60 md:w-72 rounded-xl border border-electric-blue/30 bg-midnight-navy/95 px-4 py-3 opacity-0 backdrop-blur-md shadow-[0_0_20px_rgba(56,189,248,0.2)] transition-opacity duration-200 pointer-events-none group-hover:opacity-100 group-focus-within:opacity-100 md:left-1/2 md:-translate-x-1/2">
              <p className="text-[11px] md:text-xs leading-relaxed text-white/80 text-justify">
                {SUPERNOVA_DESC}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
