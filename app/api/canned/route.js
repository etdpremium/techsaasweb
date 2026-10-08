import { NextResponse } from 'next/server';
import { db } from '../../../lib/db';
import { CannedResponse } from '../../../db/schema';
import { eq, asc } from 'drizzle-orm';
import { currentUser } from '../../../lib/session';

// CRUD canned responses — khusus admin.
async function needAdmin() {
  const user = await currentUser();
  if (!user || user.role !== 'admin') return null;
  return user;
}

export async function GET() {
  if (!(await needAdmin())) return NextResponse.json({ ok: false }, { status: 401 });
  const items = await db.select().from(CannedResponse).orderBy(asc(CannedResponse.createdAt));
  return NextResponse.json({ ok: true, items });
}

export async function POST(req) {
  if (!(await needAdmin())) return NextResponse.json({ ok: false }, { status: 401 });
  const body = await req.json().catch(() => ({}));
  const keyword = String(body.keyword || '').slice(0, 200).trim();
  const reply = String(body.reply || '').slice(0, 500).trim();
  if (!keyword || !reply) return NextResponse.json({ ok: false, error: 'Keyword dan balasan wajib diisi.' }, { status: 400 });
  const item = await db.insert(CannedResponse).values({ id: crypto.randomUUID(), keyword, reply }).returning();
  return NextResponse.json({ ok: true, item: item[0] });
}

export async function PATCH(req) {
  if (!(await needAdmin())) return NextResponse.json({ ok: false }, { status: 401 });
  const body = await req.json().catch(() => ({}));
  if (!body.id) return NextResponse.json({ ok: false }, { status: 400 });
  const data = {};
  if (typeof body.active === 'boolean') data.active = body.active ? 1 : 0;
  if (typeof body.keyword === 'string') data.keyword = body.keyword.slice(0, 200);
  if (typeof body.reply === 'string') data.reply = body.reply.slice(0, 500);
  const item = await db.update(CannedResponse).set(data).where(eq(CannedResponse.id, body.id)).returning();
  return NextResponse.json({ ok: true, item: item[0] });
}

export async function DELETE(req) {
  if (!(await needAdmin())) return NextResponse.json({ ok: false }, { status: 401 });
  const body = await req.json().catch(() => ({}));
  if (!body.id) return NextResponse.json({ ok: false }, { status: 400 });
  await db.delete(CannedResponse).where(eq(CannedResponse.id, body.id));
  return NextResponse.json({ ok: true });
}
