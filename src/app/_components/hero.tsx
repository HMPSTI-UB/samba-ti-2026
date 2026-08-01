"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import StarBackground from "@/components/common/star-background";
import LoadingScreen from "@/components/common/loading-screen";

export default function Hero({
  loaded,
  setLoaded,
}: {
  loaded: boolean;
  setLoaded: (loaded: boolean) => void;
}) {
  const marsRef = useRef<HTMLDivElement>(null);
  const earthRef = useRef<HTMLDivElement>(null);
  const galaxyRef = useRef<HTMLDivElement>(null);
  const planetRef = useRef<HTMLDivElement>(null);
  const maskotRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLSpanElement>(null);
  const comingRef = useRef<HTMLSpanElement>(null);
  const soonRef = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLSpanElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loaded) return;

    const ctx = gsap.context(() => {
      gsap.set(
        [
          earthRef.current,
          marsRef.current,
          subRef.current,
          comingRef.current,
          soonRef.current,
          subtitleRef.current,
          ctaRef.current,
        ],
        { opacity: 0 },
      );

      gsap.set(earthRef.current, { y: 300 });
      gsap.set(marsRef.current, { y: 350 });
      gsap.set(subRef.current, { y: 30 });
      gsap.set(comingRef.current, { y: 100, scale: 0.9 });
      gsap.set(soonRef.current, { y: 100, scale: 0.9 });
      gsap.set(subtitleRef.current, { y: 40 });
      gsap.set(ctaRef.current, { y: 40 });
      gsap.set(galaxyRef.current, { x: -600, opacity: 1 });
      gsap.set(planetRef.current, { x: 600, opacity: 1 });
      gsap.set(maskotRef.current, { x: 700, opacity: 1 });

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .add("awal")
        .to(earthRef.current, { y: 0, opacity: 1, duration: 1.2 }, "awal")
        .to(marsRef.current, { y: 0, opacity: 1, duration: 1.3 }, "awal")
        .to(galaxyRef.current, { x: 0, duration: 1.3 }, "awal")
        .to(planetRef.current, { x: 0, duration: 1.3 }, "awal")
        .add("textStart", "awal+=0.8")
        .to(
          comingRef.current,
          { y: 0, scale: 1, opacity: 1, duration: 1.0 },
          "textStart",
        )
        .to(
          subRef.current,
          { y: 0, opacity: 1, duration: 0.8 },
          "textStart+=0.2",
        )
        .to(
          soonRef.current,
          { y: 0, scale: 1, opacity: 1, duration: 1.0 },
          "textStart",
        )
        .to(
          subtitleRef.current,
          { y: 0, opacity: 1, duration: 0.8 },
          "textStart",
        )
        .to(ctaRef.current, { y: 0, opacity: 1, duration: 0.8 }, "textStart")
        .to(maskotRef.current, { x: 0, duration: 1.5 });
    }, containerRef);

    return () => ctx.kill();
  }, [loaded]);

  return (
    <>
      <LoadingScreen onComplete={() => setLoaded(true)} />

      <section
        ref={containerRef}
        className="relative min-h-screen flex items-center justify-center"
      >
        <StarBackground />

        <div
          ref={marsRef}
          className="absolute bottom-0 left-0 w-full h-[800px] pointer-events-none invisible md:visible opacity-0"
        >
          <div className="w-full h-full scale-80 -translate-x-[60px] translate-y-[180px] rotate-[9.48deg] origin-bottom-left">
            <Image
              src="/assets/hero/mars-ground-2.svg"
              alt="Mars Ground"
              fill
              sizes="100vw"
              quality={75}
              priority
              className="object-cover object-left-bottom"
            />
          </div>
        </div>

        <div
          ref={earthRef}
          className="absolute bottom-0 left-0 md:right-0 md:left-auto w-[315px] h-[315px] md:w-[300px] md:h-[300px] pointer-events-none opacity-0"
        >
          <div className="w-full h-full scale-[1.5] md:scale-[2.5] origin-bottom-left md:origin-bottom-right translate-y-[230px] -translate-x-[100px] md:translate-y-[400px] md:translate-x-[100px]">
            <div
              className="absolute inset-[50px] rounded-full blur-lg opacity-60"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, #38BDF8, #ffffff 40%, #38BDF8 70%, transparent)",
              }}
            />
            <Image
              src="/assets/hero/earth.svg"
              alt="Earth"
              fill
              sizes="(max-width: 768px) 315px, 300px"
              quality={75}
              priority
              className="object-contain object-left-bottom md:object-right-bottom relative z-10"
            />
          </div>
        </div>

        <div
          ref={galaxyRef}
          className="absolute top-0 left-0 w-[220px] h-[130px] md:w-[500px] md:h-[300px] pointer-events-none opacity-0"
        >
          <div className="w-full h-full scale-[0.7] md:scale-75 -rotate-[15deg] origin-top-left translate-y-[80px] -translate-x-[10px] md:translate-y-[100px] md:translate-x-0">
            <div
              className="absolute inset-[-20%] rounded-full blur-2xl"
              style={{
                background: "radial-gradient(circle, #ec4899, transparent 70%)",
              }}
            />
            <Image
              src="/assets/hero/galaxy.svg"
              alt="Galaxy"
              fill
              sizes="(max-width: 768px) 220px, 500px"
              quality={75}
              priority
              className="object-contain object-top-left relative z-10"
            />
          </div>
        </div>

        <div
          ref={planetRef}
          className="absolute top-0 right-0 w-[180px] h-[180px] md:w-[450px] md:h-[450px] pointer-events-none opacity-0"
        >
          <div className="w-full h-full -translate-y-[50px] translate-x-[60px] md:-translate-y-[200px] md:translate-x-[100px]">
            <div
              className="absolute inset-[-20%] rounded-full blur-2xl"
              style={{
                background: "radial-gradient(circle, #a855f7, transparent 70%)",
              }}
            />
            <Image
              src="/assets/hero/purple-planet.svg"
              alt="Purple Planet"
              fill
              sizes="(max-width: 768px) 180px, 450px"
              quality={75}
              priority
              className="object-contain object-top-right relative z-10"
            />
          </div>
        </div>

        <div
          ref={maskotRef}
          className="absolute right-0 w-[180px] h-[127px] md:w-[250px] md:h-[180px] pointer-events-none bottom-20 short:bottom-[10px] md:top-[calc(50%-150px)] opacity-0"
        >
          <div className="w-full h-full md:-translate-y-1/2 md:-translate-x-[30px] origin-right">
            <div className="relative w-full h-full animate-float scale-100 md:scale-150 origin-right">
              <Image
                src="/assets/hero/maskot.svg"
                alt="Maskot"
                fill
                sizes="(max-width: 768px) 180px, 250px"
                quality={75}
                priority
                className="object-contain object-right"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center leading-none gap-[10px]">
          <span
            ref={subRef}
            className="text-[10px] md:text-sm text-soft-white font-bold font-heading tracking-[3px] md:tracking-[6px] uppercase mb-2 opacity-0"
          >
            SAMBA TI
          </span>
          <span
            ref={comingRef}
            className="text-[80px] md:text-[160px] text-star-gold uppercase tracking-[4px] md:tracking-[10px] font-display coming-shadow opacity-0"
          >
            ZENITH
          </span>
          <span
            ref={subtitleRef}
            className="text-base md:text-[40px]  font-poppins text-white   text-center opacity-0"
          >
            Zealous Evolution of
            <br />
            New IT Heroes
          </span>
          <button
            ref={ctaRef}
            className="bg-yellow-500 text-black uppercase border border-black mt-4 hover:bg-yellow-600 hover:scale-105 hover:shadow-[0_0_30px_rgba(250,204,21,0.5)] active:scale-95 transition-colors duration-200 h-10 md:h-12 px-7 text-sm md:text-base rounded-full font-semibold opacity-0"
          >
            Mulai Perjalananmu!
          </button>
        </div>
      </section>
    </>
  );
}
