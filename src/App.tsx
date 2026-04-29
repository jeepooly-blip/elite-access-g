import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PremiumEvents from './components/PremiumEvents';
import HospitalityPackages from './components/HospitalityPackages';
import LuxuryExperiences from './components/LuxuryExperiences';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import ConciergeForm from './components/ConciergeForm';
import Footer from './components/Footer';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';

import { WishlistProvider } from './lib/WishlistContext';

function App() {
  useEffect(() => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href')!);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });
  }, []);

  return (
    <WishlistProvider>
      <div className="min-h-screen bg-black overflow-x-hidden">
        <Navbar />
        <Hero />
        
        <main>
          <PremiumEvents />
          <HospitalityPackages />
          
          {/* Partners Section */}
          <section className="py-24 bg-black border-y border-white/5">
            <div className="max-w-7xl mx-auto px-10">
              <div className="flex flex-wrap justify-between items-center gap-12 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
                 {['ROLEX', 'GULFSTREAM', 'PADDOCK CLUB', 'NETJETS', 'MAYFAIR'].map(brand => (
                   <span key={brand} className="text-xl font-serif tracking-[0.4em] text-white font-bold">{brand}</span>
                 ))}
              </div>
            </div>
          </section>

          <LuxuryExperiences />

          {/* Global Destinations Grid */}
          <section className="py-32 bg-black-deep px-10 border-t border-gold/10" id="destinations">
            <div className="max-w-7xl mx-auto">
              <div className="flex justify-between items-end mb-20 gap-8">
                <div>
                  <span className="section-tag">GLOBAL REACH</span>
                  <h2 className="section-title">Premier <span className="text-gold italic">Destinations</span></h2>
                </div>
                <button className="flex items-center gap-2 text-gold text-[10px] font-bold tracking-[0.2em] uppercase group">
                  ALL DESTINATIONS <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { name: 'Dubai', desc: 'BURJ AL ARAB', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070&auto=format&fit=crop' },
                  { name: 'Monaco', desc: 'MONTE CARLO', img: 'https://images.unsplash.com/photo-1559586440-6291a1828859?q=80&w=2070&auto=format&fit=crop' },
                  { name: 'Abu Dhabi', desc: 'YAS MARINA', img: 'https://images.unsplash.com/photo-1549411985-797745778844?q=80&w=2070&auto=format&fit=crop' },
                  { name: 'London', desc: 'MAYFAIR', img: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2070&auto=format&fit=crop' }
                ].map((dest, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="relative aspect-[3/4] overflow-hidden group border border-white/5"
                  >
                     <img src={dest.img} alt={dest.name} className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-110 opacity-60 group-hover:opacity-100" />
                     <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                     <div className="absolute bottom-8 left-8 right-8">
                       <h4 className="text-white text-3xl font-serif mb-2 italic">{dest.name}</h4>
                       <p className="text-gold font-thin-caps !text-[7px]">{dest.desc}</p>
                     </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <Services />
          <Testimonials />
          
          <section id="concierge">
            <ConciergeForm />
          </section>
        </main>

        <Footer />
      </div>
    </WishlistProvider>
  );
}

export default App;
