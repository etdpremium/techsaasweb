import { redirect } from 'next/navigation';

// Galeri demo sekarang ada di Beranda. /demos/[slug] (detail) tetap utuh.
export default function DemosIndex() {
  redirect('/#examples');
}
