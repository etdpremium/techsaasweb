import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { currentUser } from '../../../lib/session';

// Upload gambar sampul artikel — khusus admin.
// Referensi pola resmi Next.js: Route Handler + req.formData() + writeFile ke
// public/ (tanpa dependency tambahan). Validasi: tipe, ukuran, nama aman.
const MAX_BYTES = 2 * 1024 * 1024; // 2MB
const EXT = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/gif': 'gif' };

export async function POST(req) {
  const user = await currentUser();
  if (!user || user.role !== 'admin') return NextResponse.json({ ok: false }, { status: 401 });
  let fd = null;
  try {
    fd = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, error: 'Form tidak valid.' }, { status: 400 });
  }
  const file = fd.get('file');
  if (!file || typeof file === 'string') {
    return NextResponse.json({ ok: false, error: 'Pilih file gambar.' }, { status: 400 });
  }
  const ext = EXT[file.type];
  if (!ext) {
    return NextResponse.json({ ok: false, error: 'Hanya JPG, PNG, WebP, atau GIF.' }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ ok: false, error: 'Ukuran maksimal 2MB.' }, { status: 400 });
  }
  const slug = String(fd.get('slug') || 'img').toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40) || 'img';
  const name = `${slug}-${Date.now()}.${ext}`;
  try {
    const dir = path.join(process.cwd(), 'public', 'blog');
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, name), Buffer.from(await file.arrayBuffer()));
  } catch {
    return NextResponse.json({ ok: false, error: 'Gagal menyimpan file.' }, { status: 500 });
  }
  return NextResponse.json({ ok: true, path: `/blog/${name}` });
}
