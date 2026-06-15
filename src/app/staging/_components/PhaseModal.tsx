import { motion } from "framer-motion";
import { PHASES } from "@/constant";

type Phase = typeof PHASES[0];

interface PhaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  activePhase: Phase;
}

export default function PhaseModal({ isOpen, onClose, activePhase }: PhaseModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-midnight-navy/80 backdrop-blur-md"
      />

      {/* Modal Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-4xl bg-[#0B1026] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/80 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        {/* Image Section */}
        <div className="md:w-1/2 h-64 md:h-auto relative">
          <img src={activePhase.details.image} alt={activePhase.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0B1026] to-transparent" />
        </div>

        {/* Details Section */}
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative">
          <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full mb-4 self-start">
             <span className="text-[10px] tracking-widest font-bold text-electric-blue uppercase">{activePhase.phase}</span>
          </div>
          <h3 className="font-heading font-black text-3xl md:text-4xl text-soft-white mb-6 tracking-tight">
            {activePhase.title}
          </h3>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-full bg-electric-blue/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-electric-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </div>
              <div>
                <p className="text-sm text-muted-text font-bold uppercase tracking-wider mb-1">Schedule</p>
                <p className="text-soft-white">{activePhase.details.date}</p>
                <p className="text-soft-white/60 text-sm">{activePhase.details.time}</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-full bg-cosmic-purple/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-cosmic-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <div>
                <p className="text-sm text-muted-text font-bold uppercase tracking-wider mb-1">Venue</p>
                <p className="text-soft-white">{activePhase.details.venue}</p>
                <p className="text-soft-white/60 text-sm">{activePhase.details.address}</p>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10">
              <p className="text-sm text-muted-text font-bold uppercase tracking-wider mb-2">Activities Overview</p>
              <p className="text-soft-white/80 leading-relaxed text-sm">
                {activePhase.details.activities}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
