import { NextResponse } from 'next/server';
import { db } from '../../../lib/db';
import { Subscriber } from '../../../db/schema';
import { eq, desc } from 'drizzle-orm';
import { currentUser } from '../../../lib/session';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req) {
  const { email } = await req.json().catch(() => ({}));
  const e = String(email || '').trim().toLowerCase();
  if (!EMAIL_RE.test(e))
    return NextResponse.json({ ok: false, error: 'Enter a valid email address.' }, { status: 400 });
  // upsert manual (D1 SQLite belum support ON CONFLICT di Drizzle 0.45 secara bersih)
  const ada = await db.select({ id: Subscriber.id }).from(Subscriber).where(eq(Subscriber.email, e)).limit(1);
  if (!ada[0]) {
    await db.insert(Subscriber).values({ email: e }).catch(() => {});
  }
  return NextResponse.json({ ok: true });
}

export async function GET() {
  const user = await currentUser();
  if (!user || user.role !== 'admin')
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  const items = await db.select().from(Subscriber).orderBy(desc(Subscriber.createdAt));
  return NextResponse.json({ ok: true, count: items.length, subscribers: items });
}

// DELETE: hapus subscriber — khusus admin
export async function DELETE(req) {
  const user = await currentUser();
  if (!user || user.role !== 'admin')
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  const { id } = await req.json().catch(() => ({}));
  if (!id) return NextResponse.json({ ok: false }, { status: 400 });
  await db.delete(Subscriber).where(eq(Subscriber.id, id)).catch(() => {});
  return NextResponse.json({ ok: true });
}
