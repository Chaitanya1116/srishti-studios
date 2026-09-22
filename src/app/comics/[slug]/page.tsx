'use client';

import React, { use } from 'react';
import { getComicBySlug } from '@/utils/comicsData';
import ComicReader from '@/components/ComicReader';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageWrapper from '@/components/PageWrapper';
import { ArrowLeft } from 'lucide-react';

interface ComicPageProps {
  params: Promise<{ slug: string }>;
}

export default function ComicSlugPage({ params }: ComicPageProps) {
  const resolvedParams = use(params);
  const rawSlug = resolvedParams?.slug || '';
  const comic = getComicBySlug(rawSlug);

  if (!comic) {
    return (
      <>
        <Navbar />
        <PageWrapper>
          <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-20 bg-charcoal">
            <h1 className="text-3xl font-serif text-ivory mb-2">Comic Not Found</h1>
            <p className="text-xs text-ivory/60 mb-6 font-light">
              The requested comic book or chapter could not be located in our archives.
            </p>
            <Link
              href="/comics"
              className="inline-flex items-center gap-2 bg-gold text-charcoal font-bold text-xs uppercase tracking-widest px-6 py-3 rounded hover:bg-ivory transition-all"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Srishti Comics
            </Link>
          </div>
        </PageWrapper>
        <Footer />
      </>
    );
  }

  return <ComicReader comic={comic} />;
}
