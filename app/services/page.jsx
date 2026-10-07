export const metadata = {
  title: 'Fitur Lengkap: Website, Domain, SEO, CS AI, Booking Otomatis',
  description: 'Detail fitur lengkap: website custom 8–15 halaman, domain .com/.id gratis, hosting cepat, SSL, SEO dasar, CS AI otomatis, booking otomatis & panel pemilik — semuanya sudah tersedia.',
  alternates: { canonical: '/services' },
};
import Reveal from '../../components/Reveal';

const sections = [
  { t: 'Website Custom', d: 'Bukan template pasaran. 8–15 halaman (Beranda, Layanan, Harga, Pemesanan, Blog, Tentang, Portofolio, FAQ) dirancang sesuai jenis usaha Anda.', items: ['Tampil baik di HP & laptop, loading cepat', 'Warna, foto & teks disesuaikan dengan usaha Anda', 'Revisi sepuasnya sampai cocok', 'Batasannya: bukan marketplace, bukan aplikasi berat'], status: 'Tersedia', tone: 'green' },
  { t: 'Domain & Hosting', d: 'Kami carikan domain .com impian Anda, daftarkan (gratis tahun pertama), dan aktifkan keamanannya. Anda langsung dapat alamat website aktif.', items: ['Domain .com/.id gratis tahun pertama, perpanjangan tahun ke-2 cukup setengah harga', 'Bisa pakai domain sendiri (gratis)', 'Hosting cepat, SSL, keamanan, backup harian'], status: 'Tersedia', tone: 'green' },
  { t: 'SEO & Performa', d: 'Mudah ditemukan di Google.', items: ['SEO dasar: judul, deskripsi, peta situs', 'Statistik pengunjung tanpa banner cookie', 'Pengalihan halaman lama, loading cepat', 'SEO lanjutan: audit dan laporan berkala (Automation)'], status: 'Tersedia', tone: 'green' },
  { t: 'CS Otomatis & Live Chat', d: 'CS yang tidak pernah tidur: menyapa pengunjung, menjawab pertanyaan, dan mengantar calon pembeli sampai ke WhatsApp Anda — otomatis setiap hari.', items: ['Online setiap hari — pertanyaan dijawab dalam hitungan detik, bahkan tengah malam', 'Mengubah pengunjung jadi prospek: mencatat nama + WhatsApp + kebutuhan secara otomatis', 'Chat penting diteruskan ke WhatsApp Anda — tidak ada calon pembeli yang lolos', 'Tombol cepat + tulisan bebas — pengunjung bebas pilih cara chat', 'Bila kuota habis otomatis menjadi form WhatsApp — tetap tidak ada yang terlewat', 'Dua bahasa (Automation) — layani pelanggan lokal & asing'], status: 'Business & Automation', tone: 'orange' },
  { t: 'Manajemen & Booking Otomatis', d: 'Nilai utama paket Automation: pelanggan memesan lewat web, Anda tinggal mengelola.', items: ['Daftar prospek (Baru/Dihubungi/Cocok/Menang) + unduh Excel', 'Data kontak tertata (penanggung jawab, status)', 'Booking otomatis: slot kalender, kapasitas, deposit', 'Pengingat & konfirmasi WhatsApp/email otomatis', 'Daftar tamu untuk booking web', 'Sinkron Google Calendar', 'Laporan omzet + komisi mingguan — Automation'], status: 'Tersedia', tone: 'green' },
  { t: 'Dukungan & Update', d: 'Anda fokus jualan, kami urus update.', items: ['Revisi sepuasnya sampai cocok — semua paket', 'Dukungan 24–48 jam, prioritas untuk Automation', 'Backup harian (Automation), mingguan (Business)'], status: 'Tersedia', tone: 'green' },
];

export default function Services() {
  return (
    <main className="wrap" style={{ paddingTop: '2.4rem' }}>
      <Reveal className="sec-head center">
        <span className="kicker">Fitur lengkap</span>
        <h1>Semua fitur, sudah tersedia</h1>
        <p>Tidak ada yang disembunyikan — semua yang tertulis di bawah ini sudah bisa dipakai sesuai paket Anda.</p>
      </Reveal>
      <div className="grid3" style={{ marginTop: '1.8rem' }}>
        {sections.map((m, i) => (
          <Reveal key={m.t} className="m-card" delay={(i % 3) * 90}>
            <span className={`tag ${m.tone}`}>{m.status}</span>
            <h2 style={{ fontSize: '1.15rem', margin: '.7rem 0 .4rem' }}>{m.t}</h2>
            <p className="muted" style={{ fontSize: '.92rem' }}>{m.d}</p>
            <ul className="muted" style={{ fontSize: '.9rem', paddingLeft: '1.1rem', marginTop: '.6rem' }}>
              {m.items.map((it) => <li key={it} style={{ marginBottom: '.35rem' }}>{it}</li>)}
            </ul>
          </Reveal>
        ))}
      </div>
      <Reveal style={{ marginTop: '1.4rem', display: 'flex', gap: '.7rem', flexWrap: 'wrap' }}>
        <a href="/pricing" className="m-btn">Lihat harga lengkap</a>
        <a href="/booking" className="m-btn ghost">Konsultasi gratis</a>
      </Reveal>
    </main>
  );
}
