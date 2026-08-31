'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MandalaDivider from '@/components/MandalaDivider';
import PageWrapper from '@/components/PageWrapper';
import { useApp } from '@/context/AppContext';
import { Mail, MapPin, Send, CheckCircle2, User, Phone, Globe, Compass } from 'lucide-react';

export default function Contact() {
  const { submitContact } = useApp();
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const success = await submitContact({
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message
    });
    setIsSubmitting(false);

    if (success) {
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 4000);
    }
  };

  return (
    <>
      <Navbar />
      <PageWrapper>
        {/* Header */}
        <section className="relative bg-charcoal py-20 border-b border-bronze/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-[10px] uppercase tracking-[0.35em] font-semibold text-gold">Coordinates</span>
            <h1 className="text-4xl sm:text-5xl font-serif font-light tracking-wide text-ivory mt-4">
              Get in <span className="italic gold-gradient-text font-normal">Touch</span>
            </h1>
            <p className="mt-4 text-xs text-ivory/60 max-w-md mx-auto font-light leading-relaxed">
              Reach out for business inquiries, press opportunities, or career clarifications.
            </p>
          </div>
        </section>

        {/* Contact Form and Info Section */}
        <section className="py-24 bg-charcoal">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
              
              {/* Left Column: Coordinates / Info details */}
              <div className="lg:col-span-5 space-y-10">
                <div className="space-y-4">
                  <span className="text-[10px] uppercase tracking-widest font-semibold text-gold">Details</span>
                  <h2 className="text-2xl font-serif font-light text-ivory">Virtual Studio</h2>
                  <div className="h-[1px] w-12 bg-bronze/40" />
                </div>

                <div className="space-y-6">
                  {/* Location */}
                  <div className="flex gap-4 items-start text-xs font-light text-ivory/80">
                    <div className="h-9 w-9 rounded-full border border-bronze/20 bg-bronze/5 flex items-center justify-center text-gold flex-shrink-0">
                      <MapPin size={16} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gold uppercase tracking-wider text-[10px] mb-1">Office Location</h4>
                      <p className="leading-relaxed text-ivory/60">
                        Fully Remote & Virtual Collaboration<br />
                        Worldwide Network Nodes
                      </p>
                    </div>
                  </div>

                  {/* General Email */}
                  <div className="flex gap-4 items-start text-xs font-light text-ivory/80">
                    <div className="h-9 w-9 rounded-full border border-bronze/20 bg-bronze/5 flex items-center justify-center text-gold flex-shrink-0">
                      <Mail size={16} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gold uppercase tracking-wider text-[10px] mb-1">Inquiries</h4>
                      <a href="mailto:hello@srishtistudios.com" className="text-ivory/60 hover:text-gold transition-colors block">
                        hello@srishtistudios.com
                      </a>
                      <a href="mailto:careers@srishtistudios.com" className="text-ivory/60 hover:text-gold transition-colors block mt-0.5">
                        careers@srishtistudios.com
                      </a>
                    </div>
                  </div>

                  {/* Coordinates Info */}
                  <div className="flex gap-4 items-start text-xs font-light text-ivory/80">
                    <div className="h-9 w-9 rounded-full border border-bronze/20 bg-bronze/5 flex items-center justify-center text-gold flex-shrink-0">
                      <Compass size={16} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gold uppercase tracking-wider text-[10px] mb-1">Positioning</h4>
                      <p className="text-ivory/60 font-mono">Decentralized / Virtual</p>
                    </div>
                  </div>
                </div>

                {/* Symmetrical Map Representation (CSS Canvas concept) */}
                <div className="relative aspect-video rounded border border-bronze/20 bg-[#090909] overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 stone-noise pointer-events-none opacity-20" />
                  
                  {/* concentric coordinate rings */}
                  <div className="absolute h-36 w-36 border border-bronze/10 rounded-full" />
                  <div className="absolute h-24 w-24 border border-bronze/15 rounded-full" />
                  <div className="absolute h-12 w-12 border border-gold/20 rounded-full flex items-center justify-center">
                    <div className="h-2 w-2 bg-gold rounded-full animate-ping" />
                    <div className="absolute h-1.5 w-1.5 bg-gold rounded-full" />
                  </div>
                  
                  {/* Axis lines */}
                  <div className="absolute top-0 bottom-0 left-1/2 w-[0.5px] bg-bronze/10" />
                  <div className="absolute left-0 right-0 top-1/2 h-[0.5px] bg-bronze/10" />
                  
                  <span className="absolute bottom-4 left-4 text-[9px] uppercase tracking-widest text-ivory/30">Global Network Nodes</span>
                </div>
              </div>

              {/* Right Column: Inquiry Form */}
              <div className="lg:col-span-7 rounded-lg border border-bronze/20 bg-forest/5 p-8 backdrop-blur-sm">
                {submitSuccess ? (
                  <div className="py-20 text-center space-y-4">
                    <CheckCircle2 size={48} className="text-gold mx-auto" />
                    <h3 className="text-xl font-serif text-ivory">Message Sent Successfully</h3>
                    <p className="text-xs text-ivory/60 max-w-xs mx-auto">
                      Thank you for contacting Srishti Studios. Our corporate division will review and reply.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="border-b border-bronze/10 pb-4">
                      <h3 className="text-lg font-serif font-light text-ivory tracking-wide">
                        Send message
                      </h3>
                      <p className="text-[10px] text-ivory/40 uppercase mt-0.5">Please allow 24-48 hours for general responses.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Name */}
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-widest text-ivory/50 block font-medium">Your Name</label>
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
                    </div>

                    {/* Subject */}
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest text-ivory/50 block font-medium">Subject</label>
                      <div className="flex items-center border-b border-bronze/30 focus-within:border-gold py-1">
                        <input
                          type="text"
                          name="subject"
                          required
                          value={formData.subject}
                          onChange={handleInputChange}
                          placeholder="Business Partnership Inquiry"
                          className="bg-transparent border-none outline-none text-xs text-ivory placeholder-ivory/20 w-full"
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest text-ivory/50 block font-medium">Message Body</label>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="State your query details here..."
                        className="bg-transparent border border-bronze/30 focus:border-gold rounded p-3 text-xs text-ivory placeholder-ivory/20 w-full outline-none resize-none font-light"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full rounded bg-gold py-3.5 text-[10px] uppercase font-bold tracking-[0.25em] text-charcoal hover:bg-ivory hover:scale-[1.01] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Inquiry'} <Send size={12} />
                    </button>
                  </form>
                )}
              </div>

            </div>
          </div>
        </section>

        <MandalaDivider />
      </PageWrapper>
      <Footer />
    </>
  );
}
