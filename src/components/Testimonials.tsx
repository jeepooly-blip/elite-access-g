import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'James Harrison',
    role: 'CEO, Harrison Capital',
    text: '"VELOCE transformed our Monaco Grand Prix experience into something truly extraordinary. The Paddock Club access and private yacht arrangement exceeded all expectations."',
    event: 'Monaco Grand Prix 2025'
  }
];

export default function Testimonials() {
  return (
    <section className="py-32 bg-black-deep px-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <span className="font-thin-caps text-gold">CLIENT PRIVILEGE</span>
          <h2 className="section-title mt-4 italic">Voices of <span className="text-gold">Excellence</span></h2>
        </div>

        <div className="max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative p-16 md:p-24 border border-gold/5 bg-black/40 backdrop-blur-sm group"
            >
              <Quote className="absolute top-12 right-12 w-24 h-24 text-gold/5 group-hover:text-gold/10 transition-colors" />
              
              <div className="flex gap-2 mb-12">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-gold text-gold" />
                ))}
              </div>

              <p className="text-3xl md:text-5xl font-serif text-white italic leading-[1.2] mb-16 tracking-tight">
                {t.text}
              </p>

              <div className="flex items-center justify-between flex-wrap gap-8">
                <div className="flex items-center gap-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-gold/20 to-transparent border border-gold/10 flex items-center justify-center italic font-serif text-2xl text-gold">
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="text-white font-thin-caps !text-[10px] mb-2">{t.name}</h4>
                    <p className="text-gold font-thin-caps !text-[8px] opacity-60"> {t.role}</p>
                  </div>
                </div>
                <div className="bg-gold/5 border border-gold/10 px-6 py-3">
                  <span className="text-gold font-thin-caps !text-[8px]">{t.event}</span>
                </div>
              </div>
            </motion.div>
          ))}
          
          <div className="flex justify-center gap-4 mt-16">
            {[0, 1, 2].map((_, i) => (
              <button key={i} className={`h-[1px] transition-all duration-700 ${i === 0 ? 'bg-gold w-16' : 'bg-white/10 w-8'}`} />
            ))}
          </div>
        </div>

        <div className="mt-40 pt-24 border-t border-white/5">
          <p className="text-center font-thin-caps text-white/20 mb-16">PRESTIGE PARTNERSHIPS</p>
          <div className="flex flex-wrap justify-between items-center gap-12 opacity-20 grayscale hover:opacity-100 transition-all duration-1000">
            {['HARRISON CAPITAL', 'MODERN VENTURES', 'ROTHSCHILD & CO', 'STERLING ASSETS', 'AVANT GARDE'].map(brand => (
              <span key={brand} className="text-2xl font-serif text-white tracking-[0.4em] italic">{brand}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
