import { prisma } from '../../lib/prisma';
import Reveal from '../../components/Reveal';
import BlogFilter from './filter';

export const metadata = {
  title: 'Blog — Tips Website untuk Bisnis, SEO Lokal & CS Otomatis',
  description: 'Panduan praktis untuk pemilik bisnis: tips website yang menjual, SEO lokal agar ditemukan di Google, CS otomatis untuk melayani pelanggan, dan hitungan harga yang jujur.',
  alternates: { canonical: '/blog' },
};

const PER_PAGE = 12;

export default async function Blog({ searchParams }) {
  const sp = await searchParams;
  const q = String(sp?.q || '').slice(0, 80).trim();
  const lang = ['id', 'en'].includes(sp?.lang) ? sp.lang : 'semua';
  const cat = String(sp?.cat || '').slice(0, 60);
  const page = Math.max(1, parseInt(sp?.page || '1', 10) || 1);

  const where = {};
  if (lang !== 'semua') where.lang = lang;
  if (cat) where.category = cat;
  if (q) {
    where.OR = [
      { title: { contains: q } },
      { excerpt: { contains: q } },
      { body: { contains: q } },
    ];
  }

  const [total, posts, cats] = await Promise.all([
    prisma.post.count({ where }),
    prisma.post.findMany({
      where,
      orderBy: [{ date: 'desc' }, { createdAt: 'desc' }],
      skip: (page - 1) * PER_PAGE,
      take: PER_PAGE,
    }),
    prisma.post.groupBy({ by: ['category'] }),
  ]);

  const pages = Math.max(1, Math.ceil(total / PER_PAGE));
  const safePage = Math.min(page, pages);
  const list = safePage === page ? posts : await prisma.post.findMany({
    where,
    orderBy: [{ date: 'desc' }, { createdAt: 'desc' }],
    skip: (safePage - 1) * PER_PAGE,
    take: PER_PAGE,
  });

  const link = (over) => {
    const p = new URLSearchParams();
    if (q) p.set('q', q);
    if (lang !== 'semua') p.set('lang', lang);
    if (cat) p.set('cat', cat);
    Object.entries(over).forEach(([k, v]) => { if (v) p.set(k, v); else p.delete(k); });
    const s = p.toString();
    return `/blog${s ? `?${s}` : ''}`;
  };

  const aktif = !!(q || lang !== 'semua' || cat);

  return (
    <main className="wrap" style={{ paddingTop: '2.4rem' }}>
      <Reveal className="sec-head center">
        <span className="kicker">Blog & Berita</span>
        <h2>Info dan berita seputar teknologi</h2>
        <p>Tutorial, kabar teknologi, dan panduan praktis — dalam Bahasa Indonesia dan English.</p>
      </Reveal>

      {/* Search otomatis + filter (pembungkus di atas kartu agar panel tak tertutup) */}
      <Reveal style={{ position: 'relative', zIndex: 20 }}>
        <BlogFilter q={q} lang={lang} cat={cat} cats={cats} />
        {aktif && (
          <p className="muted center blog-filterstate">
            {total} hasil{q && <> untuk “<strong>{q}</strong>”</>}{cat && <> · kategori <strong>{cat}</strong></>} · <a href="/blog">Reset</a>
          </p>
        )}
      </Reveal>

      <div className="grid3 blog-grid" style={{ position: 'relative', zIndex: 1 }}>
        {list.map((p) => (
          <Reveal key={p.slug} delay={0} className="blog-grid-cell">
            <a href={`/blog/${p.slug}`} className="blog-card">
              <div className="thumb">
                <img src={p.thumb} alt={p.title} width={960} height={540} loading="lazy" />
              </div>
              <div className="body">
                <div className="blog-meta">
                  <span className="tag">{p.category}</span>
                  <span>{p.date} · {p.read}</span>
                  <span className="tag dark">{p.lang === 'id' ? 'ID' : 'EN'}</span>
                </div>
                <h3>{p.title}</h3>
                <p>{p.excerpt}</p>
                <span className="blog-more">Baca artikel →</span>
              </div>
            </a>
          </Reveal>
        ))}
      </div>

      {list.length === 0 && (
        <p className="muted center" style={{ marginTop: '2rem' }}>Tidak ada artikel yang cocok. Coba kata kunci atau filter lain.</p>
      )}

      {pages > 1 && (
        <nav aria-label="Halaman artikel" className="row center" style={{ justifyContent: 'center', marginTop: '2.2rem', gap: '.4rem' }}>
          {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
            <a
              key={n}
              href={link({ page: n === 1 ? '' : String(n) })}
              aria-current={n === safePage ? 'page' : undefined}
              style={{
                minWidth: 40, height: 40, display: 'grid', placeItems: 'center',
                borderRadius: 12, textDecoration: 'none', fontWeight: 700, fontSize: '.9rem',
                background: n === safePage ? 'var(--primary)' : '#fff',
                color: n === safePage ? '#fff' : 'var(--ink)',
                border: n === safePage ? 'none' : '1.5px solid var(--line)',
              }}
            >
              {n}
            </a>
          ))}
        </nav>
      )}
    </main>
  );
}
