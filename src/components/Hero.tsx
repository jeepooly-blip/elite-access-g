import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const SLIDES = [
  {
    title: "Precision meeting performance",
    subtitle: "PADDOCK CLUB™ EXCELLENCE",
    description: "The ultimate F1 experience. Unrivalled views, luxury hospitality and behind-the-scenes access.",
    image: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=2000"
  },
  {
    title: "Tennis at its most prestigious",
    subtitle: "WIMBLEDON VIP ACCESS",
    description: "Experience the pinnacle of grass-court tennis with exclusive hospitality in the heart of SW19.",
    image: "https://images.unsplash.com/photo-1622279457486-62dcc4a4953f?auto=format&fit=crop&q=80&w=2000"
  },
  {
    title: "The pinnacle of private travel",
    subtitle: "ULTRA LONG RANGE AVIATION",
    description: "Bespoke flight solutions for the global elite. Your schedule, your destination, our excellence.",
    image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&q=80&w=2000"
  },
  {
    title: "High Fashion, Higher Stakes",
    subtitle: "EXCLUSIVE ACCESS GALA",
    description: "Front row at the world's most coveted runways and entry to the season's most exclusive social gatherings.",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=2000"
  }
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrent((curr) => (curr + 1) % SLIDES.length);
          return 0;
        }
        return prev + 0.2;
      });
    }, 20);
    return () => clearInterval(timer);
  }, []);

  const next = () => {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
    setProgress(0);
  };
  const prev = () => {
    setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
    setProgress(0);
  };

  return (
    <section className="relative h-screen flex items-center overflow-hidden bg-black">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-black/10 z-10" />
          <motion.img
            initial={{ scale: 1.2, filter: 'blur(15px)' }}
            animate={{ scale: 1, filter: 'blur(0px)' }}
            transition={{
              scale: { duration: 10, ease: "linear" },
              filter: { duration: 2, ease: "easeOut" }
            }}
            src={SLIDES[current].image}
            alt="Hero Background"
            className="w-full h-full object-cover opacity-80"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </AnimatePresence>

      {/* Main content — padded so it never clips behind the sidebar nav */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 md:px-10 w-full mb-12 pr-4 md:pr-52">
        <div className="max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${current}`}
              initial={{ y: 60, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -30, opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            >
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="section-tag font-thin-caps !text-gold/100 !mb-8 block"
              >
                {SLIDES[current].subtitle}
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-5xl md:text-8xl font-serif text-white mb-10 italic leading-[0.9] tracking-tighter"
              >
                {SLIDES[current].title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 0.6, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-zinc-gray font-thin-caps !text-[11px] !tracking-[0.4em] max-w-xl mb-16 leading-relaxed"
              >
                {SLIDES[current].description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 sm:gap-8"
              >
                <button className="btn-gold group min-w-[200px] sm:min-w-[240px]">
                  DISCOVER ACCESS
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="btn-outline min-w-[200px] sm:min-w-[240px]">
                  VIEW PORTFOLIO
                </button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Progress Bar (Bottom) */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5 z-40">
        <motion.div
          initial={false}
          animate={{ width: `${progress}%` }}
          className="h-full bg-gold shadow-[0_0_10px_rgba(198,168,92,0.5)]"
        />
      </div>

      {/* Navigation Controls — fully contained, no overflow */}
      <div className="absolute bottom-12 right-4 md:right-10 z-30 flex items-end gap-4">
        {/* Slide selector labels */}
        <div className="flex flex-col gap-3 items-end">
          {SLIDES.map((slide, i) => (
            <button
              key={i}
              onClick={() => { setCurrent(i); setProgress(0); }}
              className="group flex items-center gap-3 justify-end"
            >
              <span className={`text-[8px] font-thin-caps transition-all duration-500 ${current === i ? 'text-gold' : 'text-white/20'}`}>
                {slide.subtitle.split(' ')[0]}
              </span>
              <div className="relative w-8 h-[1px] bg-white/10 overflow-hidden">
                {current === i && (
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    className="absolute inset-y-0 left-0 bg-gold"
                  />
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Prev / Next buttons */}
        <div className="flex gap-2 mb-1">
          <button
            onClick={prev}
            className="p-3 border border-gold/20 hover:border-gold/50 hover:bg-gold/5 transition-all outline-none"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4 text-gold/60" />
          </button>
          <button
            onClick={next}
            className="p-3 border border-gold/20 hover:border-gold/50 hover:bg-gold/5 transition-all outline-none"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4 text-gold/60" />
          </button>
        </div>
      </div>

      {/* Scroll indicator — desktop only */}
      <div className="absolute left-10 bottom-12 z-30 hidden lg:block">
        <div className="flex flex-col gap-6 items-center">
          <div className="w-[1px] h-24 bg-gradient-to-t from-gold to-transparent" />
          <span className="text-[10px] text-gold uppercase tracking-[0.8em] [writing-mode:vertical-lr] rotate-180 font-bold opacity-60">
            SCROLL EXPLORE
          </span>
        </div>
      </div>
    </section>
  );
}
