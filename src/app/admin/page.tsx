'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageWrapper from '@/components/PageWrapper';
import { useApp } from '@/context/AppContext';
import { Shield, Lock, User, AlertCircle, CheckCircle } from 'lucide-react';

export default function AdminLogin() {
  const { token, login, backendOnline } = useApp();
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // If already logged in, redirect immediately to dashboard
  useEffect(() => {
    if (token) {
      router.push('/admin/dashboard');
    }
  }, [token, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
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
        router.push('/admin/dashboard');
      }, 1500);

    } catch (err: any) {
      // Local fallback for client-side demo if backend is not running
      if (username === 'admin' && password === 'srishti2026') {
        setSuccess(true);
        setTimeout(() => {
          login('mock-jwt-token-2026', { username: 'admin', role: 'admin' });
          router.push('/admin/dashboard');
        }, 1500);
      } else {
        setError(err.message || 'Invalid username or password. Default is admin / srishti2026.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <PageWrapper>
        <section className="flex-1 flex items-center justify-center py-20 px-4 bg-charcoal">
          <div className="w-full max-w-md rounded-lg border border-bronze/20 bg-forest/5 p-8 relative backdrop-blur-sm space-y-6">
            <div className="absolute inset-0 stone-noise pointer-events-none opacity-20" />
            
            {/* Header */}
            <div className="text-center space-y-3 relative z-10">
              <div className="h-12 w-12 flex items-center justify-center rounded-full bg-bronze/10 text-gold border border-bronze/20 mx-auto">
                <Shield size={22} />
              </div>
              <h1 className="text-2xl font-serif text-ivory">Portal Login</h1>
              <p className="text-[10px] text-ivory/50 uppercase tracking-widest">Srishti Studios Administration</p>
            </div>

            {success ? (
              <div className="py-8 text-center space-y-3 relative z-10">
                <CheckCircle size={36} className="text-gold mx-auto animate-bounce" />
                <h3 className="text-base text-ivory font-medium">Session Authenticated</h3>
                <p className="text-xs text-ivory/50">Forwarding to dashboard panel...</p>
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
                  {/* Username */}
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-ivory/50 block font-medium">Username</label>
                    <div className="flex items-center border-b border-bronze/30 focus-within:border-gold py-1">
                      <User size={14} className="text-ivory/30 mr-2" />
                      <input
                        type="text"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="admin"
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="bg-transparent border-none outline-none text-xs text-ivory placeholder-ivory/20 w-full"
                      />
                    </div>
                  </div>
                </div>

                <div className="text-[10px] text-ivory/40 leading-relaxed bg-charcoal/50 p-3 rounded border border-bronze/5">
                  <span className="text-gold font-bold uppercase tracking-wider block mb-0.5">Credentials Hint:</span>
                  User: <code className="text-ivory font-mono">admin</code> &bull; Pass: <code className="text-ivory font-mono">srishti2026</code>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded bg-gold py-3 text-[10px] uppercase font-bold tracking-[0.25em] text-charcoal hover:bg-ivory hover:scale-[1.01] transition-all disabled:opacity-50"
                >
                  {loading ? 'Verifying...' : 'Authorize Login'}
                </button>
              </form>
            )}

            {/* Connection Status indicator */}
            <div className="text-center pt-2 text-[9px] uppercase tracking-wider text-ivory/30 relative z-10">
              Api Linkage: {backendOnline ? <span className="text-green-400 font-semibold">Online</span> : <span className="text-gold font-semibold">Local Fallback Active</span>}
            </div>

          </div>
        </section>
      </PageWrapper>
      <Footer />
    </>
  );
}
