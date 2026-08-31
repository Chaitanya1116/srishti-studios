'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MandalaDivider from '@/components/MandalaDivider';
import PageWrapper from '@/components/PageWrapper';
import { RANGRUSH_LEVELS, LevelConfig, SoundSettings, Achievement } from '@/types/rangrush';
import { RangRushStorage } from '@/utils/rangrushStorage';
import { rangRushAudio } from '@/utils/rangrushAudio';

import RangRushSplash from '@/components/rangrush/RangRushSplash';
import RangRushMenu from '@/components/rangrush/RangRushMenu';
import RangRushLevelSelect from '@/components/rangrush/RangRushLevelSelect';
import RangRushGameView from '@/components/rangrush/RangRushGameView';
import { LevelCompleteModal, GameOverModal, PauseModal } from '@/components/rangrush/RangRushModals';
import RangRushDaily from '@/components/rangrush/RangRushDaily';
import RangRushAchievements from '@/components/rangrush/RangRushAchievements';
import RangRushSettings from '@/components/rangrush/RangRushSettings';

import { ArrowLeft, Play, Cpu, Monitor, Download, ExternalLink, Flame, Droplet, Leaf, Zap, Moon, Sun, Sparkles } from 'lucide-react';

type ScreenState = 'SPLASH' | 'MENU' | 'LEVEL_SELECT' | 'GAME' | 'DAILY' | 'ACHIEVEMENTS' | 'SETTINGS';
type ModalState = 'NONE' | 'COMPLETE' | 'GAMEOVER' | 'PAUSE';

export default function RangRushPage() {
  const [interactiveMode, setInteractiveMode] = useState<boolean>(false);
  const [screen, setScreen] = useState<ScreenState>('SPLASH');
  const [modal, setModal] = useState<ModalState>('NONE');

  // Persistence States
  const [unlockedLevel, setUnlockedLevel] = useState<number>(1);
  const [levelStars, setLevelStars] = useState<Record<number, number>>({});
  const [bestScores, setBestScores] = useState<Record<number, number>>({});
  const [settings, setSettings] = useState<SoundSettings>({ soundEnabled: true, musicEnabled: true, reducedMotion: false });
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  // Current Active Level
  const [currentLevel, setCurrentLevel] = useState<LevelConfig>(RANGRUSH_LEVELS[0]);
  const [lastGameScore, setLastGameScore] = useState<number>(0);
  const [lastGameStars, setLastGameStars] = useState<number>(0);

  useEffect(() => {
    const unl = RangRushStorage.getUnlockedLevel();
    setUnlockedLevel(unl);
    setLevelStars(RangRushStorage.getLevelStars());
    setBestScores(RangRushStorage.getBestScores());
    const savedSettings = RangRushStorage.getSettings();
    setSettings(savedSettings);
    rangRushAudio.setSoundEnabled(savedSettings.soundEnabled);
    rangRushAudio.setMusicEnabled(savedSettings.musicEnabled);
    setAchievements(RangRushStorage.getAchievements());

    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('play') === 'true' || params.get('mode') === 'game') {
        const lev = RANGRUSH_LEVELS.find(l => l.id === unl) || RANGRUSH_LEVELS[0];
        setCurrentLevel(lev);
        setScreen('GAME');
        setInteractiveMode(true);
      }
    }
  }, []);

  // Launch direct gameplay mode
  const launchInteractiveGame = (startScreen: ScreenState = 'GAME', targetLevel?: LevelConfig) => {
    if (targetLevel) setCurrentLevel(targetLevel);
    setScreen(startScreen);
    setInteractiveMode(true);
  };

  // Handle Level Win
  const handleLevelComplete = (score: number, stars: number) => {
    setLastGameScore(score);
    setLastGameStars(stars);

    RangRushStorage.saveBestScore(currentLevel.id, score);
    RangRushStorage.saveLevelStars(currentLevel.id, stars);
    RangRushStorage.unlockNextLevel(currentLevel.id);

    setUnlockedLevel(RangRushStorage.getUnlockedLevel());
    setLevelStars(RangRushStorage.getLevelStars());
    setBestScores(RangRushStorage.getBestScores());

    setModal('COMPLETE');
  };

  // Handle Level Defeat
  const handleGameOver = (score: number, target: number) => {
    setLastGameScore(score);
    setModal('GAMEOVER');
  };

  // Select Level to play
  const handleSelectLevel = (level: LevelConfig) => {
    setCurrentLevel(level);
    setScreen('GAME');
    setModal('NONE');
  };

  // If inside full-screen interactive game mode
  if (interactiveMode) {
    return (
      <div className="min-h-screen w-full bg-charcoal text-ivory flex flex-col font-sans select-none">
        {screen === 'SPLASH' && (
          <RangRushSplash onEnter={() => setScreen('MENU')} />
        )}

        {screen === 'MENU' && (
          <RangRushMenu
            onPlayCurrentLevel={() => {
              const lev = RANGRUSH_LEVELS.find(l => l.id === unlockedLevel) || RANGRUSH_LEVELS[0];
              handleSelectLevel(lev);
            }}
            onOpenLevels={() => setScreen('LEVEL_SELECT')}
            onOpenDaily={() => setScreen('DAILY')}
            onOpenAchievements={() => setScreen('ACHIEVEMENTS')}
            onOpenSettings={() => setScreen('SETTINGS')}
            unlockedLevel={unlockedLevel}
          />
        )}

        {screen === 'LEVEL_SELECT' && (
          <RangRushLevelSelect
            unlockedLevel={unlockedLevel}
            levelStars={levelStars}
            bestScores={bestScores}
            onSelectLevel={handleSelectLevel}
            onBackToMenu={() => setScreen('MENU')}
          />
        )}

        {screen === 'GAME' && (
          <RangRushGameView
            level={currentLevel}
            onLevelComplete={handleLevelComplete}
            onGameOver={handleGameOver}
            onOpenPause={() => setModal('PAUSE')}
            soundEnabled={settings.soundEnabled}
            onToggleSound={() => {
              const updated = { ...settings, soundEnabled: !settings.soundEnabled };
              setSettings(updated);
              RangRushStorage.saveSettings(updated);
              rangRushAudio.setSoundEnabled(updated.soundEnabled);
            }}
          />
        )}

        {screen === 'DAILY' && (
          <RangRushDaily
            onBackToMenu={() => setScreen('MENU')}
            onStartDaily={() => {
              const dailyLevel: LevelConfig = {
                id: 99,
                title: 'Daily Trial of Fire',
                moves: 20,
                targetScore: 3000,
                objective: { type: 'DESTROY_ELEMENTS', targetScore: 3000, requiredElements: { AGNI: 25 } },
                starThresholds: [3000, 5000, 7500],
                allowedElements: ['AGNI', 'JALA', 'PRITHVI', 'VAJRA', 'CHANDRA', 'SURYA']
              };
              handleSelectLevel(dailyLevel);
            }}
          />
        )}

        {screen === 'ACHIEVEMENTS' && (
          <RangRushAchievements
            achievements={achievements}
            onBackToMenu={() => setScreen('MENU')}
          />
        )}

        {screen === 'SETTINGS' && (
          <RangRushSettings
            settings={settings}
            onUpdateSettings={(newSettings) => {
              setSettings(newSettings);
              RangRushStorage.saveSettings(newSettings);
            }}
            onBackToMenu={() => setScreen('MENU')}
          />
        )}

        {/* MODALS OVERLAY */}
        {modal === 'COMPLETE' && (
          <LevelCompleteModal
            score={lastGameScore}
            bestScore={bestScores[currentLevel.id] || lastGameScore}
            stars={lastGameStars}
            hasNextLevel={currentLevel.id < 20}
            onNextLevel={() => {
              const next = RANGRUSH_LEVELS.find(l => l.id === currentLevel.id + 1);
              if (next) handleSelectLevel(next);
              else setScreen('LEVEL_SELECT');
            }}
            onReplay={() => handleSelectLevel(currentLevel)}
            onLevelMap={() => {
              setModal('NONE');
              setScreen('LEVEL_SELECT');
            }}
          />
        )}

        {modal === 'GAMEOVER' && (
          <GameOverModal
            score={lastGameScore}
            targetScore={currentLevel.targetScore}
            onTryAgain={() => handleSelectLevel(currentLevel)}
            onLevelMap={() => {
              setModal('NONE');
              setScreen('LEVEL_SELECT');
            }}
          />
        )}

        {modal === 'PAUSE' && (
          <PauseModal
            soundOn={settings.soundEnabled}
            musicOn={settings.musicEnabled}
            onToggleSound={() => {
              const updated = { ...settings, soundEnabled: !settings.soundEnabled };
              setSettings(updated);
              RangRushStorage.saveSettings(updated);
              rangRushAudio.setSoundEnabled(updated.soundEnabled);
            }}
            onToggleMusic={() => {
              const updated = { ...settings, musicEnabled: !settings.musicEnabled };
              setSettings(updated);
              RangRushStorage.saveSettings(updated);
              rangRushAudio.setMusicEnabled(updated.musicEnabled);
            }}
            onResume={() => setModal('NONE')}
            onRestart={() => handleSelectLevel(currentLevel)}
            onExit={() => {
              setModal('NONE');
              setScreen('LEVEL_SELECT');
            }}
          />
        )}
      </div>
    );
  }

  // Standalone Game Portfolio Landing View
  return (
    <>
      <Navbar />
      <PageWrapper>
        {/* Hero Cinematic Header */}
        <section className="relative h-[55vh] w-full overflow-hidden border-b border-bronze/10 bg-[#0a0a0d]">
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
          
          {/* Decorative Elemental Glows */}
          <div className="absolute top-1/3 left-1/4 h-64 w-64 rounded-full bg-amber-600/20 blur-3xl" />
          <div className="absolute bottom-10 right-1/4 h-64 w-64 rounded-full bg-cyan-600/20 blur-3xl" />

          {/* Back button */}
          <div className="absolute top-8 left-8 z-20">
            <Link
              href="/games"
              className="flex items-center gap-2 rounded border border-ivory/20 bg-charcoal/80 px-4 py-2 text-[10px] uppercase font-bold tracking-widest text-ivory hover:border-gold hover:text-gold backdrop-blur-sm transition-all"
            >
              <ArrowLeft size={12} /> Portfolio
            </Link>
          </div>

          {/* Floating Game Details Panel */}
          <div className="absolute bottom-10 left-0 right-0 z-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-gold bg-gold/10 border border-gold/20 rounded px-2.5 py-0.5 backdrop-blur-sm">
                    Released Game
                  </span>
                  <div className="flex items-center gap-2 px-3 py-0.5 rounded border border-gold/30 bg-charcoal/80 backdrop-blur-sm">
                    <div className="relative h-4 w-14">
                      <Image
                        src="/LOGO.png"
                        alt="Srishti Studios Logo"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-gold">
                      Powered by Srishti Studios
                    </span>
                  </div>
                </div>
                <h1 className="text-4xl sm:text-6xl font-serif font-light tracking-wide text-ivory mt-2">
                  RangRush: Elements of Srishti
                </h1>
                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs tracking-wider text-sandstone uppercase font-medium">
                  <span>Match-3 Fantasy Puzzle</span>
                  <span className="text-ivory/30">|</span>
                  <span>Web / Mobile / Laptop</span>
                  <span className="text-ivory/30">|</span>
                  <span className="text-gold">20 Playable Levels</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Launch Game Banner CTA */}
        <section className="py-8 bg-forest/10 border-b border-bronze/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-gold font-bold">Instant Browser Play</span>
              <h2 className="text-2xl font-serif text-ivory mt-0.5">Experience the Six Mystical Elements</h2>
            </div>
            <button
              onClick={() => launchInteractiveGame('GAME')}
              className="flex items-center gap-3 px-8 py-4 rounded bg-gradient-to-r from-amber-600 via-gold to-amber-500 text-charcoal font-bold text-xs uppercase tracking-[0.2em] shadow-lg hover:scale-105 transition-transform"
            >
              <Play size={16} className="fill-current" /> Play RangRush Now
            </button>
          </div>
        </section>

        {/* Game Details Section */}
        <section className="py-20 bg-charcoal">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              
              {/* Left Column: Story & Features */}
              <div className="lg:col-span-7 space-y-12">
                <div>
                  <span className="text-[10px] uppercase tracking-widest font-semibold text-gold">Overview</span>
                  <h3 className="text-2xl font-serif font-light text-ivory mt-1">The Six Mystical Elements</h3>
                  <div className="h-[1px] w-12 bg-bronze/40 my-4" />
                  <p className="text-sm text-ivory/80 leading-relaxed font-light text-justify">
                    Command the elemental cosmic forces of Srishti — 🔥 Agni (Fire), 💧 Jala (Water), 🌿 Prithvi (Earth), ⚡ Vajra (Lightning), 🌙 Chandra (Moon), and ☀️ Surya (Sun). Swap adjacent tiles to trigger cascading chain reactions, clear ancient seal obstacles, and activate line-clearing power-ups across 20 escalating puzzle chambers.
                  </p>
                </div>

                {/* Key Features List */}
                <div className="space-y-6">
                  <h4 className="text-lg font-serif text-ivory">Key Gameplay Features</h4>
                  <ul className="space-y-4">
                    <li className="flex gap-4 items-start text-xs text-ivory/70 font-light">
                      <span className="h-6 w-6 rounded-full border border-gold/30 flex items-center justify-center text-[10px] text-gold font-bold flex-shrink-0">1</span>
                      <span><strong>20 Playable Levels:</strong> Progressive difficulty curve with target scores, elemental destroy objectives, and move limitations.</span>
                    </li>
                    <li className="flex gap-4 items-start text-xs text-ivory/70 font-light">
                      <span className="h-6 w-6 rounded-full border border-gold/30 flex items-center justify-center text-[10px] text-gold font-bold flex-shrink-0">2</span>
                      <span><strong>Special Tile & Cascades:</strong> Form Match-4 for Line Blasters, Match-5 for Rainbow Cleansers, and T/L shapes for Explosive Bursts.</span>
                    </li>
                    <li className="flex gap-4 items-start text-xs text-ivory/70 font-light">
                      <span className="h-6 w-6 rounded-full border border-gold/30 flex items-center justify-center text-[10px] text-gold font-bold flex-shrink-0">3</span>
                      <span><strong>Four Unique Power-Ups:</strong> Agni Blast (Row), Vajra Strike (Column), Surya Burst (3x3 Area), and Chandra Shatter (Multi-target).</span>
                    </li>
                    <li className="flex gap-4 items-start text-xs text-ivory/70 font-light">
                      <span className="h-6 w-6 rounded-full border border-gold/30 flex items-center justify-center text-[10px] text-gold font-bold flex-shrink-0">4</span>
                      <span><strong>Procedural Sound Engine:</strong> Built-in Web Audio API sound generator for seamless audio without external download friction.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Right Column: Quick Level Launcher */}
              <div className="lg:col-span-5">
                <div className="rounded-lg border border-bronze/20 bg-forest/5 p-8 space-y-6 sticky top-28 backdrop-blur-sm">
                  <h4 className="text-lg font-serif font-light text-ivory border-b border-bronze/10 pb-4">
                    Level Selector & Stats
                  </h4>
                  
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-ivory/50">Highest Unlocked Level</span>
                    <span className="text-gold font-bold font-serif">Level {unlockedLevel} / 20</span>
                  </div>

                  <div className="flex justify-between items-center text-xs">
                    <span className="text-ivory/50">Total Stars Earned</span>
                    <span className="text-gold font-bold">
                      {Object.values(levelStars).reduce((a, b) => a + b, 0)} / 60 ⭐
                    </span>
                  </div>

                  <div className="pt-4 flex flex-col gap-3">
                    <button
                      onClick={() => launchInteractiveGame('GAME')}
                      className="w-full flex items-center justify-center gap-2 py-4 rounded bg-gold text-charcoal font-bold text-xs uppercase tracking-widest hover:bg-ivory transition-colors shadow-md"
                    >
                      <Play size={14} className="fill-current" /> Launch Full Game
                    </button>

                    <button
                      onClick={() => launchInteractiveGame('LEVEL_SELECT')}
                      className="w-full flex items-center justify-center gap-2 py-3.5 rounded border border-bronze/30 text-ivory font-bold text-xs uppercase tracking-widest hover:border-gold hover:text-gold transition-colors"
                    >
                      Open Level Select Map
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        <MandalaDivider />
      </PageWrapper>
      <Footer />
    </>
  );
}
