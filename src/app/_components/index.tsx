"use client";

import { useState } from "react";

import Hero from "./hero";
import About from "./about";
import Image from "next/image";
import Zenith from "./zenith";
import ZenithPhases from "./phases";
import Logo from "./logo";
import Footer from "@/components/layout/footer";
import Reveal from "@/components/common/reveal";

export default function HomePage() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <Hero loaded={loaded} setLoaded={setLoaded} />
      <About loaded={loaded} />
      <Zenith />
      <ZenithPhases />
      <Logo />
      <section className="py-16 md:py-40 px-5 md:px-20">
        <Reveal from="bottom">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-center md:text-right text-white font-poppins tracking-wide leading-9 md:leading-20 mb-10 md:mb-0">
            Kenalan sama Maskot Kita Yuk!{" "}
            <span className="text-[#BB5AFA]">Zuno</span>
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10 mt-10 md:mt-20">
          <Reveal from="scale" className="relative w-fit mx-auto md:mx-0">
            <Image
              src={"/zuno.png"}
              width={500}
              height={500}
              alt="Zuno"
              className="w-64 h-64 md:w-[480px] md:h-[480px]"
            />
            <Image
              src={"/assets/bubble.png"}
              width={150}
              height={100}
              alt="Zuno"
              className="absolute top-4 -right-4 md:top-10 md:-right-40 w-24 h-16 md:w-36 md:h-24"
            />
            <div className="absolute top-4 -right-4 md:top-10 md:-right-40 w-24 h-16 md:w-36 md:h-24 flex items-center justify-center">
              <p className="text-blue-900 font-bold text-xs md:text-sm text-center leading-tight">
                Hai!
                <br /> Aku Zuno
              </p>
            </div>
          </Reveal>
          <div className="space-y-8 md:space-y-10">
            <Reveal from="bottom">
              <div className="flex gap-4 md:gap-5 items-start">
                <Image
                  src={"/assets/hero/maskots/star.png"}
                  width={100}
                  height={100}
                  alt="Zuno"
                  className="w-16 h-16 md:w-24 md:h-24 shrink-0"
                />
                <div>
                  <h5 className="text-blue-600 font-bold text-lg md:text-xl">
                    Bentuk Bintang
                  </h5>
                  <p className="text-sm md:text-lg text-white mt-2">
                    Melambangkan harapan, mimpi dan potensi tanpa batas. Seperti
                    bintang di langit, Zuno ingin menjadi cahaya yang
                    menginspirasi banyak orang.
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal from="bottom" delay={150}>
              <div className="flex gap-4 md:gap-5 items-start">
                <Image
                  src={"/assets/hero/maskots/union.png"}
                  width={100}
                  height={100}
                  alt="Zuno"
                  className="w-16 h-16 md:w-24 md:h-24 shrink-0"
                />
                <div>
                  <h5 className="text-blue-600 font-bold text-lg md:text-xl">Jubah Biru</h5>
                  <p className="text-sm md:text-lg text-white mt-2">
                    Warna biru melambangkan kebijaksanaan, kepercayaan, dan
                    ketenangan. Jubah adalah simbol keberanian untuk terus belajar
                    dan menghadapi tantangan.
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal from="bottom" delay={300}>
              <div className="flex gap-4 md:gap-5 items-start">
                <Image
                  src={"/assets/hero/maskots/star-bag.png"}
                  width={100}
                  height={100}
                  alt="Zuno"
                  className="w-16 h-16 md:w-24 md:h-24 shrink-0"
                />
                <div>
                  <h5 className="text-blue-600 font-bold text-lg md:text-xl">Tas Bintang</h5>
                  <p className="text-sm md:text-lg text-white mt-2">
                    Tempat menyimpan ide, ilmu, dan pengalaman berharga yang akan
                    dibagikan untuk membantu dan memberi manfaat bagi sesama.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
