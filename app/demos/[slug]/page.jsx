import { demos, getDemo } from '../../../lib/demos';
import { getListing } from '../../../lib/listing';
import { TERMS, CONTACT_EMAIL } from '../../../lib/pricing';
import Reveal from '../../../components/Reveal';
import PagePicker from '../../../components/PagePicker';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return demos.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const d = getDemo(slug);
  if (!d) return {};
  return {
    // sama dengan blog: hindari suffix "+14 char" kalau title sudah panjang
    title: `Contoh Website ${d.niche} — ${d.name}`.length > 46
      ? { absolute: `Website ${d.niche}: ${d.name}` }
      : `Contoh Website ${d.niche} — ${d.name}`,
    description: (() => {
      const base = `${getListing(slug)?.tagline || d.headline} Lihat isi setiap halaman, cara kerja asisten, dan fasilitas yang termasuk.`;
      return base.length > 160 ? base.slice(0, 157).trim() + '…' : base;
    })(),
    keywords: d.keywords,
    alternates: { canonical: `/demos/${slug}` },
  };
}

export default async function DemoPage({ params }) {
  const { slug } = await params;
  const d = getDemo(slug);
  const L = getListing(slug);
  if (!d || !L) notFound();

  const waHref = `https://wa.me/${TERMS.waNumber}?text=${encodeURIComponent(`Halo, saya tertarik dibuatkan website seperti contoh ${d.name}.`)}`;

  return (
    <main className="wrap" style={{ paddingTop: '1.6rem', paddingBottom: '4rem' }}>
      {/* breadcrumb */}
      <Reveal style={{ fontSize: '.82rem', marginBottom: '1rem' }}>
        <a href="/#examples" style={{ fontWeight: 600 }}>Contoh</a> / {d.niche}
      </Reveal>

      {/* ---- header: judul + tag + deskripsi + tanggal ---- */}
      <Reveal className="list-head">
        <h1>{d.name}</h1>
        <div className="list-tags">
          <span className="tag"><span className="dot" />Website {d.niche}</span>
          <span className="tag dark">Contoh</span>
        </div>
        <p className="list-tagline">{L.tagline}</p>
        <div className="list-metrics">
          <div className="list-metric"><b>8–15</b><span>Halaman custom</span></div>
          <div className="list-metric"><b>3–14 hari</b><span>Sampai online</span></div>
          <div className="list-metric"><b>Gratis</b><span>Domain thn pertama</span></div>
        </div>
        <div className="list-date">
          <span className="muted">Dipublikasikan</span> <strong>{L.published}</strong>
        </div>
      </Reveal>

      {/* ---- gambar utama: mockup komposit (homepage + admin + chatbot + booking) ---- */}
      <Reveal className="list-hero-img" delay={120}>
        <img
          src={`/demos/${d.slug}.webp`}
          alt={`Mockup website ${d.name} (${d.niche}): halaman utama, panel pemilik, chatbot, dan booking otomatis`}
          width={1088} height={1456} loading="lazy"
        />
      </Reveal>

      <div className="list-cols">
        {/* ---- kolom utama: overview + detail cards ---- */}
        <div className="list-main">
          <Reveal className="m-card">
            <h2 className="list-sec">Ringkasan</h2>
            <div className="list-overview">
              {L.overview.map(([t, body]) => (
                <div key={t} className="ov-block">
                  <h3>{t}</h3>
                  <p>{body}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal className="m-card">
            <h2 className="list-sec">Isi setiap halaman</h2>
            <div className="page-list">
              <div><b>Beranda</b><span>«{d.headline}» — janji utama di bagian atas, bukti di bawahnya.</span></div>
              <div><b>Layanan / Menu</b><span>Semua jasa/produk dicantumkan dengan harga rupiah yang sebenarnya.</span></div>
              <div><b>Harga</b><span>{d.subId || d.sub}</span></div>
              <div><b>Pemesanan / Kontak</b><span>{d.formTitle} — satu formulir yang menyelesaikan penjualan.</span></div>
              <div><b>Blog</b><span>Satu artikel setiap minggu yang menjawab pertanyaan pengunjung.</span></div>
            </div>
          </Reveal>

          <Reveal className="m-card">
            <h2 className="list-sec">Pilih halaman untuk website Anda</h2>
            <p className="muted" style={{ fontSize: '.9rem', marginTop: '-.4rem' }}>
              Centang halaman yang Anda mau — request dikirim ke pemesanan.
            </p>
            <PagePicker demoSlug={d.slug} demoName={d.name} />
          </Reveal>

          <Reveal className="m-card">
            <h2 className="list-sec">Cara kerja asisten</h2>
            <div className="chat-demo">
              <div className="chat-demo-head">
                <strong>Elfaent</strong><span className="dot-live" /> <span className="muted">membalas otomatis</span>
              </div>
              {(d.chatId || [
                { me: false, text: d.greetId || d.greeting },
                { me: true, text: (d.faqId || d.faq[0])?.q || 'Berapa harganya?' },
                { me: false, text: (d.faqId || d.faq[0])?.a || 'Siap, hubungi kami.' },
              ]).map((m, i) => (
                <div key={i} className={m.me ? 'msg-out' : 'msg-in'}>{m.text}</div>
              ))}
              <div className="quickrow">
                {(d.quickId || d.quick).map((q) => (
                  <button key={q} type="button" tabIndex={-1}>{q}</button>
                ))}
              </div>
            </div>
            <p className="muted" style={{ fontSize: '.88rem', marginTop: '1rem', marginBottom: 0 }}>
              Dilengkapi harga, jam buka, dan kebijakan asli usaha Anda. Pertanyaan umum dijawab instan. Bila kuota habis, otomatis menjadi formulir — tidak ada yang terlewat.
            </p>
          </Reveal>
        </div>

        {/* ---- sidebar: fasilitas ---- */}
        <aside className="list-side">
          <Reveal className="m-card" delay={80}>
            <h3 className="list-sec sm">Sudah termasuk</h3>
            <ul className="incl-list">
              <li>✓ Website custom 8–15 halaman</li>
              <li>✓ Domain gratis tahun pertama</li>
              <li>✓ SSL + hosting sudah termasuk</li>
              <li>✓ CS AI otomatis (paket Business)</li>
              <li>✓ Panel pemilik</li>
              <li>✓ SEO dasar + sitemap</li>
            </ul>
          </Reveal>

          <Reveal className="m-card price-side">
            <div className="price-holder">
              <h3 style={{ fontSize: '1.35rem', lineHeight: 1.3 }}>Ingin website seperti ini?</h3>
              <div className="muted" style={{ fontSize: '.82rem' }}>Hubungi kami via WhatsApp atau email</div>
            </div>
            <a href={waHref} target="_blank" rel="noopener noreferrer" className="m-btn block" style={{ textDecoration: 'none' }}>Chat WhatsApp</a>
            <a href={`mailto:${CONTACT_EMAIL}`} className="m-btn ghost block" style={{ textDecoration: 'none', marginTop: '.6rem' }}>Kirim Email</a>
          </Reveal>
        </aside>
      </div>

      {/* ---- fakta singkat tiap kartu ---- */}
      <div className="list-detail-grid">
        {[
          ...L.detailCards.map(([t, body]) => ({ t, body })),
          { t: 'Bisa dikembangkan', body: L.growth },
          { t: 'Dukungan', body: L.support },
        ].map((c) => (
          <Reveal key={c.t} className={`m-card chip-card${c.dark ? ' dark-card' : ''}`}>
            <h3>{c.t}</h3>
            <p>{c.body}</p>
          </Reveal>
        ))}
      </div>

      <Reveal as="section">
        <div className="cta-band">
          <div>
            <h2>Ingin website seperti ini?</h2>
            <p>Ceritakan kebutuhan usaha Anda — hubungi kami via WhatsApp atau email, kami siapkan hingga online.</p>
          </div>
          <div className="row">
            <a href={waHref} target="_blank" rel="noopener noreferrer" className="m-btn">Chat WhatsApp</a>
            <a href={`mailto:${CONTACT_EMAIL}`} className="m-btn ghost" style={{ background: 'transparent', color: '#fff', borderColor: 'rgba(255,255,255,.35)' }}>Kirim Email</a>
          </div>
        </div>
      </Reveal>
    </main>
  );
}
