import { db } from '../../lib/db';
import { Lead, Order, Subscriber, ChatLog, Contact, User } from '../../db/schema';
import { desc, asc, eq, and, or, like, count as countFn, sql } from 'drizzle-orm';
import { currentUser } from '../../lib/session';
import { redirect } from 'next/navigation';
import Reveal from '../../components/Reveal';
import LogoutButton from '../../components/LogoutButton';
import AdminCanned from './canned';
import AdminPosts from './posts';
import { HapusBtn, BersihLogBtn } from './actions';
import { AdminLeads, AdminOrders, AdminSubs } from './_parts';

export const metadata = { title: 'Admin — TechSaaSWeb', robots: 'noindex, nofollow' };

// D1 hanya tersedia di Workers runtime — jangan di-SSG saat build.
export const dynamic = 'force-dynamic';

const MODE_LABEL = {
  ai: 'AI', template: 'Template', cached: 'Cache', form: 'Formulir',
  lead: 'Lead masuk', blocked: 'Diblokir',
};

function harga(order) {
  if (order.price == null) return 'custom';
  if (order.price >= 1000) return `Rp ${order.price.toLocaleString('id-ID')}`;
  return `$${order.price}/bln`;
}

export default async function AdminPage({ searchParams }) {
  const user = await currentUser();
  if (!user || user.role !== 'admin') redirect('/login?next=/admin');
  const sp = await searchParams;
  const q = String(sp?.q || '').slice(0, 80);
  const mode = String(sp?.mode || 'semua').slice(0, 20);

  const chatWhere = [];
  if (q) chatWhere.push(or(like(ChatLog.message, `%${q}%`), like(ChatLog.reply, `%${q}%`)));
  if (mode !== 'semua') chatWhere.push(eq(ChatLog.mode, mode));
  const chatWhereAll = chatWhere.length ? and(...chatWhere) : undefined;

  const [leadRows, orderRows, subs, chatModes, chatModels, chats, contacts, totalChats] = await Promise.all([
    db.select({ lead: Lead, userName: User.name, userEmail: User.email })
      .from(Lead)
      .leftJoin(User, eq(Lead.userId, User.id))
      .orderBy(desc(Lead.createdAt))
      .limit(100),
    db.select({ order: Order, userName: User.name, userEmail: User.email })
      .from(Order)
      .leftJoin(User, eq(Order.userId, User.id))
      .orderBy(desc(Order.createdAt))
      .limit(50),
    db.select().from(Subscriber).orderBy(desc(Subscriber.createdAt)),
    db.select({ mode: ChatLog.mode, c: countFn() }).from(ChatLog).groupBy(ChatLog.mode),
    db.select({ model: ChatLog.model, c: countFn() }).from(ChatLog).groupBy(ChatLog.model),
    db.select().from(ChatLog).where(chatWhereAll).orderBy(desc(ChatLog.createdAt)).limit(50),
    db.select().from(Contact).orderBy(desc(Contact.createdAt)).limit(30),
    db.select({ c: countFn() }).from(ChatLog),
  ]);

  // flatten relation ke bentuk lama (l.user.name, o.user.email)
  const leads = leadRows.map((r) => ({ ...r.lead, user: { name: r.userName, email: r.userEmail } }));
  const orders = orderRows.map((r) => ({ ...r.order, user: { name: r.userName, email: r.userEmail } }));
  const totalChatNum = totalChats[0]?.c ?? 0;

  const hitung = (m) => chatModes.find((c) => c.mode === m)?.c || 0;
  const menang = leads.filter((l) => l.status === 'won').length;

  return (
    <main className="wrap" style={{ paddingTop: '2rem' }}>
      <div className="row-between">
        <div>
          <span className="tag orange"><span className="dot" />ADMIN</span>
          <h1 style={{ marginTop: '.8rem', fontSize: '2rem' }}>Pantauan operasional</h1>
        </div>
        <div className="row">
          <span className="muted" style={{ fontSize: '.82rem' }}>masuk sebagai {user.email}</span>
          <LogoutButton />
        </div>
      </div>

      <Reveal className="kpi4">
        <div className="kpi"><b>{leads.length}</b><span>Prospek masuk</span></div>
        <div className="kpi"><b>{menang}</b><span>Menang</span></div>
        <div className="kpi"><b>{orders.length}</b><span>Pesanan</span></div>
        <div className="kpi"><b>{subs.length}</b><span>Email berlangganan</span></div>
      </Reveal>

      <Reveal className="kpi4">
        <div className="kpi"><b>{hitung('ai')}</b><span>Dijawab AI</span></div>
        <div className="kpi"><b>{hitung('template')}</b><span>Template (gratis)</span></div>
        <div className="kpi"><b>{hitung('form') + hitung('lead')}</b><span>Jadi formulir/lead</span></div>
        <div className="kpi"><b>{hitung('blocked')}</b><span>Serangan ditolak</span></div>
      </Reveal>

      <div className="dash-cols">
        <Reveal className="m-card">
          <div className="row-between" style={{ marginBottom: '.2rem' }}>
            <div>
              <h3 style={{ margin: 0 }}>Semua prospek</h3>
              <p className="admin-hint">Klik panah untuk menaikkan status. Dari chat, form, dan pemesanan.</p>
            </div>
            <span className="muted" style={{ fontSize: '.78rem' }}>terbaru {leads.length}</span>
          </div>
          <AdminLeads leads={leads} />
        </Reveal>
        <Reveal className="m-card">
          <h3 style={{ margin: 0 }}>Model AI terpakai</h3>
          <p className="admin-hint">Model gratis yang menjawab chat, urut pemakaian.</p>
          {chatModels.filter((c) => c.model).sort((a, b) => b._count - a._count).slice(0, 5).map((c) => (
            <div key={c.model} className="table-row">
              <span style={{ fontSize: '.8rem', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.model}</span><b>{c._count}</b>
            </div>
          ))}
          {chatModels.filter((c) => c.model).length === 0 && <p className="muted" style={{ fontSize: '.85rem', margin: 0 }}>Belum ada pemakaian AI.</p>}
        </Reveal>
      </div>

      {/* Kartu-kartu kecil tersusun otomatis (auto-fit grid) */}
      <div className="admin-grid">
        <Reveal className="m-card">
          <h3 style={{ margin: 0 }}>Pesanan</h3>
          <p className="admin-hint">Ubah status: Kerjakan → Online. Batal bila dibatalkan.</p>
          <AdminOrders orders={orders} formatHarga={harga} />
        </Reveal>
        <Reveal className="m-card">
          <div className="row-between" style={{ marginBottom: '.6rem' }}>
            <div><h3 style={{ margin: 0 }}>Balasan siap pakai</h3>
            <p className="admin-hint">Jawaban otomatis chatbot yang didahulukan dari aturan bawaan. Keyword dipisah |, awalan = artinya cocok persis. Maksimal 2 kalimat.</p></div>
          </div>
          <AdminCanned />
        </Reveal>
        <Reveal className="m-card">
          <div className="row-between" style={{ marginBottom: '.6rem' }}>
            <div><h3 style={{ margin: 0 }}>Artikel blog</h3>
            <p className="admin-hint">Tambah, edit, hapus artikel. Slug unik, sampul bisa upload atau link.</p></div>
          </div>
          <AdminPosts />
        </Reveal>
        <Reveal className="m-card">
          <div className="row-between" style={{ marginBottom: '.6rem' }}>
            <div><h3 style={{ margin: 0 }}>Pesan kontak</h3>
            <p className="admin-hint">Pesan dari formulir kontak & pemesanan.</p></div>
            <span className="muted" style={{ fontSize: '.78rem' }}>{contacts.length}</span>
          </div>
          {contacts.map((c) => (
            <div key={c.id} className="table-row">
              <div style={{ minWidth: 0 }}>
                <strong className="ink">{c.name}</strong>
                <div className="muted" style={{ fontSize: '.78rem' }}>{c.email} · {c.plan}</div>
                <div style={{ fontSize: '.82rem' }}>{c.message}</div>
              </div>
              <div style={{ display: 'flex', gap: '.4rem', alignItems: 'center', flex: 'none' }}>
                <span className="muted" style={{ fontSize: '.72rem' }}>{new Date(c.createdAt).toLocaleDateString('id-ID')}</span>
                <HapusBtn url="/api/contacts" id={c.id} />
              </div>
            </div>
          ))}
          {contacts.length === 0 && <p className="muted" style={{ fontSize: '.85rem', margin: 0 }}>Belum ada pesan.</p>}
        </Reveal>
        <Reveal className="m-card">
          <div className="row-between" style={{ marginBottom: '.6rem' }}>
            <div><h3 style={{ margin: 0 }}>Email berlangganan</h3>
            <p className="admin-hint">Pendaftar tips mingguan dari form beranda.</p></div>
            <span className="muted" style={{ fontSize: '.78rem' }}>{subs.length}</span>
          </div>
          <AdminSubs subs={subs} />
        </Reveal>
      </div>

      <Reveal className="m-card" style={{ marginTop: '1.2rem' }}>
        <div className="row-between" style={{ marginBottom: '.6rem', flexWrap: 'wrap', gap: '.6rem' }}>
          <div>
            <h3 style={{ margin: 0 }}>Log percakapan ({totalChatNum})</h3>
            <p className="admin-hint">Arsip semua chat untuk evaluasi jawaban bot. Saring per mode atau cari kata.</p>
          </div>
          <div className="row" style={{ gap: '.5rem', flexWrap: 'wrap' }}>
            <BersihLogBtn />
            <form method="get" action="/admin" style={{ display: 'flex', gap: '.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <select name="mode" className="m-input" defaultValue={mode} style={{ width: 'auto', padding: '.4rem .6rem', fontSize: '.82rem' }}>
              <option value="semua">Semua mode</option>
              {Object.keys(MODE_LABEL).map((m) => <option key={m} value={m}>{MODE_LABEL[m]}</option>)}
            </select>
            <input name="q" className="m-input" defaultValue={q} placeholder="Cari pesan…" style={{ width: '180px', padding: '.4rem .6rem', fontSize: '.82rem' }} />
            <button className="m-btn sm" type="submit">Cari</button>
          </form>
          </div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead><tr><th>Waktu</th><th>Pesan pengunjung</th><th>Jawaban</th><th>Mode</th></tr></thead>
            <tbody>
              {chats.map((c) => (
                <tr key={c.id}>
                  <td className="muted" style={{ whiteSpace: 'nowrap', fontSize: '.78rem' }}>
                    {new Date(c.createdAt).toLocaleString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td style={{ maxWidth: '260px' }}>{c.message}</td>
                  <td style={{ maxWidth: '320px' }}><span className="muted">{c.reply?.slice(0, 140)}{c.reply?.length > 140 ? '…' : ''}</span></td>
                  <td><span className="tag dark">{MODE_LABEL[c.mode] || c.mode}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {chats.length === 0 && <p className="muted" style={{ fontSize: '.85rem', margin: '.6rem 0 0' }}>Tidak ada yang cocok.</p>}
      </Reveal>
    </main>
  );
}
