'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ChevronDown } from 'lucide-react';

// Toolbar filter minimalis: search + tab bahasa + dropdown kategori sebaris.
const LANGS = [
  { v: 'semua', t: 'Semua' },
  { v: 'id', t: 'Indonesia' },
  { v: 'en', t: 'English' },
];

export default function BlogFilter({ q, lang, cat, cats }) {
  const router = useRouter();
  const [text, setText] = useState(q || '');
  const [catOpen, setCatOpen] = useState(false);

  useEffect(() => { setText(q || ''); }, [q]);

  function go(nt, nl, nc) {
    const p = new URLSearchParams();
    const t = (nt ?? text).trim();
    if (t) p.set('q', t);
    if ((nl ?? lang) !== 'semua') p.set('lang', nl ?? lang);
    if (nc ?? cat) p.set('cat', nc ?? cat);
    const s = p.toString();
    router.replace(`/blog${s ? `?${s}` : ''}`);
  }

  useEffect(() => {
    if (text === (q || '')) return;
    const t = setTimeout(() => go(), 600);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <span style={{ position: 'relative', display: 'block' }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Cari artikel…"
          className="m-input"
          style={{ paddingLeft: '2.4rem', borderRadius: 100 }}
          aria-label="Cari artikel"
        />
        <Search size={17} style={{ position: 'absolute', left: '.9rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
      </span>
      <div
        style={{
          display: 'flex', alignItems: 'center', gap: '.9rem', flexWrap: 'wrap',
          marginTop: '.6rem', padding: '0 .2rem',
        }}
      >
        <div role="group" aria-label="Bahasa" style={{ display: 'flex', gap: '.9rem' }}>
          {LANGS.map((l) => {
            const on = lang === l.v;
            return (
              <button
                key={l.v}
                type="button"
                onClick={() => go(undefined, l.v, undefined)}
                aria-pressed={on}
                style={{
                  background: 'none', border: 0, cursor: 'pointer', padding: '.2rem 0',
                  fontSize: '.85rem', fontWeight: on ? 800 : 500,
                  color: on ? 'var(--primary)' : 'var(--muted)',
                  borderBottom: on ? '2px solid var(--primary)' : '2px solid transparent',
                }}
              >
                {l.t}
              </button>
            );
          })}
        </div>
        <span style={{ flex: 1 }} />
        <span style={{ position: 'relative', zIndex: 30 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '.4rem', fontSize: '.85rem', color: 'var(--muted)' }}>
            Kategori
            <button
              type="button"
              onClick={() => setCatOpen((v) => !v)}
              aria-expanded={catOpen}
              aria-label="Pilih kategori"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '.3rem',
                border: 0, background: 'transparent', cursor: 'pointer',
                fontSize: '.85rem', fontWeight: 700, color: 'var(--ink)',
                padding: '.2rem 0',
              }}
            >
              {cat || 'Semua'}
              <ChevronDown size={15} style={{ transform: catOpen ? 'rotate(180deg)' : undefined, transition: 'transform .15s' }} />
            </button>
          </span>
          {catOpen && (
            <>
              <span
                aria-hidden
                onClick={() => setCatOpen(false)}
                style={{ position: 'fixed', inset: 0, zIndex: 40, cursor: 'default' }}
              />
              <span
                role="listbox"
                aria-label="Kategori"
                style={{
                  position: 'absolute', top: 'calc(100% + 6px)', right: 0, zIndex: 50,
                  minWidth: 190, maxHeight: 260, overflowY: 'auto',
                  background: '#fff', border: '1.5px solid var(--line)', borderRadius: 12,
                  boxShadow: 'var(--shadow-lg)', padding: '.35rem',
                  display: 'flex', flexDirection: 'column',
                }}
              >
                {['', ...cats.map((c) => c.category)].map((v) => {
                  const label = v || 'Semua';
                  const on = (cat || '') === v;
                  return (
                    <button
                      key={label}
                      type="button"
                      role="option"
                      aria-selected={on}
                      onClick={() => { setCatOpen(false); go(undefined, undefined, v); }}
                      style={{
                        textAlign: 'left', border: 0, cursor: 'pointer', borderRadius: 8,
                        padding: '.5rem .7rem', fontSize: '.85rem', fontWeight: on ? 800 : 500,
                        background: on ? 'var(--panel2)' : 'transparent',
                        color: on ? 'var(--primary)' : 'var(--body)',
                      }}
                    >
                      {label}
                    </button>
                  );
                })}
              </span>
            </>
          )}
        </span>
      </div>
    </div>
  );
}
