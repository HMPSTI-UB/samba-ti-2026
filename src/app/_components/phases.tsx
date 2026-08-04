import Image from "next/image";
import Reveal from "@/components/common/reveal";

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
            className="mx-auto"
          />
        </Reveal>
        <Reveal from="bottom" className="absolute -left-12 top-12 md:left-0 md:top-45 lg:left-40 lg:top-60">
          <div className="scale-60 md:scale-100">
            <Image
              src={"/assets/hero/obama.png"}
              width={200}
              height={100}
              alt=""
              className="mx-auto"
            />
            <div className="absolute left-20 bottom-5 md:right-15 md:-bottom-5 text-center">
              <h5 className="font-bold text-sm md:text-base">Nebula</h5>
              <p className="text-[#BB5AFA] text-xs md:text-base">Obama</p>
            </div>
          </div>
        </Reveal>
        <Reveal from="bottom" delay={150} className="absolute -right-15 top-35 md:-right-5 md:top-100 lg:right-40 lg:top-140">
          <div className="scale-60 md:scale-100">
            <Image
              src={"/assets/hero/fusion.png"}
              width={200}
              height={100}
              alt=""
              className="mx-auto"
            />
            <div className="absolute left-18 bottom-8 md:right-15 md:-bottom-5 text-center">
              <h5 className="font-bold text-sm md:text-base">Fusion</h5>
              <p className="text-[#BB5AFA] text-xs md:text-base">Samba TI</p>
            </div>
          </div>
        </Reveal>
        <Reveal from="bottom" delay={300} className="absolute left-5 -bottom-14 md:left-35 md:bottom-0 lg:left-120 lg:bottom-0">
          <div className="scale-60 md:scale-100">
            <Image
              src={"/assets/hero/m2m.png"}
              width={200}
              height={100}
              alt=""
              className="mx-auto"
            />
            <div className="absolute left-11 bottom-2 md:right-15 md:-bottom-5 text-center">
              <h5 className="font-bold text-sm md:text-base">Supernova</h5>
              <p className="text-[#BB5AFA] text-xs md:text-base">
                M2M &
                <br />
                Welcoming Party
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
