import { notFound } from 'next/navigation';
import { db } from '../../../lib/db';
import { Post } from '../../../db/schema';
import { eq, and, ne, desc, sql } from 'drizzle-orm';
import Reveal from '../../../components/Reveal';
import JsonLd from '../../../components/JsonLd';

// D1 hanya tersedia di Workers runtime — jangan di-SSG saat build.
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const rows = await db.select().from(Post).where(eq(Post.slug, slug)).limit(1);
  const p = rows[0];
  if (!p) return {};
  return {
    // title artikel sudah spesifik + panjang; suffix "| TechSaaSWeb"
    // (template layout) menambah 14 char dan menembus batas 60. Pakai
    // absolute supaya dapat halaman full tanpa suffix — brand tetap ada
    // di og:site_name.
    title: p.title.length > 46 ? { absolute: p.title } : p.title,
    description: p.excerpt.length > 160 ? p.excerpt.slice(0, 157).trim() + '…' : p.excerpt,
    alternates: { canonical: `/blog/${p.slug}` },
    openGraph: {
      title: p.title,
      description: p.excerpt,
      type: 'article',
      publishedTime: p.date,
      url: `https://techsaasweb.com/blog/${p.slug}`,
      images: [{ url: p.thumb, width: 960, height: 540, alt: p.title }],
    },
  };
}

// markdown-lite → HTML (##, -, >, ```..., | table)
function render(body) {
  const lines = String(body || '').split('\n');
  const out = [];
  let i = 0;
  let list = null;
  const flushList = () => { if (list) { out.push(`<ul>${list.join('')}</ul>`); list = null; } };
  while (i < lines.length) {
    const ln = lines[i];
    if (ln.startsWith('```')) {
      flushList();
      const buf = [];
      i++;
      while (i < lines.length && !lines[i].startsWith('```')) { buf.push(lines[i]); i++; }
      out.push(`<pre><code>${esc(buf.join('\n'))}</code></pre>`);
      i++;
      continue;
    }
    if (ln.startsWith('## ')) { flushList(); out.push(`<h2>${esc(ln.slice(3))}</h2>`); i++; continue; }
    if (ln.startsWith('> ')) { flushList(); out.push(`<blockquote>${esc(ln.slice(2))}</blockquote>`); i++; continue; }
    if (ln.startsWith('- ')) {
      if (!list) list = [];
      list.push(`<li>${esc(ln.slice(2))}</li>`);
      i++;
      continue;
    }
    if (ln.trim().startsWith('|')) {
      flushList();
      const rows = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        const cells = lines[i].trim().split('|').slice(1, -1).map((c) => c.trim());
        rows.push(cells);
        i++;
      }
      const th = rows[0].map((c) => `<th>${esc(c)}</th>`).join('');
      const trs = rows.slice(1).map((r) => `<tr>${r.map((c) => `<td>${esc(c)}</td>`).join('')}</tr>`).join('');
      out.push(`<div class="tbl-wrap"><table class="compare"><thead><tr>${th}</tr></thead><tbody>${trs}</tbody></table></div>`);
      continue;
    }
    if (ln.trim() === '') { flushList(); i++; continue; }
    flushList();
    out.push(`<p>${esc(ln)}</p>`);
    i++;
  }
  flushList();
  return out.join('');
}

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/&quot;/g, '"');
}

// Halaman baca artikel ala portal berita: background putih penuh,
// kolom sempit di tengah, kicker kategori, headline, byline, hero, isi.
export default async function BlogPost({ params }) {
  const { slug } = await params;
  const rows = await db.select().from(Post).where(eq(Post.slug, slug)).limit(1);
  const p = rows[0];
  if (!p) notFound();
  db.update(Post).set({ views: sql`${Post.views} + 1` }).where(eq(Post.slug, slug)).then(() => {}).catch(() => {});
  const more = await db.select()
    .from(Post)
    .where(and(ne(Post.slug, slug), eq(Post.lang, p.lang), eq(Post.category, p.category)))
    .orderBy(desc(Post.date))
    .limit(3);
  const fallback = more.length === 0
    ? await db.select()
        .from(Post)
        .where(and(ne(Post.slug, slug), eq(Post.lang, p.lang)))
        .orderBy(desc(Post.date))
        .limit(3)
    : [];
  const related = more.length > 0 ? more : fallback;
  const shareUrl = `https://techsaasweb.com/blog/${p.slug}`;

  return (
    <div style={{ background: '#fff', borderTop: '1px solid var(--line)' }}>
      <main className="wrap" style={{ paddingTop: '1.6rem', maxWidth: 860 }}>
        <JsonLd data={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: p.title,
          description: p.excerpt,
          datePublished: p.date,
          inLanguage: p.lang === 'en' ? 'en' : 'id-ID',
          articleSection: p.category,
          image: `https://techsaasweb.com${p.thumb}`,
          url: `https://techsaasweb.com/blog/${p.slug}`,
          author: { '@type': 'Organization', name: 'TechSaaSWeb' },
          publisher: { '@type': 'Organization', name: 'TechSaaSWeb' },
        }} />
        <Reveal>
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" style={{ fontSize: '.82rem', color: 'var(--muted)', marginBottom: '1.1rem' }}>
            <a href="/blog" style={{ fontWeight: 600 }}>Blog</a>
            <span aria-hidden> &nbsp;/&nbsp; </span>
            <span>{p.category}</span>
            <span aria-hidden> &nbsp;/&nbsp; </span>
            <span style={{ color: 'var(--body)' }}>{p.lang === 'id' ? 'Indonesia' : 'English'}</span>
          </nav>

          {/* Kicker ala CNN: label seksi + garis merah */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem', marginBottom: '.7rem' }}>
            <span aria-hidden style={{ width: 28, height: 4, borderRadius: 2, background: '#c00', display: 'inline-block' }} />
            <span style={{ fontSize: '.78rem', fontWeight: 800, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--ink)' }}>
              {p.category}
            </span>
          </div>

          <h1 style={{ marginBottom: '.8rem', textWrap: 'balance' }}>{p.title}</h1>
          <p style={{ fontSize: '1.08rem', color: 'var(--muted)', marginBottom: '1.1rem' }}>{p.excerpt}</p>

          {/* Byline */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '.7rem', flexWrap: 'wrap', paddingBottom: '1.1rem', borderBottom: '1px solid var(--line)', marginBottom: '1.3rem' }}>
            <span aria-hidden style={{ width: 38, height: 38, borderRadius: 999, background: 'var(--ink)', color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 800, fontSize: '.85rem' }}>TS</span>
            <div style={{ lineHeight: 1.35 }}>
              <div style={{ fontSize: '.88rem', fontWeight: 700, color: 'var(--ink)' }}>Oleh TechSaaSWeb</div>
              <div style={{ fontSize: '.8rem', color: 'var(--muted)' }}>
                {p.date} · baca {p.read} · {p.lang === 'id' ? 'ID' : 'EN'}
              </div>
            </div>
            <span style={{ flex: 1 }} />
            <span style={{ display: 'flex', gap: '.45rem' }}>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`${p.title} ${shareUrl}`)}`}
                target="_blank" rel="noopener"
                aria-label="Bagikan ke WhatsApp"
                style={{ border: '1px solid var(--line)', borderRadius: 999, padding: '.4rem .8rem', fontSize: '.8rem', fontWeight: 700 }}
              >WA</a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(p.title)}&url=${encodeURIComponent(shareUrl)}`}
                target="_blank" rel="noopener"
                aria-label="Bagikan ke X"
                style={{ border: '1px solid var(--line)', borderRadius: 999, padding: '.4rem .8rem', fontSize: '.8rem', fontWeight: 700 }}
              >X</a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                target="_blank" rel="noopener"
                aria-label="Bagikan ke Facebook"
                style={{ border: '1px solid var(--line)', borderRadius: 999, padding: '.4rem .8rem', fontSize: '.8rem', fontWeight: 700 }}
              >FB</a>
            </span>
          </div>

          {/* Hero */}
          <figure style={{ margin: '0 0 1.8rem' }}>
            <img
              src={p.thumb} alt={p.title}
              style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', borderRadius: 14, boxShadow: 'var(--shadow)' }}
              width={960} height={540} loading="eager" priority="true"
            />
            <figcaption style={{ fontSize: '.78rem', color: 'var(--muted)', marginTop: '.55rem' }}>
              {p.title} — Foto: TechSaaSWeb
            </figcaption>
          </figure>
        </Reveal>

        <Reveal className="prose" dangerouslySetInnerHTML={{ __html: render(p.body) }} />

        <Reveal style={{ marginTop: '2.4rem', background: '#fff', border: '1.5px solid var(--line)', borderRadius: 16, padding: '1.5rem' }}>
          <h3 style={{ marginBottom: '.5rem' }}>Butuh website seperti yang dibahas di sini?</h3>
          <p className="muted" style={{ fontSize: '.9rem', marginBottom: '1rem' }}>
            Kami buatkan sampai online 3–14 hari. Konsultasi gratis.
          </p>
          <a href="/booking" className="m-btn">Mulai Sekarang</a>
        </Reveal>

        {related.length > 0 && (
          <Reveal style={{ marginTop: '2.6rem', paddingBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem', marginBottom: '1rem' }}>
              <span aria-hidden style={{ width: 28, height: 4, borderRadius: 2, background: '#c00', display: 'inline-block' }} />
              <h3 style={{ margin: 0 }}>Artikel terkait</h3>
            </div>
            <div className="grid3">
              {related.map((m) => (
                <a key={m.slug} href={`/blog/${m.slug}`} className="blog-card">
                  <div className="thumb"><img src={m.thumb} alt={m.title} width={960} height={540} loading="lazy" /></div>
                  <div className="body"><div className="blog-meta"><span className="tag">{m.category}</span></div><h3>{m.title}</h3></div>
                </a>
              ))}
            </div>
            <div style={{ marginTop: '1.4rem' }}>
              <a href="/blog" style={{ fontSize: '.88rem', fontWeight: 700 }}>← Semua artikel</a>
            </div>
          </Reveal>
        )}
      </main>
    </div>
  );
}
