# Plan Redesign — TechSaaSWeb Landing 3D Futuristik

Sumber: permintaan user 2026-09-22 (tema dark slate, sirkuit PCB 10-15%, parallax 3 layer, glassmorphism, ikon 3D isometric melayang, navbar glow, dashboard bg).

## Stack
- Next.js 15 App Router (sudah ada di `techsaasweb/`) + `next/font` Space Grotesk
- Styling: `app/globals.css` murni (tanpa Tailwind runtime tambahan biar SEO ringan) + inline style untuk glow
- Deploy: Cloudflare Pages via `@opennextjs/cloudflare` (nanti)

## Struktur Assets (baru, terstruktur)

```
public/
  logo.svg                              # logo asli verbatim (sudah ada, 137KB)
  assets/
    logos/
      logo.svg                          # copy resmi (sinkron dengan public/logo.svg)
    backgrounds/
      dashboard-bg.svg                  # file asli dari user (1680px JPEG Canva)
      circuit-overlay.svg               # grid PCB tipis 10-15% untuk layer 2
    3d/
      (ikon dibuat inline CSS/SVG, tidak perlu file terpisah)
```

- File dashboard bg: simpan **verbatim** dari prompt (SVG dengan <image> JPEG base64 + metadata c2pa). Jangan transkripsi.
- circuit-overlay.svg: pola grid isometrik tipis, stroke rgba(0,242,254,.12), dipakai sebagai Layer 2.

## Desain Latar 3 Layer (globals.css)

1. Layer 1 — base: `background: #0B0F19` (atau #080B11) pada `body`
2. Layer 2 — circuit: `body::before` fixed, `background-image: url(/assets/backgrounds/circuit-overlay.svg)`, opacity 0.12, pointer-events none
3. Layer 3 — glow: `body::after` fixed, dua `radial-gradient` cyan/blue (`#00F2FE` 18% + `#3B82F6` 12%) di posisi berbeda, blur

## Navbar

- Wrapper `.nav-shell`: `position: sticky; top: 16px; z-index: 40` berisi `.nav` dengan `backdrop-filter: blur(12px)`, `background: rgba(11,15,25,.6)`, `border: 1px solid rgba(255,255,255,.08)`, `border-radius: 14px`
- Logo kiri: komponen `Logo` (crop viewBox 399/655)
- Menu tengah: gap 28px, font .9rem
- CTA kanan: `.btn-glow` — border 1px solid #00F2FE + `box-shadow: 0 0 16px rgba(0,242,254,.45)`, rounded-full

## Hero Card (Home)

- Container `.hero-card`: centered, `max-width: 1100px`, `border-radius: 24px`, `background: rgba(255,255,255,.04)`, `backdrop-filter: blur(18px)`, `border: 1px solid rgba(255,255,255,.08)`, `box-shadow: 0 20px 60px rgba(0,0,0,.5)`
- Grid 2 kolom: kiri typography, kanan area ikon 3D
- Kiri: headline "Transformasi Digital Dimulai Di Sini" 44px bold white, sub copy, 2 CTA (Coba Gratis glow + Lihat Demo ghost)
- Kanan: 3 ikon 3D isometrik (kubus, cloud node, tech plate) — div dengan `transform: rotateX(30deg) rotateZ(-20deg)`, `box-shadow` drop, `position: absolute` dengan `top/right` berbeda sehingga memotong tepi kartu (overflow visible), animasi `float` 4s

## Dashboard Background

- `app/dashboard/page.jsx` wrapper `background: url(/assets/backgrounds/dashboard-bg.svg) center/cover` dengan overlay `rgba(8,11,17,.55)` agar teks tetap baca

## Chat Widget

- Tetap CS-style (bubble chat + panel), tidak pakai ikon AI, tidak ada emoji

## SEO

- Metadata tetap English untuk global, headline hero Indonesia sesuai brief visual
- `sitemap.js`, `robots.txt`, `llms.txt` tetap

## Verifikasi

- `npm run build` harus sukses
- `curl /` 200, cek `circuit-overlay.svg` 200, `dashboard-bg.svg` 200
- Logo tetap byte-identik (137300)

## Urutan Eksekusi

1. Buat folder + simpan file dashboard-bg verbatim + buat circuit-overlay
2. Edit globals.css
3. Edit layout.jsx (navbar)
4. Edit page.jsx (hero)
5. Edit dashboard/page.jsx (bg)
6. Build & verify
