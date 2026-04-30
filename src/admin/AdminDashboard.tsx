import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  LayoutDashboard, CalendarDays, Ticket, Users, MessageSquare,
  TrendingUp, Plus, Pencil, Trash2, X, ChevronRight, Eye,
  CheckCircle, Clock, XCircle, Download, Search, Filter,
  Globe, BarChart3, Settings, LogOut, Bell, Star, Flag,
  MapPin, DollarSign, Send, RefreshCw, Shield
} from 'lucide-react';
import { db, auth } from '../lib/firebase';
import {
  collection, addDoc, getDocs, updateDoc, deleteDoc,
  doc, serverTimestamp, query, orderBy, onSnapshot
} from 'firebase/firestore';

// ── Types ─────────────────────────────────────────────────────────────────────
interface Event {
  id?: string;
  title: string;
  subtitle: string;
  category: string;
  date: string;
  location: string;
  description: string;
  access: string;
  includes: string;
  image: string;
  featured: boolean;
  status: 'active' | 'draft' | 'archived';
  f1Link: string; // Official F1 ticket purchase link
  createdAt?: any;
}

interface Lead {
  id?: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  status: 'PENDING' | 'CONTACTED' | 'QUALIFIED' | 'CLOSED';
  createdAt?: any;
  eventInterest?: string;
}

const ADMIN_PASSWORD = 'veloce2025admin';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard',    icon: LayoutDashboard },
  { id: 'events',    label: 'Events',       icon: CalendarDays },
  { id: 'tickets',   label: 'Ticket Links', icon: Ticket },
  { id: 'leads',     label: 'Sales Leads',  icon: MessageSquare },
  { id: 'users',     label: 'Members',      icon: Users },
  { id: 'analytics', label: 'Analytics',    icon: BarChart3 },
  { id: 'settings',  label: 'Settings',     icon: Settings },
];

const STATUS_COLORS: Record<string, string> = {
  active:    'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  draft:     'text-amber-400 bg-amber-400/10 border-amber-400/20',
  archived:  'text-zinc-400 bg-zinc-400/10 border-zinc-400/20',
  PENDING:   'text-amber-400 bg-amber-400/10 border-amber-400/20',
  CONTACTED: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  QUALIFIED: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  CLOSED:    'text-zinc-400 bg-zinc-400/10 border-zinc-400/20',
};

const EMPTY_EVENT: Event = {
  title: '', subtitle: '', category: 'PADDOCK CLUB™', date: '', location: '',
  description: '', access: '', includes: '', image: '', featured: false,
  status: 'draft', f1Link: 'https://www.formula1.com/en/racing/'
};

// ── Login Screen ──────────────────────────────────────────────────────────────
function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [pw, setPw] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    if (pw === ADMIN_PASSWORD) { onLogin(); }
    else { setError('Invalid credentials. Access denied.'); }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-br from-gold to-[#8E793E] rotate-45 flex items-center justify-center mx-auto mb-8 shadow-lg shadow-gold/20">
            <Shield className="w-8 h-8 text-black -rotate-45" />
          </div>
          <h1 className="text-3xl font-serif text-white italic mb-2">VELOCE Admin</h1>
          <p className="text-white/30 text-[10px] tracking-[0.4em] uppercase">Super Admin Dashboard</p>
        </div>

        <form onSubmit={handle} className="space-y-4">
          <div>
            <label className="text-[10px] tracking-widest text-white/40 uppercase block mb-2">Admin Password</label>
            <input
              type="password"
              value={pw}
              onChange={e => { setPw(e.target.value); setError(''); }}
              className="w-full bg-white/5 border border-white/10 px-5 py-4 text-white text-sm focus:outline-none focus:border-gold/40 transition-colors"
              placeholder="Enter admin password"
              autoComplete="current-password"
            />
          </div>
          {error && (
            <p className="text-red-400 text-[10px] tracking-widest uppercase flex items-center gap-2">
              <XCircle className="w-3 h-3" /> {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold text-black py-4 text-[11px] tracking-[0.3em] font-bold uppercase hover:bg-gold/90 transition-colors disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Enter Dashboard'}
          </button>
        </form>

        <p className="text-center text-white/20 text-[9px] tracking-widest uppercase mt-8">
          Veloce Global — Restricted Access
        </p>
      </motion.div>
    </div>
  );
}

// ── Stat Card ─────────────────────────────────────────────────────────────────
function StatCard({ label, value, icon: Icon, color, delta }: any) {
  return (
    <div className="bg-[#0a0a0a] border border-white/5 p-6 group hover:border-gold/20 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-sm flex items-center justify-center ${color}`}>
          <Icon className="w-5 h-5" />
        </div>
        {delta && (
          <span className="text-emerald-400 text-[9px] tracking-widest font-bold uppercase">
            ↑ {delta}
          </span>
        )}
      </div>
      <p className="text-3xl font-serif text-white mb-1">{value}</p>
      <p className="text-[9px] tracking-[0.3em] text-white/30 uppercase">{label}</p>
    </div>
  );
}

// ── Modal wrapper ─────────────────────────────────────────────────────────────
function Modal({ open, onClose, title, children }: any) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between p-6 border-b border-white/5 sticky top-0 bg-[#0a0a0a] z-10">
          <h3 className="text-white font-serif italic text-xl">{title}</h3>
          <button type="button" onClick={onClose} className="text-white/30 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </motion.div>
    </div>
  );
}

// ── Field ─────────────────────────────────────────────────────────────────────
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-[9px] tracking-[0.3em] text-white/40 uppercase block mb-2">{label}</label>
      {children}
    </div>
  );
}

const inputCls = "w-full bg-white/5 border border-white/10 px-4 py-3 text-white text-sm focus:outline-none focus:border-gold/40 transition-colors";
const selectCls = "w-full bg-[#111] border border-white/10 px-4 py-3 text-white text-sm focus:outline-none focus:border-gold/40 transition-colors";

// ── Events Panel ──────────────────────────────────────────────────────────────
function EventsPanel() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<'add' | 'edit' | null>(null);
  const [editing, setEditing] = useState<Event>(EMPTY_EVENT);
  const [search, setSearch] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'events'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, snap => {
      setEvents(snap.docs.map(d => ({ id: d.id, ...d.data() } as Event)));
      setLoading(false);
    }, () => {
      // Firestore might not have collection yet; start empty
      setEvents([]);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const save = async () => {
    setSaving(true);
    try {
      if (editing.id) {
        const { id, ...data } = editing;
        await updateDoc(doc(db, 'events', id!), { ...data, updatedAt: serverTimestamp() });
      } else {
        await addDoc(collection(db, 'events'), { ...editing, createdAt: serverTimestamp() });
      }
      setModal(null);
      setEditing(EMPTY_EVENT);
    } catch (e) { console.error(e); }
    setSaving(false);
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this event?')) return;
    await deleteDoc(doc(db, 'events', id));
  };

  const filtered = events.filter(e =>
    e.title.toLowerCase().includes(search.toLowerCase()) ||
    e.location.toLowerCase().includes(search.toLowerCase())
  );

  const F = (key: keyof Event, val: any) => setEditing(p => ({ ...p, [key]: val }));

  return (
    <div>
      <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
        <div>
          <h2 className="text-2xl font-serif text-white italic">Grand Prix Events</h2>
          <p className="text-white/30 text-[10px] tracking-widest uppercase mt-1">Manage events displayed on the site</p>
        </div>
        <button
          type="button"
          onClick={() => { setEditing(EMPTY_EVENT); setModal('add'); }}
          className="flex items-center gap-2 bg-gold text-black px-5 py-3 text-[10px] tracking-widest font-bold uppercase hover:bg-gold/90 transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Event
        </button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className={`${inputCls} pl-12`}
        />
      </div>

      {loading ? (
        <div className="text-center py-20 text-white/20">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-3" />
          <p className="text-[10px] tracking-widest uppercase">Loading events...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-white/10">
          <CalendarDays className="w-10 h-10 text-white/10 mx-auto mb-4" />
          <p className="text-white/20 text-[10px] tracking-widest uppercase">No events yet. Add your first Grand Prix.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(ev => (
            <div key={ev.id} className="flex items-center gap-4 bg-[#0a0a0a] border border-white/5 p-4 hover:border-gold/20 transition-colors group">
              {ev.image && (
                <img src={ev.image} alt={ev.title} className="w-16 h-12 object-cover opacity-60 group-hover:opacity-100 transition-opacity shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h4 className="text-white font-serif italic">{ev.title}</h4>
                  {ev.featured && <Star className="w-3 h-3 text-gold fill-gold" />}
                </div>
                <div className="flex items-center gap-4 text-[9px] text-white/30 tracking-widest uppercase">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{ev.location}</span>
                  <span className="flex items-center gap-1"><CalendarDays className="w-3 h-3" />{ev.date}</span>
                </div>
              </div>
              <span className={`text-[8px] tracking-widest px-3 py-1.5 border font-bold uppercase ${STATUS_COLORS[ev.status]}`}>
                {ev.status}
              </span>
              <div className="flex gap-2 shrink-0">
                {ev.f1Link && (
                  <a href={ev.f1Link} target="_blank" rel="noopener noreferrer"
                    className="p-2 text-white/20 hover:text-gold transition-colors" title="View F1 Link">
                    <Globe className="w-4 h-4" />
                  </a>
                )}
                <button type="button" onClick={() => { setEditing(ev); setModal('edit'); }}
                  className="p-2 text-white/20 hover:text-gold transition-colors">
                  <Pencil className="w-4 h-4" />
                </button>
                <button type="button" onClick={() => remove(ev.id!)}
                  className="p-2 text-white/20 hover:text-red-400 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {modal && (
          <Modal open={!!modal} onClose={() => setModal(null)} title={modal === 'add' ? 'Add New Event' : 'Edit Event'}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Event Title">
                <input className={inputCls} value={editing.title} onChange={e => F('title', e.target.value)} placeholder="Monaco Grand Prix" />
              </Field>
              <Field label="Subtitle / Category Label">
                <input className={inputCls} value={editing.subtitle} onChange={e => F('subtitle', e.target.value)} placeholder="PADDOCK CLUB™" />
              </Field>
              <Field label="Date">
                <input className={inputCls} value={editing.date} onChange={e => F('date', e.target.value)} placeholder="MAY 2025" />
              </Field>
              <Field label="Location">
                <input className={inputCls} value={editing.location} onChange={e => F('location', e.target.value)} placeholder="Monte Carlo, Monaco" />
              </Field>
              <Field label="Category">
                <select className={selectCls} value={editing.category} onChange={e => F('category', e.target.value)}>
                  {['PADDOCK CLUB™', 'MARINA BAY SUITE', 'GRANDSTAND SUITE', 'FORMULA 1', 'NIGHT RACE'].map(c => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </Field>
              <Field label="Status">
                <select className={selectCls} value={editing.status} onChange={e => F('status', e.target.value as any)}>
                  <option value="draft">Draft</option>
                  <option value="active">Active</option>
                  <option value="archived">Archived</option>
                </select>
              </Field>
              <Field label="Access Type">
                <input className={inputCls} value={editing.access} onChange={e => F('access', e.target.value)} placeholder="Paddock Club Suite" />
              </Field>
              <Field label="Includes (comma-separated)">
                <input className={inputCls} value={editing.includes} onChange={e => F('includes', e.target.value)} placeholder="Pit Lane Walk, Gourmet Lunch, Open Bar" />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Description">
                  <textarea className={`${inputCls} h-24 resize-none`} value={editing.description} onChange={e => F('description', e.target.value)} placeholder="Event description..." />
                </Field>
              </div>
              <div className="sm:col-span-2">
                <Field label="Image URL (Unsplash or CDN)">
                  <input className={inputCls} value={editing.image} onChange={e => F('image', e.target.value)} placeholder="https://images.unsplash.com/photo-..." />
                </Field>
              </div>
              <div className="sm:col-span-2">
                <Field label="Official F1 Ticket Link (leads sent here)">
                  <div className="flex gap-2">
                    <input className={`${inputCls} flex-1`} value={editing.f1Link} onChange={e => F('f1Link', e.target.value)} placeholder="https://www.formula1.com/en/racing/2025/monaco" />
                    {editing.f1Link && (
                      <a href={editing.f1Link} target="_blank" rel="noopener noreferrer"
                        className="px-4 border border-gold/30 text-gold text-[9px] tracking-widest hover:bg-gold/10 transition-colors flex items-center gap-1">
                        <Eye className="w-3 h-3" /> Test
                      </a>
                    )}
                  </div>
                  <p className="text-[8px] text-white/20 tracking-widest uppercase mt-2">
                    ⓘ Enquiry leads will be directed to this official F1 URL for ticket purchase
                  </p>
                </Field>
              </div>
              <div className="sm:col-span-2 flex items-center gap-3">
                <input type="checkbox" id="featured" checked={editing.featured} onChange={e => F('featured', e.target.checked)}
                  className="w-4 h-4 accent-gold" />
                <label htmlFor="featured" className="text-[10px] tracking-widest text-white/60 uppercase cursor-pointer">Mark as Featured Event</label>
              </div>
            </div>

            <div className="flex gap-3 mt-8 pt-6 border-t border-white/5">
              <button type="button" onClick={save} disabled={saving}
                className="flex-1 bg-gold text-black py-3 text-[10px] tracking-widest font-bold uppercase hover:bg-gold/90 transition-colors disabled:opacity-50">
                {saving ? 'Saving...' : modal === 'add' ? 'Create Event' : 'Update Event'}
              </button>
              <button type="button" onClick={() => setModal(null)}
                className="px-6 border border-white/10 text-white/40 text-[10px] tracking-widest uppercase hover:border-white/30 transition-colors">
                Cancel
              </button>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Leads Panel ───────────────────────────────────────────────────────────────
function LeadsPanel() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Lead | null>(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<string>('ALL');

  useEffect(() => {
    const q = query(collection(db, 'requests'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, snap => {
      setLeads(snap.docs.map(d => ({ id: d.id, ...d.data() } as Lead)));
      setLoading(false);
    }, () => { setLeads([]); setLoading(false); });
    return () => unsub();
  }, []);

  const updateStatus = async (id: string, status: Lead['status']) => {
    await updateDoc(doc(db, 'requests', id), { status });
    if (selected?.id === id) setSelected(p => p ? { ...p, status } : p);
  };

  const filtered = leads.filter(l => {
    const matchSearch = l.name?.toLowerCase().includes(search.toLowerCase()) ||
      l.email?.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'ALL' || l.status === filter;
    return matchSearch && matchFilter;
  });

  const exportCSV = () => {
    const rows = [['Name', 'Email', 'Phone', 'Service', 'Status', 'Message', 'Date']];
    leads.forEach(l => rows.push([l.name, l.email, l.phone || '', l.service || '', l.status, l.message || '', l.createdAt?.toDate?.()?.toLocaleDateString() || '']));
    const csv = rows.map(r => r.map(c => `"${c}"`).join(',')).join('\n');
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([csv]));
    a.download = 'veloce-leads.csv'; a.click();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
        <div>
          <h2 className="text-2xl font-serif text-white italic">Sales Leads</h2>
          <p className="text-white/30 text-[10px] tracking-widest uppercase mt-1">{leads.length} total enquiries received</p>
        </div>
        <button type="button" onClick={exportCSV}
          className="flex items-center gap-2 border border-gold/30 text-gold px-5 py-3 text-[10px] tracking-widest font-bold uppercase hover:bg-gold/10 transition-colors">
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      <div className="flex gap-3 mb-6 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
          <input type="text" placeholder="Search leads..." value={search}
            onChange={e => setSearch(e.target.value)} className={`${inputCls} pl-12`} />
        </div>
        {['ALL', 'PENDING', 'CONTACTED', 'QUALIFIED', 'CLOSED'].map(s => (
          <button key={s} type="button" onClick={() => setFilter(s)}
            className={`px-4 py-2 text-[9px] tracking-widest font-bold uppercase border transition-colors ${filter === s ? 'bg-gold text-black border-gold' : 'border-white/10 text-white/40 hover:border-gold/30'}`}>
            {s}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-20 text-white/20">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-3" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-white/10">
          <MessageSquare className="w-10 h-10 text-white/10 mx-auto mb-4" />
          <p className="text-white/20 text-[10px] tracking-widest uppercase">No leads match your filters.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map(lead => (
            <div key={lead.id} onClick={() => setSelected(lead)}
              className="flex items-center gap-4 bg-[#0a0a0a] border border-white/5 p-4 hover:border-gold/20 transition-colors cursor-pointer group">
              <div className="w-10 h-10 bg-gold/10 border border-gold/10 flex items-center justify-center font-serif text-gold italic shrink-0">
                {lead.name?.[0]?.toUpperCase() || '?'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">{lead.name}</p>
                <p className="text-white/30 text-[9px] tracking-widest truncate">{lead.email}</p>
              </div>
              <div className="hidden sm:block text-white/30 text-[9px] tracking-widest uppercase">{lead.service}</div>
              <span className={`text-[8px] tracking-widest px-3 py-1.5 border font-bold uppercase shrink-0 ${STATUS_COLORS[lead.status]}`}>
                {lead.status}
              </span>
              <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-gold transition-colors shrink-0" />
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {selected && (
          <Modal open={!!selected} onClose={() => setSelected(null)} title="Lead Details">
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                {[
                  ['Name', selected.name], ['Email', selected.email],
                  ['Phone', selected.phone || '—'], ['Service', selected.service || '—'],
                ].map(([l, v]) => (
                  <div key={l}>
                    <p className="text-[9px] tracking-widest text-white/30 uppercase mb-1">{l}</p>
                    <p className="text-white text-sm">{v}</p>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-[9px] tracking-widest text-white/30 uppercase mb-2">Message</p>
                <p className="text-white/70 text-sm leading-relaxed bg-white/5 p-4">{selected.message || '—'}</p>
              </div>
              <div>
                <p className="text-[9px] tracking-widest text-white/30 uppercase mb-3">Update Status</p>
                <div className="flex gap-2 flex-wrap">
                  {(['PENDING', 'CONTACTED', 'QUALIFIED', 'CLOSED'] as Lead['status'][]).map(s => (
                    <button key={s} type="button" onClick={() => updateStatus(selected.id!, s)}
                      className={`px-4 py-2 text-[9px] tracking-widest font-bold uppercase border transition-colors ${selected.status === s ? 'bg-gold text-black border-gold' : 'border-white/10 text-white/40 hover:border-gold/30'}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <a href={`mailto:${selected.email}`}
                className="flex items-center justify-center gap-2 w-full bg-gold text-black py-3 text-[10px] tracking-widest font-bold uppercase hover:bg-gold/90 transition-colors">
                <Send className="w-4 h-4" /> Reply via Email
              </a>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Tickets Panel ─────────────────────────────────────────────────────────────
function TicketsPanel() {
  const GP_RACES = [
    { race: 'Bahrain Grand Prix',    date: 'March 2025',    link: 'https://www.formula1.com/en/racing/2025/bahrain' },
    { race: 'Saudi Arabian Grand Prix', date: 'March 2025', link: 'https://www.formula1.com/en/racing/2025/saudi-arabia' },
    { race: 'Australian Grand Prix', date: 'April 2025',    link: 'https://www.formula1.com/en/racing/2025/australia' },
    { race: 'Japanese Grand Prix',   date: 'April 2025',    link: 'https://www.formula1.com/en/racing/2025/japan' },
    { race: 'Chinese Grand Prix',    date: 'April 2025',    link: 'https://www.formula1.com/en/racing/2025/china' },
    { race: 'Miami Grand Prix',      date: 'May 2025',      link: 'https://www.formula1.com/en/racing/2025/miami' },
    { race: 'Monaco Grand Prix',     date: 'May 2025',      link: 'https://www.formula1.com/en/racing/2025/monaco' },
    { race: 'Canadian Grand Prix',   date: 'June 2025',     link: 'https://www.formula1.com/en/racing/2025/canada' },
    { race: 'Spanish Grand Prix',    date: 'June 2025',     link: 'https://www.formula1.com/en/racing/2025/spain' },
    { race: 'Austrian Grand Prix',   date: 'June 2025',     link: 'https://www.formula1.com/en/racing/2025/austria' },
    { race: 'British Grand Prix',    date: 'July 2025',     link: 'https://www.formula1.com/en/racing/2025/great-britain' },
    { race: 'Belgian Grand Prix',    date: 'July 2025',     link: 'https://www.formula1.com/en/racing/2025/belgium' },
    { race: 'Hungarian Grand Prix',  date: 'August 2025',   link: 'https://www.formula1.com/en/racing/2025/hungary' },
    { race: 'Dutch Grand Prix',      date: 'August 2025',   link: 'https://www.formula1.com/en/racing/2025/netherlands' },
    { race: 'Italian Grand Prix',    date: 'September 2025',link: 'https://www.formula1.com/en/racing/2025/italy' },
    { race: 'Singapore Grand Prix',  date: 'September 2025',link: 'https://www.formula1.com/en/racing/2025/singapore' },
    { race: 'United States Grand Prix', date: 'October 2025', link: 'https://www.formula1.com/en/racing/2025/united-states' },
    { race: 'Mexico City Grand Prix', date: 'October 2025', link: 'https://www.formula1.com/en/racing/2025/mexico' },
    { race: 'São Paulo Grand Prix',  date: 'November 2025', link: 'https://www.formula1.com/en/racing/2025/brazil' },
    { race: 'Las Vegas Grand Prix',  date: 'November 2025', link: 'https://www.formula1.com/en/racing/2025/las-vegas' },
    { race: 'Qatar Grand Prix',      date: 'November 2025', link: 'https://www.formula1.com/en/racing/2025/qatar' },
    { race: 'Abu Dhabi Grand Prix',  date: 'December 2025', link: 'https://www.formula1.com/en/racing/2025/abu-dhabi' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-serif text-white italic">Official F1 Ticket Links</h2>
        <p className="text-white/30 text-[10px] tracking-widest uppercase mt-1">
          All enquiries are directed to these official Formula 1 URLs for ticket purchase
        </p>
      </div>

      <div className="bg-gold/5 border border-gold/20 p-5 mb-8 flex gap-4">
        <Flag className="w-5 h-5 text-gold shrink-0 mt-0.5" />
        <div>
          <p className="text-gold text-[10px] font-bold tracking-widest uppercase mb-1">Lead Generation Model</p>
          <p className="text-white/50 text-xs leading-relaxed">
            VELOCE captures enquiries and sales leads. Ticket payment processing happens directly on the official Formula 1 website. 
            Your role is to qualify leads and direct them to the correct F1 official link.
          </p>
        </div>
      </div>

      <div className="space-y-2">
        {GP_RACES.map((race, i) => (
          <div key={i} className="flex items-center gap-4 bg-[#0a0a0a] border border-white/5 p-4 hover:border-gold/20 transition-colors group">
            <div className="w-8 h-8 bg-gold/10 flex items-center justify-center text-gold text-[10px] font-bold shrink-0">
              {String(i + 1).padStart(2, '0')}
            </div>
            <div className="flex-1">
              <p className="text-white text-sm">{race.race}</p>
              <p className="text-white/30 text-[9px] tracking-widest uppercase">{race.date}</p>
            </div>
            <a href={race.link} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-[9px] tracking-widest text-gold border border-gold/20 px-4 py-2 hover:bg-gold/10 transition-colors font-bold uppercase shrink-0">
              <Globe className="w-3 h-3" /> Official F1 Link
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Analytics Panel ───────────────────────────────────────────────────────────
function AnalyticsPanel({ leads, events }: { leads: number; events: number }) {
  const stats = [
    { label: 'Total Leads', value: leads, pct: 100 },
    { label: 'Qualified',   value: Math.round(leads * 0.4), pct: 40 },
    { label: 'Contacted',   value: Math.round(leads * 0.6), pct: 60 },
    { label: 'Closed',      value: Math.round(leads * 0.2), pct: 20 },
  ];

  const topEvents = ['Monaco Grand Prix', 'British Grand Prix', 'Singapore Night Race', 'Abu Dhabi Grand Prix'];

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-2xl font-serif text-white italic mb-2">Analytics Overview</h2>
        <p className="text-white/30 text-[10px] tracking-widest uppercase">Lead pipeline performance</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => (
          <div key={s.label} className="bg-[#0a0a0a] border border-white/5 p-6">
            <p className="text-3xl font-serif text-white mb-2">{s.value}</p>
            <p className="text-[9px] tracking-widest text-white/30 uppercase mb-4">{s.label}</p>
            <div className="h-1 bg-white/5 w-full">
              <div className="h-full bg-gold transition-all duration-1000" style={{ width: `${s.pct}%` }} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#0a0a0a] border border-white/5 p-6">
          <h3 className="text-white font-serif italic mb-6">Top Events by Interest</h3>
          <div className="space-y-4">
            {topEvents.map((ev, i) => (
              <div key={ev} className="flex items-center gap-4">
                <span className="text-gold text-[10px] font-bold w-4">{i + 1}</span>
                <div className="flex-1">
                  <p className="text-white/70 text-xs mb-1">{ev}</p>
                  <div className="h-[2px] bg-white/5">
                    <div className="h-full bg-gold" style={{ width: `${(4 - i) * 20 + 10}%` }} />
                  </div>
                </div>
                <span className="text-white/30 text-[9px]">{(4 - i) * 20 + 10}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#0a0a0a] border border-white/5 p-6">
          <h3 className="text-white font-serif italic mb-6">Lead Status Breakdown</h3>
          <div className="space-y-3">
            {[
              { label: 'Pending',   val: 40, color: 'bg-amber-400' },
              { label: 'Contacted', val: 30, color: 'bg-blue-400' },
              { label: 'Qualified', val: 20, color: 'bg-emerald-400' },
              { label: 'Closed',    val: 10, color: 'bg-zinc-400' },
            ].map(s => (
              <div key={s.label} className="flex items-center gap-4">
                <div className={`w-2 h-2 rounded-full ${s.color} shrink-0`} />
                <span className="text-white/50 text-[10px] tracking-widest uppercase flex-1">{s.label}</span>
                <span className="text-white text-sm font-serif">{s.val}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Settings Panel ────────────────────────────────────────────────────────────
function SettingsPanel() {
  const [saved, setSaved] = useState(false);
  const [siteName, setSiteName] = useState('VELOCE');
  const [adminEmail, setAdminEmail] = useState('admin@veloce.com');
  const [f1Base, setF1Base] = useState('https://www.formula1.com/en/racing/');

  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h2 className="text-2xl font-serif text-white italic mb-2">Site Settings</h2>
        <p className="text-white/30 text-[10px] tracking-widest uppercase">Global configuration</p>
      </div>

      <div className="space-y-4 bg-[#0a0a0a] border border-white/5 p-6">
        <h3 className="text-white/60 text-[10px] tracking-widest uppercase border-b border-white/5 pb-4 mb-6">General</h3>
        <Field label="Site Name">
          <input className={inputCls} value={siteName} onChange={e => setSiteName(e.target.value)} />
        </Field>
        <Field label="Admin Notification Email">
          <input className={inputCls} type="email" value={adminEmail} onChange={e => setAdminEmail(e.target.value)} />
        </Field>
        <Field label="Base F1 Official Ticket URL">
          <input className={inputCls} value={f1Base} onChange={e => setF1Base(e.target.value)} />
        </Field>
      </div>

      <div className="bg-[#0a0a0a] border border-white/5 p-6">
        <h3 className="text-white/60 text-[10px] tracking-widest uppercase border-b border-white/5 pb-4 mb-6">Lead Generation</h3>
        <div className="space-y-3 text-sm text-white/50 leading-relaxed">
          <p>• All ticket payment processing happens directly on <a href="https://www.formula1.com" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">formula1.com</a></p>
          <p>• VELOCE collects enquiries and qualifies leads only</p>
          <p>• Each event should have a direct F1 race page URL set</p>
          <p>• Leads marked "Qualified" should be followed up within 24h</p>
        </div>
      </div>

      <button type="button" onClick={save}
        className="flex items-center gap-2 bg-gold text-black px-8 py-3 text-[10px] tracking-widest font-bold uppercase hover:bg-gold/90 transition-colors">
        {saved ? <><CheckCircle className="w-4 h-4" /> Saved!</> : <><Settings className="w-4 h-4" /> Save Settings</>}
      </button>
    </div>
  );
}

// ── Main Dashboard ────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const [authed, setAuthed] = useState(() => !!sessionStorage.getItem('veloce_admin'));
  const [section, setSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    if (!authed) return;
    const q1 = query(collection(db, 'requests'), orderBy('createdAt', 'desc'));
    const q2 = query(collection(db, 'events'), orderBy('createdAt', 'desc'));
    const u1 = onSnapshot(q1, s => setLeads(s.docs.map(d => ({ id: d.id, ...d.data() } as Lead))), () => setLeads([]));
    const u2 = onSnapshot(q2, s => setEvents(s.docs.map(d => ({ id: d.id, ...d.data() } as Event))), () => setEvents([]));
    return () => { u1(); u2(); };
  }, [authed]);

  const login = () => { sessionStorage.setItem('veloce_admin', '1'); setAuthed(true); };
  const logout = () => { sessionStorage.removeItem('veloce_admin'); setAuthed(false); };

  if (!authed) return <AdminLogin onLogin={login} />;

  const pending = leads.filter(l => l.status === 'PENDING').length;

  return (
    <div className="min-h-screen bg-[#060606] flex" dir="ltr">
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#080808] border-r border-white/5 flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        {/* Logo */}
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-gold to-[#8E793E] rotate-45 flex items-center justify-center shrink-0">
              <span className="text-black font-bold -rotate-45 text-sm">V</span>
            </div>
            <div>
              <p className="text-white font-serif italic text-lg leading-none">VELOCE</p>
              <p className="text-gold text-[8px] tracking-[0.3em] uppercase">Super Admin</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              type="button"
              onClick={() => { setSection(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-[10px] tracking-widest font-bold uppercase transition-colors text-left ${
                section === item.id
                  ? 'bg-gold/10 text-gold border-l-2 border-gold'
                  : 'text-white/30 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              {item.label}
              {item.id === 'leads' && pending > 0 && (
                <span className="ml-auto bg-gold text-black text-[8px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {pending}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* User */}
        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-gold/20 border border-gold/20 flex items-center justify-center">
              <Shield className="w-4 h-4 text-gold" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-[10px] font-bold uppercase tracking-widest truncate">Super Admin</p>
              <p className="text-white/30 text-[8px] tracking-widest">VELOCE GLOBAL</p>
            </div>
          </div>
          <button type="button" onClick={logout}
            className="w-full flex items-center gap-2 text-white/20 hover:text-red-400 text-[9px] tracking-widest uppercase transition-colors py-2">
            <LogOut className="w-3 h-3" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Sidebar backdrop on mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-16 bg-[#080808] border-b border-white/5 flex items-center justify-between px-6 gap-4 shrink-0">
          <div className="flex items-center gap-4">
            <button type="button" onClick={() => setSidebarOpen(o => !o)} className="lg:hidden text-white/40 hover:text-white transition-colors">
              <LayoutDashboard className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-white text-sm font-serif italic capitalize">
                {NAV_ITEMS.find(n => n.id === section)?.label}
              </h1>
              <p className="text-white/20 text-[8px] tracking-widest uppercase">VELOCE Admin</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {pending > 0 && (
              <button type="button" onClick={() => setSection('leads')} className="relative text-white/40 hover:text-gold transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-gold text-black text-[7px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{pending}</span>
              </button>
            )}
            <a href="/" target="_blank" className="flex items-center gap-2 text-white/30 hover:text-gold text-[9px] tracking-widest uppercase transition-colors">
              <Eye className="w-4 h-4" /> View Site
            </a>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={section}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {section === 'dashboard' && (
                <div className="space-y-10">
                  <div>
                    <h2 className="text-3xl font-serif text-white italic mb-2">Good morning, Admin</h2>
                    <p className="text-white/30 text-[10px] tracking-widest uppercase">Here's your VELOCE command centre overview</p>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard label="Total Events" value={events.length || 0} icon={CalendarDays} color="bg-gold/10 text-gold" delta="+2 this month" />
                    <StatCard label="Sales Leads" value={leads.length || 0} icon={MessageSquare} color="bg-blue-500/10 text-blue-400" delta="+8 this week" />
                    <StatCard label="Pending" value={pending} icon={Clock} color="bg-amber-500/10 text-amber-400" />
                    <StatCard label="Qualified" value={leads.filter(l => l.status === 'QUALIFIED').length} icon={CheckCircle} color="bg-emerald-500/10 text-emerald-400" />
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-[#0a0a0a] border border-white/5 p-6">
                      <h3 className="text-white font-serif italic mb-6">Recent Leads</h3>
                      {leads.slice(0, 5).length === 0 ? (
                        <p className="text-white/20 text-[10px] tracking-widest uppercase">No leads yet</p>
                      ) : leads.slice(0, 5).map(l => (
                        <div key={l.id} className="flex items-center gap-4 py-3 border-b border-white/5 last:border-0">
                          <div className="w-8 h-8 bg-gold/10 flex items-center justify-center text-gold font-serif italic text-sm shrink-0">
                            {l.name?.[0]?.toUpperCase() || '?'}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-white text-sm truncate">{l.name}</p>
                            <p className="text-white/30 text-[9px] truncate">{l.email}</p>
                          </div>
                          <span className={`text-[8px] tracking-widest px-2 py-1 border font-bold uppercase ${STATUS_COLORS[l.status]}`}>{l.status}</span>
                        </div>
                      ))}
                    </div>

                    <div className="bg-[#0a0a0a] border border-white/5 p-6">
                      <h3 className="text-white font-serif italic mb-6">Quick Actions</h3>
                      <div className="space-y-3">
                        {[
                          { label: 'Add New Event', icon: Plus, action: () => setSection('events') },
                          { label: 'View All Leads', icon: MessageSquare, action: () => setSection('leads') },
                          { label: 'F1 Ticket Links', icon: Globe, action: () => setSection('tickets') },
                          { label: 'View Analytics', icon: BarChart3, action: () => setSection('analytics') },
                        ].map(q => (
                          <button key={q.label} type="button" onClick={q.action}
                            className="w-full flex items-center gap-3 p-3 border border-white/5 text-white/40 hover:text-gold hover:border-gold/20 transition-colors text-[10px] tracking-widest uppercase">
                            <q.icon className="w-4 h-4 shrink-0" />
                            {q.label}
                            <ChevronRight className="w-3 h-3 ml-auto" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {section === 'events'    && <EventsPanel />}
              {section === 'leads'     && <LeadsPanel />}
              {section === 'tickets'   && <TicketsPanel />}
              {section === 'analytics' && <AnalyticsPanel leads={leads.length} events={events.length} />}
              {section === 'settings'  && <SettingsPanel />}
              {section === 'users'     && (
                <div className="text-center py-32">
                  <Users className="w-12 h-12 text-white/10 mx-auto mb-6" />
                  <h2 className="text-2xl font-serif text-white italic mb-3">Member Management</h2>
                  <p className="text-white/30 text-[10px] tracking-widest uppercase">Connected to Firebase Auth — members appear here after Google sign-in</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
