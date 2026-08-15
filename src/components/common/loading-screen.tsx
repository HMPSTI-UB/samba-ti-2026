"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const loadingTextRef = useRef<HTMLSpanElement>(null);
  const dotsRef = useRef<HTMLSpanElement>(null);
  const maskotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(overlayRef.current, { opacity: 0 });
      onComplete();
      return;
    }

    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .fromTo(loadingTextRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 })
        .to(dotsRef.current, { opacity: 1, duration: 0.2 })
        .to(dotsRef.current, {
          opacity: 0.3,
          duration: 0.5,
          repeat: 2,
          yoyo: true,
          ease: "sine.inOut",
        })
        .fromTo(
          maskotRef.current,
          { x: 1200, rotation: -25, opacity: 1 },
          { x: 0, rotation: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        )
        .to(maskotRef.current, {
          x: 30,
          duration: 0.5,
          repeat: 1,
          yoyo: true,
          ease: "sine.inOut",
        })
        .to(maskotRef.current, {
          x: -1200,
          rotation: -25,
          duration: 0.7,
          ease: "power2.in",
        })
        .to(overlayRef.current, {
          opacity: 0,
          duration: 0.3,
          onComplete,
        });
    }, overlayRef);

    return () => {
      ctx.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center pointer-events-none"
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
    </div>
  );
}
