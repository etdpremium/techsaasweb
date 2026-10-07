import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { currentUser } from '../../../lib/session';

// CRUD artikel — khusus admin.
async function needAdmin() {
  const user = await currentUser();
  if (!user || user.role !== 'admin') return null;
  return user;
}

export async function GET() {
  if (!(await needAdmin())) return NextResponse.json({ ok: false }, { status: 401 });
  const items = await prisma.post.findMany({ orderBy: { createdAt: 'desc' }, take: 200 });
  return NextResponse.json({ ok: true, items });
}

export async function POST(req) {
  if (!(await needAdmin())) return NextResponse.json({ ok: false }, { status: 401 });
  const b = await req.json().catch(() => ({}));
  const slug = String(b.slug || '').trim().toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80);
  const title = String(b.title || '').trim().slice(0, 160);
  const body = String(b.body || '').trim();
  if (!slug || !title || !body) return NextResponse.json({ ok: false, error: 'Slug, judul, dan isi wajib.' }, { status: 400 });
  const item = await prisma.post.create({
    data: {
      slug,
      title,
      excerpt: String(b.excerpt || '').trim().slice(0, 220) || title,
      category: String(b.category || 'Tutorial').slice(0, 40),
      lang: b.lang === 'en' ? 'en' : 'id',
      date: String(b.date || new Date().toISOString().slice(0, 10)),
      read: String(b.read || '5 menit'),
      thumb: String(b.thumb || `/assets/blog/${slug}.jpg`),
      body,
    },
  });
  return NextResponse.json({ ok: true, item });
}

export async function DELETE(req) {
  if (!(await needAdmin())) return NextResponse.json({ ok: false }, { status: 401 });
  const body = await req.json().catch(() => ({}));
  if (!body.id) return NextResponse.json({ ok: false }, { status: 400 });
  await prisma.post.delete({ where: { id: body.id } });
  return NextResponse.json({ ok: true });
}

export async function PUT(req) {
  if (!(await needAdmin())) return NextResponse.json({ ok: false }, { status: 401 });
  const b = await req.json().catch(() => ({}));
  if (!b.id) return NextResponse.json({ ok: false, error: 'id wajib.' }, { status: 400 });
  const data = {};
  if (b.slug !== undefined) {
    const slug = String(b.slug).trim().toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80);
    if (!slug) return NextResponse.json({ ok: false, error: 'Slug tidak valid.' }, { status: 400 });
    data.slug = slug;
  }
  if (b.title !== undefined) {
    const title = String(b.title).trim().slice(0, 160);
    if (!title) return NextResponse.json({ ok: false, error: 'Judul wajib.' }, { status: 400 });
    data.title = title;
  }
  if (b.excerpt !== undefined) data.excerpt = String(b.excerpt).trim().slice(0, 220);
  if (b.category !== undefined) data.category = String(b.category).slice(0, 40);
  if (b.lang !== undefined) data.lang = b.lang === 'en' ? 'en' : 'id';
  if (b.body !== undefined) {
    const body = String(b.body).trim();
    if (!body) return NextResponse.json({ ok: false, error: 'Isi wajib.' }, { status: 400 });
    data.body = body;
  }
  try {
    const item = await prisma.post.update({ where: { id: String(b.id) }, data });
    return NextResponse.json({ ok: true, item });
  } catch {
    return NextResponse.json({ ok: false, error: 'Artikel tidak ditemukan / slug ganda.' }, { status: 400 });
  }
}
