import { Calendar, MapPin, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

const EVENTS = [
  {
    category: "PADDOCK CLUB™",
    title: "Monaco Grand Prix",
    date: "MAY 2024",
    location: "Monte Carlo, Monaco",
    image: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=2000",
    featured: true,
    details: {
      access: "Paddock Club Suite",
      includes: "Gourmet Buffet, Open Bar, Pit Lane Access"
    }
  },
  {
    category: "ROYAL ENCLOSURE",
    title: "Royal Ascot",
    date: "JUNE 2024",
    location: "Ascot, UK",
    image: "https://images.unsplash.com/photo-1549413247-920400f074d4?auto=format&fit=crop&q=80&w=2000"
  },
  {
    category: "CENTER COURT",
    title: "Wimbledon Finals",
    date: "JULY 2024",
    location: "London, UK",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=2000"
  },
  {
    category: "GALA DINNER",
    title: "The Met Gala",
    date: "MAY 2024",
    location: "New York, USA",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=2000"
  }
];

export default function PremiumEvents() {
  return (
    <section className="py-32 bg-black-deep px-10" id="expertise">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <span className="section-tag">CURATED EXPERIENCES</span>
            <h2 className="section-title">The World's Most <span className="text-gold">Coveted Events</span></h2>
            <p className="text-zinc-gray uppercase tracking-widest text-xs leading-relaxed opacity-60">
              Exclusive access to the pinnacles of sport, culture, and society.
            </p>
          </div>
          <div className="flex gap-4">
             {['ALL', 'FORMULA 1', 'SPORT', 'CULTURE'].map((cat, i) => (
               <button key={cat} className={`text-[10px] tracking-[0.3em] px-6 py-3 border transition-all duration-500 ${i === 0 ? 'bg-gold text-black border-gold' : 'border-white/10 text-white hover:border-gold/30'}`}>
                 {cat}
               </button>
             ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {EVENTS.map((event, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="luxury-card group"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                
                {event.featured && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-gold text-black text-[9px] font-bold tracking-[0.2em] px-3 py-1 uppercase">
                      Featured
                    </span>
                  </div>
                )}
                
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-gold font-thin-caps mb-3 block">
                    {event.category}
                  </span>
                  <h3 className="text-white font-serif text-2xl mb-4 leading-tight italic">
                    {event.title}
                  </h3>
                  
                  <div className="flex items-center gap-4 mb-4 opacity-40">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3 h-3 text-gold" />
                      <span className="text-[8px] tracking-[0.3em] text-white uppercase">{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3 h-3 text-gold" />
                      <span className="text-[8px] tracking-[0.3em] text-white uppercase">{event.location}</span>
                    </div>
                  </div>

                  {event.details && (
                    <div className="mb-6 pt-4 border-t border-white/10">
                      <div className="mb-2">
                        <span className="text-gold font-thin-caps !text-[7px] block mb-1 opacity-60">ACCESS TYPE</span>
                        <span className="text-white text-[9px] tracking-widest uppercase">{event.details.access}</span>
                      </div>
                      <div>
                        <span className="text-gold font-thin-caps !text-[7px] block mb-1 opacity-60">INCLUDES</span>
                        <span className="text-white text-[9px] tracking-widest uppercase leading-tight block">{event.details.includes}</span>
                      </div>
                    </div>
                  )}
                  
                  <button className="flex items-center gap-2 text-gold font-thin-caps group/btn !text-[8px]">
                    VIEW PACKAGE 
                    <ChevronRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
