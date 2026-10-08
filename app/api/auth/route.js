import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '../../../lib/db';
import { User } from '../../../db/schema';
import { eq } from 'drizzle-orm';
import { setSession, clearSession, currentUser } from '../../../lib/session';

function ok(data) {
  const res = NextResponse.json({ ok: true, ...data });
  return res;
}

export async function POST(req) {
  // Baca body SEKALI saja — req.json() tidak bisa dipanggil 2x
  const body = await req.json().catch(() => ({}));
  const action = body.action;

  // ---- LOGOUT ----
  if (action === 'logout') {
    await clearSession();
    return ok({});
  }

  // ---- ME ----
  if (action === 'me') {
    const user = await currentUser();
    return NextResponse.json({ ok: !!user, user });
  }

  // ---- LOGIN (pemilik saja — tidak ada pendaftaran) ----
  if (action === 'login') {
    const { email, password } = body;
    const e = String(email || '').trim().toLowerCase();
    const rows = await db.select().from(User).where(eq(User.email, e)).limit(1);
    const user = rows[0];
    if (!user) return NextResponse.json({ ok: false, error: 'Wrong email or password.' }, { status: 400 });
    const good = await bcrypt.compare(String(password || ''), user.password);
    if (!good) return NextResponse.json({ ok: false, error: 'Wrong email or password.' }, { status: 400 });
    await setSession({ id: user.id, email: user.email, role: user.role });
    return ok({ user: { id: user.id, email: user.email, name: user.name } });
  }

  return NextResponse.json({ ok: false, error: 'Unknown action.' }, { status: 400 });
}

export async function GET() {
  const user = await currentUser();
  return NextResponse.json({ ok: !!user, user });
}
