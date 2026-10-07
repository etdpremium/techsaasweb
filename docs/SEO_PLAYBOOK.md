# SEO Playbook — TechSaaSWeb

> Jujur di awal: **peringkat #1 tidak bisa dijamin dari kode.** Peringkat ditentukan
> Google dari relevansi + otoritas (backlink, usia domain, ulasan) + perilaku pengunjung
> + persaingan kata kunci + waktu (umumnya 3–6 bulan untuk kata kunci lokal).
> Yang playbook ini jamin: **fondasi teknis 100% benar**, sehingga satu-satunya
> pekerjaan tersisa adalah konten, reputasi, dan kesabaran — bukan bug teknis.

## 1. Sumber yang benar-benar dikonsultasikan

Teknis (dibaca saat menyusun playbook ini):
- Next.js docs — "How to implement JSON-LD" (script + `JSON.stringify` + sanitasi `<`)
- Next.js docs — Metadata API (`generateMetadata`, `alternates.canonical`, OG/Twitter)
- Next.js docs — file conventions (`sitemap.xml`, `robots.txt`, `opengraph-image`)
- GitHub gist — Technical SEO Checklist Next.js/React 2026 (SSR/SSG, INP/LCP/CLS, schema, semantic HTML)
- Artikel "Next.js SEO: App Router Guide 2026" (server components = default SEO, canonical per rute, JSON-LD dari server component)

Kompetitor Indonesia (pola yang diamati dari hasil pencarian, Okt 2026):
- `rumahjasamedia.com` (Jogja) — halaman per kota + daftar area (Sleman/Bantul/...), FAQ kaya keyword, statistik (200+ klien, rating 5.0), harga transparan
- `codeinspira.com` (Jakarta) — judul exact-keyword "Jasa Pembuatan Website Profesional di Jakarta", klaim tim lokal + legalitas PT + pengalaman
- Pola umum pemenang lokal: **URL per kota + H1 exact keyword + area yang dilayani + FAQ + harga + CTA konsultasi**

## 2. Celah yang dimanfaatkan (mengapa strategi ini)

1. **Halaman programatik per kota (44 URL)** — kebanyakan kompetitor hanya punya 1–3 halaman kota. Kita punya 44 + indeks + sitemap.
2. **FAQ + JSON-LD per halaman** — syarat tampil di rich results & dikutip AI Overviews.
3. **Copy Indonesia natural** — kompetitor menjejalkan keyword ("jasa website jogja" 20×). Kita pakai sekali di judul/H1, sisanya bahasa natural (aman dari spam filter).
4. **Kecepatan** — struktur Next.js ringan + gambar teroptimasi + tanpa library animasi.

## 3. Yang sudah diimplementasikan (terverifikasi)

| # | Item | Lokasi | Status |
|---|---|---|---|
| 1 | Metadata + canonical per rute (/, /pricing, /booking, /jasa-website, /jasa-website/[kota], /demos/[slug], /blog) | `layout.jsx` tiap segmen | ✅ |
| 2 | JSON-LD Organization + WebSite | `app/layout.jsx` | ✅ |
| 3 | JSON-LD FAQPage (beranda dari data FAQ asli, bukan duplikat) | `app/page.jsx` + `components/Faq.jsx` | ✅ |
| 4 | JSON-LD BreadcrumbList + FAQPage per kota | `app/jasa-website/[kota]/page.jsx` | ✅ |
| 5 | Sitemap dinamis (beranda, layanan, 44 kota, 6 demo, blog) | `app/sitemap.js` | ✅ |
| 6 | robots.txt (tutup /admin /dashboard /login /api, buka crawler AI) | `public/robots.txt` | ✅ |
| 7 | OG image bawaan 1200×630 | `app/opengraph-image.jsx` | ✅ |
| 8 | llms.txt untuk dikutip AI | `public/llms.txt` | ✅ |
| 9 | Optimasi gambar Next (WebP/AVIF) | `next.config.mjs` | ✅ |
| 10 | Satu H1 per halaman, HTML semantik (`main`, heading berurutan) | semua halaman | ✅ |
| 11 | Hapus `images.unoptimized` (penghambat LCP) | `next.config.mjs` | ✅ |

## 4. Backlog (di luar kode — butuh tindakan pemilik)

1. **Foto asli + alt deskriptif** — ganti `picsum.photos` di `SHOTS` (`app/page.jsx`) dan hero demo. Alt wajib mengandung keyword alami.
2. **Testimoni asli** — ganti `WALL` dummy (`app/page.jsx`) dengan 3+ klien nyata (nama + kota + foto). Klaim fiktif ("10.000 percakapan", "studi kasus nyata") di `lib/blog.js` wajib ditulis ulang jujur.
3. **Google Business Profile** — daftar + minta ulasan tiap serah terima (kompetitor menang di sini: "359 reviews", "5.0 rating").
4. **Search Console + Analytics** — daftarkan domain, submit sitemap, pantau query yang hampir ranking → buat artikelnya.
5. **Backlink awal** — direktori UMKM, profil media sosial, guest post. Tanpa ini, halaman kota sulit menyaingi domain 10 tahun.
6. **Konten rutin** — 1 artikel/minggu (slot newsletter sudah ada) menargetkan varian keyword ("harga website klinik", "cara booking online resto", ...).
7. **Data area per kota** — tambah daftar kecamatan/area di halaman kota prioritas (meniru pola pemenang Jogja).
8. **Ganti kontak placeholder** — nomor WA `6281234567890` & email `halo@techsaasweb.id` di `lib/pricing.js` dengan kontak asli sebelum live.

## 5. Pantangan (jangan pernah dilakukan)

- Beli backlink massal / link farm → penalti
- Duplikat konten antar halaman kota (konten sudah diinterpolasi per kota — jangan disamakan lagi)
- Menjejalkan keyword ("jasa website jogja" berulang) → filter spam
- Mengklaim angka palsu (rating, jumlah klien, "10.000 percakapan") → melanggar kepercayaan + kebijakan Google
- `npm run build` saat `npm run dev` jalan → cache `.next` campur (pernah merusak CSS + error `611.js`)
