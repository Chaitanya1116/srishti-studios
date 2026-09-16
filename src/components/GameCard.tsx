'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Game } from '@/context/AppContext';
import { Play, Heart, Download, ExternalLink, BookOpen, X } from 'lucide-react';

interface GameCardProps {
  game: Game;
}

export const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const isVideoFile = game.trailerUrl && (game.trailerUrl.toLowerCase().includes('.mp4') || game.trailerUrl.startsWith('/'));

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6 }}
        className="group relative flex flex-col overflow-hidden rounded-lg border border-bronze/10 bg-forest/20 backdrop-blur-sm transition-all duration-500 hover:border-gold/30 hover:shadow-[0_0_30px_rgba(168,117,59,0.08)]"
      >
        {/* Game Artwork Container */}
        <div className="relative aspect-video w-full overflow-hidden">
          {/* Stone noise texture on top */}
          <div className="absolute inset-0 z-10 stone-noise pointer-events-none opacity-40 mix-blend-overlay" />
          
          {/* Soft black to transparent gradient bottom overlay */}
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-90" />
          
          <Image
            src={game.artworkUrl}
            alt={game.name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Studio Branding Badge */}
          <div className="absolute top-4 left-4 z-20">
            <div className="inline-flex items-center gap-1.5 rounded border border-gold/30 bg-charcoal/85 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-gold backdrop-blur-sm shadow-md">
              <div className="relative h-3.5 w-10">
                <Image
                  src="/LOGO.png"
                  alt="Srishti Studios Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span>Srishti Studio</span>
            </div>
          </div>

          {/* Status Tag & Comic Badge */}
          <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5">
            {game.comicChapters && game.comicChapters.length > 0 && (
              <span className="inline-flex items-center gap-1 rounded border border-gold/40 bg-charcoal/90 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-gold backdrop-blur-sm shadow-md">
                <BookOpen size={10} /> Comic
              </span>
            )}
            <span className="inline-flex items-center rounded border border-bronze/30 bg-charcoal/80 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-widest text-gold backdrop-blur-sm">
              {game.status}
            </span>
          </div>

          {/* Centered White Play Trailer Video Button */}
          {game.trailerUrl && (
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsVideoModalOpen(true);
                }}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-charcoal shadow-[0_0_30px_rgba(255,255,255,0.5)] hover:scale-110 hover:bg-gold transition-all duration-300 cursor-pointer"
                title="Play Trailer Video"
              >
                <Play size={26} fill="currentColor" className="ml-1 text-charcoal" />
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-6">
          <div className="mb-2 flex items-center justify-between text-xs tracking-wider text-sandstone uppercase font-medium">
            <span>{game.genre}</span>
            <span className="text-ivory/50">{game.platforms.join(' | ')}</span>
          </div>

          <h3 className="mb-3 text-xl font-serif font-medium tracking-wide text-ivory group-hover:text-gold transition-colors">
            <Link href={`/games/${game.slug}`}>
              {game.name}
            </Link>
          </h3>

          <p className="mb-6 flex-1 text-xs leading-relaxed text-ivory/70 line-clamp-3 font-light">
            {game.description}
          </p>

          {/* Buttons / Actions */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-bronze/10">
            {/* View Details */}
            <Link
              href={`/games/${game.slug}`}
              className="flex items-center justify-center gap-1.5 rounded border border-bronze/30 bg-transparent py-2 text-[10px] uppercase font-bold tracking-widest text-ivory hover:bg-bronze/20 hover:border-bronze transition-all"
            >
              Explore <ExternalLink size={12} />
            </Link>

            {/* Wishlist/Download Action */}
            {game.status === 'Released' ? (
              game.downloadLinks.steam || game.downloadLinks.epic ? (
                <a
                  href={game.downloadLinks.steam || game.downloadLinks.epic}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 rounded bg-gold py-2 text-[10px] uppercase font-bold tracking-widest text-charcoal hover:bg-ivory transition-all"
                >
                  Get Game <Download size={12} />
                </a>
              ) : (
                <Link
                  href={`/games/${game.slug}?play=true`}
                  className="flex items-center justify-center gap-1.5 rounded bg-gold py-2 text-[10px] uppercase font-bold tracking-widest text-charcoal hover:bg-ivory transition-all"
                >
                  Play Now <Play size={12} className="fill-current" />
                </Link>
              )
            ) : (
              <a
                href={game.downloadLinks.steam || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 rounded border border-gold/30 bg-gold/5 py-2 text-[10px] uppercase font-bold tracking-widest text-gold hover:bg-gold hover:text-charcoal transition-all"
              >
                Wishlist <Heart size={12} />
              </a>
            )}
          </div>
        </div>
      </motion.div>

      {/* Video Modal Player */}
      {isVideoModalOpen && game.trailerUrl && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-6 backdrop-blur-md"
          onClick={() => setIsVideoModalOpen(false)}
        >
          <div 
            className="relative w-full max-w-4xl aspect-video rounded-xl overflow-hidden border border-bronze/30 bg-black shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-charcoal/80 border border-ivory/20 text-ivory hover:bg-gold hover:text-charcoal transition-all cursor-pointer"
              title="Close Video"
            >
              <X size={18} />
            </button>
            {isVideoFile ? (
              <video
                src={game.trailerUrl}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain bg-black"
              />
            ) : (
              <iframe
                src={game.trailerUrl}
                title={`${game.name} Official Trailer`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-none"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default GameCard;
