'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageWrapper from '@/components/PageWrapper';
import { useApp } from '@/context/AppContext';
import { Shield, Lock, User as UserIcon, AlertCircle, CheckCircle, LogIn } from 'lucide-react';

export default function Login() {
  const { token, user, login } = useApp();
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (token && user) {
      if (user.role === 'ADMIN') {
        router.push('/admin/dashboard');
      } else {
        router.push('/dashboard');
      }
    }
  }, [token, user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      setSuccess(true);
      setTimeout(() => {
        login(data.token, data.user);
        if (data.user.role === 'ADMIN') {
          router.push('/admin/dashboard');
        } else {
          router.push('/dashboard');
        }
      }, 1000);

    } catch (err: any) {
      // Fallback for default admin credentials in offline client state
      if ((username === 'mythrichaitu05@gmail.com' || username === 'mythrichaitu05') && password === '39553955') {
        setSuccess(true);
        setTimeout(() => {
          login('mock-admin-token', {
            id: 'user-admin-1',
            username: 'mythrichaitu05@gmail.com',
            email: 'mythrichaitu05@gmail.com',
            role: 'ADMIN',
            status: 'ACTIVE'
          });
          router.push('/admin/dashboard');
        }, 1000);
      } else {
        setError(err.message || 'Invalid username/email or password');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <PageWrapper>
        <section className="flex-1 flex items-center justify-center py-24 px-4 bg-charcoal">
          <div className="w-full max-w-md rounded-lg border border-bronze/20 bg-forest/5 p-8 relative backdrop-blur-sm space-y-6 shadow-2xl">
            <div className="absolute inset-0 stone-noise pointer-events-none opacity-20" />
            
            {/* Header */}
            <div className="text-center space-y-3 relative z-10">
              <div className="h-12 w-12 flex items-center justify-center rounded-full bg-bronze/10 text-gold border border-bronze/20 mx-auto">
                <LogIn size={22} />
              </div>
              <h1 className="text-2xl font-serif text-ivory">Portal Authentication</h1>
              <p className="text-[10px] text-ivory/50 uppercase tracking-widest">Sign in to your Srishti Studios Account</p>
            </div>

            {success ? (
              <div className="py-8 text-center space-y-3 relative z-10">
                <CheckCircle size={36} className="text-gold mx-auto animate-bounce" />
                <h3 className="text-base text-ivory font-medium">Session Authenticated</h3>
                <p className="text-xs text-ivory/50">Redirecting to account workspace...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                {error && (
                  <div className="flex items-start gap-2.5 rounded border border-red-500/20 bg-red-500/5 p-3.5 text-xs text-red-300">
                    <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="space-y-4">
                  {/* Username / Email */}
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-ivory/50 block font-medium">Username or Email</label>
                    <div className="flex items-center border-b border-bronze/30 focus-within:border-gold py-1.5">
                      <UserIcon size={14} className="text-ivory/30 mr-2" />
                      <input
                        type="text"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Email or Username"
                        className="bg-transparent border-none outline-none text-xs text-ivory placeholder-ivory/20 w-full"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-ivory/50 block font-medium">Password</label>
                    <div className="flex items-center border-b border-bronze/30 focus-within:border-gold py-1.5">
                      <Lock size={14} className="text-ivory/30 mr-2" />
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="bg-transparent border-none outline-none text-xs text-ivory placeholder-ivory/20 w-full"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-ivory/50 pt-1">
                  <span>Don't have an account?</span>
                  <Link href="/register" className="text-gold font-semibold hover:underline">
                    Register Now
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded bg-gold py-3 text-[10px] uppercase font-bold tracking-[0.25em] text-charcoal hover:bg-ivory hover:scale-[1.01] transition-all disabled:opacity-50"
                >
                  {loading ? 'Authenticating...' : 'Sign In'}
                </button>
              </form>
            )}
          </div>
        </section>
      </PageWrapper>
      <Footer />
    </>
  );
}
