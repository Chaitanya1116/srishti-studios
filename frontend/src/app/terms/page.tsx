'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MandalaDivider from '@/components/MandalaDivider';
import PageWrapper from '@/components/PageWrapper';

export default function TermsOfService() {
  return (
    <>
      <Navbar />
      <PageWrapper>
        <section className="py-20 bg-charcoal">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-6">
            <span className="text-[10px] uppercase tracking-widest text-gold font-bold">Legal</span>
            <h1 className="text-3xl sm:text-4xl font-serif font-light text-ivory">Terms of Service</h1>
            <div className="h-[1px] w-12 bg-bronze/40" />
            
            <div className="space-y-4 text-xs leading-relaxed text-ivory/70 font-light text-justify">
              <p>
                Welcome to Srishti Studios. These terms and conditions outline the rules and regulations for the use of Srishti Studios' Website.
              </p>
              <p>
                By accessing this website we assume you accept these terms and conditions. Do not continue to use Srishti Studios if you do not agree to take all of the terms and conditions stated on this page.
              </p>
              <h3 className="text-sm font-serif font-semibold text-ivory pt-4 uppercase tracking-wider text-gold">Intellectual Property Rights</h3>
              <p>
                Other than the content you own, under these Terms, Srishti Studios and/or its licensors own all the intellectual property rights and materials contained in this Website. You are granted a limited license only for purposes of viewing the material contained on this Website.
              </p>
              <h3 className="text-sm font-serif font-semibold text-ivory pt-4 uppercase tracking-wider text-gold">Limitation of Liability</h3>
              <p>
                In no event shall Srishti Studios, nor any of its officers, directors and employees, be held liable for anything arising out of or in any way connected with your use of this Website whether such liability is under contract.
              </p>
            </div>
          </div>
        </section>
        <MandalaDivider />
      </PageWrapper>
      <Footer />
    </>
  );
}
