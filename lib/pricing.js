// Single source of truth — 3 paket sekali bayar (tahunan), harga IDR.
// Pasar: Indonesia. Pembanding utama: jasawebsite.id (Rp 1,5jt–5jt sekali bayar).
//
// Model: SEKALI BAYAR per tahun. Domain .com/.id + hosting + SSL + infra
// included di semua paket. Full Automation = custom quote → hubungi kontak.
//
// Catatan internal: hosting edge, SSL, DDoS, WAF, DNS, analytics tanpa cookie,
// dan email forwarding adalah kapabilitas bawaan paket — ditulis sebagai
// "included", TANPA menyebut nama platform pihak ketiga manapun.

export const currency = 'IDR';

// Paket Full Automation: harga tidak dipublikasikan → arahkan ke kontak.
export const CONTACT_PLAN_ID = 'automasi';
export const CONTACT_PLAN_LABEL = 'Hubungi kami';
export const CONTACT_HREF = '/booking?plan=automasi';

export const tiers = [
  {
    id: 'hemat',
    name: 'Starter Website',
    price: 1200000,          // IDR sekali bayar / tahun
    priceNote: 'sekali bayar / tahun',
    renewNote: 'Tahun ke-2 cukup setengah harga',
    badge: null,
    forWho: 'Bisnis baru yang ingin segera online',
    cta: 'Pilih Starter',
    highlight: false,
    cats: [
      { cat: 'Website & Domain', feats: [
        { t: '8–15 halaman custom (Beranda, Layanan, Harga, Pemesanan, Blog, Tentang, Portofolio, FAQ)', s: 'Available' },
        { t: 'Domain .com atau .id gratis untuk tahun pertama', s: 'Available' },
        { t: 'Hosting edge global — cepat di mana saja', s: 'Available' },
        { t: 'Tampil sempurna di HP & laptop, loading instan', s: 'Available' },
        { t: 'SSL otomatis (HTTPS) gratis selamanya + proteksi DDoS + firewall', s: 'Available' },
      ]},
      { cat: 'SEO & Performa', feats: [
        { t: 'Mudah ditemukan di Google (SEO dasar termasuk)', s: 'Available' },
        { t: 'Statistik pengunjung tanpa banner cookie yang mengganggu', s: 'Available' },
        { t: 'Form pemesanan/kontak → langsung masuk email Anda', s: 'Available' },
      ]},
      { cat: 'CS AI & Live Chat', feats: [{ t: 'CS AI / Live Chat', s: '—' }] },
      { cat: 'Manajemen & Automasi', feats: [{ t: 'Dashboard pemilik', s: '—' }, { t: 'Automasi booking/appointment', s: '—' }] },
      { cat: 'Dukungan & Update', feats: [
        { t: 'Revisi sepuasnya — dukungan 48 jam', s: 'Available' },
        { t: '1× update konten / bulan (via dashboard)', s: 'Available' },
      ]},
    ],
  },
  {
    id: 'bisnis',
    name: 'Business + CS AI',
    price: 2500000,           // IDR sekali bayar / tahun
    priceNote: 'sekali bayar / tahun',
    renewNote: 'Tahun ke-2 cukup setengah harga',
    badge: 'Paling Populer',
    forWho: 'Butuh penjawab otomatis setiap hari',
    cta: 'Pilih Business',
    highlight: true,
    cats: [
      { cat: 'Website & Domain', feats: [
        { t: 'Semua di Starter', s: 'Available' },
        { t: 'Revisi sepuasnya + prioritas desain', s: 'Available' },
      ]},
      { cat: 'SEO & Performa', feats: [{ t: 'SEO dasar + tool redirect', s: 'Available' }]},
      { cat: 'CS AI & Live Chat', feats: [
        { t: 'Asisten CS AI otomatis — aktif penuh sepanjang tahun', s: 'Available' },
        { t: 'Jawab FAQ instan + teruskan ke WhatsApp Anda', s: 'Available' },
        { t: 'Menyapa, mencatat nama+WA dalam 3 pesan', s: 'Available' },
      ]},
      { cat: 'Manajemen & Automasi', feats: [
        { t: 'Setiap lead terorganisir, notifikasi email instan', s: 'Available' },
        { t: 'Daftar kontak sederhana — tidak ada yang lolos', s: 'Available' },
        { t: 'Automasi appointment', s: '—' },
      ]},
      { cat: 'Dukungan & Update', feats: [{ t: '2× update konten / bulan — dukungan 24 jam', s: 'Available' }]},
    ],
  },
  {
    id: 'automasi',
    name: 'Full Automation',
    price: null,              // custom quote → hubungi kontak
    priceNote: 'Harga sesuai kebutuhan — hubungi kami',
    badge: 'Lengkap',
    forWho: 'Hotel, klinik, restoran yang butuh booking penuh',
    cta: 'Hubungi kami untuk harga',
    highlight: false,
    contactInstead: true,
    cats: [
      { cat: 'Website & Domain', feats: [{ t: 'Semua di Business', s: 'Available' }]},
      { cat: 'SEO & Performa', feats: [{ t: 'SEO lanjutan + laporan', s: 'Available' }]},
      { cat: 'CS AI & Live Chat', feats: [
        { t: 'Asisten CS AI otomatis — kapasitas lebih besar untuk bisnis sibuk', s: 'Available' },
        { t: 'Multibahasa (2 bahasa)', s: 'Available' },
      ]},
      { cat: 'Manajemen & Automasi', feats: [
        { t: 'Booking tanpa dikelola (tanggal, slot, kapasitas)', s: 'Available' },
        { t: 'Daftar tamu untuk booking web (hotel/resto/klinik)', s: 'Available' },
        { t: 'Deposit pembayaran + konfirmasi & reminder otomatis', s: 'Available' },
        { t: 'Sinkron Google Calendar', s: 'Available' },
        { t: 'Dashboard profit + komisi sales + laporan mingguan', s: 'Available' },
      ]},
      { cat: 'Dukungan & Update', feats: [{ t: '4× update / bulan — prioritas + backup harian', s: 'Available' }]},
    ],
  },
];

// Kontrak & pembayaran
export const TERMS = {
  billing: 'sekali bayar',
  // Perpanjangan tahun ke-2 paket Starter & Business: cukup setengah harga.
  renewal: 'Perpanjangan tahun ke-2 cukup setengah harga (Starter & Business)',
  paymentMethods: ['Transfer bank', 'QRIS', 'Virtual Account', 'E-wallet (GoPay/OVO/DANA)'],
  waNumber: '6285113294575',
};

// Kontak untuk paket custom (Full Automation)
export const CONTACT_PHONE = TERMS.waNumber;
export const CONTACT_EMAIL = 'techsaasweb@gmail.com';

export function getTier(id) { return tiers.find(t => t.id === id); }
