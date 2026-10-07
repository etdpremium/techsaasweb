import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { currentUser } from '../../../lib/session';
import { tiers } from '../../../lib/pricing';
import { rupiah } from '../../../lib/format';

// POST: order baru — pilih paket + brief. Model: sekali bayar per tahun.
// Paket Full Automation (price null) → disimpan tanpa harga, admin menghubungi.
// Pembayaran: invoice manual (transfer bank / QRIS / VA / e-wallet),
// konfirmasi via WhatsApp. Setelah konfirmasi, admin ubah status di dashboard.
export async function POST(req) {
  const user = await currentUser();
  if (!user) return NextResponse.json({ ok: false, error: 'Silakan login atau buat akun dulu.' }, { status: 401 });
  const body = await req.json().catch(() => ({}));
  const tier = tiers.find((t) => t.id === body.planId);
  if (!tier) return NextResponse.json({ ok: false, error: 'Pilih paket yang valid.' }, { status: 400 });

  const brief = {
    niche: String(body.niche || '').slice(0, 80),
    domain: String(body.domain || '').slice(0, 80),
    notes: String(body.notes || '').slice(0, 400),
  };
  const isCustom = tier.price == null;

  const order = await prisma.order.create({
    data: {
      userId: user.id,
      planId: tier.id,
      planName: tier.name,
      price: tier.price ?? 0,      // 0 untuk paket custom — harga ditentukan admin
      billing: 'once',             // sekali bayar
      brief: JSON.stringify(brief),
    },
  });
  // sinkron jadi lead
  await prisma.lead.create({
    data: { tenant: 'global', name: user.name, contact: user.email, note: `order: ${tier.name} (${brief.niche || '—'})${isCustom ? ' [CUSTOM QUOTE]' : ''}`, source: 'order', userId: user.id },
  }).catch(() => {});
  return NextResponse.json({
    ok: true,
    id: order.id,
    invoice: isCustom
      ? {
          planName: tier.name,
          custom: true,
          note: 'Paket custom — tim kami akan menghubungi Anda untuk kebutuhan & harga sesuai bisnis Anda.',
          methods: [],
        }
      : {
          planName: tier.name,
          total: tier.price,
          totalFormatted: rupiah(tier.price),
          methods: ['Transfer bank', 'QRIS', 'Virtual Account', 'E-wallet (GoPay/OVO/DANA)'],
          note: 'Sekali bayar. Domain .com/.id, hosting, SSL, dan semua infrastruktur included.',
          next: 'Transfer ke rekening di halaman pemesanan, lalu konfirmasi via WhatsApp dengan nomor invoice Anda.',
        },
  });
}

// GET: order user (admin lihat semua)
export async function GET() {
  const user = await currentUser();
  if (!user) return NextResponse.json({ ok: false, error: 'Tidak berhak akses.' }, { status: 401 });
  const where = user.role === 'admin' ? {} : { userId: user.id };
  const orders = await prisma.order.findMany({ where, orderBy: { createdAt: 'desc' }, include: { user: { select: { name: true, email: true } } } });
  return NextResponse.json({ ok: true, orders });
}

// PATCH: ubah status order — khusus admin (new → building → launched / cancelled)
export async function PATCH(req) {
  const user = await currentUser();
  if (!user || user.role !== 'admin') return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  const { id, status } = await req.json().catch(() => ({}));
  const st = String(status || '').slice(0, 20);
  if (!id || !['new', 'building', 'launched', 'cancelled'].includes(st))
    return NextResponse.json({ ok: false, error: 'Status tidak valid.' }, { status: 400 });
  await prisma.order.update({ where: { id }, data: { status: st } }).catch(() => {});
  return NextResponse.json({ ok: true });
}

// DELETE: hapus order — khusus admin
export async function DELETE(req) {
  const user = await currentUser();
  if (!user || user.role !== 'admin') return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  const { id } = await req.json().catch(() => ({}));
  if (!id) return NextResponse.json({ ok: false }, { status: 400 });
  await prisma.order.delete({ where: { id } }).catch(() => {});
  return NextResponse.json({ ok: true });
}
