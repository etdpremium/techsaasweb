'use client';
import { useState, useRef, useEffect } from 'react';

// CS-style support popup: floating bubble button (standard chat glyph, no AI
// icon, no emoji) opens an assistant panel. Talks to /api/chat (OpenRouter
// pool). Falls back to a WhatsApp lead form when quota/models are down.
// URL di balasan jadi link klik (biru + garis bawah di bubble terang,
// garis bawah putih di bubble gelap agar tetap terbaca).
function linkify(text, onDark) {
  const parts = String(text).split(/(https?:\/\/[^\s)]+)/g);
  return parts.map((p, i) =>
    /^https?:\/\//.test(p) ? (
      <a
        key={i}
        href={p}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: onDark ? '#fff' : 'var(--primary)',
          fontWeight: 700,
          textDecoration: 'underline',
        }}
      >
        {p.replace(/^https?:\/\//, '')}
      </a>
    ) : (
      p
    )
  );
}

export default function ChatWidget({ tenant = null, greeting = null }) {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  // Gerbang kenalan: nama + email + telepon WAJIB diisi sekali sebelum chat.
  // Tersimpan di localStorage — tidak pernah ditanya lagi di kunjungan berikut.
  const [lead, setLead] = useState(null);
  const [gateDone, setGateDone] = useState(false);
  // Form kontak HANYA muncul bila AI tidak bisa jawab (mode 'form').
  // Pertama kali otomatis terbuka; setelahnya via tombol "Tinggalkan kontak".
  const [formOpen, setFormOpen] = useState(false);
  const [contactOffer, setContactOffer] = useState(false);
  const formEverShown = useRef(false);
  // Sekali pengunjung mengisi kontak, form tidak pernah muncul lagi.
  const contactGiven = useRef(false);
  const [hidden, setHidden] = useState(false);
  const isTenant = tenant !== null;

  // Sembunyikan widget di halaman internal (admin/dashboard/login) —
  // bubble-nya menutupi tombol aksi dan tidak dibutuhkan pemilik.
  // Juga saat instance tenant demo aktif (hindari ganda).
  const internalPage = () => {
    try {
      const p = window.location.pathname || '';
      return p.startsWith('/admin') || p.startsWith('/dashboard') || p.startsWith('/login');
    } catch { return false; }
  };

  // Singleton: a tenant-specific instance (demo pages) suppresses the global one.
  useEffect(() => {
    if (isTenant) {
      window.__tswTenantOn = true;
      window.dispatchEvent(new Event('tsw-tenant'));
      return () => {
        window.__tswTenantOn = false;
        window.dispatchEvent(new Event('tsw-tenant'));
      };
    }
    const sync = () => setHidden(!!window.__tswTenantOn || internalPage());
    sync();
    window.addEventListener('tsw-tenant', sync);
    return () => window.removeEventListener('tsw-tenant', sync);
  }, []);
  // Tawarkan form kontak: otomatis hanya di fallback pertama,
  // setelahnya cukup tombol kecil agar tidak mengganggu.
  function tawarkanKontak() {
    if (contactGiven.current) return;
    if (!formEverShown.current) {
      formEverShown.current = true;
      setFormOpen(true);
    } else if (!formOpen) {
      setContactOffer(true);
    }
  }
  const boxRef = useRef(null);

  // Muat kenalan tersimpan — bila ada, gerbang dilewati selamanya.
  useEffect(() => {
    try {
      const raw = localStorage.getItem('tsw-lead');
      if (raw) {
        const rec = JSON.parse(raw);
        if (rec && rec.name && rec.phone) {
          setLead(rec);
          setGateDone(true);
          contactGiven.current = true;
        }
      }
    } catch {}
  }, []);

  const hello = lead
    ? `Halo ${lead.name}! Ada yang bisa saya bantu soal website atau paket?`
    : (greeting || 'Halo! Saya Elfaent, ada yang bisa saya bantu?');

  useEffect(() => {
    if (open && gateDone && msgs.length === 0) setMsgs([{ me: false, text: hello }]);
    if (open && boxRef.current) boxRef.current.scrollTop = 9999;
  }, [open, gateDone]);

  useEffect(() => {
    if (boxRef.current) boxRef.current.scrollTop = 9999;
  }, [msgs]);

  async function ask(text) {
    const clean = (text || '').trim();
    if (!clean || busy || !gateDone) return;
    setMsgs((m) => [...m, { me: true, text: clean }]);
    setInput('');
    setBusy(true);
    // Jeda minimum agar jawaban template/instan tidak muncul terlalu cepat.
    const t0 = Date.now();
    const jedaAlami = async () => {
      const sisa = 1100 - (Date.now() - t0);
      if (sisa > 0) await new Promise((r) => setTimeout(r, sisa));
    };
    try {
      // Kirim riwayat 6 pesan terakhir agar AI ingat konteks (mis. jenis usaha).
      const history = msgs.slice(-6).map((m) => ({ role: m.me ? 'user' : 'assistant', content: m.text }));
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tenant, message: clean, history, visitorName: lead?.name || null }),
      });
      const data = await res.json();
      if (data.mode === 'form') tawarkanKontak();
      await jedaAlami();
      setMsgs((m) => [...m, { me: false, text: data.reply }]);
    } catch {
      tawarkanKontak();
      await jedaAlami();
      setMsgs((m) => [...m, { me: false, text: 'Maaf, koneksi terputus. Tinggalkan nama dan WhatsApp Anda, kami balas dalam 5 menit.' }]);
    }
    setBusy(false);
  }

  async function submitLead(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const payload = { tenant, name: fd.get('name'), contact: fd.get('contact'), note: 'chat fallback' };
    const res = await fetch('/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    const data = await res.json().catch(() => ({}));
    contactGiven.current = true;
    setMsgs((m) => [...m, { me: false, text: data.duplicate ? 'Siap. Ada lagi yang bisa saya bantu?' : `Terima kasih ${payload.name}. Kontak Anda tersimpan, kami balas dalam 5 menit.` }]);
    setFormOpen(false);
    setContactOffer(false);
  }

  // Gerbang kenalan: wajib sekali, lalu chat terbuka penuh.
  async function submitGate(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const name = String(fd.get('name') || '').trim().slice(0, 80);
    const email = String(fd.get('email') || '').trim().slice(0, 80);
    const phone = String(fd.get('phone') || '').replace(/[^\d+]/g, '').slice(0, 18);
    if (!name || !email || !phone) return;
    const rec = { name, email, phone };
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tenant, name, contact: phone, note: `email:${email} | gerbang chat`, source: 'chat' }),
      });
    } catch {}
    try { localStorage.setItem('tsw-lead', JSON.stringify(rec)); } catch {}
    contactGiven.current = true;
    setLead(rec);
    setGateDone(true);
    setFormOpen(false);
    setContactOffer(false);
    setMsgs((m) => [...m, { me: false, text: `Halo ${name}! Senang kenalan. Silakan tanya soal website, paket, atau cara pesan — saya jawab cepat.` }]);
  }

  if (hidden) return null;

  return (
    <>
      <button id="tsw-bubble" onClick={() => setOpen((v) => !v)} title="Butuh bantuan? Chat dengan Elfaent" aria-label="Chat dengan Elfaent">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
        <span className="dot" />
      </button>
      {open && (
        <div id="tsw-panel" role="dialog" aria-label="Chat dengan Elfaent">
          <header>
            <span className="cs-avatar" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
              <span className="cs-dot" />
            </span>
            <div>
              <div style={{ fontWeight: 700 }}>Elfaent</div>
              <div style={{ fontSize: '.82rem', color: '#93C5FD' }}>Online</div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Tutup chat" style={{ marginLeft: 'auto', background: 'none', border: 0, color: '#fff', fontSize: 18, cursor: 'pointer' }}>×</button>
          </header>
          <div className="msgs" ref={boxRef}>
            {!gateDone ? (
              <form onSubmit={submitGate} style={{ display: 'flex', flexDirection: 'column', gap: '.45rem' }}>
                <strong style={{ fontSize: '.9rem' }}>Kenalan dulu yuk</strong>
                <input name="name" required maxLength={80} placeholder="Nama Anda" autoComplete="name" />
                <input name="email" type="email" required maxLength={80} placeholder="Email aktif" autoComplete="email" />
                <input name="phone" required maxLength={18} placeholder="Nomor WhatsApp" autoComplete="tel" inputMode="tel" />
                <button className="btn" type="submit" style={{ border: 0, cursor: 'pointer' }}>Mulai chat</button>
              </form>
            ) : (
              msgs.map((m, i) => (
                <div key={i} className={m.me ? 'msg-out' : 'msg-in'}>{linkify(m.text, m.me)}</div>
              ))
            )}
            {formOpen ? (
              <form onSubmit={submitLead} style={{ display: 'flex', flexDirection: 'column', gap: '.4rem' }}>
                <div className="row-between" style={{ alignItems: 'center' }}>
                  <strong style={{ fontSize: '.85rem' }}>Tinggalkan kontak</strong>
                  <button type="button" onClick={() => setFormOpen(false)} aria-label="Tutup form" style={{ background: 'none', border: 0, cursor: 'pointer', color: 'var(--muted)', fontSize: '.8rem' }}>Tutup</button>
                </div>
                <input name="name" required placeholder="Nama Anda" />
                <input name="contact" required placeholder="WhatsApp atau email" />
                <button className="btn" type="submit" style={{ border: 0, cursor: 'pointer' }}>Kirim kontak</button>
              </form>
            ) : contactOffer ? (
              <button className="btn" type="button" onClick={() => { setFormOpen(true); setContactOffer(false); }} style={{ border: 0, cursor: 'pointer' }}>
                Tinggalkan kontak
              </button>
            ) : null}
            {busy && <div className="msg-in">Mengetik…</div>}
          </div>
          {gateDone && (
          <div className="inputrow">
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Tulis pertanyaan Anda" onKeyDown={(e) => e.key === 'Enter' && ask(input)} />
            <button className="send-btn" onClick={() => ask(input)} aria-label="Kirim">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2 11 13" /><path d="M22 2 15 22l-4-9-9-4z" /></svg>
            </button>
          </div>
          )}
        </div>
      )}
    </>
  );
}
