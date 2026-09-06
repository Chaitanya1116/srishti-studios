'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageWrapper from '@/components/PageWrapper';
import { useApp } from '@/context/AppContext';
import { User, Gamepad2, Heart, Shield, LogOut, CheckCircle, Clock } from 'lucide-react';

export default function UserDashboard() {
  const { user, token, logout, games } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [token, router]);

  if (!user) {
    return null;
  }

  const releasedGames = games.filter(g => g.status === 'Released');

  return (
    <>
      <Navbar />
      <PageWrapper>
        <section className="bg-charcoal py-12 border-b border-bronze/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-forest/40 border border-bronze/30 flex items-center justify-center text-gold">
                  <User size={32} />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-serif text-ivory">{user.username}</h1>
                    <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded bg-bronze/20 text-gold border border-bronze/30">
                      {user.role} Account
                    </span>
                  </div>
                  <p className="text-xs text-ivory/60 mt-1">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {user.role === 'ADMIN' && (
                  <Link
                    href="/admin/dashboard"
                    className="flex items-center gap-2 px-4 py-2 bg-gold text-charcoal rounded text-xs font-bold uppercase tracking-widest hover:bg-ivory transition-all shadow"
                  >
                    <Shield size={14} /> Open Admin Portal
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-4 py-2 border border-bronze/30 text-ivory/80 rounded text-xs font-semibold uppercase tracking-widest hover:border-red-500/40 hover:text-red-300 transition-all"
                >
                  <LogOut size={14} /> Sign Out
                </button>
              </div>

            </div>
          </div>
        </section>

        {/* Dashboard Grid */}
        <section className="py-12 bg-charcoal min-h-[60vh]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
            
            {/* Account Status Card */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-forest/10 border border-bronze/20 rounded-lg p-6 space-y-2 relative overflow-hidden">
                <div className="flex items-center justify-between text-gold">
                  <span className="text-[10px] uppercase tracking-widest font-bold">Account Security</span>
                  <CheckCircle size={18} />
                </div>
                <div className="text-xl font-serif text-ivory">Active & Verified</div>
                <p className="text-xs text-ivory/50">Standard Player Role authenticated via Srishti Auth.</p>
              </div>

              <div className="bg-forest/10 border border-bronze/20 rounded-lg p-6 space-y-2 relative overflow-hidden">
                <div className="flex items-center justify-between text-gold">
                  <span className="text-[10px] uppercase tracking-widest font-bold">Released Games</span>
                  <Gamepad2 size={18} />
                </div>
                <div className="text-xl font-serif text-ivory">{releasedGames.length} Available</div>
                <p className="text-xs text-ivory/50">Full access to all released interactive games.</p>
              </div>

              <div className="bg-forest/10 border border-bronze/20 rounded-lg p-6 space-y-2 relative overflow-hidden">
                <div className="flex items-center justify-between text-gold">
                  <span className="text-[10px] uppercase tracking-widest font-bold">Favorites Library</span>
                  <Heart size={18} />
                </div>
                <div className="text-xl font-serif text-ivory">RangRush & Aether Forge</div>
                <p className="text-xs text-ivory/50">Bookmarked titles stored in player profile.</p>
              </div>
            </div>

            {/* Released Games List for Player */}
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-bronze/10 pb-4">
                <div>
                  <h2 className="text-xl font-serif text-ivory">Playable Game Library</h2>
                  <p className="text-xs text-ivory/50">Explore and play official Srishti Studios releases directly in your browser.</p>
                </div>
                <Link href="/games" className="text-xs text-gold font-bold uppercase tracking-widest hover:underline">
                  Browse All Releases &rarr;
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {releasedGames.map((game) => (
                  <div key={game.id} className="bg-forest/5 border border-bronze/20 rounded-lg overflow-hidden group hover:border-bronze transition-all">
                    <div className="h-44 relative bg-charcoal">
                      <img src={game.artworkUrl} alt={game.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute top-3 right-3 bg-gold text-charcoal font-bold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded">
                        RELEASED
                      </div>
                    </div>
                    <div className="p-5 space-y-3">
                      <span className="text-[10px] text-gold uppercase tracking-widest font-bold">{game.genre}</span>
                      <h3 className="text-base font-serif text-ivory">{game.name}</h3>
                      <p className="text-xs text-ivory/60 line-clamp-2">{game.description}</p>
                      <Link
                        href={`/games/${game.slug}`}
                        className="inline-block w-full text-center py-2.5 rounded bg-bronze/20 border border-bronze/30 text-xs font-bold text-ivory hover:bg-gold hover:text-charcoal transition-all uppercase tracking-wider mt-2"
                      >
                        Play / View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>
      </PageWrapper>
      <Footer />
    </>
  );
}
