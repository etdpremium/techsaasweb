import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { currentUser } from '../../../lib/session';

// DELETE: hapus log chat lama (>30 hari) — khusus admin.
// Tanpa body = hapus yang lama saja. Dengan {id} = hapus satu baris.
export async function DELETE(req) {
  const user = await currentUser();
  if (!user || user.role !== 'admin') return NextResponse.json({ ok: false }, { status: 401 });
  const { id } = await req.json().catch(() => ({}));
  if (id) {
    await prisma.chatLog.delete({ where: { id: String(id) } }).catch(() => {});
  } else {
    const batas = new Date(Date.now() - 30 * 24 * 3600 * 1000);
    await prisma.chatLog.deleteMany({ where: { createdAt: { lt: batas } } }).catch(() => {});
  }
  return NextResponse.json({ ok: true });
}
