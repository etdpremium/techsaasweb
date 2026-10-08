'use client';
import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Reveal from '../../components/Reveal';
import { tiers, TERMS } from '../../lib/pricing';
import { getDemo } from '../../lib/demos';
import { juta } from '../../lib/format';

// Nomor WhatsApp & email resmi mengikuti lib/pricing.js (satu sumber).
function tierLabel(t) {
  return t.price == null ? `${t.name} — hubungi kami` : `${t.name} — ${juta(t.price)}`;
}

function ContactForm() {
  const sp = useSearchParams();
  const planFromUrl = sp.get('plan');
  const tier = tiers.find((t) => t.id === planFromUrl);
  // Request dari halaman contoh: ?demo=slug&pages=A,B,C
  const demoFromUrl = getDemo(sp.get('demo') || '');
  const pagesFromUrl = String(sp.get('pages') || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 15);
  const [sent, setSent] = useState(false);
  const [invoice, setInvoice] = useState(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const [planId, setPlanId] = useState(tier ? tier.id : '');

  async function onSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    setBusy(true);
    setErr('');
    try {
      const res = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fd.get('name'),
          email: fd.get('email'),
          phone: fd.get('phone'),
          plan: String(fd.get('plan')),
          message: `${fd.get('msg') || ''} | niche: ${fd.get('niche') || '-'} | domain: ${fd.get('domain') || '-'}`,
        }),
      });
      const data = await res.json();
      if (data.ok) {
        const chosen = tiers.find((t) => t.id === fd.get('plan'));
        // Nomor invoice dari ID record (ditampilkan ke pelanggan & dipakai konfirmasi WA).
        const invNo = `INV-${String(data.id).replace(/[^A-Za-z0-9]/g, '').slice(-8).toUpperCase()}`;
        setInvoice({ no: invNo, tier: chosen || null });
        setSent(true);
      } else {
        setErr(data.error || 'Gagal mengirim. Coba lagi.');
      }
    } catch {
      setErr('Gagal mengirim. Coba lagi.');
    }
    setBusy(false);
  }

  if (sent) {
    const total = invoice?.tier?.price ? `Rp ${invoice.tier.price.toLocaleString('id-ID')}` : null;
    return (
      <Reveal className="m-card" style={{ textAlign: 'center' }}>
        <h2>Terima kasih! Pesanan Anda masuk.</h2>
        <p className="muted" style={{ marginTop: '.4rem' }}>
          Nomor invoice: <strong>{invoice.no}</strong>
        </p>

        {invoice?.tier ? (
          <div className="m-card flat" style={{ marginTop: '1rem', textAlign: 'left', fontSize: '.94rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
              <span>Paket</span>
              <strong>{invoice.tier.name}</strong>
            </div>
            {total && (
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', marginTop: '.4rem' }}>
                <span>Total</span>
                <strong>{total}</strong>
              </div>
            )}
            <p className="muted" style={{ fontSize: '.82rem', marginTop: '.3rem' }}>
              Domain .com/.id, hosting, SSL, dan semua infrastruktur sudah termasuk — tanpa biaya tersembunyi.
            </p>
            <div style={{ marginTop: '.8rem' }}>
              <strong style={{ fontSize: '.86rem' }}>Metode pembayaran:</strong>
              <ul style={{ margin: '.35rem 0 0', paddingLeft: '1.1rem', fontSize: '.86rem' }}>
                {TERMS.paymentMethods.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <p className="muted" style={{ marginTop: '.8rem', fontSize: '.9rem' }}>
            Anda belum memilih paket — kami bantu pilihkan yang paling pas via WhatsApp.
          </p>
        )}

        <p className="muted" style={{ fontSize: '.8rem', marginTop: '.8rem' }}>
          Setelah pembayaran dikonfirmasi, website Anda online dalam 3–14 hari sesuai paket.
        </p>
        <a href="/demos/klinik" className="m-btn ghost" style={{ marginTop: '.6rem' }}>
          Lihat demo sambil menunggu
        </a>
      </Reveal>
    );
  }

  return (
      <Reveal className="m-card">
      <h3 style={{ marginBottom: '1rem', fontSize: '1.15rem' }}>Isi data pemesanan</h3>
      {err && <div className="form-err">{err}</div>}
      {demoFromUrl && (
        <div className="m-card flat" style={{ background: 'var(--panel2)', fontSize: '.88rem' }}>
          Request dari contoh <strong>{demoFromUrl.name}</strong>
          {pagesFromUrl.length > 0 && (
            <span> — {pagesFromUrl.length} halaman: {pagesFromUrl.join(', ')}</span>
          )}
        </div>
      )}
      <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '.9rem' }}>
        <label className="fl">Nama
          <input className="m-input" name="name" required placeholder="Budi Santoso" />
        </label>
        <label className="fl">Email
          <input className="m-input" name="email" type="email" required placeholder="anda@bisnis.com" />
        </label>
        <label className="fl">WhatsApp
          <input className="m-input" name="phone" type="tel" required placeholder="0812-3456-7890" />
        </label>
        <label className="fl">Pilih paket
          <select
            className="m-input"
            name="plan"
            value={planId}
            onChange={(e) => setPlanId(e.target.value)}
          >
            <option value="">Belum pasti — bantu pilihkan</option>
            {tiers.map((t) => (
              <option key={t.id} value={t.id}>{tierLabel(t)}</option>
            ))}
          </select>
        </label>
        <div className="grid2">
          <label className="fl">Niche bisnis Anda
            <input className="m-input" name="niche" placeholder="Klinik gigi" defaultValue={demoFromUrl ? demoFromUrl.niche : ''} />
          </label>
          <label className="fl">Domain impian
            <input className="m-input" name="domain" placeholder="gigisehat.com" />
          </label>
        </div>
        <label className="fl">Pesan
          <textarea
            className="m-input"
            name="msg"
            rows={3}
            placeholder="Perlu CS otomatis & booking? Website sekarang gimana? Target waktu?"
            defaultValue={demoFromUrl ? `Contoh website: ${demoFromUrl.name}${pagesFromUrl.length ? ` — Halaman dipilih (${pagesFromUrl.length}): ${pagesFromUrl.join(', ')}` : ''}` : ''}
          />
        </label>
        <button className="m-btn block" type="submit" disabled={busy}>
          {busy ? 'Mengirim...' : 'Kirim — balasan dalam 24 jam'}
        </button>
      </form>
    </Reveal>
  );
}

export default function Contact() {
  return (
    <main className="wrap grid2 booking-grid" style={{ paddingTop: '2.6rem', maxWidth: 1100, alignItems: 'start' }}>
      <Suspense fallback={<div className="m-card"><h2>Memuat...</h2></div>}>
        <ContactForm />
      </Suspense>
      <Reveal>
        <div>
          <h1 style={{ fontSize: '1.6rem', lineHeight: 1.2, marginBottom: '.55rem' }}>Pesan website untuk usaha Anda</h1>
          <p className="muted" style={{ fontSize: '.9rem', marginBottom: '1.2rem' }}>
            Konsultasi gratis. Kami bilang paket mana yang cocok — atau kalau Anda sebaiknya tidak beli.
          </p>
        </div>
        <div className="m-card flat" style={{ fontSize: '.9rem' }}>
          <strong>Cara kerjanya — 7 langkah:</strong>
          <ol style={{ margin: '.6rem 0 0', paddingLeft: '1.2rem' }}>
            <li>Pilih paket &amp; kirim form ini</li>
            <li>Diskusi santai (bisnis, harga, jam buka)</li>
            <li>Kami bangun — 3 sampai 14 hari</li>
            <li>Domain .com gratis + website ditayangkan</li>
            <li>Anda setujui preview-nya</li>
            <li>Video pelatihan + serah terima</li>
            <li>Kami rawat, Anda layani pelanggan</li>
          </ol>
        </div>
        <div className="m-card flat" style={{ marginTop: '1.5rem', fontSize: '.9rem' }}>
          <strong>Sudah termasuk di semua paket</strong>
          <ul style={{ margin: '.5rem 0 0', paddingLeft: '1.2rem' }}>
            <li>Domain .com atau .id untuk tahun pertama</li>
            <li>Hosting edge global + SSL otomatis</li>
            <li>Proteksi DDoS &amp; firewall</li>
            <li>Statistik pengunjung tanpa banner cookie</li>
          </ul>
        </div>
        <div className="m-card flat" style={{ marginTop: '1.5rem', fontSize: '.9rem' }}>
          <strong>Metode pembayaran</strong>
          <ul style={{ margin: '.5rem 0 0', paddingLeft: '1.2rem' }}>
            {TERMS.paymentMethods.map((m) => <li key={m}>{m}</li>)}
          </ul>
        </div>
      </Reveal>
    </main>
  );
}
