'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageWrapper from '@/components/PageWrapper';
import { useApp, Game } from '@/context/AppContext';
import { ShieldCheck, LogOut, ArrowLeft, Plus, Edit2, Trash2, Save, X } from 'lucide-react';

export default function AdminGames() {
  const { token, logout, games, createGame, updateGame, deleteGame } = useApp();
  const router = useRouter();

  // Authorization Shield
  useEffect(() => {
    if (!token) {
      router.push('/admin');
    }
  }, [token, router]);

  // Form states
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    genre: '',
    platforms: 'PC',
    status: 'In Production' as Game['status'],
    description: '',
    story: '',
    features: '',
    artworkUrl: '',
    screenshots: '',
    trailerUrl: '',
    steamLink: '',
    epicLink: '',
    osReq: 'Windows 10 64-bit',
    processorReq: 'Intel Core i5',
    memoryReq: '12 GB RAM',
    graphicsReq: 'NVIDIA GTX 1070',
    storageReq: '60 GB'
  });

  const resetForm = () => {
    setIsEditing(false);
    setEditId(null);
    setFormData({
      name: '',
      genre: '',
      platforms: 'PC',
      status: 'In Production',
      description: '',
      story: '',
      features: '',
      artworkUrl: '',
      screenshots: '',
      trailerUrl: '',
      steamLink: '',
      epicLink: '',
      osReq: 'Windows 10 64-bit',
      processorReq: 'Intel Core i5',
      memoryReq: '12 GB RAM',
      graphicsReq: 'NVIDIA GTX 1070',
      storageReq: '60 GB'
    });
  };

  const handleEditClick = (game: Game) => {
    setIsEditing(true);
    setEditId(game.id);
    setFormData({
      name: game.name,
      genre: game.genre,
      platforms: game.platforms.join(', '),
      status: game.status,
      description: game.description,
      story: game.story,
      features: game.features.join('\n'),
      artworkUrl: game.artworkUrl,
      screenshots: game.screenshots.join('\n'),
      trailerUrl: game.trailerUrl,
      steamLink: game.downloadLinks.steam || '',
      epicLink: game.downloadLinks.epic || '',
      osReq: game.systemRequirements.minimum.os,
      processorReq: game.systemRequirements.minimum.processor,
      memoryReq: game.systemRequirements.minimum.memory,
      graphicsReq: game.systemRequirements.minimum.graphics,
      storageReq: game.systemRequirements.minimum.storage
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formattedGame: Omit<Game, 'id'> = {
      name: formData.name,
      slug: formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      genre: formData.genre,
      platforms: formData.platforms.split(',').map(p => p.trim()),
      status: formData.status,
      description: formData.description,
      story: formData.story,
      features: formData.features.split('\n').filter(f => f.trim().length > 0),
      artworkUrl: formData.artworkUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200',
      screenshots: formData.screenshots.split('\n').filter(s => s.trim().length > 0),
      trailerUrl: formData.trailerUrl || 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      downloadLinks: {
        steam: formData.steamLink || undefined,
        epic: formData.epicLink || undefined
      },
      systemRequirements: {
        minimum: {
          os: formData.osReq,
          processor: formData.processorReq,
          memory: formData.memoryReq,
          graphics: formData.graphicsReq,
          storage: formData.storageReq
        },
        recommended: {
          os: formData.osReq,
          processor: formData.processorReq,
          memory: formData.memoryReq,
          graphics: formData.graphicsReq,
          storage: formData.storageReq
        }
      }
    };

    let success = false;
    if (editId) {
      success = await updateGame(editId, formattedGame);
    } else {
      success = await createGame(formattedGame);
    }

    if (success) {
      resetForm();
    }
  };

  const handleDeleteClick = async (id: string) => {
    if (confirm('Are you sure you want to delete this game?')) {
      await deleteGame(id);
    }
  };

  if (!token) return null;

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
                  className="w-full text-left px-4 py-2.5 rounded text-xs font-bold uppercase tracking-widest border border-bronze/10 text-ivory/80 hover:bg-bronze/10 transition-all"
                >
                  Overview
                </Link>
                <Link
                  href="/admin/dashboard/games"
                  className="w-full text-left px-4 py-2.5 rounded text-xs font-bold uppercase tracking-widest bg-gold text-charcoal"
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

          {/* Main Games CRUD Workspace */}
          <main className="flex-1 space-y-10">
            
            {/* Header row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-bronze/10 pb-6">
              <div>
                <span className="text-[10px] uppercase tracking-widest font-semibold text-gold">Portfolio</span>
                <h1 className="text-3xl font-serif font-light text-ivory mt-1">Games Management</h1>
              </div>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="rounded bg-gold px-6 py-3 text-[10px] uppercase font-bold tracking-widest text-charcoal hover:bg-white hover:scale-[1.02] transition-all flex items-center gap-2 self-start sm:self-auto"
                >
                  <Plus size={14} /> Add New Game
                </button>
              )}
            </div>

            {isEditing ? (
              /* Add / Edit Form */
              <div className="rounded-lg border border-bronze/20 bg-forest/5 p-8 relative backdrop-blur-sm">
                <div className="absolute top-4 right-4">
                  <button onClick={resetForm} className="text-ivory/60 hover:text-white">
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <h2 className="text-xl font-serif text-ivory pb-4 border-b border-bronze/10">
                    {editId ? 'Edit Game Specifications' : 'Publish New Game Build'}
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Game Name */}
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest text-ivory/50 block font-medium">Game Name</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Symmetry"
                        className="bg-transparent border-b border-bronze/30 focus:border-gold py-1 text-xs text-ivory placeholder-ivory/20 w-full outline-none"
                      />
                    </div>

                    {/* Genre */}
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest text-ivory/50 block font-medium">Genre</label>
                      <input
                        type="text"
                        name="genre"
                        required
                        value={formData.genre}
                        onChange={handleInputChange}
                        placeholder="Cinematic Action RPG"
                        className="bg-transparent border-b border-bronze/30 focus:border-gold py-1 text-xs text-ivory placeholder-ivory/20 w-full outline-none"
                      />
                    </div>

                    {/* Platforms */}
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest text-ivory/50 block font-medium">Platforms (comma separated)</label>
                      <input
                        type="text"
                        name="platforms"
                        required
                        value={formData.platforms}
                        onChange={handleInputChange}
                        placeholder="PC, PS5, Xbox Series X"
                        className="bg-transparent border-b border-bronze/30 focus:border-gold py-1 text-xs text-ivory placeholder-ivory/20 w-full outline-none"
                      />
                    </div>

                    {/* Status */}
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest text-ivory/50 block font-medium">Production Status</label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className="bg-charcoal border-b border-bronze/30 focus:border-gold py-1 text-xs text-ivory w-full outline-none"
                      >
                        <option value="In Production">In Production</option>
                        <option value="Pre-Alpha">Pre-Alpha</option>
                        <option value="Concept">Concept</option>
                        <option value="Released">Released</option>
                      </select>
                    </div>

                    {/* Artwork URL */}
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest text-ivory/50 block font-medium">Artwork Cover URL</label>
                      <input
                        type="url"
                        name="artworkUrl"
                        value={formData.artworkUrl}
                        onChange={handleInputChange}
                        placeholder="https://images.unsplash.com/..."
                        className="bg-transparent border-b border-bronze/30 focus:border-gold py-1 text-xs text-ivory placeholder-ivory/20 w-full outline-none"
                      />
                    </div>

                    {/* Trailer URL */}
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest text-ivory/50 block font-medium">Trailer Video URL (Youtube Embed)</label>
                      <input
                        type="url"
                        name="trailerUrl"
                        value={formData.trailerUrl}
                        onChange={handleInputChange}
                        placeholder="https://www.youtube.com/embed/..."
                        className="bg-transparent border-b border-bronze/30 focus:border-gold py-1 text-xs text-ivory placeholder-ivory/20 w-full outline-none"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-ivory/50 block font-medium">Summary Description</label>
                    <textarea
                      name="description"
                      required
                      rows={2}
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Brief overview summary for search cards..."
                      className="bg-transparent border border-bronze/30 focus:border-gold rounded p-3 text-xs text-ivory placeholder-ivory/20 w-full outline-none resize-none font-light"
                    />
                  </div>

                  {/* Story */}
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-ivory/50 block font-medium">Detailed Narrative / Lore Story</label>
                    <textarea
                      name="story"
                      required
                      rows={4}
                      value={formData.story}
                      onChange={handleInputChange}
                      placeholder="Detailed gameplay structure, narrative lore..."
                      className="bg-transparent border border-bronze/30 focus:border-gold rounded p-3 text-xs text-ivory placeholder-ivory/20 w-full outline-none resize-none font-light"
                    />
                  </div>

                  {/* Features */}
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-ivory/50 block font-medium">Key Features (One per line)</label>
                    <textarea
                      name="features"
                      rows={3}
                      value={formData.features}
                      onChange={handleInputChange}
                      placeholder="Architectural puzzle physics&#10;Symmetric parries&#10;Volumetric stone visuals"
                      className="bg-transparent border border-bronze/30 focus:border-gold rounded p-3 text-xs text-ivory placeholder-ivory/20 w-full outline-none resize-none font-mono font-light text-yellow-100"
                    />
                  </div>

                  {/* Screenshots */}
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-ivory/50 block font-medium">Screenshots URLs (One per line)</label>
                    <textarea
                      name="screenshots"
                      rows={3}
                      value={formData.screenshots}
                      onChange={handleInputChange}
                      placeholder="https://images.unsplash.com/screen1&#10;https://images.unsplash.com/screen2"
                      className="bg-transparent border border-bronze/30 focus:border-gold rounded p-3 text-xs text-ivory placeholder-ivory/20 w-full outline-none resize-none font-mono font-light text-yellow-100"
                    />
                  </div>

                  {/* Store links */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-bronze/10">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest text-ivory/50 block font-medium">Steam Store Link</label>
                      <input
                        type="url"
                        name="steamLink"
                        value={formData.steamLink}
                        onChange={handleInputChange}
                        placeholder="https://store.steampowered.com/..."
                        className="bg-transparent border-b border-bronze/30 focus:border-gold py-1 text-xs text-ivory placeholder-ivory/20 w-full outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest text-ivory/50 block font-medium">Epic Games Store Link</label>
                      <input
                        type="url"
                        name="epicLink"
                        value={formData.epicLink}
                        onChange={handleInputChange}
                        placeholder="https://store.epicgames.com/..."
                        className="bg-transparent border-b border-bronze/30 focus:border-gold py-1 text-xs text-ivory placeholder-ivory/20 w-full outline-none"
                      />
                    </div>
                  </div>

                  {/* Requirements */}
                  <div className="space-y-3 pt-4 border-t border-bronze/10">
                    <h3 className="text-xs uppercase font-bold tracking-widest text-gold">Minimum System Requirements</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                      <input type="text" name="osReq" value={formData.osReq} onChange={handleInputChange} placeholder="OS" className="bg-transparent border-b border-bronze/30 py-1 text-xs text-ivory w-full outline-none" />
                      <input type="text" name="processorReq" value={formData.processorReq} onChange={handleInputChange} placeholder="CPU" className="bg-transparent border-b border-bronze/30 py-1 text-xs text-ivory w-full outline-none" />
                      <input type="text" name="memoryReq" value={formData.memoryReq} onChange={handleInputChange} placeholder="RAM" className="bg-transparent border-b border-bronze/30 py-1 text-xs text-ivory w-full outline-none" />
                      <input type="text" name="graphicsReq" value={formData.graphicsReq} onChange={handleInputChange} placeholder="GPU" className="bg-transparent border-b border-bronze/30 py-1 text-xs text-ivory w-full outline-none" />
                      <input type="text" name="storageReq" value={formData.storageReq} onChange={handleInputChange} placeholder="Disk Space" className="bg-transparent border-b border-bronze/30 py-1 text-xs text-ivory w-full outline-none" />
                    </div>
                  </div>

                  <div className="flex gap-4 pt-6 border-t border-bronze/10">
                    <button
                      type="submit"
                      className="rounded bg-gold px-8 py-3 text-[10px] uppercase font-bold tracking-widest text-charcoal hover:bg-white transition-all flex items-center gap-2"
                    >
                      <Save size={14} /> Save Game
                    </button>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="rounded border border-bronze/30 bg-transparent px-8 py-3 text-[10px] uppercase font-bold tracking-widest text-ivory hover:bg-bronze/10 transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              /* Games List Table */
              <div className="border border-bronze/10 rounded-lg overflow-hidden bg-[#0b0b0b]">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-bronze/10 bg-forest/5 text-[9px] uppercase tracking-widest text-gold font-bold">
                      <th className="p-4">Game</th>
                      <th className="p-4">Genre</th>
                      <th className="p-4">Platforms</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-bronze/5 text-xs text-ivory/80 font-light">
                    {games.map((game) => (
                      <tr key={game.id} className="hover:bg-charcoal/50 transition-colors">
                        <td className="p-4 font-serif font-medium text-ivory">{game.name}</td>
                        <td className="p-4">{game.genre}</td>
                        <td className="p-4 text-sandstone">{game.platforms.join(', ')}</td>
                        <td className="p-4">
                          <span className="inline-block border border-bronze/30 bg-charcoal/50 px-2 py-0.5 rounded text-[8px] uppercase tracking-wider text-gold font-semibold">
                            {game.status}
                          </span>
                        </td>
                        <td className="p-4 text-right space-x-3">
                          <button
                            onClick={() => handleEditClick(game)}
                            className="text-gold hover:text-white transition-colors"
                            title="Edit"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(game.id)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

          </main>

        </div>
      </PageWrapper>
      <Footer />
    </>
  );
}
