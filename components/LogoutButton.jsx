'use client';

// Tombol keluar: hapus session lalu ke beranda.
export default function LogoutButton() {
  async function keluar() {
    try {
      await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'logout' }),
      });
    } catch {
      // tetap keluar walau request gagal
    }
    window.location.href = '/';
  }

  return (
    <button onClick={keluar} className="m-btn sm ghost" type="button">
      Keluar
    </button>
  );
}
