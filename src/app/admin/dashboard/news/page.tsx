'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageWrapper from '@/components/PageWrapper';
import { useApp, BlogPost } from '@/context/AppContext';
import { ShieldCheck, LogOut, Plus, Edit2, Trash2, Save, X, BookOpen } from 'lucide-react';

export default function AdminNews() {
  const { token, logout, posts, createPost, updatePost, deletePost } = useApp();
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
    title: '',
    category: 'Dev Blog' as BlogPost['category'],
    summary: '',
    content: '',
    author: 'Chaitanya, Creative Director',
    coverImage: ''
  });

  const resetForm = () => {
    setIsEditing(false);
    setEditId(null);
    setFormData({
      title: '',
      category: 'Dev Blog',
      summary: '',
      content: '',
      author: 'Chaitanya, Creative Director',
      coverImage: ''
    });
  };

  const handleEditClick = (post: BlogPost) => {
    setIsEditing(true);
    setEditId(post.id);
    setFormData({
      title: post.title,
      category: post.category,
      summary: post.summary,
      content: post.content,
      author: post.author,
      coverImage: post.coverImage
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formattedPost: Omit<BlogPost, 'id' | 'publishDate'> = {
      title: formData.title,
      slug: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      category: formData.category,
      summary: formData.summary,
      content: formData.content,
      author: formData.author,
      coverImage: formData.coverImage || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800'
    };

    let success = false;
    if (editId) {
      success = await updatePost(editId, formattedPost);
    } else {
      success = await createPost(formattedPost);
    }

    if (success) {
      resetForm();
    }
  };

  const handleDeleteClick = async (id: string) => {
    if (confirm('Are you sure you want to delete this article?')) {
      await deletePost(id);
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
                  className="w-full text-left px-4 py-2.5 rounded text-xs font-bold uppercase tracking-widest border border-bronze/10 text-ivory/80 hover:bg-bronze/10 transition-all"
                >
                  Manage Games
                </Link>
                <Link
                  href="/admin/dashboard/news"
                  className="w-full text-left px-4 py-2.5 rounded text-xs font-bold uppercase tracking-widest bg-gold text-charcoal"
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

          {/* Main News CRUD Workspace */}
          <main className="flex-1 space-y-10">
            
            {/* Header row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-bronze/10 pb-6">
              <div>
                <span className="text-[10px] uppercase tracking-widest font-semibold text-gold">Chronicle</span>
                <h1 className="text-3xl font-serif font-light text-ivory mt-1">News Management</h1>
              </div>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="rounded bg-gold px-6 py-3 text-[10px] uppercase font-bold tracking-widest text-charcoal hover:bg-white hover:scale-[1.02] transition-all flex items-center gap-2 self-start sm:self-auto"
                >
                  <Plus size={14} /> Create New Post
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
                    {editId ? 'Edit Article specifications' : 'Publish New Article'}
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Title */}
                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-[10px] uppercase tracking-widest text-ivory/50 block font-medium">Article Title</label>
                      <input
                        type="text"
                        name="title"
                        required
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="Defining Srishti: Creative Philosophy in Modern Game Design"
                        className="bg-transparent border-b border-bronze/30 focus:border-gold py-1 text-xs text-ivory placeholder-ivory/20 w-full outline-none"
                      />
                    </div>

                    {/* Category */}
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest text-ivory/50 block font-medium">Category</label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="bg-charcoal border-b border-bronze/30 focus:border-gold py-1 text-xs text-ivory w-full outline-none"
                      >
                        <option value="Dev Blog">Dev Blog</option>
                        <option value="Announcement">Announcement</option>
                        <option value="Patch Notes">Patch Notes</option>
                      </select>
                    </div>

                    {/* Author */}
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest text-ivory/50 block font-medium">Author Name & Position</label>
                      <input
                        type="text"
                        name="author"
                        required
                        value={formData.author}
                        onChange={handleInputChange}
                        placeholder="Chaitanya, Creative Director"
                        className="bg-transparent border-b border-bronze/30 focus:border-gold py-1 text-xs text-ivory placeholder-ivory/20 w-full outline-none"
                      />
                    </div>

                    {/* Cover Image URL */}
                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-[10px] uppercase tracking-widest text-ivory/50 block font-medium">Cover Image URL</label>
                      <input
                        type="url"
                        name="coverImage"
                        value={formData.coverImage}
                        onChange={handleInputChange}
                        placeholder="https://images.unsplash.com/photo-..."
                        className="bg-transparent border-b border-bronze/30 focus:border-gold py-1 text-xs text-ivory placeholder-ivory/20 w-full outline-none"
                      />
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-ivory/50 block font-medium">Summary Description</label>
                    <textarea
                      name="summary"
                      required
                      rows={2}
                      value={formData.summary}
                      onChange={handleInputChange}
                      placeholder="Brief overview summary displayed on news listings..."
                      className="bg-transparent border border-bronze/30 focus:border-gold rounded p-3 text-xs text-ivory placeholder-ivory/20 w-full outline-none resize-none font-light"
                    />
                  </div>

                  {/* Content */}
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-ivory/50 block font-medium">Full Article Content (Markdown paragraphs supported)</label>
                    <textarea
                      name="content"
                      required
                      rows={8}
                      value={formData.content}
                      onChange={handleInputChange}
                      placeholder="Write your article text here. Use ### for subheadings..."
                      className="bg-transparent border border-bronze/30 focus:border-gold rounded p-3 text-xs text-ivory placeholder-ivory/20 w-full outline-none resize-none font-light"
                    />
                  </div>

                  <div className="flex gap-4 pt-6 border-t border-bronze/10">
                    <button
                      type="submit"
                      className="rounded bg-gold px-8 py-3 text-[10px] uppercase font-bold tracking-widest text-charcoal hover:bg-white transition-all flex items-center gap-2"
                    >
                      <Save size={14} /> Publish Post
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
              /* News List Table */
              <div className="border border-bronze/10 rounded-lg overflow-hidden bg-[#0b0b0b]">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-bronze/10 bg-forest/5 text-[9px] uppercase tracking-widest text-gold font-bold">
                      <th className="p-4">Date</th>
                      <th className="p-4">Title</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Author</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-bronze/5 text-xs text-ivory/80 font-light">
                    {posts.map((post) => (
                      <tr key={post.id} className="hover:bg-charcoal/50 transition-colors">
                        <td className="p-4 font-mono text-sandstone text-[10px]">{post.publishDate}</td>
                        <td className="p-4 font-serif font-medium text-ivory truncate max-w-xs">{post.title}</td>
                        <td className="p-4">
                          <span className="inline-block border border-bronze/30 bg-charcoal/50 px-2 py-0.5 rounded text-[8px] uppercase tracking-wider text-gold font-semibold">
                            {post.category}
                          </span>
                        </td>
                        <td className="p-4 text-ivory/60">{post.author.split(',')[0]}</td>
                        <td className="p-4 text-right space-x-3">
                          <button
                            onClick={() => handleEditClick(post)}
                            className="text-gold hover:text-white transition-colors"
                            title="Edit"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(post.id)}
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
