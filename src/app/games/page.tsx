'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GameCard from '@/components/GameCard';
import PageWrapper from '@/components/PageWrapper';
import MandalaDivider from '@/components/MandalaDivider';
import { useApp } from '@/context/AppContext';
import { Search } from 'lucide-react';

export default function Games() {
  const { games } = useApp();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  // Guarantee RangRush is always present as a Released Game
  const allGames = [...games];
  const rangRushIdx = allGames.findIndex(g => g.slug === 'rangrush' || g.id === 'game-rangrush' || g.name.toLowerCase().includes('rangrush'));
  
  if (rangRushIdx === -1) {
    allGames.unshift({
      id: 'game-rangrush',
      name: 'RangRush: Elements of Srishti',
      slug: 'rangrush',
      genre: 'Match-3 Fantasy Puzzle',
      platforms: ['Web', 'Mobile', 'PC'],
      description: 'Master the six mystical elements of Srishti in an original browser match-3 puzzle game with 20 levels, powerful elemental bursts, and cascading combos.',
      story: 'Awaken the elemental forces of creation: Agni, Jala, Prithvi, Vajra, Chandra, and Surya. Navigate 20 intricate puzzle chambers, shatter ancient stone seals, and harness powerful elemental line blasters and area bursts to resolve the great mandala.',
      features: [
        'Six Mystical Elements: Agni (Fire), Jala (Water), Prithvi (Earth), Vajra (Lightning), Chandra (Moon), and Surya (Sun).',
        '20 Playable Levels: Increasing difficulty, move limits, score targets, and obstacle clearing goals.',
        'Elemental Power-Ups: Agni Blast (Row), Vajra Strike (Column), Surya Burst (Area), and Chandra Shatter (Multi-target).',
        'Cascading Combo System: Chain reaction match multipliers with real-time procedural Web Audio API synthesis.'
      ],
      status: 'Released',
      artworkUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop',
      screenshots: [
        'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop'
      ],
      trailerUrl: '',
      downloadLinks: {},
      systemRequirements: {
        minimum: {
          os: 'Any Web Browser / Windows / macOS / Android / iOS',
          processor: 'Modern Dual-Core CPU',
          memory: '2 GB RAM',
          graphics: 'HTML5 Canvas Compatible GPU',
          storage: 'Online Browser Playable'
        },
        recommended: {
          os: 'Modern Web Browser (Chrome, Firefox, Safari, Edge)',
          processor: 'Quad-Core CPU',
          memory: '4 GB RAM',
          graphics: 'Hardware Accelerated Graphics',
          storage: 'Online Browser Playable'
        }
      }
    });
  } else {
    allGames[rangRushIdx] = {
      ...allGames[rangRushIdx],
      status: 'Released',
      slug: 'rangrush'
    };
  }

  const filteredGames = allGames.filter((game) => {
    const matchesSearch = game.name.toLowerCase().includes(search.toLowerCase()) || 
                          game.genre.toLowerCase().includes(search.toLowerCase());
    
    const matchesFilter = filterStatus === 'ALL' || game.status.toUpperCase() === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const filterTabs = ['ALL', 'IN PRODUCTION', 'PRE-ALPHA', 'CONCEPT', 'RELEASED'];

  return (
    <>
      <Navbar />
      <PageWrapper>
        {/* Header */}
        <section className="relative bg-charcoal py-20 border-b border-bronze/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-[10px] uppercase tracking-[0.35em] font-semibold text-gold">The Portfolio</span>
            <h1 className="text-4xl sm:text-5xl font-serif font-light tracking-wide text-ivory mt-4">
              Interactive <span className="italic gold-gradient-text font-normal">Creations</span>
            </h1>
            <p className="mt-4 text-xs text-ivory/60 max-w-md mx-auto font-light leading-relaxed">
              Explore the game worlds crafted by Srishti Studios. Filter by release status and explore trailer and story parameters.
            </p>
          </div>
        </section>

        {/* Filter and Search Bar */}
        <section className="py-8 bg-charcoal border-b border-bronze/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              
              {/* Filter Tabs */}
              <div className="flex flex-wrap gap-2 overflow-x-auto no-scrollbar pb-1">
                {filterTabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setFilterStatus(tab)}
                    className={`rounded px-4 py-2 text-[10px] uppercase font-bold tracking-widest transition-all ${
                      filterStatus === tab
                        ? 'bg-gold text-charcoal shadow-md'
                        : 'border border-bronze/20 text-ivory/80 hover:border-bronze hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="relative max-w-xs w-full flex items-center border-b border-bronze/30 focus-within:border-gold py-1">
                <Search size={16} className="text-ivory/40 mr-2" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search games..."
                  className="bg-transparent border-none outline-none text-xs text-ivory placeholder-ivory/40 w-full"
                />
              </div>

            </div>
          </div>
        </section>

        {/* Games Grid Showcase */}
        <section className="py-20 bg-charcoal">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {filteredGames.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredGames.map((game) => (
                  <GameCard key={game.id} game={game} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 border border-dashed border-bronze/10 rounded-lg max-w-md mx-auto">
                <span className="text-sm font-serif text-ivory/60 font-light block">No matches discovered</span>
                <p className="text-xs text-ivory/40 mt-2">Adjust your query or check back later for announcements.</p>
              </div>
            )}
          </div>
        </section>

        <MandalaDivider />
      </PageWrapper>
      <Footer />
    </>
  );
}
