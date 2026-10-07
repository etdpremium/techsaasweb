// Konten detail per demo — bahasa Indonesia, profesional, tanpa klaim palsu.
// Dipakai di /demos/[slug] (header, sidebar kontak, overview, kartu detail, CTA).
// Catatan: tanpa harga (harga hanya di /pricing), tanpa metrik hasil,
// tanpa menyebut nama asisten internal.

export const LISTING = {
  klinik: {
    tagline: 'Contoh website klinik gigi yang menerima pendaftaran kapan pun.',
    published: 'Maret 2026',
    overview: [
      ['Bentuk website', 'Website klinik 8–15 halaman berisi jadwal praktik, daftar layanan, dan formulir pendaftaran yang sederhana.'],
      ['Cara kerja', 'Pengunjung melihat jadwal dan layanan, bertanya lewat CS otomatis di luar jam praktik, lalu meninggalkan nama dan WhatsApp. Data masuk ke panel pemilik.'],
      ['Yang termasuk', 'Website custom, domain gratis tahun pertama, SSL + hosting, CS AI otomatis (paket Business), dan panel pemilik.'],
    ],
    detailCards: [
      ['Cocok untuk', 'Klinik yang sering kehilangan calon pasien di luar jam praktik.'],
      ['Yang perlu disiapkan', 'Jadwal praktik, daftar layanan dan harga, serta nomor WhatsApp admin.'],
      ['Alur pendaftaran', 'Pengunjung mengisi nama dan WhatsApp — admin mengonfirmasi jadwal.'],
    ],
    growth: 'Pengingat jadwal otomatis dan permintaan ulasan setelah kunjungan.',
    support: 'Panduan penggunaan + serah terima. Dukungan prioritas pada paket Business dan Automation.',
  },

  properti: {
    tagline: 'Contoh website agen properti yang mengatur jadwal survei otomatis.',
    published: 'Maret 2026',
    overview: [
      ['Bentuk website', 'Website agen properti 8–15 halaman berisi katalog unit, kisaran harga, dan formulir pengajuan survei.'],
      ['Cara kerja', 'Pengunjung melihat unit dan harga secara terbuka, memilih jadwal survei, lalu meninggalkan nama dan WhatsApp. Agen cukup mengonfirmasi.'],
      ['Yang termasuk', 'Website custom, domain gratis tahun pertama, SSL + hosting, halaman katalog, CS AI otomatis, dan panel pemilik.'],
    ],
    detailCards: [
      ['Cocok untuk', 'Agen independen dengan 1–3 staf yang rutin mengantar survei.'],
      ['Yang perlu disiapkan', 'Daftar unit, kisaran harga, foto, dan jadwal survei.'],
      ['Alur survei', 'Pengunjung memilih slot waktu — agen mengonfirmasi sekali sentuh.'],
    ],
    growth: 'Pengingat untuk prospek lama dan daftar notifikasi penurunan harga.',
    support: 'Panduan penggunaan + serah terima. Dukungan prioritas pada paket Business dan Automation.',
  },

  saas: {
    tagline: 'Contoh website SaaS yang menjelaskan pilihan paket dengan jelas.',
    published: 'Februari 2026',
    overview: [
      ['Bentuk website', 'Website pemasaran SaaS dengan halaman harga dan alur pendaftaran trial.'],
      ['Cara kerja', 'CS otomatis menanyakan kebutuhan pengunjung, menyarankan paket yang sesuai, lalu mencatat kontak untuk ditindaklanjuti.'],
      ['Yang termasuk', 'Website custom, domain gratis tahun pertama, SSL + hosting, halaman harga, CS AI otomatis, dan panel pemilik.'],
    ],
    detailCards: [
      ['Cocok untuk', 'Founder yang menjalankan pemasaran sendiri tanpa tim sales.'],
      ['Yang perlu disiapkan', 'Daftar paket dan harga, keunggulan tiap paket, dan alur trial.'],
      ['Alur pendaftaran', 'Pengunjung meninggalkan email kerja — akun trial dibuatkan.'],
    ],
    growth: 'Balasan cepat untuk perbandingan kompetitor dan kalkulator biaya.',
    support: 'Panduan penggunaan + serah terima. Dukungan prioritas pada paket Automation.',
  },

  resto: {
    tagline: 'Contoh website restoran yang menerima reservasi kapan pun.',
    published: 'April 2026',
    overview: [
      ['Bentuk website', 'Website restoran berisi menu, jam buka, dan formulir reservasi — tanpa perlu telepon.'],
      ['Cara kerja', 'Pengunjung memilih jumlah tamu dan jam, mengisi nama dan WhatsApp, lalu menerima konfirmasi. Pengingat terkirim otomatis.'],
      ['Yang termasuk', 'Website custom, domain gratis tahun pertama, SSL + hosting, halaman menu, formulir reservasi, CS AI otomatis, dan panel pemilik.'],
    ],
    detailCards: [
      ['Cocok untuk', 'Restoran independen yang sering kehilangan reservasi karena pesan tak terjawab.'],
      ['Yang perlu disiapkan', 'Menu dan harga, jam buka, serta kapasitas meja.'],
      ['Alur reservasi', 'Pengunjung mengisi formulir — meja tercatat di panel pemilik.'],
    ],
    growth: 'Daftar tunggu untuk malam yang penuh dan permintaan ulasan setelah kunjungan.',
    support: 'Panduan penggunaan + serah terima. Dukungan prioritas pada paket Business dan Automation.',
  },

  rental: {
    tagline: 'Contoh website rental mobil dengan pemesanan dan deposit online.',
    published: 'April 2026',
    overview: [
      ['Bentuk website', 'Website rental mobil berisi daftar armada, harga harian, dan formulir pemesanan.'],
      ['Cara kerja', 'Penyewa memilih tanggal dan jenis mobil, mengisi data dan deposit lewat formulir, lalu menerima konfirmasi. Berkas perjanjian disiapkan otomatis.'],
      ['Yang termasuk', 'Website custom, domain gratis tahun pertama, SSL + hosting, halaman armada, formulir deposit, CS AI otomatis, dan panel pemilik.'],
    ],
    detailCards: [
      ['Cocok untuk', 'Pemilik armada kecil (3–20 mobil) yang kehilangan sewa akhir pekan.'],
      ['Yang perlu disiapkan', 'Daftar armada, harga harian, dan syarat sewa.'],
      ['Alur pemesanan', 'Penyewa mengisi tanggal dan tipe mobil — unit ditahan sementara.'],
    ],
    growth: 'Pengingat pengembalian otomatis dan penawaran sewa lanjutan.',
    support: 'Panduan penggunaan + serah terima. Dukungan prioritas pada paket Business dan Automation.',
  },

  ecommerce: {
    tagline: 'Contoh toko online kecil dengan konfirmasi pesanan otomatis.',
    published: 'Mei 2026',
    overview: [
      ['Bentuk website', 'Toko online ringkas untuk katalog kecil — cepat, nyaman di HP, dan dapat menutup pesanan tanpa admin.'],
      ['Cara kerja', 'Pembeli checkout lalu langsung menerima konfirmasi WhatsApp. CS otomatis menjawab pertanyaan ongkir dan status pesanan.'],
      ['Yang termasuk', 'Website custom, domain gratis tahun pertama, SSL + hosting, katalog produk, checkout, konfirmasi WhatsApp, CS AI otomatis, dan panel pemilik.'],
    ],
    detailCards: [
      ['Cocok untuk', 'Brand kecil yang pindah dari DM Instagram ke toko sendiri.'],
      ['Yang perlu disiapkan', 'Foto produk, harga, ongkir, dan nomor WhatsApp admin.'],
      ['Alur pesanan', 'Pembeli checkout — pesanan dan konfirmasi tercatat otomatis.'],
    ],
    growth: 'Pengingat keranjang tertinggal dan program referral.',
    support: 'Panduan penggunaan + serah terima. Dukungan prioritas pada paket Automation.',
  },
};

export function getListing(slug) {
  return LISTING[slug] || null;
}
