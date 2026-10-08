import { NextResponse } from 'next/server';
import { db } from '../../../lib/db';
import { ChatLog } from '../../../db/schema';
import { eq, lt } from 'drizzle-orm';
import { currentUser } from '../../../lib/session';

// DELETE: hapus log chat lama (>30 hari) — khusus admin.
// Tanpa body = hapus yang lama saja. Dengan {id} = hapus satu baris.
export async function DELETE(req) {
  const user = await currentUser();
  if (!user || user.role !== 'admin') return NextResponse.json({ ok: false }, { status: 401 });
  const { id } = await req.json().catch(() => ({}));
  if (id) {
    await db.delete(ChatLog).where(eq(ChatLog.id, String(id))).catch(() => {});
  } else {
    const batas = new Date(Date.now() - 30 * 24 * 3600 * 1000).toISOString();
    await db.delete(ChatLog).where(lt(ChatLog.createdAt, batas)).catch(() => {});
  }
  return NextResponse.json({ ok: true });
}
