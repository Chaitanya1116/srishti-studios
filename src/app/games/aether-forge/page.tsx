'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MandalaDivider from '@/components/MandalaDivider';
import PageWrapper from '@/components/PageWrapper';
import AetherForgeGame from '@/components/AetherForgeGame';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Play, Cpu, Monitor, Download, 
  Gamepad2, Info, ListTodo, ShieldCheck, Gamepad 
} from 'lucide-react';

export default function AetherForgeDetails() {
  const [browserMode, setBrowserMode] = useState(false);
  const [activeTab, setActiveTab] = useState<'story' | 'controls' | 'updates' | 'specs'>('story');

  const features = [
    {
      title: "Gravity Inversion",
      desc: "Instantly flip gravity vertically. Walk on the ceiling to drop past bottomless pits or fall upward over walls."
    },
    {
      title: "Gravity Rotation",
      desc: "Rotate gravity 90 degrees clockwise or counter-clockwise. Scale vertical walls and walk sideways."
    },
    {
      title: "Hyper Dash",
      desc: "Activate a brief force dash to cross gap boundaries, shatter drones, and phase safely through high-voltage laser grids."
    },
    {
      title: "Shrine Puzzles",
      desc: "Resolve intricate symmetry puzzles by routing energy switches and weighting pressure plates in correct mathematical balance."
    }
  ];

  const devlogs = [
    {
      version: "v1.0.0 (Stable Release)",
      date: "July 15, 2026",
      title: "First Playable Srishti Release",
      desc: "We are thrilled to launch Project: Aether Forge. Our objective was to build a complete, self-contained mini-game in 20-30 minutes of gameplay with tight physics, atmospheric rendering, and real-time audio synthesis. We successfully eliminated asset load failure risks by using dynamic canvas rendering and the Web Audio API."
    },
    {
      version: "v0.9.0 (Beta)",
      date: "June 28, 2026",
      title: "Procedural Audio Integration",
      desc: "Added low-frequency oscillator rumble to replicate the atmosphere of carved stone chambers. Smelted custom synth tones representing gravity rotation vectors and force energy switches."
    }
  ];

  return (
    <>
      <Navbar />
      <PageWrapper>
        {/* Widescreen Cinematic Header */}
        <section className="relative h-[48vh] w-full overflow-hidden border-b border-bronze/10">
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent" />
          <div className="absolute inset-0 z-10 stone-noise pointer-events-none opacity-40 mix-blend-overlay" />
          <Image
            src="/aether_forge.png"
            alt="Project: Aether Forge"
            fill
            priority
            className="object-cover object-center"
          />
          
          {/* Back button */}
          <div className="absolute top-8 left-8 z-20">
            <Link 
              href="/games" 
              className="flex items-center gap-2 rounded border border-ivory/20 bg-charcoal/80 px-4 py-2 text-[10px] uppercase font-bold tracking-widest text-ivory hover:border-gold hover:text-gold backdrop-blur-sm transition-all"
            >
              <ArrowLeft size={12} /> Portfolio
            </Link>
          </div>

          {/* Floating game metadata panel */}
          <div className="absolute bottom-10 left-0 right-0 z-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="max-w-2xl">
                <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-gold bg-gold/10 border border-gold/20 rounded px-2.5 py-0.5 backdrop-blur-sm">
                  First Release
                </span>
                <h1 className="text-4xl sm:text-6xl font-serif font-light tracking-wide text-ivory mt-4">
                  Project: Aether Forge
                </h1>
                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs tracking-wider text-sandstone uppercase font-medium">
                  <span>2.5D Puzzle Action</span>
                  <span className="text-ivory/30">|</span>
                  <span>Web / PC</span>
                  <span className="text-ivory/30">|</span>
                  <span className="text-gold">Released</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Playable Area */}
        <section className="py-12 bg-charcoal border-b border-bronze/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center">
              {browserMode ? (
                <div className="w-full max-w-4xl">
                  <AetherForgeGame />
                </div>
              ) : (
                <div className="relative aspect-[16/9] w-full max-w-4xl rounded-lg border border-bronze/20 overflow-hidden shadow-2xl bg-black group">
                  <div className="absolute inset-0 stone-noise pointer-events-none opacity-40 mix-blend-overlay z-10" />
                  <div className="absolute inset-0 bg-charcoal/40 group-hover:bg-charcoal/20 transition-all duration-300 z-10" />
                  <Image
                    src="/aether_forge.png"
                    alt="Aether Forge Screen Cover"
                    fill
                    className="object-cover filter brightness-[0.7] group-hover:scale-105 transition-all duration-700"
                  />
                  
                  {/* Cinematic play overlays */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 z-20 p-4 text-center">
                    <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-gold">Srishti Engine Embedded</span>
                    <h2 className="text-2xl sm:text-4xl font-serif font-light tracking-wide text-ivory">Experience the Forge</h2>
                    
                    <div className="flex flex-col sm:flex-row gap-4 mt-2">
                      <button
                        onClick={() => setBrowserMode(true)}
                        className="group flex items-center justify-center gap-2 rounded bg-gold px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-charcoal hover:bg-ivory hover:scale-[1.02] transition-all shadow-lg cursor-pointer"
                      >
                        <Play size={14} fill="currentColor" /> Play in Browser
                      </button>

                      <a
                        href="/aether_forge.png"
                        download="AetherForge_Desktop.zip"
                        className="flex items-center justify-center gap-2 rounded border border-bronze/40 bg-transparent px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-ivory hover:bg-bronze/10 transition-all cursor-pointer"
                      >
                        <Download size={14} /> Download for Windows
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Tabbed Info & Details Section */}
        <section className="py-24 bg-charcoal">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              
              {/* Left Details Grid */}
              <div className="lg:col-span-8 space-y-10">
                {/* Navigation Tabs */}
                <div className="flex border-b border-bronze/10 overflow-x-auto no-scrollbar gap-8">
                  {[
                    { id: 'story', name: 'Story & Lore', icon: <Info size={14} /> },
                    { id: 'controls', name: 'Controls Guide', icon: <Gamepad size={14} /> },
                    { id: 'updates', name: 'Development Updates', icon: <ListTodo size={14} /> },
                    { id: 'specs', name: 'System Requirements', icon: <Cpu size={14} /> }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex items-center gap-2 pb-4 text-xs uppercase font-bold tracking-widest transition-all cursor-pointer relative ${
                        activeTab === tab.id
                          ? 'text-gold'
                          : 'text-ivory/60 hover:text-ivory'
                      }`}
                    >
                      {tab.icon}
                      <span>{tab.name}</span>
                      {activeTab === tab.id && (
                        <motion.span 
                          layoutId="activeTabUnderline"
                          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold"
                        />
                      )}
                    </button>
                  ))}
                </div>

                {/* Tab Contents */}
                <div className="py-4">
                  {activeTab === 'story' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-8"
                    >
                      <div className="space-y-4">
                        <h3 className="text-xl font-serif text-ivory">The Core Awake</h3>
                        <p className="text-xs sm:text-sm text-ivory/70 leading-relaxed font-light text-justify">
                          Within symmetrical sandstone structures floating high above the clouds, a slumbering force stirs. The Aether Core—an ancient, bronze-carved container of pure gravitational energy—has been activated. In this world of geometry, order, and architectural precision, you must align the system vector shrines to reconstruct the long-lost Aether Forge.
                        </p>
                        <p className="text-xs sm:text-sm text-ivory/70 leading-relaxed font-light text-justify">
                          But proceed with caution: the ruins are heavily secured. Symmetrical laser grids patrol the pathways, and automated sentry drones continue their endless defense routines. You must control gravity itself to navigate, dodge traps, and solve puzzles to find a way out.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                        {features.map((feat, index) => (
                          <div key={index} className="p-5 border border-bronze/10 bg-forest/5 rounded-lg hover:border-bronze/25 transition-all">
                            <span className="text-[10px] font-bold text-gold uppercase tracking-widest block mb-2">{feat.title}</span>
                            <p className="text-xs text-ivory/60 leading-relaxed font-light">{feat.desc}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'controls' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-6"
                    >
                      <h3 className="text-xl font-serif text-ivory">Geometric Key Bindings</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-6 border border-bronze/10 rounded-lg space-y-3">
                          <span className="text-[10px] uppercase tracking-wider font-bold text-gold block">1. Walk & Jump</span>
                          <p className="text-xs text-ivory/60 leading-relaxed font-light">
                            Use <strong className="text-ivory">A / D</strong> or the <strong className="text-ivory">Left / Right Arrows</strong> to walk horizontally along floors and ceilings.
                          </p>
                          <p className="text-xs text-ivory/60 leading-relaxed font-light">
                            If you shift gravity sideways, the floor becomes a wall. Use <strong className="text-ivory">W / S</strong> or <strong className="text-ivory">Up / Down Arrows</strong> to climb up and down.
                          </p>
                        </div>
                        <div className="p-6 border border-bronze/10 rounded-lg space-y-3">
                          <span className="text-[10px] uppercase tracking-wider font-bold text-gold block">2. Gravity Shift</span>
                          <p className="text-xs text-ivory/60 leading-relaxed font-light">
                            Press <strong className="text-ivory">Q</strong> to rotate gravity 90&deg; counter-clockwise, or <strong className="text-ivory">E</strong> to rotate it 90&deg; clockwise.
                          </p>
                          <p className="text-xs text-ivory/60 leading-relaxed font-light">
                            Press <strong className="text-ivory">R</strong> or <strong className="text-ivory">F</strong> to reverse gravity vectors entirely, falling instantly to the opposite surface.
                          </p>
                        </div>
                        <div className="p-6 border border-bronze/10 rounded-lg space-y-3">
                          <span className="text-[10px] uppercase tracking-wider font-bold text-gold block">3. Power Dash</span>
                          <p className="text-xs text-ivory/60 leading-relaxed font-light">
                            Press <strong className="text-ivory">Spacebar</strong> while moving to execute a force dash.
                          </p>
                          <p className="text-xs text-ivory/60 leading-relaxed font-light">
                            The dash gives you temporary invulnerability to cross active lasers and lets you shatter sentry drones to clear a path.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'updates' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-6"
                    >
                      <h3 className="text-xl font-serif text-ivory">Developer Log</h3>
                      <div className="space-y-6">
                        {devlogs.map((log, idx) => (
                          <div key={idx} className="p-6 border border-bronze/10 rounded-lg space-y-3">
                            <div className="flex flex-wrap justify-between items-baseline gap-2 border-b border-bronze/10 pb-3">
                              <span className="text-xs font-mono text-gold font-bold">{log.version}</span>
                              <span className="text-[10px] text-ivory/40 uppercase tracking-wider">{log.date}</span>
                            </div>
                            <h4 className="text-sm font-serif text-ivory font-medium">{log.title}</h4>
                            <p className="text-xs text-ivory/70 leading-relaxed font-light text-justify">{log.desc}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'specs' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    >
                      {/* Min */}
                      <div className="p-6 border border-bronze/10 rounded-lg space-y-4">
                        <span className="text-[10px] uppercase tracking-widest font-bold text-gold flex items-center gap-1.5"><Monitor size={14} /> Minimum Specifications</span>
                        <div className="h-[1px] w-full bg-bronze/10" />
                        <div className="space-y-3 text-xs font-light text-ivory/70">
                          <div className="flex justify-between py-0.5 border-b border-bronze/5">
                            <span className="text-ivory/40">OS</span>
                            <span>Windows 10 64-bit / macOS Ventura</span>
                          </div>
                          <div className="flex justify-between py-0.5 border-b border-bronze/5">
                            <span className="text-ivory/40">Processor</span>
                            <span>Intel Core i3-6100 / Apple M1</span>
                          </div>
                          <div className="flex justify-between py-0.5 border-b border-bronze/5">
                            <span className="text-ivory/40">Memory</span>
                            <span>8 GB RAM</span>
                          </div>
                          <div className="flex justify-between py-0.5 border-b border-bronze/5">
                            <span className="text-ivory/40">Graphics</span>
                            <span>Intel UHD Graphics 630 / Integrated</span>
                          </div>
                          <div className="flex justify-between py-0.5">
                            <span className="text-ivory/40">Storage</span>
                            <span>2 GB available space</span>
                          </div>
                        </div>
                      </div>

                      {/* Rec */}
                      <div className="p-6 border border-bronze/10 rounded-lg space-y-4">
                        <span className="text-[10px] uppercase tracking-widest font-bold text-gold flex items-center gap-1.5"><Cpu size={14} /> Recommended Specifications</span>
                        <div className="h-[1px] w-full bg-bronze/10" />
                        <div className="space-y-3 text-xs font-light text-ivory/70">
                          <div className="flex justify-between py-0.5 border-b border-bronze/5">
                            <span className="text-ivory/40">OS</span>
                            <span>Windows 11 64-bit</span>
                          </div>
                          <div className="flex justify-between py-0.5 border-b border-bronze/5">
                            <span className="text-ivory/40">Processor</span>
                            <span>Intel Core i5-9600K or equivalent</span>
                          </div>
                          <div className="flex justify-between py-0.5 border-b border-bronze/5">
                            <span className="text-ivory/40">Memory</span>
                            <span>16 GB RAM</span>
                          </div>
                          <div className="flex justify-between py-0.5 border-b border-bronze/5">
                            <span className="text-ivory/40">Graphics</span>
                            <span>NVIDIA GeForce GTX 1060 / AMD RX 580</span>
                          </div>
                          <div className="flex justify-between py-0.5">
                            <span className="text-ivory/40">Storage</span>
                            <span>2 GB SSD storage</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Right Column Action Sidebar */}
              <div className="lg:col-span-4">
                <div className="rounded-lg border border-bronze/20 bg-forest/5 p-8 space-y-8 sticky top-28 backdrop-blur-sm">
                  <h3 className="text-lg font-serif font-light text-ivory tracking-wide border-b border-bronze/10 pb-4">
                    Release Information
                  </h3>
                  
                  <div className="space-y-4 text-xs font-light">
                    <div className="flex justify-between items-baseline">
                      <span className="text-ivory/50">Developer</span>
                      <span className="text-gold font-medium">Srishti Studios</span>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="text-ivory/50">Status</span>
                      <span className="text-gold font-medium">Released v1.0.0</span>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="text-ivory/50">Audio Design</span>
                      <span className="text-gold font-medium">Procedural Synth</span>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="text-ivory/50">Playtime</span>
                      <span className="text-gold font-medium">20 - 30 minutes</span>
                    </div>
                  </div>

                  <div className="h-[1px] w-full bg-bronze/10" />

                  <div className="flex flex-col gap-4">
                    <button
                      onClick={() => setBrowserMode(true)}
                      className="flex items-center justify-between rounded bg-gold px-5 py-4 text-xs font-bold uppercase tracking-widest text-charcoal hover:bg-ivory hover:scale-[1.01] transition-all cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <Gamepad2 size={14} fill="currentColor" /> Play Game Now
                      </span>
                    </button>

                    <a
                      href="/aether_forge.png"
                      download="AetherForge_Desktop.zip"
                      className="flex items-center justify-between rounded border border-bronze/30 bg-transparent px-5 py-4 text-xs font-bold uppercase tracking-widest text-ivory hover:bg-bronze/15 hover:border-gold transition-all cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <Download size={14} /> Get Windows Build
                      </span>
                    </a>
                  </div>

                  <div className="flex gap-2 items-center text-[10px] text-ivory/40 justify-center">
                    <ShieldCheck size={12} className="text-gold" />
                    <span>Secure studio check completed</span>
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
