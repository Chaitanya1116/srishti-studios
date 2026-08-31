'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, RefreshCw, Play, Map, Volume2, VolumeX, Music } from 'lucide-react';
import { rangRushAudio } from '@/utils/rangrushAudio';

interface LevelCompleteModalProps {
  score: number;
  bestScore: number;
  stars: number;
  hasNextLevel: boolean;
  onNextLevel: () => void;
  onReplay: () => void;
  onLevelMap: () => void;
}

export const LevelCompleteModal: React.FC<LevelCompleteModalProps> = ({
  score,
  bestScore,
  stars,
  hasNextLevel,
  onNextLevel,
  onReplay,
  onLevelMap
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.85 }}
        className="w-full max-w-md rounded-lg border border-gold/40 bg-gradient-to-b from-[#181512] to-[#0d0c0a] p-8 text-center shadow-[0_0_50px_rgba(212,175,55,0.25)]"
      >
        <span className="text-[10px] uppercase tracking-[0.35em] font-semibold text-gold">
          Victory Attained
        </span>
        <h2 className="text-3xl font-serif text-ivory tracking-wide mt-1 mb-4">
          LEVEL COMPLETE!
        </h2>

        {/* Stars Animation */}
        <div className="flex justify-center items-center gap-3 my-6">
          {[1, 2, 3].map((starIdx) => (
            <motion.div
              key={starIdx}
              initial={{ opacity: 0, scale: 0, rotate: -45 }}
              animate={{
                opacity: starIdx <= stars ? 1 : 0.2,
                scale: starIdx <= stars ? 1.2 : 0.8,
                rotate: 0
              }}
              transition={{ delay: 0.2 * starIdx, duration: 0.5, type: 'spring' }}
            >
              <Star
                size={36}
                className={starIdx <= stars ? 'text-gold fill-gold drop-shadow-[0_0_12px_rgba(212,175,55,0.8)]' : 'text-ivory/20'}
              />
            </motion.div>
          ))}
        </div>

        {/* Score & Best Score Cards */}
        <div className="grid grid-cols-2 gap-4 my-6 p-4 rounded border border-bronze/20 bg-charcoal/60">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-ivory/50 block">Score</span>
            <span className="text-xl font-serif font-bold text-ivory">{score.toLocaleString()}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wider text-gold/80 block">Best Score</span>
            <span className="text-xl font-serif font-bold text-gold">{bestScore.toLocaleString()}</span>
          </div>
        </div>

        {/* Action Buttons Stack */}
        <div className="flex flex-col gap-3">
          {hasNextLevel && (
            <button
              onClick={() => {
                rangRushAudio.playButtonClick();
                onNextLevel();
              }}
              className="flex items-center justify-center gap-2 py-3.5 rounded bg-gradient-to-r from-amber-600 via-gold to-amber-500 text-charcoal font-bold text-xs uppercase tracking-widest shadow-md hover:scale-[1.02] transition-transform"
            >
              <Play size={14} className="fill-current" /> Next Level
            </button>
          )}

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => {
                rangRushAudio.playButtonClick();
                onReplay();
              }}
              className="flex items-center justify-center gap-2 py-3 rounded border border-bronze/30 bg-charcoal text-ivory text-xs font-bold uppercase tracking-wider hover:border-gold hover:text-gold transition-colors"
            >
              <RefreshCw size={14} /> Replay
            </button>

            <button
              onClick={() => {
                rangRushAudio.playButtonClick();
                onLevelMap();
              }}
              className="flex items-center justify-center gap-2 py-3 rounded border border-bronze/30 bg-charcoal text-ivory text-xs font-bold uppercase tracking-wider hover:border-gold hover:text-gold transition-colors"
            >
              <Map size={14} /> Level Map
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

interface GameOverModalProps {
  score: number;
  targetScore: number;
  onTryAgain: () => void;
  onLevelMap: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  score,
  targetScore,
  onTryAgain,
  onLevelMap
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.85 }}
        className="w-full max-w-md rounded-lg border border-red-900/40 bg-gradient-to-b from-[#181010] to-[#0a0606] p-8 text-center shadow-[0_0_50px_rgba(185,28,28,0.2)]"
      >
        <span className="text-[10px] uppercase tracking-[0.35em] font-semibold text-red-400">
          Move Limit Exceeded
        </span>
        <h2 className="text-3xl font-serif text-ivory tracking-wide mt-1 mb-4">
          OUT OF MOVES
        </h2>

        <div className="grid grid-cols-2 gap-4 my-6 p-4 rounded border border-red-900/20 bg-charcoal/60">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-ivory/50 block">Score</span>
            <span className="text-xl font-serif font-bold text-ivory">{score.toLocaleString()}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wider text-red-400 block">Target</span>
            <span className="text-xl font-serif font-bold text-red-400">{targetScore.toLocaleString()}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => {
              rangRushAudio.playButtonClick();
              onTryAgain();
            }}
            className="flex items-center justify-center gap-2 py-3.5 rounded bg-red-800 text-ivory font-bold text-xs uppercase tracking-widest hover:bg-red-700 transition-colors shadow-md"
          >
            <RefreshCw size={14} /> Try Again
          </button>

          <button
            onClick={() => {
              rangRushAudio.playButtonClick();
              onLevelMap();
            }}
            className="flex items-center justify-center gap-2 py-3.5 rounded border border-bronze/30 bg-charcoal text-ivory text-xs font-bold uppercase tracking-wider hover:border-gold hover:text-gold transition-colors"
          >
            <Map size={14} /> Level Map
          </button>
        </div>
      </motion.div>
    </div>
  );
};

interface PauseModalProps {
  soundOn: boolean;
  musicOn: boolean;
  onToggleSound: () => void;
  onToggleMusic: () => void;
  onResume: () => void;
  onRestart: () => void;
  onExit: () => void;
}

export const PauseModal: React.FC<PauseModalProps> = ({
  soundOn,
  musicOn,
  onToggleSound,
  onToggleMusic,
  onResume,
  onRestart,
  onExit
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm rounded-lg border border-bronze/30 bg-charcoal p-6 text-center shadow-2xl"
      >
        <h3 className="text-2xl font-serif text-ivory mb-6 tracking-wide">
          PAUSED
        </h3>

        {/* Sound & Music Controls */}
        <div className="flex flex-col gap-3 mb-6">
          <button
            onClick={onToggleSound}
            className="flex items-center justify-between p-3 rounded border border-bronze/20 bg-forest/10 text-xs font-bold uppercase tracking-wider text-ivory hover:border-gold transition-all"
          >
            <span className="flex items-center gap-2">
              {soundOn ? <Volume2 size={16} className="text-gold" /> : <VolumeX size={16} className="text-ivory/40" />}
              Sound Effects
            </span>
            <span className={soundOn ? 'text-gold font-bold' : 'text-ivory/40'}>
              {soundOn ? 'ON' : 'OFF'}
            </span>
          </button>

          <button
            onClick={onToggleMusic}
            className="flex items-center justify-between p-3 rounded border border-bronze/20 bg-forest/10 text-xs font-bold uppercase tracking-wider text-ivory hover:border-gold transition-all"
          >
            <span className="flex items-center gap-2">
              <Music size={16} className={musicOn ? 'text-gold' : 'text-ivory/40'} />
              Background Music
            </span>
            <span className={musicOn ? 'text-gold font-bold' : 'text-ivory/40'}>
              {musicOn ? 'ON' : 'OFF'}
            </span>
          </button>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2.5">
          <button
            onClick={() => {
              rangRushAudio.playButtonClick();
              onResume();
            }}
            className="py-3 rounded bg-gold text-charcoal font-bold text-xs uppercase tracking-widest hover:bg-ivory transition-colors"
          >
            Resume Game
          </button>

          <button
            onClick={() => {
              rangRushAudio.playButtonClick();
              onRestart();
            }}
            className="py-3 rounded border border-bronze/30 text-ivory font-bold text-xs uppercase tracking-widest hover:border-gold hover:text-gold transition-colors"
          >
            Restart Level
          </button>

          <button
            onClick={() => {
              rangRushAudio.playButtonClick();
              onExit();
            }}
            className="py-3 rounded border border-bronze/20 text-ivory/60 font-bold text-xs uppercase tracking-widest hover:text-white transition-colors"
          >
            Exit to Level Map
          </button>
        </div>
      </motion.div>
    </div>
  );
};
