'use client';

import React, { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MandalaDivider from '@/components/MandalaDivider';
import PageWrapper from '@/components/PageWrapper';
import { useApp } from '@/context/AppContext';
import { ArrowLeft, Play, Cpu, Database, Monitor, Shield, Laptop, Download, Calendar, ExternalLink } from 'lucide-react';

interface GameDetailsProps {
  params: Promise<{ slug: string }>;
}

export default function GameDetails({ params }: GameDetailsProps) {
  const resolvedParams = use(params);
  const { games } = useApp();
  const game = games.find((g) => g.slug === resolvedParams.slug);

  if (!game) {
    return (
      <>
        <Navbar />
        <PageWrapper>
          <div className="flex-1 flex flex-col items-center justify-center py-32 text-center">
            <h1 className="text-2xl font-serif text-ivory">Game Not Found</h1>
            <p className="text-xs text-ivory/50 mt-2">The requested game build does not exist.</p>
            <Link href="/games" className="mt-6 text-xs text-gold uppercase font-bold tracking-widest hover:text-white transition-colors">
              &larr; Back to Portfolio
            </Link>
          </div>
        </PageWrapper>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <PageWrapper>
        {/* Widescreen Cinematic Hero Banner */}
        <section className="relative h-[65vh] w-full overflow-hidden border-b border-bronze/10">
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent" />
          <div className="absolute inset-0 z-10 stone-noise pointer-events-none opacity-40 mix-blend-overlay" />
          <Image
            src={game.artworkUrl}
            alt={game.name}
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
          <div className="absolute bottom-12 left-0 right-0 z-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="max-w-2xl">
                <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-gold bg-gold/10 border border-gold/20 rounded px-2.5 py-0.5 backdrop-blur-sm">
                  {game.status}
                </span>
                <h1 className="text-3xl sm:text-5xl font-serif font-light tracking-wide text-ivory mt-4">
                  {game.name}
                </h1>
                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs tracking-wider text-sandstone uppercase">
                  <span>{game.genre}</span>
                  <span className="text-ivory/30">|</span>
                  <span>{game.platforms.join(' / ')}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Narrative & Feature Columns */}
        <section className="py-24 bg-charcoal">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              
              {/* Left Column: Description & Story */}
              <div className="lg:col-span-7 space-y-12">
                <div className="space-y-4">
                  <span className="text-[10px] uppercase tracking-widest font-semibold text-gold">The Chronicle</span>
                  <h2 className="text-2xl font-serif font-light text-ivory">The Story</h2>
                  <div className="h-[1px] w-12 bg-bronze/40" />
                  <p className="text-sm text-ivory/80 leading-relaxed font-light text-justify">
                    {game.story}
                  </p>
                </div>

                <div className="space-y-6">
                  <h3 className="text-lg font-serif font-light text-ivory">Key Features</h3>
                  <ul className="space-y-4">
                    {game.features.map((feat, idx) => (
                      <li key={idx} className="flex gap-4 items-start text-xs text-ivory/70 leading-relaxed font-light">
                        <span className="h-5 w-5 rounded-full border border-gold/30 flex items-center justify-center text-[10px] text-gold font-bold flex-shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column: Platform Action Center & Store Links */}
              <div className="lg:col-span-5">
                <div className="rounded-lg border border-bronze/20 bg-forest/5 p-8 space-y-8 sticky top-28 backdrop-blur-sm">
                  <h3 className="text-lg font-serif font-light text-ivory tracking-wide border-b border-bronze/10 pb-4">
                    Storefronts & Releases
                  </h3>
                  
                  {/* Platforms indicator */}
                  <div className="flex justify-between items-center text-xs tracking-wider">
                    <span className="text-ivory/50">Target Platforms</span>
                    <span className="text-gold font-medium">{game.platforms.join(', ')}</span>
                  </div>

                  <div className="flex justify-between items-center text-xs tracking-wider">
                    <span className="text-ivory/50">Build Status</span>
                    <span className="text-gold font-medium">{game.status}</span>
                  </div>

                  {/* Store Buttons */}
                  <div className="flex flex-col gap-4 pt-4">
                    {/* Steam */}
                    <a
                      href={game.downloadLinks.steam || 'https://store.steampowered.com'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between rounded border border-bronze/30 bg-transparent px-5 py-3.5 text-xs font-bold uppercase tracking-widest text-ivory hover:bg-bronze/20 hover:border-gold transition-all"
                    >
                      <span className="flex items-center gap-2">
                        <Laptop size={14} /> Wishlist on Steam
                      </span>
                      <ExternalLink size={12} />
                    </a>

                    {/* Epic Store */}
                    <a
                      href={game.downloadLinks.epic || 'https://store.epicgames.com'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between rounded border border-bronze/30 bg-transparent px-5 py-3.5 text-xs font-bold uppercase tracking-widest text-ivory hover:bg-bronze/20 hover:border-gold transition-all"
                    >
                      <span className="flex items-center gap-2">
                        <Monitor size={14} /> Epic Games Store
                      </span>
                      <ExternalLink size={12} />
                    </a>

                    {/* Google Play Store (if mobile) */}
                    {game.platforms.some(p => p.includes('iOS') || p.includes('Playstore') || p.includes('Android') || p.includes('Switch')) && (
                      <a
                        href={game.downloadLinks.playstore || 'https://play.google.com'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between rounded border border-bronze/30 bg-transparent px-5 py-3.5 text-xs font-bold uppercase tracking-widest text-ivory hover:bg-bronze/20 hover:border-gold transition-all"
                      >
                        <span className="flex items-center gap-2">
                          <Download size={14} /> Google Play Store
                        </span>
                        <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Widescreen Media / Screenshots Gallery */}
        {game.screenshots && game.screenshots.length > 0 && (
          <section className="py-20 bg-charcoal/30 border-t border-b border-bronze/10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <span className="text-[10px] uppercase tracking-widest font-semibold text-gold">Visuals</span>
                <h3 className="text-2xl font-serif font-light text-ivory mt-2">Screenshots</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {game.screenshots.map((url, idx) => (
                  <div key={idx} className="relative aspect-video rounded overflow-hidden border border-bronze/10 group">
                    <div className="absolute inset-0 bg-charcoal/20 z-10 group-hover:bg-transparent transition-colors duration-300" />
                    <Image
                      src={url}
                      alt={`${game.name} screen ${idx + 1}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Embedded Trailer Section */}
        {game.trailerUrl && (
          <section id="trailer" className="py-20 bg-charcoal">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <span className="text-[10px] uppercase tracking-widest font-semibold text-gold">Cinematic</span>
                <h3 className="text-2xl font-serif font-light text-ivory mt-2">Official Trailer</h3>
              </div>
              <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-bronze/20 bg-black shadow-2xl">
                <iframe
                  src={game.trailerUrl}
                  title={`${game.name} Official Trailer`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full border-none"
                />
              </div>
            </div>
          </section>
        )}

        {/* System Requirements Grid */}
        <section className="py-20 bg-[#090909] border-t border-bronze/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-[10px] uppercase tracking-widest font-semibold text-gold">Configuration</span>
              <h3 className="text-2xl font-serif font-light text-ivory mt-2">System Requirements</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Minimum Specs */}
              <div className="p-8 border border-bronze/10 rounded-lg space-y-6">
                <h4 className="text-sm uppercase font-bold tracking-widest text-gold flex items-center gap-2">
                  <Monitor size={16} /> Minimum Requirements
                </h4>
                <div className="h-[1px] w-full bg-bronze/10" />
                <div className="space-y-4 text-xs font-light text-ivory/70">
                  <div className="flex justify-between py-1 border-b border-bronze/5">
                    <span className="text-ivory/40">OS</span>
                    <span>{game.systemRequirements.minimum.os}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-bronze/5">
                    <span className="text-ivory/40">Processor</span>
                    <span>{game.systemRequirements.minimum.processor}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-bronze/5">
                    <span className="text-ivory/40">Memory</span>
                    <span>{game.systemRequirements.minimum.memory}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-bronze/5">
                    <span className="text-ivory/40">Graphics</span>
                    <span>{game.systemRequirements.minimum.graphics}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-ivory/40">Storage</span>
                    <span>{game.systemRequirements.minimum.storage}</span>
                  </div>
                </div>
              </div>

              {/* Recommended Specs */}
              <div className="p-8 border border-bronze/10 rounded-lg space-y-6">
                <h4 className="text-sm uppercase font-bold tracking-widest text-gold flex items-center gap-2">
                  <Cpu size={16} /> Recommended Requirements
                </h4>
                <div className="h-[1px] w-full bg-bronze/10" />
                <div className="space-y-4 text-xs font-light text-ivory/70">
                  <div className="flex justify-between py-1 border-b border-bronze/5">
                    <span className="text-ivory/40">OS</span>
                    <span>{game.systemRequirements.recommended.os}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-bronze/5">
                    <span className="text-ivory/40">Processor</span>
                    <span>{game.systemRequirements.recommended.processor}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-bronze/5">
                    <span className="text-ivory/40">Memory</span>
                    <span>{game.systemRequirements.recommended.memory}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-bronze/5">
                    <span className="text-ivory/40">Graphics</span>
                    <span>{game.systemRequirements.recommended.graphics}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-ivory/40">Storage</span>
                    <span>{game.systemRequirements.recommended.storage}</span>
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
