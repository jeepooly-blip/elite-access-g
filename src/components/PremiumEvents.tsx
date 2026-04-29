import { useState, useEffect, useMemo } from 'react';
import { Calendar, MapPin, ChevronRight, X, Clock, ShieldCheck, Star, Users, Heart, Search, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useWishlist } from '../lib/WishlistContext';
import { useAuth } from '../lib/AuthContext';
import Fuse from 'fuse.js';

const EVENTS = [
  {
    category: "PADDOCK CLUB™",
    filterCategory: "FORMULA 1",
    title: "Monaco Grand Prix",
    date: "MAY 2024",
    location: "Monte Carlo, Monaco",
    image: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=2000",
    images: [
      "https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=2000",
      "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&q=80&w=2000",
      "https://images.unsplash.com/photo-1603522221770-07e163b2faff?auto=format&fit=crop&q=80&w=2000"
    ],
    featured: true,
    description: "The crown jewel of the F1 calendar. Experience the glamour of Monte Carlo from the most exclusive viewpoint in the world.",
    details: {
      access: "Paddock Club Suite",
      includes: "Gourmet Buffet, Open Bar, Pit Lane Access",
      highlights: [
        "Direct views above the team garages and pit lane",
        "Team appearances and technical briefings",
        "Guided track tours on the high-speed race truck",
        "All-day premium open bar with Ferrari Trento"
      ],
      itinerary: [
        { time: "09:00", event: "Paddock Club Opens - Morning Refreshments" },
        { time: "11:30", event: "Pit Lane Walk & Team Photo Opportunities" },
        { time: "13:00", event: "Gourmet Luncheon with Fine Wines" },
        { time: "15:00", event: "Main Race Start - Direct Viewing" }
      ]
    }
  },
  {
    category: "ROYAL ENCLOSURE",
    filterCategory: "SPORT",
    title: "Royal Ascot",
    date: "JUNE 2024",
    location: "Ascot, UK",
    image: "https://images.unsplash.com/photo-1549413247-920400f074d4?auto=format&fit=crop&q=80&w=2000",
    images: [
      "https://images.unsplash.com/photo-1549413247-920400f074d4?auto=format&fit=crop&q=80&w=2000",
      "https://images.unsplash.com/photo-1595111812061-0b336a18d18e?auto=format&fit=crop&q=80&w=2000",
      "https://images.unsplash.com/photo-1484196148391-f8522ec389bc?auto=format&fit=crop&q=80&w=2000"
    ],
    description: "Step into the inner sanctum of British high society at the world's most famous race meeting.",
    details: {
      access: "Private Box Tier 1",
      includes: "Champagne Reception, 5-Course Lunch, Royal Procession View",
      highlights: [
        "Uninterrupted views of the Royal Procession",
        "Interaction with the finest equine talent",
        "Traditional Afternoon Tea service",
        "Dedicated VIP hostess service"
      ],
      itinerary: [
        { time: "10:30", event: "Arrival & Champagne Reception" },
        { time: "12:30", event: "Royal Procession Viewing" },
        { time: "14:00", event: "First Race - Premium Grandstand Access" },
        { time: "16:30", event: "Afternoon Tea & Prizegiving" }
      ]
    }
  },
  {
    category: "CENTER COURT",
    filterCategory: "SPORT",
    title: "Wimbledon Finals",
    date: "JULY 2024",
    location: "London, UK",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=2000",
    images: [
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=2000",
      "https://images.unsplash.com/photo-1592709823125-a191f07a2a5e?auto=format&fit=crop&q=80&w=2000",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=2000"
    ],
    description: "Witness history in the making on the grass courts of SW19. The ultimate test of skill and elegance.",
    details: {
      access: "Debenture Seats",
      includes: "The Gatsby Club Entry, Personalized Gift, Concierge Service",
      highlights: [
        "Reserved seating on Center Court (Debenture)",
        "Gatsby Club hospitality - minutes from the gates",
        "Champagne breakfast upon arrival",
        "Official Wimbledon programs and cushions"
      ],
      itinerary: [
        { time: "10:00", event: "Gatsby Club Reception - Live Jazz" },
        { time: "11:30", event: "Pre-match 3-Course Luncheon" },
        { time: "13:30", event: "Center Court Seats - Final Begins" },
        { time: "17:00", event: "Traditional Strawberries & Cream Service" }
      ]
    }
  },
  {
    category: "GALA DINNER",
    filterCategory: "CULTURE",
    title: "The Met Gala",
    date: "MAY 2024",
    location: "New York, USA",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=2000",
    images: [
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=2000",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=2000",
      "https://images.unsplash.com/photo-1514525253361-bee8a48790c3?auto=format&fit=crop&q=80&w=2000"
    ],
    description: "Fashion's biggest night. Join the elite for an evening of unparalleled creativity and cultural impact.",
    details: {
      access: "Table Invitation",
      includes: "Red Carpet Entry, Museum Private Tour, Star-studded Dinner",
      highlights: [
        "Upper East Side pre-party access",
        "Global press walk on the iconic steps",
        "Private viewing of the new exhibition",
        "Intimate dinner table with industry leaders"
      ],
      itinerary: [
        { time: "18:00", event: "Red Carpet Arrivals Commence" },
        { time: "19:30", event: "Cocktails & Exhibition Preview" },
        { time: "20:30", event: "The Costume Institute Gala Dinner" },
        { time: "23:00", event: "Official After-Party" }
      ]
    }
  }
];

export default function PremiumEvents() {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { user } = useAuth();

  // Lock scroll when modal is open
  useEffect(() => {
    if (selectedEvent) {
      document.body.style.overflow = 'hidden';
      setCurrentImageIndex(0);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedEvent]);

  const nextImage = () => {
    if (selectedEvent?.images) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedEvent.images.length);
    }
  };

  const prevImage = () => {
    if (selectedEvent?.images) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedEvent.images.length) % selectedEvent.images.length);
    }
  };

  // Setup Fuse.js for fuzzy search
  const fuse = useMemo(() => {
    return new Fuse(EVENTS, {
      keys: [
        { name: 'title', weight: 0.7 },
        { name: 'location', weight: 0.3 },
        { name: 'category', weight: 0.2 },
        { name: 'description', weight: 0.1 }
      ],
      threshold: 0.35, // Adjust this for "fuzziness"
      distance: 100,
      ignoreLocation: true,
      minMatchCharLength: 2
    });
  }, []);

  const filteredEvents = useMemo(() => {
    // Start with either all events or fuzzy matched ones
    let results = searchQuery.length >= 2 
      ? fuse.search(searchQuery).map(result => result.item)
      : EVENTS;

    // Apply category filter on top of search results
    if (activeFilter !== 'ALL') {
      results = results.filter(event => event.filterCategory === activeFilter);
    }
    
    return results;
  }, [fuse, searchQuery, activeFilter]);

  return (
    <section className="py-32 bg-black-deep px-4 md:px-10" id="expertise">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <span className="section-tag">CURATED EXPERIENCES</span>
            <h2 className="section-title">The World's Most <span className="text-gold">Coveted Events</span></h2>
            <p className="text-zinc-gray uppercase tracking-widest text-xs leading-relaxed opacity-60">
              Exclusive access to the pinnacles of sport, culture, and society.
            </p>
          </div>
          <div className="flex flex-col gap-4 w-full md:w-auto">
            {/* Search Bar */}
            <div className="relative w-full group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3 h-3 text-gold opacity-40 group-focus-within:opacity-100 transition-opacity" />
              <input
                type="text"
                placeholder="SEARCH EVENTS OR LOCATIONS"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 px-10 py-3 text-[9px] tracking-[0.2em] text-white focus:outline-none focus:border-gold/30 transition-all font-thin-caps placeholder:text-white/20"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
               {['ALL', 'FORMULA 1', 'SPORT', 'CULTURE'].map((cat) => (
                 <button
                   key={cat}
                   onClick={() => setActiveFilter(cat)}
                   className={`text-[9px] tracking-[0.2em] px-4 py-2.5 border transition-all duration-500 font-thin-caps ${
                     activeFilter === cat
                     ? 'bg-gold text-black border-gold'
                     : 'border-white/10 text-white hover:border-gold/30'
                   }`}
                 >
                   {cat}
                 </button>
               ))}
            </div>
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredEvents.map((event, i) => (
              <motion.div 
                key={event.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="luxury-card group"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                  
                  {/* Top Bar Actions */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                    {event.featured ? (
                      <span className="bg-gold text-black text-[9px] font-bold tracking-[0.2em] px-3 py-1 uppercase">
                        Featured
                      </span>
                    ) : (
                      <div />
                    )}
                    
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        if (user) {
                          toggleWishlist(event);
                        } else {
                          window.dispatchEvent(new CustomEvent('VELOCE_TRIGGER_AUTH'));
                        }
                      }}
                      className="p-2.5 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-white hover:text-gold transition-all duration-300 group/heart"
                    >
                      <Heart 
                        className={`w-4 h-4 transition-all duration-300 ${
                          isInWishlist(event.title) 
                            ? 'fill-gold text-gold scale-110' 
                            : 'group-hover/heart:scale-110'
                        }`} 
                      />
                    </button>
                  </div>
                  
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="text-gold font-thin-caps mb-3 block">
                      {event.category}
                    </span>
                    <h3 className="text-white font-serif text-2xl mb-4 leading-tight italic">
                      {event.title}
                    </h3>
                    
                    <div className="flex items-center gap-4 mb-4 opacity-40">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3 h-3 text-gold" />
                        <span className="text-[8px] tracking-[0.3em] text-white uppercase">{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3 h-3 text-gold" />
                        <span className="text-[8px] tracking-[0.3em] text-white uppercase">{event.location}</span>
                      </div>
                    </div>

                    {event.details && (
                      <div className="mb-6 pt-4 border-t border-white/10">
                        <div className="mb-2">
                          <span className="text-gold font-thin-caps !text-[7px] block mb-1 opacity-60">ACCESS TYPE</span>
                          <span className="text-white text-[9px] tracking-widest uppercase">{event.details.access}</span>
                        </div>
                      </div>
                    )}
                    
                    <button 
                      onClick={() => setSelectedEvent(event)}
                      className="flex items-center gap-2 text-gold font-thin-caps group/btn !text-[8px]"
                    >
                      VIEW PACKAGE 
                      <ChevronRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Event Details Modal */}
        <AnimatePresence>
          {selectedEvent && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12"
            >
              {/* Overlay */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedEvent(null)}
                className="absolute inset-0 bg-black/90 backdrop-blur-xl"
              />

              {/* Modal Content */}
              <motion.div 
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 100, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="relative w-full max-w-6xl bg-[#0a0a0a] border border-white/10 overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
              >
                {/* Close Button */}
                <button 
                  onClick={() => setSelectedEvent(null)}
                  className="absolute top-6 right-6 z-50 p-2 bg-black/40 hover:bg-black/80 text-white/60 hover:text-white transition-colors rounded-full border border-white/5"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Left Side: Image & Hero Info */}
                <div className="w-full md:w-5/12 relative min-h-[400px] md:min-h-0 overflow-hidden group/modal-img">
                  <AnimatePresence mode="wait">
                    <motion.img 
                      key={currentImageIndex}
                      src={selectedEvent.images ? selectedEvent.images[currentImageIndex] : selectedEvent.image} 
                      alt={selectedEvent.title}
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.05 }}
                      transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                      className="absolute inset-0 w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </AnimatePresence>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/40" />
                  
                  {/* Carousel Controls */}
                  {selectedEvent.images && selectedEvent.images.length > 1 && (
                    <>
                      <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 opacity-0 group-hover/modal-img:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <button 
                          onClick={(e) => { e.stopPropagation(); prevImage(); }}
                          className="p-2 border border-white/10 bg-black/40 backdrop-blur-md rounded-full text-white/60 hover:text-white hover:border-gold/40 transition-all pointer-events-auto"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); nextImage(); }}
                          className="p-2 border border-white/10 bg-black/40 backdrop-blur-md rounded-full text-white/60 hover:text-white hover:border-gold/40 transition-all pointer-events-auto"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Pagination Dots */}
                      <div className="absolute bottom-40 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
                        {selectedEvent.images.map((_: any, idx: number) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentImageIndex(idx)}
                            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                              idx === currentImageIndex ? 'bg-gold w-4' : 'bg-white/20 hover:bg-white/40'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                  
                  <div className="absolute bottom-10 left-10 right-10 z-10">
                    <span className="section-tag !text-gold mb-4 inline-block">{selectedEvent.category}</span>
                    <h2 className="text-4xl md:text-5xl font-serif text-white mb-6 italic leading-none truncate">{selectedEvent.title}</h2>
                    <div className="flex flex-wrap gap-6 opacity-60">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gold" />
                        <span className="text-[10px] tracking-[0.2em] text-white uppercase">{selectedEvent.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gold" />
                        <span className="text-[10px] tracking-[0.2em] text-white uppercase">{selectedEvent.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side: Detailed Content */}
                <div className="w-full md:w-7/12 p-8 md:p-12 overflow-y-auto bg-[#0a0a0a]">
                  <div className="mb-12">
                    <h4 className="text-gold font-thin-caps !text-[10px] mb-4 opacity-100">THE EXPERIENCE</h4>
                    <p className="text-white/80 text-lg md:text-xl font-light leading-relaxed">
                      {selectedEvent.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 mb-16">
                    <div>
                      <h4 className="text-gold font-thin-caps !text-[10px] mb-6 flex items-center gap-2">
                        <ShieldCheck className="w-3 h-3" />
                        INCLUSIONS
                      </h4>
                      <ul className="space-y-4">
                        {selectedEvent.details?.highlights?.map((item: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-3 group">
                            <Star className="w-2.5 h-2.5 text-gold mt-1 shrink-0 opacity-40 group-hover:opacity-100 transition-opacity" />
                            <span className="text-white/60 text-[11px] uppercase tracking-widest leading-relaxed">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-gold font-thin-caps !text-[10px] mb-6 flex items-center gap-2">
                        <Clock className="w-3 h-3" />
                        SAMPLE ITINERARY
                      </h4>
                      <div className="space-y-6">
                        {selectedEvent.details?.itinerary?.map((item: any, idx: number) => (
                          <div key={idx} className="flex gap-4">
                            <span className="text-gold font-mono text-[9px] tracking-tighter opacity-100 shrink-0 mt-0.5">
                              {item.time}
                            </span>
                            <span className="text-white/60 text-[11px] uppercase tracking-widest leading-tight">
                              {item.event}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-12 border-t border-white/5 flex flex-col sm:flex-row gap-8 items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10 grayscale">
                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200" alt="Concierge" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <span className="text-white/40 text-[9px] tracking-[0.2em] block uppercase mb-1">DEDICATED CONCIERGE</span>
                        <span className="text-white text-[11px] tracking-widest uppercase">ALEXANDRA VAUGHAN</span>
                      </div>
                    </div>
                    
                    <button className="btn-gold group min-w-[200px] !py-4 shadow-2xl shadow-gold/10">
                      REQUEST ACCESS
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
