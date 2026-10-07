'use client';
import { useState } from 'react';

// Pemilih 15 halaman — pengunjung centang halaman yang diinginkan,
// lalu request dikirim ke /booking (demo + daftar halaman via URL).
export const PAGES_15 = [
  'Beranda', 'Layanan', 'Harga', 'Pemesanan', 'Blog',
  'Tentang', 'Portofolio', 'FAQ', 'Galeri', 'Testimoni',
  'Kontak', 'Promo', 'Kebijakan Privasi', 'Syarat & Ketentuan', 'Karier',
];

const DEFAULT_ON = ['Beranda', 'Layanan', 'Harga', 'Pemesanan', 'Blog', 'Tentang', 'Portofolio', 'FAQ'];

export default function PagePicker({ demoSlug, demoName }) {
  const [picked, setPicked] = useState(DEFAULT_ON);
  const toggle = (p) => setPicked((x) => (x.includes(p) ? x.filter((v) => v !== p) : [...x, p]));
  const href = `/booking?demo=${encodeURIComponent(demoSlug)}&pages=${encodeURIComponent(picked.join(','))}`;
  return (
    <div>
      <div className="pagepick-grid">
        {PAGES_15.map((p) => (
          <label key={p} className="ppick">
            <input type="checkbox" checked={picked.includes(p)} onChange={() => toggle(p)} />
            {p}
          </label>
        ))}
      </div>
      <div className="row-between" style={{ marginTop: '.9rem', flexWrap: 'wrap', gap: '.6rem' }}>
        <span className="muted" style={{ fontSize: '.85rem' }}>{picked.length} dari 15 halaman dipilih</span>
        <a href={picked.length ? href : '/booking'} className="m-btn sm" style={{ textDecoration: 'none' }}>
          Request seperti {demoName} →
        </a>
      </div>
    </div>
  );
}
