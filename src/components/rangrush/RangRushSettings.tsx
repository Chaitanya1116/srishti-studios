'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { rangRushAudio } from '@/utils/rangrushAudio';
import { Settings, ArrowLeft, Volume2, VolumeX, Music, RotateCcw } from 'lucide-react';
import { SoundSettings } from '@/types/rangrush';
import { RangRushStorage } from '@/utils/rangrushStorage';

interface RangRushSettingsProps {
  settings: SoundSettings;
  onUpdateSettings: (newSettings: SoundSettings) => void;
  onBackToMenu: () => void;
}

export const RangRushSettings: React.FC<RangRushSettingsProps> = ({
  settings,
  onUpdateSettings,
  onBackToMenu
}) => {
  const toggleSound = () => {
    rangRushAudio.playButtonClick();
    const updated = { ...settings, soundEnabled: !settings.soundEnabled };
    rangRushAudio.setSoundEnabled(updated.soundEnabled);
    onUpdateSettings(updated);
  };

  const toggleMusic = () => {
    rangRushAudio.playButtonClick();
    const updated = { ...settings, musicEnabled: !settings.musicEnabled };
    rangRushAudio.setMusicEnabled(updated.musicEnabled);
    onUpdateSettings(updated);
  };

  const toggleMotion = () => {
    rangRushAudio.playButtonClick();
    const updated = { ...settings, reducedMotion: !settings.reducedMotion };
    onUpdateSettings(updated);
  };

  const handleResetData = () => {
    if (confirm('Are you sure you want to reset all game progress, stars, and high scores?')) {
      rangRushAudio.playButtonClick();
      RangRushStorage.resetAllData();
      alert('Game progress reset successfully.');
      onBackToMenu();
    }
  };

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
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-gold">Preferences</span>
          <h2 className="text-2xl font-serif text-ivory">Game Settings</h2>
        </div>
        <div className="w-24" />
      </div>

      <div className="flex-1 max-w-md w-full mx-auto flex flex-col justify-center py-12">
        <div className="space-y-4 rounded-lg border border-bronze/20 bg-forest/5 p-6 backdrop-blur-sm shadow-xl">
          {/* Sound Toggle */}
          <div className="flex items-center justify-between p-4 rounded border border-bronze/10 bg-charcoal/60">
            <span className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-ivory">
              {settings.soundEnabled ? <Volume2 size={18} className="text-gold" /> : <VolumeX size={18} className="text-ivory/40" />}
              Sound Effects
            </span>
            <button
              onClick={toggleSound}
              className={`px-4 py-1.5 rounded text-xs font-bold tracking-widest transition-all ${
                settings.soundEnabled ? 'bg-gold text-charcoal' : 'bg-charcoal border border-ivory/20 text-ivory/40'
              }`}
            >
              {settings.soundEnabled ? 'ON' : 'OFF'}
            </button>
          </div>

          {/* Music Toggle */}
          <div className="flex items-center justify-between p-4 rounded border border-bronze/10 bg-charcoal/60">
            <span className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-ivory">
              <Music size={18} className={settings.musicEnabled ? 'text-gold' : 'text-ivory/40'} />
              Background Music
            </span>
            <button
              onClick={toggleMusic}
              className={`px-4 py-1.5 rounded text-xs font-bold tracking-widest transition-all ${
                settings.musicEnabled ? 'bg-gold text-charcoal' : 'bg-charcoal border border-ivory/20 text-ivory/40'
              }`}
            >
              {settings.musicEnabled ? 'ON' : 'OFF'}
            </button>
          </div>

          {/* Reduced Motion Toggle */}
          <div className="flex items-center justify-between p-4 rounded border border-bronze/10 bg-charcoal/60">
            <span className="text-xs font-bold uppercase tracking-wider text-ivory">
              Reduced Motion
            </span>
            <button
              onClick={toggleMotion}
              className={`px-4 py-1.5 rounded text-xs font-bold tracking-widest transition-all ${
                settings.reducedMotion ? 'bg-gold text-charcoal' : 'bg-charcoal border border-ivory/20 text-ivory/40'
              }`}
            >
              {settings.reducedMotion ? 'ON' : 'OFF'}
            </button>
          </div>

          {/* Reset Game Progress */}
          <div className="pt-6 border-t border-bronze/10">
            <button
              onClick={handleResetData}
              className="w-full flex items-center justify-center gap-2 py-3 rounded border border-red-900/40 bg-red-950/20 text-red-400 font-bold text-xs uppercase tracking-wider hover:bg-red-900/40 transition-colors"
            >
              <RotateCcw size={14} /> Reset All Game Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RangRushSettings;
