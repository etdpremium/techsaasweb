'use client';
import { useState, Fragment } from 'react';
import { tiers, CONTACT_HREF, expandInheritedByCat } from '../../lib/pricing';
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
        {/* Legenda centang: solid = fitur paket itu sendiri, pudar = diwarisi
            dari paket di bawahnya (Business mewarisi Starter; Full Automation
            mewarisi Starter + Business). */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.1rem', fontSize: '.8rem', color: 'var(--muted)', marginBottom: '1rem' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '.4rem' }}>
            <span className="ck-solid">✓</span> fitur paket ini
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '.4rem' }}>
            <span className="ck-inherit">✓</span> diwarisi dari paket di bawahnya
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '.4rem' }}>
            <span className="ck-none">—</span> tidak termasuk
          </span>
        </div>
        <div className="tbl-wrap">
          <table className="compare">
            <thead>
              <tr><th>Fitur</th>{tiers.map((t) => <th key={t.id}>{t.name}<br /><span style={{ fontWeight: 400, fontSize: '.85rem' }}>{t.price == null ? 'hubungi kami' : rupiahFull(t.price)}</span></th>)}</tr>
            </thead>
            <tbody>
              {/* Matriks per-kategori: tiap fitur punya status per-paket
                  (sendiri ✓ / warisan ✓ / —). Urutan baris = paket yang
                  pertama kali menyediakan fitur itu (Starter → Business →
                  Full Automation), jadi pembaca lihat "tangga" upgrade. */}
              {(() => {
                // expanded[tierId] = array {cat,t,s,from}
                const expanded = Object.fromEntries(tiers.map((t) => [t.id, expandInheritedByCat(t.id)]));
                // union kategori, urut dari paket pertama
                const catSet = [];
                for (const t of tiers) for (const c of t.cats)
                  if (!catSet.includes(c.cat)) catSet.push(c.cat);
                // abai-kan baris ringkasan "Semua di …" (duplikat di tabel expand)
                const isSummary = (t) => t.startsWith('Semua di ');

                return catSet.map((cat) => {
                  // union fitur di kategori ini, urut kemunculan pertama
                  const featSet = [];
                  for (const t of tiers) {
                    const c = t.cats.find((x) => x.cat === cat);
                    if (c) for (const f of c.feats)
                      if (!isSummary(f.t) && !featSet.includes(f.t)) featSet.push(f.t);
                  }
                  const rows = featSet.map((feat) => {
                    const per = tiers.map((t) => {
                      const hit = expanded[t.id].find((r) => r.cat === cat && r.t === feat);
                      return hit ? hit.s : '—';
                    });
                    const intro = per.findIndex((s) => s !== '—'); // paket pertama yg punya
                    return { feat, per, intro };
                  })
                  // Sorot baris "tangga": fitur muncul di paket manapun.
                  // Baris — — — (gak ada di paket manapun) disembunyikan —
                  // percupa ditampilkan, cuma bikin tabel ribut.
                  .filter((row) => row.intro !== -1)
                  .sort((a, b) => a.intro - b.intro);

                  return (
                    <Fragment key={`h-${cat}`}>
                      <tr><td colSpan={4} style={{ background: 'var(--panel2)', fontWeight: 800 }}>{cat}</td></tr>
                      {rows.map((row) => (
                        <tr key={row.feat}>
                          <td><strong>{row.feat}</strong></td>
                          {row.per.map((s, i) => (
                            <td key={tiers[i].id} className={s === 'Available' ? 'yes' : s === 'inherited' ? 'inherit' : 'no'}>
                              {s === 'Available' ? <span className="ck-solid">✓</span>
                                : s === 'inherited' ? <span className="ck-inherit">✓</span>
                                : <span className="ck-none">—</span>}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </Fragment>
                  );
                });
              })()}
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
