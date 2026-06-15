"use client";

import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { Cloud, Zap, Sun, Star, ChevronLeft, ChevronRight, Target } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";

import { PHASES as phases } from "@/constant";
import PhaseModal from "./PhaseModal";
import { NebulaVisual, FusionVisual, SupernovaVisual, ZenithVisual } from "./PhaseVisuals";

export default function JourneyTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const rocketControls = useAnimation();

  const getRocketPos = (idx: number) => `calc(${(idx / (phases.length - 1)) * 100}% - 24px)`;

  const nextPhase = async () => {
    if (activeIndex === phases.length - 1) {
      // Loop Forward: Fly Right -> Re-enter Left
      await rocketControls.start({
        left: "120%",
        opacity: 0,
        transition: { duration: 0.4, ease: "easeIn" }
      });
      setActiveIndex(0);
      rocketControls.set({ left: "-20%", opacity: 0 });
      await rocketControls.start({
        left: getRocketPos(0),
        opacity: 1,
        transition: { type: "spring", stiffness: 100, damping: 20 }
      });
    } else {
      const nextIdx = activeIndex + 1;
      setActiveIndex(nextIdx);
      rocketControls.start({
        left: getRocketPos(nextIdx),
        transition: { type: "spring", stiffness: 100, damping: 20 }
      });
    }
  };

  const prevPhase = async () => {
    if (activeIndex === 0) {
      // Loop Backward: Fly Left -> Re-enter Right
      await rocketControls.start({
        left: "-20%",
        opacity: 0,
        transition: { duration: 0.4, ease: "easeIn" }
      });
      setActiveIndex(phases.length - 1);
      rocketControls.set({ left: "120%", opacity: 0 });
      await rocketControls.start({
        left: getRocketPos(phases.length - 1),
        opacity: 1,
        transition: { type: "spring", stiffness: 100, damping: 20 }
      });
    } else {
      const nextIdx = activeIndex - 1;
      setActiveIndex(nextIdx);
      rocketControls.start({
        left: getRocketPos(nextIdx),
        transition: { type: "spring", stiffness: 100, damping: 20 }
      });
    }
  };

  const handleMarkerClick = (idx: number) => {
    setActiveIndex(idx);
    rocketControls.start({
      left: getRocketPos(idx),
      transition: { type: "spring", stiffness: 100, damping: 20 }
    });
  };

  useEffect(() => {
    if (isModalOpen) return;
    const timer = setInterval(() => {
      nextPhase();
    }, 5000);
    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, isModalOpen]);

  const activePhase = phases[activeIndex];

  return (
    <section id="journey" className="py-32 px-6 relative overflow-hidden bg-midnight-navy/10">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-4xl md:text-6xl font-black mb-4 uppercase tracking-tighter">
              FASE <span className="text-gradient-blue-purple">EVOLUSI</span>
            </h2>
            <div className="h-1.5 w-24 bg-electric-blue/30 mx-auto rounded-full mb-6"></div>
            <p className="text-muted-text max-w-xl mx-auto text-lg">
              Witness the transformation from a stardust collective to the highest point of brilliance.
            </p>
          </motion.div>
        </div>

        {/* Main Content Area */}
        <div className="p-8 md:p-12 bg-midnight-navy/20 backdrop-blur-sm relative overflow-hidden mb-16 rounded-[3rem]">


          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            {/* Left: Visual State */}
            <div className="relative aspect-square max-w-[350px] mx-auto w-full flex items-center justify-center pointer-events-none">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePhase.id}
                  initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 1.1, rotate: 10 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="relative w-full h-full flex items-center justify-center"
                >
                  {/* Decorative Glow */}
                  <div 
                    className="absolute inset-10 rounded-full opacity-20"
                    style={{ background: `radial-gradient(circle, ${activePhase.accent} 0%, transparent 70%)` }}
                  />

                  {activePhase.id === "nebula" && <NebulaVisual color={activePhase.accent} secondary={activePhase.secondary} />}
                  {activePhase.id === "fusion" && <FusionVisual color={activePhase.accent} secondary={activePhase.secondary} />}
                  {activePhase.id === "supernova" && <SupernovaVisual color={activePhase.accent} secondary={activePhase.secondary} />}
                  {activePhase.id === "zenith" && <ZenithVisual color={activePhase.accent} secondary={activePhase.secondary} />}


                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right: Description */}
            <div className="flex flex-col">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`text-${activePhase.id}`}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="inline-flex items-center space-x-3 mb-6">
                    <span className="font-heading font-bold text-electric-blue tracking-[0.4em] text-sm uppercase px-4 py-1.5 rounded-full bg-electric-blue/10 border border-electric-blue/20">
                      {activePhase.phase}
                    </span>
                    <div className="h-px w-12 bg-white/10" />
                  </div>
                  
                  <h3 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-normal text-soft-white">
                    {activePhase.title}
                  </h3>
                  
                  <p className="text-muted-text leading-relaxed text-lg md:text-xl mb-10 border-l-4 pl-6" style={{ borderColor: activePhase.accent }}>
                    {activePhase.meaning}
                  </p>

                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="relative z-30 inline-flex items-center space-x-3 px-6 py-3 bg-electric-blue/10 hover:bg-electric-blue/20 border border-electric-blue/30 rounded-full transition-all group cursor-pointer"
                  >
                     <span className="font-heading font-bold text-sm tracking-widest text-electric-blue group-hover:text-soft-white transition-colors uppercase">
                       Lihat Detail Fase
                     </span>
                     <svg className="w-4 h-4 text-electric-blue group-hover:text-soft-white transition-colors group-hover:translate-x-1 duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </button>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Bottom Step Loader with Rocket */}
        <div className="max-w-4xl mx-auto relative px-20 md:px-28">
          {/* Navigation Buttons */}
          <button 
            onClick={prevPhase}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 hover:border-electric-blue transition-all group z-20"
          >
            <ChevronLeft className="group-hover:-translate-x-1 transition-transform" />
          </button>

          <button 
            onClick={nextPhase}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 hover:border-electric-blue transition-all group z-20"
          >
            <ChevronRight className="group-hover:translate-x-1 transition-transform" />
          </button>

          {/* The Step Loader Track */}
          <div className="relative h-24 flex items-center justify-between">
            {/* Track Line */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-white/5 rounded-full overflow-hidden">
               <motion.div 
                 initial={{ width: "0%" }}
                 animate={{ width: `${(activeIndex / (phases.length - 1)) * 100}%` }}
                 transition={{ duration: 0.5 }}
                 className="h-full bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-400"
               />
            </div>

            {/* Step Markers */}
            {phases.map((phase, idx) => (
              <div 
                key={phase.id}
                onClick={() => handleMarkerClick(idx)}
                className="relative z-10 cursor-pointer flex flex-col items-center"
              >
                <div 
                  className={`w-6 h-6 rounded-full border-2 transition-all duration-500 ${
                    activeIndex >= idx ? 'bg-midnight-navy border-electric-blue shadow-[0_0_15px_rgba(56,189,248,0.5)]' : 'bg-midnight-navy border-white/10'
                  }`}
                />
                <span className={`absolute top-full mt-4 font-heading font-bold text-[10px] tracking-widest transition-colors ${
                  activeIndex === idx ? 'text-electric-blue' : 'text-white/20'
                }`}>
                  {phase.title}
                </span>
              </div>
            ))}

            {/* Flying Rocket Indicator */}
            <motion.div 
              initial={{ left: "calc(0% - 24px)" }}
              animate={rocketControls}
              className="absolute top-1/2 -translate-y-1/2 z-20 flex flex-col items-center"
              style={{ pointerEvents: 'none' }}
            >
              <div className="relative flex items-center justify-center rotate-90 scale-110">
                {/* The Rocket */}
                <div className="relative z-10 w-12 h-12">
                  <Image 
                    src="/rocket.png" 
                    alt="Rocket"
                    fill
                    className="object-contain drop-shadow-[0_0_10px_rgba(56,189,248,0.5)]"
                  />
                </div>
                
                {/* The Fire/Thruster */}
                <motion.div 
                  animate={{ 
                    height: ["15px", "30px", "20px"],
                    opacity: [0.8, 1, 0.7]
                  }}
                  transition={{ duration: 0.2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3 rounded-b-full bg-gradient-to-t from-transparent via-orange-500 to-yellow-300 blur-[2px] origin-top"
                />
                {/* Outer Glow of Thruster */}
                <motion.div 
                  animate={{ 
                    height: ["25px", "45px", "30px"],
                    opacity: [0.4, 0.7, 0.3]
                  }}
                  transition={{ duration: 0.2, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
                  className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-5 rounded-b-full bg-gradient-to-t from-transparent via-red-500 to-orange-400 blur-md origin-top"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Phase Details Modal */}
      <AnimatePresence>
        <PhaseModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          activePhase={activePhase} 
        />
      </AnimatePresence>
    </section>
  );
}


