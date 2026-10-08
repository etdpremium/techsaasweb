import { NextResponse } from 'next/server';
import { db } from '../../../lib/db';
import { Contact, Lead } from '../../../db/schema';
import { eq, desc } from 'drizzle-orm';
import { currentUser } from '../../../lib/session';

// POST publik (form kontak marketing) → juga jadi lead
export async function POST(req) {
  const body = await req.json().catch(() => ({}));
  const name = String(body.name || '').slice(0, 80);
  const email = String(body.email || '').slice(0, 120);
  const phone = String(body.phone || '').slice(0, 40);
  const plan = String(body.plan || '').slice(0, 80);
  const message = String(body.message || '').slice(0, 600);
  if (!name || !email || !message)
    return NextResponse.json({ ok: false, error: 'Nama, email, dan pesan wajib diisi.' }, { status: 400 });
  const user = await currentUser();
  const rec = await db.insert(Contact)
    .values({ id: crypto.randomUUID(), name, email, plan, message, userId: user?.id || null })
    .returning();
  // sinkron jadi lead biar masuk pipeline dashboard
  await db.insert(Lead)
    .values({ id: crypto.randomUUID(), tenant: 'global', name, contact: phone || email, note: `contact: ${plan} — ${message.slice(0, 120)}`, source: 'contact', userId: user?.id || null })
    .catch(() => {});
  return NextResponse.json({ ok: true, id: rec[0].id });
}

// GET butuh login
export async function GET() {
  const user = await currentUser();
  if (!user) return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  const where = user.role === 'admin' ? undefined : eq(Contact.userId, user.id);
  const items = await db.select()
    .from(Contact)
    .where(where)
    .orderBy(desc(Contact.createdAt))
    .limit(100);
  return NextResponse.json({ ok: true, contacts: items });
}

// DELETE: hapus pesan — khusus admin
export async function DELETE(req) {
  const user = await currentUser();
  if (!user || user.role !== 'admin') return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  const { id } = await req.json().catch(() => ({}));
  if (!id) return NextResponse.json({ ok: false }, { status: 400 });
  await db.delete(Contact).where(eq(Contact.id, id)).catch(() => {});
  return NextResponse.json({ ok: true });
}
