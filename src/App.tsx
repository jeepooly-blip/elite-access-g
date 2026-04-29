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
import { AuthProvider } from './lib/AuthContext';

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
    <AuthProvider>
      <WishlistProvider>
        <div className="min-h-screen bg-black overflow-x-hidden">
        <Navbar />
        <Hero />
        
        <main>
          <PremiumEvents />
          <HospitalityPackages />
          
          {/* Partners Section */}
          <section className="py-24 bg-black border-y border-white/5">
            <div className="max-w-7xl mx-auto px-4 md:px-10">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 items-center opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
                 {['ROLEX', 'GULFSTREAM', 'PADDOCK CLUB', 'NETJETS', 'MAYFAIR'].map(brand => (
                   <span key={brand} className="text-lg font-serif tracking-[0.4em] text-white font-bold text-center whitespace-nowrap">{brand}</span>
                 ))}
              </div>
            </div>
          </section>

          <LuxuryExperiences />

          {/* Global Destinations Grid */}
          <section className="py-32 bg-black-deep px-4 md:px-10 border-t border-gold/10" id="destinations">
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
                  { name: 'Monaco', desc: 'CIRCUIT DE MONACO', img: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=2070&auto=format&fit=crop' },
                  { name: 'Abu Dhabi', desc: 'YAS MARINA CIRCUIT', img: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=2070&auto=format&fit=crop' },
                  { name: 'Silverstone', desc: 'BRITISH GRAND PRIX', img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop' },
                  { name: 'Singapore', desc: 'MARINA BAY CIRCUIT', img: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=2070&auto=format&fit=crop' }
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
  </AuthProvider>
  );
}

export default App;
