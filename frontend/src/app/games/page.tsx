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

  const filteredGames = games.filter((game) => {
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
