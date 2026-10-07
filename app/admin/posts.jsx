'use client';
import { useEffect, useState } from 'react';

// Kelola artikel blog (tambah + hapus). Format isi: markdown-lite (##, -, >).
export default function AdminPosts() {
  const [items, setItems] = useState([]);
  const [f, setF] = useState({ slug: '', title: '', excerpt: '', category: 'Tutorial', lang: 'id', thumb: '', body: '' });
  const [busy, setBusy] = useState(false);
  const [upBusy, setUpBusy] = useState(false);
  const [upErr, setUpErr] = useState('');
  // id artikel yang sedang diedit (null = mode tambah baru).
  const [editId, setEditId] = useState(null);

  const CATS = ['Tutorial', 'SEO', 'Website', 'Keamanan', 'WhatsApp Bisnis', 'AI & Chatbot'];

  async function uploadGambar(file) {
    if (!file) return;
    setUpBusy(true);
    setUpErr('');
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('slug', f.slug || 'img');
      const r = await fetch('/api/upload', { method: 'POST', body: fd }).then((x) => x.json());
      if (r.ok && r.path) set('thumb', r.path);
      else setUpErr(r.error || 'Upload gagal.');
    } catch {
      setUpErr('Upload gagal.');
    }
    setUpBusy(false);
  }

  async function muat() {
    const r = await fetch('/api/posts').then((x) => x.json()).catch(() => ({}));
    if (r.ok) setItems(r.items);
  }
  useEffect(() => { muat(); }, []);

  async function tambah(e) {
    e.preventDefault();
    if (!f.slug.trim() || !f.title.trim() || !f.body.trim()) return;
    setBusy(true);
    const isEdit = !!editId;
    const r = await fetch('/api/posts', {
      method: isEdit ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(isEdit
        ? { ...f, id: editId, date: undefined, read: undefined }
        : { ...f, date: new Date().toISOString().slice(0, 10), read: f.lang === 'en' ? '5 min' : '5 menit' }),
    }).then((x) => x.json()).catch(() => ({}));
    setBusy(false);
    if (r.ok) { batal(); muat(); }
    else if (r.error) window.alert(r.error);
  }

  function mulaiEdit(it) {
    setEditId(it.id);
    setF({ slug: it.slug || '', title: it.title || '', excerpt: it.excerpt || '', category: it.category || 'Tutorial', lang: it.lang || 'id', thumb: it.thumb || '', body: it.body || '' });
  }

  function batal() {
    setEditId(null);
    setF({ slug: '', title: '', excerpt: '', category: 'Tutorial', lang: 'id', thumb: '', body: '' });
  }

  async function hapus(id) {
    if (!window.confirm('Hapus artikel ini?')) return;
    await fetch('/api/posts', {
      method: 'DELETE', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    }).catch(() => {});
    muat();
  }

  const set = (k, v) => setF((x) => ({ ...x, [k]: v }));

  return (
    <div>
      <form onSubmit={tambah} style={{ display: 'flex', flexDirection: 'column', gap: '.5rem', marginBottom: '.8rem' }}>
        <div className="grid2" style={{ gap: '.5rem' }}>
          <div>
            <input className="m-input" value={f.slug} onChange={(e) => set('slug', e.target.value)} placeholder="slug-artikel" style={{ fontSize: '.85rem' }} />
            <span className="admin-hint">Slug: huruf kecil + strip, unik (jadi alamat /blog/slug).</span>
          </div>
          <div>
            <input className="m-input" value={f.title} onChange={(e) => set('title', e.target.value)} placeholder="Judul" style={{ fontSize: '.85rem' }} />
            <span className="admin-hint">Judul tampil di kartu & halaman artikel.</span>
          </div>
        </div>
        <input className="m-input" value={f.excerpt} onChange={(e) => set('excerpt', e.target.value)} placeholder="Ringkasan singkat" style={{ fontSize: '.85rem' }} />
        <div className="grid2" style={{ gap: '.5rem' }}>
          <div>
            <input className="m-input" value={f.category} onChange={(e) => set('category', e.target.value)} placeholder="Kategori" list="kat-list" style={{ fontSize: '.85rem' }} />
            <datalist id="kat-list">{CATS.map((c) => <option key={c} value={c} />)}</datalist>
            <span className="admin-hint">Kategori: pilih yang ada atau tulis baru.</span>
          </div>
          <div>
            <select className="m-input" value={f.lang} onChange={(e) => set('lang', e.target.value)} style={{ fontSize: '.85rem' }}>
              <option value="id">Indonesia</option>
              <option value="en">English</option>
            </select>
            <span className="admin-hint">Bahasa artikel.</span>
          </div>
        </div>
        <div>
          <div style={{ display: 'flex', gap: '.5rem' }}>
            <input className="m-input" value={f.thumb} onChange={(e) => set('thumb', e.target.value)} placeholder="Link gambar (https://…) — atau upload di samping" style={{ fontSize: '.85rem', flex: 1 }} />
            <label className="m-btn sm ghost" style={{ flex: 'none', cursor: 'pointer', margin: 0 }}>
              {upBusy ? 'Mengunggah…' : 'Upload'}
              <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" hidden onChange={(e) => { uploadGambar(e.target.files?.[0]); e.target.value = ''; }} />
            </label>
          </div>
          <span className="admin-hint">Sampul: upload JPG/PNG/WebP/GIF ≤ 2MB, atau tempel link gambar.</span>
          {upErr && <span className="admin-hint" style={{ color: 'var(--err)' }}>{upErr}</span>}
          {f.thumb && <img src={f.thumb} alt="" style={{ display: 'block', width: '100%', aspectRatio: '16/9', objectFit: 'cover', borderRadius: 10, marginTop: '.4rem', border: '1px solid var(--line)' }} />}
        </div>
        <textarea className="m-input" value={f.body} onChange={(e) => set('body', e.target.value)} placeholder="Isi (## judul, - list, > kutip)" rows={4} style={{ fontSize: '.85rem' }} />
        <div style={{ display: 'flex', gap: '.5rem' }}>
          <button className="m-btn sm" type="submit" disabled={busy}>{busy ? 'Menyimpan…' : editId ? 'Simpan perubahan' : 'Tambah artikel'}</button>
          {editId && <button className="m-btn sm ghost" type="button" onClick={batal}>Batal</button>}
        </div>
      </form>
      <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
        {items.map((it) => (
          <div key={it.id} className="table-row">
            <div style={{ minWidth: 0 }}>
              <strong className="ink" style={{ fontSize: '.82rem' }}>{it.title}</strong>
              <div className="muted" style={{ fontSize: '.75rem' }}>{it.lang.toUpperCase()} · {it.category} · {it.views} views</div>
            </div>
            <div style={{ display: 'flex', gap: '.4rem', flex: 'none' }}>
              <button className="m-btn sm ghost" type="button" onClick={() => mulaiEdit(it)}>Edit</button>
              <button className="m-btn sm ghost" type="button" onClick={() => hapus(it.id)}>Hapus</button>
            </div>
          </div>
        ))}
      </div>
      {items.length === 0 && <p className="muted" style={{ fontSize: '.85rem', margin: 0 }}>Belum ada artikel.</p>}
    </div>
  );
}
