'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const MandalaDivider: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`flex items-center justify-center w-full my-12 opacity-60 px-4 ${className}`}>
      {/* Left Symmetric Line */}
      <div className="h-[0.5px] flex-1 bg-gradient-to-r from-transparent via-bronze/40 to-bronze/60 max-w-xs md:max-w-md" />

      {/* Symmetrical Mandala Center SVG */}
      <motion.div 
        initial={{ rotate: 0 }}
        whileInView={{ rotate: 45 }}
        viewport={{ once: true }}
        transition={{ duration: 2, ease: 'easeOut' }}
        className="mx-4 flex items-center justify-center flex-shrink-0"
      >
        <svg
          width="48"
          height="48"
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-bronze"
        >
          {/* Outer Octagon/Circle */}
          <circle cx="50" cy="50" r="45" strokeOpacity="0.3" strokeDasharray="3 3" />
          
          {/* Nested Geometric squares forming star symmetry */}
          <rect x="25" y="25" width="50" height="50" strokeOpacity="0.6" />
          <rect x="25" y="25" width="50" height="50" transform="rotate(45 50 50)" strokeOpacity="0.6" />
          
          {/* Inner concentric loops */}
          <circle cx="50" cy="50" r="22" strokeOpacity="0.8" />
          <circle cx="50" cy="50" r="10" strokeOpacity="1" />
          
          {/* Radial axis lines */}
          <line x1="50" y1="5" x2="50" y2="95" strokeOpacity="0.4" />
          <line x1="5" y1="50" x2="95" y2="50" strokeOpacity="0.4" />
        </svg>
      </motion.div>

      {/* Right Symmetric Line */}
      <div className="h-[0.5px] flex-1 bg-gradient-to-l from-transparent via-bronze/40 to-bronze/60 max-w-xs md:max-w-md" />
    </div>
  );
};
export default MandalaDivider;
