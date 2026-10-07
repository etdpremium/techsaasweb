import { redirect } from 'next/navigation';

// Tabel perbandingan sekarang ada di halaman Harga.
export default function Compare() {
  redirect('/pricing');
}
