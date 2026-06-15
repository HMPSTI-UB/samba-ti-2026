import { motion } from "framer-motion";
import { Rocket, ChevronRight } from "lucide-react";
import HeroVisual from "./HeroVisual";


export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-36 md:pt-24 lg:pt-20 px-6 overflow-hidden">

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10"
        >
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-electric-blue/30 bg-electric-blue/10 text-electric-blue text-xs font-bold tracking-widest uppercase mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-electric-blue opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-electric-blue"></span>
            </span>
            <span>SAMBA TI 2026</span>
          </div>

          <h1 className="font-heading font-black text-6xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tighter mb-4">
            ZENITH
          </h1>
          <p className="font-heading text-xl md:text-2xl text-electric-blue font-bold tracking-widest uppercase mb-8">
            Zealous Evolution of New IT Heroes
          </p>
          
          <p className="text-muted-text text-lg max-w-lg mb-10 leading-relaxed">
            Dari Titik Awal Menuju Potensi Tertinggi. Perjalanan mahasiswa baru Teknologi Informasi untuk bertumbuh, ditempa, dan bersinar sebagai generasi IT Heroes yang baru.
          </p>

          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(56,189,248,0.4)" }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary flex items-center group relative overflow-hidden px-8 py-4"
            >
              <span className="relative z-10 flex items-center font-heading font-bold tracking-wider">
                Mulai Perjalanan
                <Rocket className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
            </motion.button>
            
            <motion.button 
              whileHover={{ x: 5 }}
              className="flex items-center text-soft-white font-heading font-bold tracking-wider hover:text-electric-blue transition-colors group px-6 py-4 border border-transparent hover:border-white/10 rounded-full"
            >
              Jelajahi Misi
              <ChevronRight className="ml-1 w-5 h-5 group-hover:translate-x-1 transition-transform text-electric-blue" />
            </motion.button>
          </div>
        </motion.div>

        {/* Right Visual (Dynamic Cosmic States) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative flex justify-center lg:justify-end"
        >
          <HeroVisual />
        </motion.div>
      </div>

      {/* Background Decor */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-deep-space to-transparent z-10" />
    </section>
  );
}
