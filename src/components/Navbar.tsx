"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[92%] max-w-6xl z-50">
      <div className="glass-panel px-6 py-3 flex items-center justify-between border-white/10 bg-midnight-navy/60 backdrop-blur-2xl shadow-[0_0_30px_rgba(56,189,248,0.1)]">
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 bg-gradient-to-br from-electric-blue to-cosmic-purple rounded-xl flex items-center justify-center shadow-lg shadow-electric-blue/20 group-hover:scale-110 transition-transform">
            <span className="font-heading font-bold text-white text-xl">Z</span>
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-bold text-xl tracking-tighter text-soft-white leading-none">ZENITH</span>
            <span className="text-[8px] tracking-[0.3em] text-electric-blue font-bold uppercase">SAMBA TI 2026</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-1">
          {[
            { name: "Home", href: "/" },
            { name: "Journey", href: "#journey" },
            { name: "Schedule", href: "#schedule" },
          ].map((item) => (
            <Link 
              key={item.name} 
              href={item.href} 
              className="px-4 py-2 text-sm text-soft-white/70 hover:text-electric-blue hover:bg-white/5 rounded-full transition-all font-heading tracking-wide"
            >
              {item.name}
            </Link>
          ))}
          <div className="w-px h-6 bg-white/10 mx-2" />
          <Link href="/portal" className="btn-primary py-2 px-6 text-sm shadow-none hover:shadow-[0_0_20px_rgba(56,189,248,0.3)] font-heading font-bold tracking-wide">
            Masuk Portal
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/5 transition-colors text-soft-white"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="absolute top-full left-0 w-full mt-4 glass-panel border-white/10 bg-midnight-navy/90 backdrop-blur-2xl p-6 flex flex-col space-y-4 md:hidden overflow-hidden"
          >
            {/* Decoration Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-electric-blue/20 blur-[60px] -z-10" />
            
            <Link href="/" onClick={() => setIsOpen(false)} className="text-soft-white text-lg font-heading font-medium hover:text-electric-blue transition-colors">Home</Link>
            <Link href="#journey" onClick={() => setIsOpen(false)} className="text-soft-white text-lg font-heading font-medium hover:text-electric-blue transition-colors">Journey</Link>
            <Link href="#schedule" onClick={() => setIsOpen(false)} className="text-soft-white text-lg font-heading font-medium hover:text-electric-blue transition-colors">Schedule</Link>
            <Link href="/portal" onClick={() => setIsOpen(false)} className="btn-primary text-center py-3 font-heading font-bold tracking-wide">Masuk Portal</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
