'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MandalaDivider from '@/components/MandalaDivider';
import PageWrapper from '@/components/PageWrapper';
import { useApp, Job } from '@/context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, MapPin, Clock, ArrowRight, X, FileText, CheckCircle2, User, Mail, Link as LinkIcon, Compass } from 'lucide-react';

export default function Careers() {
  const { jobs, submitApplication } = useApp();
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    resumeUrl: '',
    coverLetter: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleOpenApply = (job: Job) => {
    setSelectedJob(job);
    setSubmitSuccess(false);
    setFormData({ name: '', email: '', resumeUrl: '', coverLetter: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;

    setIsSubmitting(true);
    const success = await submitApplication({
      jobId: selectedJob.id,
      name: formData.name,
      email: formData.email,
      resumeUrl: formData.resumeUrl,
      coverLetter: formData.coverLetter
    });
    setIsSubmitting(false);

    if (success) {
      setSubmitSuccess(true);
      setTimeout(() => {
        setSelectedJob(null);
        setSubmitSuccess(false);
      }, 2500);
    }
  };

  return (
    <>
      <Navbar />
      <PageWrapper>
        {/* Header */}
        <section className="relative bg-charcoal py-20 border-b border-bronze/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-[10px] uppercase tracking-[0.35em] font-semibold text-gold">Careers</span>
            <h1 className="text-4xl sm:text-5xl font-serif font-light tracking-wide text-ivory mt-4">
              Shape Symmetrical <span className="italic gold-gradient-text font-normal">Realms</span>
            </h1>
            <p className="mt-4 text-xs text-ivory/60 max-w-md mx-auto font-light leading-relaxed">
              Join Srishti Studios. We offer a calm, collaborative workspace focused on AAA craftsmanship and technology without crunch.
            </p>
          </div>
        </section>

        {/* Life at Srishti Studios */}
        <section className="py-24 bg-charcoal">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
              <div className="md:col-span-6 space-y-6">
                <span className="text-[10px] uppercase tracking-widest font-semibold text-gold">Life at Srishti</span>
                <h2 className="text-3xl font-serif font-light text-ivory">Building a Sustainable Workspace</h2>
                <div className="h-[1px] w-12 bg-bronze/40" />
                <p className="text-xs text-ivory/70 leading-relaxed font-light">
                  We believe that the best creative output is born from calm, focused, and healthy minds. Our virtual studio workspace and collaborative sync pipelines are structured to respect creative time, fostering a peaceful work flow.
                </p>
                <p className="text-xs text-ivory/70 leading-relaxed font-light">
                  We maintain a strict anti-crunch policy. By organizing production schedules with realistic scopes, we ensure our environment sculptors, developers, and designers can grow without burnout.
                </p>
                <div className="grid grid-cols-2 gap-6 pt-4 text-xs">
                  <div className="p-4 border border-bronze/10 rounded bg-[#0b0b0b]">
                    <h4 className="font-semibold text-gold font-serif">Comprehensive Healthcare</h4>
                    <p className="text-[10px] text-ivory/50 mt-1 font-light">Top-tier health and dental plans for you and your dependents.</p>
                  </div>
                  <div className="p-4 border border-bronze/10 rounded bg-[#0b0b0b]">
                    <h4 className="font-semibold text-gold font-serif">Fully Remote / Global</h4>
                    <p className="text-[10px] text-ivory/50 mt-1 font-light">Work from anywhere in the world on a core timezone overlap.</p>
                  </div>
                </div>
              </div>

              {/* Symmetrical visual graphic */}
              <div className="md:col-span-6 flex justify-center">
                <div className="relative aspect-video w-full max-w-md rounded-lg overflow-hidden border border-bronze/20 bg-forest/20 flex items-center justify-center">
                  <div className="absolute inset-0 stone-noise pointer-events-none opacity-20" />
                  <Compass size={40} className="text-bronze animate-pulse" />
                  <span className="absolute bottom-4 text-[9px] uppercase tracking-[0.25em] text-ivory/40">Virtually Connected</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <MandalaDivider />

        {/* Job Openings */}
        <section className="py-24 bg-charcoal/20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-[10px] uppercase tracking-widest font-semibold text-gold">Join the Crew</span>
              <h2 className="text-3xl font-serif font-light text-ivory mt-2">Open Positions</h2>
            </div>

            <div className="space-y-6">
              {jobs.length > 0 ? (
                jobs.map((job) => (
                  <div
                    key={job.id}
                    className="p-6 md:p-8 rounded-lg border border-bronze/10 bg-forest/5 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-gold/30 transition-all duration-300 group"
                  >
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] text-gold uppercase tracking-widest font-bold">
                        <span className="flex items-center gap-1"><Briefcase size={12} /> {job.department}</span>
                        <span className="text-ivory/20">&bull;</span>
                        <span className="flex items-center gap-1"><MapPin size={12} /> {job.location}</span>
                        <span className="text-ivory/20">&bull;</span>
                        <span className="flex items-center gap-1"><Clock size={12} /> {job.type}</span>
                      </div>
                      <h3 className="text-xl font-serif font-medium tracking-wide text-ivory group-hover:text-gold transition-colors">
                        {job.title}
                      </h3>
                      <p className="text-xs text-ivory/60 leading-relaxed font-light max-w-2xl">
                        {job.description}
                      </p>
                    </div>

                    <button
                      onClick={() => handleOpenApply(job)}
                      className="rounded border border-gold/30 bg-gold/5 px-6 py-3 text-[10px] uppercase font-bold tracking-widest text-gold hover:bg-gold hover:text-charcoal self-start md:self-auto transition-all"
                    >
                      Apply Now
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center py-20 border border-dashed border-bronze/10 rounded">
                  <p className="text-sm font-serif text-ivory/50">No roles active. Check back later.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Modal Overlay */}
        <AnimatePresence>
          {selectedJob && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-lg rounded-lg border border-bronze/30 bg-charcoal p-8 relative shadow-2xl"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedJob(null)}
                  className="absolute top-4 right-4 text-ivory/60 hover:text-white"
                >
                  <X size={20} />
                </button>

                {submitSuccess ? (
                  <div className="py-12 text-center space-y-4">
                    <CheckCircle2 size={48} className="text-gold mx-auto" />
                    <h3 className="text-xl font-serif text-ivory">Application Submitted</h3>
                    <p className="text-xs text-ivory/60 max-w-xs mx-auto">
                      Thank you for applying. Our talent acquisition crew will review your details and resume.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-gold font-bold">Apply For Role</span>
                      <h3 className="text-xl font-serif text-ivory mt-1">{selectedJob.title}</h3>
                      <p className="text-[10px] text-ivory/40 uppercase tracking-wider mt-0.5">{selectedJob.department} &bull; {selectedJob.location}</p>
                    </div>

                    <div className="space-y-4">
                      {/* Name */}
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-widest text-ivory/50 block font-medium">Full Name</label>
                        <div className="flex items-center border-b border-bronze/30 focus-within:border-gold py-1">
                          <User size={14} className="text-ivory/30 mr-2" />
                          <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Chaitanya"
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
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="chaitanya@example.com"
                            className="bg-transparent border-none outline-none text-xs text-ivory placeholder-ivory/20 w-full"
                          />
                        </div>
                      </div>

                      {/* Resume URL */}
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-widest text-ivory/50 block font-medium">Resume Portfolio URL</label>
                        <div className="flex items-center border-b border-bronze/30 focus-within:border-gold py-1">
                          <LinkIcon size={14} className="text-ivory/30 mr-2" />
                          <input
                            type="url"
                            name="resumeUrl"
                            required
                            value={formData.resumeUrl}
                            onChange={handleInputChange}
                            placeholder="https://drive.google.com/your-resume-pdf"
                            className="bg-transparent border-none outline-none text-xs text-ivory placeholder-ivory/20 w-full"
                          />
                        </div>
                      </div>

                      {/* Cover Letter */}
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-widest text-ivory/50 block font-medium">Brief Introduction (Cover Letter)</label>
                        <textarea
                          name="coverLetter"
                          rows={3}
                          value={formData.coverLetter}
                          onChange={handleInputChange}
                          placeholder="Tell us what draws you to digital AAA craftsmanship..."
                          className="bg-transparent border border-bronze/30 focus:border-gold rounded p-3 text-xs text-ivory placeholder-ivory/20 w-full outline-none resize-none font-light"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full rounded bg-gold py-3 text-[10px] uppercase font-bold tracking-[0.25em] text-charcoal hover:bg-ivory hover:scale-[1.01] transition-all disabled:opacity-50"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Application'}
                    </button>
                  </form>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </PageWrapper>
      <Footer />
    </>
  );
}
