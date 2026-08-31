'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MandalaDivider from '@/components/MandalaDivider';
import PageWrapper from '@/components/PageWrapper';
import { Download, ExternalLink, FileText, Image as ImageIcon, Box } from 'lucide-react';

export default function PressKit() {
  const assets = [
    {
      title: 'Studio Logos Pack',
      description: 'Contains high-resolution vectors, transparent PNGs, and monochrome bronze vectors.',
      size: '4.2 MB',
      icon: Box,
      downloadUrl: '/LOGO.png' // Redirects to our logo
    },
    {
      title: 'High-Res Screenshots Pack',
      description: 'Widescreen PBR screenshots of Symmetry and Aethelgard environment builds.',
      size: '28.5 MB',
      icon: ImageIcon,
      downloadUrl: '/LOGO.png'
    },
    {
      title: 'Corporate Fact Sheet',
      description: 'A compact PDF guide containing studio history, leadership bios, and coordinates.',
      size: '1.1 MB',
      icon: FileText,
      downloadUrl: '/LOGO.png'
    }
  ];

  return (
    <>
      <Navbar />
      <PageWrapper>
        {/* Header */}
        <section className="relative bg-charcoal py-20 border-b border-bronze/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-[10px] uppercase tracking-[0.35em] font-semibold text-gold">Press Room</span>
            <h1 className="text-4xl sm:text-5xl font-serif font-light tracking-wide text-ivory mt-4">
              Press <span className="italic gold-gradient-text font-normal">Kit</span>
            </h1>
            <p className="mt-4 text-xs text-ivory/60 max-w-md mx-auto font-light leading-relaxed">
              Download official brand assets, logos, screenshots, and review our company boilerplate descriptions.
            </p>
          </div>
        </section>

        {/* Fact Sheet / Boilerplate */}
        <section className="py-24 bg-charcoal">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
              {/* Left description */}
              <div className="md:col-span-8 space-y-6">
                <span className="text-[10px] uppercase tracking-widest font-semibold text-gold">Boilerplate</span>
                <h2 className="text-2xl font-serif font-light text-ivory">About Srishti Studios</h2>
                <div className="h-[1px] w-12 bg-bronze/40" />
                <p className="text-xs text-ivory/70 leading-relaxed font-light text-justify">
                  Srishti Studios is a fully remote, independent game development studio. Founded in 2022 by a collective of veteran gameplay engineers and environment artists, the studio is dedicated to creating premium, AAA-quality interactive experiences for PC and next-generation consoles.
                </p>
                <p className="text-xs text-ivory/70 leading-relaxed font-light text-justify">
                  Drawing structural design guidelines from traditional symmetry and geometric architectures, Srishti Studios interprets historical craftsmanship in a modern, luxury style. The studio maintains a strict anti-crunch workspace environment, aiming to prove that calm, sustainable production methodologies yield deep, highly polished, and memorable interactive worlds.
                </p>
              </div>

              {/* Right facts list */}
              <div className="md:col-span-4 rounded-lg border border-bronze/10 bg-forest/5 p-6 space-y-6">
                <h3 className="text-sm font-serif font-medium text-gold uppercase tracking-wider">Quick Facts</h3>
                <div className="h-[1px] w-full bg-bronze/10" />
                <div className="space-y-4 text-[10px] uppercase tracking-wider text-ivory/75 font-light">
                  <div className="flex justify-between border-b border-bronze/5 pb-2">
                    <span className="text-ivory/40">Founded</span>
                    <span>2022</span>
                  </div>
                  <div className="flex justify-between border-b border-bronze/5 pb-2">
                    <span className="text-ivory/40">Headquarters</span>
                    <span>Fully Remote</span>
                  </div>
                  <div className="flex justify-between border-b border-bronze/5 pb-2">
                    <span className="text-ivory/40">Staff Count</span>
                    <span>Founding Team</span>
                  </div>
                  <div className="flex justify-between pb-2">
                    <span className="text-ivory/40">Type</span>
                    <span>Independent Private</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <MandalaDivider />

        {/* Assets Downloads */}
        <section className="py-20 bg-charcoal/20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-[10px] uppercase tracking-widest font-semibold text-gold">Asset Library</span>
              <h2 className="text-3xl font-serif font-light text-ivory mt-2">Brand Materials</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {assets.map((asset, index) => {
                const IconComponent = asset.icon;
                return (
                  <div
                    key={index}
                    className="p-6 rounded border border-bronze/10 bg-[#0b0b0b] flex flex-col justify-between hover:border-gold/30 transition-all duration-300 group"
                  >
                    <div className="space-y-4">
                      <div className="h-10 w-10 flex items-center justify-center rounded-full bg-bronze/10 text-gold border border-bronze/20">
                        <IconComponent size={18} />
                      </div>
                      <h3 className="text-base font-serif font-medium text-ivory group-hover:text-gold transition-colors">
                        {asset.title}
                      </h3>
                      <p className="text-xs text-ivory/50 leading-relaxed font-light">
                        {asset.description}
                      </p>
                    </div>

                    <div className="mt-8 pt-4 border-t border-bronze/10 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest">
                      <span className="text-sandstone font-medium">{asset.size}</span>
                      <a
                        href={asset.downloadUrl}
                        download
                        className="text-gold hover:text-white transition-colors flex items-center gap-1"
                      >
                        Download <Download size={12} />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <MandalaDivider />
      </PageWrapper>
      <Footer />
    </>
  );
}
