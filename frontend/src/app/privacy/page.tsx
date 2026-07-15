'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MandalaDivider from '@/components/MandalaDivider';
import PageWrapper from '@/components/PageWrapper';

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <PageWrapper>
        <section className="py-20 bg-charcoal">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-6">
            <span className="text-[10px] uppercase tracking-widest text-gold font-bold">Legal</span>
            <h1 className="text-3xl sm:text-4xl font-serif font-light text-ivory">Privacy Policy</h1>
            <div className="h-[1px] w-12 bg-bronze/40" />
            
            <div className="space-y-4 text-xs leading-relaxed text-ivory/70 font-light text-justify">
              <p>
                At Srishti Studios, accessible from our primary games portal, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Srishti Studios and how we use it.
              </p>
              <h3 className="text-sm font-serif font-semibold text-ivory pt-4 uppercase tracking-wider text-gold">Log Files</h3>
              <p>
                Srishti Studios follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks.
              </p>
              <h3 className="text-sm font-serif font-semibold text-ivory pt-4 uppercase tracking-wider text-gold">Consent</h3>
              <p>
                By using our website, you hereby consent to our Privacy Policy and agree to its terms. If you have questions or require more information about our Privacy Policy, do not hesitate to contact us at hello@srishtistudios.com.
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
