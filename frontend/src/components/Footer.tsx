'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useApp } from '@/context/AppContext';
import { Mail, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const { subscribeNewsletter } = useApp();
  const [email, setEmail] = useState('');
  const [subscribed, setSubsubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    const success = await subscribeNewsletter(email);
    setLoading(false);

    if (success) {
      setSubsubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="w-full bg-[#090909] border-t border-bronze/10 text-ivory/80 pt-16 pb-12 mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 pb-12 border-b border-bronze/10">
          
          {/* Studio Brand Info */}
          <div className="flex flex-col space-y-4">
            <div className="relative h-12 w-28 md:w-36 overflow-hidden">
              <Image
                src="/LOGO.png"
                alt="Srishti Studios"
                fill
                className="object-contain filter grayscale opacity-90 hover:grayscale-0 transition-all duration-300"
              />
            </div>
            <p className="text-xs leading-relaxed text-ivory/60 max-w-xs font-light">
              Crafting worlds worth remembering. We build immersive, interactive experiences inspired by timeless symmetry, deep craftsmanship, and modern technology.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col space-y-3">
            <h4 className="text-xs uppercase font-semibold tracking-widest text-gold">Navigation</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <Link href="/" className="hover:text-gold transition-colors">Home</Link>
              <Link href="/about" className="hover:text-gold transition-colors">About Us</Link>
              <Link href="/games" className="hover:text-gold transition-colors">Games</Link>
              <Link href="/news" className="hover:text-gold transition-colors">News</Link>
              <Link href="/careers" className="hover:text-gold transition-colors">Careers</Link>
              <Link href="/press-kit" className="hover:text-gold transition-colors">Press Kit</Link>
              <Link href="/contact" className="hover:text-gold transition-colors">Contact</Link>
            </div>
          </div>

          {/* Connect & Socials */}
          <div className="flex flex-col space-y-3">
            <h4 className="text-xs uppercase font-semibold tracking-widest text-gold">Connect</h4>
            <p className="text-xs text-ivory/60">Follow our creative process on our channels.</p>
            <div className="flex space-x-4 pt-1">
              <Link href="https://twitter.com" target="_blank" className="hover:text-gold transition-colors" aria-label="Twitter/X">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </Link>
              <Link href="https://instagram.com" target="_blank" className="hover:text-gold transition-colors" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </Link>
              <Link href="https://youtube.com" target="_blank" className="hover:text-gold transition-colors" aria-label="YouTube">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.56 49.56 0 0 1-16.2 0A2 2 0 0 1 2.5 17z" />
                  <polygon points="10 15 15 12 10 9" fill="currentColor" />
                </svg>
              </Link>
            </div>
            <a href="mailto:hello@srishtistudios.com" className="text-xs hover:text-gold transition-colors pt-2 flex items-center gap-1 font-light">
              <Mail size={14} /> hello@srishtistudios.com
            </a>
          </div>

          {/* Newsletter Signup */}
          <div className="flex flex-col space-y-3">
            <h4 className="text-xs uppercase font-semibold tracking-widest text-gold">The Chronicle</h4>
            <p className="text-xs text-ivory/60">Subscribe to receive major studio releases and dev updates.</p>
            {subscribed ? (
              <div className="text-xs text-gold border border-gold/30 bg-gold/5 py-2 px-3 rounded font-medium">
                Welcome to our circle. Thank you for subscribing.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex border-b border-bronze/30 focus-within:border-gold py-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="bg-transparent border-none outline-none text-xs flex-1 text-ivory placeholder-ivory/30 pr-2"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="text-gold hover:text-white transition-colors"
                  aria-label="Subscribe"
                >
                  <ArrowRight size={16} className={loading ? 'animate-pulse' : ''} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Legal and Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 text-[10px] tracking-widest uppercase text-ivory/40 space-y-4 sm:space-y-0">
          <div>
            &copy; {new Date().getFullYear()} Srishti Studios. All Rights Reserved.
          </div>
          <div className="flex space-x-6">
            <Link href="/privacy" className="hover:text-gold transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gold transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
