/*
 * DemoMockup — SATU gambar komposit per demo (dirender via Playwright ke PNG):
 *  1) mockup homepage (browser + foto + section),
 *  2) panel admin (KPI + tabel),
 *  3) kartu chatbot,
 *  4) kartu booking.
 * Semua teks besar agar tetap terbaca saat gambar mengecil di HP.
 * Hanya dipakai halaman render sementara app/mockup/[slug].
 */
const PHOTO = {
  klinik: 'https://picsum.photos/seed/tsw-mock-klinik/900/620',
  properti: 'https://picsum.photos/seed/tsw-mock-properti/900/620',
  saas: 'https://picsum.photos/seed/tsw-mock-saas/900/620',
  resto: 'https://picsum.photos/seed/tsw-mock-resto/900/620',
  rental: 'https://picsum.photos/seed/tsw-mock-rental/900/620',
  ecommerce: 'https://picsum.photos/seed/tsw-mock-toko/900/620',
};

const ADMIN_ROWS = {
  klinik: [['Sofia M.', 'Cleaning — Sab 10.00', 'Baru'], ['John D.', 'Whitening — Sen 14.00', 'Cocok'], ['Maria G.', 'Kontrol — Rab 09.00', 'Menang']],
  properti: [['Budi S.', '3BR tour — Sab 11.00', 'Baru'], ['Siti R.', '2BR tour — Sab 14.00', 'Cocok'], ['Andi T.', 'Call dengan Ana', 'Menang']],
  saas: [['Acme Inc.', 'Trial Pro — hari ke-3', 'Baru'], ['Kopi Kita', 'Starter — aktif', 'Menang'], ['Bengkel Jaya', 'Business — negosiasi', 'Cocok']],
  resto: [['Meja 4', '2 orang — Jum 19.00', 'Baru'], ['Meja 7', '4 orang — Sab 20.00', 'Cocok'], ['Meja 2', '6 orang — Min 18.00', 'Menang']],
  rental: [['SUV B 1234', 'Jum–Sen ($177)', 'Baru'], ['Sedan B 5678', 'Jum–Sen ($132)', 'Cocok'], ['Van B 9012', 'Mingguan ($389)', 'Menang']],
  ecommerce: [['#1042', 'Bundle $49 — COD', 'Baru'], ['#1041', 'Satuan $24 — transfer', 'Menang'], ['#1040', 'Gift $79 — COD', 'Cocok']],
};

export default function DemoMockup({ demo }) {
  const d = demo;
  const rows = ADMIN_ROWS[d.slug] || ADMIN_ROWS.klinik;
  const qa = d.faq[0] || { q: 'harga', a: 'Siap, hubungi kami.' };
  return (
    <div style={{ width: 1500, background: '#F4F8FF', padding: 48, fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", color: '#0F1B4C' }}>
      {/* 1 — HOMEPAGE */}
      <div style={{ background: '#fff', borderRadius: 28, overflow: 'hidden', border: '1px solid rgba(15,27,76,.12)', boxShadow: '0 24px 60px rgba(15,27,76,.14)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#EAF1FE', padding: '18px 28px' }}>
          <span style={{ display: 'flex', gap: 8 }}>
            <i style={{ width: 18, height: 18, borderRadius: '50%', background: '#E5484D' }} />
            <i style={{ width: 18, height: 18, borderRadius: '50%', background: '#E8A838' }} />
            <i style={{ width: 18, height: 18, borderRadius: '50%', background: '#22C55E' }} />
          </span>
          <span style={{ flex: 1, background: '#fff', borderRadius: 999, padding: '10px 24px', fontSize: 22, color: '#5B6B8C' }}>{d.name.toLowerCase().replace(/[^a-z]+/g, '')}.com</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 28, padding: '26px 44px', borderBottom: '1px solid #EDF1F7' }}>
          <b style={{ fontSize: 34 }}>{d.name}</b>
          <span style={{ flex: 1, fontSize: 22, color: '#5B6B8C' }}>Beranda&ensp;&ensp;Layanan&ensp;&ensp;Harga&ensp;&ensp;Kontak</span>
          <span style={{ background: '#1E3A8A', color: '#fff', borderRadius: 999, padding: '12px 30px', fontSize: 22, fontWeight: 700 }}>{d.ctas[0]}</span>
        </div>
        <div style={{ display: 'flex', gap: 40, padding: '44px', alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <span style={{ display: 'inline-block', background: '#DBEAFE', color: '#1E3A8A', borderRadius: 999, padding: '8px 22px', fontSize: 22, fontWeight: 700 }}>{d.niche} · {d.location}</span>
            <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.15, margin: '20px 0', letterSpacing: '-.02em' }}>{d.headline}</div>
            <div style={{ fontSize: 26, color: '#333F66', marginBottom: 28 }}>{d.sub}</div>
            <div style={{ display: 'flex', gap: 16 }}>
              <span style={{ background: 'linear-gradient(135deg,#1E3A8A,#2f5bd7)', color: '#fff', borderRadius: 999, padding: '16px 40px', fontSize: 26, fontWeight: 700 }}>{d.ctas[0]}</span>
              <span style={{ border: '2px solid rgba(15,27,76,.16)', borderRadius: 999, padding: '16px 40px', fontSize: 26, fontWeight: 700 }}>{d.ctas[1]}</span>
            </div>
            <div style={{ marginTop: 26, fontSize: 22, color: '#5B6B8C' }}>★ {d.rating} · {d.hours}</div>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={PHOTO[d.slug]} alt="" width={560} height={385} style={{ width: 560, height: 385, objectFit: 'cover', borderRadius: 24 }} />
        </div>
        <div style={{ display: 'flex', gap: 20, padding: '0 44px 44px' }}>
          {d.formOptions.map((o) => (
            <div key={o} style={{ flex: 1, background: '#F1F4FA', borderRadius: 18, padding: '22px 26px', fontSize: 23, fontWeight: 600 }}>{o}</div>
          ))}
        </div>
      </div>

      {/* 2+3+4 — ADMIN + CHAT + BOOKING */}
      <div style={{ display: 'flex', gap: 32, marginTop: 32, alignItems: 'flex-start' }}>
        <div style={{ flex: 1.25, background: '#0F1B4C', color: '#fff', borderRadius: 28, padding: 40 }}>
          <div style={{ fontSize: 22, letterSpacing: '.1em', color: '#A9C4FF', fontWeight: 800 }}>PANEL PEMILIK — {d.name.toUpperCase()}</div>
          <div style={{ display: 'flex', gap: 20, margin: '26px 0' }}>
            {[['Prospek', '128'], ['Booking', '46'], ['Omzet', '+32%']].map(([l, v]) => (
              <div key={l} style={{ flex: 1, background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.16)', borderRadius: 18, padding: '18px 22px' }}>
                <div style={{ fontSize: 44, fontWeight: 800 }}>{v}</div>
                <div style={{ fontSize: 22, color: '#C9CDE8' }}>{l}</div>
              </div>
            ))}
          </div>
          {rows.map(([a, b, s]) => (
            <div key={a} style={{ display: 'flex', gap: 16, alignItems: 'center', background: 'rgba(255,255,255,.06)', borderRadius: 14, padding: '14px 22px', marginBottom: 12, fontSize: 23 }}>
              <b style={{ flex: 1 }}>{a}</b><span style={{ color: '#C9CDE8' }}>{b}</span>
              <span style={{ background: s === 'Menang' ? '#16A870' : s === 'Cocok' ? '#6D28D9' : '#2f5bd7', borderRadius: 999, padding: '6px 20px', fontSize: 20, fontWeight: 700 }}>{s}</span>
            </div>
          ))}
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 32 }}>
          <div style={{ background: '#fff', borderRadius: 28, padding: 36, border: '1px solid rgba(15,27,76,.12)' }}>
            <div style={{ fontSize: 22, letterSpacing: '.1em', color: '#1E3A8A', fontWeight: 800, marginBottom: 18 }}>CHATBOT — ELFAENT</div>
            <div style={{ background: '#fff', border: '1px solid rgba(15,27,76,.12)', borderRadius: '20px 20px 20px 6px', padding: '16px 22px', fontSize: 24, marginBottom: 14, maxWidth: '90%' }}>{d.greeting}</div>
            <div style={{ background: '#F1F4FA', borderRadius: '20px 20px 6px 20px', padding: '16px 22px', fontSize: 24, marginBottom: 14, marginLeft: '10%', textAlign: 'right' }}>{qa.q}</div>
            <div style={{ background: '#fff', border: '1px solid rgba(15,27,76,.12)', borderRadius: '20px 20px 20px 6px', padding: '16px 22px', fontSize: 24, maxWidth: '90%' }}>{qa.a}</div>
            <div style={{ display: 'flex', gap: 12, marginTop: 18 }}>
              {d.quick.map((q) => (
                <span key={q} style={{ border: '2px solid rgba(30,58,138,.25)', color: '#1E3A8A', borderRadius: 999, padding: '10px 26px', fontSize: 22, fontWeight: 700 }}>{q}</span>
              ))}
            </div>
          </div>
          <div style={{ background: '#fff', borderRadius: 28, padding: 36, border: '1px solid rgba(15,27,76,.12)' }}>
            <div style={{ fontSize: 22, letterSpacing: '.1em', color: '#1E3A8A', fontWeight: 800, marginBottom: 18 }}>BOOKING OTOMATIS — {d.formTitle.toUpperCase()}</div>
            {d.formOptions.map((o) => (
              <div key={o} style={{ border: '2px solid rgba(15,27,76,.12)', borderRadius: 14, padding: '14px 22px', fontSize: 24, marginBottom: 12 }}>{o}</div>
            ))}
            <div style={{ background: 'linear-gradient(135deg,#1E3A8A,#2f5bd7)', color: '#fff', borderRadius: 999, padding: '16px', fontSize: 26, fontWeight: 700, textAlign: 'center', marginTop: 8 }}>{d.formCta}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
