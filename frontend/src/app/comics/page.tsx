import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageWrapper from '@/components/PageWrapper';
import MandalaDivider from '@/components/MandalaDivider';
import { COMICS_LIST } from '@/utils/comicsData';
import { Eye, Download, BookOpen, Sparkles, Layers, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'SRISHTI COMICS | Official Graphic Novels & Digital Comics',
  description: 'Explore original illustrated comic books and graphic novels from Srishti Studios. Read online or download high-resolution PDF editions.',
  openGraph: {
    title: 'SRISHTI COMICS | Srishti Studios',
    description: 'Original illustrated comic books and graphic novels from Srishti Studios.',
  }
};

export default function ComicsPage() {
  return (
    <>
      <Navbar />
      <PageWrapper>
        {/* HERO HEADER */}
        <section className="relative py-24 bg-charcoal border-b border-bronze/10 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(168,117,59,0.15),transparent_70%)] pointer-events-none" />
          <div className="absolute inset-0 stone-noise opacity-40 mix-blend-overlay pointer-events-none" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 mb-4 px-3.5 py-1 rounded-full border border-gold/30 bg-gold/10">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold">
                SRISHTI GRAPHIC NOVEL LIBRARY
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif text-ivory tracking-wide font-normal mb-4">
              SRISHTI <span className="gold-gradient-text italic font-normal">COMICS</span>
            </h1>

            <p className="text-base sm:text-lg text-ivory/80 max-w-2xl mx-auto font-light leading-relaxed">
              Original stories from Srishti Studios. Crafting immersive narrative worlds through rich, illustrated digital graphic novels.
            </p>

            <p className="text-xs text-gold/70 mt-3 tracking-widest font-serif italic">
              "Stories worth remembering."
            </p>
          </div>
        </section>

        {/* COMICS LIBRARY GALLERY */}
        <section className="py-20 bg-[#0E0E0E] min-h-[60vh]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-[10px] uppercase tracking-[0.35em] font-bold text-gold">
                DIGITAL EDITIONS
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-ivory mt-2 font-normal">
                FEATURED <span className="italic text-gold">RELEASES</span>
              </h2>
              <p className="text-xs text-ivory/60 mt-2 font-light">
                Select a comic to read directly inside your browser or download the full illustrated PDF file.
              </p>
            </div>

            {/* COMICS CARDS GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
              {COMICS_LIST.map((comic) => (
                <div 
                  key={comic.id}
                  className="group relative rounded-2xl border border-bronze/25 bg-gradient-to-b from-[#141715]/90 to-[#0A0C0A] overflow-hidden flex flex-col justify-between hover:border-gold/50 transition-all duration-300 shadow-2xl hover:shadow-[0_10px_30px_rgba(229,197,131,0.1)]"
                >
                  {/* CARD COVER HEADER IMAGE */}
                  <div className="relative h-72 sm:h-80 w-full overflow-hidden border-b border-bronze/15">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C0A] via-transparent to-black/40 z-10" />
                    
                    <Image
                      src={comic.coverImage}
                      alt={comic.title}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out filter brightness-90 contrast-105"
                    />

                    {/* BADGES ON IMAGE */}
                    <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-gold bg-charcoal/90 border border-gold/40 px-3 py-1 rounded backdrop-blur-md">
                        {comic.genre[0]}
                      </span>
                      {comic.chapters && comic.chapters.length > 0 && (
                        <span className="text-[10px] uppercase font-bold tracking-widest text-ivory/90 bg-forest/80 border border-bronze/30 px-2.5 py-1 rounded backdrop-blur-md flex items-center gap-1">
                          <Layers className="w-3 h-3 text-gold" /> {comic.chapters.length} Chapters
                        </span>
                      )}
                    </div>

                    <div className="absolute top-4 right-4 z-20">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-ivory/70 bg-charcoal/80 border border-bronze/20 px-2.5 py-1 rounded">
                        {comic.releaseYear}
                      </span>
                    </div>

                    {/* OVERLAY TITLE ON IMAGE */}
                    <div className="absolute bottom-4 left-6 right-6 z-20">
                      {comic.japaneseTitle && (
                        <span className="text-xs text-gold/80 font-serif tracking-widest block mb-1">
                          {comic.japaneseTitle}
                        </span>
                      )}
                      <h3 className="text-2xl sm:text-3xl font-serif text-ivory font-normal tracking-wide group-hover:text-gold transition-colors">
                        {comic.title}
                      </h3>
                      <p className="text-xs text-gold/90 font-light italic mt-0.5">
                        {comic.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* CARD BODY CONTENT */}
                  <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-xs text-ivory/75 font-light leading-relaxed mb-6">
                        {comic.shortDescription}
                      </p>

                      {/* CHAPTER LIST QUICK PREVIEW */}
                      {comic.chapters && comic.chapters.length > 0 && (
                        <div className="mb-6 border-t border-bronze/10 pt-4">
                          <span className="text-[10px] uppercase font-bold tracking-widest text-gold block mb-2">
                            Available Chapters:
                          </span>
                          <div className="space-y-1.5">
                            {comic.chapters.slice(0, 2).map((ch) => (
                              <div key={ch.id} className="text-xs text-ivory/60 flex items-center justify-between bg-charcoal/40 px-3 py-1.5 rounded border border-bronze/10">
                                <span className="font-medium text-ivory/80 truncate">{ch.title}</span>
                                <span className="text-[10px] text-gold/70 flex-shrink-0 ml-2">PDF</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* CARD ACTIONS: READ COMIC & DOWNLOAD PDF */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-bronze/15">
                      <Link
                        href={`/comics/${comic.slug}`}
                        className="w-full inline-flex items-center justify-center gap-2 rounded bg-gold py-3 px-4 text-xs font-bold uppercase tracking-widest text-charcoal hover:bg-ivory transition-all shadow-md group/btn"
                      >
                        <Eye className="w-4 h-4" /> READ COMIC
                      </Link>

                      <a
                        href={comic.pdfUrl}
                        download
                        className="w-full inline-flex items-center justify-center gap-2 rounded bg-charcoal border border-bronze/40 py-3 px-4 text-xs font-bold uppercase tracking-widest text-gold hover:border-gold hover:text-ivory transition-all shadow-sm"
                      >
                        <Download className="w-4 h-4" /> DOWNLOAD PDF
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <MandalaDivider className="my-16 opacity-30" />

            {/* CALLOUT FOOTER BANNER */}
            <div className="rounded-2xl border border-bronze/20 bg-forest/20 p-8 sm:p-12 text-center max-w-4xl mx-auto relative overflow-hidden">
              <div className="relative z-10">
                <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-gold">
                  STORYTELLING AT SRISHTI
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif text-ivory mt-2 font-normal">
                  Lore-Driven Universe Development
                </h3>
                <p className="text-xs sm:text-sm text-ivory/70 mt-3 max-w-xl mx-auto font-light leading-relaxed">
                  Every comic published by Srishti Studios expands the backstory, characters, and mythology of our AAA and indie game projects.
                </p>
                <div className="mt-6">
                  <Link
                    href="/games"
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold hover:text-white transition-colors border-b border-gold/40 pb-1"
                  >
                    Explore Games Portfolio <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </PageWrapper>
      <Footer />
    </>
  );
}
