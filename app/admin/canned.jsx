'use client';
import { useEffect, useState } from 'react';

// Kelola balasan siap pakai (canned responses) — prioritas atas aturan MD.
// Format keyword sama seperti MD: pisah |, awalan = untuk cocok persis.
export default function AdminCanned() {
  const [items, setItems] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [reply, setReply] = useState('');
  const [busy, setBusy] = useState(false);

  async function muat() {
    const r = await fetch('/api/canned').then((x) => x.json()).catch(() => ({}));
    if (r.ok) setItems(r.items);
  }
  useEffect(() => { muat(); }, []);

  async function tambah(e) {
    e.preventDefault();
    if (!keyword.trim() || !reply.trim()) return;
    setBusy(true);
    const r = await fetch('/api/canned', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ keyword: keyword.trim(), reply: reply.trim() }),
    }).then((x) => x.json()).catch(() => ({}));
    setBusy(false);
    if (r.ok) { setKeyword(''); setReply(''); muat(); }
  }

  async function toggle(item) {
    await fetch('/api/canned', {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: item.id, active: !item.active }),
    }).catch(() => {});
    muat();
  }

  async function hapus(id) {
    if (!window.confirm('Hapus balasan ini?')) return;
    await fetch('/api/canned', {
      method: 'DELETE', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    }).catch(() => {});
    muat();
  }

  return (
    <div>
      <form onSubmit={tambah} style={{ display: 'flex', flexDirection: 'column', gap: '.5rem', marginBottom: '.8rem' }}>
        <input className="m-input" value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="Keyword: garansi | =dp (awalan = = persis)" style={{ fontSize: '.85rem' }} />
        <input className="m-input" value={reply} onChange={(e) => setReply(e.target.value)} placeholder="Balasan (maks 2 kalimat)" style={{ fontSize: '.85rem' }} />
        <button className="m-btn sm" type="submit" disabled={busy}>{busy ? 'Menyimpan…' : 'Tambah balasan'}</button>
      </form>
      {items.length === 0 && <p className="muted" style={{ fontSize: '.85rem', margin: 0 }}>Belum ada. Aturan MD tetap jalan tanpa ini.</p>}
      {items.map((it) => (
        <div key={it.id} className="table-row">
          <div style={{ minWidth: 0 }}>
            <strong className="ink" style={{ fontSize: '.82rem' }}>{it.keyword}</strong>
            <div className="muted" style={{ fontSize: '.78rem' }}>{it.reply}</div>
          </div>
          <div className="row" style={{ gap: '.4rem', flex: 'none' }}>
            <button className="m-btn sm ghost" type="button" onClick={() => toggle(it)}>{it.active ? 'Aktif' : 'Mati'}</button>
            <button className="m-btn sm ghost" type="button" onClick={() => hapus(it.id)}>Hapus</button>
          </div>
        </div>
      ))}
    </div>
  );
}
