import { prisma } from '../../lib/prisma';
import { currentUser } from '../../lib/session';
import { redirect } from 'next/navigation';

export const metadata = { title: 'Dashboard', robots: 'noindex, nofollow' };

// /dashboard diteruskan ke /admin (area internal).
export default async function DashboardPage() {
  const user = await currentUser();
  if (!user || user.role !== 'admin') redirect('/login?next=/dashboard');
  redirect('/admin');
}
