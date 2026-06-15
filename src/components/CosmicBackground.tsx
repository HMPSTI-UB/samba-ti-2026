"use client";

import { useEffect, useMemo, useState } from "react";
import Particles from "@tsparticles/react";
import {
  type Container,
  type ISourceOptions,
  MoveDirection,
  OutMode,
  tsParticles
} from "@tsparticles/engine";
import { loadFull } from "tsparticles";
import { motion, useScroll, useTransform } from "framer-motion";

export default function CosmicBackground() {
  const [init, setInit] = useState(false);
  const { scrollYProgress } = useScroll();

  // Parallax for nebula clouds
  const yNebula1 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const yNebula2 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  useEffect(() => {
    const initEngine = async () => {
      await loadFull(tsParticles);
      setInit(true);
    };
    
    initEngine();
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log(container);
  };

  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        color: {
          value: "transparent",
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "grab",
          },
        },
        modes: {
          grab: {
            distance: 140,
            links: {
              opacity: 0.5,
              color: "#38BDF8",
            },
          },
        },
      },
      particles: {
        color: {
          value: "#ffffff",
        },
        links: {
          color: "#ffffff",
          distance: 150,
          enable: false,
          opacity: 0.2,
          width: 1,
        },
        move: {
          direction: MoveDirection.none,
          enable: true,
          outModes: {
            default: OutMode.out,
          },
          random: true,
          speed: 0.5,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 160,
        },
        opacity: {
          animation: {
            enable: true,
            speed: 1,
            sync: false,
          },
          value: { min: 0.1, max: 0.8 },
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 3 },
        },
        twinkle: {
          particles: {
            enable: true,
            color: "#ffffff",
            frequency: 0.05,
            opacity: 1,
          },
        },
      },
      detectRetina: true,
    }),
    [],
  );

  return (
    <div className="fixed inset-0 -z-10 bg-[#050816]">
      {/* Parallax Nebula Clouds */}
      <motion.div 
        style={{ y: yNebula1 }}
        className="absolute top-[-20%] left-[-10%] w-[1000px] h-[1000px] bg-cosmic-purple/10 blur-[150px] rounded-full" 
      />
      <motion.div 
        style={{ y: yNebula2 }}
        className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-electric-blue/10 blur-[120px] rounded-full" 
      />
      <motion.div 
        style={{ y: yNebula1 }}
        className="absolute top-[30%] right-[10%] w-[600px] h-[600px] bg-cosmic-purple/5 blur-[180px] rounded-full" 
      />

      {init && (
        <Particles
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          options={options}
          className="absolute inset-0"
        />
      )}
      
      {/* Scanline Effect for Mission Control feel */}
      <div className="absolute inset-0 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" />
    </div>
  );
}
