"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import StarBackground from "@/components/common/star-background";
import LoadingScreen from "@/components/common/loading-screen";

export default function ComingSoonPage() {
  const [loaded, setLoaded] = useState(false);

  const marsRef = useRef<HTMLDivElement>(null);
  const earthRef = useRef<HTMLDivElement>(null);
  const galaxyRef = useRef<HTMLDivElement>(null);
  const planetRef = useRef<HTMLDivElement>(null);
  const maskotRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLSpanElement>(null);
  const comingRef = useRef<HTMLSpanElement>(null);
  const soonRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!loaded) return;

    requestAnimationFrame(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out", force3D: true } });

      tl.add("awal")
        .fromTo(earthRef.current, { y: 300, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2 }, "awal")
        .fromTo(marsRef.current, { y: 350, opacity: 0 }, { y: 0, opacity: 1, duration: 1.3 }, "awal")
        .fromTo(galaxyRef.current, { x: -600, opacity: 1 }, { x: 0, duration: 1.3 }, "awal")
        .fromTo(planetRef.current, { x: 600, opacity: 1 }, { x: 0, duration: 1.3 }, "awal")
        .add("textStart", "awal+=0.8")
        .fromTo(comingRef.current, { y: 100, scale: 0.9, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: 1.0 }, "textStart")
        .fromTo(subRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "textStart+=0.2")
        .fromTo(soonRef.current, { y: 100, scale: 0.9, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: 1.0 }, "textStart")
        .fromTo(maskotRef.current, { x: 700, opacity: 1 }, { x: 0, duration: 1.5 });
    });
  }, [loaded]);

  return (
    <>
      <LoadingScreen onComplete={() => setLoaded(true)} />

      <main className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <StarBackground />

        <div
          ref={marsRef}
          className="hidden md:block absolute bottom-0 left-0 w-full h-[800px] pointer-events-none opacity-0"
        >
          <div className="w-full h-full scale-80 -translate-x-[60px] translate-y-[180px] rotate-[9.48deg] origin-bottom-left">
            <Image
              src="/assets/hero/mars-ground.svg"
              alt="Mars Ground"
              fill
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
              className="absolute inset-[50px] rounded-full animate-rotate-glow blur-lg"
              style={{
                background:
                  "conic-gradient(from 0deg, #38BDF8, #ffffff, #38BDF8, #ffffff, #38BDF8)",
              }}
            />
            <Image
              src="/assets/hero/earth.svg"
              alt="Earth"
              fill
              className="object-contain object-left-bottom md:object-right-bottom relative z-10"
            />
          </div>
        </div>

        <div
          ref={galaxyRef}
          className="absolute top-0 left-0 w-[220px] h-[130px] md:w-[500px] md:h-[300px] pointer-events-none opacity-0"
        >
          <div className="w-full h-full scale-[0.5] md:scale-75 -rotate-[15deg] origin-top-left translate-y-[80px] -translate-x-[10px] md:translate-y-[100px] md:translate-x-0">
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
              className="object-contain object-top-right relative z-10"
            />
          </div>
        </div>

        <div
          ref={maskotRef}
          className="absolute right-0 w-[272px] h-[192px] md:w-[250px] md:h-[180px] pointer-events-none bottom-[80px] md:top-1/2 opacity-0"
        >
          <div className="w-full h-full md:-translate-y-1/2 md:-translate-x-[30px] origin-right">
            <div className="relative w-full h-full animate-float scale-100 md:scale-150 origin-right">
              <Image
                src="/assets/hero/maskot.svg"
                alt="Maskot"
                fill
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
            SAMBA TI 2026
          </span>
          <span
            ref={comingRef}
            className="text-[64px] md:text-[160px] text-star-gold uppercase tracking-[4px] md:tracking-[10px] font-display coming-shadow opacity-0"
          >
            Coming
          </span>
          <span
            ref={soonRef}
            className="text-[64px] md:text-[160px] text-star-gold uppercase tracking-[4px] md:tracking-[10px] font-display soon-shadow opacity-0"
          >
            Soon
          </span>
        </div>
      </main>
    </>
  );
}
