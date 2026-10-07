import { tiers, CONTACT_HREF } from '../lib/pricing';
import { juta } from '../lib/format';

// Teaser 3 kartu di homepage; versi penuh (tabel + perbandingan) ada di /pricing
export default function PricingTeaser() {
  return (
    <div className="price-grid">
      {tiers.map((t) => (
        <div key={t.id} className={`price-card${t.highlight ? ' hot' : ''}`} style={{ '--plan': `var(--accent-${t.id === 'hemat' ? 'mint' : t.id === 'bisnis' ? 'blue' : 'violet'})` }}>
          {t.badge && <span className="price-badge">{t.badge}</span>}
          <div className="name">{t.name}</div>
          <div className="amt">
            {t.price == null ? (
              <span style={{ fontSize: '1.5rem' }}>Hubungi kami</span>
            ) : (
              <>
                {juta(t.price)}
              </>
            )}
          </div>
          <div className="for">{t.forWho}{t.price == null ? ' — sesuai kebutuhan Anda' : ''}</div>
          {t.renewNote && (
            <div style={{ fontSize: '.8rem', fontWeight: 700, color: 'var(--ok)' }}>✓ {t.renewNote}</div>
          )}
          <ul>
            {t.cats.flatMap((c) => c.feats).slice(0, 5).map((f) => (
              <li key={f.t}>
                <span className="ck">{f.s === '—' ? '·' : '✓'}</span>
                <span style={f.s === '—' ? { color: '#B8BCC9' } : {}}>{f.t}</span>
              </li>
            ))}
          </ul>
          <a href={t.price == null ? CONTACT_HREF : `/booking?plan=${t.id}`} className={`m-btn block${t.highlight ? '' : ' ghost'}`} style={{ marginTop: '.4rem', textDecoration: 'none' }}>
            {t.cta}
          </a>
        </div>
      ))}
    </div>
  );
}
