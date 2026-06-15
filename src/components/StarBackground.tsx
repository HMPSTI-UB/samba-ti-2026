"use client";

import { useEffect, useState } from "react";

export default function StarBackground() {
  const [starShadows, setStarShadows] = useState({ small: "", medium: "", large: "" });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Generate a long string of box-shadow coordinates
    const generateStars = (count: number) => {
      let shadows = "";
      for (let i = 0; i < count; i++) {
        const x = Math.floor(Math.random() * 2000);
        const y = Math.floor(Math.random() * 2000);
        shadows += `${x}px ${y}px #FFF${i < count - 1 ? ", " : ""}`;
      }
      return shadows;
    };

    setStarShadows({
      small: generateStars(400),
      medium: generateStars(150),
      large: generateStars(50),
    });
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-deep-space pointer-events-none">
      <style dangerouslySetInnerHTML={{__html: `
        .stars-small { width: 1px; height: 1px; background: transparent; box-shadow: ${starShadows.small}; animation: animStar 100s linear infinite; }
        .stars-small:after { content: " "; position: absolute; top: 2000px; width: 1px; height: 1px; background: transparent; box-shadow: ${starShadows.small}; }
        
        .stars-medium { width: 2px; height: 2px; background: transparent; box-shadow: ${starShadows.medium}; animation: animStar 150s linear infinite; }
        .stars-medium:after { content: " "; position: absolute; top: 2000px; width: 2px; height: 2px; background: transparent; box-shadow: ${starShadows.medium}; }
        
        .stars-large { width: 3px; height: 3px; background: transparent; box-shadow: ${starShadows.large}; animation: animStar 200s linear infinite; }
        .stars-large:after { content: " "; position: absolute; top: 2000px; width: 3px; height: 3px; background: transparent; box-shadow: ${starShadows.large}; }
        
        @keyframes animStar {
          from { transform: translateY(0px); }
          to { transform: translateY(-2000px); }
        }
      `}} />
      
      {/* 3 Lightweight DOM elements animating hundreds of stars via GPU box-shadow */}
      <div className="stars-small"></div>
      <div className="stars-medium"></div>
      <div className="stars-large"></div>

      {/* Grid Lines */}
      <div 
        className="absolute inset-0 opacity-[0.02]" 
        style={{ 
          backgroundImage: 'linear-gradient(rgba(56, 189, 248, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(56, 189, 248, 0.2) 1px, transparent 1px)',
          backgroundSize: '100px 100px'
        }} 
      />

      {/* Static Nebulas for depth without heavy blur/parallax calculations */}
      <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-cosmic-purple/20 rounded-full blur-[150px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-electric-blue/10 rounded-full blur-[150px]" />
    </div>
  );
}
