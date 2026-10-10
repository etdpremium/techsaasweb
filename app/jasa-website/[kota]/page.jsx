import { CITIES, getCity, keunikanKota } from '../../../lib/lokasi';
import { TERMS, CONTACT_EMAIL, tiers } from '../../../lib/pricing';
import Reveal from '../../../components/Reveal';
import JsonLd from '../../../components/JsonLd';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return CITIES.map((c) => ({ kota: c.slug }));
}

export async function generateMetadata({ params }) {
  const { kota } = await params;
  const c = getCity(kota);
  if (!c) return {};
  const nama = c.slug === 'jogja' ? 'Jogja' : c.kota;
  return {
    title: `Website di ${nama} — Custom + CS AI`,
    description: `Website custom + CS AI di ${nama}, ${c.provinsi}. Domain & hosting gratis, online 3–14 hari, proses sepenuhnya online.`,
    alternates: { canonical: `/jasa-website/${c.slug}` },
  };
}

export default async function KotaPage({ params }) {
  const { kota } = await params;
  const c = getCity(kota);
  if (!c) notFound();
  const nama = c.slug === 'jogja' ? 'Jogja' : c.kota;

  const waHref = `https://wa.me/${TERMS.waNumber}?text=${encodeURIComponent(`Halo, saya dari ${nama} dan tertarik dibuatkan website.`)}`;

  const faq = [
    { q: `Apakah melayani ${nama} secara langsung?`, a: `Ya. Seluruh proses dikerjakan online — diskusi, pembuatan, hingga serah terima — jadi Anda di ${nama}, ${c.provinsi} tidak perlu tatap muka.` },
    { q: 'Berapa lama website jadi?', a: 'Online dalam 3–14 hari setelah konsultasi gratis, tergantung paket yang dipilih.' },
    { q: 'Berapa biayanya?', a: 'Harga mulai Rp 1,2 jt. Lihat rincian lengkap di halaman paket.' },
    { q: 'Apakah domain dan hosting termasuk?', a: 'Ya. Domain .com/.id gratis tahun pertama, hosting, dan SSL sudah termasuk di semua paket.' },
    { q: `Bagaimana cara memesan dari ${nama}?`, a: 'Hubungi kami via WhatsApp atau email, atau isi halaman pemesanan. Kami balas dalam 24 jam.' },
  ];

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Beranda', item: 'https://techsaasweb.com/' },
        { '@type': 'ListItem', position: 2, name: 'Jasa Website', item: 'https://techsaasweb.com/jasa-website' },
        { '@type': 'ListItem', position: 3, name: nama, item: `https://techsaasweb.com/jasa-website/${c.slug}` },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    },
  ];

  return (
    <main className="wrap" style={{ paddingTop: '1.6rem', paddingBottom: '4rem' }}>
      <JsonLd data={jsonLd} />
      <Reveal style={{ fontSize: '.82rem', marginBottom: '1rem' }}>
        <a href="/" style={{ fontWeight: 600 }}>Beranda</a> / Jasa Website / {nama}
      </Reveal>

      <Reveal className="list-head">
        <span className="kicker">Melayani {c.provinsi}</span>
        <h1>Jasa Pembuatan Website di {nama}</h1>
        <p className="list-tagline">
          Kami membuatkan website custom dan CS AI otomatis untuk usaha di {nama}, {c.provinsi} —
          domain, hosting, dan SSL sudah termasuk. Seluruh proses dikerjakan online:
          diskusi, pembuatan, hingga serah terima.
        </p>
        <p className="muted" style={{ fontSize: '.92rem', marginTop: '.6rem' }}>
          {keunikanKota(c).intro}
        </p>
        {keunikanKota(c).area.length > 0 && (
          <div style={{ display: 'flex', gap: '.45rem', flexWrap: 'wrap', marginTop: '.8rem' }}>
            {keunikanKota(c).area.map((a) => (
              <span key={a} className="tag">{a} & sekitarnya</span>
            ))}
          </div>
        )}
      </Reveal>

      <Reveal as="section" className="section-xs">
        <div className="sec-head">
          <span className="kicker">Pilih paket</span>
          <h2>Tiga paket sesuai kebutuhan</h2>
        </div>
        <div className="grid3">
          {tiers.map((t) => (
            <div key={t.id} className="m-card flat">
              <h3>{t.name}</h3>
              <p className="muted" style={{ fontSize: '.9rem', margin: '.4rem 0 1rem' }}>{t.forWho}</p>
              <a href="/pricing" className="m-btn sm">Lihat Paket</a>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal as="section" className="section">
        <div className="sec-head">
          <span className="kicker">Cara memesan</span>
          <h2>Dari {nama}, tanpa perlu tatap muka</h2>
        </div>
        <div className="grid3">
          <div className="m-card flat">
            <h3>1. Hubungi kami</h3>
            <p className="muted" style={{ fontSize: '.9rem', margin: 0 }}>Via WhatsApp, email, atau halaman pemesanan.</p>
          </div>
          <div className="m-card flat">
            <h3>2. Konsultasi gratis</h3>
            <p className="muted" style={{ fontSize: '.9rem', margin: 0 }}>Ceritakan usaha dan kebutuhan website Anda.</p>
          </div>
          <div className="m-card flat">
            <h3>3. Website online</h3>
            <p className="muted" style={{ fontSize: '.9rem', margin: 0 }}>Jadi dalam 3–14 hari, lalu diserahterimakan.</p>
          </div>
        </div>
      </Reveal>

      <Reveal as="section" className="section">
        <div className="sec-head center">
          <span className="kicker">Tanya jawab</span>
          <h2>Yang sering ditanyakan dari {nama}</h2>
        </div>
        <div style={{ maxWidth: 820, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '.7rem' }}>
          {faq.map((item) => (
            <div key={item.q} className="m-card flat" style={{ padding: '1.05rem 1.25rem' }}>
              <strong style={{ display: 'block', marginBottom: '.3rem', color: 'var(--ink)' }}>{item.q}</strong>
              <p className="muted" style={{ margin: 0, fontSize: '.92rem' }}>{item.a}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal as="section">
        <div className="cta-band">
          <div>
            <h2>Siap punya website untuk usaha di {nama}?</h2>
            <p>Hubungi kami sekarang — kami siapkan hingga online.</p>
          </div>
          <div className="row">
            <a href={waHref} target="_blank" rel="noopener noreferrer" className="m-btn">Chat WhatsApp</a>
            <a href="/booking" className="m-btn ghost" style={{ background: 'transparent', color: '#fff', borderColor: 'rgba(255,255,255,.35)' }}>Mulai Pemesanan</a>
          </div>
        </div>
      </Reveal>

      <Reveal style={{ marginTop: '2rem', fontSize: '.85rem' }} className="muted">
        Email: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> · Juga melayani:{' '}
        {CITIES.filter((x) => x.slug !== c.slug).slice(0, 8).map((x, i, arr) => (
          <span key={x.slug}>
            <a href={`/jasa-website/${x.slug}`}>{x.slug === 'jogja' ? 'Jogja' : x.kota}</a>
            {i < arr.length - 1 ? ', ' : ''}
          </span>
        ))}
      </Reveal>
    </main>
  );
}
