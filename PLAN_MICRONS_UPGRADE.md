# Plan Upgrade — TechSaaSWeb ala Microns.io (tapi lebih bagus)

Sumber: analisa end-to-end `https://www.microns.io/` (home + pricing) 2026-09-22
+ SRS v1.0 + PRD v1.0 (`/home/wpx-elfaent/techsaasweb-docs/`).

## 1. Hasil analisa microns.io (yang dipelajari)

| Pola microns.io | Fungsi konversi | Adopsi di TechSaaSWeb |
|---|---|---|
| Sticky nav: logo kiri, link tengah, Login + Join CTA kanan | Navigasi + 2 CTA | Sudah ada; tambah link Compare + CTA ganda |
| Hero: headline besar + sub + kartu melayang + video | Hook 5 detik | Sudah ada (hero-card 3D); tambah video→ganti demo interaktif + stats bar |
| Strip "Featured on" (press logos) | Trust instan | Ganti "Built for" (niche strip: Dental, Realty, SaaS, Resto, Rental, Store) |
| Listing grid: foto + tag kategori + judul + deskripsi + pasangan metrik (Annual Revenue / Asking Price) | Browse + klik | **Demo cards** dgn pasangan metrik (+leads / launch days / chats) + filter/search/sort |
| Recently Sold | Bukti laku | Ganti "Success Stories" (3 kartu + tanggal) |
| Newsletter band (10.000+ subs) | Capture email | Newsletter band → `POST /api/newsletter` |
| Wall of Love (tweet cards + avatar) | Social proof | Wall of Love statis (6 kartu, tanpa hotlink avatar) |
| Pricing: Free vs Premium + tabel Compare + komisi seller + Testimonials + FAQ | Monetisasi + SEO | Pertahankan 3 tier ($29/$69/$129) + tabel Compare vs kompetitor + FAQ accordion |
| Footer kaya: Company, Compare X-alternative, Services, Browse by Budget, Categories, Industries | SEO long-tail | Footer kaya: Services, Compare, Demos by Niche, Budget tiers |
| Halaman Compare (Flippa/Acquire/Empire Flippers alternative) | SEO + objeksi | **Satu halaman `/compare`** (vs GoHighLevel, Wix/Squarespace, Agency $10k) |

Yang TIDAK ditiru: model marketplace (bukan bisnismu), hotlink aset Webflow/CDN
mereka (copyright + berat), light-theme (brand kamu dark 3D futuristik).

## 2. Batasan bisnis (dari SRS/PRD — wajib patuh)

- Jualan: Starter $29 / Pro $69 / Business $129, build included, min. term 6 bln,
  annual pay-10-get-12, 7-day money-back if not launched.
- Bahasa site: English. Claim jujur: quota chats, fallback WA form, no unlimited AI.
- Solo-maintainable: tanpa paket npm baru, aset inline CSS/SVG saja,
  backend tetap in-memory (D1 saat deploy Cloudflare nanti).
- Tidak klaim HIPAA/SOC2. Tidak resell API mentah.

## 3. Implementasi (file per file)

1. `components/DemoCard.jsx` — kartu listing ala microns (tag niche, judul,
   deskripsi, pasangan metrik, CTA Open demo). Data dari `lib/demos.js` + peta
   metrik per slug (tanpa ubah lib).
2. `components/RoiCalculator.jsx` (client) — slider ads spend + leads/mo +
   avg order → CPL, revenue, ROAS. Tanpa backend (sesuai PRD: contoh 6.4x).
3. `components/Faq.jsx` (client) — accordion CSS-only + state minimal
   (8 Q dari PRD/SRS: quota, data ownership, cancel, refund, dsb).
4. `components/NewsletterForm.jsx` (client) — email → `/api/newsletter`.
5. `app/api/newsletter/route.js` — validasi email, simpan in-memory (prod: D1),
   response `{ok:true}`. Pola sama dgn `/api/leads`.
6. `app/page.jsx` (rewrite) — hero 3D (dipertahankan) + stats bar + demo grid
   (6 DemoCard) + niche strip + How it works + ROI calculator + Wall of Love +
   Success Stories + pricing teaser + FAQ + newsletter band.
7. `app/demos/page.jsx` (rewrite, client) — search + filter niche + sort
   (nama/niche) ala marketplace browse.
8. `app/compare/page.jsx` (baru) — tabel TechSaaSWeb vs GoHighLevel vs
   Wix/Squarespace vs Agency: harga, launch time, AI chatbot, dashboard, support.
9. `app/layout.jsx` — nav tambah link Compare; footer kaya 4 kolom
   (Services, Compare, Demos by Niche, Budget) + newsletter mini.
10. `app/globals.css` — tambah: `.listing-card`, `.tag`, `.metric-pair`,
    `.strip`, `.wall`, `.faq`, `.newsletter-band`, `.footer-grid`, `.input`,
    `.table-compare`; tanpa ubah style lama.

## 4. Verifikasi

- `npm run build` sukses (tambah 1 route `/compare`, `/api/newsletter`).
- curl 200: `/`, `/demos`, `/compare`, `/pricing`, `/api/newsletter` (GET count).
- POST `/api/newsletter` valid + invalid → ok:true / 400.
- Konten mengandung: "Wall of Love", "Success Stories", "ROI", "Compare".
