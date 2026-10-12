import { demos } from '../lib/demos';
import { db } from '../lib/db';
import { Post } from '../db/schema';
import { CITIES } from '../lib/lokasi';

// D1 hanya tersedia di Workers runtime — jangan di-SSG saat build.
export const dynamic = 'force-dynamic';

// Catatan: priority & changefreq dihapus — Google mengabaikannya
// (audit docs/06) dan hanya memperbesar file.
export default async function sitemap() {
  const base = 'https://techsaasweb.com';
  const posts = await db.select({ slug: Post.slug, date: Post.date }).from(Post);
  return [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/services` },
    { url: `${base}/pricing` },
    { url: `${base}/booking` },
    { url: `${base}/blog`, lastModified: new Date() },
    { url: `${base}/jasa-website` },
    ...CITIES.map((c) => ({ url: `${base}/jasa-website/${c.slug}` })),
    { url: `${base}/demos`, lastModified: new Date() },
    ...demos.map((d) => ({ url: `${base}/demos/${d.slug}` })),
    ...posts.map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: p.date,
    })),
  ];
}
