"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import CosmicBackground from "@/components/CosmicBackground";

import FlyingRocket from "@/components/FlyingRocket";

export default function NotFound() {
  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* <CosmicBackground /> */}

      <FlyingRocket />
      
      <div className="z-10 flex flex-col items-center justify-center p-6 text-center w-full max-w-4xl mx-auto">
        {/* Glow behind the text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-500/10 blur-[120px] rounded-full -z-10" />

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

          <h1 className="font-heading font-black text-8xl md:text-[10rem] tracking-tighter mb-4 leading-none text-soft-white drop-shadow-[0_0_50px_rgba(255,255,255,0.2)]">
            404
          </h1>
          
          <h2 className="font-heading font-bold text-2xl md:text-4xl tracking-widest mb-12 text-gradient-blue-purple uppercase">
            Lost in Space
          </h2>

          <p className="text-muted-text text-lg md:text-xl max-w-lg mb-12 leading-relaxed">
            Sinyal terputus. Halaman atau koordinat yang Anda tuju tidak ditemukan di sektor galaksi ini.
          </p>

          <Link href="/">
            <button className="px-10 py-4 rounded-full border border-electric-blue/50 bg-electric-blue/10 hover:bg-electric-blue/20 text-electric-blue font-bold tracking-widest transition-all uppercase text-sm group relative overflow-hidden">
              <span className="relative z-10 flex items-center space-x-2">
                <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                <span>Kembali ke Pangkalan</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-electric-blue/0 via-electric-blue/10 to-electric-blue/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
            </button>
          </Link>
        </motion.div>
      </div>
    </motion.main>
  );
}
