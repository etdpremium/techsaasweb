// Daftar kota untuk SEO lokal — dipakai footer (link per kota) dan
// halaman info /jasa-website/[kota] (generateStaticParams + sitemap).

export const CITIES = [
  { slug: 'jakarta', kota: 'Jakarta', provinsi: 'DKI Jakarta', area: ['Menteng', 'Kebayoran', 'Tebet', 'Kelapa Gading', 'Cengkareng'] },
  { slug: 'bogor', kota: 'Bogor', provinsi: 'Jawa Barat', area: ['Dramaga', 'Cibinong', 'Citeureup', 'Tajur'] },
  { slug: 'depok', kota: 'Depok', provinsi: 'Jawa Barat', area: ['Margonda', 'Cimanggis', 'Sawangan', 'Beji'] },
  { slug: 'tangerang', kota: 'Tangerang', provinsi: 'Banten', area: ['BSD', 'Karawaci', 'Ciledug', 'Ciputat'] },
  { slug: 'bekasi', kota: 'Bekasi', provinsi: 'Jawa Barat', area: ['Tambun', 'Cikarang', 'Jatiasih', 'Pondok Gede'] },
  { slug: 'bandung', kota: 'Bandung', provinsi: 'Jawa Barat', area: ['Dago', 'Buah Batu', 'Cimahi', 'Antapani'] },
  { slug: 'semarang', kota: 'Semarang', provinsi: 'Jawa Tengah', area: ['Tembalang', 'Banyumanik', 'Pedurungan', 'Gunungpati'] },
  { slug: 'solo', kota: 'Solo', provinsi: 'Jawa Tengah', area: ['Laweyan', 'Banjarsari', 'Kartasura', 'Sukoharjo'] },
  { slug: 'jogja', kota: 'Yogyakarta', provinsi: 'DI Yogyakarta', area: ['Sleman', 'Bantul', 'Kulon Progo', 'Gunungkidul'] },
  { slug: 'surabaya', kota: 'Surabaya', provinsi: 'Jawa Timur', area: ['Sidoarjo', 'Gresik', 'Rungkut', 'Wonokromo'] },
  { slug: 'malang', kota: 'Malang', provinsi: 'Jawa Timur', area: ['Batu', 'Singosari', 'Kepanjen', 'Blimbing'] },
  { slug: 'denpasar', kota: 'Denpasar', provinsi: 'Bali', area: ['Badung', 'Gianyar', 'Ubud', 'Kuta'] },
  { slug: 'medan', kota: 'Medan', provinsi: 'Sumatera Utara', area: ['Deli Serdang', 'Binjai', 'Tembung', 'Sunggal'] },
  { slug: 'palembang', kota: 'Palembang', provinsi: 'Sumatera Selatan', area: ['Ilir Timur', 'Seberang Ulu', 'Jakabaring', 'Plaju'] },
  { slug: 'makassar', kota: 'Makassar', provinsi: 'Sulawesi Selatan', area: ['Gowa', 'Maros', 'Tamalanrea', 'Rappocini'] },
  { slug: 'balikpapan', kota: 'Balikpapan', provinsi: 'Kalimantan Timur', area: ['Penajam', 'Samboja', 'Sepaku', 'Sungai Nangka'] },
  // Sumatera (ibu kota provinsi yang belum terwakili)
  { slug: 'banda-aceh', kota: 'Banda Aceh', provinsi: 'Aceh' },
  { slug: 'padang', kota: 'Padang', provinsi: 'Sumatera Barat' },
  { slug: 'pekanbaru', kota: 'Pekanbaru', provinsi: 'Riau' },
  { slug: 'tanjung-pinang', kota: 'Tanjung Pinang', provinsi: 'Kepulauan Riau' },
  { slug: 'jambi', kota: 'Jambi', provinsi: 'Jambi' },
  { slug: 'pangkal-pinang', kota: 'Pangkal Pinang', provinsi: 'Kepulauan Bangka Belitung' },
  { slug: 'bengkulu', kota: 'Bengkulu', provinsi: 'Bengkulu' },
  { slug: 'bandar-lampung', kota: 'Bandar Lampung', provinsi: 'Lampung' },
  { slug: 'serang', kota: 'Serang', provinsi: 'Banten' },
  // Bali & Nusa Tenggara
  { slug: 'mataram', kota: 'Mataram', provinsi: 'Nusa Tenggara Barat' },
  { slug: 'kupang', kota: 'Kupang', provinsi: 'Nusa Tenggara Timur' },
  // Kalimantan
  { slug: 'pontianak', kota: 'Pontianak', provinsi: 'Kalimantan Barat' },
  { slug: 'palangka-raya', kota: 'Palangka Raya', provinsi: 'Kalimantan Tengah' },
  { slug: 'banjarmasin', kota: 'Banjarmasin', provinsi: 'Kalimantan Selatan' },
  { slug: 'tanjung-selor', kota: 'Tanjung Selor', provinsi: 'Kalimantan Utara' },
  // Sulawesi
  { slug: 'manado', kota: 'Manado', provinsi: 'Sulawesi Utara' },
  { slug: 'gorontalo', kota: 'Gorontalo', provinsi: 'Gorontalo' },
  { slug: 'palu', kota: 'Palu', provinsi: 'Sulawesi Tengah' },
  { slug: 'mamuju', kota: 'Mamuju', provinsi: 'Sulawesi Barat' },
  { slug: 'kendari', kota: 'Kendari', provinsi: 'Sulawesi Tenggara' },
  // Maluku & Papua
  { slug: 'ambon', kota: 'Ambon', provinsi: 'Maluku' },
  { slug: 'ternate', kota: 'Ternate', provinsi: 'Maluku Utara' },
  { slug: 'jayapura', kota: 'Jayapura', provinsi: 'Papua' },
  { slug: 'manokwari', kota: 'Manokwari', provinsi: 'Papua Barat' },
  { slug: 'nabire', kota: 'Nabire', provinsi: 'Papua Tengah' },
  { slug: 'wamena', kota: 'Wamena', provinsi: 'Papua Pegunungan' },
  { slug: 'merauke', kota: 'Merauke', provinsi: 'Papua Selatan' },
  { slug: 'sorong', kota: 'Sorong', provinsi: 'Papua Barat Daya' },
];

export function getCity(slug) {
  return CITIES.find((c) => c.slug === slug);
}

// Intro unik per kepulauan — anti-doorway: tiap halaman kota punya
// paragraf pembeda selain nama kota/provinsi.
const PULAU = {
  'DKI Jakarta': 'Jawa',
  'Jawa Barat': 'Jawa',
  Banten: 'Jawa',
  'Jawa Tengah': 'Jawa',
  'DI Yogyakarta': 'Jawa',
  'Jawa Timur': 'Jawa',
  Aceh: 'Sumatera',
  'Sumatera Utara': 'Sumatera',
  'Sumatera Barat': 'Sumatera',
  Riau: 'Sumatera',
  'Kepulauan Riau': 'Sumatera',
  Jambi: 'Sumatera',
  'Kepulauan Bangka Belitung': 'Sumatera',
  Bengkulu: 'Sumatera',
  Lampung: 'Sumatera',
  Bali: 'Bali & Nusa Tenggara',
  'Nusa Tenggara Barat': 'Bali & Nusa Tenggara',
  'Nusa Tenggara Timur': 'Bali & Nusa Tenggara',
  'Kalimantan Barat': 'Kalimantan',
  'Kalimantan Tengah': 'Kalimantan',
  'Kalimantan Selatan': 'Kalimantan',
  'Kalimantan Timur': 'Kalimantan',
  'Kalimantan Utara': 'Kalimantan',
  'Sulawesi Utara': 'Sulawesi',
  Gorontalo: 'Sulawesi',
  'Sulawesi Tengah': 'Sulawesi',
  'Sulawesi Barat': 'Sulawesi',
  'Sulawesi Selatan': 'Sulawesi',
  'Sulawesi Tenggara': 'Sulawesi',
  Maluku: 'Maluku & Papua',
  'Maluku Utara': 'Maluku & Papua',
  Papua: 'Maluku & Papua',
  'Papua Barat': 'Maluku & Papua',
  'Papua Tengah': 'Maluku & Papua',
  'Papua Pegunungan': 'Maluku & Papua',
  'Papua Selatan': 'Maluku & Papua',
  'Papua Barat Daya': 'Maluku & Papua',
};

const INTRO_PULAU = {
  Jawa: 'Persaingan bisnis di Jawa paling padat — website yang cepat dan mudah ditemukan membuat usaha Anda tidak tenggelam di antara kompetitor.',
  Sumatera: 'Jarak antar kota di Sumatera jauh — website membuat usaha Anda dilayani pelanggan lintas kabupaten tanpa harus buka cabang.',
  'Bali & Nusa Tenggara': 'Wisatawan mencari semuanya lewat HP — website berbahasa rapi plus CS otomatis menangkap tamu bahkan saat Anda sedang melayani.',
  Kalimantan: 'Wilayah luas dengan sebaran usaha jarang — satu website menjangkau pelanggan dari kota sampai kabupaten tetangga.',
  Sulawesi: 'Ekonomi Sulawesi bergerak cepat di kota-kota besar — website profesional memberi kesan terpercaya sejak klik pertama.',
  'Maluku & Papua': 'Konektivitas membaik dan pasar online tumbuh — website ringan yang cepat dibuka membuat usaha Anda selangkah di depan.',
};

export function keunikanKota(c) {
  const nama = c.slug === 'jogja' ? 'Jogja' : c.kota;
  const pulau = PULAU[c.provinsi] || 'Jawa';
  return {
    nama,
    intro: INTRO_PULAU[pulau],
    area: c.area || [],
  };
}
