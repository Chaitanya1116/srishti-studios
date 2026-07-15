'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageWrapper from '@/components/PageWrapper';
import { useApp } from '@/context/AppContext';
import { 
  Users, Gamepad2, Newspaper, Briefcase, Eye, MousePointerClick, 
  Mail, Calendar, ArrowRight, ShieldCheck, LogOut, MessageSquare, Link as LinkIcon 
} from 'lucide-react';

export default function AdminDashboard() {
  const { token, logout, games, posts, jobs, inquiries, applications, backendOnline } = useApp();
  const router = useRouter();
  
  const [stats, setStats] = useState({
    visits: 24500,
    gameClicks: 12400,
    newsletterSubs: 1205
  });

  // Authorization Shield
  useEffect(() => {
    if (!token) {
      router.push('/admin');
    }
  }, [token, router]);

  // Fetch mock stats from API if online
  useEffect(() => {
    if (backendOnline && token) {
      fetch('http://localhost:5000/api/analytics', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => {
          if (data) {
            setStats({
              visits: data.visits,
              gameClicks: data.gameClicks,
              newsletterSubs: data.newsletterSubs
            });
          }
        })
        .catch(err => console.error('Error fetching analytics stats', err));
    }
  }, [backendOnline, token]);

  if (!token) return null; // Wait for redirect

  return (
    <>
      <Navbar />
      <PageWrapper>
        <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 gap-10 bg-charcoal">
          
          {/* Sidebar Menu */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <div className="rounded-lg border border-bronze/20 bg-forest/5 p-6 space-y-8 sticky top-28 backdrop-blur-sm">
              <div>
                <span className="text-[9px] uppercase tracking-widest text-gold font-bold">Workspace</span>
                <h2 className="text-xl font-serif text-ivory mt-0.5 flex items-center gap-1.5">
                  <ShieldCheck size={18} className="text-gold" /> Admin Panel
                </h2>
              </div>

              <nav className="flex flex-col space-y-2">
                <Link
                  href="/admin/dashboard"
                  className="w-full text-left px-4 py-2.5 rounded text-xs font-bold uppercase tracking-widest bg-gold text-charcoal"
                >
                  Overview
                </Link>
                <Link
                  href="/admin/dashboard/games"
                  className="w-full text-left px-4 py-2.5 rounded text-xs font-bold uppercase tracking-widest border border-bronze/10 text-ivory/80 hover:bg-bronze/10 transition-all"
                >
                  Manage Games
                </Link>
                <Link
                  href="/admin/dashboard/news"
                  className="w-full text-left px-4 py-2.5 rounded text-xs font-bold uppercase tracking-widest border border-bronze/10 text-ivory/80 hover:bg-bronze/10 transition-all"
                >
                  Manage News
                </Link>
                <Link
                  href="/admin/dashboard/careers"
                  className="w-full text-left px-4 py-2.5 rounded text-xs font-bold uppercase tracking-widest border border-bronze/10 text-ivory/80 hover:bg-bronze/10 transition-all"
                >
                  Careers & Apps
                </Link>
              </nav>

              <button
                onClick={logout}
                className="w-full rounded border border-red-500/20 bg-red-500/5 py-2.5 text-xs font-bold uppercase tracking-widest text-red-400 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2"
              >
                <LogOut size={14} /> Exit Portal
              </button>
            </div>
          </aside>

          {/* Main Dashboard Workspace */}
          <main className="flex-1 space-y-10">
            
            {/* Visual Title */}
            <div>
              <span className="text-[10px] uppercase tracking-widest font-semibold text-gold">Overview</span>
              <h1 className="text-3xl font-serif font-light text-ivory mt-1">Analytics Dashboard</h1>
              <div className="h-[1.5px] w-12 bg-bronze/40 mt-3" />
            </div>

            {/* Metrics cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Metric 1 */}
              <div className="p-6 border border-bronze/10 bg-[#0b0b0b] rounded space-y-3">
                <div className="flex justify-between items-center text-ivory/50">
                  <span className="text-[9px] uppercase tracking-widest">Site Visits</span>
                  <Eye size={16} className="text-gold" />
                </div>
                <h3 className="text-2xl font-semibold text-ivory">{stats.visits.toLocaleString()}</h3>
              </div>

              {/* Metric 2 */}
              <div className="p-6 border border-bronze/10 bg-[#0b0b0b] rounded space-y-3">
                <div className="flex justify-between items-center text-ivory/50">
                  <span className="text-[9px] uppercase tracking-widest">Game Clicks</span>
                  <MousePointerClick size={16} className="text-gold" />
                </div>
                <h3 className="text-2xl font-semibold text-ivory">{stats.gameClicks.toLocaleString()}</h3>
              </div>

              {/* Metric 3 */}
              <div className="p-6 border border-bronze/10 bg-[#0b0b0b] rounded space-y-3">
                <div className="flex justify-between items-center text-ivory/50">
                  <span className="text-[9px] uppercase tracking-widest">Job Applicants</span>
                  <Briefcase size={16} className="text-gold" />
                </div>
                <h3 className="text-2xl font-semibold text-ivory">{applications.length + 42}</h3>
              </div>

              {/* Metric 4 */}
              <div className="p-6 border border-bronze/10 bg-[#0b0b0b] rounded space-y-3">
                <div className="flex justify-between items-center text-ivory/50">
                  <span className="text-[9px] uppercase tracking-widest">Chronicle Subs</span>
                  <Users size={16} className="text-gold" />
                </div>
                <h3 className="text-2xl font-semibold text-ivory">{stats.newsletterSubs.toLocaleString()}</h3>
              </div>
            </div>

            {/* Sub-sections: Inquiries & Careers Applications */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Job Applications Overview */}
              <div className="p-6 border border-bronze/10 bg-forest/5 rounded-lg space-y-4">
                <div className="flex justify-between items-baseline border-b border-bronze/10 pb-3">
                  <h3 className="text-lg font-serif font-medium text-ivory flex items-center gap-2">
                    <Briefcase size={16} className="text-gold" /> Recent Applicants
                  </h3>
                  <Link href="/admin/dashboard/careers" className="text-[10px] text-gold uppercase font-bold hover:text-white transition-colors">
                    Manage
                  </Link>
                </div>
                {applications.length > 0 ? (
                  <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
                    {applications.map((app) => {
                      const associatedJob = jobs.find(j => j.id === app.jobId);
                      return (
                        <div key={app.id} className="p-4 border border-bronze/5 rounded bg-charcoal space-y-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="text-xs font-semibold text-ivory">{app.name}</h4>
                              <p className="text-[10px] text-gold uppercase tracking-wider">{associatedJob?.title || 'Unknown Role'}</p>
                            </div>
                            <span className="text-[8px] text-ivory/40 uppercase font-mono">{app.submittedAt.split('T')[0]}</span>
                          </div>
                          <p className="text-[10px] text-ivory/60 leading-relaxed font-light line-clamp-2">{app.coverLetter}</p>
                          <a 
                            href={app.resumeUrl} 
                            target="_blank" 
                            className="text-[9px] text-gold font-bold uppercase hover:underline inline-flex items-center gap-1"
                          >
                            <LinkIcon size={10} /> View Resume
                          </a>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-xs text-ivory/40 py-8 text-center font-light">No new applications submitted recently.</p>
                )}
              </div>

              {/* Contact Inquiries Overview */}
              <div className="p-6 border border-bronze/10 bg-forest/5 rounded-lg space-y-4">
                <div className="flex justify-between items-baseline border-b border-bronze/10 pb-3">
                  <h3 className="text-lg font-serif font-medium text-ivory flex items-center gap-2">
                    <MessageSquare size={16} className="text-gold" /> Contact Inquiries
                  </h3>
                </div>
                {inquiries.length > 0 ? (
                  <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
                    {inquiries.map((inq) => (
                      <div key={inq.id} className="p-4 border border-bronze/5 rounded bg-charcoal space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-xs font-semibold text-ivory">{inq.name}</h4>
                            <p className="text-[10px] text-gold uppercase tracking-wider">{inq.subject}</p>
                          </div>
                          <span className="text-[8px] text-ivory/40 uppercase font-mono">{inq.submittedAt.split('T')[0]}</span>
                        </div>
                        <p className="text-[10px] text-ivory/60 leading-relaxed font-light line-clamp-2">{inq.message}</p>
                        <a 
                          href={`mailto:${inq.email}`} 
                          className="text-[9px] text-gold font-bold uppercase hover:underline inline-flex items-center gap-1"
                        >
                          <Mail size={10} /> Reply to {inq.email}
                        </a>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-ivory/40 py-8 text-center font-light">No new contact messages submitted recently.</p>
                )}
              </div>

            </div>

          </main>

        </div>
      </PageWrapper>
      <Footer />
    </>
  );
}
