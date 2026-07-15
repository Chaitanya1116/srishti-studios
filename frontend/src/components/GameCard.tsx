'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Game } from '@/context/AppContext';
import { Play, Heart, Download, ExternalLink } from 'lucide-react';

interface GameCardProps {
  game: Game;
}

export const GameCard: React.FC<GameCardProps> = ({ game }) => {
  return (
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

        {/* Status Tag */}
        <div className="absolute top-4 right-4 z-20">
          <span className="inline-flex items-center rounded border border-bronze/30 bg-charcoal/80 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-widest text-gold backdrop-blur-sm">
            {game.status}
          </span>
        </div>

        {/* Hover play trailer shortcut button */}
        {game.trailerUrl && (
          <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Link 
              href={`/games/${game.slug}#trailer`} 
              className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/90 text-charcoal hover:bg-ivory hover:scale-110 transition-all shadow-lg"
            >
              <Play size={20} fill="currentColor" className="ml-1" />
            </Link>
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
            <a
              href={game.downloadLinks.steam || game.downloadLinks.epic || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 rounded bg-gold py-2 text-[10px] uppercase font-bold tracking-widest text-charcoal hover:bg-ivory transition-all"
            >
              Get Game <Download size={12} />
            </a>
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
  );
};
export default GameCard;
