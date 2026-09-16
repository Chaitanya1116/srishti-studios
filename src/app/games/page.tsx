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

  // Filter out any non-released draft/testing games for public visitors
  let publicGames = games.filter(g => {
    const st = (g.status || '').toUpperCase();
    return st === 'RELEASED' || st.includes('PRODUCTION') || st.includes('DEVELOPMENT') || st.includes('PRE') || st.includes('CONCEPT');
  });

  // Explicitly remove legacy Symmetry game if present
  publicGames = publicGames.filter(g => g.slug !== 'symmetry-shadows-of-the-mandala' && g.id !== 'game-1');

  // Guarantee RangRush is present
  const rangRushIdx = publicGames.findIndex(g => g.slug === 'rangrush' || g.id === 'game-rangrush');
  if (rangRushIdx === -1) {
    publicGames.unshift({
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
  }

  // Guarantee Kage No Koe is present as the IN PRODUCTION original game
  const kageNoKoeIdx = publicGames.findIndex(g => g.slug === 'kage-no-koe' || g.id === 'game-kage-no-koe' || g.name.toLowerCase().includes('kage'));
  const kageNoKoeData = {
    id: 'game-kage-no-koe',
    name: 'KAGE NO KOE — 影の声',
    slug: 'kage-no-koe',
    genre: 'Historical Samurai Mystery • Psychological Horror',
    platforms: ['PC', 'PS5', 'Xbox Series X'],
    description: 'A historical-feeling samurai mystery set in a remote Japanese mountain region where silence is used to contain something that can imitate the voices of the dead. Renjiro Kazehara, a wandering former samurai, becomes involved in the mystery and discovers that Kagamori is only the beginning of a much larger mystery involving seven mountains.',
    story: 'Kagamori is a remote mountain village where silence is required after the temple bell rings at sunset. Something beneath the mountain can hear voices and imitate the dead. Renjiro Kazehara, a wandering former samurai, becomes involved in the mystery and discovers that Kagamori is only one part of a much larger mystery involving seven mountains. Chapter II expands the mystery beyond Kagamori and introduces Akari, the mysterious Nameless Monk, the Seven Mountains, and the revelation that the seventh symbol may represent a door rather than a prison.',
    features: [
      'Historical Samurai Mystery & Psychological Horror: Uncover ancient mountain curses and vocal mimicry abominations beneath Kagamori.',
      'Cinematic Shadow Stance Combat: Manipulate dark energy vectors and execute fluid samurai counter-strikes.',
      'Official Illustrated Graphic Novel Series: Includes Chapter I (The Voice of the Shadow) and Chapter II (The Mountain Beyond — 山の向こう) with online PDF reader.',
      'Atmospheric Original Soundscape: High-definition cinematic audio and official studio trailer video.'
    ],
    status: 'In Production' as const,
    artworkUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=1200&auto=format&fit=crop',
    screenshots: [
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop'
    ],
    trailerUrl: '/Kage No Koe Trailer.mp4',
    downloadLinks: { steam: 'https://store.steampowered.com' },
    systemRequirements: {
      minimum: { os: 'Windows 10 64-bit', processor: 'Intel Core i5-9400F', memory: '16 GB RAM', graphics: 'NVIDIA GeForce GTX 1660 Super', storage: '50 GB SSD' },
      recommended: { os: 'Windows 11 64-bit', processor: 'Intel Core i7-12700K', memory: '32 GB RAM', graphics: 'NVIDIA GeForce RTX 4070', storage: '50 GB NVMe SSD' }
    },
    comicChapters: [
      {
        id: 'ch-1',
        title: 'CHAPTER I — THE VOICE OF THE SHADOW',
        pdfUrl: '/Kage No Koe_Chapter 1.pdf',
        description: 'Illustrated Graphic Novel — Chapter 1: The Silence of Kagamori'
      },
      {
        id: 'ch-2',
        title: 'CHAPTER II — THE MOUNTAIN BEYOND (山の向こう)',
        pdfUrl: '/Kage No Koe_Chapter 2.pdf',
        description: 'Illustrated Graphic Novel — Chapter 2: The Nameless Monk and the Seven Seals'
      }
    ]
  };

  if (kageNoKoeIdx === -1) {
    publicGames.push(kageNoKoeData);
  } else {
    publicGames[kageNoKoeIdx] = {
      ...publicGames[kageNoKoeIdx],
      ...kageNoKoeData
    };
  }

  const filteredGames = publicGames.filter((game) => {
    // Draft / non-released AI games must never appear publicly
    if (game.status === 'DRAFT' || game.status === 'DESIGNING' || game.status === 'BUILDING' || game.status === 'TESTING' || game.status === 'READY_FOR_REVIEW') {
      return false;
    }

    const matchesSearch = game.name.toLowerCase().includes(search.toLowerCase()) || 
                          game.genre.toLowerCase().includes(search.toLowerCase()) ||
                          game.description.toLowerCase().includes(search.toLowerCase());
    
    const statusUpper = game.status.toUpperCase();
    const matchesFilter = filterStatus === 'ALL' || 
                          statusUpper === filterStatus || 
                          (filterStatus === 'IN PRODUCTION' && (statusUpper.includes('PRODUCTION') || statusUpper.includes('DEVELOPMENT')));
    
    return matchesSearch && matchesFilter;
  });

  const filterTabs = ['ALL', 'RELEASED', 'IN PRODUCTION', 'PRE-ALPHA', 'CONCEPT'];

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
                    className={`rounded px-4 py-2 text-[10px] uppercase font-bold tracking-widest transition-all cursor-pointer ${
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
