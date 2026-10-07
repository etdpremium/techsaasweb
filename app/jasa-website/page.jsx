import { CITIES } from '../../lib/lokasi';
import Reveal from '../../components/Reveal';

export const metadata = {
  title: 'Jasa Pembuatan Website di Seluruh Indonesia | TechSaaSWeb',
  description:
    'Jasa pembuatan website di seluruh Indonesia: website custom 8–15 halaman, CS AI otomatis, domain gratis tahun pertama, online 3–14 hari. Pilih kota Anda untuk info lengkap.',
  alternates: { canonical: '/jasa-website' },
};

// Kelompokkan kota per provinsi sesuai urutan di lib/lokasi.js.
const GROUPS = [];
for (const c of CITIES) {
  let g = GROUPS.find((g) => g.provinsi === c.provinsi);
  if (!g) {
    g = { provinsi: c.provinsi, items: [] };
    GROUPS.push(g);
  }
  g.items.push(c);
}

const tampil = (c) => (c.slug === 'jogja' ? 'Jogja' : c.kota);

export default function JasaWebsiteIndex() {
  return (
    <main className="wrap" style={{ paddingTop: '1.6rem', paddingBottom: '4rem' }}>
      <Reveal style={{ fontSize: '.82rem', marginBottom: '1rem' }}>
        <a href="/" style={{ fontWeight: 600 }}>Beranda</a> / Jasa Website
      </Reveal>

      <Reveal className="list-head">
        <span className="kicker">Jangkauan nasional</span>
        <h1>Jasa Pembuatan Website di Seluruh Indonesia</h1>
        <p className="list-tagline">
          Seluruh proses dikerjakan online — diskusi, pembuatan, hingga serah terima.
          Pilih kota Anda untuk informasi layanan dan cara memesan.
        </p>
      </Reveal>

      <div className="grid3" style={{ marginTop: '1.6rem' }}>
        {GROUPS.map((g) => (
          <Reveal key={g.provinsi} className="m-card flat prov-card">
            <h3>{g.provinsi}</h3>
            <div className="prov-links">
              {g.items.map((c) => (
                <a key={c.slug} href={`/jasa-website/${c.slug}`}>
                  Jasa pembuatan website {tampil(c)}
                </a>
              ))}
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal as="section">
        <div className="cta-band">
          <div>
            <h2>Tidak menemukan kota Anda?</h2>
            <p>Kami melayani seluruh Indonesia secara online. Hubungi kami langsung.</p>
          </div>
          <a href="/booking" className="m-btn">Mulai Pemesanan</a>
        </div>
      </Reveal>
    </main>
  );
}
