import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { currentUser } from '../../../lib/session';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req) {
  const { email } = await req.json().catch(() => ({}));
  const e = String(email || '').trim().toLowerCase();
  if (!EMAIL_RE.test(e))
    return NextResponse.json({ ok: false, error: 'Enter a valid email address.' }, { status: 400 });
  await prisma.subscriber.upsert({ where: { email: e }, update: {}, create: { email: e } });
  return NextResponse.json({ ok: true });
}

export async function GET() {
  const user = await currentUser();
  if (!user || user.role !== 'admin')
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  const items = await prisma.subscriber.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json({ ok: true, count: items.length, subscribers: items });
}

// DELETE: hapus subscriber — khusus admin
export async function DELETE(req) {
  const user = await currentUser();
  if (!user || user.role !== 'admin')
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  const { id } = await req.json().catch(() => ({}));
  if (!id) return NextResponse.json({ ok: false }, { status: 400 });
  await prisma.subscriber.delete({ where: { id } }).catch(() => {});
  return NextResponse.json({ ok: true });
}
