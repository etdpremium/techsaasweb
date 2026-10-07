// Admin tables (server component — read-only view)
import { MajuBtn, HapusBtn } from './actions';

const STATUS_LABEL = { new: 'Baru', contacted: 'Dihubungi', contact: 'Dihubungi', qualified: 'Cocok', qual: 'Cocok', won: 'Menang', lost: 'Gagal' };
const NEXT_STATUS = { new: 'contacted', contacted: 'qualified', qualified: 'won', qual: 'won', contact: 'qualified' };
const NEXT_LABEL = { contacted: 'Dihubungi', qualified: 'Cocok', won: 'Menang' };

function tanggal(dt) {
  try { return new Date(dt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }); } catch { return ''; }
}

export function AdminLeads({ leads }) {
  if (!leads.length) return <p className="muted" style={{ fontSize: '.9rem', margin: 0 }}>Belum ada prospek.</p>;
  return (
    <div style={{ overflowX: 'auto' }}>
      <table className="admin-table">
        <thead><tr><th>Nama</th><th>Kontak</th><th>Sumber</th><th>Status</th><th>Tanggal</th><th>Aksi</th></tr></thead>
        <tbody>
          {leads.map((l) => (
            <tr key={l.id}>
              <td><strong>{l.name}</strong><div className="muted" style={{ fontSize: '.75rem' }}>{l.note || ''}</div></td>
              <td>{l.contact}</td>
              <td><span className="tag dark">{l.source}</span></td>
              <td><span className={`pill-status ${l.status}`}>{STATUS_LABEL[l.status] || l.status}</span></td>
              <td className="muted" style={{ whiteSpace: 'nowrap' }}>{tanggal(l.createdAt)}</td>
              <td style={{ whiteSpace: 'nowrap' }}>
                {NEXT_STATUS[l.status] && l.status !== 'won' && l.status !== 'lost' && (
                  <MajuBtn url="/api/leads" method="PUT" id={l.id} status={NEXT_STATUS[l.status]} label={`→ ${NEXT_LABEL[NEXT_STATUS[l.status]]}`} />
                )}{' '}
                <HapusBtn url="/api/leads" id={l.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function AdminOrders({ orders, formatHarga }) {
  if (!orders.length) return <p className="muted" style={{ fontSize: '.9rem', margin: 0 }}>Belum ada pesanan.</p>;
  const fmt = formatHarga || ((o) => `${o.price}`);
  return (
    <div style={{ overflowX: 'auto' }}>
      <table className="admin-table">
        <thead><tr><th>Paket</th><th>Harga</th><th>Status</th><th>Klien</th><th>Aksi</th></tr></thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id}>
              <td><strong>{o.planName}</strong></td>
              <td>{fmt(o)}</td>
              <td><span className={`pill-status ${o.status === 'launched' ? 'won' : o.status === 'cancelled' ? 'lost' : 'new'}`}>{o.status}</span></td>
              <td className="muted">{o.user?.email}</td>
              <td style={{ whiteSpace: 'nowrap' }}>
                {o.status === 'new' && <MajuBtn url="/api/orders" method="PATCH" id={o.id} status="building" label="→ Kerjakan" />}{' '}
                {o.status === 'building' && <MajuBtn url="/api/orders" method="PATCH" id={o.id} status="launched" label="→ Online" />}{' '}
                {(o.status === 'new' || o.status === 'building') && <MajuBtn url="/api/orders" method="PATCH" id={o.id} status="cancelled" label="Batal" />}{' '}
                <HapusBtn url="/api/orders" id={o.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function AdminSubs({ subs }) {
  if (!subs.length) return <p className="muted" style={{ fontSize: '.9rem', margin: 0 }}>Belum ada yang berlangganan.</p>;
  return (
    <div style={{ maxHeight: '220px', overflowY: 'auto' }}>
      <table className="admin-table">
        <thead><tr><th>Email</th><th>Bergabung</th><th>Aksi</th></tr></thead>
        <tbody>
          {subs.map((s) => (
            <tr key={s.id}>
              <td>{s.email}</td>
              <td className="muted">{new Date(s.createdAt).toLocaleDateString('id-ID')}</td>
              <td><HapusBtn url="/api/newsletter" id={s.id} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
