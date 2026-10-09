import { demos } from '../lib/demos';
import { CITIES } from '../lib/lokasi';
import Image from 'next/image';
import Reveal from '../components/Reveal';
import HeroArt from '../components/HeroArt';
import Faq from '../components/Faq';
import { QA as FAQ_DATA } from '../lib/faq';
import JsonLd from '../components/JsonLd';
import NewsletterForm from '../components/NewsletterForm';
import PricingTeaser from '../components/PricingTeaser';
import { Zap, MessageSquare, CalendarCheck, BarChart3, Globe, ShieldCheck, Check } from 'lucide-react';
import { juta } from '../lib/format';

export const metadata = {
  title: {
    absolute: 'Jasa Pembuatan Website Murah + Chatbot CS AI Otomatis — TechSaaSWeb',
  },
  description: 'Jasa pembuatan website custom untuk usaha Anda — chatbot CS AI otomatis, domain, hosting, dan SSL sudah termasuk. Online 3–14 hari, mulai Rp 1,2 juta.',
  alternates: { canonical: '/' },
};

const FAQ_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_DATA.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
};


// Mockup komposit lokal (1 gambar hi-res per demo: homepage + admin + chatbot + booking).
const SHOTS = {
  klinik: '/demos/klinik.webp',
  properti: '/demos/properti.webp',
  saas: '/demos/saas.webp',
  resto: '/demos/resto.webp',
  rental: '/demos/rental.webp',
  ecommerce: '/demos/ecommerce.webp',
};

/* Logo jenis usaha — WebP transparan (76px, retina untuk 32-34px tampil). */
const NICHES = [
  { src: '/niches/niche-klinik-gigi.webp', w: 217, h: 76, alt: 'Klinik Gigi' },
  { src: '/niches/niche-perusahaan.webp', w: 144, h: 76, alt: 'PT & Perusahaan' },
  { src: '/niches/niche-restoran.webp', w: 230, h: 76, alt: 'Restoran' },
  { src: '/niches/niche-hotel-villa.webp', w: 341, h: 76, alt: 'Hotel & Villa' },
  { src: '/niches/niche-toko-online.webp', w: 248, h: 76, alt: 'Toko Online' },
  { src: '/niches/niche-micro-saas.webp', w: 276, h: 76, alt: 'Micro-SaaS' },
];

const FEATURES = [
  { ico: Globe, n: '01', t: 'Website custom sesuai usaha', d: '8–15 halaman sesuai jenis usaha Anda — klinik, properti, restoran, rental, hotel, atau toko. Bukan template pasaran.' },
  { ico: Zap, n: '02', t: 'Cepat & mudah ditemukan', d: 'Domain .com/.id, hosting, SSL, dan SEO dasar sudah termasuk. Tampil baik di HP maupun laptop.' },
  { ico: MessageSquare, n: '03', t: 'CS otomatis setiap hari', d: 'Menjawab pertanyaan umum, mencatat nama dan WhatsApp, lalu meneruskannya kepada Anda.' },
  { ico: CalendarCheck, n: '04', t: 'Sistem booking otomatis', d: 'Penjadwalan dan pemesanan otomatis untuk semua jenis bisnis — tanggal, slot, kapasitas, dan pengingat tersusun rapi tanpa catat manual.' },
  { ico: BarChart3, n: '05', t: 'Panel pantau usaha', d: 'Pesanan, chat pelanggan, dan kuota terlihat dalam satu layar.' },
  { ico: ShieldCheck, n: '06', t: 'Jujur & terbuka', d: 'Semua yang termasuk ditulis terbuka. Tidak ada biaya uang muka yang membebankan pelanggan.' },
];

/* Kota & blog yang ditautkan dari homepage — distribusi link equity dari
   halaman terkuat ke 86 halaman yang sebelumnya tidak dapat link sama sekali. */
const KOTA_UTAMA = new Set([
  'jakarta', 'bogor', 'depok', 'tangerang', 'bekasi',
  'bandung', 'semarang', 'solo', 'jogja', 'surabaya',
  'malang', 'denpasar', 'medan', 'palembang', 'makassar', 'balikpapan',
]);
const KOTA_TEASER = CITIES.filter((c) => KOTA_UTAMA.has(c.slug));
const KOTA_LAIN = CITIES.filter((c) => !KOTA_UTAMA.has(c.slug)).slice(0, 14);
const BLOG_TEASER = [
  {
    slug: 'harga-jasa-website-komponen-jujur',
    title: 'Harga Jasa Website: Bongkar Komponen Biayanya',
    excerpt: 'Domain, hosting, desain, maintenance — apa yang wajar Anda bayar dan mana yang markup.',
  },
  {
    slug: 'seo-lokal-jasa-kota',
    title: 'SEO Lokal: Cara Muncul di "Jasa X + Kota Anda"',
    excerpt: '5 fondasi agar pencarian "jasa service AC Bandung" yang muncul adalah website Anda.',
  },
  {
    slug: 'chatbot-rule-based-vs-ai-umkm',
    title: 'Chatbot Rule-Based vs AI: Mana yang Cocok untuk UMKM?',
    excerpt: 'Tombol klik-klik atau AI yang paham bahasa? Pilih yang tidak menyiksa pelanggan Anda.',
  },
  {
    slug: 'kecepatan-website-pagepeed-umkm',
    title: 'Kecepatan Website & PageSpeed: Panduan Praktis UMKM',
    excerpt: 'Cara membaca skor PageSpeed dengan benar dan 6 perbaikan tercepat tanpa coding.',
  },
  {
    slug: 'google-business-profile-15-menit',
    title: 'Lengkapi Google Business Profile dalam 15 Menit',
    excerpt: 'Checklist profil Google yang membuat usaha Anda muncul di Maps saat dicari "terdekat".',
  },
  {
    slug: 'domain-com-vs-id-bisnis',
    title: 'Domain .com vs .id: Mana yang Tepat untuk Bisnis Anda?',
    excerpt: 'Harga, syarat dokumen, dan kesan pelanggan — perbandingan jujur .com vs .id.',
  },
];

export default function Home() {
  return (
    <main className="wrap">
      <JsonLd data={FAQ_JSONLD} />
      {/* HERO — seimbang: website custom terjangkau + CS otomatis, tanpa angka 24/7, tanpa harga */}
      <section className="hero">
        <div>
          <span className="kicker">Jasa pembuatan website + chatbot CS</span>
          <h1>Jasa Pembuatan Website Murah dengan <span className="hl">Chatbot CS Otomatis</span></h1>
          <p className="lead">
            Website custom 8–15 halaman untuk usaha Anda, gratis domain tahun
            pertama, plus chatbot CS AI otomatis yang menjawab pelanggan setiap
            hari. Online 3–14 hari, mulai Rp 1,2 juta sekali bayar.
          </p>
          <div className="hero-ctas">
            <a href="/services" className="m-btn">Lihat Layanan</a>
            <a href="#examples" className="m-btn ghost">Lihat Contoh</a>
          </div>
          <div className="hero-proof">
            <div style={{ display: 'flex', gap: '.55rem', alignItems: 'flex-start', textAlign: 'left' }}>
              <span aria-hidden style={{ flex: 'none', width: 24, height: 24, borderRadius: 999, background: 'linear-gradient(135deg,#34D399,#059669)', color: '#fff', display: 'grid', placeItems: 'center', marginTop: 1, boxShadow: '0 2px 8px rgba(5,150,105,.35), inset 0 1px 1px rgba(255,255,255,.4)' }}><Check size={13} strokeWidth={3.5} /></span>
              <span><b>8–15</b>Website Custom</span>
            </div>
            <div style={{ display: 'flex', gap: '.55rem', alignItems: 'flex-start', textAlign: 'left' }}>
              <span aria-hidden style={{ flex: 'none', width: 24, height: 24, borderRadius: 999, background: 'linear-gradient(135deg,#34D399,#059669)', color: '#fff', display: 'grid', placeItems: 'center', marginTop: 1, boxShadow: '0 2px 8px rgba(5,150,105,.35), inset 0 1px 1px rgba(255,255,255,.4)' }}><Check size={13} strokeWidth={3.5} /></span>
              <span><b>CS Otomatis</b>Siap setiap hari</span>
            </div>
            <div style={{ display: 'flex', gap: '.55rem', alignItems: 'flex-start', textAlign: 'left' }}>
              <span aria-hidden style={{ flex: 'none', width: 24, height: 24, borderRadius: 999, background: 'linear-gradient(135deg,#34D399,#059669)', color: '#fff', display: 'grid', placeItems: 'center', marginTop: 1, boxShadow: '0 2px 8px rgba(5,150,105,.35), inset 0 1px 1px rgba(255,255,255,.4)' }}><Check size={13} strokeWidth={3.5} /></span>
              <span><b>Domain .com/.id</b>Gratis Tahun Pertama</span>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <HeroArt />
        </div>
      </section>

      {/* NICHE BAND — pita navy + marquee chip usaha (lantai hero) */}
      <section className="niche-band" aria-label="Jenis usaha yang kami layani">
        <div className="nm-inner">
          <p className="nm-label">Untuk beragam jenis usaha</p>
          <div className="niche-marquee">
            <div className="nm-track">
              {[0, 1].map((copy) => (
                <div key={copy} className="nm-group" aria-hidden={copy === 1}>
                  {NICHES.map((n) => (
                    <span key={n.src} className="nm-item nm-logo">
                      <Image src={n.src} alt={copy === 1 ? '' : n.alt} width={n.w} height={n.h} loading="lazy" sizes="240px" />
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE GRID — 6 simpul terhubung tali cahaya */}
      <Reveal as="section" className="section feat-sec">
        <div className="sec-head center light">
          <span className="kicker">Semua dalam satu layanan</span>
          <h2>Satu layanan untuk semua kebutuhan online Anda</h2>
          <p>Website, asisten CS, booking, dan dashboard — terhubung dalam satu sistem yang rapi.</p>
        </div>
        <div className="feat-grid">
          <svg className="feat-wire" viewBox="0 0 300 200" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="featGlow" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#5B8DEF" />
                <stop offset=".5" stopColor="#5EEAD4" />
                <stop offset="1" stopColor="#5B8DEF" />
              </linearGradient>
            </defs>
            <path className="wire-base" d="M-10,50 H250 V150 H-10" />
            <path className="wire-flow" d="M-10,50 H250 V150 H-10" />
          </svg>
          {FEATURES.map((f, i) => (
            <Reveal key={f.t} delay={(i % 3) * 90} className="feat-card feat-node">
              <span className="feat-num" aria-hidden="true">{f.n}</span>
              <div className="ico"><f.ico size={22} /></div>
              <h3>{f.t}</h3>
              <p>{f.d}</p>
            </Reveal>
          ))}
        </div>
      </Reveal>

      {/* DEMOS — galeri screenshot */}
      <Reveal as="section" className="section" id="examples">
        <div className="sec-head">
          <div className="row">
            <div>
              <span className="kicker">Contoh website</span>
              <h2>Contoh website &amp; informasinya</h2>
              <p>Lihat foto dan informasi tiap contoh sesuai jenis usahanya.</p>
            </div>
          </div>
        </div>
        <div className="shot-grid">
          {demos.map((d, i) => {
            const src = SHOTS[d.slug];
            return (
              <Reveal key={d.slug} delay={(i % 3) * 90}>
                <a href={`/demos/${d.slug}`} className="shot-card">
                  <div className="shot-frame">
                    <img
                      src={src}
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
                    <span>{d.headline}</span>
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>
      </Reveal>

      {/* CTA BAND */}
      <Reveal as="section">
        <div className="cta-band">
          <div>
            <h2>Website Anda online dalam <span className="hl">7 hari</span></h2>
            <p>Ceritakan kebutuhan usaha Anda dalam konsultasi gratis — sisanya kami siapkan hingga serah terima.</p>
          </div>
          <a href="/booking" className="m-btn light">Mulai Sekarang</a>
        </div>
      </Reveal>

      <Reveal as="section" className="section">
        <div className="sec-head center">
          <span className="kicker">Harga sederhana</span>
          <h2>Tiga paket sesuai kebutuhan</h2>
          <p>Starter untuk website saja, Business tambah CS otomatis, Automation tambah booking penuh. Domain dan pembuatan sudah termasuk di semua paket.</p>
        </div>
        <PricingTeaser />
      </Reveal>

      <Reveal as="section" className="section">
        <div className="sec-head center">
          <span className="kicker">Kata klien</span>
          <h2>Cerita pemilik usaha yang memakai layanan kami</h2>
        </div>
        <WallOfLove />
      </Reveal>

      <Reveal as="section" className="section" id="lokasi">
        <div className="sec-head center">
          <span className="kicker">Lokasi</span>
          <h2>Jasa pembuatan website untuk kota Anda</h2>
          <p>Seluruh proses online, tapi halaman tiap kota berisi info lokal spesifik: area, jangkauan, dan contoh usaha di kota tersebut.</p>
        </div>
        <div className="loc-grid">
          {KOTA_TEASER.map((c) => (
            <a key={c.slug} href={`/jasa-website/${c.slug}`} className="loc-card">
              <span className="loc-name">{c.kota}</span>
              <span className="loc-sub">{c.provinsi}</span>
              <span className="loc-go">Website di {c.kota}</span>
            </a>
          ))}
        </div>
        <p className="loc-more">
          Lihat juga:{' '}
          {KOTA_LAIN.map((c, i) => (
            <span key={c.slug}>
              <a href={`/jasa-website/${c.slug}`}>{c.kota}</a>
              {i < KOTA_LAIN.length - 1 ? ' · ' : ''}
            </span>
          ))}
          {' '}— <a href="/jasa-website">semua {CITIES.length} kota</a>.
        </p>
      </Reveal>

      <Reveal as="section" className="section faq-sec">
        <div className="sec-head center">
          <span className="kicker">FAQ</span>
          <h2>Pertanyaan yang sering diajukan</h2>
          <p>Jawaban singkat untuk hal yang paling sering ditanyakan calon pelanggan.</p>
        </div>
        <Faq />
      </Reveal>

      <Reveal as="section" className="section" id="artikel">
        <div className="sec-head center">
          <span className="kicker">Blog</span>
          <h2>Pelajari website &amp; AI sebelum memesan</h2>
          <p>Panduan singkat untuk pemilik usaha: dari harga jasa website, SEO lokal, sampai memilih chatbot.</p>
        </div>
        <div className="loc-grid">
          {BLOG_TEASER.map((b) => (
            <a key={b.slug} href={`/blog/${b.slug}`} className="loc-card">
              <span className="loc-name">{b.title}</span>
              <span className="loc-sub">{b.excerpt}</span>
              <span className="loc-go">Baca artikel</span>
            </a>
          ))}
        </div>
      </Reveal>

      <Reveal as="section">
        <div className="newsletter-band">
          <h2>Siap menaikkan omzet?</h2>
          <p>Tips website tiap minggu.</p>
          <NewsletterForm />
        </div>
      </Reveal>
    </main>
  );
}

const WALL = [
  { n: 'Siti Rahayu', r: 'Pemilik Klinik Gigi, Jakarta Selatan', t: 'Pertanyaan pasien di luar jam praktik tetap terjawab otomatis. Sangat membantu operasional harian kami.', img: '/wall/siti-rahayu.webp' },
  { n: 'Budi Santoso', r: 'Pemilik Toko Online, Bandung', t: 'Awalnya khawatir ribet, ternyata prosesnya dipandu dari awal sampai website jadi.', img: '/wall/budi-santoso.webp' },
  { n: 'Dewi Lestari', r: 'Pemilik Klinik, Surabaya', t: 'Website klinik terlihat modern dan pasien lebih mudah mencari informasi. Pemesanan online berjalan lancar.', img: '/wall/dewi-lestari.webp' },
  { n: 'Ahmad Hidayat', r: 'Agen Properti, Yogyakarta', t: 'Jadwal kunjungan Sabtu tertata sendiri. Saya tinggal datang, chat dan konfirmasi sudah diurus.', img: '/wall/ahmad-hidayat.webp' },
  { n: 'Rizky Pratama', r: 'Pemilik SaaS, Jakarta', t: 'Pertanyaan calon pelanggan terjawab dalam hitungan detik, bahkan di luar jam kerja.', img: '/wall/rizky-pratama.webp' },
  { n: 'Lina Wati', r: 'Pemilik Restoran, Semarang', t: 'Pengingat otomatis mengurangi kursi kosong karena tamu lupa datang.', img: '/wall/lina-wati.webp' },
];

function WallOfLove() {
  return (
    <div className="wall">
      {WALL.map((w, i) => (
        <Reveal key={w.n} className="wall-card" delay={(i % 3) * 90}>
          “{w.t}”
          <div className="who">
            <img className="avatar photo" src={w.img} alt={`Foto ${w.n}`} width={36} height={36} loading="lazy" />
            <span><strong>{w.n}</strong><br /><span className="role">{w.r}</span></span>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
