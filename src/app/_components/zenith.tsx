import Image from "next/image";
import Reveal from "@/components/common/reveal";

export default function Zenith() {
  return (
    <section className="min-h-screen ">
      <div className="relative pt-[190px]">
        <Reveal from="scale" className="relative w-fit mx-auto z-30">
          <Image
            src={"/assets/hero/about-card.png"}
            width={900}
            height={600}
            alt=""
            className="mx-auto  scale-90 md:scale-100"
          />
          <h2 className="font-poppins text-lg md:text-3xl text-white absolute left-1/2 -translate-x-1/2 top-2 md:top-2 font-bold">
            FILOSOFI
          </h2>
          <p className="font-poppins text-white absolute left-1/2 -translate-x-1/2 top-11 md:top-20 text-[10px] md:text-2xl tracking-wide text-justify w-7/10">
            Dalam astronomi, Zenith adalah titik tertinggi di langit. Dalam
            konteks SAMBA TI, Zenith adalah komitmen kolektif untuk membawa maba
            dari titik nol (ground level) menuju performa dan pencapaian
            tertinggi mereka. Mereka adalah individu dengan potensi besar yang
            akan berkembang menjadi para inovator, pemecah masalah, dan
            penggerak teknologi di masa depan “The New IT Heroes”.
          </p>
        </Reveal>
        <Reveal
          from="bottom"
          className="absolute -bottom-20 left-1/2 -translate-x-1/2 z-10"
        >
          <Image
            src={"/assets/hero/rocks.png"}
            width={2100}
            height={645}
            alt=""
            className="scale-105 animate-bob"
          />
        </Reveal>
        <Reveal from="left" className="absolute -bottom-20 md:-bottom-28 -left-10 md:left-0 z-40">
          <div className="scale-40 md:scale-75 animate-bob">
            <Image
              src={"/assets/hero/starwar-ship2.png"}
              width={448}
              height={301}
              alt=""
            />
          </div>
        </Reveal>
        <Reveal from="right" className="absolute top-10 md:top-50 -right-20 md:right-0 z-10">
          <div className="scale-50 md:scale-115 animate-float">
            <Image
              src={"/assets/hero/starwar-ship.png"}
              width={252}
              height={252}
              alt=""
            />
          </div>
        </Reveal>
      </div>
      <div className="relative w-full ">
        <Reveal from="bottom" delay={100} className="absolute -top-10 md:-top-100 -right-110 md:-right-235">
          <div className="-rotate-5">
            <div className="scale-120 md:scale-70">
              <Image
                src={"/assets/hero/visi.svg"}
                width={2000}
                height={1200}
                alt=""
              />
            </div>
          </div>
        </Reveal>
        <Reveal from="bottom" delay={250} className="absolute top-80 md:top-10 -left-110 md:-left-240">
          <div className="scale-120 md:scale-70">
            <Image
              src={"/assets/hero/misi.svg"}
              width={2000}
              height={1200}
              alt=""
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
