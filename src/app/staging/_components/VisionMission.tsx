"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useLandingPage } from "@/hooks/use-landing-page";
import { MISSIONS } from "@/constant";

export default function VisionMission() {
  const { containerVariants, itemVariants } = useLandingPage();

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Vision Card */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-1 glass-panel p-10 border-star-gold/20 relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-star-gold opacity-30" />
            <h3 className="font-heading text-2xl font-bold mb-6 text-star-gold">VISI</h3>
            <p className="text-soft-white text-lg leading-relaxed italic relative z-10">
              "Mewujudkan SAMBA TI sebagai ruang inkubasi visioner yang mengantarkan mahasiswa baru menuju Zenith potensi mereka."
            </p>
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-star-gold/10 rounded-full blur-3xl group-hover:bg-star-gold/20 transition-colors" />
          </motion.div>

          {/* Mission Cards Wrapper */}
          <div className="lg:col-span-2 flex flex-col">
            <motion.div variants={itemVariants} className="mb-6 flex items-center space-x-4">
              <h3 className="font-heading text-2xl font-bold text-electric-blue">MISI</h3>
              <div className="h-px flex-grow bg-white/10" />
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {MISSIONS.map((mission, idx) => (
              <motion.div 
                key={idx}
                variants={itemVariants}
                whileHover={{ scale: 1.02, x: 5 }}
                className="glass-panel p-6 flex items-start space-x-4 border-white/5 hover:border-electric-blue/30 transition-all cursor-default"
              >
                <div className="mt-1 w-6 h-6 rounded-full bg-electric-blue/20 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-electric-blue" />
                </div>
                <p className="text-soft-white/80 font-medium">{mission}</p>
              </motion.div>
            ))}
          </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
