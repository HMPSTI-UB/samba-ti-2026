"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[92%] max-w-[90%] md:max-w-[50%] z-50">
      <div className="px-6 py-3 flex items-center justify-between">
        <Link href="/">
          <Image src="/logo.png" width={50} height={20} alt="SAMBA TI" />
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
              className="px-4 py-2 text-sm text-white hover:text-[#FACC15] rounded-full transition-all font-poppins tracking-wide"
            >
              {item.name}
            </Link>
          ))}
          <div className="w-px h-6 bg-white/10 mx-2" />
          <Link href="/app/dashboard" className="py-2 px-6 text-sm font-bold tracking-wide font-poppins rounded-full text-deep-space bg-[#FACC15] hover:bg-[#E6B800] transition-all shadow-[0_0_20px_rgba(250,204,21,0.3)]">
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
            
            <Link href="/" onClick={() => setIsOpen(false)} className="text-white text-lg font-poppins font-medium hover:text-[#FACC15] transition-colors">Home</Link>
            <Link href="#journey" onClick={() => setIsOpen(false)} className="text-white text-lg font-poppins font-medium hover:text-[#FACC15] transition-colors">Journey</Link>
            <Link href="#schedule" onClick={() => setIsOpen(false)} className="text-white text-lg font-poppins font-medium hover:text-[#FACC15] transition-colors">Schedule</Link>
            <Link href="/app/dashboard" onClick={() => setIsOpen(false)} className="text-center py-3 font-bold tracking-wide font-poppins rounded-full text-deep-space bg-[#FACC15] hover:bg-[#E6B800] transition-all shadow-[0_0_20px_rgba(250,204,21,0.3)]">Masuk Portal</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
