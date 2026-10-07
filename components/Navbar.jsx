'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

const LINKS = [
  ['Beranda', '/'],
  ['Layanan', '/services'],
  ['Harga', '/pricing'],
  ['Pemesanan', '/booking'],
  ['Blog', '/blog'],
];

export default function Navbar({ wordmarkClass = '' }) {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [prof, setProf] = useState(false);
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    fetch('/api/auth', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'me' }) })
      .then((r) => r.json())
      .then((d) => setUser(d.user || null))
      .catch(() => setUser(null));
  }, [pathname]);

  useEffect(() => {
    setHidden(false);
    let lastY = window.scrollY;
    function onScroll() {
      const y = window.scrollY;
      if (y < 80) { setHidden(false); lastY = y; return; }
      if (y > lastY + 4) { setHidden(true); lastY = y; }
      else if (y < lastY - 4) { setHidden(false); lastY = y; }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  async function keluar() {
    try {
      await fetch('/api/auth', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'logout' }) });
    } catch {
      // tetap keluar walau request gagal
    }
    setProf(false);
    setOpen(false);
    window.location.href = '/';
  }

  if (pathname && pathname.startsWith('/login')) return null;

  return (
    <div className={`nav-shell${hidden && !open ? ' nav-hide' : ''}`}>
      <nav className="nav">
        {/* ---- baris atas: brand (kiri) | tombol Mulai + toggle (kanan) ---- */}
        <a href="/" className="brand" style={{ textDecoration: 'none' }}>
          <Logo height={30} />
          <span className={wordmarkClass}>TechSaaSWeb</span>
        </a>

        <div className="desktop-links">
          {LINKS.map(([label, href]) => (
            <a key={href} href={href} style={{ fontWeight: pathname === href ? 700 : 500, color: pathname === href ? 'var(--primary)' : undefined }}>{label}</a>
          ))}
        </div>

        <div className="nav-right">
          {user ? (
            <div className="profile-wrap">
              <button className="profile-btn" onClick={() => setProf((v) => !v)} aria-label="Menu akun" aria-expanded={prof}>
                {(user.name || 'A').charAt(0).toUpperCase()}
              </button>
              {prof && (
                <div className="profile-menu">
                  {user.role === 'admin' && (
                    <a href="/admin" onClick={() => { setProf(false); setOpen(false); }}>Admin</a>
                  )}
                  <button type="button" onClick={keluar}>Keluar</button>
                </div>
              )}
            </div>
          ) : (
            <>
              <a href="/login" className="ghost" style={{ textDecoration: 'none' }}>Log in</a>
              <a href="/booking" className="m-btn sm" style={{ textDecoration: 'none' }}>Get started</a>
            </>
          )}
          <button className="hamburger" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* ---- kotak menu mobile (bar utama di atasnya sudah ada logo + tombol X) ---- */}
        {open && (
          <div className="mobile-menu open">
            {/* list vertikal menu utama */}
            {LINKS.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
            ))}

            {/* bagian autentikasi di paling bawah list */}
            {user ? (
              <>
                {user.role === 'admin' && (
                  <a href="/admin" onClick={() => setOpen(false)}>Admin</a>
                )}
                <button type="button" onClick={keluar} style={{ textAlign: 'left', background: 'none', border: 0, cursor: 'pointer', font: 'inherit', color: 'var(--body)', fontSize: '1rem', padding: '.7rem .5rem', borderTop: '1px solid var(--line)' }}>Keluar</button>
              </>
            ) : (
              <>
                <a href="/login" className="mm-login" onClick={() => setOpen(false)}>Log in</a>
                <a href="/booking" className="m-btn block" style={{ marginTop: '.7rem', textDecoration: 'none' }} onClick={() => setOpen(false)}>Get started</a>
              </>
            )}
          </div>
        )}
      </nav>
    </div>
  );
}
