'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Shield, User, LogOut, UserPlus, LogIn } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { token, user, logout } = useApp();

  const links = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Games', path: '/games' },
    { name: 'Srishti Comics', path: '/comics' },
    { name: 'News', path: '/news' },
    { name: 'Careers', path: '/careers' },
    { name: 'Press Kit', path: '/press-kit' },
    { name: 'Contact', path: '/contact' }
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-bronze/10 bg-charcoal/80 backdrop-blur-lg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center gap-3">
                <div className="relative h-12 w-28 md:w-36 overflow-hidden">
                  <Image
                    src="/LOGO.png"
                    alt="Srishti Studios Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-7">
              {links.map((link) => {
                const isActive = pathname === link.path || (link.path !== '/' && pathname.startsWith(link.path));
                return (
                  <Link
                    key={link.path}
                    href={link.path}
                    className="relative group text-xs font-medium tracking-widest uppercase transition-colors"
                  >
                    <span className={isActive ? 'text-gold font-bold' : 'text-ivory/80 group-hover:text-gold'}>
                      {link.name}
                    </span>
                    <span className={`absolute -bottom-1 left-0 h-[1px] bg-bronze transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`} />
                  </Link>
                );
              })}

              {/* User / Admin Authentication State */}
              {token && user ? (
                <div className="flex items-center gap-4 pl-4 border-l border-bronze/20">
                  {user.role === 'ADMIN' ? (
                    <Link
                      href="/admin/dashboard"
                      className="text-xs font-semibold text-gold hover:text-ivory flex items-center gap-1.5 uppercase tracking-wider bg-bronze/10 px-3 py-1.5 rounded border border-bronze/30 hover:border-gold transition-all"
                    >
                      <Shield size={14} className="text-gold" />
                      Admin Portal
                    </Link>
                  ) : (
                    <Link
                      href="/dashboard"
                      className="text-xs font-semibold text-ivory hover:text-gold flex items-center gap-1.5 uppercase tracking-wider bg-forest/30 px-3 py-1.5 rounded border border-bronze/20 hover:border-bronze transition-all"
                    >
                      <User size={14} className="text-gold" />
                      Dashboard
                    </Link>
                  )}

                  <button
                    onClick={logout}
                    className="text-ivory/60 hover:text-red-400 transition-colors p-1"
                    title={`Log out (${user.username})`}
                  >
                    <LogOut size={16} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3 pl-4 border-l border-bronze/20">
                  <Link
                    href="/login"
                    className="text-xs font-semibold text-ivory hover:text-gold uppercase tracking-wider flex items-center gap-1"
                  >
                    <LogIn size={13} /> Login
                  </Link>
                  <Link
                    href="/register"
                    className="text-xs font-bold text-charcoal bg-gold hover:bg-ivory px-3 py-1.5 rounded uppercase tracking-wider transition-all shadow-sm"
                  >
                    Register
                  </Link>
                </div>
              )}
            </nav>

            {/* Mobile Hamburger Button */}
            <div className="flex md:hidden items-center gap-3">
              {token && user && user.role === 'ADMIN' && (
                <Link href="/admin/dashboard" className="text-gold" title="Admin Portal">
                  <Shield size={18} />
                </Link>
              )}
              {token && user && user.role !== 'ADMIN' && (
                <Link href="/dashboard" className="text-ivory" title="User Dashboard">
                  <User size={18} />
                </Link>
              )}
              <button
                onClick={toggleMenu}
                className="text-ivory/80 hover:text-gold focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-20 z-40 bg-charcoal/95 border-b border-bronze/20 backdrop-blur-xl md:hidden py-8 px-6 shadow-2xl"
          >
            <nav className="flex flex-col space-y-6">
              {links.map((link) => {
                const isActive = pathname === link.path || (link.path !== '/' && pathname.startsWith(link.path));
                return (
                  <Link
                    key={link.path}
                    href={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`text-base font-medium tracking-widest uppercase transition-colors ${
                      isActive ? 'text-gold font-bold' : 'text-ivory/80 hover:text-gold'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              {token && user ? (
                <div className="pt-4 border-t border-bronze/10 flex items-center justify-between">
                  {user.role === 'ADMIN' ? (
                    <Link
                      href="/admin/dashboard"
                      onClick={() => setIsOpen(false)}
                      className="text-sm font-bold text-gold flex items-center gap-2 uppercase tracking-widest"
                    >
                      <Shield size={16} /> Admin Portal
                    </Link>
                  ) : (
                    <Link
                      href="/dashboard"
                      onClick={() => setIsOpen(false)}
                      className="text-sm font-bold text-ivory flex items-center gap-2 uppercase tracking-widest"
                    >
                      <User size={16} /> User Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="text-ivory/60 hover:text-red-400 flex items-center gap-2 text-xs"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              ) : (
                <div className="pt-4 border-t border-bronze/10 flex items-center gap-4">
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="text-sm font-semibold text-ivory flex items-center gap-2 uppercase tracking-wider"
                  >
                    <LogIn size={16} /> Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsOpen(false)}
                    className="text-sm font-bold text-charcoal bg-gold px-4 py-2 rounded uppercase tracking-wider"
                  >
                    Register
                  </Link>
                </div>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
export default Navbar;
