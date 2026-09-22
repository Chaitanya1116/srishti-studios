'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MandalaDivider from '@/components/MandalaDivider';
import PageWrapper from '@/components/PageWrapper';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Play, BookOpen, X, Film, Eye, 
  ShieldAlert, Sparkles, MapPin, User, Compass, Mountain
} from 'lucide-react';

interface ComicModalState {
  title: string;
  pdfUrl: string;
}

export default function KageNoKoeDetails() {
  const [selectedComic, setSelectedComic] = useState<ComicModalState | null>(null);
  const [showTrailerModal, setShowTrailerModal] = useState(false);

  const trailerPath = '/Kage No Koe_Trailer1.mp4';
  const chapter1Path = '/Kage No Koe_Chapter 1.pdf';
  const chapter2Path = '/Kage No Koe_Chapter 2.pdf';
  const coverArtwork = 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=1200&auto=format&fit=crop';

  const loreElements = [
    {
      title: 'Kagamori Village',
      icon: MapPin,
      subtitle: 'The Silent Mountain Sanctuary',
      description: 'A isolated settlement where no resident speaks after sunset. The evening temple bell signals strict silence to prevent drawing the things in the shadow.'
    },
    {
      title: 'The Seven Mountains',
      icon: Mountain,
      subtitle: 'The Ancient Seals',
      description: 'A chain of sacred peaks surrounding Kagamori. Each mountain conceals a forgotten seal holding back ancient vocal mimicry entities.'
    },
    {
      title: 'Renjiro Kazehara',
      icon: User,
      subtitle: 'Wandering Ronin',
      description: 'A former samurai haunted by past failures. Drawn to Kagamori by whispered rumours, he wields a shadow stance blade capable of cleaving dark energy.'
    },
    {
      title: 'Akari & Nameless Monk',
      icon: Compass,
      subtitle: 'Keepers of the Seventh Gate',
      description: 'Akari, a shrine maiden of Kagamori, and a enigmatic monk guarding the seventh peak reveal that the seventh seal may be a doorway rather than a prison.'
    }
  ];

  return (
    <>
      <Navbar />
      <PageWrapper>
        {/* Navigation Bar Back Link */}
        <div className="bg-charcoal border-b border-bronze/10 py-4 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl flex items-center justify-between">
            <Link 
              href="/games" 
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Portfolio
            </Link>
            <span className="text-[10px] uppercase font-semibold tracking-widest text-gold bg-bronze/10 border border-gold/30 px-3 py-1 rounded">
              IN DEVELOPMENT • SRISHTI ORIGINAL
            </span>
          </div>
        </div>

        {/* HERO SECTION */}
        <section className="relative h-[70vh] min-h-[500px] w-full overflow-hidden border-b border-bronze/10">
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-charcoal via-charcoal/60 to-transparent" />
          <div className="absolute inset-0 z-10 stone-noise pointer-events-none opacity-40 mix-blend-overlay" />
          
          <Image
            src={coverArtwork}
            alt="KAGE NO KOE — 影の声"
            fill
            priority
            className="object-cover object-center filter brightness-90 contrast-110"
          />

          <div className="absolute inset-0 z-20 flex flex-col justify-end">
            <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 pb-12">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-3xl"
              >
                <div className="inline-flex items-center gap-2 mb-3">
                  <span className="text-xs uppercase tracking-[0.3em] font-bold text-gold">A SRISHTI STUDIOS ORIGINAL</span>
                  <span className="text-ivory/30">•</span>
                  <span className="text-xs uppercase tracking-widest text-ivory/70 font-light">Historical Samurai Mystery • Psychological Horror</span>
                </div>

                <h1 className="text-4xl sm:text-6xl font-serif tracking-wider text-ivory font-normal leading-tight">
                  KAGE NO KOE <span className="text-gold font-light">影の声</span>
                </h1>
                <p className="text-lg sm:text-xl font-serif text-gold/90 tracking-widest uppercase mt-1 mb-4 font-light">
                  THE VOICE OF THE SHADOW
                </p>

                <p className="text-xs sm:text-sm text-ivory/80 max-w-2xl font-light leading-relaxed mb-8">
                  A historical samurai mystery set in a remote Japanese mountain region where silence is used to contain something that can imitate the voices of the dead.
                </p>

                {/* Hero Action Buttons */}
                <div className="flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => setShowTrailerModal(true)}
                    className="inline-flex items-center gap-2.5 rounded bg-gold px-6 py-3 text-xs font-bold uppercase tracking-widest text-charcoal hover:bg-ivory hover:scale-105 transition-all shadow-lg"
                  >
                    <Play className="w-4 h-4 fill-current" /> Watch Trailer
                  </button>

                  <button
                    onClick={() => setSelectedComic({
                      title: 'CHAPTER I — THE VOICE OF THE SHADOW',
                      pdfUrl: chapter1Path
                    })}
                    className="inline-flex items-center gap-2.5 rounded border border-gold/40 bg-charcoal/80 backdrop-blur-md px-6 py-3 text-xs font-bold uppercase tracking-widest text-ivory hover:border-gold hover:text-gold transition-all"
                  >
                    <BookOpen className="w-4 h-4 text-gold" /> Read Chapter I
                  </button>

                  <button
                    onClick={() => setSelectedComic({
                      title: 'CHAPTER II — THE MOUNTAIN BEYOND (山の向こう)',
                      pdfUrl: chapter2Path
                    })}
                    className="inline-flex items-center gap-2.5 rounded border border-gold/40 bg-charcoal/80 backdrop-blur-md px-6 py-3 text-xs font-bold uppercase tracking-widest text-ivory hover:border-gold hover:text-gold transition-all"
                  >
                    <BookOpen className="w-4 h-4 text-gold" /> Read Chapter II
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* OFFICIAL TRAILER SECTION */}
        <section id="trailer" className="py-20 bg-charcoal border-b border-bronze/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-[10px] uppercase tracking-[0.35em] font-semibold text-gold">Official Cinema</span>
              <h2 className="text-3xl font-serif text-ivory mt-2 font-normal">
                WATCH THE <span className="italic text-gold">TRAILER</span>
              </h2>
              <p className="text-xs text-ivory/60 mt-2 font-light">
                Experience the official teaser trailer for KAGE NO KOE — 影の声.
              </p>
            </div>

            <div className="max-w-4xl mx-auto overflow-hidden rounded-xl border border-bronze/20 bg-black/60 shadow-2xl">
              <video 
                controls 
                preload="metadata"
                poster={coverArtwork}
                className="w-full aspect-video object-cover"
              >
                <source src={trailerPath} type="video/mp4" />
                Your browser does not support HTML5 video streaming.
              </video>
            </div>
          </div>
        </section>

        {/* STORY OVERVIEW */}
        <section className="py-20 bg-[#0c0c0c] border-b border-bronze/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-6">
                <span className="text-[10px] uppercase tracking-[0.35em] font-semibold text-gold">Narrative Lore</span>
                <h2 className="text-3xl font-serif text-ivory font-normal leading-tight">
                  THE STORY OF <span className="italic text-gold">KAGE NO KOE</span>
                </h2>
                
                <p className="text-xs leading-relaxed text-ivory/70 font-light">
                  A historical-feeling samurai mystery set in a remote Japanese mountain region where silence is used to contain something that can imitate the voices of the dead.
                </p>

                <p className="text-xs leading-relaxed text-ivory/70 font-light">
                  Renjiro Kazehara, a wandering former samurai, becomes involved in the mystery and discovers that Kagamori is only the beginning of a much larger mystery involving seven mountains.
                </p>

                <p className="text-xs leading-relaxed text-ivory/70 font-light">
                  Chapter II expands the mystery beyond Kagamori and introduces Akari, the Nameless Monk, the Seven Mountains, and the revelation that the seventh symbol may represent a door rather than a prison.
                </p>

                <div className="pt-4 flex flex-wrap gap-3">
                  <div className="bg-charcoal border border-bronze/20 rounded px-4 py-2 text-[10px] uppercase tracking-wider text-ivory/80">
                    <span className="text-gold font-bold">PROTAGONIST:</span> Renjiro Kazehara
                  </div>
                  <div className="bg-charcoal border border-bronze/20 rounded px-4 py-2 text-[10px] uppercase tracking-wider text-ivory/80">
                    <span className="text-gold font-bold">SETTING:</span> Kagamori & Seven Mountains
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 relative aspect-video rounded-xl overflow-hidden border border-bronze/20 shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop"
                  alt="Kage No Koe World Atmosphere"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-6 left-6 right-6 p-4 bg-charcoal/90 backdrop-blur-md rounded border border-gold/20">
                  <p className="text-[11px] font-serif italic text-gold">"When the evening bell strikes sunset in Kagamori, close your lips. For the shadow will speak in the voice of those you lost."</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* GRAPHIC NOVEL CHAPTERS */}
        <section className="py-20 bg-charcoal border-b border-bronze/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-[10px] uppercase tracking-[0.35em] font-semibold text-gold">Graphic Novel Series</span>
              <h2 className="text-3xl font-serif text-ivory mt-2 font-normal">
                KAGE NO KOE <span className="italic text-gold">CHAPTERS</span>
              </h2>
              <p className="text-xs text-ivory/60 mt-2 font-light">
                Read the official illustrated comic book chapters online in full high resolution.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* CHAPTER I CARD */}
              <div className="group relative rounded-xl border border-bronze/20 bg-forest/20 p-8 flex flex-col justify-between hover:border-gold/40 transition-all duration-300">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-gold bg-gold/10 px-3 py-1 rounded border border-gold/30">
                      CHAPTER I
                    </span>
                    <span className="text-xs text-ivory/50 font-light">Illustrated Comic</span>
                  </div>
                  <h3 className="text-xl font-serif text-ivory mb-2 font-normal group-hover:text-gold transition-colors">
                    THE VOICE OF THE SHADOW
                  </h3>
                  <p className="text-xs text-ivory/70 font-light leading-relaxed mb-6">
                    Chapter I introduces Renjiro Kazehara as he arrives in the quiet village of Kagamori and witnesses the evening temple bell ritual for the first time.
                  </p>
                </div>

                <button
                  onClick={() => setSelectedComic({
                    title: 'CHAPTER I — THE VOICE OF THE SHADOW',
                    pdfUrl: chapter1Path
                  })}
                  className="w-full inline-flex items-center justify-center gap-2 rounded bg-gold py-3 text-xs font-bold uppercase tracking-widest text-charcoal hover:bg-ivory transition-all shadow-md"
                >
                  <Eye className="w-4 h-4" /> READ CHAPTER I
                </button>
              </div>

              {/* CHAPTER II CARD */}
              <div className="group relative rounded-xl border border-bronze/20 bg-forest/20 p-8 flex flex-col justify-between hover:border-gold/40 transition-all duration-300">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-gold bg-gold/10 px-3 py-1 rounded border border-gold/30">
                      CHAPTER II
                    </span>
                    <span className="text-xs text-ivory/50 font-light">Illustrated Comic</span>
                  </div>
                  <h3 className="text-xl font-serif text-ivory mb-2 font-normal group-hover:text-gold transition-colors">
                    THE MOUNTAIN BEYOND <span className="text-gold font-light">(山の向こう)</span>
                  </h3>
                  <p className="text-xs text-ivory/70 font-light leading-relaxed mb-6">
                    Chapter II expands the mystery beyond Kagamori and introduces Akari, the Nameless Monk, the Seven Mountains, and the mystery surrounding the seventh mountain.
                  </p>
                </div>

                <button
                  onClick={() => setSelectedComic({
                    title: 'CHAPTER II — THE MOUNTAIN BEYOND (山の向こう)',
                    pdfUrl: chapter2Path
                  })}
                  className="w-full inline-flex items-center justify-center gap-2 rounded bg-gold py-3 text-xs font-bold uppercase tracking-widest text-charcoal hover:bg-ivory transition-all shadow-md"
                >
                  <Eye className="w-4 h-4" /> READ CHAPTER II
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* LORE ARCHITECTURE */}
        <section className="py-20 bg-[#0a0a0a] border-b border-bronze/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-[10px] uppercase tracking-[0.35em] font-semibold text-gold">World Pillars</span>
              <h2 className="text-3xl font-serif text-ivory mt-2 font-normal">
                THE WORLD OF <span className="italic text-gold">KAGE NO KOE</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {loreElements.map((item, idx) => {
                const IconComp = item.icon;
                return (
                  <div 
                    key={idx} 
                    className="p-6 rounded-lg border border-bronze/10 bg-charcoal/60 backdrop-blur-sm hover:border-gold/30 transition-all"
                  >
                    <IconComp className="w-6 h-6 text-gold mb-4" />
                    <h4 className="text-base font-serif text-ivory mb-1 font-medium">{item.title}</h4>
                    <p className="text-[10px] uppercase tracking-widest text-gold/80 mb-3">{item.subtitle}</p>
                    <p className="text-xs text-ivory/60 font-light leading-relaxed">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <MandalaDivider />
      </PageWrapper>

      {/* FULLSCREEN COMIC PDF READER MODAL */}
      <AnimatePresence>
        {selectedComic && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 md:p-8 backdrop-blur-xl"
          >
            <div className="relative w-full max-w-6xl h-[90vh] flex flex-col bg-charcoal rounded-xl border border-bronze/30 overflow-hidden shadow-2xl">
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-bronze/20 bg-charcoal/90">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-gold" />
                  <h3 className="text-sm md:text-base font-serif font-medium text-ivory uppercase tracking-wider">
                    {selectedComic.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedComic(null)}
                  className="rounded-full p-2 text-ivory/70 hover:text-gold hover:bg-bronze/10 transition-all"
                  aria-label="Close reader"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* PDF Embed iFrame */}
              <div className="flex-1 bg-black/80">
                <iframe
                  src={`${selectedComic.pdfUrl}#toolbar=0`}
                  title={selectedComic.title}
                  className="w-full h-full border-none"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TRAILER MODAL */}
      <AnimatePresence>
        {showTrailerModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 md:p-8 backdrop-blur-xl"
          >
            <div className="relative w-full max-w-5xl bg-charcoal rounded-xl border border-bronze/30 overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between px-6 py-4 border-b border-bronze/20 bg-charcoal/90">
                <div className="flex items-center gap-3">
                  <Film className="w-5 h-5 text-gold" />
                  <h3 className="text-sm font-serif font-medium text-ivory uppercase tracking-wider">
                    KAGE NO KOE — OFFICIAL TRAILER
                  </h3>
                </div>
                <button
                  onClick={() => setShowTrailerModal(false)}
                  className="rounded-full p-2 text-ivory/70 hover:text-gold hover:bg-bronze/10 transition-all"
                  aria-label="Close trailer"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="bg-black">
                <video 
                  controls 
                  autoPlay
                  preload="metadata"
                  className="w-full aspect-video object-cover"
                >
                  <source src={trailerPath} type="video/mp4" />
                </video>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}
