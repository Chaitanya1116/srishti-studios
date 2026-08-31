'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { RANGRUSH_LEVELS, LevelConfig } from '@/types/rangrush';
import { rangRushAudio } from '@/utils/rangrushAudio';
import { Lock, Star, ArrowLeft, Play, ShieldAlert } from 'lucide-react';

interface RangRushLevelSelectProps {
  unlockedLevel: number;
  levelStars: Record<number, number>;
  bestScores: Record<number, number>;
  onSelectLevel: (level: LevelConfig) => void;
  onBackToMenu: () => void;
}

export const RangRushLevelSelect: React.FC<RangRushLevelSelectProps> = ({
  unlockedLevel,
  levelStars,
  bestScores,
  onSelectLevel,
  onBackToMenu
}) => {
  return (
    <div className="relative min-h-screen w-full flex flex-col bg-charcoal text-ivory p-6 select-none">
      {/* Header */}
      <div className="w-full max-w-6xl mx-auto flex items-center justify-between py-4 border-b border-bronze/10">
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
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-gold">Level Select</span>
          <h2 className="text-2xl font-serif text-ivory">Elements Map</h2>
        </div>
        <div className="w-24" /> {/* Spacer */}
      </div>

      {/* 20 Levels Grid */}
      <div className="flex-1 max-w-6xl w-full mx-auto py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {RANGRUSH_LEVELS.map((level) => {
            const isUnlocked = level.id <= unlockedLevel;
            const stars = levelStars[level.id] || 0;
            const bestScore = bestScores[level.id] || 0;

            return (
              <motion.div
                key={level.id}
                whileHover={isUnlocked ? { scale: 1.04 } : {}}
                whileTap={isUnlocked ? { scale: 0.96 } : {}}
                onClick={() => {
                  if (isUnlocked) {
                    rangRushAudio.playButtonClick();
                    onSelectLevel(level);
                  }
                }}
                className={`relative flex flex-col justify-between p-4 rounded-lg border transition-all duration-300 ${
                  isUnlocked
                    ? 'border-bronze/30 bg-forest/20 cursor-pointer hover:border-gold hover:shadow-[0_0_20px_rgba(212,175,55,0.15)]'
                    : 'border-bronze/10 bg-charcoal/40 opacity-50 cursor-not-allowed'
                }`}
              >
                {/* Level Number & Status Indicator */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-serif font-bold text-gold">
                    LEVEL {level.id < 10 ? `0${level.id}` : level.id}
                  </span>
                  {isUnlocked ? (
                    stars > 0 ? (
                      <span className="text-[10px] bg-gold/10 text-gold px-2 py-0.5 rounded font-bold">
                        ✓ DONE
                      </span>
                    ) : (
                      <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded font-bold">
                        READY
                      </span>
                    )
                  ) : (
                    <Lock size={14} className="text-ivory/40" />
                  )}
                </div>

                {/* Level Title */}
                <h3 className="text-xs font-serif font-light text-ivory line-clamp-1 mb-2">
                  {level.title}
                </h3>

                {/* Stars Rating Display */}
                <div className="flex items-center gap-1 mb-3">
                  {[1, 2, 3].map((starIndex) => (
                    <Star
                      key={starIndex}
                      size={14}
                      className={
                        starIndex <= stars
                          ? 'text-gold fill-gold shadow-sm'
                          : 'text-ivory/20'
                      }
                    />
                  ))}
                </div>

                {/* Stats Preview & Action */}
                <div className="pt-2 border-t border-bronze/10 flex items-center justify-between text-[10px] text-ivory/60">
                  <span>Moves: {level.moves}</span>
                  {isUnlocked ? (
                    <span className="text-gold font-bold flex items-center gap-0.5">
                      Play <Play size={10} className="fill-current" />
                    </span>
                  ) : (
                    <span>Locked</span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RangRushLevelSelect;
