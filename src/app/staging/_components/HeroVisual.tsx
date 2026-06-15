"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const states = [
  {
    id: "nebula",
    name: "NEBULA",
    color: "bg-cosmic-purple",
    glow: "shadow-cosmic-purple/40",
    accent: "#7C3AED",
    secondary: "#38BDF8",
  },
  {
    id: "fusion",
    name: "FUSION",
    color: "bg-electric-blue",
    glow: "shadow-electric-blue/40",
    accent: "#38BDF8",
    secondary: "#FACC15",
  },
  {
    id: "supernova",
    name: "SUPERNOVA",
    color: "bg-supernova-orange",
    glow: "shadow-supernova-orange/40",
    accent: "#FB923C",
    secondary: "#FACC15",
  },
];

export default function HeroVisual() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % states.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const active = states[index];

  return (
    <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={{ opacity: 0, scale: 0.8, rotate: -20, filter: "blur(20px)" }}
          animate={{ opacity: 1, scale: 1, rotate: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 1.1, rotate: 20, filter: "blur(20px)" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="relative w-full h-full flex items-center justify-center"
        >
          {/* Core Energy */}
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.6, 0.8, 0.6]
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className={`absolute w-1/2 h-1/2 rounded-full blur-[80px] ${active.color} opacity-60`}
          />

          {/* Form Specifics */}
          {active.id === "nebula" && <NebulaForm color={active.accent} secondary={active.secondary} />}
          {active.id === "fusion" && <FusionForm color={active.accent} secondary={active.secondary} />}
          {active.id === "supernova" && <SupernovaForm color={active.accent} secondary={active.secondary} />}

          {/* Central Label */}
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="px-4 py-1 rounded-full border border-white/10 bg-black/20 backdrop-blur-md">
                <span className="font-heading font-black text-[10px] tracking-[0.3em] text-white/50">{active.name}</span>
             </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Persistent Outer Rings */}
      <div className="absolute inset-[-40px] border border-white/5 rounded-full animate-[spin_20s_linear_infinite]" />
      <div className="absolute inset-[-80px] border border-white/5 rounded-full animate-[spin_35s_linear_infinite_reverse]" />
    </div>
  );
}

function NebulaForm({ color, secondary }: { color: string; secondary: string }) {
  return (
    <div className="relative w-full h-full">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ 
            x: [0, Math.random() * 40 - 20, 0],
            y: [0, Math.random() * 40 - 20, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 5 + i, repeat: Infinity, ease: "linear" }}
          className="absolute rounded-full blur-[40px] opacity-30"
          style={{
            width: `${100 + i * 40}px`,
            height: `${100 + i * 40}px`,
            backgroundColor: i % 2 === 0 ? color : secondary,
            left: `${20 + i * 10}%`,
            top: `${20 + i * 5}%`,
          }}
        />
      ))}
    </div>
  );
}

function FusionForm({ color, secondary }: { color: string; secondary: string }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="w-3/4 h-3/4 border-2 border-dashed rounded-full"
        style={{ borderColor: color, opacity: 0.3 }}
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], rotate: -360 }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute w-1/2 h-1/2 border border-white/20 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(56,189,248,0.3)]"
      >
         <div className="w-1/3 h-1/3 rounded-full bg-white shadow-[0_0_30px_white]" />
      </motion.div>
      {/* Energy Beams */}
      {[...Array(8)].map((_, i) => (
        <div 
          key={i}
          className="absolute w-[2px] h-full bg-gradient-to-t from-transparent via-white/20 to-transparent"
          style={{ transform: `rotate(${i * 45}deg)` }}
        />
      ))}
    </div>
  );
}

function SupernovaForm({ color, secondary }: { color: string; secondary: string }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Central Burst */}
      <motion.div
        animate={{ scale: [1, 2, 1], opacity: [0.5, 0.2, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute w-full h-full rounded-full blur-[60px]"
        style={{ backgroundColor: color }}
      />
      <div className="relative w-1/4 h-1/4 bg-white rounded-full shadow-[0_0_100px_white,0_0_50px_orange]" />
      
      {/* Radiation Lines */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: [0, 1.5, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
          className="absolute h-[1px] w-[200px] origin-left"
          style={{ 
            backgroundColor: secondary, 
            transform: `rotate(${i * 30}deg) translateX(40px)`,
            boxShadow: `0 0 10px ${secondary}`
          }}
        />
      ))}
    </div>
  );
}
