'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageWrapper from '@/components/PageWrapper';
import { useApp, Job } from '@/context/AppContext';
import { ShieldCheck, LogOut, Plus, Edit2, Trash2, Save, X, Eye, FileText, ArrowRight, User } from 'lucide-react';

export default function AdminCareers() {
  const { token, logout, jobs, applications, createJob, updateJob, deleteJob } = useApp();
  const router = useRouter();

  // Authorization Shield
  useEffect(() => {
    if (!token) {
      router.push('/admin');
    }
  }, [token, router]);

  // Tab state: 'jobs' | 'applicants'
  const [activeTab, setActiveTab] = useState<'jobs' | 'applicants'>('jobs');

  // Form states
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-Time',
    description: '',
    requirements: '',
    responsibilities: ''
  });

  const resetForm = () => {
    setIsEditing(false);
    setEditId(null);
    setFormData({
      title: '',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-Time',
      description: '',
      requirements: '',
      responsibilities: ''
    });
  };

  const handleEditClick = (job: Job) => {
    setIsEditing(true);
    setEditId(job.id);
    setFormData({
      title: job.title,
      department: job.department,
      location: job.location,
      type: job.type,
      description: job.description,
      requirements: job.requirements.join('\n'),
      responsibilities: job.responsibilities.join('\n')
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formattedJob: Omit<Job, 'id'> = {
      title: formData.title,
      department: formData.department,
      location: formData.location,
      type: formData.type,
      description: formData.description,
      requirements: formData.requirements.split('\n').filter(r => r.trim().length > 0),
      responsibilities: formData.responsibilities.split('\n').filter(rp => rp.trim().length > 0)
    };

    let success = false;
    if (editId) {
      success = await updateJob(editId, formattedJob);
    } else {
      success = await createJob(formattedJob);
    }

    if (success) {
      resetForm();
    }
  };

  const handleDeleteClick = async (id: string) => {
    if (confirm('Are you sure you want to delete this job post?')) {
      await deleteJob(id);
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
                  className="w-full text-left px-4 py-2.5 rounded text-xs font-bold uppercase tracking-widest border border-bronze/10 text-ivory/80 hover:bg-bronze/10 transition-all"
                >
                  Manage News
                </Link>
                <Link
                  href="/admin/dashboard/careers"
                  className="w-full text-left px-4 py-2.5 rounded text-xs font-bold uppercase tracking-widest bg-gold text-charcoal"
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

          {/* Main Careers CRUD Workspace */}
          <main className="flex-1 space-y-10">
            
            {/* Header row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-bronze/10 pb-6">
              <div>
                <span className="text-[10px] uppercase tracking-widest font-semibold text-gold">Talent Hub</span>
                <h1 className="text-3xl font-serif font-light text-ivory mt-1">Careers Management</h1>
              </div>
              
              {/* Tab Selector */}
              <div className="flex border border-bronze/20 rounded p-1 self-start sm:self-auto text-[10px] font-bold uppercase tracking-wider">
                <button
                  onClick={() => { setActiveTab('jobs'); resetForm(); }}
                  className={`px-4 py-2 rounded transition-all ${
                    activeTab === 'jobs' ? 'bg-gold text-charcoal' : 'text-ivory/70 hover:text-white'
                  }`}
                >
                  Job Openings
                </button>
                <button
                  onClick={() => { setActiveTab('applicants'); resetForm(); }}
                  className={`px-4 py-2 rounded transition-all ${
                    activeTab === 'applicants' ? 'bg-gold text-charcoal' : 'text-ivory/70 hover:text-white'
                  }`}
                >
                  Applicants ({applications.length})
                </button>
              </div>
            </div>

            {activeTab === 'jobs' ? (
              isEditing ? (
                /* Job Form */
                <div className="rounded-lg border border-bronze/20 bg-forest/5 p-8 relative backdrop-blur-sm">
                  <div className="absolute top-4 right-4">
                    <button onClick={resetForm} className="text-ivory/60 hover:text-white">
                      <X size={20} />
                    </button>
                  </div>

                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    <h2 className="text-xl font-serif text-ivory pb-4 border-b border-bronze/10">
                      {editId ? 'Edit Job Role' : 'Create New Job Listing'}
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Job Title */}
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-widest text-ivory/50 block font-medium">Job Title</label>
                        <input
                          type="text"
                          name="title"
                          required
                          value={formData.title}
                          onChange={handleInputChange}
                          placeholder="Senior Gameplay Engineer"
                          className="bg-transparent border-b border-bronze/30 focus:border-gold py-1 text-xs text-ivory placeholder-ivory/20 w-full outline-none"
                        />
                      </div>

                      {/* Department */}
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-widest text-ivory/50 block font-medium">Department</label>
                        <select
                          name="department"
                          value={formData.department}
                          onChange={handleInputChange}
                          className="bg-charcoal border-b border-bronze/30 focus:border-gold py-1 text-xs text-ivory w-full outline-none"
                        >
                          <option value="Engineering">Engineering</option>
                          <option value="Art & Design">Art & Design</option>
                          <option value="Audio">Audio</option>
                          <option value="Production">Production</option>
                        </select>
                      </div>

                      {/* Location */}
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-widest text-ivory/50 block font-medium">Location</label>
                        <input
                          type="text"
                          name="location"
                          required
                          value={formData.location}
                          onChange={handleInputChange}
                          placeholder="Remote"
                          className="bg-transparent border-b border-bronze/30 focus:border-gold py-1 text-xs text-ivory placeholder-ivory/20 w-full outline-none"
                        />
                      </div>

                      {/* Type */}
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-widest text-ivory/50 block font-medium">Job Type</label>
                        <select
                          name="type"
                          value={formData.type}
                          onChange={handleInputChange}
                          className="bg-charcoal border-b border-bronze/30 focus:border-gold py-1 text-xs text-ivory w-full outline-none"
                        >
                          <option value="Full-Time">Full-Time</option>
                          <option value="Contract">Contract</option>
                          <option value="Internship">Internship</option>
                        </select>
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
                        placeholder="Brief overview summary for job seekers..."
                        className="bg-transparent border border-bronze/30 focus:border-gold rounded p-3 text-xs text-ivory placeholder-ivory/20 w-full outline-none resize-none font-light"
                      />
                    </div>

                    {/* Requirements */}
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest text-ivory/50 block font-medium">Requirements (One per line)</label>
                      <textarea
                        name="requirements"
                        rows={3}
                        value={formData.requirements}
                        onChange={handleInputChange}
                        placeholder="5+ years C++ experience&#10;Unreal Engine gameplay mechanics&#10;Strong vectors math"
                        className="bg-transparent border border-bronze/30 focus:border-gold rounded p-3 text-xs text-ivory placeholder-ivory/20 w-full outline-none resize-none font-mono text-yellow-100 font-light"
                      />
                    </div>

                    {/* Responsibilities */}
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest text-ivory/50 block font-medium">Responsibilities (One per line)</label>
                      <textarea
                        name="responsibilities"
                        rows={3}
                        value={formData.responsibilities}
                        onChange={handleInputChange}
                        placeholder="Smelt custom physics components&#10;Coordinate with level designers&#10;Refine locomotion parries"
                        className="bg-transparent border border-bronze/30 focus:border-gold rounded p-3 text-xs text-ivory placeholder-ivory/20 w-full outline-none resize-none font-mono text-yellow-100 font-light"
                      />
                    </div>

                    <div className="flex gap-4 pt-6 border-t border-bronze/10">
                      <button
                        type="submit"
                        className="rounded bg-gold px-8 py-3 text-[10px] uppercase font-bold tracking-widest text-charcoal hover:bg-white transition-all flex items-center gap-2"
                      >
                        <Save size={14} /> Save Job Listing
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
                /* Job Openings List */
                <div className="space-y-6">
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-[10px] uppercase tracking-widest text-ivory/50">Active Roles</span>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="text-[10px] text-gold uppercase font-bold hover:underline"
                    >
                      + Add Position
                    </button>
                  </div>
                  <div className="border border-bronze/10 rounded-lg overflow-hidden bg-[#0b0b0b]">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-bronze/10 bg-forest/5 text-[9px] uppercase tracking-widest text-gold font-bold">
                          <th className="p-4">Title</th>
                          <th className="p-4">Department</th>
                          <th className="p-4">Location</th>
                          <th className="p-4">Type</th>
                          <th className="p-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-bronze/5 text-xs text-ivory/80 font-light">
                        {jobs.map((job) => (
                          <tr key={job.id} className="hover:bg-charcoal/50 transition-colors">
                            <td className="p-4 font-serif font-medium text-ivory">{job.title}</td>
                            <td className="p-4 text-sandstone">{job.department}</td>
                            <td className="p-4 text-ivory/60">{job.location}</td>
                            <td className="p-4">{job.type}</td>
                            <td className="p-4 text-right space-x-3">
                              <button
                                onClick={() => handleEditClick(job)}
                                className="text-gold hover:text-white transition-colors"
                                title="Edit"
                              >
                                <Edit2 size={14} />
                              </button>
                              <button
                                onClick={() => handleDeleteClick(job.id)}
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
                </div>
              )
            ) : (
              /* Applicants reviewer list */
              <div className="space-y-6">
                <span className="text-[10px] uppercase tracking-widest text-ivory/50 block">Received Resumes</span>
                <div className="border border-bronze/10 rounded-lg overflow-hidden bg-[#0b0b0b]">
                  {applications.length > 0 ? (
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-bronze/10 bg-forest/5 text-[9px] uppercase tracking-widest text-gold font-bold">
                          <th className="p-4">Applicant</th>
                          <th className="p-4">Position</th>
                          <th className="p-4">Email</th>
                          <th className="p-4">Date</th>
                          <th className="p-4 text-right">Resume</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-bronze/5 text-xs text-ivory/80 font-light">
                        {applications.map((app) => {
                          const associatedJob = jobs.find(j => j.id === app.jobId);
                          return (
                            <tr key={app.id} className="hover:bg-charcoal/50 transition-colors">
                              <td className="p-4 font-semibold text-ivory">{app.name}</td>
                              <td className="p-4 text-gold">{associatedJob?.title || 'Unknown Role'}</td>
                              <td className="p-4 text-ivory/60">{app.email}</td>
                              <td className="p-4 font-mono text-[10px] text-sandstone">{app.submittedAt.split('T')[0]}</td>
                              <td className="p-4 text-right">
                                <a
                                  href={app.resumeUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-[10px] uppercase font-bold text-gold hover:underline"
                                >
                                  Open <Eye size={12} />
                                </a>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  ) : (
                    <p className="text-xs text-ivory/40 py-20 text-center font-light">No resumes submitted for open positions yet.</p>
                  )}
                </div>
              </div>
            )}

          </main>

        </div>
      </PageWrapper>
      <Footer />
    </>
  );
}
