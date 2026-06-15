import { motion } from "framer-motion";
import { Star } from "lucide-react";

export function NebulaVisual({ color, secondary }: { color: string; secondary: string }) {
  const xOffsets = [15, -20, 25, -10, 5, -25];
  const yOffsets = [-15, 20, -5, 25, -20, 10];

  return (
    <div className="relative w-full h-full">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ 
            x: [0, xOffsets[i % xOffsets.length], 0],
            y: [0, yOffsets[i % yOffsets.length], 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 6 + i, repeat: Infinity, ease: "linear" }}
          className="absolute rounded-full blur-[50px] opacity-20"
          style={{
            width: `${120 + i * 40}px`,
            height: `${120 + i * 40}px`,
            backgroundColor: i % 2 === 0 ? color : secondary,
            left: `${10 + i * 15}%`,
            top: `${10 + i * 10}%`,
          }}
        />
      ))}
    </div>
  );
}

export function FusionVisual({ color, secondary }: { color: string; secondary: string }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="w-4/5 h-4/5 border-2 border-dashed rounded-full"
        style={{ borderColor: color, opacity: 0.2 }}
      />
      <motion.div
        animate={{ scale: [1, 1.4, 1], rotate: -360 }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute w-1/2 h-1/2 border border-white/10 rounded-full flex items-center justify-center shadow-[0_0_60px_rgba(56,189,248,0.2)]"
      >
         <div className="w-1/4 h-1/4 rounded-full bg-white shadow-[0_0_40px_white]" />
      </motion.div>
      {[...Array(12)].map((_, i) => (
        <div key={i} className="absolute w-[1px] h-full bg-gradient-to-t from-transparent via-white/10 to-transparent" style={{ transform: `rotate(${i * 30}deg)` }} />
      ))}
    </div>
  );
}

export function SupernovaVisual({ color, secondary }: { color: string; secondary: string }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.div
        animate={{ scale: [1, 2.5, 1], opacity: [0.4, 0.1, 0.4] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute w-full h-full rounded-full blur-[70px]"
        style={{ backgroundColor: color }}
      />
      <div className="relative w-1/5 h-1/5 bg-white rounded-full shadow-[0_0_120px_white,0_0_60px_orange]" />
      {[...Array(16)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ scaleX: [0, 1.8, 0], opacity: [0, 0.8, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
          className="absolute h-[1px] w-[250px] origin-left"
          style={{ backgroundColor: secondary, transform: `rotate(${i * 22.5}deg) translateX(50px)`, boxShadow: `0 0 15px ${secondary}` }}
        />
      ))}
    </div>
  );
}

export function ZenithVisual({ color, secondary }: { color: string; secondary: string }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute w-full h-full border border-white/5 rounded-full"
      />
      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
          filter: ["blur(40px)", "blur(60px)", "blur(40px)"]
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="w-3/4 h-3/4 rounded-full bg-gradient-to-br from-star-gold to-electric-blue opacity-30"
      />
      <div className="relative z-10 text-star-gold">
         <Star className="w-20 h-20 filter drop-shadow-[0_0_30px_#FACC15]" fill="#FACC15" />
      </div>
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 8 + i * 2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border border-white/10 rounded-full"
          style={{ transform: `scale(${0.4 + i * 0.2})` }}
        />
      ))}
    </div>
  );
}
