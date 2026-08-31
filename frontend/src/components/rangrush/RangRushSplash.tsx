'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { rangRushAudio } from '@/utils/rangrushAudio';
import { Sparkles, Play } from 'lucide-react';

interface RangRushSplashProps {
  onEnter: () => void;
}

export const RangRushSplash: React.FC<RangRushSplashProps> = ({ onEnter }) => {
  useEffect(() => {
    // Play splash intro jingle on render
    const timer = setTimeout(() => {
      rangRushAudio.playSplashIntroJingle();
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const handleStart = () => {
    rangRushAudio.playButtonClick();
    rangRushAudio.startMusic();
    onEnter();
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#0a0a0c] text-ivory overflow-hidden p-6 select-none">
      {/* Background Mandala & Ambient Lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/20 via-charcoal to-black opacity-80 pointer-events-none" />
      <div className="absolute h-[500px] w-[500px] rounded-full border border-gold/10 animate-pulse pointer-events-none" />
      <div className="absolute h-[300px] w-[300px] rounded-full border border-bronze/20 pointer-events-none opacity-40" />

      {/* Main Studio Intro Presentation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="relative z-10 flex flex-col items-center text-center max-w-xl mx-auto"
      >
        {/* Studio Branding Tag */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 bg-gold/5 backdrop-blur-md mb-8"
        >
          <Sparkles size={14} className="text-gold animate-pulse" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-gold">
            Presented by Srishti Studios
          </span>
        </motion.div>

        {/* Studio Emblem / Logo Graphic */}
        <motion.div
          initial={{ rotate: -180, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
          className="relative h-28 w-28 mb-8 flex items-center justify-center"
        >
          <div className="absolute inset-0 rounded-full border-2 border-gold/40 shadow-[0_0_40px_rgba(212,175,55,0.25)] animate-spin-slow" />
          <div className="h-20 w-20 rounded-full bg-gradient-to-br from-amber-600 via-amber-800 to-amber-950 flex items-center justify-center border border-gold/50 shadow-inner">
            <span className="text-3xl font-serif font-bold text-ivory tracking-tighter">
              S
            </span>
          </div>
        </motion.div>

        {/* Game Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-4xl sm:text-6xl font-serif font-light tracking-wide text-ivory leading-tight"
        >
          RANGRUSH
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="text-xs sm:text-sm font-light uppercase tracking-[0.4em] text-gold/80 mt-2 mb-10"
        >
          Elements of Srishti
        </motion.p>

        {/* Enter Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          onClick={handleStart}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group relative flex items-center gap-3 px-10 py-4 rounded bg-gradient-to-r from-amber-600 via-gold to-amber-500 text-charcoal font-bold text-xs uppercase tracking-[0.25em] shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:shadow-[0_0_45px_rgba(212,175,55,0.7)] transition-all"
        >
          <Play size={16} className="fill-current group-hover:translate-x-0.5 transition-transform" />
          Enter Experience
        </motion.button>

        <p className="mt-8 text-[10px] text-ivory/40 uppercase tracking-widest font-light">
          An Original Match-3 Puzzle Creation
        </p>
      </motion.div>
    </div>
  );
};

export default RangRushSplash;
