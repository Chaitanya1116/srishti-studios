'use client';

import React, { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MandalaDivider from '@/components/MandalaDivider';
import PageWrapper from '@/components/PageWrapper';
import { useApp } from '@/context/AppContext';
import { Calendar, User, ArrowLeft, BookOpen, Share2 } from 'lucide-react';

interface NewsDetailsProps {
  params: Promise<{ slug: string }>;
}

export default function NewsDetails({ params }: NewsDetailsProps) {
  const resolvedParams = use(params);
  const { posts } = useApp();
  const post = posts.find((p) => p.slug === resolvedParams.slug);

  if (!post) {
    return (
      <>
        <Navbar />
        <PageWrapper>
          <div className="flex-1 flex flex-col items-center justify-center py-32 text-center">
            <h1 className="text-2xl font-serif text-ivory">Article Not Found</h1>
            <p className="text-xs text-ivory/50 mt-2">The requested update could not be found.</p>
            <Link href="/news" className="mt-6 text-xs text-gold uppercase font-bold tracking-widest hover:text-white transition-colors">
              &larr; Back to Chronicles
            </Link>
          </div>
        </PageWrapper>
        <Footer />
      </>
    );
  }

  // Formatting helper for simple text/markdown elements
  const renderContent = (content: string) => {
    return content.split('\n\n').map((paragraph, idx) => {
      if (paragraph.startsWith('### ')) {
        return (
          <h3 key={idx} className="text-lg md:text-xl font-serif font-medium text-ivory pt-6 pb-2">
            {paragraph.replace('### ', '')}
          </h3>
        );
      }
      if (paragraph.startsWith('1. ') || paragraph.startsWith('- ')) {
        const items = paragraph.split('\n');
        return (
          <ul key={idx} className="list-disc pl-5 space-y-2 text-xs leading-relaxed text-ivory/75 font-light my-4">
            {items.map((item, i) => (
              <li key={i}>{item.replace(/^(\d+\.\s*|-\s*)/, '')}</li>
            ))}
          </ul>
        );
      }
      return (
        <p key={idx} className="text-xs md:text-sm leading-relaxed text-ivory/80 font-light text-justify my-4">
          {paragraph}
        </p>
      );
    });
  };

  return (
    <>
      <Navbar />
      <PageWrapper>
        <article className="py-16 bg-charcoal">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            
            {/* Back to news link */}
            <div className="mb-8">
              <Link
                href="/news"
                className="inline-flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-gold hover:text-white transition-colors"
              >
                <ArrowLeft size={12} /> Back to Chronicles
              </Link>
            </div>

            {/* Post Header */}
            <header className="space-y-4">
              <span className="inline-flex rounded border border-bronze/30 bg-gold/5 px-2.5 py-0.5 text-[9px] uppercase tracking-widest text-gold font-medium">
                {post.category}
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light leading-tight text-ivory">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2 border-b border-bronze/10 pb-6 text-xs text-sandstone font-light">
                <span className="flex items-center gap-1.5"><Calendar size={14} /> {post.publishDate}</span>
                <span className="flex items-center gap-1.5"><User size={14} /> {post.author}</span>
              </div>
            </header>

            {/* Cover Image */}
            <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-bronze/20 bg-forest/10 my-8 shadow-lg">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 800px"
              />
            </div>

            {/* Content Body */}
            <div className="space-y-2 prose prose-invert max-w-none">
              {renderContent(post.content)}
            </div>

            {/* Share Footer */}
            <div className="mt-16 pt-6 border-t border-bronze/10 flex items-center justify-between text-xs text-sandstone font-light">
              <span>Srishti Studios &copy; {new Date().getFullYear()}</span>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Article link copied to clipboard.');
                }}
                className="hover:text-gold transition-colors flex items-center gap-1.5 font-medium uppercase tracking-wider text-[10px]"
              >
                <Share2 size={14} /> Share Article
              </button>
            </div>

          </div>
        </article>

        <MandalaDivider />
      </PageWrapper>
      <Footer />
    </>
  );
}
