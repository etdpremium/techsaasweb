// Single source of truth — 3 paket harga penuh muka depan (tahunan), IDR.
// Pasar: Indonesia. Pembanding utama: jasawebsite.id (Rp 1,5jt–5jt).
//
// Model: bayar di depan per tahun. Domain .com/.id + hosting + SSL + infra
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
    priceNote: '/ tahun',
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
    priceNote: '/ tahun',
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

// ── Inheritance (warisan fitur) untuk tabel "Bandingkan paket" ──────────
// Paket lebih tinggi mewarisi semua fitur paket di bawahnya:
//   Starter  → (dasar)
//   Business → warisan semua Starter
//   Full Automation → warisan semua Starter + Business
//
// Tujuan: di tabel perbandingan, kolom Full Automation harus "semua ✓" dan
// kolom Business hampir semua ✓ — bukan dipenuhi "—" hanya karena paket itu
// menulis fitur-nya sebagai "Semua di Starter".
//
// Format baris turunan:
//   { t: '…', s: 'Available' }                     → centang biasa (fitur sendiri)
//   { t: '…', s: 'inherited', from: 'hemat' }      → centang warisan (lebih pudar)
//   { t: '…', s: 'inherited', from: 'bisnis' }     → centang warisan dari Business
//
// "Semua di Starter" / "Semua di Business" tetap dipertahankan sebagai
// baris ringkasan di card (slice 0-7), tapi tabel memakai expandInherited().

const TIER_ORDER = ['hemat', 'bisnis', 'automasi'];
const TIER_LABEL = { hemat: 'Starter', bisnis: 'Business', automasi: 'Full Automation' };

// Salin semua fitur dari paket di bawahnya, lalu timpah dengan fitur sendiri.
export function expandInherited(tierId) {
  const tier = getTier(tierId);
  if (!tier) return [];
  const idx = TIER_ORDER.indexOf(tierId);
  const out = [];
  const seen = new Set();

  // 1) Fitur warisan dari tier di bawah (lebih awal = lebih dasar)
  for (let i = 0; i < idx; i++) {
    const lowerId = TIER_ORDER[i];
    const lower = getTier(lowerId);
    for (const cat of lower.cats) {
      for (const f of cat.feats) {
        if (f.s !== 'Available') continue; // abai-kan baris "—" milik tier bawah
        if (seen.has(f.t)) continue;
        seen.add(f.t);
        out.push({ t: f.t, s: 'inherited', from: lowerId });
      }
    }
  }

  // 2) Fitur sendiri (diutamakan: override warisan dengan status sendiri)
  for (const cat of tier.cats) {
    for (const f of cat.feats) {
      if (seen.has(f.t)) {
        // sudah diwarisi → tingkatkan jadi fitur sendiri kalau Available
        const ex = out.find((x) => x.t === f.t);
        if (f.s === 'Available') { ex.s = 'Available'; delete ex.from; }
        continue;
      }
      seen.add(f.t);
      out.push({ t: f.t, s: f.s === 'Available' ? 'Available' : '—' });
    }
  }

  // 3) Sortir: fitur sendiri dulu, lalu warisan (dari tier terdekat → terjauh)
  const rank = { Available: 0, inherited: 1, '—': 2 };
  out.sort((a, b) => {
    if (rank[a.s] !== rank[b.s]) return rank[a.s] - rank[b.s];
    if (a.s === 'inherited' && b.s === 'inherited') {
      return TIER_ORDER.indexOf(a.from) - TIER_ORDER.indexOf(b.from); // terdekat dulu
    }
    return 0; // jaga urutan asli untuk status sama
  });
  return out;
}

// Versi rata: flatkan per-kategori supaya bisa dikelompokkan ulang di tabel.
export function expandInheritedByCat(tierId) {
  const tier = getTier(tierId);
  if (!tier) return [];
  const idx = TIER_ORDER.indexOf(tierId);
  const out = [];
  const seen = new Set();
  const push = (cat, f, s, from) => {
    if (seen.has(f.t)) return;
    seen.add(f.t);
    out.push({ cat, t: f.t, s, from });
  };
  for (let i = 0; i < idx; i++) {
    const lower = getTier(TIER_ORDER[i]);
    for (const cat of lower.cats) for (const f of cat.feats)
      if (f.s === 'Available') push(cat.cat, f, 'inherited', TIER_ORDER[i]);
  }
  for (const cat of tier.cats) for (const f of cat.feats)
    push(cat.cat, f, f.s === 'Available' ? 'Available' : '—', undefined);
  return out;
}

// Kontrak & pembayaran
export const TERMS = {
  // Perpanjangan tahun ke-2 paket Starter & Business: cukup setengah harga.
  renewal: 'Perpanjangan tahun ke-2 cukup setengah harga (Starter & Business)',
  paymentMethods: ['Transfer bank', 'QRIS', 'Virtual Account', 'E-wallet (GoPay/OVO/DANA)'],
  waNumber: '6285113294575',
};

// Kontak untuk paket custom (Full Automation)
export const CONTACT_PHONE = TERMS.waNumber;
export const CONTACT_EMAIL = 'techsaasweb@gmail.com';

export function getTier(id) { return tiers.find(t => t.id === id); }
