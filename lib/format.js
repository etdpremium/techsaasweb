// Format harga & angka untuk pasar Indonesia.
// Model: sekali bayar per tahun (kecuali paket custom → hubungi kontak).

// "Rp 1.200.000"  ← titik pemisah ribuan (gaya Indonesia)
export function rupiah(n) {
  return 'Rp ' + Number(n).toLocaleString('id-ID');
}

// "Rp 1,2jt", "Rp 2,5jt"  ← untuk tombol CTA, badge, tempat sempit
export function juta(n) {
  const j = n / 1000000;
  const rounded = Math.round(j * 10) / 10;
  return `Rp ${rounded}jt`;
}

// Alias untuk konsistensi nama lama (rupiahShort dipakai di beberapa komponen)
export const rupiahShort = juta;

// "Rp 1.500.000" → dipakai untuk harga penuh di kartu paket
export const rupiahFull = rupiah;

// Harga custom quote: tampilkan label, bukan angka
export function priceOrContact(tier, fallback = 'Hubungi kami') {
  if (!tier || tier.price == null) return fallback;
  return juta(tier.price);
}
