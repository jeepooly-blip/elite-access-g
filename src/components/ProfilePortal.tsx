import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User, Bell, Map, History, Shield, ChevronRight, Settings, LogOut, CheckCircle2, Loader2 } from 'lucide-react';
import { useAuth } from '../lib/AuthContext';
import { getUserProfile, updateUserProfile, getUserInquiries } from '../lib/firebase';

interface ProfilePortalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfilePortal({ isOpen, onClose }: ProfilePortalProps) {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab ] = useState<'details' | 'preferences' | 'inquiries'>('details');
  const [preferences, setPreferences] = useState({
    priorityAlerts: true,
    globalConcierge: true,
    enhancedSecurity: false
  });
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && user) {
      fetchUserData();
    }
  }, [isOpen, user]);

  const fetchUserData = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const [profileData, inquiriesData] = await Promise.all([
        getUserProfile(user.uid),
        getUserInquiries(user.uid)
      ]);

      if (profileData?.preferences) {
        setPreferences(profileData.preferences);
      }
      if (inquiriesData) {
        setInquiries(inquiriesData);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePreferenceToggle = async (key: keyof typeof preferences) => {
    if (!user) return;
    const newPrefs = { ...preferences, [key]: !preferences[key] };
    setPreferences(newPrefs);
    try {
      await updateUserProfile(user.uid, newPrefs);
    } catch (error) {
      console.error("Error updating preferences:", error);
      // Revert on error
      setPreferences(preferences);
    }
  };

  if (!user) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex justify-end">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
          />
          
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="relative w-full max-w-xl bg-[#080808] border-l border-white/10 h-full flex flex-col shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="relative p-10 pb-6 border-b border-white/5">
              <button 
                onClick={onClose}
                className="absolute top-8 right-8 p-3 hover:bg-white/5 text-white/40 hover:text-gold transition-all rounded-full"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-6 mb-8">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gold/40 p-1">
                    <img 
                      src={user.photoURL || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80'} 
                      alt="Profile" 
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-gold text-black p-1.5 rounded-full shadow-lg">
                    <Shield className="w-3 h-3" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-2xl font-serif text-white tracking-wide italic">{user.displayName || 'Veloce Member'}</h2>
                  </div>
                  <p className="text-[10px] tracking-[0.2em] text-gold/60 font-bold uppercase">Member since {new Date(user.metadata.creationTime || '').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex gap-8 mt-4">
                {[
                  { id: 'details', label: 'ACC DETAILS', icon: User },
                  { id: 'preferences', label: 'PREFERENCES', icon: Settings },
                  { id: 'inquiries', label: 'INQUIRIES', icon: History }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 pb-4 text-[9px] tracking-[0.3em] font-bold transition-all border-b-2 ${
                      activeTab === tab.id ? 'text-gold border-gold' : 'text-white/30 border-transparent hover:text-white/60'
                    }`}
                  >
                    <tab.icon className="w-3 h-3" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Content Content Content */}
            <div className="flex-1 overflow-y-auto p-10 relative">
              {loading && (
                <div className="absolute inset-0 bg-[#080808]/60 backdrop-blur-[2px] z-20 flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    <Loader2 className="w-8 h-8 text-gold opacity-50" />
                  </motion.div>
                </div>
              )}
              {activeTab === 'details' && (
                <motion.div 
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-10"
                >
                  <section>
                    <h3 className="text-[10px] tracking-[0.3em] text-white/40 font-bold uppercase mb-6 flex items-center gap-2">
                      <div className="w-1 h-3 bg-gold" /> CONTACT INFORMATION
                    </h3>
                    <div className="space-y-6">
                      <div className="p-6 bg-white/5 border border-white/5 rounded-sm">
                        <label className="text-[8px] text-gold/50 tracking-widest uppercase block mb-2">Primary Email</label>
                        <p className="text-white text-sm tracking-wide">{user.email}</p>
                      </div>
                      <div className="p-6 bg-white/5 border border-white/5 rounded-sm">
                        <label className="text-[8px] text-gold/50 tracking-widest uppercase block mb-2">Display Name</label>
                        <p className="text-white text-sm tracking-wide">{user.displayName || 'Not Set'}</p>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-[10px] tracking-[0.3em] text-white/40 font-bold uppercase mb-6 flex items-center gap-2">
                      <div className="w-1 h-3 bg-gold" /> MEMBERSHIP STATUS
                    </h3>
                    <div className="p-8 border border-gold/20 bg-gold/[0.02] relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Shield className="w-24 h-24 text-gold rotate-12" />
                      </div>
                      <div className="relative z-10">
                        <div className="flex justify-between items-start mb-6">
                          <div>
                            <p className="text-gold text-xs font-bold tracking-widest mb-1 italic">VELOCE ELITE</p>
                            <p className="text-white/40 text-[9px] tracking-widest uppercase">Global Access Tier</p>
                          </div>
                          <CheckCircle2 className="text-gold w-6 h-6" />
                        </div>
                        <div className="flex gap-4">
                          <button className="text-[9px] tracking-[0.1em] font-bold text-black bg-gold px-4 py-2 hover:bg-gold/90 transition-colors">
                            VIEW PRIVILEGES
                          </button>
                        </div>
                      </div>
                    </div>
                  </section>
                </motion.div>
              )}

              {activeTab === 'preferences' && (
                <motion.div 
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-8"
                >
                  <section>
                    <h3 className="text-[10px] tracking-[0.3em] text-white/40 font-bold uppercase mb-6 flex items-center gap-2">
                       PLATFORM SETTINGS
                    </h3>
                    <div className="space-y-1">
                      {[
                        { key: 'priorityAlerts', title: 'Priority Alerts', desc: 'Real-time notifications for rare event openings', icon: Bell },
                        { key: 'globalConcierge', title: 'Global Concierge', desc: 'Local assistance in over 40 countries', icon: Map },
                        { key: 'enhancedSecurity', title: 'Enhanced Security', desc: 'Multi-factor verification for high-value bookings', icon: Shield }
                      ].map((item) => (
                        <div key={item.title} className="flex items-center justify-between p-6 bg-white/5 border-b border-white/5 last:border-0 hover:bg-white/[0.07] transition-colors group">
                          <div className="flex items-center gap-5">
                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 group-hover:text-gold transition-colors">
                              <item.icon className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="text-white text-xs font-bold tracking-wide mb-1 italic">{item.title}</p>
                              <p className="text-white/40 text-[9px] tracking-widest uppercase">{item.desc}</p>
                            </div>
                          </div>
                          <button 
                            onClick={() => handlePreferenceToggle(item.key as any)}
                            className={`w-12 h-6 rounded-full relative p-1 transition-all duration-500 border ${
                              preferences[item.key as keyof typeof preferences] 
                                ? 'bg-gold border-gold' 
                                : 'bg-white/5 border-white/10'
                            }`}
                          >
                            <motion.div 
                              animate={{ x: preferences[item.key as keyof typeof preferences] ? 24 : 0 }}
                              className={`w-4 h-4 rounded-full shadow-lg ${
                                preferences[item.key as keyof typeof preferences] ? 'bg-black' : 'bg-white/20'
                              }`} 
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </section>
                </motion.div>
              )}

              {activeTab === 'inquiries' && (
                <motion.div 
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  {inquiries.map((inquiry) => (
                    <div key={inquiry.id} className="p-8 bg-white/5 border border-white/5 hover:border-gold/30 transition-all duration-500 group">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <span className="text-gold/40 font-bold text-[8px] tracking-widest uppercase mb-2 block italic">REF: {inquiry.id.slice(-5).toUpperCase()}</span>
                          <h4 className="text-white font-serif text-lg tracking-tight italic">{inquiry.service}</h4>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className={`text-[8px] tracking-widest font-bold px-3 py-1 mb-2 ${
                            inquiry.status === 'CONFIRMED' ? 'bg-green-500/20 text-green-500' : 'bg-gold/20 text-gold'
                          }`}>
                            {inquiry.status || 'PENDING'}
                          </span>
                          <span className="text-[8px] text-white/30 tracking-widest">
                            {inquiry.createdAt?.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                        </div>
                      </div>
                      <button className="flex items-center gap-2 text-gold text-[9px] font-bold tracking-widest group/btn">
                        VIEW PROGRESS <ChevronRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  ))}
                  
                  <div className="p-12 border-2 border-dashed border-white/5 text-center flex flex-col items-center justify-center opacity-40">
                    <History className="w-8 h-8 mb-4 stroke-1" />
                    <p className="text-[10px] tracking-[0.2em] font-bold uppercase">No older inquiries found</p>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Footer */}
            <div className="p-10 border-t border-white/5 bg-[#050505]">
              <button 
                onClick={() => {
                  logout();
                  onClose();
                }}
                className="w-full flex items-center justify-center gap-3 p-4 border border-red-500/30 text-red-500/60 hover:text-red-500 hover:bg-red-500/5 text-[10px] font-bold tracking-[0.4em] transition-all"
              >
                <LogOut className="w-3 h-3" />
                SECURE LOGOUT
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
