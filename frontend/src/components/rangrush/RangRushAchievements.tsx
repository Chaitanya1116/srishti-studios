'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { rangRushAudio } from '@/utils/rangrushAudio';
import { Award, ArrowLeft, CheckCircle } from 'lucide-react';
import { Achievement } from '@/types/rangrush';

interface RangRushAchievementsProps {
  achievements: Achievement[];
  onBackToMenu: () => void;
}

export const RangRushAchievements: React.FC<RangRushAchievementsProps> = ({ achievements, onBackToMenu }) => {
  return (
    <div className="relative min-h-screen w-full flex flex-col bg-charcoal text-ivory p-6 select-none">
      <div className="w-full max-w-4xl mx-auto flex items-center justify-between py-4 border-b border-bronze/10">
        <button
          onClick={() => {
            rangRushAudio.playButtonClick();
            onBackToMenu();
          }}
          className="flex items-center gap-2 px-4 py-2 rounded border border-ivory/20 bg-charcoal/80 text-[10px] uppercase font-bold tracking-widest text-ivory hover:border-gold hover:text-gold transition-all"
        >
          <ArrowLeft size={14} /> Main Menu
        </button>
        <div className="text-center">
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-gold">Hall of Triumphs</span>
          <h2 className="text-2xl font-serif text-ivory">Achievements</h2>
        </div>
        <div className="w-24" />
      </div>

      <div className="flex-1 max-w-4xl w-full mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((ach) => (
            <motion.div
              key={ach.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex items-start gap-4 p-5 rounded-lg border transition-all ${
                ach.unlocked
                  ? 'border-gold/40 bg-gold/5 shadow-[0_0_15px_rgba(212,175,55,0.1)]'
                  : 'border-bronze/10 bg-charcoal/50 opacity-60'
              }`}
            >
              <div className="text-3xl flex-shrink-0 p-2 rounded bg-charcoal border border-bronze/20">
                {ach.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-serif font-bold text-ivory">{ach.title}</h3>
                  {ach.unlocked && (
                    <span className="text-xs text-gold flex items-center gap-1 font-bold">
                      <CheckCircle size={14} /> Unlocked
                    </span>
                  )}
                </div>
                <p className="text-xs text-ivory/60 mt-1 font-light">{ach.description}</p>
                
                {/* Progress bar */}
                <div className="mt-3 w-full bg-charcoal rounded-full h-1.5 overflow-hidden border border-bronze/10">
                  <div
                    className="bg-gold h-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (ach.progress / ach.maxProgress) * 100)}%` }}
                  />
                </div>
                <span className="text-[10px] text-ivory/40 mt-1 block text-right font-mono">
                  {ach.progress} / {ach.maxProgress}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RangRushAchievements;
