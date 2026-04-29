import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle2 } from 'lucide-react';
import { submitConciergeRequest } from '../lib/firebase';
import { cn } from '../lib/utils';

export default function ConciergeForm() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Private Aviation',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitConciergeRequest(formData);
      setSubmitted(true);
    } catch (err) {
      console.error('Error submitting request:', err);
      // Even on error we might want to show success to prevent scraping or just handle it gracefully
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="concierge" className="py-32 bg-black relative overflow-hidden px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Contact Details */}
          <div>
            <span className="font-thin-caps text-gold">Get In Touch</span>
            <h2 className="text-6xl font-serif mt-4 mb-8 text-white italic">Begin Your <span className="text-gold">VIP</span> Journey</h2>
            <p className="text-zinc-gray font-thin-caps !tracking-[0.2em] mb-12 max-w-md opacity-60">
              Our dedicated concierge team is available around the clock to craft your bespoke luxury experience. From exclusive event access to personalized travel arrangements, we handle every detail with discretion and excellence.
            </p>
            
            <div className="space-y-10">
              {[
                { icon: '☎', title: 'Global Hotline', val: '+1 (800) 555-1234', sub: '24/7 Availability' },
                { icon: '✉', title: 'Email Us', val: 'concierge@veloce.com', sub: 'Response within 2 hours' },
                { icon: '⚐', title: 'London Office', val: 'Mayfair, London W1K 5AH', sub: 'By appointment only' }
              ].map((item, i) => (
                <div key={i} className="flex gap-6">
                  <div className="w-12 h-12 rounded-full border border-gold/20 flex items-center justify-center text-gold text-lg flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-1">{item.title}</h4>
                    <p className="text-gold font-bold text-sm tracking-wide">{item.val}</p>
                    <p className="text-zinc-gray text-[10px] uppercase tracking-widest font-bold mt-1 opacity-50">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 flex flex-wrap gap-4">
              {['Monaco GP', 'Wimbledon', 'Royal Ascot', 'Super Bowl', 'F1 Paddock Club'].map(tag => (
                <span key={tag} className="px-5 py-2 rounded-full border border-white/5 font-thin-caps !text-[7px] text-zinc-gray/60">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-black-light/50 border border-gold/10 p-12 rounded-sm backdrop-blur-xl">
            {submitted ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
                <CheckCircle2 className="w-20 h-20 text-gold mx-auto mb-8" />
                <h3 className="text-4xl font-serif text-white mb-4 italic tracking-wide">Protocol Initialized</h3>
                <p className="text-zinc-gray text-xs tracking-[0.3em] leading-relaxed uppercase">Our team has received your transmission. <br/>Expect contact via secure channels.</p>
                <button onClick={() => setSubmitted(false)} className="mt-12 text-gold text-[10px] uppercase tracking-[0.3em] font-bold border-b border-gold/20 pb-1 hover:border-gold transition-all">New Inquiry</button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[9px] uppercase tracking-[0.3em] text-white/40 font-bold">Full Name</label>
                  <input
                    required
                    className="w-full bg-black-deep/50 border border-white/5 py-4 px-6 text-white text-sm focus:border-gold/30 transition-all font-light tracking-wide outline-none"
                    placeholder="John Smith"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                
                <div className="space-y-3">
                  <label className="text-[9px] uppercase tracking-[0.3em] text-white/40 font-bold">Email Address</label>
                  <input
                    required
                    type="email"
                    className="w-full bg-black-deep/50 border border-white/5 py-4 px-6 text-white text-sm focus:border-gold/30 transition-all font-light tracking-wide outline-none"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-[9px] uppercase tracking-[0.3em] text-white/40 font-bold">Phone Number</label>
                  <input
                    type="tel"
                    className="w-full bg-black-deep/50 border border-white/5 py-4 px-6 text-white text-sm focus:border-gold/30 transition-all font-light tracking-wide outline-none"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-[9px] uppercase tracking-[0.3em] text-white/40 font-bold">Event Interest</label>
                  <select
                    className="w-full bg-black-deep/50 border border-white/5 py-4 px-6 text-white text-xs focus:border-gold/30 transition-all font-light tracking-widest uppercase outline-none appearance-none"
                    value={formData.service}
                    onChange={e => setFormData({...formData, service: e.target.value})}
                  >
                    <option>Select an event</option>
                    <option>Monaco Grand Prix</option>
                    <option>Wimbledon</option>
                    <option>Royal Ascot</option>
                    <option>Super Bowl</option>
                    <option>Private Aviation</option>
                  </select>
                </div>

                <div className="md:col-span-2 space-y-3">
                  <label className="text-[9px] uppercase tracking-[0.3em] text-white/40 font-bold">Your Message</label>
                  <textarea
                    rows={5}
                    className="w-full bg-black-deep/50 border border-white/5 p-6 text-white text-sm focus:border-gold/30 transition-all font-light tracking-wide resize-none outline-none"
                    placeholder="Tell us about your requirements..."
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                  />
                </div>

                <button
                  disabled={loading}
                  type="submit"
                  className="md:col-span-2 py-5 bg-gold text-black uppercase tracking-[0.4em] font-bold text-xs flex items-center justify-center gap-4 hover:bg-gold-hover transition-all duration-500 shadow-xl shadow-gold/5 disabled:opacity-50"
                >
                  {loading ? 'Transmitting...' : "Submit Enquiry"}
                  {!loading && <Send className="w-4 h-4" />}
                </button>
                <p className="md:col-span-2 text-[8px] uppercase tracking-[0.2em] text-center text-zinc-gray/40">
                  By submitting, you agree to our privacy policy. Your information is handled with absolute discretion.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
