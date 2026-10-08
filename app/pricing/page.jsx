'use client';
import { useState } from 'react';
import { tiers, CONTACT_HREF } from '../../lib/pricing';
import Reveal from '../../components/Reveal';
import { rupiahFull } from '../../lib/format';

export default function Pricing() {
  return (
    <main className="wrap" style={{ paddingTop: '2.4rem' }}>
      <Reveal className="sec-head center">
        <span className="kicker">Harga</span>
        <h1>Harga jelas — pembuatan &amp; domain termasuk</h1>
        <p>Tanpa biaya tersembunyi. Domain .com/.id, hosting, SSL, dan semua infrastruktur sudah termasuk. Perpanjangan tahun ke-2 paket Starter &amp; Business cukup setengah harga.</p>
      </Reveal>

      <div className="price-grid" style={{ marginTop: '2rem' }}>
        {tiers.map((t, i) => (
          <Reveal key={t.id} className={`price-card${t.highlight ? ' hot' : ''}`} delay={(i % 3) * 90} style={{ '--plan': `var(--accent-${t.id === 'hemat' ? 'mint' : t.id === 'bisnis' ? 'blue' : 'violet'})` }}>
            {t.badge && <span className="price-badge">{t.badge}</span>}
            <div className="name">{t.name}</div>
            <div className="amt">
              {t.price == null ? (
                <span style={{ fontSize: '1.6rem' }}>Hubungi kami</span>
              ) : (
                <>
                  {rupiahFull(t.price)}
                  
                </>
              )}
            </div>
            <div className="for">{t.forWho}{t.price == null ? ' — solusi sesuai kebutuhan Anda' : ''}</div>
            {t.renewNote && (
              <div style={{ fontSize: '.82rem', fontWeight: 700, color: 'var(--ok)' }}>✓ {t.renewNote}</div>
            )}
            <ul>
              {t.cats.flatMap((c) => c.feats).slice(0, 7).map((f) => (
                <li key={f.t}>
                  <span className="ck" style={f.s === '—' ? { color: '#B8BCC9' } : {}}>{f.s === '—' ? '·' : '✓'}</span>
                  <span style={f.s === '—' ? { color: '#B8BCC9' } : f.s === 'Available' ? {} : { color: '#6B7280' }}>
                    {f.t}{f.s !== 'Available' && f.s !== '—' ? ` (${f.s})` : ''}
                  </span>
                </li>
              ))}
            </ul>
            <a
              href={t.price == null ? CONTACT_HREF : `/booking?plan=${t.id}`}
              className={`m-btn block${t.highlight ? '' : ' ghost'}`}
              style={{ marginTop: '.4rem', textDecoration: 'none' }}
            >
              {t.cta}
            </a>
          </Reveal>
        ))}
      </div>

      <Reveal className="m-card" style={{ marginTop: '2rem' }}>
        <h2 style={{ marginBottom: '.8rem' }}>Kenapa paket kami ringan di kantong</h2>
        <div className="grid3">
          {[
            'Online 3–14 hari',
            'Revisi sepuasnya sampai cocok',
            'Tahun ke-2 cukup setengah harga',
            'Uang muka ringan, tanpa biaya tersembunyi',
            'Konsultasi gratis, tanpa komitmen',
            'Website & domain atas nama Anda sepenuhnya',
          ].map((b) => (
            <div key={b} style={{ display: 'flex', gap: '.6rem', alignItems: 'flex-start', fontSize: '.92rem' }}>
              <span style={{ flex: 'none', width: 24, height: 24, borderRadius: 999, background: 'linear-gradient(135deg,#34D399,#059669)', color: '#fff', display: 'grid', placeItems: 'center', fontSize: '.75rem', fontWeight: 800 }}>✓</span>
              <span>{b}</span>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal className="m-card" style={{ marginTop: '2rem' }}>
        <h2 style={{ marginBottom: '.8rem' }}>Bandingkan paket berdampingan</h2>
        <div className="tbl-wrap">
          <table className="compare">
            <thead>
              <tr><th>Fitur</th>{tiers.map((t) => <th key={t.id}>{t.name}<br /><span style={{ fontWeight: 400, fontSize: '.85rem' }}>{t.price == null ? 'hubungi kami' : rupiahFull(t.price)}</span></th>)}</tr>
            </thead>
            <tbody>
              {tiers[0].cats.map((cat) => {
                const feats = [...new Set(tiers.flatMap((t) => (t.cats.find((c) => c.cat === cat.cat)?.feats || []).map((f) => f.t)))];
                const rows = [
                  <tr key={`h-${cat.cat}`}>
                    <td colSpan={4} style={{ background: 'var(--panel2)', fontWeight: 800 }}>{cat.cat}</td>
                  </tr>,
                  ...feats.map((feat) => (
                    <tr key={feat}>
                      <td><strong>{feat}</strong></td>
                      {tiers.map((t) => {
                        const f = (t.cats.find((c) => c.cat === cat.cat)?.feats || []).find((x) => x.t === feat);
                        const s = f?.s || '—';
                        return (
                          <td key={t.id} className={s === 'Available' ? 'yes' : s === '—' ? 'no' : ''}>
                            {s === 'Available' ? '✓' : s}
                          </td>
                        );
                      })}
                    </tr>
                  )),
                ];
                return rows;
              })}
            </tbody>
          </table>
        </div>
      </Reveal>

      <Reveal as="section">
        <div className="cta-band">
          <div>
            <h2>Masih bingung pilih paket?</h2>
            <p>Ceritakan bisnis Anda, kami bilang jujur paket mana yang cocok — atau jika sebaiknya Anda tidak beli sama sekali.</p>
          </div>
          <a href="/booking" className="m-btn">Konsultasi gratis</a>
        </div>
      </Reveal>


    </main>
  );
}
