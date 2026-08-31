'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { rangRushAudio } from '@/utils/rangrushAudio';
import { Calendar, ArrowLeft, CheckCircle2, Award, Sparkles } from 'lucide-react';
import { RangRushStorage } from '@/utils/rangrushStorage';

interface RangRushDailyProps {
  onBackToMenu: () => void;
  onStartDaily: () => void;
}

export const RangRushDaily: React.FC<RangRushDailyProps> = ({ onBackToMenu, onStartDaily }) => {
  const isCompleted = RangRushStorage.isDailyCompletedToday();
  const todayStr = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

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
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-gold">Daily Challenge</span>
          <h2 className="text-2xl font-serif text-ivory">Elemental Trials</h2>
        </div>
        <div className="w-24" />
      </div>

      <div className="flex-1 max-w-xl w-full mx-auto flex flex-col items-center justify-center text-center py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full rounded-lg border border-gold/30 bg-forest/10 p-8 backdrop-blur-sm shadow-xl"
        >
          <div className="h-16 w-16 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold mx-auto mb-4">
            <Calendar size={32} />
          </div>

          <span className="text-xs uppercase tracking-widest text-sandstone font-medium block mb-1">
            {todayStr}
          </span>
          <h3 className="text-2xl font-serif text-ivory mb-4">
            Challenge of the Day
          </h3>

          <p className="text-xs text-ivory/70 leading-relaxed font-light mb-8 max-w-md mx-auto">
            Clear 30 Agni Fire tiles & achieve a 3,000 target score in 20 moves to claim today&apos;s daily bonus reward stars!
          </p>

          {isCompleted ? (
            <div className="flex items-center justify-center gap-2 p-4 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-xs uppercase tracking-wider">
              <CheckCircle2 size={18} /> Daily Trial Completed Today!
            </div>
          ) : (
            <button
              onClick={() => {
                rangRushAudio.playButtonClick();
                onStartDaily();
              }}
              className="w-full flex items-center justify-center gap-2 py-4 rounded bg-gradient-to-r from-amber-600 via-gold to-amber-500 text-charcoal font-bold text-xs uppercase tracking-[0.2em] shadow-lg hover:scale-[1.02] transition-transform"
            >
              <Sparkles size={16} /> Start Daily Trial
            </button>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default RangRushDaily;
