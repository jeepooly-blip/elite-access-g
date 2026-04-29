import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';

const EXPERIENCES = [
  {
    title: "Yacht Experiences",
    subtitle: "AZIMUT 120 GRANDE",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5962?q=80&w=2070&auto=format&fit=crop",
    desc: "Private charters in the Mediterranean with full crew and bespoke catering."
  },
  {
    title: "Private Aviation",
    subtitle: "GULFSTREAM G650ER",
    image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=2074&auto=format&fit=crop",
    desc: "Ultra-long-range travel with no boundaries. Perfect for global exploration."
  },
  {
    title: "VILLA EXPERIENCES",
    subtitle: "COTE D'AZUR",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
    desc: "Exclusive cliffside retreats with panoramic views of the French Riviera."
  }
];

export default function LuxuryExperiences() {
  return (
    <section className="py-32 bg-black px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <span className="section-tag">ELITE ASSETS</span>
          <h2 className="section-title">Beyond <span className="text-gold">Events</span></h2>
          <p className="text-zinc-gray uppercase tracking-widest text-[10px] max-w-xl mx-auto leading-relaxed mt-6 opacity-60">
            Access to our private inventory of luxury assets, from ultra-long-range aviation to bespoke maritime charters.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {EXPERIENCES.map((exp, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              className="group relative h-[600px] overflow-hidden"
            >
              <img 
                src={exp.image} 
                alt={exp.title} 
                className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:scale-110 group-hover:grayscale-0 opacity-40 group-hover:opacity-70"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black z-10" />
              
              <div className="absolute inset-x-0 bottom-0 p-10 z-20 transition-transform duration-500 transform group-hover:-translate-y-4">
                <span className="text-gold font-thin-caps mb-4 block">
                  {exp.subtitle}
                </span>
                <h3 className="text-white font-serif text-4xl mb-6 italic">
                  {exp.title}
                </h3>
                <p className="text-zinc-gray font-thin-caps !tracking-[0.2em] mb-8 opacity-0 group-hover:opacity-60 transition-opacity duration-700">
                  {exp.desc}
                </p>
                <div className="w-12 h-[1px] bg-gold/30 group-hover:w-full transition-all duration-700 mb-8" />
                <button className="flex items-center gap-3 text-gold font-thin-caps group transition-all">
                  EXPLORE <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
