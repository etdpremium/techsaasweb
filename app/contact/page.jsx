import { redirect } from 'next/navigation';

// /contact lama → /booking (Pemesanan). Link lama tetap jalan, gak ada halaman mati.
export default function Contact() {
  redirect('/booking');
}
