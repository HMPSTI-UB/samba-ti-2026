"use client";

import { motion } from "framer-motion";
import { Shield, Brain, Heart, Users, Lightbulb, Code, Target, Award, ArrowRight } from "lucide-react";
import { MANIFESTO as manifesto } from "@/constant";

export default function About() {

  return (
    <section id="about" className="py-24 px-6 bg-midnight-navy/30">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="mb-8">
            <h2 className="font-heading text-4xl md:text-5xl font-black mb-2">
              ABOUT <span className="text-electric-blue">SAMBA TI</span>
            </h2>
            <p className="text-electric-blue/80 font-bold tracking-widest uppercase text-sm">
              Sambut Mahasiswa Baru TI Vokasi UB
            </p>
          </div>
          
          <p className="text-muted-text text-lg leading-relaxed mb-6 text-justify indent-8">
            <strong className="text-soft-white font-semibold">SAMBA TI</strong> adalah rangkaian kegiatan pengenalan kehidupan kampus bagi mahasiswa baru Program Studi Teknologi Informasi, Fakultas Vokasi, Universitas Brawijaya. Kegiatan ini dirancang khusus untuk menanamkan karakter, kebersamaan, dan fundamental akademik.
          </p>
          
          <p className="text-muted-text text-lg leading-relaxed mb-6 text-justify indent-8">
            Tahun ini, kami mengusung tema agung: <strong className="text-electric-blue font-semibold text-xl">ZENITH</strong>. Zenith adalah titik tertinggi di benda angkasa, melambangkan komitmen kami untuk mengantarkan para IT Heroes dari titik awal (Nebula) menuju potensi tertinggi dan paling bersinar mereka.
          </p>
          
          <p className="text-muted-text text-lg leading-relaxed text-justify indent-8">
            Setiap mahasiswa baru akan ditempa melewati serangkaian misi evolusi yang menantang dan inspiratif agar kelak menjadi inovator, <em className="text-soft-white not-italic">problem solver</em>, dan penggerak ekosistem digital di masa depan.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-panel p-8 md:p-12 relative overflow-hidden group perspective-1000"
        >
          {/* Animated Background Decor */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-electric-blue/10 rounded-full blur-[80px] group-hover:bg-electric-blue/20 transition-colors duration-700" />
          
          <div className="absolute top-0 right-0 p-4">
             <span className="text-electric-blue/20 font-heading font-black text-6xl group-hover:text-electric-blue/40 transition-colors">01</span>
          </div>
          
          <h3 className="font-heading text-2xl font-bold mb-8 flex items-center">
            <div className="w-10 h-10 rounded-lg bg-star-gold/20 flex items-center justify-center mr-4 group-hover:rotate-12 transition-transform">
              <Target className="text-star-gold w-6 h-6" />
            </div>
            NEW IT HEROES MANIFESTO
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {manifesto.map((item, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ 
                  scale: 1.05, 
                  rotateY: idx % 2 === 0 ? 5 : -5,
                  z: 50 
                }}
                className="flex items-center space-x-3 p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-electric-blue/10 hover:border-electric-blue/30 transition-all group/card cursor-pointer shadow-lg hover:shadow-electric-blue/10"
              >
                <div className="w-8 h-8 rounded-lg bg-midnight-navy border border-white/5 flex items-center justify-center group-hover/card:bg-electric-blue transition-colors">
                  <item.icon className="w-4 h-4 text-electric-blue group-hover/card:text-white transition-colors" />
                </div>
                <span className="font-semibold text-soft-white text-sm md:text-base">{item.label}</span>
              </motion.div>
            ))}
          </div>

          {/* Bottom Interactive Hint */}
          <div className="mt-10 flex items-center justify-center">
             <div className="h-1 w-24 bg-white/10 rounded-full relative overflow-hidden">
                <motion.div 
                  animate={{ x: [-100, 100] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-electric-blue to-transparent"
                />
             </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
