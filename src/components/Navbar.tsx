import { useState, useEffect } from 'react';
import { Menu, X, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Expertise', href: '#expertise' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Concierge', href: '#concierge' },
    { name: 'Destinations', href: '#destinations' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 px-6 md:px-10 py-6 ${
        scrolled ? 'bg-black/90 backdrop-blur-md py-4' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 bg-gradient-to-br from-gold to-[#8E793E] rounded-sm rotate-45 flex items-center justify-center shadow-lg shadow-gold/10 group-hover:shadow-gold/20 transition-all duration-500">
            <span className="text-black font-bold -rotate-45 text-sm tracking-tighter">V</span>
          </div>
          <span className="text-2xl font-serif tracking-[0.3em] text-white uppercase group-hover:text-gold transition-colors">
            VELOCE
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-12">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="font-thin-caps text-white hover:text-gold transition-colors font-medium"
            >
              {link.name}
            </a>
          ))}
          <div className="h-4 w-px bg-white/20 mx-2" />
          <button className="flex items-center gap-3 px-6 py-2.5 border border-gold/30 text-gold font-thin-caps hover:bg-gold/10 transition-all duration-500 group">
            <User className="w-4 h-4 group-hover:scale-110 transition-transform" />
            MEMBER ENTRY
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-black-light border-b border-gold/10 overflow-hidden"
          >
            <div className="flex flex-col p-10 gap-8">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  className="text-white text-xs uppercase tracking-[0.4em] font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <button className="flex items-center justify-center gap-3 p-4 border border-gold text-gold text-xs uppercase tracking-[0.4em] font-bold">
                MEMBER ENTRY
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
