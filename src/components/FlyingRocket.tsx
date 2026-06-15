"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function FlyingRocket() {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110vmin] h-[110vmin] pointer-events-none z-0">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="w-full h-full relative"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 flex items-center justify-center">
          {/* Rocket Container, rotated to face tangent to the circle */}
          <div className="relative rotate-90 scale-75 md:scale-100">
            {/* The Rocket */}
            <div className="relative z-10 w-16 h-16 md:w-24 md:h-24">
              <Image
                src="/rocket.png"
                alt="Flying Rocket"
                fill
                className="object-contain drop-shadow-[0_0_15px_rgba(56,189,248,0.5)]"
              />
            </div>

            {/* The Fire/Thruster */}
            <motion.div
              animate={{
                height: ["30px", "50px", "35px"],
                opacity: [0.8, 1, 0.7]
              }}
              transition={{ duration: 0.2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-4 rounded-b-full bg-gradient-to-t from-transparent via-orange-500 to-yellow-300 blur-[2px] origin-top"
            />
            {/* Outer Glow of Thruster */}
            <motion.div
              animate={{
                height: ["40px", "70px", "50px"],
                opacity: [0.4, 0.7, 0.3]
              }}
              transition={{ duration: 0.2, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
              className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-8 rounded-b-full bg-gradient-to-t from-transparent via-red-500 to-orange-400 blur-md origin-top"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
