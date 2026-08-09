"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { cn } from "@/lib/cn";
import Reveal from "@/components/common/reveal";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

// Urutan: part1 → part2 → part3 → full logo (full di akhir trail)
const LOGOS = [
  {
    img: "/assets/hero/logos/part1.svg",
    title: "BENTUK SEGITIGA UTAMA & PANAH PUTIH KE ATAS",
    desc: "Menggambarkan “The Ascent to Zenith” atau pendakian menuju Zenith. Secara keseluruhan ini melambangkan proses, dorongan, serta ambisi mahasiswa baru untuk untuk menuju titik tertinggi.",
  },
  {
    img: "/assets/hero/logos/part2.svg",
    title: "LINGKARAN ORBITAL",
    desc: "Melambangkan garis edar planet atau batasan atmosfer kosmis. Ini melambangkan ruang lingkup global dan fleksibilitas ilmu Teknologi Informasi yang sangat luas. Lingkaran ini menjaga agar evolusi mahasiswa tetap berada di jalur (orbit) yang benar.",
  },
  {
    img: "/assets/hero/logos/part3.svg",
    title: "BINTANG EMPAT SUDUT DI PUNCAK LINGKARAN",
    desc: "Melambangkan pencapaian puncak (Zenith) sekaligus representasi dari “Supernova”. Keempat sudut bintang melambangkan empat arah mata angin. Artinya, bintang ini siap memancarkan dampak positif dan membawa pengaruh besar bagi dunia luar ke segala penjuru.",
  },
  {
    img: "/logo.png",
    title: "LOGO SAMBA TI ZENITH 2026",
    desc: "Identitas visual yang memadukan seluruh elemen filosofis — segitiga pendakian, lingkaran orbital, dan bintang supernova — dalam satu kesatuan yang menggambarkan perjalanan mahasiswa baru menuju puncak potensinya sebagai New IT Heroes.",
  },
];

// Posisi titik di lintasan (persen dari kolom kanan), sesuai titik ganti deskripsi
const DOTS = [
  { left: "67.7%", top: "21.8%" },
  { left: "48.9%", top: "40.9%" },
  { left: "38.3%", top: "61.2%" },
  { left: "73.5%", top: "80.7%" },
];

export default function Logo() {
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const maskotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.to(maskotRef.current, {
        motionPath: {
          path: "#filosofi-trail",
          align: "#filosofi-trail",
          alignOrigin: [0.5, 0.5],
        },
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          onUpdate: (self) => {
            const p = self.progress;
            let idx = 0;
            if (p >= 0.27 && p < 0.5) idx = 1;
            else if (p >= 0.5 && p < 0.76) idx = 2;
            else if (p >= 0.76) idx = 3;
            if (idx !== activeRef.current) {
              activeRef.current = idx;
              setActive(idx);
            }
          },
        },
      });
    }, sectionRef);

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      window.removeEventListener("load", onLoad);
      ctx.revert();
    };
  }, []);

  return (
    <section className="py-10 md:py-20">
      <Reveal from="bottom">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white font-poppins tracking-wide leading-9 md:leading-20 text-left">
            Filosofi Logo SAMBA TI Zenith 2026
          </h2>
        </div>
      </Reveal>

      {/* ===== Mobile fallback (< md): stack + badge ===== */}
      <div className="md:hidden mx-auto max-w-7xl px-5 mt-8">
        <div className="relative w-full max-w-xs mx-auto aspect-square">
          {LOGOS.map((logo, i) => {
            const isActive = active === i;
            return (
              <div
                key={logo.title}
                className={cn(
                  "absolute inset-0 flex items-center justify-center transition-opacity duration-500",
                  isActive ? "opacity-100 z-30" : "opacity-0 z-10",
                )}
              >
                <Image src={logo.img} width={300} height={300} alt={logo.title} className="w-32 h-32 object-contain" />
              </div>
            );
          })}
        </div>
        <div className="mt-6 flex justify-center gap-3">
          {LOGOS.map((logo, i) => (
            <button
              key={logo.title}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "h-10 w-10 rounded-full border text-sm font-bold transition-colors",
                active === i ? "bg-electric-blue text-black border-electric-blue" : "border-white/20 text-muted-text",
              )}
            >
              {String(i + 1).padStart(2, "0")}
            </button>
          ))}
        </div>
        <div className="mt-5 text-center">
          <h5 className="text-lg font-bold text-blue-600">{LOGOS[active].title}</h5>
          <p className="mt-3 text-sm text-white">{LOGOS[active].desc}</p>
        </div>
      </div>

      {/* ===== Desktop parallax trail (md+) ===== */}
      <div className="hidden md:block">
        <div ref={sectionRef} className="relative h-[400vh] mt-20">
          <div className="sticky top-0 h-screen overflow-hidden flex items-center px-10">
            {/* KIRI — stack logo + teks di bawah */}
            <div className="w-1/2 flex flex-col items-center justify-center gap-8">
              <div className="relative w-[300px] aspect-square">
                {LOGOS.map((logo, i) => {
                  const isActive = active === i;
                  return (
                    <div
                      key={logo.title}
                      className={cn(
                        "absolute inset-0 flex items-center justify-center transition-opacity duration-500",
                        isActive ? "opacity-100 z-30" : "opacity-0 z-10",
                      )}
                    >
                      <Image src={logo.img} width={300} height={300} alt={logo.title} className="w-44 h-44 object-contain" />
                    </div>
                  );
                })}
              </div>

              <div className="text-center max-w-md">
                <h5 className="text-xl md:text-2xl font-bold text-blue-600">
                  {LOGOS[active].title}
                </h5>
                <p className="mt-3 text-sm md:text-base text-white">
                  {LOGOS[active].desc}
                </p>
              </div>
            </div>

            {/* KANAN — trail + maskot (dekoratif) */}
            <div className="w-1/2 relative h-full">
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 800" preserveAspectRatio="none" aria-hidden="true">
                <path
                  id="filosofi-trail"
                  d="M 105 80 C 105 160, 150 160, 150 240 C 150 320, 55 320, 55 420 C 55 520, 150 520, 150 620 C 150 680, 105 700, 105 720"
                  fill="none"
                  stroke="rgba(255,255,255,0.55)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray="7 9"
                />
              </svg>

              {/* maskot meluncur */}
              <div
                ref={maskotRef}
                className="absolute"
                style={{ left: "52%", top: "10%", transform: "translate(-50%, -50%)" }}
              >
                <Image src="/assets/hero/maskot.svg" width={64} height={48} alt="Zuno" className="w-16 h-12 object-contain drop-shadow-[0_0_12px_rgba(56,189,248,0.7)]" />
              </div>

              {/* titik ganti deskripsi */}
              {LOGOS.map((logo, i) => (
                <div
                  key={logo.title}
                  className={cn(
                    "absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-500",
                    active === i
                      ? "w-4 h-4 bg-electric-blue shadow-[0_0_12px_rgba(56,189,248,0.9)]"
                      : "w-2.5 h-2.5 bg-electric-blue/40",
                  )}
                  style={{ left: DOTS[i].left, top: DOTS[i].top }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
