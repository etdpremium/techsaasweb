import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
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
  const ada = await prisma.lead.findFirst({ where: { contact: lead.contact } });
  if (ada) return NextResponse.json({ ok: true, id: ada.id, duplicate: true });
  const user = await currentUser();
  const rec = await prisma.lead.create({
    data: { ...lead, userId: user?.id || null },
  });
  return NextResponse.json({ ok: true, id: rec.id });
}

export async function GET() {
  const user = await currentUser();
  if (!user) return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  const where = user.role === 'admin' ? {} : { userId: user.id };
  const leads = await prisma.lead.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    take: 200,
  });
  return NextResponse.json({ ok: true, leads });
}

// PUT: update status lead (client area)
export async function PUT(req) {
  const user = await currentUser();
  if (!user) return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  const { id, status } = await req.json().catch(() => ({}));
  const st = String(status || '').slice(0, 20);
  if (!id || !st) return NextResponse.json({ ok: false, error: 'id and status required.' }, { status: 400 });
  const where = { id };
  if (user.role !== 'admin') where.userId = user.id;
  const upd = await prisma.lead.updateMany({ where, data: { status: st } });
  if (upd.count === 0) return NextResponse.json({ ok: false, error: 'Not found.' }, { status: 404 });
  return NextResponse.json({ ok: true });
}

// DELETE: hapus lead (khusus admin)
export async function DELETE(req) {
  const user = await currentUser();
  if (!user || user.role !== 'admin') return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  const { id } = await req.json().catch(() => ({}));
  if (!id) return NextResponse.json({ ok: false, error: 'id required.' }, { status: 400 });
  await prisma.lead.delete({ where: { id } }).catch(() => {});
  return NextResponse.json({ ok: true });
}
