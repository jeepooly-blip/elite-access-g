import { motion } from 'motion/react';
import { Flag, Ticket, Watch, Utensils, Radio, MapPin } from 'lucide-react';

const services = [
  {
    icon: Flag,
    label: 'Paddock Club Access',
    desc: 'The pinnacle of F1 hospitality. Unrivalled pit-lane views, gourmet catering, and team appearances at every Grand Prix.'
  },
  {
    icon: Ticket,
    label: 'VIP Race Tickets',
    desc: 'Guaranteed allocation to the most coveted seats on the F1 calendar — from Monaco to Abu Dhabi.'
  },
  {
    icon: Watch,
    label: 'Asset Acquisitions',
    desc: 'Sourcing of rare watches, fine art, and limited-edition motorsport memorabilia for discerning collectors.'
  },
  {
    icon: Utensils,
    label: 'Elite Hospitality',
    desc: 'Michelin-starred catering, champagne receptions, and private suite dining at every race weekend.'
  },
  {
    icon: Radio,
    label: 'Behind the Scenes',
    desc: 'Exclusive pit-walk access, team briefings, and garage tours not available to the general public.'
  },
  {
    icon: MapPin,
    label: 'Global Race Calendar',
    desc: 'Concierge presence in Monaco, Abu Dhabi, Silverstone, Monza, Singapore, and beyond.'
  }
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
          <h2 className="section-title mt-4 italic">
            Bespoke <span className="text-gold">Solutions</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              viewport={{ once: true }}
              className="group relative flex flex-col p-8 cursor-default"
            >
              {/*
                Animated gold border:
                Four absolutely-positioned spans — top, right, bottom, left.
                Each starts at width/height 0 and expands to 100% on hover,
                staggered via transition-delay so they draw around the box
                clockwise: top → right → bottom → left.
              */}

              {/* Top edge */}
              <span
                className="pointer-events-none absolute top-0 left-0 h-[1px] w-0 bg-gradient-to-r from-gold/0 via-gold to-gold/0 transition-all duration-500 ease-out group-hover:w-full"
                style={{ transitionDelay: '0ms' }}
              />
              {/* Right edge */}
              <span
                className="pointer-events-none absolute top-0 right-0 w-[1px] h-0 bg-gradient-to-b from-gold/0 via-gold to-gold/0 transition-all duration-500 ease-out group-hover:h-full"
                style={{ transitionDelay: '150ms' }}
              />
              {/* Bottom edge */}
              <span
                className="pointer-events-none absolute bottom-0 right-0 h-[1px] w-0 bg-gradient-to-l from-gold/0 via-gold to-gold/0 transition-all duration-500 ease-out group-hover:w-full"
                style={{ transitionDelay: '300ms' }}
              />
              {/* Left edge */}
              <span
                className="pointer-events-none absolute bottom-0 left-0 w-[1px] h-0 bg-gradient-to-t from-gold/0 via-gold to-gold/0 transition-all duration-500 ease-out group-hover:h-full"
                style={{ transitionDelay: '450ms' }}
              />

              {/* Corner accents — always visible, subtle gold dots at each corner */}
              <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-gold/20 group-hover:border-gold/60 transition-colors duration-300" />
              <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-gold/20 group-hover:border-gold/60 transition-colors duration-300" />
              <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-gold/20 group-hover:border-gold/60 transition-colors duration-300" />
              <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-gold/20 group-hover:border-gold/60 transition-colors duration-300" />

              {/* Icon */}
              <div className="w-12 h-12 rounded-full border border-gold/15 flex items-center justify-center mb-6 group-hover:border-gold/50 group-hover:bg-gold/5 transition-all duration-300">
                <service.icon className="w-5 h-5 text-gold opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Label */}
              <h3 className="text-xl font-serif text-white mb-3 italic tracking-wide group-hover:text-gold/90 transition-colors duration-300">
                {service.label}
              </h3>

              {/* Description */}
              <p className="text-zinc-gray text-[10px] uppercase tracking-[0.2em] leading-relaxed opacity-50 font-light group-hover:opacity-80 transition-opacity duration-300">
                {service.desc}
              </p>

              {/* Subtle glow on the card background on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(198,168,92,0.04) 0%, transparent 70%)' }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
