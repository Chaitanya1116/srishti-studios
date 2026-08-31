'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MandalaDivider from '@/components/MandalaDivider';
import PageWrapper from '@/components/PageWrapper';
import { motion } from 'framer-motion';
import { Target, Compass, Award, Users, CheckCircle } from 'lucide-react';

export default function About() {
  const timelineEvents = [
    {
      year: '2022',
      title: 'Foundation',
      description: 'Srishti Studios is formed as a fully remote team with a core group of senior industry veterans seeking to redefine AAA storytelling.'
    },
    {
      year: '2023',
      title: 'Pre-Production & Seed Funding',
      description: 'Secured venture backing to develop proprietary environment workflow techniques focused on stone masonry and realistic lighting.'
    },
    {
      year: '2024',
      title: 'Production on Symmetry',
      description: 'Officially entered active production for our flagship title, Symmetry: Shadows of the Mandala, expanding our circle of remote visual and tech collaborators.'
    },
    {
      year: '2026',
      title: 'Next Gen Focus',
      description: 'Optimizing custom game systems for PlayStation 5 and Xbox Series X, setting up international publishing channels.'
    }
  ];

  return (
    <>
      <Navbar />
      <PageWrapper>
        {/* Cinematic Header */}
        <section className="relative bg-charcoal py-24 border-b border-bronze/10">
          <div className="absolute inset-0 bg-radial-gradient from-forest/5 to-transparent pointer-events-none" />
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-[10px] uppercase tracking-[0.35em] font-semibold text-gold">The Studio</span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-light tracking-wide text-ivory mt-4">
              Building Immersive <br />
              <span className="italic gold-gradient-text font-normal">Symmetric Realms</span>
            </h1>
            <p className="mt-6 text-sm text-ivory/60 max-w-xl mx-auto font-light leading-relaxed">
              We are a team of environment sculptors, gameplay engineers, and interactive architects aiming to create digital art that endures.
            </p>
          </div>
        </section>

        {/* Meaning of Srishti Section */}
        <section className="py-24 bg-charcoal">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
              <div className="md:col-span-7 space-y-6">
                <span className="text-[10px] uppercase tracking-widest font-semibold text-gold">Our Name</span>
                <h2 className="text-3xl font-serif font-light text-ivory">The Concept of "Srishti"</h2>
                <div className="h-[1px] w-20 bg-bronze/40" />
                <p className="text-xs text-ivory/80 leading-relaxed font-light">
                  Srishti is a Sanskrit term representing <strong className="text-gold font-normal">Creation</strong>—the transformation of the formless and chaotic into ordered, symmetrical form. 
                </p>
                <p className="text-xs text-ivory/70 leading-relaxed font-light">
                  In a modern digital canvas, we interpret Srishti as the ultimate expression of creative design. It represents the meticulous arrangement of pixels, polygon vertices, acoustic waves, and logical statements to form a coherent, self-sustaining virtual universe. 
                </p>
                <p className="text-xs text-ivory/70 leading-relaxed font-light">
                  Rather than relying on hyper-active flashing visuals, our creation process prioritizes structural balance, volumetric lighting depth, and structural parries—building game worlds that feel calm, solid, tactile, and worth remembering.
                </p>
              </div>
              
              {/* Symmetrical Geometric Graphic */}
              <div className="md:col-span-5 flex justify-center">
                <div className="relative h-64 w-64 border border-bronze/20 rounded-full flex items-center justify-center">
                  <div className="absolute h-48 w-48 border border-bronze/10 rounded-full animate-[spin_60s_linear_infinite]" />
                  <div className="absolute h-36 w-36 border border-gold/15 transform rotate-45" />
                  <div className="absolute h-36 w-36 border border-gold/15 transform -rotate-45" />
                  <svg width="40" height="40" viewBox="0 0 100 100" fill="none" stroke="#A8753B" strokeWidth="2" className="text-bronze">
                    <circle cx="50" cy="50" r="15" />
                    <line x1="50" y1="5" x2="50" y2="95" strokeDasharray="3 3" />
                    <line x1="5" y1="50" x2="95" y2="50" strokeDasharray="3 3" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        <MandalaDivider />

        {/* Vision, Mission, Values */}
        <section className="py-24 bg-charcoal/20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Vision */}
              <div className="p-8 border border-bronze/10 bg-forest/5 rounded-lg flex items-start gap-6">
                <div className="h-10 w-10 flex items-center justify-center rounded-full bg-bronze/10 text-gold border border-bronze/20 flex-shrink-0">
                  <Compass size={18} />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-serif text-ivory">Our Vision</h3>
                  <p className="text-xs text-ivory/60 leading-relaxed font-light">
                    To establish a world-class studio that matches the technical finish and environmental depth of AAA industry giants, showcasing original Indian aesthetic craftsmanship in a modern global market.
                  </p>
                </div>
              </div>

              {/* Mission */}
              <div className="p-8 border border-bronze/10 bg-forest/5 rounded-lg flex items-start gap-6">
                <div className="h-10 w-10 flex items-center justify-center rounded-full bg-bronze/10 text-gold border border-bronze/20 flex-shrink-0">
                  <Target size={18} />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-serif text-ivory">Our Mission</h3>
                  <p className="text-xs text-ivory/60 leading-relaxed font-light">
                    To engineer gameplay mechanics and narratives that value player intelligence, utilizing photogrammetry, cinematic orchestrations, and structural puzzles that foster focus and peace.
                  </p>
                </div>
              </div>
            </div>

            {/* Core Values */}
            <div className="mt-16 text-center">
              <span className="text-[10px] uppercase tracking-widest font-semibold text-gold mb-8 block">Our Tenets</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { icon: Award, name: 'AAA Polish', desc: 'Refusing shortcuts. Every environment asset is carefully sculpted and performance profiled.' },
                  { icon: Users, name: 'Sustained Team health', desc: 'No crunch. We build in a calm workspace, believing peaceful minds build deep games.' },
                  { icon: CheckCircle, name: 'Design Honesty', desc: 'Muted layouts, no predatory monetization schemas, absolute clarity for players.' },
                  { icon: Compass, name: 'Creative Respect', desc: 'Honoring historical and cultural architectural aesthetics with modern luxury elegance.' }
                ].map((val, idx) => (
                  <div key={idx} className="flex flex-col items-center text-center p-6 border border-bronze/5 rounded bg-[#0b0b0b]">
                    <val.icon className="text-gold mb-4" size={24} />
                    <h4 className="text-sm font-semibold tracking-wide text-ivory font-serif">{val.name}</h4>
                    <p className="text-xs text-ivory/50 mt-2 leading-relaxed font-light">{val.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-24 bg-charcoal border-t border-bronze/10">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-[10px] uppercase tracking-widest font-semibold text-gold">The Journey</span>
              <h2 className="text-3xl font-serif font-light text-ivory mt-2">Chronicle of Creation</h2>
            </div>

            <div className="relative border-l border-bronze/20 ml-4 md:ml-32 pl-8 md:pl-16 space-y-12 py-4">
              {timelineEvents.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Timeline Dot */}
                  <div className="absolute -left-[41px] md:-left-[73px] top-1.5 h-5 w-5 rounded-full border-2 border-gold bg-charcoal flex items-center justify-center z-10 shadow">
                    <div className="h-2 w-2 rounded-full bg-bronze" />
                  </div>

                  {/* Year Tag for Desktop */}
                  <div className="absolute left-[-160px] top-1 text-right w-28 hidden md:block">
                    <span className="text-lg font-serif font-medium tracking-wide text-gold">{event.year}</span>
                  </div>

                  {/* Mobile Year Tag */}
                  <div className="text-xs font-semibold text-gold md:hidden mb-1 uppercase tracking-widest">{event.year}</div>

                  <h3 className="text-lg font-serif font-medium text-ivory">{event.title}</h3>
                  <p className="text-xs text-ivory/60 mt-2 leading-relaxed max-w-xl font-light">
                    {event.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </PageWrapper>
      <Footer />
    </>
  );
}
