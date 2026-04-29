import { motion } from 'motion/react';
import { Plane, Calendar, Shield, Utensils, Music, MapPin } from 'lucide-react';

const services = [
  { icon: Plane, label: 'Private Aviation', desc: 'Charters and luxury transport to the world\'s most exclusive destinations.' },
  { icon: Calendar, label: 'VIP Event Access', desc: 'F1 Paddock Club, Wimbledon debentures, and front-row gala seats.' },
  { icon: Shield, label: 'Asset Acquisitions', desc: 'Sourcing of rare watches, fine art, and limited edition properties.' },
  { icon: Utensils, label: 'Elite Dining', desc: 'Priority reservations at Michelin-starred venues and private clubs.' },
  { icon: Music, label: 'Exclusive Showings', desc: 'Backstage access and private gallery viewings for our members.' },
  { icon: MapPin, label: 'Global Experience', desc: 'Local lifestyle consultants in London, Dubai, Monaco, and New York.' }
];

export default function Services() {
  return (
    <section id="services" className="py-32 bg-black-deep px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="font-thin-caps text-gold"
          >
            OUR EXPERTISE
          </motion.span>
          <h2 className="section-title mt-4 italic">Bespoke <span className="text-gold">Solutions</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="w-14 h-14 rounded-full border border-gold/10 flex items-center justify-center mb-8 group-hover:border-gold/40 transition-colors">
                <service.icon className="w-6 h-6 text-gold opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="text-xl font-serif text-white mb-4 italic tracking-wide">{service.label}</h3>
              <p className="text-zinc-gray text-[10px] uppercase tracking-[0.2em] leading-relaxed opacity-60 font-light group-hover:opacity-100 transition-opacity">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
