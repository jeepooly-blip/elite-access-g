import { useState, useEffect } from 'react';
import { Menu, X, User, Heart, Trash2, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useWishlist } from '../lib/WishlistContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const { wishlist, toggleWishlist, clearWishlist } = useWishlist();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock scroll when wishlist is open
  useEffect(() => {
    if (wishlistOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [wishlistOpen]);

  const navLinks = [
    { name: 'Expertise', href: '#expertise' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Concierge', href: '#concierge' },
    { name: 'Destinations', href: '#destinations' },
  ];

  return (
    <>
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
            
            <div className="flex items-center gap-6">
              {/* Wishlist Trigger */}
              <button 
                onClick={() => setWishlistOpen(true)}
                className="relative text-white hover:text-gold transition-colors group"
              >
                <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'fill-gold text-gold scale-110' : 'group-hover:scale-110'} transition-all`} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gold text-black text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </button>

              <button className="flex items-center gap-3 px-6 py-2.5 border border-gold/30 text-gold font-thin-caps hover:bg-gold/10 transition-all duration-500 group">
                <User className="w-4 h-4 group-hover:scale-110 transition-transform" />
                MEMBER ENTRY
              </button>
            </div>
          </div>

          {/* Mobile Toggle */}
          <div className="lg:hidden flex items-center gap-6">
            <button 
              onClick={() => setWishlistOpen(true)}
              className="relative text-white hover:text-gold transition-colors"
            >
              <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'fill-gold text-gold' : ''}`} />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold text-black text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>
            <button 
              className="text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-black-light border-b border-gold/10 overflow-hidden mt-6"
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

      {/* Wishlist Drawer */}
      <AnimatePresence>
        {wishlistOpen && (
          <div className="fixed inset-0 z-[100] flex justify-end">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setWishlistOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-lg bg-[#0a0a0a] border-l border-white/10 h-full flex flex-col shadow-2xl"
            >
              <div className="p-8 border-b border-white/5 flex items-center justify-between">
                <div>
                  <span className="section-tag !text-gold mb-1 inline-block">MY SELECTION</span>
                  <h2 className="text-3xl font-serif text-white italic">Event Wishlist</h2>
                </div>
                <button 
                  onClick={() => setWishlistOpen(false)}
                  className="p-2 hover:bg-white/5 text-white/40 hover:text-white transition-all rounded-full"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8">
                {wishlist.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center opacity-20 text-center">
                    <Heart className="w-16 h-16 mb-6 font-thin" />
                    <p className="text-xs uppercase tracking-[0.3em] font-light">Your wishlist is empty</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {wishlist.map((event) => (
                      <motion.div 
                        key={event.title}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="group relative flex gap-6 bg-white/5 p-4 border border-white/5 hover:border-gold/30 transition-all duration-500"
                      >
                        <div className="w-24 h-32 shrink-0 overflow-hidden">
                          <img src={event.image} alt={event.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                        </div>
                        <div className="flex-1 flex flex-col justify-between py-1">
                          <div>
                            <span className="text-gold font-thin-caps !text-[7px] mb-2 inline-block">{event.category}</span>
                            <h3 className="text-white font-serif text-lg leading-tight mb-2 italic">{event.title}</h3>
                            <div className="flex items-center gap-3 opacity-40">
                              <span className="text-[8px] tracking-widest uppercase text-white">{event.date}</span>
                              <span className="text-[8px] tracking-widest text-white">•</span>
                              <span className="text-[8px] tracking-widest uppercase text-white">{event.location}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <button className="flex items-center gap-2 text-gold font-thin-caps !text-[8px] group/btn">
                              VIEW DETAILS <ChevronRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
                            </button>
                            <button 
                              onClick={() => toggleWishlist(event)}
                              className="text-white/20 hover:text-red-500 transition-colors p-2"
                              title="Remove from wishlist"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {wishlist.length > 0 && (
                <div className="p-8 border-t border-white/5 space-y-4">
                  <button className="btn-gold w-full py-4 text-[10px]">
                    INQUIRE ABOUT SELECTION
                  </button>
                  <button 
                    onClick={clearWishlist}
                    className="w-full text-white/30 hover:text-white text-[8px] uppercase tracking-widest flex items-center justify-center gap-2 py-2 transition-all"
                  >
                    <Trash2 className="w-3 h-3" /> CLEAR ALL
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
