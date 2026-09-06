'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageWrapper from '@/components/PageWrapper';
import { useApp } from '@/context/AppContext';
import { UserPlus, Lock, User as UserIcon, Mail, AlertCircle, CheckCircle } from 'lucide-react';

export default function Register() {
  const { token, user, login } = useApp();
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (token && user) {
      router.push('/dashboard');
    }
  }, [token, user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      setSuccess(true);
      setTimeout(() => {
        login(data.token, data.user);
        router.push('/dashboard');
      }, 1200);

    } catch (err: any) {
      setError(err.message || 'Registration failed');
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
                <UserPlus size={22} />
              </div>
              <h1 className="text-2xl font-serif text-ivory">Create Player Account</h1>
              <p className="text-[10px] text-ivory/50 uppercase tracking-widest">Join the Srishti Studios Gaming Community</p>
            </div>

            {success ? (
              <div className="py-8 text-center space-y-3 relative z-10">
                <CheckCircle size={36} className="text-gold mx-auto animate-bounce" />
                <h3 className="text-base text-ivory font-medium">Account Created Successfully!</h3>
                <p className="text-xs text-ivory/50">Redirecting to your user dashboard...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                {error && (
                  <div className="flex items-start gap-2.5 rounded border border-red-500/20 bg-red-500/5 p-3.5 text-xs text-red-300">
                    <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="space-y-4">
                  {/* Username */}
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-ivory/50 block font-medium">Username</label>
                    <div className="flex items-center border-b border-bronze/30 focus-within:border-gold py-1">
                      <UserIcon size={14} className="text-ivory/30 mr-2" />
                      <input
                        type="text"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="e.g. gamer_warrior"
                        className="bg-transparent border-none outline-none text-xs text-ivory placeholder-ivory/20 w-full"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-ivory/50 block font-medium">Email Address</label>
                    <div className="flex items-center border-b border-bronze/30 focus-within:border-gold py-1">
                      <Mail size={14} className="text-ivory/30 mr-2" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="bg-transparent border-none outline-none text-xs text-ivory placeholder-ivory/20 w-full"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-ivory/50 block font-medium">Password</label>
                    <div className="flex items-center border-b border-bronze/30 focus-within:border-gold py-1">
                      <Lock size={14} className="text-ivory/30 mr-2" />
                      <input
                        type="password"
                        required
                        minLength={6}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="bg-transparent border-none outline-none text-xs text-ivory placeholder-ivory/20 w-full"
                      />
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-ivory/50 block font-medium">Confirm Password</label>
                    <div className="flex items-center border-b border-bronze/30 focus-within:border-gold py-1">
                      <Lock size={14} className="text-ivory/30 mr-2" />
                      <input
                        type="password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className="bg-transparent border-none outline-none text-xs text-ivory placeholder-ivory/20 w-full"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-ivory/50 pt-1">
                  <span>Already have an account?</span>
                  <Link href="/login" className="text-gold font-semibold hover:underline">
                    Sign In
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded bg-gold py-3 text-[10px] uppercase font-bold tracking-[0.25em] text-charcoal hover:bg-ivory hover:scale-[1.01] transition-all disabled:opacity-50"
                >
                  {loading ? 'Creating Account...' : 'Register Account'}
                </button>
              </form>
            )}

            <div className="text-center pt-2 text-[9px] uppercase tracking-wider text-ivory/30 relative z-10 border-t border-bronze/10">
              User registration creates a standard player account. Admin access is restricted.
            </div>
          </div>
        </section>
      </PageWrapper>
      <Footer />
    </>
  );
}
