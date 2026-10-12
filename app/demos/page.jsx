import { demos } from '../../lib/demos';
import { getListing } from '../../lib/listing';
import Reveal from '../../components/Reveal';
import JsonLd from '../../components/JsonLd';

// Konten intent tinggi: "contoh website [jenis usaha]" — pintu masuk ke 6 demo.
// Sebelumnya /demos adalah redirect ke /#examples → GSC "Page with redirect".
export const metadata = {
  title: 'Contoh Website 6 Jenis Usaha — Klinik, Resto, Properti, Toko Online',
  description:
    'Lihat contoh website jadi untuk klinik gigi, restoran, properti, rental mobil, toko online, dan SaaS — lengkap dengan harga, fitur, dan asisten CS otomatis di setiap halamannya.',
  alternates: { canonical: '/demos' },
};

export default function DemosIndex() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Contoh Website per Jenis Usaha',
    description: metadata.description,
    url: 'https://techsaasweb.com/demos',
    isPartOf: { '@type': 'WebSite', name: 'TechSaaSWeb', url: 'https://techsaasweb.com' },
    hasPart: demos.map((d) => ({
      '@type': 'CreativeWork',
      name: `Contoh website ${d.niche} — ${d.name}`,
      url: `https://techsaasweb.com/demos/${d.slug}`,
      about: d.niche,
    })),
  };

  return (
    <main className="wrap" style={{ paddingTop: '1.6rem', paddingBottom: '4rem' }}>
      <JsonLd data={jsonLd} />

      {/* breadcrumb — sama dengan pola /jasa-website/[kota] */}
      <Reveal style={{ fontSize: '.82rem', marginBottom: '1rem' }}>
        <a href="/" style={{ fontWeight: 600 }}>Beranda</a> / Contoh Website
      </Reveal>

      <Reveal className="sec-head center">
        <span className="kicker">Contoh website</span>
        <h1>Contoh website &amp; informasinya</h1>
        <p>
          6 contoh website jadi untuk jenis usaha yang paling sering kami buatkan.
          Tiap contoh punya halaman lengkap (Beranda, Layanan, Harga, Pemesanan) plus
          asisten CS otomatis yang bisa Anda coba langsung.
        </p>
      </Reveal>

      <div className="shot-grid" style={{ marginTop: '1.8rem' }}>
        {demos.map((d, i) => {
          const L = getListing(d.slug);
          return (
            <Reveal key={d.slug} delay={(i % 3) * 90}>
              <a href={`/demos/${d.slug}`} className="shot-card">
                <div className="shot-frame">
                  <img
                    src={`/demos/${d.slug}.webp`}
                    width={820}
                    height={1094}
                    alt={`Contoh website ${d.niche} — ${d.name}`}
                    loading={i < 3 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                  <span className="shot-tag">{d.niche}</span>
                </div>
                <div className="shot-cap">
                  <strong>{d.name}</strong>
                  <span>{L?.tagline || d.headline}</span>
                </div>
              </a>
            </Reveal>
          );
        })}
      </div>

      <Reveal className="sec-head center" style={{ marginTop: '3rem' }}>
        <h2>Mau contoh yang sesuai usaha Anda?</h2>
        <p>
          Kami membuatkan website custom seperti contoh di atas — domain, hosting, SSL,
          dan asisten CS otomatis sudah termasuk. Lihat harga atau langsung pesan.
        </p>
        <div style={{ display: 'flex', gap: '.7rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1.1rem' }}>
          <a href="/pricing" className="m-btn ghost">Lihat harga</a>
          <a href="/booking" className="m-btn">Pesan website</a>
        </div>
      </Reveal>
    </main>
  );
}
