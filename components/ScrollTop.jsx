'use client';
import { useEffect } from 'react';

// Setiap refresh/muat ulang selalu mulai dari atas halaman —
// kecuali URL membawa hash (mis. /pricing#compare) yang memang menuju bagian tertentu.
export default function ScrollTop() {
  useEffect(() => {
    try {
      history.scrollRestoration = 'manual';
    } catch {}
    if (!window.location.hash) window.scrollTo(0, 0);
  }, []);
  return null;
}
