'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageWrapper from '@/components/PageWrapper';
import MandalaDivider from '@/components/MandalaDivider';
import { ComicBook } from '@/utils/comicsData';
import { 
  ArrowLeft, Download, ExternalLink, BookOpen, 
  Sparkles, Layers, ShieldAlert, Maximize2 
} from 'lucide-react';

interface ComicReaderProps {
  comic: ComicBook;
}

export default function ComicReader({ comic }: ComicReaderProps) {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

  const activeChapter = comic.chapters && comic.chapters.length > 0 
    ? comic.chapters[activeChapterIndex] 
    : null;

  const currentPdfUrl = activeChapter ? activeChapter.pdfUrl : comic.pdfUrl;
  const currentTitle = activeChapter ? `${comic.title} — ${activeChapter.title}` : comic.title;

  return (
    <>
      <Navbar />
      <PageWrapper>
        {/* TOP BAR / BACK NAVIGATION */}
        <div className="bg-charcoal border-b border-bronze/10 py-4 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl flex items-center justify-between">
            <Link 
              href="/comics" 
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold hover:text-ivory transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Comics
            </Link>
            
            <div className="flex items-center gap-3">
              <a
                href={currentPdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-ivory/80 hover:text-gold transition-colors bg-charcoal border border-bronze/20 px-3 py-1.5 rounded"
              >
                <ExternalLink className="w-3.5 h-3.5" /> Open Direct
              </a>

              <a
                href={currentPdfUrl}
                download
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-charcoal bg-gold hover:bg-ivory transition-all px-4 py-1.5 rounded shadow-sm"
              >
                <Download className="w-3.5 h-3.5" /> Download PDF
              </a>
            </div>
          </div>
        </div>

        {/* READER CONTENT AREA */}
        <main className="min-h-screen bg-[#0A0A0A] py-8 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            {/* COMIC HEADER */}
            <div className="mb-8 text-center sm:text-left flex flex-col sm:flex-row items-start sm:items-end justify-between border-b border-bronze/10 pb-6 gap-4">
              <div>
                <div className="inline-flex items-center gap-2 mb-2">
                  <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-gold bg-gold/10 px-2.5 py-0.5 rounded border border-gold/30">
                    OFFICIAL DIGITAL GRAPHIC NOVEL
                  </span>
                  {comic.japaneseTitle && (
                    <span className="text-xs text-gold/70 font-serif tracking-widest">
                      {comic.japaneseTitle}
                    </span>
                  )}
                </div>
                <h1 className="text-2xl sm:text-4xl font-serif text-ivory tracking-wide font-normal">
                  {comic.title} <span className="text-gold font-light italic sm:inline block">— {comic.subtitle}</span>
                </h1>
                <p className="text-xs text-ivory/60 mt-1 font-light max-w-2xl">
                  {comic.shortDescription}
                </p>
              </div>

              {/* CHAPTER SELECTOR TABS (IF MULTI-CHAPTER) */}
              {comic.chapters && comic.chapters.length > 0 && (
                <div className="w-full sm:w-auto">
                  <div className="text-[10px] uppercase font-semibold text-gold/80 tracking-widest mb-1.5 flex items-center gap-1 sm:justify-end">
                    <Layers className="w-3 h-3" /> Select Chapter:
                  </div>
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                    {comic.chapters.map((ch, idx) => (
                      <button
                        key={ch.id}
                        onClick={() => setActiveChapterIndex(idx)}
                        className={`px-3 py-1.5 text-xs font-bold tracking-wider uppercase rounded transition-all whitespace-nowrap ${
                          activeChapterIndex === idx
                            ? 'bg-gold text-charcoal shadow-md'
                            : 'bg-forest/30 text-ivory/70 hover:text-gold border border-bronze/20'
                        }`}
                      >
                        Ch. {ch.chapterNumber}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* EMBEDDED PDF CONTAINER */}
            <div className="relative w-full bg-charcoal rounded-xl border border-bronze/30 shadow-2xl overflow-hidden mb-8">
              <div className="bg-[#141414] px-4 py-3 border-b border-bronze/10 flex items-center justify-between text-xs text-ivory/70">
                <span className="flex items-center gap-2 font-medium truncate">
                  <BookOpen className="w-4 h-4 text-gold flex-shrink-0" />
                  <span className="truncate">{currentTitle}</span>
                </span>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <a
                    href={currentPdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gold flex items-center gap-1 transition-colors"
                  >
                    <Maximize2 className="w-3.5 h-3.5" /> Fullscreen
                  </a>
                </div>
              </div>

              {/* PDF VIEWER / IFRAME */}
              <div className="relative w-full h-[75vh] min-h-[500px] max-h-[900px] bg-charcoal">
                <iframe
                  src={`${currentPdfUrl}#toolbar=1&navpanes=0&scrollbar=1`}
                  className="w-full h-full border-0"
                  title={currentTitle}
                />
              </div>

              {/* FALLBACK & INSTRUCTIONS BAR */}
              <div className="bg-[#121212] p-4 border-t border-bronze/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <p className="text-ivory/60 text-center sm:text-left">
                  Having trouble loading the built-in reader? You can open or download the original file.
                </p>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <a
                    href={currentPdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-forest/40 border border-bronze/30 text-ivory hover:text-gold rounded text-xs transition-colors flex items-center gap-1"
                  >
                    <ExternalLink className="w-3 h-3" /> Open Comic
                  </a>
                  <a
                    href={currentPdfUrl}
                    download
                    className="px-3 py-1.5 bg-gold/20 border border-gold/40 text-gold hover:bg-gold hover:text-charcoal rounded text-xs font-bold transition-all flex items-center gap-1"
                  >
                    <Download className="w-3 h-3" /> Download PDF
                  </a>
                </div>
              </div>
            </div>

            {/* COMIC DETAILS & LORE BOX */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="md:col-span-2 rounded-xl border border-bronze/20 bg-forest/10 p-6">
                <h3 className="text-lg font-serif text-ivory mb-2 font-normal">
                  About <span className="text-gold">{comic.title}</span>
                </h3>
                <p className="text-xs text-ivory/80 leading-relaxed font-light mb-4">
                  {comic.fullDescription}
                </p>
                {activeChapter && (
                  <div className="p-3 bg-charcoal/60 rounded border border-bronze/15 text-xs text-ivory/70">
                    <span className="font-bold text-gold">{activeChapter.title}: </span>
                    {activeChapter.description}
                  </div>
                )}
              </div>

              <div className="rounded-xl border border-bronze/20 bg-charcoal/80 p-6 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-gold mb-3 border-b border-bronze/10 pb-2">
                    Comic Details
                  </h4>
                  <ul className="space-y-2 text-xs text-ivory/70">
                    <li className="flex justify-between">
                      <span className="text-ivory/40">Publisher:</span>
                      <span className="font-medium text-ivory">Srishti Studios</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-ivory/40">Story / Writer:</span>
                      <span className="font-medium text-ivory">{comic.author}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-ivory/40">Art Direction:</span>
                      <span className="font-medium text-ivory">{comic.artist}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-ivory/40">Release Year:</span>
                      <span className="font-medium text-ivory">{comic.releaseYear}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-ivory/40">Format:</span>
                      <span className="font-medium text-gold">Illustrated PDF</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-bronze/10">
                  <a
                    href={currentPdfUrl}
                    download
                    className="w-full py-2.5 bg-gold hover:bg-ivory text-charcoal font-bold text-xs uppercase tracking-widest rounded flex items-center justify-center gap-2 transition-all shadow-md"
                  >
                    <Download className="w-4 h-4" /> DOWNLOAD PDF
                  </a>
                </div>
              </div>
            </div>

            <MandalaDivider className="my-12 opacity-30" />
          </div>
        </main>
      </PageWrapper>
      <Footer />
    </>
  );
}
