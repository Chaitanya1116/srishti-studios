'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { DustParticles } from '@/components/DustParticles';
import MandalaDivider from '@/components/MandalaDivider';
import GameCard from '@/components/GameCard';
import PageWrapper from '@/components/PageWrapper';
import { useApp } from '@/context/AppContext';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Shield, Cpu, ChevronRight } from 'lucide-react';

export default function Home() {
  const { games } = useApp();
  const featuredGames = games.slice(0, 3);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.1
      }
    }
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' }
    }
  } as const;

  return (
    <>
      <Navbar />
      <PageWrapper>
        {/* Hero Section */}
        <section className="relative flex min-h-[90vh] w-full items-center justify-center overflow-hidden bg-charcoal px-4 py-20 border-b border-bronze/10">
          {/* Animated dust canvas */}
          <DustParticles />

          {/* Subtly animated background glow ring */}
          <div className="absolute top-[40%] left-[50%] h-[300px] w-[300px] md:h-[500px] md:w-[500px] -translate-x-[50%] -translate-y-[50%] rounded-full border border-bronze/5 bg-transparent pointer-events-none" />
          <div className="absolute top-[40%] left-[50%] h-[150px] w-[150px] md:h-[250px] md:w-[250px] -translate-x-[50%] -translate-y-[50%] rounded-full border border-bronze/10 bg-transparent pointer-events-none opacity-50" />

          {/* Cinematic lighting effect */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0e0e0e] to-transparent pointer-events-none z-10" />

          <div className="relative z-10 mx-auto max-w-5xl text-center">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center"
            >
              {/* Soft gold pre-header */}
              <motion.span 
                variants={itemVariants} 
                className="text-[10px] uppercase tracking-[0.35em] font-semibold text-gold mb-6"
              >
                Srishti Studios
              </motion.span>

              {/* Core Hero Heading */}
              <motion.h1 
                variants={itemVariants}
                className="text-4xl sm:text-6xl md:text-7xl font-serif font-light tracking-wide text-ivory leading-tight max-w-4xl"
              >
                Crafting Worlds <br />
                <span className="gold-gradient-text italic font-normal">Worth Remembering.</span>
              </motion.h1>

              {/* Subtext */}
              <motion.p 
                variants={itemVariants}
                className="mt-8 text-sm sm:text-base md:text-lg leading-relaxed text-ivory/70 max-w-2xl font-light tracking-wide"
              >
                We build immersive interactive experiences inspired by timeless creativity and modern technology.
              </motion.p>

              {/* CTAs */}
              <motion.div 
                variants={itemVariants}
                className="mt-12 flex flex-col sm:flex-row gap-6 justify-center w-full max-w-md sm:max-w-none px-4"
              >
                <Link
                  href="/games"
                  className="group flex items-center justify-center gap-2 rounded bg-gold px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-charcoal hover:bg-ivory hover:scale-[1.02] transition-all shadow-lg"
                >
                  Explore Games <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/about"
                  className="flex items-center justify-center gap-2 rounded border border-bronze/40 bg-transparent px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-ivory hover:bg-bronze/10 hover:border-bronze transition-all"
                >
                  About Us <ChevronRight size={14} />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Brand Philosophy Section */}
        <section className="py-24 bg-charcoal relative">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-gold">The Pillars</span>
              <h2 className="text-3xl md:text-4xl font-serif font-light mt-4 text-ivory">Creative Craftsmanship</h2>
              <p className="text-xs text-ivory/60 mt-4 leading-relaxed font-light">
                We believe video games are the ultimate synthesis of structural math and artistic creation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Pillar 1 */}
              <div className="flex flex-col items-center text-center p-8 border border-bronze/5 bg-forest/5 rounded-lg hover:border-bronze/20 transition-all duration-300">
                <div className="h-12 w-12 flex items-center justify-center rounded-full bg-bronze/10 text-gold mb-6 border border-bronze/20">
                  <Star size={20} />
                </div>
                <h3 className="text-lg font-serif font-medium tracking-wide text-ivory">Geometric Balance</h3>
                <p className="text-xs text-ivory/60 mt-3 leading-relaxed font-light">
                  Inspired by architectural layout rules, our games feature balanced structural geometry and environmental symmetry in their design.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="flex flex-col items-center text-center p-8 border border-bronze/5 bg-forest/5 rounded-lg hover:border-bronze/20 transition-all duration-300">
                <div className="h-12 w-12 flex items-center justify-center rounded-full bg-bronze/10 text-gold mb-6 border border-bronze/20">
                  <Cpu size={20} />
                </div>
                <h3 className="text-lg font-serif font-medium tracking-wide text-ivory">AAA Technology</h3>
                <p className="text-xs text-ivory/60 mt-3 leading-relaxed font-light">
                  Leveraging cutting-edge engines, realistic PBR materials, custom physics parameters, and state-of-the-art console optimization.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="flex flex-col items-center text-center p-8 border border-bronze/5 bg-forest/5 rounded-lg hover:border-bronze/20 transition-all duration-300">
                <div className="h-12 w-12 flex items-center justify-center rounded-full bg-bronze/10 text-gold mb-6 border border-bronze/20">
                  <Shield size={20} />
                </div>
                <h3 className="text-lg font-serif font-medium tracking-wide text-ivory">Meaningful Narrative</h3>
                <p className="text-xs text-ivory/60 mt-3 leading-relaxed font-light">
                  We shape rich worlds and mature themes, giving every puzzle solve or character combat posture deep environmental context.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Premier Featured Release Section */}
        <section className="py-20 bg-gradient-to-b from-charcoal to-[#0A0A0A] relative border-t border-bronze/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-gold">Premier Release</span>
              <h2 className="text-3xl md:text-5xl font-serif font-light mt-4 text-ivory">Playable Now</h2>
              <div className="h-[1px] w-12 bg-bronze/40 mx-auto mt-4" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-forest/5 border border-bronze/10 rounded-xl overflow-hidden backdrop-blur-sm shadow-2xl">
              {/* Cover Artwork Container */}
              <div className="lg:col-span-7 relative aspect-video w-full overflow-hidden group border-r border-bronze/5">
                <div className="absolute inset-0 z-10 stone-noise pointer-events-none opacity-40 mix-blend-overlay" />
                <div className="absolute inset-0 z-10 bg-gradient-to-r from-charcoal/40 to-transparent" />
                <Image
                  src="/aether_forge.png"
                  alt="Project: Aether Forge Featured Banner"
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-102"
                />
              </div>

              {/* Cover Details Panel */}
              <div className="lg:col-span-5 p-8 sm:p-12 space-y-6">
                <span className="inline-flex items-center rounded border border-gold/30 bg-gold/5 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-gold">
                  Featured Title
                </span>
                
                <h3 className="text-3xl font-serif font-light text-ivory tracking-wide leading-tight">
                  Project: <br /><span className="gold-gradient-text italic font-normal">Aether Forge</span>
                </h3>

                <p className="text-xs sm:text-sm text-ivory/70 leading-relaxed font-light">
                  Manipulate gravity vectors, escape ancient floating structures, and activate geometric energy shrines. Play the first official mini game from Srishti Studios directly in your browser.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link
                    href="/games/aether-forge"
                    className="group flex items-center justify-center gap-2 rounded bg-gold px-6 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-charcoal hover:bg-ivory hover:scale-[1.02] transition-all shadow-md cursor-pointer"
                  >
                    Play in Browser <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform cursor-pointer" />
                  </Link>

                  <Link
                    href="/games/aether-forge"
                    className="flex items-center justify-center gap-2 rounded border border-bronze/40 bg-transparent px-6 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-ivory hover:bg-bronze/10 transition-all cursor-pointer"
                  >
                    Details & Specs
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Symmetrical Mandala divider */}
        <MandalaDivider />

        {/* Featured Games Section */}
        <section className="py-24 bg-charcoal/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-baseline justify-between mb-16 border-b border-bronze/10 pb-6">
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-gold">Featured Showcase</span>
                <h2 className="text-3xl md:text-4xl font-serif font-light mt-2 text-ivory">Memorable Journeys</h2>
              </div>
              <Link 
                href="/games" 
                className="mt-4 sm:mt-0 text-xs font-bold uppercase tracking-widest text-gold hover:text-white transition-colors flex items-center gap-1 group"
              >
                All Releases <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredGames.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          </div>
        </section>
      </PageWrapper>
      <Footer />
    </>
  );
}
