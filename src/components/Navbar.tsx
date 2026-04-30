import { useState, useEffect } from 'react';
import { Menu, X, User, Heart, Trash2, ChevronRight, LogOut, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useWishlist } from '../lib/WishlistContext';
import { useAuth } from '../lib/AuthContext';
import ProfilePortal from './ProfilePortal';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { wishlist, toggleWishlist, clearWishlist } = useWishlist();
  const { user, signInWithGoogle, logout } = useAuth();

  useEffect(() => {
    const handleTriggerAuth = () => setAuthModalOpen(true);
    window.addEventListener('VELOCE_TRIGGER_AUTH', handleTriggerAuth);
    return () => window.removeEventListener('VELOCE_TRIGGER_AUTH', handleTriggerAuth);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock scroll when any overlay is open
  useEffect(() => {
    const anyOpen = wishlistOpen || mobileMenuOpen;
    document.body.style.overflow = anyOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [wishlistOpen, mobileMenuOpen]);

  const navLinks = [
    { name: 'Expertise', href: '#expertise' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Concierge', href: '#concierge' },
    { name: 'Destinations', href: '#destinations' },
  ];

  return (
    <>
      {/* ── NAV BAR ─────────────────────────────────────────────────────────── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 px-4 md:px-10 ${
          scrolled ? 'bg-black/90 backdrop-blur-md py-4' : 'bg-black/30 backdrop-blur-sm py-6'
        }`}
      >
        {/*
          KEY FIX 1 — use a 3-column grid so the logo is pinned left,
          nav links are centred, and the actions are pinned right.
          This prevents the logo text from ever crashing into the nav links
          regardless of viewport width.
        */}
        <div className="max-w-7xl mx-auto grid grid-cols-[auto_1fr_auto] items-center gap-6">

          {/* Logo — left column */}
          <div className="flex items-center gap-3 group cursor-pointer shrink-0">
            <div className="w-10 h-10 bg-gradient-to-br from-gold to-[#8E793E] rounded-sm rotate-45 flex items-center justify-center shadow-lg shadow-gold/10 group-hover:shadow-gold/20 transition-all duration-500">
              <span className="text-black font-bold -rotate-45 text-sm tracking-tighter">V</span>
            </div>
            <span className="text-2xl font-serif tracking-[0.3em] text-white uppercase group-hover:text-gold transition-colors whitespace-nowrap">
              VELOCE
            </span>
          </div>

          {/* Desktop nav links — centre column */}
          <div className="hidden lg:flex items-center justify-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-thin-caps text-white hover:text-gold transition-colors font-medium whitespace-nowrap"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Empty centre placeholder on mobile so layout still works */}
          <div className="lg:hidden" />

          {/* Right actions — right column */}
          <div className="flex items-center gap-4 lg:gap-6 justify-end">
            {/* Wishlist — desktop only */}
            <button
              type="button"
              onClick={() => user ? setWishlistOpen(true) : setAuthModalOpen(true)}
              className="relative text-white hover:text-gold transition-colors group hidden lg:block"
            >
              <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'fill-gold text-gold scale-110' : 'group-hover:scale-110'} transition-all`} />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold text-black text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Divider — desktop only */}
            <div className="h-4 w-px bg-white/20 hidden lg:block" />

            {/* Member entry / avatar — desktop only */}
            <div className="hidden lg:block">
              {user ? (
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-end">
                    <span className="text-white text-[9px] tracking-widest font-bold uppercase">{user.displayName || 'MEMBER'}</span>
                    <button
                      type="button"
                      onClick={() => setProfileOpen(true)}
                      className="text-gold/60 hover:text-gold text-[7px] tracking-[0.2em] font-bold uppercase transition-colors flex items-center gap-1"
                    >
                      <Settings className="w-2 h-2" /> MEMBER PROFILE
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => setProfileOpen(true)}
                    className="w-9 h-9 rounded-full overflow-hidden border border-gold/30 hover:border-gold transition-colors p-0.5"
                  >
                    <img src={user.photoURL || 'https://via.placeholder.com/150'} alt="Profile" className="w-full h-full object-cover rounded-full" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setAuthModalOpen(true)}
                  className="flex items-center gap-3 px-6 py-2.5 border border-gold/30 text-gold font-thin-caps hover:bg-gold/10 transition-all duration-500 group whitespace-nowrap"
                >
                  <User className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  MEMBER ENTRY
                </button>
              )}
            </div>

            {/* Mobile: wishlist heart */}
            <button
              type="button"
              onClick={() => user ? setWishlistOpen(true) : setAuthModalOpen(true)}
              className="relative text-white hover:text-gold transition-colors lg:hidden"
            >
              <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'fill-gold text-gold' : ''}`} />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold text-black text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/*
              KEY FIX 2 — hamburger button:
              • type="button" prevents any accidental form submit behaviour
              • explicit z-[60] so it always sits above hero motion layers
              • touch-manipulation disables the 300ms tap delay on iOS/Android
              • min-w/h of 44px meets touch target size guidelines (no more missed taps)
              • pointer-events-auto ensures it is never blocked by a parent overlay
            */}
            <button
              type="button"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((o) => !o)}
              className="lg:hidden relative z-[60] flex items-center justify-center w-11 h-11 text-white hover:text-gold transition-colors touch-manipulation pointer-events-auto"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileMenuOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </nav>

      {/* ── MOBILE MENU — rendered as a portal OUTSIDE <nav> ────────────────── */}
      {/*
        KEY FIX 3 — moved the mobile drawer outside the <nav> element entirely.
        When it lived inside <nav> the drawer's backdrop sat at z-[55] which
        occasionally fell below hero motion layers, swallowing touch events
        before they reached the hamburger. Now it's a sibling at root level.
      */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-[55] lg:hidden"
            />

            {/* Drawer */}
            <motion.div
              key="mobile-drawer"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="lg:hidden fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-[#080808] border-r border-gold/10 z-[58] flex flex-col pt-28 pb-12 overflow-hidden"
            >
              {/* Close button inside drawer */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="absolute top-8 right-8 text-white/40 hover:text-gold transition-colors touch-manipulation"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex-1 px-10 space-y-10 overflow-y-auto">
                {/* Mini logo */}
                <div className="flex items-center gap-3 mb-12">
                  <div className="w-8 h-8 bg-gold rounded-sm rotate-45 flex items-center justify-center">
                    <span className="text-black font-bold -rotate-45 text-xs tracking-tighter">V</span>
                  </div>
                  <span className="text-xl font-serif tracking-[0.2em] text-white italic">VELOCE</span>
                </div>

                {/* Nav links */}
                <div className="flex flex-col gap-8">
                  {navLinks.map((link, i) => (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * i, duration: 0.3 }}
                      className="text-white text-xs uppercase tracking-[0.4em] font-bold hover:text-gold transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </motion.a>
                  ))}
                </div>

                {/* Auth section */}
                {user ? (
                  <div className="pt-12 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => { setMobileMenuOpen(false); setProfileOpen(true); }}
                      className="flex items-center gap-5 mb-8 group"
                    >
                      <div className="w-12 h-12 rounded-full overflow-hidden border border-gold/30 p-0.5">
                        <img src={user.photoURL || 'https://via.placeholder.com/150'} alt="Profile" className="w-full h-full object-cover rounded-full" />
                      </div>
                      <div className="text-left">
                        <span className="text-white text-[10px] tracking-widest font-bold uppercase block mb-1">{user.displayName || 'MEMBER'}</span>
                        <span className="text-gold/60 text-[8px] tracking-widest font-bold uppercase transition-colors group-hover:text-gold flex items-center gap-1">
                          VIEW MEMBER PROFILE <ChevronRight className="w-2 h-2" />
                        </span>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => logout()}
                      className="text-white/20 hover:text-red-500 text-[10px] tracking-[0.3em] font-bold uppercase transition-colors flex items-center gap-2"
                    >
                      <LogOut className="w-3 h-3" /> SECURE LOGOUT
                    </button>
                  </div>
                ) : (
                  <div className="pt-12 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => { setMobileMenuOpen(false); setAuthModalOpen(true); }}
                      className="w-full flex items-center justify-between p-6 border border-gold text-gold text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-gold/5 transition-all touch-manipulation"
                    >
                      MEMBER ENTRY <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              <div className="px-10 mt-8 shrink-0">
                <p className="text-[8px] text-white/20 tracking-widest uppercase">
                  © 2024 VELOCE GLOBAL CONCIERGE.<br />ALL RIGHTS RESERVED.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── AUTH MODAL ──────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {authModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setAuthModalOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-[#0a0a0a] border border-white/10 p-12 text-center shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setAuthModalOpen(false)}
                className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="w-16 h-16 bg-gradient-to-br from-gold to-[#8E793E] rounded-sm rotate-45 flex items-center justify-center shadow-lg shadow-gold/20 mx-auto mb-12">
                <span className="text-black font-bold -rotate-45 text-2xl tracking-tighter">V</span>
              </div>
              <span className="section-tag !text-gold mb-4 inline-block">MEMBER ACCESS</span>
              <h2 className="text-3xl font-serif text-white mb-6 italic">Welcome to Veloce</h2>
              <p className="text-white/40 text-[10px] tracking-widest leading-loose uppercase mb-12">
                Experience unparalleled luxury and exclusive access to the world's most prestigious events.
              </p>
              <div className="space-y-4">
                <button
                  type="button"
                  onClick={() => { signInWithGoogle(); setAuthModalOpen(false); }}
                  className="w-full btn-gold py-4 flex items-center justify-center gap-3"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  CONTINUE WITH GOOGLE
                </button>
                <p className="text-[8px] text-white/20 tracking-widest uppercase mt-8">
                  BY CONTINUING, YOU AGREE TO OUR TERMS OF SERVICE AND PRIVACY POLICY.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <ProfilePortal isOpen={profileOpen} onClose={() => setProfileOpen(false)} />

      {/* ── WISHLIST DRAWER ─────────────────────────────────────────────────── */}
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
                  type="button"
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
                            <button type="button" className="flex items-center gap-2 text-gold font-thin-caps !text-[8px] group/btn">
                              VIEW DETAILS <ChevronRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
                            </button>
                            <button
                              type="button"
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
                  <button type="button" className="btn-gold w-full py-4 text-[10px]">
                    INQUIRE ABOUT SELECTION
                  </button>
                  <button
                    type="button"
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
