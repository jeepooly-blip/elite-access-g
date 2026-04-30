import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SUPPORTED_LANGUAGES } from '../i18n';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = SUPPORTED_LANGUAGES.find(l => l.code === i18n.language)
    || SUPPORTED_LANGUAGES[0];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const switchLang = (code: string, dir: string) => {
    i18n.changeLanguage(code);
    document.documentElement.dir = dir;
    document.documentElement.lang = code;
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative z-50">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 text-white/60 hover:text-gold transition-colors text-[10px] tracking-widest font-bold uppercase touch-manipulation"
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">{current.flag} {current.label}</span>
        <span className="sm:hidden">{current.flag}</span>
        <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-3 w-44 bg-[#0d0d0d] border border-gold/20 shadow-2xl shadow-black overflow-hidden"
          >
            {SUPPORTED_LANGUAGES.map(lang => (
              <button
                key={lang.code}
                type="button"
                onClick={() => switchLang(lang.code, lang.dir)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-[10px] tracking-widest transition-colors hover:bg-gold/10 ${
                  lang.code === current.code ? 'text-gold bg-gold/5' : 'text-white/60'
                }`}
              >
                <span className="text-base">{lang.flag}</span>
                <span className="font-bold uppercase">{lang.label}</span>
                {lang.code === current.code && (
                  <span className="ml-auto w-1 h-1 rounded-full bg-gold" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
