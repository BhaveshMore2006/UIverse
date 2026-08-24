import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import spaceBg from '../assets/space_bg.jpg';

export default function CosmicBackground() {
  // Generate random stars once
  const stars = useMemo(() => {
    return Array.from({ length: 150 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.5 + 0.1,
      duration: Math.random() * 5 + 5,
      delay: Math.random() * 5,
    }));
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#03050F] z-0 pointer-events-none">
      
      {/* Base Image Layer */}
      <img 
        src={spaceBg} 
        alt="Cosmic Background" 
        className="absolute inset-0 w-full h-full object-cover opacity-90 z-0 mix-blend-screen"
      />

      {/* Overlay gradient to blend bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/40 to-[#050505] z-0" />

      {/* Dynamic Starfield Overlaid */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white z-10"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
          }}
          animate={{
            opacity: [star.opacity, star.opacity * 2.5, star.opacity],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Nebula / Atmospheric Haze Overlaid */}
      <motion.div 
        initial={{ opacity: 0.2 }}
        animate={{ opacity: 0.4, scale: 1.05 }}
        transition={{ duration: 15, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/4 w-[60vw] h-[60vw] bg-purple-600/10 rounded-full blur-[120px] mix-blend-screen z-10"
      />
      <motion.div 
        initial={{ opacity: 0.1 }}
        animate={{ opacity: 0.3, scale: 1.1 }}
        transition={{ duration: 20, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-1/3 right-1/4 w-[50vw] h-[50vw] bg-blue-600/10 rounded-full blur-[100px] mix-blend-screen z-10"
      />

    </div>
  );
}
