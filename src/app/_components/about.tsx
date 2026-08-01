import gsap from "gsap";
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function About({ loaded }: { loaded: boolean }) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let tween: gsap.core.Tween | null = null;

    const ctx = gsap.context(() => {
      tween = gsap.to(carouselRef.current, {
        xPercent: -50,
        repeat: -1,
        duration: 40,
        ease: "none",
      });
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          tween?.resume();
        } else {
          tween?.pause();
        }
      },
      { threshold: 0 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      ctx.kill();
      observer.disconnect();
    };
  }, [loaded]);
  return (
    <section
      ref={sectionRef}
      className="min-h-screen relative  bg-[#2D160E] mt-30 md:mt-60 py-30 md:py-50"
    >
      <div className="w-full  bg-linear-to-t from-[#2D160E] from-20% to-transparent h-50 -top-50 absolute"></div>
      <h2 className="text-4xl md:text-[70px] font-sonsie text-[#B95C00] text-center italic z-50 relative">
        SAMBA TI
      </h2>
      <Image
        src={"/assets/hero/left-cloud-sm.png"}
        width={630}
        height={209}
        alt="cloud"
        className="absolute -left-40  top-25     md:top-30 z-20 scale-50 md:scale-100"
      />
      <Image
        src={"/assets/hero/right-cloud-sm.png"}
        width={630}
        height={209}
        alt="cloud"
        className="absolute -right-45 -top-5 md:top-10 z-20 scale-50 md:scale-100"
      />
      <div className="bg-[#2D160E] w-[1200px] md:w-[2000px] h-50 left-1/2 -translate-x-1/2  rounded-[110%] absolute top-30  md:top-70 z-10"></div>
      <div className="overflow-hidden mt-30">
        <div ref={carouselRef} className="flex gap-1 w-max">
          {[...Array(6), ...Array(6)].map((_, idx) => (
            <Image
              key={idx}
              src={`/assets/past/img${(idx % 6) + 1}.png`}
              width={480}
              height={320}
              sizes="480px"
              quality={75}
              alt={`Image ${(idx % 6) + 1}`}
              className="w-120 shrink-0"
            />
          ))}
        </div>
      </div>
      <div className="bg-[#2D160E] w-[1200px] md:w-[2000px] h-50 left-1/2 -translate-x-1/2  rounded-[110%] absolute  top-140 md:top-170  z-10"></div>
      <p className="relative pt-10 z-30 text-sm md:text-lg text-center font-medium block w-6/10 mx-auto pb-10">
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
        className="absolute -left-30 -bottom-50 z-30 scale-50 md:scale-100"
      />
      <Image
        src={"/assets/hero/right-cloud-lg.svg"}
        width={860}
        height={715}
        alt="Right Large Cloud"
        className="absolute -right-30   -bottom-50 z-30 scale-50 md:scale-100"
      />
      <div className="   bg-[#2D160E] h-100 -bottom-25 md:-bottom-50 absolute w-[700px] md:w-[1500px] rounded-[300%] left-1/2 -translate-x-1/2 z-20"></div>
      <div className="   bg-linear-to-b from-[#EFA15B] from-70% to-transparent h-50 -bottom-35 md:-bottom-65 absolute w-[700px] md:w-[1700px] rounded-[300%] left-1/2 -translate-x-1/2 z-10 blur-3xl"></div>
    </section>
  );
}
