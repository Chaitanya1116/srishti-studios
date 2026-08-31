'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { rangRushAudio } from '@/utils/rangrushAudio';
import { Play, Grid, Calendar, Award, Settings, ArrowLeft, Flame, Droplet, Leaf, Zap, Moon, Sun } from 'lucide-react';
import Link from 'next/link';

interface RangRushMenuProps {
  onPlayCurrentLevel: () => void;
  onOpenLevels: () => void;
  onOpenDaily: () => void;
  onOpenAchievements: () => void;
  onOpenSettings: () => void;
  unlockedLevel: number;
}

export const RangRushMenu: React.FC<RangRushMenuProps> = ({
  onPlayCurrentLevel,
  onOpenLevels,
  onOpenDaily,
  onOpenAchievements,
  onOpenSettings,
  unlockedLevel
}) => {
  const handleClick = (action: () => void) => {
    rangRushAudio.playButtonClick();
    action();
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-between bg-charcoal text-ivory p-6 overflow-hidden select-none">
      {/* Background Element Icons Decor */}
      <div className="absolute inset-0 pointer-events-none opacity-5 flex items-center justify-around">
        <Flame size={180} />
        <Droplet size={180} />
        <Leaf size={180} />
        <Zap size={180} />
        <Moon size={180} />
        <Sun size={180} />
      </div>

      {/* Top Header & Studio Link */}
      <div className="relative z-10 w-full max-w-4xl flex items-center justify-between py-4">
        <Link
          href="/games"
          onClick={() => rangRushAudio.playButtonClick()}
          className="flex items-center gap-2 px-4 py-2 rounded border border-ivory/20 bg-charcoal/80 text-[10px] uppercase font-bold tracking-widest text-ivory hover:border-gold hover:text-gold transition-all"
        >
          <ArrowLeft size={14} /> Srishti Games
        </Link>
        <span className="text-[10px] uppercase tracking-[0.25em] font-medium text-gold/80">
          Srishti Studios Portfolio
        </span>
      </div>

      {/* Main Center Menu Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex flex-col items-center text-center max-w-md w-full my-auto"
      >
        {/* Six Elemental Orbs Line */}
        <div className="flex gap-3 mb-6">
          <span className="text-xl animate-bounce" style={{ animationDelay: '0s' }}>🔥</span>
          <span className="text-xl animate-bounce" style={{ animationDelay: '0.1s' }}>💧</span>
          <span className="text-xl animate-bounce" style={{ animationDelay: '0.2s' }}>🌿</span>
          <span className="text-xl animate-bounce" style={{ animationDelay: '0.3s' }}>⚡</span>
          <span className="text-xl animate-bounce" style={{ animationDelay: '0.4s' }}>🌙</span>
          <span className="text-xl animate-bounce" style={{ animationDelay: '0.5s' }}>☀️</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-serif font-light text-ivory tracking-wide">
          RANGRUSH
        </h1>
        <p className="text-xs uppercase tracking-[0.35em] text-gold font-medium mt-1 mb-8">
          Elements of Srishti
        </p>

        {/* Menu Buttons Stack */}
        <div className="flex flex-col gap-3.5 w-full">
          {/* PLAY CURRENT UNLOCKED LEVEL */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleClick(onPlayCurrentLevel)}
            className="flex items-center justify-center gap-3 py-4 rounded bg-gradient-to-r from-amber-600 via-gold to-amber-500 text-charcoal font-bold text-xs uppercase tracking-[0.2em] shadow-lg hover:shadow-gold/20 transition-all"
          >
            <Play size={16} className="fill-current" /> PLAY (Level {unlockedLevel})
          </motion.button>

          {/* LEVELS */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleClick(onOpenLevels)}
            className="flex items-center justify-center gap-3 py-3.5 rounded border border-bronze/40 bg-charcoal/80 text-ivory font-bold text-xs uppercase tracking-[0.2em] hover:border-gold hover:text-gold transition-all"
          >
            <Grid size={15} /> LEVELS
          </motion.button>

          {/* DAILY CHALLENGE */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleClick(onOpenDaily)}
            className="flex items-center justify-center gap-3 py-3.5 rounded border border-bronze/40 bg-charcoal/80 text-ivory font-bold text-xs uppercase tracking-[0.2em] hover:border-gold hover:text-gold transition-all"
          >
            <Calendar size={15} /> DAILY CHALLENGE
          </motion.button>

          {/* ACHIEVEMENTS */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleClick(onOpenAchievements)}
            className="flex items-center justify-center gap-3 py-3.5 rounded border border-bronze/40 bg-charcoal/80 text-ivory font-bold text-xs uppercase tracking-[0.2em] hover:border-gold hover:text-gold transition-all"
          >
            <Award size={15} /> ACHIEVEMENTS
          </motion.button>

          {/* SETTINGS */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleClick(onOpenSettings)}
            className="flex items-center justify-center gap-3 py-3.5 rounded border border-bronze/40 bg-charcoal/80 text-ivory font-bold text-xs uppercase tracking-[0.2em] hover:border-gold hover:text-gold transition-all"
          >
            <Settings size={15} /> SETTINGS
          </motion.button>
        </div>
      </motion.div>

      {/* Footer Branding */}
      <div className="relative z-10 py-4 text-center">
        <span className="text-[10px] text-ivory/40 uppercase tracking-widest font-light">
          © Srishti Studios — All Rights Reserved
        </span>
      </div>
    </div>
  );
};

export default RangRushMenu;
