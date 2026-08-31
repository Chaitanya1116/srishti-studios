'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MandalaDivider from '@/components/MandalaDivider';
import PageWrapper from '@/components/PageWrapper';
import { useApp } from '@/context/AppContext';
import { Calendar, User, ArrowRight, BookOpen } from 'lucide-react';

export default function News() {
  const { posts } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const categories = ['ALL', 'DEV BLOG', 'ANNOUNCEMENT', 'PATCH NOTES'];

  const filteredPosts = posts.filter(post => {
    return activeCategory === 'ALL' || post.category.toUpperCase() === activeCategory;
  });

  return (
    <>
      <Navbar />
      <PageWrapper>
        {/* Header */}
        <section className="relative bg-charcoal py-20 border-b border-bronze/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-[10px] uppercase tracking-[0.35em] font-semibold text-gold">The Chronicle</span>
            <h1 className="text-4xl sm:text-5xl font-serif font-light tracking-wide text-ivory mt-4">
              Studio <span className="italic gold-gradient-text font-normal">Chronicles</span>
            </h1>
            <p className="mt-4 text-xs text-ivory/60 max-w-md mx-auto font-light leading-relaxed">
              Read our development updates, technology notes, and studio announcements.
            </p>
          </div>
        </section>

        {/* Filter Navigation */}
        <section className="py-6 bg-charcoal border-b border-bronze/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded px-4 py-1.5 text-[10px] uppercase font-bold tracking-widest transition-all ${
                    activeCategory === cat
                      ? 'bg-gold text-charcoal'
                      : 'border border-bronze/10 text-ivory/70 hover:border-bronze hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* News Grid */}
        <section className="py-20 bg-charcoal">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <article
                    key={post.id}
                    className="flex flex-col overflow-hidden rounded-lg border border-bronze/10 bg-forest/5 hover:border-gold/30 hover:shadow-[0_0_30px_rgba(168,117,59,0.05)] transition-all duration-300 group"
                  >
                    {/* Cover Image */}
                    <div className="relative aspect-video w-full overflow-hidden">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-102"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="inline-flex rounded bg-charcoal/90 px-2 py-0.5 text-[9px] uppercase tracking-widest text-gold border border-bronze/20 font-medium">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="flex flex-1 flex-col p-6 space-y-4">
                      {/* Date */}
                      <div className="flex items-center gap-4 text-[10px] tracking-wider text-sandstone uppercase font-medium">
                        <span className="flex items-center gap-1"><Calendar size={12} /> {post.publishDate}</span>
                        <span className="flex items-center gap-1"><User size={12} /> {post.author.split(',')[0]}</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-serif font-medium tracking-wide text-ivory group-hover:text-gold transition-colors leading-snug">
                        <Link href={`/news/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h3>

                      {/* Summary */}
                      <p className="flex-1 text-xs leading-relaxed text-ivory/60 font-light line-clamp-3">
                        {post.summary}
                      </p>

                      {/* Read CTA */}
                      <div className="pt-4 border-t border-bronze/10">
                        <Link
                          href={`/news/${post.slug}`}
                          className="inline-flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-widest text-gold hover:text-white transition-colors"
                        >
                          Read Update <ArrowRight size={12} />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-24 max-w-sm mx-auto border border-dashed border-bronze/10 rounded">
                <p className="text-sm font-serif text-ivory/50">No updates discovered in this category.</p>
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
