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
    <section className="py-32 bg-black-deep px-4 md:px-10 border-t border-white/5">
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
              className="relative p-10 md:p-20 border border-gold/5 bg-black/40 backdrop-blur-sm group"
            >
              <Quote className="absolute top-10 right-10 w-16 h-16 text-gold/5 group-hover:text-gold/10 transition-colors" />

              <div className="flex gap-2 mb-10">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-3 h-3 fill-gold text-gold" />
                ))}
              </div>

              {/* FIX: was text-5xl which made it huge — capped at text-2xl md:text-3xl */}
              <p className="text-xl md:text-3xl font-serif text-white italic leading-[1.4] mb-14 tracking-tight max-w-4xl">
                {t.text}
              </p>

              <div className="flex items-center justify-between flex-wrap gap-6">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-gold/20 to-transparent border border-gold/10 flex items-center justify-center italic font-serif text-xl text-gold shrink-0">
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="text-white font-thin-caps !text-[10px] mb-2">{t.name}</h4>
                    <p className="text-gold font-thin-caps !text-[8px] opacity-60">{t.role}</p>
                  </div>
                </div>
                <div className="bg-gold/5 border border-gold/10 px-5 py-2.5">
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

        {/* FIX: was flex flex-wrap justify-between — causes orphaned items at mid widths.
            Now uses a responsive grid so brands always fill equal columns. */}
        <div className="mt-40 pt-24 border-t border-white/5">
          <p className="text-center font-thin-caps text-white/20 mb-16">PRESTIGE PARTNERSHIPS</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 items-center opacity-20 hover:opacity-100 transition-all duration-1000">
            {['HARRISON CAPITAL', 'MODERN VENTURES', 'ROTHSCHILD & CO', 'STERLING ASSETS', 'AVANT GARDE'].map(brand => (
              <span key={brand} className="text-base font-serif text-white tracking-[0.3em] italic text-center">{brand}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
