"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, CheckCircle2, Zap, Rocket, Globe, ShieldCheck } from "lucide-react";

import { OUTCOMES as outcomes } from "@/constant";

export default function HeroOutcomes() {
  const [activeId, setActiveId] = useState(outcomes[0].id);

  const activeOutcome = outcomes.find(o => o.id === activeId) || outcomes[0];
  const ActiveIcon = activeOutcome.icon;

  return (
    <section className="py-24 px-6 bg-midnight-navy/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-4xl md:text-5xl font-black mb-4"
          >
            HERO <span className="text-supernova-orange">OUTCOMES</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-text max-w-lg mx-auto"
          >
            Setiap misi menghasilkan pencapaian baru bagi para IT Heroes untuk bersiap menghadapi tantangan masa depan.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Left: Interactive List */}
          <div className="lg:col-span-5 flex flex-col space-y-2">
            {outcomes.map((outcome, idx) => {
              const isActive = activeId === outcome.id;
              const Icon = outcome.icon;
              return (
                <button
                  key={outcome.id}
                  onMouseEnter={() => setActiveId(outcome.id)}
                  onClick={() => setActiveId(outcome.id)}
                  className={`relative flex items-center p-4 rounded-2xl transition-all duration-300 text-left group overflow-hidden ${
                    isActive ? "bg-white/10 border-white/20" : "hover:bg-white/5 border-transparent"
                  } border`}
                >
                  {/* Hover/Active Highlight Line */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl transition-all duration-300 ${
                    isActive ? "bg-electric-blue opacity-100" : "bg-white/20 opacity-0 group-hover:opacity-100"
                  }`} />
                  
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 transition-all duration-300 flex-shrink-0 ${
                    isActive ? "bg-midnight-navy shadow-lg" : "bg-white/5 group-hover:bg-white/10"
                  }`}>
                    <Icon className={`w-6 h-6 transition-colors duration-300 ${
                      isActive ? "text-soft-white" : "text-muted-text group-hover:text-soft-white"
                    }`} />
                  </div>
                  
                  <div>
                    <h3 className={`font-heading font-bold text-lg transition-colors duration-300 ${
                      isActive ? "text-soft-white" : "text-muted-text group-hover:text-soft-white"
                    }`}>
                      {outcome.title}
                    </h3>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Dynamic Display Card */}
          <div className="lg:col-span-7 relative h-[450px]">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-midnight-navy to-black rounded-[3rem] border border-white/5 overflow-hidden shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeOutcome.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center"
                >
                  {/* Decorative Background Blob */}
                  <div className={`absolute inset-0 opacity-20 bg-gradient-to-br ${activeOutcome.color} transition-all duration-700`} style={{ background: "radial-gradient(circle, currentColor 0%, transparent 70%)" }} />
                  
                  <div className={`w-32 h-32 rounded-3xl mb-8 flex items-center justify-center bg-white/5 backdrop-blur-xl border border-white/20 shadow-2xl relative z-10 ${activeOutcome.shadow}`}>
                    <ActiveIcon className="w-16 h-16 text-soft-white drop-shadow-lg" />
                  </div>
                  
                  <h3 className="font-heading font-black text-4xl md:text-5xl mb-6 tracking-tight text-soft-white relative z-10">
                    {activeOutcome.title}
                  </h3>
                  
                  <p className="text-xl leading-relaxed text-soft-white/80 max-w-xl relative z-10">
                    {activeOutcome.desc}
                  </p>

                  {/* Progress/Decorative Line */}
                  <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ x: "-100%" }}
                      animate={{ x: "0%" }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={`w-full h-full bg-gradient-to-r ${activeOutcome.color}`}
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
