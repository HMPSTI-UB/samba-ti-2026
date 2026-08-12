import Image from "next/image";
import Reveal from "@/components/common/reveal";
import StarBackground from "@/components/common/star-background";

export default function About({ loaded }: { loaded: boolean }) {
  return (
    <section
      id="about"
      className="relative min-h-screen overflow-hidden pt-36 md:pt-64 pb-0"
    >
      <StarBackground />

      <div className="relative z-20 mx-auto max-w-6xl px-5 md:px-10">
        <Reveal from="right-far" start={loaded} className="mb-8 md:mb-14">
          <div className="relative w-full max-w-[800px] mx-auto">
            <Image
              src="/assets/hero/plane-frame.png"
              width={1536}
              height={1024}
              alt=""
              className="w-full h-auto relative z-10"
              sizes="(max-width: 800px) 100vw, 800px"
              quality={80}
            />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[55%] z-0">
              <Image
                src="/assets/past/img1.png"
                width={668}
                height={376}
                alt=""
                className="w-full h-auto rounded-lg border border-white/20 shadow-lg"
                sizes="(max-width: 767px) 80vw, 55vw"
                quality={80}
              />
            </div>
          </div>
        </Reveal>

        <Reveal from="bottom">
          <p className="text-center text-xs md:text-sm font-bold uppercase tracking-[0.4em] text-electric-blue">
            Tentang Kami
          </p>
          <h2 className="mt-4 text-center font-heading text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-wide text-soft-white">
            SAMBA <span className="text-electric-blue">TI</span>{" "}
            <span className="text-star-gold">2026</span>
          </h2>
        </Reveal>

        <Reveal from="bottom" delay={150}>
          <div className="glass-panel mx-auto mt-10 md:mt-14 max-w-3xl px-6 md:px-12 py-8 md:py-12 text-center">
            <p className="text-sm md:text-lg leading-relaxed text-white">
              SAMBA TI merupakan kegiatan penyambutan dan pembinaan bagi
              mahasiswa baru Program Studi D-III Teknologi Informasi, Fakultas
              Vokasi Universitas Brawijaya. Melalui rangkaian kegiatan yang{" "}
              <span className="font-semibold text-electric-blue">edukatif</span>
              , <span className="font-semibold text-electric-blue">interaktif</span>
              , dan <span className="font-semibold text-electric-blue">kolaboratif</span>
              , mahasiswa diperkenalkan pada lingkungan akademik, budaya kampus,
              serta pembelajaran vokasi berbasis praktik. SAMBA TI bertujuan
              membangun karakter yang disiplin, kreatif, profesional, dan siap
              menghadapi tantangan dunia teknologi serta industri.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
