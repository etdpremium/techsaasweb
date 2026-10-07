'use client';
import { usePathname } from 'next/navigation';

// Latar tematik per halaman: cahaya radial halus, fixed di belakang konten.
const THEMES = [
  { match: (p) => p.startsWith('/pricing'), theme: 'violet' },
  { match: (p) => p.startsWith('/blog'), theme: 'teal' },
  { match: (p) => p.startsWith('/booking') || p.startsWith('/contact') || p.startsWith('/login'), theme: 'sky' },
  { match: (p) => p.startsWith('/services') || p.startsWith('/demos') || p.startsWith('/jasa-website'), theme: 'indigo' },
];

export default function PageGlow() {
  const path = usePathname() || '/';
  const theme = (THEMES.find((t) => t.match(path)) || { theme: 'blue' }).theme;
  return <div className="page-glow" data-theme={theme} aria-hidden="true" />;
}
