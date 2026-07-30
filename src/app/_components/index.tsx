"use client";

import { useState } from "react";

import Hero from "./hero";
import About from "./about";
import Image from "next/image";
import Zenith from "./zenith";
import ZenithPhases from "./phases";
import Logo from "./logo";
import Footer from "@/components/layout/footer";

export default function HomePage() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <Hero loaded={loaded} setLoaded={setLoaded} />
      <About loaded={loaded} />
      <Zenith />
      <ZenithPhases />
      <Logo />
      <section className="py-40 px-20 relative">
        <h2 className="text-6xl font-bold w-1/2 text-right text-white font-poppins tracking-wide leading-20 top-20 right-20 absolute">
          Kenalan sama Maskot Kita Yuk!{" "}
          <span className="text-[#BB5AFA]">Zuno</span>
        </h2>
        <div className="grid grid-cols-2 items-center  mt-20">
          <div className="relative w-fit">
            <Image src={"/zuno.png"} width={500} height={500} alt="Zuno" />
            <Image
              src={"/assets/bubble.png"}
              width={150}
              height={100}
              alt="Zuno"
              className="absolute top-10 -right-30"
            />
            <p className="absolute top-20 -right-25 text-blue-900 font-bold">
              Hai!
              <br /> Aku Zuno
            </p>
          </div>
          <div className="space-y-10">
            <div className="grid grid-cols-5 ">
              <Image
                src={"/assets/hero/maskots/star.png"}
                width={100}
                height={100}
                alt="Zuno"
                className=""
              />
              <div className="col-span-4">
                <h5 className="text-blue-600 font-bold text-xl">
                  Bentuk Bintang
                </h5>
                <p className="text-lg text-white mt-2">
                  Melambangkan harapan, mimpi dan potensi tanpa batas. Seperti
                  bintang di langit, Zuno ingin menjadi cahaya yang
                  menginspirasi banyak orang.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-5 ">
              <Image
                src={"/assets/hero/maskots/union.png"}
                width={100}
                height={100}
                alt="Zuno"
                className=""
              />
              <div className="col-span-4">
                <h5 className="text-blue-600 font-bold text-xl">Jubah Biru</h5>
                <p className="text-lg text-white mt-2">
                  Warna biru melambangkan kebijaksanaan, kepercayaan, dan
                  ketenangan. Jubah adalah simbol keberanian untuk terus belajar
                  dan menghadapi tantangan.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-5 ">
              <Image
                src={"/assets/hero/maskots/star-bag.png"}
                width={100}
                height={100}
                alt="Zuno"
                className=""
              />
              <div className="col-span-4">
                <h5 className="text-blue-600 font-bold text-xl">Tas Bintang</h5>
                <p className="text-lg text-white mt-2">
                  Tempat menyimpan ide, ilmu, dan pengalaman berharga yang akan
                  dibagikan untuk membantu dan memberi manfaat bagi sesama.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
