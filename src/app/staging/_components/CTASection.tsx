"use client";

import { motion } from "framer-motion";


export default function CTASection() {
  return (
    <section className="py-32 px-6 text-center relative overflow-hidden">

      {/* Portal Wormhole Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] -z-10">
        <motion.div 
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-electric-blue)_0%,_transparent_70%)] opacity-20"
        />
        <motion.div 
          animate={{ 
            rotate: -360,
            scale: [1.2, 1, 1.2],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute inset-20 bg-[radial-gradient(circle_at_center,_var(--color-cosmic-purple)_0%,_transparent_70%)] opacity-10"
        />
      </div>
      
      <div className="max-w-4xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <div className="inline-block px-4 py-1 rounded-full border border-white/10 bg-white/5 mb-8">
             <span className="text-[10px] tracking-[0.4em] font-bold text-electric-blue uppercase">Final Objective</span>
          </div>
          
          <h2 className="font-heading text-5xl md:text-7xl font-black mb-10 leading-[1.1] tracking-tighter">
            YOUR FIRST MISSION AS A <br />
            <span className="text-gradient-blue-purple drop-shadow-[0_0_30px_rgba(56,189,248,0.3)]">NEW IT HERO</span> STARTS HERE.
          </h2>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8">
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(56,189,248,0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary px-12 py-5 text-xl relative overflow-hidden group font-heading font-bold"
            >
              <span className="relative z-10">Masuk Portal</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </motion.button>
            
            <button className="px-12 py-5 text-xl border border-white/10 rounded-full hover:bg-white/5 hover:border-white/30 transition-all font-heading font-bold">
              View Schedule
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
