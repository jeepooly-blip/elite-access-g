import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';

const EXPERIENCES = [
  {
    title: "Paddock Club Suite",
    subtitle: "FORMULA 1 HOSPITALITY",
    // F1 paddock/pit lane hospitality suite
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2070&auto=format&fit=crop",
    desc: "The most coveted vantage point in motorsport. Direct views over the pit lane with world-class hospitality."
  },
  {
    title: "Race Weekend Travel",
    subtitle: "PRIVATE AVIATION",
    // Private jet interior
    image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=2074&auto=format&fit=crop",
    desc: "Door-to-door service from your home to the grid. Private jets, helicopter transfers, and luxury ground transport."
  },
  {
    title: "Monaco Grand Prix",
    subtitle: "CIRCUIT DE MONACO",
    // Monaco harbour / F1 race atmosphere
    image: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=2070&auto=format&fit=crop",
    desc: "The crown jewel of the F1 calendar. Private terrace suites overlooking the legendary street circuit."
  }
];

export default function LuxuryExperiences() {
  return (
    <section className="py-32 bg-black px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <span className="section-tag">ELITE ASSETS</span>
          <h2 className="section-title">Beyond <span className="text-gold">the Race</span></h2>
          <p className="text-zinc-gray uppercase tracking-widest text-[10px] max-w-xl mx-auto leading-relaxed mt-6 opacity-60">
            A complete Grand Prix experience — from private jets and yacht berths to paddock suites and after-race dinners.
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
                <span className="text-gold font-thin-caps mb-4 block">{exp.subtitle}</span>
                <h3 className="text-white font-serif text-4xl mb-6 italic">{exp.title}</h3>
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
