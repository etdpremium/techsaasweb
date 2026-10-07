'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// Tombol aksi kecil untuk tabel admin: panggil API lalu refresh data server.
function panggil(url, method, body, tanya) {
  if (tanya && !window.confirm(tanya)) return Promise.resolve(false);
  return fetch(url, {
    method, headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then(() => true).catch(() => false);
}

export function MajuBtn({ url, method, id, status, label }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  return (
    <button
      type="button" className="m-btn sm ghost" disabled={busy}
      onClick={async () => { setBusy(true); await panggil(url, method, { id, status }); setBusy(false); router.refresh(); }}
    >
      {busy ? '…' : label}
    </button>
  );
}

export function HapusBtn({ url, id, label }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  return (
    <button
      type="button" className="m-btn sm ghost" disabled={busy}
      onClick={async () => { setBusy(true); await panggil(url, 'DELETE', { id }, 'Hapus data ini?'); setBusy(false); router.refresh(); }}
    >
      {busy ? '…' : (label || 'Hapus')}
    </button>
  );
}

export function BersihLogBtn() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  return (
    <button
      type="button" className="m-btn sm ghost" disabled={busy}
      onClick={async () => { setBusy(true); await panggil('/api/chatlog', 'DELETE', {}, 'Hapus semua log chat >30 hari?'); setBusy(false); router.refresh(); }}
    >
      {busy ? '…' : 'Bersihkan >30 hari'}
    </button>
  );
}
