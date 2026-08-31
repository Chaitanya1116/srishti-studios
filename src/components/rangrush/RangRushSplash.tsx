'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { rangRushAudio } from '@/utils/rangrushAudio';
import { Sparkles, Play, ShieldCheck } from 'lucide-react';

interface RangRushSplashProps {
  onEnter: () => void;
}

export const RangRushSplash: React.FC<RangRushSplashProps> = ({ onEnter }) => {
  const [showStudioIntro, setShowStudioIntro] = useState(true);

  useEffect(() => {
    // Play splash intro jingle on render
    const timer = setTimeout(() => {
      rangRushAudio.playSplashIntroJingle();
    }, 300);

    // Transition from studio intro to game title presentation after 2 seconds
    const introTimer = setTimeout(() => {
      setShowStudioIntro(false);
    }, 2200);

    return () => {
      clearTimeout(timer);
      clearTimeout(introTimer);
    };
  }, []);

  const handleStart = () => {
    rangRushAudio.playButtonClick();
    rangRushAudio.startMusic();
    onEnter();
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-between bg-[#070709] text-ivory overflow-hidden p-6 select-none">
      {/* Background Ambient Lighting & Mandala Rings */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-950/30 via-charcoal to-black opacity-90 pointer-events-none" />
      <div className="absolute h-[650px] w-[650px] rounded-full border border-gold/10 animate-pulse pointer-events-none" />
      <div className="absolute h-[400px] w-[400px] rounded-full border border-bronze/20 pointer-events-none opacity-30" />

      {/* Top Header Studio Identity Bar */}
      <div className="relative z-20 w-full max-w-4xl flex items-center justify-between py-2">
        <div className="flex items-center gap-2">
          <div className="relative h-7 w-24">
            <Image
              src="/LOGO.png"
              alt="Srishti Studios Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
        <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-gold/80 flex items-center gap-1.5">
          <Sparkles size={12} className="text-gold animate-pulse" />
          Powered by Srishti Studios
        </span>
      </div>

      {/* Main Center Presentation */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center max-w-2xl mx-auto my-auto w-full">
        {showStudioIntro ? (
          /* CINEMATIC STUDIO INTRO CARD */
          <motion.div
            key="studio-intro"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col items-center"
          >
            <span className="text-[11px] uppercase tracking-[0.4em] font-bold text-gold/80 mb-6 bg-gold/5 border border-gold/20 px-4 py-1.5 rounded-full backdrop-blur-sm">
              POWERED BY
            </span>

            {/* Glowing Studio Logo Badge */}
            <div className="relative h-28 w-64 my-4 flex items-center justify-center">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-600/20 via-gold/10 to-amber-600/20 blur-xl animate-pulse" />
              <Image
                src="/LOGO.png"
                alt="Srishti Studios Official Logo"
                fill
                className="object-contain filter drop-shadow-[0_0_25px_rgba(212,175,55,0.4)]"
                priority
              />
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif font-light text-ivory tracking-widest mt-6">
              SRISHTI STUDIOS
            </h2>
            <p className="text-[10px] uppercase tracking-[0.35em] text-sandstone mt-2 font-light">
              Interactive Digital Creations
            </p>
          </motion.div>
        ) : (
          /* GAME TITLE & PLAY LAUNCH CARD */
          <motion.div
            key="game-intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col items-center w-full"
          >
            {/* Powered By Badge */}
            <div className="flex items-center gap-2.5 px-5 py-2 rounded-full border border-gold/30 bg-charcoal/80 backdrop-blur-md mb-6 shadow-lg">
              <div className="relative h-5 w-16">
                <Image
                  src="/LOGO.png"
                  alt="Srishti Studios Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="h-3 w-[1px] bg-gold/40" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">
                Powered by Srishti Studios
              </span>
            </div>

            {/* Elemental Symbols Ring */}
            <div className="flex gap-3 mb-4">
              <span className="text-2xl animate-bounce" style={{ animationDelay: '0s' }}>🔥</span>
              <span className="text-2xl animate-bounce" style={{ animationDelay: '0.1s' }}>💧</span>
              <span className="text-2xl animate-bounce" style={{ animationDelay: '0.2s' }}>🌿</span>
              <span className="text-2xl animate-bounce" style={{ animationDelay: '0.3s' }}>⚡</span>
              <span className="text-2xl animate-bounce" style={{ animationDelay: '0.4s' }}>🌙</span>
              <span className="text-2xl animate-bounce" style={{ animationDelay: '0.5s' }}>☀️</span>
            </div>

            {/* Game Title */}
            <h1 className="text-5xl sm:text-7xl font-serif font-light tracking-wide text-ivory leading-none">
              RANGRUSH
            </h1>
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.45em] text-gold mt-2 mb-10">
              Elements of Srishti
            </p>

            {/* Enter Button */}
            <motion.button
              onClick={handleStart}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="group relative flex items-center gap-3 px-10 py-4.5 rounded bg-gradient-to-r from-amber-600 via-gold to-amber-500 text-charcoal font-bold text-xs uppercase tracking-[0.25em] shadow-[0_0_35px_rgba(212,175,55,0.45)] hover:shadow-[0_0_50px_rgba(212,175,55,0.75)] transition-all cursor-pointer"
            >
              <Play size={18} className="fill-current group-hover:translate-x-0.5 transition-transform" />
              Enter Game Experience
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Bottom Footer Powered By Branding */}
      <div className="relative z-20 w-full max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-bronze/10 text-center">
        <div className="flex items-center gap-2">
          <div className="relative h-5 w-16">
            <Image
              src="/LOGO.png"
              alt="Srishti Studios Logo"
              fill
              className="object-contain opacity-70"
            />
          </div>
          <span className="text-[10px] text-ivory/50 uppercase tracking-widest font-light">
            Powered by Srishti Studios
          </span>
        </div>

        <div className="flex items-center gap-2 text-[10px] text-ivory/40 uppercase tracking-widest font-light">
          <ShieldCheck size={12} className="text-gold/60" />
          <span>Official Released Game Build</span>
        </div>
      </div>
    </div>
  );
};

export default RangRushSplash;
