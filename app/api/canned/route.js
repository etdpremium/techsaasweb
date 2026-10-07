import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { currentUser } from '../../../lib/session';

// CRUD canned responses — khusus admin.
async function needAdmin() {
  const user = await currentUser();
  if (!user || user.role !== 'admin') return null;
  return user;
}

export async function GET() {
  if (!(await needAdmin())) return NextResponse.json({ ok: false }, { status: 401 });
  const items = await prisma.cannedResponse.findMany({ orderBy: { createdAt: 'asc' } });
  return NextResponse.json({ ok: true, items });
}

export async function POST(req) {
  if (!(await needAdmin())) return NextResponse.json({ ok: false }, { status: 401 });
  const body = await req.json().catch(() => ({}));
  const keyword = String(body.keyword || '').slice(0, 200).trim();
  const reply = String(body.reply || '').slice(0, 500).trim();
  if (!keyword || !reply) return NextResponse.json({ ok: false, error: 'Keyword dan balasan wajib diisi.' }, { status: 400 });
  const item = await prisma.cannedResponse.create({ data: { keyword, reply } });
  return NextResponse.json({ ok: true, item });
}

export async function PATCH(req) {
  if (!(await needAdmin())) return NextResponse.json({ ok: false }, { status: 401 });
  const body = await req.json().catch(() => ({}));
  if (!body.id) return NextResponse.json({ ok: false }, { status: 400 });
  const data = {};
  if (typeof body.active === 'boolean') data.active = body.active;
  if (typeof body.keyword === 'string') data.keyword = body.keyword.slice(0, 200);
  if (typeof body.reply === 'string') data.reply = body.reply.slice(0, 500);
  const item = await prisma.cannedResponse.update({ where: { id: body.id }, data });
  return NextResponse.json({ ok: true, item });
}

export async function DELETE(req) {
  if (!(await needAdmin())) return NextResponse.json({ ok: false }, { status: 401 });
  const body = await req.json().catch(() => ({}));
  if (!body.id) return NextResponse.json({ ok: false }, { status: 400 });
  await prisma.cannedResponse.delete({ where: { id: body.id } });
  return NextResponse.json({ ok: true });
}
