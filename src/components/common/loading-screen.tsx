"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

const LOADING_PHRASES = [
  "Zealous Evolution of New IT Heroes",
  "Menyiapkan misi luar angkasa...",
  "Menyalakan bintang-bintang...",
  "Mempersiapkan ZENITH...",
  "Mengorbit menuju galaksi SAMBA TI...",
];

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const loadingTextRef = useRef<HTMLSpanElement>(null);
  const dotsRef = useRef<HTMLSpanElement>(null);
  const maskotRef = useRef<HTMLDivElement>(null);
  const phraseRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [phrase, setPhrase] = useState(LOADING_PHRASES[0]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(overlayRef.current, { opacity: 0 });
      onComplete();
      return;
    }

    let idx = 0;
    intervalRef.current = setInterval(() => {
      idx = (idx + 1) % LOADING_PHRASES.length;
      gsap.to(phraseRef.current, {
        opacity: 0,
        duration: 0.25,
        onComplete: () => {
          setPhrase(LOADING_PHRASES[idx]);
          gsap.fromTo(
            phraseRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.35 },
          );
        },
      });
    }, 1300);

    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .fromTo(loadingTextRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 })
        .to(dotsRef.current, { opacity: 1, duration: 0.3 })
        .fromTo(
          progressRef.current,
          { width: "0%" },
          { width: "100%", duration: 4.5, ease: "none" },
          0,
        )
        .fromTo(
          maskotRef.current,
          { x: 1200, rotation: -25, opacity: 1 },
          { x: 0, rotation: 0, opacity: 1, duration: 1.2, ease: "power2.out" },
        )
        .to(maskotRef.current, {
          x: 30,
          duration: 0.8,
          repeat: 3,
          yoyo: true,
          ease: "sine.inOut",
        })
        .to(maskotRef.current, {
          x: -1200,
          rotation: -25,
          duration: 1,
          ease: "power2.in",
        })
        .to(overlayRef.current, {
          opacity: 0,
          duration: 0.5,
          onComplete: () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
            onComplete();
          },
        });
    }, overlayRef);

    return () => {
      ctx.kill();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [onComplete]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center pointer-events-none"
      style={{ backgroundColor: "rgba(5, 8, 22, 0.95)" }}
    >
      <div
        ref={maskotRef}
        className="relative w-[300px] h-[220px] opacity-0 mb-12"
      >
        <Image
          src="/assets/hero/maskot.svg"
          alt="Maskot"
          fill
          sizes="300px"
          className="object-contain"
        />
      </div>

      <div className="flex items-center gap-3">
        <span
          ref={loadingTextRef}
          className="text-soft-white text-5xl font-body tracking-wider opacity-0"
        >
          Loading
        </span>
        <span
          ref={dotsRef}
          className="text-electric-blue text-5xl font-body opacity-0"
        >
          ...
        </span>
      </div>

      <span
        ref={phraseRef}
        className="mt-5 px-6 text-center text-sm font-poppins tracking-wide text-muted-text md:text-base"
      >
        {phrase}
      </span>

      <div className="mt-6 h-1 w-52 overflow-hidden rounded-full bg-white/10 md:w-72">
        <div
          ref={progressRef}
          className="h-full rounded-full bg-gradient-to-r from-electric-blue via-cosmic-purple to-supernova-orange"
          style={{ width: "0%" }}
        />
      </div>
    </div>
  );
}
