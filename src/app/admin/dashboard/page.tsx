'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageWrapper from '@/components/PageWrapper';
import { useApp, GameProject, User as UserType } from '@/context/AppContext';
import { 
  Sparkles, ShieldCheck, Gamepad2, Users, FileCode, Play, CheckCircle2, 
  RefreshCw, Save, Rocket, AlertTriangle, Eye, Terminal, Cpu, Layers, 
  FolderTree, Lock, Trash2, Ban, CheckCircle, ShieldAlert, LogOut, ArrowRight, X
} from 'lucide-react';

function AdminDashboardContent() {
  const { token, user, logout, projects, users, generateAiProject, approveAndReleaseProject, updateUserStatus, deleteUserAccount, refreshData } = useApp();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Tab State: 'overview' | 'ai' | 'projects' | 'testing' | 'users' | 'analytics'
  const initialTab = searchParams.get('tab') || 'overview';
  const [activeTab, setActiveTab] = useState<string>(initialTab);

  // Srishti AI prompt state
  const [aiPrompt, setAiPrompt] = useState<string>(
    'Create a third-person action RPG set in a fictional ancient Indian kingdom. The player is a warrior protecting a village from an invading army. Include exploration, combat, NPCs, quests, bosses, progression, inventory and a skill system.'
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [agentLogs, setAgentLogs] = useState<string[]>([]);
  const [currentProject, setCurrentProject] = useState<GameProject | null>(null);

  // Review / Testing State
  const [testingProject, setTestingProject] = useState<GameProject | null>(null);
  const [selectedFile, setSelectedFile] = useState<string>('design/GDD.json');
  const [isReleasing, setIsReleasing] = useState(false);
  const [releaseSuccess, setReleaseSuccess] = useState<string | null>(null);

  // User Management State
  const [userActionMessage, setUserActionMessage] = useState<string | null>(null);

  // Authorization Shield: Only ADMIN role can access!
  useEffect(() => {
    if (!token) {
      router.push('/login');
    } else if (user && user.role !== 'ADMIN') {
      router.push('/dashboard'); // Normal users get bounced to public user dashboard
    }
  }, [token, user, router]);

  // Sync initial project for testing view if available
  useEffect(() => {
    if (projects.length > 0 && !testingProject) {
      setTestingProject(projects[0]);
    }
  }, [projects, testingProject]);

  if (!token || !user || user.role !== 'ADMIN') {
    return (
      <div className="min-h-screen bg-charcoal flex items-center justify-center text-ivory">
        <div className="text-center space-y-4">
          <ShieldAlert size={48} className="text-red-400 mx-auto animate-pulse" />
          <h2 className="text-xl font-serif">403 Unauthorized Access</h2>
          <p className="text-xs text-ivory/50">Admin credentials required to access Srishti AI Studio.</p>
          <Link href="/login" className="inline-block px-4 py-2 bg-gold text-charcoal text-xs font-bold rounded">
            Return to Login
          </Link>
        </div>
      </div>
    );
  }

  // Handle AI Prompt Submission
  const handleGenerateGame = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPrompt.trim()) return;

    setIsGenerating(true);
    setAgentLogs([
      '[Orchestrator] Initializing multi-agent AI game engine pipeline...',
      '[System] Verifying server authorization & token signature...'
    ]);

    try {
      const result = await generateAiProject(aiPrompt);
      setCurrentProject(result.project);
      setTestingProject(result.project);
      setAgentLogs(result.agentLogs);
      setActiveTab('testing'); // Move to review/testing after design
    } catch (err: any) {
      setAgentLogs(prev => [...prev, `[ERROR] AI Generation failed: ${err.message}`]);
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle Approve & Release
  const handleApproveAndRelease = async (projectId: string) => {
    setIsReleasing(true);
    setReleaseSuccess(null);
    try {
      const ok = await approveAndReleaseProject(projectId);
      if (ok) {
        setReleaseSuccess('Game approved and published to public site! It is now visible on /games.');
        if (testingProject?.id === projectId) {
          setTestingProject(prev => prev ? { ...prev, status: 'RELEASED' } : null);
        }
      }
    } catch (err: any) {
      alert(`Release failed: ${err.message}`);
    } finally {
      setIsReleasing(false);
    }
  };

  // User Management Actions
  const handleToggleUserStatus = async (targetUser: UserType) => {
    const newStatus = targetUser.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
    try {
      const ok = await updateUserStatus(targetUser.id, newStatus);
      if (ok) {
        setUserActionMessage(`User "${targetUser.username}" status updated to ${newStatus}`);
        setTimeout(() => setUserActionMessage(null), 3000);
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDeleteUser = async (targetUser: UserType) => {
    if (!confirm(`Are you sure you want to permanently delete user "${targetUser.username}"?`)) return;
    try {
      const ok = await deleteUserAccount(targetUser.id);
      if (ok) {
        setUserActionMessage(`User "${targetUser.username}" permanently deleted.`);
        setTimeout(() => setUserActionMessage(null), 3000);
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 gap-8 bg-charcoal">
      
      {/* Admin Navigation Sidebar */}
      <aside className="w-full lg:w-64 flex-shrink-0">
        <div className="rounded-lg border border-bronze/20 bg-forest/10 p-5 space-y-6 sticky top-24 backdrop-blur-md">
          <div className="border-b border-bronze/10 pb-4">
            <span className="text-[9px] uppercase tracking-widest text-gold font-bold">Admin System</span>
            <h2 className="text-lg font-serif text-ivory mt-0.5 flex items-center gap-2">
              <ShieldCheck size={18} className="text-gold" /> Studio Control
            </h2>
            <p className="text-[10px] text-ivory/50 mt-1 font-mono">Logged in: {user.username}</p>
          </div>

          <nav className="flex flex-col space-y-1.5">
            {[
              { id: 'overview', label: 'Overview', icon: Layers },
              { id: 'ai', label: 'Srishti AI Workspace', icon: Sparkles },
              { id: 'projects', label: 'My Projects & Drafts', icon: FolderTree },
              { id: 'testing', label: 'Testing & Review', icon: Play },
              { id: 'users', label: 'User Management', icon: Users }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left px-3.5 py-2.5 rounded text-xs font-bold uppercase tracking-wider flex items-center justify-between transition-all ${
                    isActive
                      ? 'bg-gold text-charcoal shadow-md font-extrabold'
                      : 'border border-bronze/10 text-ivory/70 hover:border-bronze/40 hover:text-white hover:bg-bronze/5'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Icon size={15} />
                    {tab.label}
                  </span>
                  {tab.id === 'ai' && (
                    <span className="text-[8px] bg-bronze/30 text-gold px-1.5 py-0.5 rounded border border-bronze/40 font-mono">
                      AI
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="pt-4 border-t border-bronze/10 space-y-2">
            <Link
              href="/games"
              className="w-full py-2 px-3 rounded border border-bronze/20 text-[10px] font-bold uppercase tracking-wider text-ivory/70 hover:text-gold flex items-center justify-between"
            >
              <span>Public Site Games</span>
              <ArrowRight size={12} />
            </Link>
            <button
              onClick={logout}
              className="w-full rounded border border-red-500/20 bg-red-500/5 py-2 text-[10px] font-bold uppercase tracking-widest text-red-400 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2"
            >
              <LogOut size={13} /> Exit Admin Session
            </button>
          </div>
        </div>
      </aside>

      {/* Main Admin Workspace Container */}
      <main className="flex-1 space-y-8 min-w-0">
        
        {/* 1. OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div>
              <span className="text-[10px] uppercase tracking-widest font-semibold text-gold">Executive Overview</span>
              <h1 className="text-3xl font-serif text-ivory mt-1">Srishti Studios Architecture</h1>
              <p className="text-xs text-ivory/60 mt-1">Private AI Game Development System & Dynamic Studio Platform</p>
              <div className="h-[1.5px] w-16 bg-bronze/40 mt-3" />
            </div>

            {/* Metrics Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-5 border border-bronze/20 bg-forest/10 rounded-lg space-y-2">
                <span className="text-[9px] uppercase tracking-widest text-ivory/50 block">AI Game Projects</span>
                <h3 className="text-2xl font-serif text-ivory">{projects.length}</h3>
                <span className="text-[9px] text-gold font-mono">{projects.filter(p => p.status === 'DRAFT').length} Drafts</span>
              </div>

              <div className="p-5 border border-bronze/20 bg-forest/10 rounded-lg space-y-2">
                <span className="text-[9px] uppercase tracking-widest text-ivory/50 block">Released Games</span>
                <h3 className="text-2xl font-serif text-ivory">{projects.filter(p => p.status === 'RELEASED').length + 2}</h3>
                <span className="text-[9px] text-green-400 font-mono">Live on /games</span>
              </div>

              <div className="p-5 border border-bronze/20 bg-forest/10 rounded-lg space-y-2">
                <span className="text-[9px] uppercase tracking-widest text-ivory/50 block">Registered Users</span>
                <h3 className="text-2xl font-serif text-ivory">{users.length}</h3>
                <span className="text-[9px] text-gold font-mono">{users.filter(u => u.status === 'ACTIVE').length} Active</span>
              </div>

              <div className="p-5 border border-bronze/20 bg-forest/10 rounded-lg space-y-2">
                <span className="text-[9px] uppercase tracking-widest text-ivory/50 block">Multi-Agent AI</span>
                <h3 className="text-2xl font-serif text-ivory">8 Agents</h3>
                <span className="text-[9px] text-gold font-mono font-semibold">Orchestrator Active</span>
              </div>
            </div>

            {/* Quick Launch Panel */}
            <div className="p-6 rounded-lg border border-gold/30 bg-gold/5 space-y-4 relative overflow-hidden">
              <div className="flex items-center gap-3">
                <Sparkles className="text-gold animate-spin" size={24} />
                <div>
                  <h3 className="text-lg font-serif text-ivory">Launch Srishti AI Game Studio</h3>
                  <p className="text-xs text-ivory/70">Transform natural language prompt into a complete structured game project with GDD, code files, and playable browser prototype.</p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('ai')}
                className="px-5 py-2.5 bg-gold text-charcoal rounded text-xs font-bold uppercase tracking-widest hover:bg-ivory transition-all shadow"
              >
                Enter Srishti AI Studio &rarr;
              </button>
            </div>

            {/* Recent Projects Table */}
            <div className="border border-bronze/20 bg-charcoal/80 rounded-lg p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-serif text-ivory">Recent Game Projects</h3>
                <button onClick={() => setActiveTab('projects')} className="text-xs text-gold hover:underline uppercase tracking-wider font-bold">
                  View All Projects &rarr;
                </button>
              </div>

              {projects.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-ivory/80">
                    <thead className="text-[9px] uppercase tracking-widest text-ivory/40 border-b border-bronze/20">
                      <tr>
                        <th className="py-2">Game Title</th>
                        <th className="py-2">Prompt Excerpt</th>
                        <th className="py-2">Status</th>
                        <th className="py-2">Created</th>
                        <th className="py-2 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-bronze/10">
                      {projects.slice(0, 5).map((p) => (
                        <tr key={p.id} className="hover:bg-forest/10">
                          <td className="py-3 font-serif text-ivory font-medium">{p.name}</td>
                          <td className="py-3 text-ivory/60 max-w-xs truncate">{p.prompt}</td>
                          <td className="py-3">
                            <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                              p.status === 'RELEASED' ? 'bg-green-500/20 text-green-300 border border-green-500/30' : 'bg-gold/20 text-gold border border-gold/30'
                            }`}>
                              {p.status}
                            </span>
                          </td>
                          <td className="py-3 text-ivory/40 font-mono text-[10px]">{p.createdAt.split('T')[0]}</td>
                          <td className="py-3 text-right">
                            <button
                              onClick={() => {
                                setTestingProject(p);
                                setActiveTab('testing');
                              }}
                              className="text-gold hover:underline font-bold text-[10px] uppercase tracking-wider"
                            >
                              Review / Test
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-xs text-ivory/40 py-6 text-center">No AI projects created yet. Click above to launch Srishti AI.</p>
              )}
            </div>
          </div>
        )}

        {/* 2. SRISHTI AI WORKSPACE TAB */}
        {activeTab === 'ai' && (
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="text-gold" size={20} />
                <span className="text-[10px] uppercase tracking-widest font-semibold text-gold">Srishti AI Studio</span>
              </div>
              <h1 className="text-3xl font-serif text-ivory mt-1">AI Game Development System</h1>
              <p className="text-xs text-ivory/60 mt-1">Describe your vision. Multi-agent AI generates GDD specs, engine structure, and playable Web build.</p>
              <div className="h-[1.5px] w-16 bg-bronze/40 mt-3" />
            </div>

            <form onSubmit={handleGenerateGame} className="space-y-5 bg-forest/10 border border-bronze/20 p-6 rounded-lg relative backdrop-blur-sm">
              <div className="space-y-2">
                <label className="text-xs font-serif text-ivory flex items-center justify-between">
                  <span>Enter Natural-Language Game Prompt:</span>
                  <span className="text-[10px] text-gold font-mono uppercase">Private Admin System</span>
                </label>
                <textarea
                  rows={5}
                  required
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder="e.g. Create a third-person action RPG set in a fictional ancient Indian kingdom..."
                  className="w-full bg-charcoal/90 border border-bronze/30 focus:border-gold rounded p-4 text-xs text-ivory placeholder-ivory/30 outline-none leading-relaxed font-sans"
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-[10px] text-ivory/50 space-y-0.5">
                  <p>✨ 8 Agents: Designer, Story, Character, Combat, Quest, Art, Coding & QA</p>
                  <p>🔒 New projects automatically created in <span className="text-gold font-bold">DRAFT</span> status.</p>
                </div>

                <button
                  type="submit"
                  disabled={isGenerating}
                  className="px-6 py-3 bg-gold text-charcoal rounded text-xs font-bold uppercase tracking-[0.2em] hover:bg-ivory transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw size={16} className="animate-spin text-charcoal" />
                      <span>Generating Game Systems...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles size={16} />
                      <span>[ DESIGN GAME ]</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Live Multi-Agent Execution Log */}
            {agentLogs.length > 0 && (
              <div className="bg-[#080c0a] border border-bronze/20 rounded-lg p-5 space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-bronze/20 pb-2">
                  <span className="text-gold text-[10px] uppercase tracking-widest flex items-center gap-2">
                    <Terminal size={14} /> Multi-Agent Execution Log
                  </span>
                  {isGenerating && <span className="text-green-400 text-[9px] animate-pulse">ORCHESTRATOR RUNNING...</span>}
                </div>

                <div className="space-y-1.5 max-h-60 overflow-y-auto pr-2 text-ivory/80 text-[11px]">
                  {agentLogs.map((log, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <span className="text-gold/50 flex-shrink-0">&gt;</span>
                      <span className={log.includes('ERROR') ? 'text-red-400' : log.includes('Game Designer') ? 'text-gold' : 'text-ivory/80'}>
                        {log}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 3. MY PROJECTS & DRAFTS TAB */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div>
              <span className="text-[10px] uppercase tracking-widest font-semibold text-gold">Project Management</span>
              <h1 className="text-3xl font-serif text-ivory mt-1">My Projects & Draft Games</h1>
              <p className="text-xs text-ivory/60 mt-1">Persistent project memory storage for all AI generated game concepts.</p>
              <div className="h-[1.5px] w-16 bg-bronze/40 mt-3" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj) => (
                <div key={proj.id} className="bg-forest/10 border border-bronze/20 rounded-lg p-6 space-y-4 relative group hover:border-bronze transition-all">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[9px] uppercase tracking-widest text-gold font-bold">Project #{proj.id.slice(-6)}</span>
                      <h3 className="text-lg font-serif text-ivory mt-0.5">{proj.name}</h3>
                    </div>
                    <span className={`px-2.5 py-1 rounded text-[9px] font-bold uppercase tracking-wider ${
                      proj.status === 'RELEASED' ? 'bg-green-500/20 text-green-300 border border-green-500/30' : 'bg-gold/20 text-gold border border-gold/30'
                    }`}>
                      {proj.status}
                    </span>
                  </div>

                  <p className="text-xs text-ivory/60 line-clamp-3 leading-relaxed">{proj.prompt}</p>

                  <div className="pt-3 border-t border-bronze/10 flex items-center justify-between text-xs">
                    <span className="text-[10px] text-ivory/40 font-mono">Files: {proj.files?.length || 10} structured</span>
                    
                    <button
                      onClick={() => {
                        setTestingProject(proj);
                        setActiveTab('testing');
                      }}
                      className="px-3.5 py-1.5 bg-bronze/20 border border-bronze/30 rounded text-[10px] font-bold uppercase tracking-wider text-ivory hover:bg-gold hover:text-charcoal transition-all"
                    >
                      Review / Test Game &rarr;
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. TESTING & REVIEW SCREEN (CRITICAL) */}
        {activeTab === 'testing' && testingProject && (
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-widest font-semibold text-gold">Admin Review & Build Testing</span>
                <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                  testingProject.status === 'RELEASED' ? 'bg-green-500/20 text-green-300 border border-green-500/30' : 'bg-gold/20 text-gold border border-gold/30'
                }`}>
                  STATUS: {testingProject.status}
                </span>
              </div>
              <h1 className="text-3xl font-serif text-ivory mt-1">{testingProject.name}</h1>
              <p className="text-xs text-ivory/60 mt-1">Review GDD, inspect generated project structure, play browser test engine, and execute public release.</p>
              <div className="h-[1.5px] w-16 bg-bronze/40 mt-3" />
            </div>

            {releaseSuccess && (
              <div className="p-4 rounded border border-green-500/30 bg-green-500/10 text-xs text-green-300 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={18} />
                  <span>{releaseSuccess}</span>
                </div>
                <Link href={`/games`} className="text-gold font-bold uppercase tracking-wider hover:underline">
                  View Public Games Page &rarr;
                </Link>
              </div>
            )}

            {/* ADMIN ACTION TOOLBAR */}
            <div className="bg-forest/20 border border-bronze/30 p-4 rounded-lg flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-ivory font-medium">
                <Cpu size={16} className="text-gold" />
                <span>Project Actions:</span>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setActiveTab('ai')}
                  className="px-3.5 py-2 border border-bronze/30 text-ivory/80 rounded text-[10px] font-bold uppercase tracking-wider hover:border-bronze hover:text-white"
                >
                  [ REGENERATE ]
                </button>
                <button
                  onClick={() => alert('Project draft saved to database.')}
                  className="px-3.5 py-2 border border-bronze/30 text-ivory/80 rounded text-[10px] font-bold uppercase tracking-wider hover:border-bronze hover:text-white"
                >
                  [ SAVE DRAFT ]
                </button>

                {/* APPROVE & RELEASE BUTTON */}
                <button
                  disabled={isReleasing || testingProject.status === 'RELEASED'}
                  onClick={() => handleApproveAndRelease(testingProject.id)}
                  className="px-5 py-2.5 bg-gold text-charcoal font-bold rounded text-xs uppercase tracking-widest hover:bg-ivory transition-all shadow-lg disabled:opacity-50 flex items-center gap-2"
                >
                  {isReleasing ? (
                    <>
                      <RefreshCw size={14} className="animate-spin" /> Publishing...
                    </>
                  ) : testingProject.status === 'RELEASED' ? (
                    <>
                      <CheckCircle size={14} /> RELEASED TO PUBLIC
                    </>
                  ) : (
                    <>
                      <Rocket size={14} /> [ APPROVE & RELEASE ]
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* PLAYABLE BROWSER GAME PROTOTYPE TESTER */}
            <div className="border border-bronze/30 bg-[#0c1210] rounded-lg p-5 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-bronze/20 pb-3">
                <div className="flex items-center gap-2">
                  <Play size={16} className="text-gold" />
                  <h3 className="text-sm font-serif text-ivory">Playable Test Preview Engine</h3>
                </div>
                <span className="text-[10px] text-gold font-mono uppercase bg-bronze/10 px-2 py-0.5 rounded border border-bronze/20">
                  HTML5 Canvas Sandbox (60 FPS)
                </span>
              </div>

              {/* Canvas Game Render Frame */}
              <div className="relative aspect-video w-full max-h-[420px] bg-black rounded-lg overflow-hidden border border-bronze/20 flex flex-col items-center justify-center p-6 text-center space-y-4">
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-80 pointer-events-none" />
                
                <div className="relative z-10 space-y-3 max-w-md">
                  <div className="h-12 w-12 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center mx-auto text-gold">
                    <Gamepad2 size={24} />
                  </div>
                  <h4 className="text-lg font-serif text-ivory">{testingProject.name}</h4>
                  <p className="text-xs text-ivory/70 leading-relaxed font-light">
                    {testingProject.designData?.overview?.coreGameplayLoop || testingProject.prompt}
                  </p>
                  <div className="flex items-center justify-center gap-4 text-[10px] text-gold uppercase tracking-wider font-mono">
                    <span>Genre: {testingProject.designData?.overview?.genre || 'Action RPG'}</span>
                    <span>Engine: HTML5 WebGL</span>
                  </div>
                </div>
              </div>
            </div>

            {/* PROJECT FILE EXPLORER & GDD INSPECTOR */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* File Tree */}
              <div className="border border-bronze/20 bg-charcoal/90 rounded-lg p-4 space-y-3">
                <span className="text-[10px] text-gold font-bold uppercase tracking-widest flex items-center gap-1.5">
                  <FolderTree size={14} /> Project File Structure
                </span>
                <div className="space-y-1 font-mono text-xs max-h-80 overflow-y-auto">
                  {testingProject.files?.map((file) => (
                    <button
                      key={file.path}
                      onClick={() => setSelectedFile(file.path)}
                      className={`w-full text-left px-2.5 py-1.5 rounded flex items-center gap-2 transition-colors ${
                        selectedFile === file.path ? 'bg-gold/20 text-gold font-bold' : 'text-ivory/70 hover:text-white hover:bg-forest/20'
                      }`}
                    >
                      <FileCode size={13} className="text-bronze flex-shrink-0" />
                      <span className="truncate">{file.path}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* File Code Viewer */}
              <div className="md:col-span-2 border border-bronze/20 bg-[#080c0a] rounded-lg p-4 space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-bronze/20 pb-2 text-[10px] text-gold">
                  <span>FILE: {selectedFile}</span>
                  <span className="text-ivory/40">READ-ONLY INSPECTOR</span>
                </div>

                <pre className="p-3 bg-charcoal/80 rounded border border-bronze/10 text-ivory/80 text-[11px] max-h-80 overflow-auto whitespace-pre-wrap">
                  {testingProject.files?.find(f => f.path === selectedFile)?.content || JSON.stringify(testingProject.designData, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* 5. USER MANAGEMENT TAB */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <div>
              <span className="text-[10px] uppercase tracking-widest font-semibold text-gold">Access Control</span>
              <h1 className="text-3xl font-serif text-ivory mt-1">User Management Panel</h1>
              <p className="text-xs text-ivory/60 mt-1">Manage registered accounts, roles, and enforce account suspension.</p>
              <div className="h-[1.5px] w-16 bg-bronze/40 mt-3" />
            </div>

            {userActionMessage && (
              <div className="p-3 rounded border border-gold/30 bg-gold/10 text-xs text-gold">
                {userActionMessage}
              </div>
            )}

            <div className="border border-bronze/20 bg-charcoal/90 rounded-lg p-5 space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-ivory/80">
                  <thead className="text-[9px] uppercase tracking-widest text-ivory/40 border-b border-bronze/20">
                    <tr>
                      <th className="py-2.5">User</th>
                      <th className="py-2.5">Email</th>
                      <th className="py-2.5">Role</th>
                      <th className="py-2.5">Status</th>
                      <th className="py-2.5">Registered</th>
                      <th className="py-2.5 text-right">Admin Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-bronze/10">
                    {users.map((u) => (
                      <tr key={u.id} className="hover:bg-forest/10">
                        <td className="py-3 font-semibold text-ivory flex items-center gap-2">
                          <span className="h-6 w-6 rounded-full bg-bronze/20 border border-bronze/30 flex items-center justify-center text-[10px] text-gold">
                            {u.username.charAt(0).toUpperCase()}
                          </span>
                          {u.username}
                          {u.username === 'admin' && <span className="text-[8px] bg-gold/20 text-gold px-1 rounded">OWNER</span>}
                        </td>
                        <td className="py-3 text-ivory/60">{u.email}</td>
                        <td className="py-3 font-mono text-[10px]">{u.role}</td>
                        <td className="py-3">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                            u.status === 'ACTIVE' ? 'bg-green-500/20 text-green-300 border border-green-500/30' : 'bg-red-500/20 text-red-300 border border-red-500/30'
                          }`}>
                            {u.status}
                          </span>
                        </td>
                        <td className="py-3 text-ivory/40 font-mono text-[10px]">
                          {u.createdAt ? u.createdAt.split('T')[0] : '2026-08-15'}
                        </td>
                        <td className="py-3 text-right space-x-2">
                          {u.username !== 'admin' ? (
                            <>
                              <button
                                onClick={() => handleToggleUserStatus(u)}
                                className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${
                                  u.status === 'ACTIVE'
                                    ? 'border-yellow-500/30 text-yellow-300 hover:bg-yellow-500/10'
                                    : 'border-green-500/30 text-green-300 hover:bg-green-500/10'
                                }`}
                              >
                                {u.status === 'ACTIVE' ? 'SUSPEND' : 'ACTIVATE'}
                              </button>
                              <button
                                onClick={() => handleDeleteUser(u)}
                                className="px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider border border-red-500/30 text-red-400 hover:bg-red-500/10"
                              >
                                DELETE
                              </button>
                            </>
                          ) : (
                            <span className="text-[10px] text-ivory/30 italic">Protected</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </main>

    </div>
  );
}

export default function AdminDashboard() {
  return (
    <>
      <Navbar />
      <PageWrapper>
        <Suspense fallback={
          <div className="min-h-[60vh] bg-charcoal flex items-center justify-center text-gold">
            <RefreshCw className="animate-spin" size={24} />
          </div>
        }>
          <AdminDashboardContent />
        </Suspense>
      </PageWrapper>
      <Footer />
    </>
  );
}
