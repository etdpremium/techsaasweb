import { NextResponse } from 'next/server';

const COOKIE = 'tsw_sess';

// Middleware (Edge) hanya cek keberadaan cookie untuk UX cepat.
// Otorisasi role admin/client yang sebenarnya ada di tiap page (server-side
// via currentUser) — jadi crypto HMAC tidak perlu jalan di Edge.
export function middleware(req) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get(COOKIE)?.value;

  if ((pathname.startsWith('/admin') || pathname.startsWith('/dashboard')) && !token) {
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('next', pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*'],
};
