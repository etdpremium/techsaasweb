import { NextResponse } from 'next/server';
import { db } from '../../../lib/db';
import { Lead } from '../../../db/schema';
import { eq, desc, and } from 'drizzle-orm';
import { currentUser } from '../../../lib/session';

// POST publik (visitor chat/form), GET butuh login.
export async function POST(req) {
  const body = await req.json().catch(() => ({}));
  const lead = {
    tenant: String(body.tenant || 'global').slice(0, 40),
    name: String(body.name || '').slice(0, 80),
    contact: String(body.contact || '').slice(0, 80),
    note: String(body.note || '').slice(0, 200),
    source: String(body.source || 'chat').slice(0, 20),
  };
  if (!lead.name || !lead.contact)
    return NextResponse.json({ ok: false, error: 'Name and contact are required.' }, { status: 400 });
  // Kontak yang sudah ada tidak diduplikasi — kembalikan data lama.
  const ada = await db.select({ id: Lead.id }).from(Lead).where(eq(Lead.contact, lead.contact)).limit(1);
  if (ada[0]) return NextResponse.json({ ok: true, id: ada[0].id, duplicate: true });
  const user = await currentUser();
  const rec = await db.insert(Lead).values({ ...lead, userId: user?.id || null }).returning();
  return NextResponse.json({ ok: true, id: rec[0].id });
}

export async function GET() {
  const user = await currentUser();
  if (!user) return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  const where = user.role === 'admin' ? undefined : eq(Lead.userId, user.id);
  const leads = await db.select()
    .from(Lead)
    .where(where)
    .orderBy(desc(Lead.createdAt))
    .limit(200);
  return NextResponse.json({ ok: true, leads });
}

// PUT: update status lead (client area)
export async function PUT(req) {
  const user = await currentUser();
  if (!user) return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  const { id, status } = await req.json().catch(() => ({}));
  const st = String(status || '').slice(0, 20);
  if (!id || !st) return NextResponse.json({ ok: false, error: 'id and status required.' }, { status: 400 });
  const where = user.role !== 'admin' ? and(eq(Lead.id, id), eq(Lead.userId, user.id)) : eq(Lead.id, id);
  const upd = await db.update(Lead).set({ status: st }).where(where).returning();
  if (upd.length === 0) return NextResponse.json({ ok: false, error: 'Not found.' }, { status: 404 });
  return NextResponse.json({ ok: true });
}

// DELETE: hapus lead (khusus admin)
export async function DELETE(req) {
  const user = await currentUser();
  if (!user || user.role !== 'admin') return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  const { id } = await req.json().catch(() => ({}));
  if (!id) return NextResponse.json({ ok: false, error: 'id required.' }, { status: 400 });
  await db.delete(Lead).where(eq(Lead.id, id)).catch(() => {});
  return NextResponse.json({ ok: true });
}
