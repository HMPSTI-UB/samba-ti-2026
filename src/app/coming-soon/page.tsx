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

    gsap.set(earthRef.current, { y: 300, opacity: 0 });
    gsap.set(marsRef.current, { y: 350, opacity: 0 });
    gsap.set(subRef.current, { y: 30, opacity: 0 });
    gsap.set(comingRef.current, { y: 100, scale: 0.9, opacity: 0 });
    gsap.set(soonRef.current, { y: 100, scale: 0.9, opacity: 0 });
    gsap.set(galaxyRef.current, { x: -600, opacity: 1 });
    gsap.set(planetRef.current, { x: 600, opacity: 1 });
    gsap.set(maskotRef.current, { x: 700, opacity: 1 });

    const tl = gsap.timeline({ defaults: { ease: "power3.out", force3D: true } });

    tl.add("awal")
      .fromTo(
        earthRef.current,
        { y: 300, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, force3D: true },
        "awal",
      )
      .fromTo(
        marsRef.current,
        { y: 350, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.3, force3D: true },
        "awal",
      )
      .fromTo(
        galaxyRef.current,
        { x: -600 },
        { x: 0, duration: 1.3, force3D: true },
        "awal",
      )
      .fromTo(
        planetRef.current,
        { x: 600 },
        { x: 0, duration: 1.3, force3D: true },
        "awal",
      )
      .add("textStart", "awal+=0.8")
      .fromTo(
        comingRef.current,
        { y: 100, scale: 0.9, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 1.0, force3D: true },
        "textStart",
      )
      .fromTo(
        subRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "textStart+=0.2",
      )
      .fromTo(
        soonRef.current,
        { y: 100, scale: 0.9, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 1.0, force3D: true },
        "textStart",
      )
      .fromTo(
        maskotRef.current,
        { x: 700 },
        { x: 0, duration: 1.5, force3D: true },
      );
  }, [loaded]);

  return (
    <>
      <LoadingScreen onComplete={() => setLoaded(true)} />

      <main className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <StarBackground />

        <div
          ref={marsRef}
          className="absolute bottom-0 left-0 w-full h-[800px] pointer-events-none opacity-0 will-change-transform"
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
          className="absolute bottom-0 right-0 w-[300px] h-[300px] pointer-events-none opacity-0 will-change-transform"
        >
          <div className="w-full h-full scale-[2.5] origin-bottom-right translate-y-[400px] translate-x-[100px]">
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
              className="object-contain object-right-bottom relative z-10"
            />
          </div>
        </div>

        <div
          ref={galaxyRef}
          className="absolute top-0 left-0 w-[500px] h-[300px] pointer-events-none will-change-transform opacity-0"
        >
          <div className="w-full h-full scale-75 -rotate-[15deg] origin-top-left translate-y-[100px]">
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
          className="absolute top-0 right-0 w-[450px] h-[450px] pointer-events-none will-change-transform opacity-0"
        >
          <div className="w-full h-full -translate-y-[200px] translate-x-[100px]">
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
          className="absolute right-0 w-[250px] h-[180px] pointer-events-none top-1/2 will-change-transform opacity-0"
        >
          <div className="w-full h-full -translate-y-1/2 -translate-x-[30px] origin-right">
            <div className="relative w-full h-full animate-float scale-150 origin-right">
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
            className="text-sm text-soft-white font-bold font-heading tracking-[6px] uppercase mb-2 opacity-0 will-change-transform"
          >
            SAMBA TI 2026
          </span>
          <span
            ref={comingRef}
            className="text-[160px] text-star-gold uppercase tracking-[10px] opacity-0 will-change-transform"
            style={{
              fontFamily: "var(--font-display)",
              textShadow:
                "3px 3px 0 #ff0000, 6px 6px 0 #cc0000, 9px 9px 0 #aa0000, 12px 12px 0 #880000, 15px 15px 0 #660000",
            }}
          >
            Coming
          </span>
          <span
            ref={soonRef}
            className="text-[160px] text-star-gold uppercase tracking-[10px] opacity-0 will-change-transform"
            style={{
              fontFamily: "var(--font-display)",
              textShadow:
                "3px 3px 0 #ff0000, 6px 6px 0 #cc0000, 9px 9px 0 #aa0000, 12px 12px 0 #880000, 15px 15px 0 #660000",
            }}
          >
            Soon
          </span>
        </div>
      </main>
    </>
  );
}
