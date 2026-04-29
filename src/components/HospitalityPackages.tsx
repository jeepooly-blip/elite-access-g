import { motion } from 'motion/react';
import { Crown, Coffee, Car, Shield, Star, Globe } from 'lucide-react';

const INCLUSIONS = [
  { icon: Crown, title: 'Bespoke Concierge', desc: 'Dedicated 24/7 support for every detail' },
  { icon: Coffee, title: 'Fine Dining', desc: 'Michelin-starred catering & open bar' },
  { icon: Car, title: 'VIP Logistics', desc: 'Helicopter & luxury car transfers' },
  { icon: Globe, title: 'Global Access', desc: 'Secure entry to any event, anywhere' },
  { icon: Star, title: 'Premium Views', desc: 'The most coveted vantage points' },
  { icon: Shield, title: 'Secure Gateway', desc: 'Encrypted communication & logistics' }
];

export default function HospitalityPackages() {
  return (
    <section id="hospitality" className="py-32 bg-black px-10 border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="section-tag font-thin-caps">PREMIUM SELECTION</span>
            <h2 className="section-title">Superior <span className="text-gold italic">Hospitality</span></h2>
            <p className="text-zinc-gray font-thin-caps !tracking-[0.2em] mb-12 opacity-60 max-w-lg">
              Our hospitality packages go beyond simple attendance. We provide an immersive experience that blends cultural significance with modern luxury.
            </p>
            
            <div className="space-y-8 mb-12">
              <div className="luxury-card p-10 group">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-gold font-thin-caps mb-3 block">FLAGSHIP EXPERIENCE</span>
                    <h3 className="text-white font-serif text-4xl italic">Paddock Club™</h3>
                  </div>
                  <span className="text-gold text-xl font-serif italic">From €5,400</span>
                </div>
                <p className="text-zinc-gray font-thin-caps !tracking-[0.15em] mb-8 opacity-40">
                  The ultimate pinnacle of Formula 1 luxury. Rub shoulders with the teams and drivers in the heart of the pit lane.
                </p>
                <button className="btn-gold w-full">REQUEST AVAILABILITY</button>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] relative overflow-hidden border border-gold/10">
              <img 
                src="https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=2000" 
                alt="Paddock Club" 
                className="w-full h-full object-cover transition-all duration-1000 scale-105 hover:scale-100"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            </div>
            {/* Decal */}
            <div className="absolute -bottom-8 -left-8 bg-black p-8 border border-gold/10 hidden md:block">
              <div className="text-gold font-serif italic text-4xl mb-1">98%</div>
              <div className="text-white text-[8px] uppercase tracking-[0.3em] opacity-60">Client Retention</div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-6 gap-8">
          {INCLUSIONS.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="w-12 h-12 rounded-full border border-gold/10 flex items-center justify-center mx-auto mb-6 group-hover:border-gold/40 transition-colors">
                <item.icon className="w-5 h-5 text-gold opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>
              <h4 className="text-white text-[9px] uppercase tracking-[0.2em] font-bold mb-3">{item.title}</h4>
              <p className="text-zinc-gray text-[8px] uppercase tracking-widest leading-relaxed opacity-40 group-hover:opacity-60 transition-opacity">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
