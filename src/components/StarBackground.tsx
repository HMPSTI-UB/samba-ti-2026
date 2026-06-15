"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";

export default function StarBackground() {
  const [stars, setStars] = useState<{ id: number; top: string; left: string; size: number; delay: number; duration: number }[]>([]);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();

  // Parallax transforms
  const yNebula1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const yNebula2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const yStars = useTransform(scrollYProgress, [0, 1], [0, -50]);

  useEffect(() => {
    const starCount = 150;
    const newStars = Array.from({ length: starCount }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 0.5,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 2,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setStars(newStars);
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Nebula Blurs with Parallax */}
      <motion.div 
        style={{ y: yNebula1 }}
        className="nebula w-[800px] h-[800px] bg-cosmic-purple top-[-10%] left-[-10%] blur-[120px]" 
      />
      <motion.div 
        style={{ y: yNebula2 }}
        className="nebula w-[600px] h-[600px] bg-electric-blue bottom-[-10%] right-[-10%] blur-[100px]" 
      />
      <motion.div 
        style={{ y: yNebula1 }}
        className="nebula w-[500px] h-[500px] bg-star-gold top-[30%] left-[20%] opacity-5 blur-[150px]" 
      />

      {/* Stars with Parallax */}
      <motion.div style={{ y: yStars }} className="absolute inset-0">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            initial={{ opacity: 0.1 }}
            animate={{ opacity: [0.1, 0.8, 0.1] }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
            }}
            className="absolute bg-white rounded-full"
            style={{
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
              boxShadow: star.size > 1.5 ? "0 0 10px rgba(255, 255, 255, 0.5)" : "none",
            }}
          />
        ))}
      </motion.div>

      {/* Grid Lines */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{ 
          backgroundImage: `linear-gradient(rgba(56, 189, 248, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(56, 189, 248, 0.2) 1px, transparent 1px)`,
          backgroundSize: '100px 100px'
        }} 
      />
    </div>
  );
}
