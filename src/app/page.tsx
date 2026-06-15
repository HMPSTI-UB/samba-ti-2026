"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CosmicBackground from "@/components/CosmicBackground";
import StarBackground from "@/components/StarBackground";
import FlyingRocket from "@/components/FlyingRocket";

export default function ComingSoon() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Target: August 22, 2026
    const targetDate = new Date("2026-08-22T00:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    // Initial call to avoid 1-second delay
    const now = new Date().getTime();
    const distance = targetDate - now;
    if (distance > 0) {
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }

    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <CosmicBackground />
      <StarBackground />
      <FlyingRocket />
      
      <div className="z-10 flex flex-col items-center justify-center p-6 text-center w-full max-w-7xl mx-auto">
        {/* Glow behind the logo/title */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-electric-blue/20 blur-[120px] rounded-full -z-10" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex flex-col items-center"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border border-electric-blue/30 bg-electric-blue/10 text-electric-blue text-xs md:text-sm font-bold tracking-[0.3em] uppercase mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-electric-blue opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-electric-blue"></span>
            </span>
            <span>SAMBA TI 2026</span>
          </div>

          <h1 className="font-heading font-black text-6xl md:text-8xl lg:text-[7rem] tracking-tighter mb-16 leading-[0.9] text-soft-white uppercase">
            COMING <span className="text-gradient-blue-purple drop-shadow-[0_0_30px_rgba(56,189,248,0.5)]">SOON</span>
          </h1>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 w-full max-w-4xl mx-auto">
            {/* Days */}
            <div className="flex flex-col items-center">
              <div className="w-full aspect-square md:w-28 md:h-28 rounded-2xl glass-panel border border-white/20 flex items-center justify-center mb-4 relative overflow-hidden shadow-[0_0_30px_rgba(56,189,248,0.1)]">
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent" />
                <span className="font-heading text-4xl md:text-5xl font-black text-soft-white relative z-10 drop-shadow-md">
                  {timeLeft.days}
                </span>
              </div>
              <span className="text-electric-blue font-bold tracking-widest uppercase text-xs md:text-sm">Hari</span>
            </div>
            
            {/* Hours */}
            <div className="flex flex-col items-center">
              <div className="w-full aspect-square md:w-28 md:h-28 rounded-2xl glass-panel border border-white/20 flex items-center justify-center mb-4 relative overflow-hidden shadow-[0_0_30px_rgba(56,189,248,0.1)]">
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent" />
                <span className="font-heading text-4xl md:text-5xl font-black text-soft-white relative z-10 drop-shadow-md">
                  {timeLeft.hours.toString().padStart(2, '0')}
                </span>
              </div>
              <span className="text-electric-blue font-bold tracking-widest uppercase text-xs md:text-sm">Jam</span>
            </div>
            
            {/* Minutes */}
            <div className="flex flex-col items-center">
              <div className="w-full aspect-square md:w-28 md:h-28 rounded-2xl glass-panel border border-white/20 flex items-center justify-center mb-4 relative overflow-hidden shadow-[0_0_30px_rgba(56,189,248,0.1)]">
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent" />
                <span className="font-heading text-4xl md:text-5xl font-black text-soft-white relative z-10 drop-shadow-md">
                  {timeLeft.minutes.toString().padStart(2, '0')}
                </span>
              </div>
              <span className="text-electric-blue font-bold tracking-widest uppercase text-xs md:text-sm">Menit</span>
            </div>
            
            {/* Seconds */}
            <div className="flex flex-col items-center">
              <div className="w-full aspect-square md:w-28 md:h-28 rounded-2xl glass-panel border-electric-blue/30 flex items-center justify-center mb-4 relative overflow-hidden shadow-[0_0_40px_rgba(56,189,248,0.3)]">
                <div className="absolute inset-0 bg-gradient-to-b from-electric-blue/10 to-transparent" />
                <motion.span 
                  key={timeLeft.seconds}
                  initial={{ opacity: 0.5, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="font-heading text-4xl md:text-5xl font-black text-electric-blue relative z-10 drop-shadow-[0_0_15px_rgba(56,189,248,0.8)]"
                >
                  {timeLeft.seconds.toString().padStart(2, '0')}
                </motion.span>
              </div>
              <span className="text-electric-blue font-bold tracking-widest uppercase text-xs md:text-sm animate-pulse">Detik</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.main>
  );
}
