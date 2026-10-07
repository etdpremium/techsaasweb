import { demos } from '../../lib/demos';
import { prisma } from '../../lib/prisma';
import { CITIES } from '../../lib/lokasi';
import { tiers } from '../../lib/pricing';

const BASE = 'https://techsaasweb.com';

// llms.txt — proposal https://llmstxt.org/ (v2)
// File kecil yang fit context; detail ada di balik link (halaman web kami).
export const dynamic = 'force-dynamic';

export async function GET() {
  const posts = await prisma.post.findMany({
    select: { slug: true, title: true },
    orderBy: { date: 'desc' },
    take: 40,
  });

  const lines = [
    '# TechSaaSWeb',
    '',
    '> Jasa pembuatan website custom + CS AI otomatis untuk UMKM Indonesia. Domain .com/.id, hosting, SSL termasuk; online 3–14 hari.',
    '',
    'TechSaaSWeb membuatkan website bisnis custom (8–15 halaman) dengan asisten CS AI opsional yang menjawab WhatsApp/chat 24 jam. Tiga paket: Starter (website saja), Business (+ CS AI), Automation (booking & pencatatan penuh).',
    '',
    '## Halaman utama',
    '',
    `- [Beranda](${BASE}/): ringkasan layanan, harga, dan contoh website.`,
    `- [Layanan](${BASE}/services): detail fitur tiap paket.`,
    `- [Harga](${BASE}/pricing): tabel perbandingan 3 paket.`,
    `- [Pemesanan](${BASE}/booking): form pemesanan + 7 langkah cara kerja.`,
    `- [Blog](${BASE}/blog): panduan website, SEO lokal, dan CS otomatis.`,
    `- [Jasa website](${BASE}/jasa-website): jasa pembuatan website per kota.`,
    '',
    '## Contoh website (demo)',
    '',
    ...demos.map((d) => `- [Contoh website ${d.niche}: ${d.name}](${BASE}/demos/${d.slug})`),
    '',
    '## Artikel blog',
    '',
    ...posts.map((p) => `- [${p.title}](${BASE}/blog/${p.slug})`),
    '',
    '## Layanan per kota',
    '',
    ...CITIES.map((c) => `- [Jasa pembuatan website ${c.kota}](${BASE}/jasa-website/${c.slug})`),
    '',
    '## Harga (ringkas)',
    '',
    ...tiers.map(
      (t) => `- ${t.name}: ${t.price == null ? 'hubungi kami' : t.price.toLocaleString('id-ID')} IDR${t.priceNote ? ` (${t.priceNote})` : ''}`
    ),
    '',
    '## Kontak',
    '',
    '- WhatsApp: +62 851-1329-4575',
    `- Pesan: ${BASE}/booking — konsultasi gratis, balasan dalam 24 jam, Bahasa Indonesia.`,
  ];

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
