'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Eye, EyeOff, ArrowLeft, ShieldCheck } from 'lucide-react';

function AuthForm() {
  const sp = useSearchParams();
  const next = sp.get('next') || '/dashboard';
  const [showPw, setShowPw] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  useEffect(() => {
    fetch('/api/auth', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'me' }) })
      .then((r) => r.json())
      .then((d) => { if (d.ok) window.location.href = next; })
      .catch(() => {});
  }, [next]);

  // Kunci zoom keyboard + trackpad (Ctrl+scroll / cubit) khusus halaman login.
  useEffect(() => {
    const stopWheel = (e) => { if (e.ctrlKey) e.preventDefault(); };
    const stopKeys = (e) => {
      if ((e.ctrlKey || e.metaKey) && ['+', '-', '=', '0'].includes(e.key)) e.preventDefault();
    };
    const stopTouch = (e) => { if (e.touches && e.touches.length > 1) e.preventDefault(); };
    const stopGesture = (e) => e.preventDefault();
    document.addEventListener('wheel', stopWheel, { passive: false });
    document.addEventListener('keydown', stopKeys);
    document.addEventListener('touchmove', stopTouch, { passive: false });
    document.addEventListener('gesturestart', stopGesture);
    document.addEventListener('gesturechange', stopGesture);
    return () => {
      document.removeEventListener('wheel', stopWheel);
      document.removeEventListener('keydown', stopKeys);
      document.removeEventListener('touchmove', stopTouch);
      document.removeEventListener('gesturestart', stopGesture);
      document.removeEventListener('gesturechange', stopGesture);
    };
  }, []);

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setErr('');
    try {
      const res = await fetch('/api/auth', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', ...form }),
      });
      const data = await res.json();
      if (data.ok) {
        window.location.href = next;
      } else {
        setErr(data.error === 'Wrong email or password.' ? 'Email atau kata sandi salah. Silakan coba lagi.' : data.error || 'Gagal masuk. Coba lagi.');
      }
    } catch {
      setErr('Koneksi bermasalah. Periksa internet Anda lalu coba lagi.');
    }
    setBusy(false);
  }

  function set(k, v) { setForm((f) => ({ ...f, [k]: v })); }

  return (
    <div className="login-split">
      {/* ---- Kiri: form ---- */}
      <div className="login-left">
        <div className="login-inner">
          <h1 className="login-title">Selamat <span>datang</span></h1>
          <p className="muted login-sub">
            Masuk untuk mengelola website, pesanan, dan konten Anda dalam satu tempat.
          </p>

          {err && <div className="form-err" role="alert">{err}</div>}

          <form onSubmit={submit} className="login-form">
            <label className="fl">Email
              <input
                className="m-input" type="email" autoComplete="email"
                value={form.email} onChange={(e) => set('email', e.target.value)}
                required placeholder="nama@bisnis.com"
              />
            </label>
            <label className="fl">Kata sandi
              <span className="pw-wrap">
                <input
                  className="m-input"
                  type={showPw ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={form.password}
                  onChange={(e) => set('password', e.target.value)}
                  required minLength={6}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  aria-label={showPw ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                  className="pw-eye"
                >
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </span>
            </label>
            <button className="m-btn block login-btn" type="submit" disabled={busy}>
              {busy ? 'Memproses…' : 'Masuk ke Dashboard'}
            </button>
          </form>

          <div className="login-foot">
            <p className="login-secure">
              <ShieldCheck size={15} /> Koneksi terenkripsi & sesi aman
            </p>
            <a href="/" className="login-back">
              <ArrowLeft size={15} /> Kembali ke beranda
            </a>
          </div>
        </div>
      </div>

      {/* ---- Kanan: foto full ---- */}
      <div className="login-right" aria-hidden="true">
        <img
          src="/login-visual.svg"
          alt=""
          className="login-photo"
          onError={(e) => { e.currentTarget.src = '/hero/woman.webp'; }}
        />
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="login-split"><div className="login-left"><p className="muted">Memuat…</p></div></div>}>
      <AuthForm />
    </Suspense>
  );
}
