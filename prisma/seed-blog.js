// Seed 40 artikel blog → SQLite. Jalankan: node prisma/seed-blog.js
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const m1 = await import('../lib/blog-posts-1.js');
  const m2 = await import('../lib/blog-posts-2.js');
  const m3 = await import('../lib/blog-posts-3.js');
  const m4 = await import('../lib/blog-posts-4.js');
  const ALL = [...m1.POSTS, ...m2.POSTS, ...m3.POSTS, ...m4.POSTS];
  let n = 0;
  for (const p of ALL) {
    await prisma.post.upsert({
      where: { slug: p.slug },
      update: { title: p.title, excerpt: p.excerpt, category: p.category, lang: p.lang, date: p.date, read: p.read, thumb: p.thumb, body: p.body },
      create: { ...p },
    });
    n++;
  }
  const total = await prisma.post.count();
  console.log(`✓ seed blog: ${n} diproses, total ${total} di DB`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
