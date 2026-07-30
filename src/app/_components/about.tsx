import gsap from "gsap";
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function About({ loaded }: { loaded: boolean }) {
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(carouselRef.current, {
        xPercent: -50,
        repeat: -1,
        duration: 40,
        ease: "none",
      });
    });

    return () => ctx.kill();
  }, [loaded]);
  return (
    <section className="min-h-screen relative  bg-[#2D160E] mt-60 py-50">
      <div className="w-full  bg-linear-to-t from-[#2D160E] from-20% to-transparent h-50 -top-50 absolute"></div>
      <h2 className="text-[70px] font-sonsie text-[#B95C00] text-center italic">
        SAMBA TI
      </h2>
      <Image
        src={"/assets/hero/left-cloud-sm.png"}
        width={630}
        height={209}
        alt="cloud"
        className="absolute -left-40 top-30 z-20"
      />
      <Image
        src={"/assets/hero/right-cloud-sm.png"}
        width={630}
        height={209}
        alt="cloud"
        className="absolute -right-45 top-10 z-20"
      />
      <div className="bg-[#2D160E] w-[2000px] h-50 left-1/2 -translate-x-1/2  rounded-[110%] absolute  top-70 z-10"></div>
      <div className="overflow-hidden mt-30">
        <div ref={carouselRef} className="flex gap-1 w-max">
          {[...Array(6), ...Array(6)].map((_, idx) => (
            <Image
              key={idx}
              src={`/assets/past/img${(idx % 6) + 1}.png`}
              width={900}
              height={600}
              alt={`Image ${(idx % 6) + 1}`}
              className="w-120 shrink-0"
            />
          ))}
        </div>
      </div>
      <div className="bg-[#2D160E] w-[2000px] h-50 left-1/2 -translate-x-1/2  rounded-[110%] absolute  top-170  z-10"></div>
      <p className="relative pt-10 z-10 text-lg text-center font-medium block w-6/10 mx-auto pb-10">
        SAMBA TI merupakan kegiatan penyambutan dan pembinaan bagi mahasiswa
        <br />
        baru Program Studi D-III
        <br /> Teknologi Informasi, Fakultas Vokasi Universitas Brawijaya.
        Melalui rangkaian kegiatan yang edukatif, interaktif, dan kolaboratif,
        mahasiswa diperkenalkan pada lingkungan akademik, budaya kampus, serta
        pembelajaran vokasi berbasis praktik. SAMBA TI bertujuan membangun
        karakter yang disiplin, kreatif, profesional, dan siap menghadapi
        tantangan dunia teknologi serta industri.
      </p>
      <Image
        src={"/assets/hero/left-cloud-lg.svg"}
        width={860}
        height={715}
        alt="Left Large Cloud"
        className="absolute -left-30 -bottom-50 z-30"
      />
      <Image
        src={"/assets/hero/right-cloud-lg.svg"}
        width={860}
        height={715}
        alt="Right Large Cloud"
        className="absolute -right-30   -bottom-50 z-30"
      />
      <div className="   bg-[#2D160E] h-100 -bottom-50 absolute w-[1500px] rounded-[300%] left-1/2 -translate-x-1/2 z-20"></div>
      <div className="   bg-linear-to-b from-[#EFA15B] from-70% to-transparent h-50 -bottom-65 absolute w-[1700px] rounded-[300%] left-1/2 -translate-x-1/2 z-10 blur-3xl"></div>
    </section>
  );
}
