// Session helper: signed cookie (HMAC), zero heavy dependency.
// Secret dari env; dev fallback hanya untuk lokal (bukan produksi).
import { createHmac, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';
import { db } from './db';
import { User } from '../db/schema';
import { eq } from 'drizzle-orm';

const COOKIE = 'tsw_sess';
const SECRET = process.env.SESSION_SECRET || 'tsw-dev-only-secret-change-me';

export function sign(payload) {
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const mac = createHmac('sha256', SECRET).update(body).digest('base64url');
  return `${body}.${mac}`;
}

export function verify(token) {
  try {
    const [body, mac] = String(token).split('.');
    if (!body || !mac) return null;
    const expect = createHmac('sha256', SECRET).update(body).digest('base64url');
    const a = Buffer.from(mac);
    const b = Buffer.from(expect);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
    return JSON.parse(Buffer.from(body, 'base64url').toString());
  } catch {
    return null;
  }
}

export async function setSession(payload) {
  const c = await cookies();
  c.set(COOKIE, sign({ id: payload.id, email: payload.email, role: payload.role || 'client' }), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 30, // 30 hari
    path: '/',
  });
}

export async function clearSession() {
  const c = await cookies();
  c.delete(COOKIE);
}

export async function currentUser() {
  const c = await cookies();
  const token = c.get(COOKIE)?.value;
  const sess = verify(token);
  if (!sess?.id) return null;
  const rows = await db.select({ id: User.id, email: User.email, name: User.name, role: User.role, company: User.company })
    .from(User)
    .where(eq(User.id, sess.id))
    .limit(1);
  return rows[0] || null;
}
