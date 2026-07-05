"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";


export default function ComingSoonPage() {
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const timerRef = useRef<HTMLDivElement>(null);
  const secondsBoxRef = useRef<HTMLDivElement>(null);
  const glowRingRef = useRef<HTMLDivElement>(null);

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const badge = badgeRef.current;
    const title = titleRef.current;
    const tagline = taglineRef.current;
    const cards = timerRef.current?.querySelectorAll(".countdown-card");
    const glow = glowRingRef.current;

    if (!badge || !title || !tagline || !cards || !glow) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(badge, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 })
        .fromTo(title, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 }, "-=0.4")
        .fromTo(tagline, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.5")
        .fromTo(cards, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.15 }, "-=0.3");

      gsap.to(glow, { rotation: 360, duration: 25, repeat: -1, ease: "none" });
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!secondsBoxRef.current) return;
    gsap.fromTo(
      secondsBoxRef.current,
      { scale: 1.08, borderColor: "rgba(251, 146, 60, 0.5)" },
      {
        scale: 1,
        borderColor: "rgba(251, 146, 60, 0.3)",
        duration: 0.35,
        ease: "power2.out",
        overwrite: "auto",
      },
    );
  }, [timeLeft.seconds]);

  useEffect(() => {
    const target = new Date("2026-08-22T00:00:00").getTime();
    const update = () => {
      const d = target - Date.now();
      if (d < 0) return;
      setTimeLeft({
        days: Math.floor(d / 86400000),
        hours: Math.floor((d % 86400000) / 3600000),
        minutes: Math.floor((d % 3600000) / 60000),
        seconds: Math.floor((d % 60000) / 1000),
      });
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n: number) => n.toString().padStart(2, "0");

  const cards = [
    { label: "Hari", value: timeLeft.days },
    { label: "Jam", value: pad(timeLeft.hours) },
    { label: "Menit", value: pad(timeLeft.minutes) },
  ];
  const secondsValue = pad(timeLeft.seconds);

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="fixed inset-0 bg-gradient-to-br from-deep-space via-midnight-navy to-deep-space pointer-events-none" />

      <div
        ref={glowRingRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] md:w-[900px] aspect-square pointer-events-none"
      >
        <div
          className="absolute inset-0 rounded-full blur-[120px] opacity-40"
          style={{
            background:
              "conic-gradient(from 0deg, rgba(124,58,237,0.3), rgba(56,189,248,0.2), rgba(124,58,237,0.3), rgba(251,146,60,0.15), rgba(124,58,237,0.3))",
          }}
        />
      </div>

      <div className="absolute top-[10%] right-[5%] w-72 h-72 bg-cosmic-purple/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[15%] left-[3%] w-96 h-96 bg-electric-blue/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[35%] right-[20%] w-48 h-48 bg-supernova-orange/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center justify-center p-6 text-center w-full max-w-4xl mx-auto">
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2.5 px-5 py-1.5 rounded-full border border-electric-blue/30 bg-electric-blue/10 text-electric-blue text-xs md:text-sm font-bold tracking-[0.3em] uppercase mb-8 md:mb-10"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-electric-blue opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-electric-blue" />
          </span>
          SAMBA TI 2026
        </div>

        <h1
          ref={titleRef}
          className="font-heading font-black text-5xl sm:text-6xl md:text-7xl lg:text-[7rem] tracking-tighter leading-[0.9] text-soft-white uppercase"
        >
          COMING{" "}
          <span className="text-gradient-blue-purple drop-shadow-[0_0_40px_rgba(56,189,248,0.4)]">
            SOON
          </span>
        </h1>

        <p
          ref={taglineRef}
          className="mt-5 md:mt-6 text-muted-text text-sm md:text-lg max-w-lg leading-relaxed"
        >
          Prepare for the{" "}
          <span className="text-soft-white font-semibold">
            Zealous Evolution
          </span>{" "}
          of New IT Heroes
        </p>

        <div ref={timerRef} className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full max-w-2xl mx-auto">
          {cards.map((card) => (
            <div key={card.label} className="countdown-card flex flex-col items-center">
              <div className="w-full aspect-square md:w-28 md:h-28 rounded-2xl glass-panel border border-white/15 flex items-center justify-center relative overflow-hidden shadow-[0_0_30px_rgba(56,189,248,0.08)]">
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent" />
                <span className="font-heading text-4xl md:text-5xl font-black text-soft-white relative z-10 drop-shadow-md">
                  {card.value}
                </span>
              </div>
              <span className="mt-3 text-electric-blue font-bold tracking-widest uppercase text-xs md:text-sm">
                {card.label}
              </span>
            </div>
          ))}

          <div className="countdown-card flex flex-col items-center">
            <div
              ref={secondsBoxRef}
              className="w-full aspect-square md:w-28 md:h-28 rounded-2xl glass-panel border border-supernova-orange/30 flex items-center justify-center relative overflow-hidden shadow-[0_0_30px_rgba(251,146,60,0.15)]"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-supernova-orange/10 to-transparent" />
              <span className="font-heading text-4xl md:text-5xl font-black text-supernova-orange relative z-10 drop-shadow-[0_0_15px_rgba(251,146,60,0.6)]">
                {secondsValue}
              </span>
            </div>
            <span className="mt-3 text-supernova-orange font-bold tracking-widest uppercase text-xs md:text-sm">
              Detik
            </span>
          </div>
        </div>


      </div>
    </main>
  );
}
