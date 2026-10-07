import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
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
  const rec = await prisma.contact.create({
    data: { name, email, plan, message, userId: user?.id || null },
  });
  // sinkron jadi lead biar masuk pipeline dashboard
  await prisma.lead.create({
    data: { tenant: 'global', name, contact: phone || email, note: `contact: ${plan} — ${message.slice(0, 120)}`, source: 'contact', userId: user?.id || null },
  }).catch(() => {});
  return NextResponse.json({ ok: true, id: rec.id });
}

// GET butuh login
export async function GET() {
  const user = await currentUser();
  if (!user) return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  const where = user.role === 'admin' ? {} : { userId: user.id };
  const items = await prisma.contact.findMany({ where, orderBy: { createdAt: 'desc' }, take: 100 });
  return NextResponse.json({ ok: true, contacts: items });
}

// DELETE: hapus pesan — khusus admin
export async function DELETE(req) {
  const user = await currentUser();
  if (!user || user.role !== 'admin') return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  const { id } = await req.json().catch(() => ({}));
  if (!id) return NextResponse.json({ ok: false }, { status: 400 });
  await prisma.contact.delete({ where: { id } }).catch(() => {});
  return NextResponse.json({ ok: true });
}
