import { demos } from '../lib/demos';
import { db } from '../lib/db';
import { Post } from '../db/schema';
import { CITIES } from '../lib/lokasi';

// D1 hanya tersedia di Workers runtime — jangan di-SSG saat build.
export const dynamic = 'force-dynamic';

export default async function sitemap() {
  const base = 'https://techsaasweb.com';
  const posts = await db.select({ slug: Post.slug, date: Post.date }).from(Post);
  return [
    { url: `${base}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/services`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/pricing`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/booking`, changeFrequency: 'yearly', priority: 0.8 },
    { url: `${base}/blog`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/jasa-website`, changeFrequency: 'monthly', priority: 0.8 },
    ...CITIES.map((c) => ({ url: `${base}/jasa-website/${c.slug}`, changeFrequency: 'monthly', priority: 0.7 })),
    ...demos.map((d) => ({ url: `${base}/demos/${d.slug}`, changeFrequency: 'monthly', priority: 0.8 })),
    ...posts.map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: p.date,
      changeFrequency: 'yearly',
      priority: 0.6,
    })),
  ];
}
