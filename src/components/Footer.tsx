import { Crown, Instagram, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
      <footer className="bg-black-deep border-t border-gold/10 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-gradient-to-br from-gold to-[#8E793E] rounded-sm rotate-45 flex items-center justify-center shadow-lg shadow-gold/10">
                <span className="text-black font-bold -rotate-45 text-sm tracking-tighter">V</span>
              </div>
              <span className="text-2xl font-serif tracking-[0.2em] text-gold uppercase">VELOCE</span>
            </div>
            <p className="text-zinc-gray text-xs leading-relaxed uppercase tracking-widest opacity-60">
              The world's premier portal for exclusive access, asset acquisition, and bespoke luxury experiences.
            </p>
            <div className="flex gap-6 mt-10">
              <Instagram className="w-5 h-5 text-gold/60 hover:text-gold cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 text-gold/60 hover:text-gold cursor-pointer transition-colors" />
              <Linkedin className="w-5 h-5 text-gold/60 hover:text-gold cursor-pointer transition-colors" />
            </div>
          </div>

          <div>
            <h4 className="text-white font-thin-caps mb-8">Navigation</h4>
            <ul className="space-y-4">
              {['Home', 'Expertise', 'Portfolio', 'Concierge', 'Member Entry'].map(item => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="text-[10px] text-zinc-gray font-thin-caps !tracking-[0.2em] hover:text-gold transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-thin-caps mb-8">Expertise</h4>
            <ul className="space-y-4">
              {['F1 Paddock Club', 'Private Aviation', 'Wimbledon VIP', 'Asset Sourcing', 'Gala Access'].map(item => (
                <li key={item}>
                  <a href="#" className="text-[10px] text-zinc-gray font-thin-caps !tracking-[0.2em] hover:text-gold transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-thin-caps mb-8">Intelligence</h4>
            <p className="text-zinc-gray font-thin-caps !tracking-[0.2em] mb-6 leading-relaxed">Subscribe to our private briefings for exclusive event releases.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="w-full bg-black border-b border-gold/20 py-3 text-[10px] tracking-widest text-white outline-none focus:border-gold transition-colors font-thin-caps !tracking-[0.1em]"
              />
              <button className="absolute right-0 bottom-3 text-gold font-thin-caps">JOIN</button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:row items-center justify-between">
          <span className="text-[9px] text-[#444] uppercase tracking-[0.3em]">
            © MMXXIV VELOCE CONCIERGE. ALL RIGHTS RESERVED. <span className="mx-4">|</span> PRIVACY POLICY <span className="mx-4">|</span> TERMS OF SERVICE
          </span>
          <div className="flex gap-8 mt-6 md:mt-0">
            <span className="text-[9px] text-[#444] uppercase tracking-[0.3em]">ENCRYPTED GATEWAY V4.2.1</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
