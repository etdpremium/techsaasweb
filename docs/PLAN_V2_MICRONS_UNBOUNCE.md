# PLAN — TechSaaSWeb v2 (microns look + unbounce selling concept)

Target: tampilan ala microns.io (cream, pill, listing cards) + pola jualan
outcome-led ala Unbounce (section per manfaat, per niche, CTA band berulang),
fitur disesuaikan dengan produk asli (web + chatbot + booking, $29/$69/$129),
sampai full stack.

## 0. Apa yang dipelajari dari referensi

Microns.io (VISUAL — design tokens hasil inspect computed style):
- body bg cream `#FFF8F1`, teks `#333333`, ink heading `#090A25`
- font: Poppins (body 16px), Maven Pro (h1 80px/800, h2 50px/700, h5 24px)
- card: putih, `border-radius:15px`, shadow `rgba(0,0,0,.08) 2px 3px 44px`
- button: pill `border-radius:100px`, 18px/500, padding 12px
- tag: pill `#CCE8FE`, border `1px solid rgba(0,0,0,.1)`, 600
- aksen oranye `#EE4B02`, panel peach `#F8E7D6`, panel soft `#ECEEF5`
- container 1320px, spacer 100px antar section
- urutan section: nav sticky → hero besar → strip "Featured on" → grid listing
  (foto + tag + judul + desc + pasangan metrik) → recently sold → newsletter
  → Wall of Love → Success Stories → premium band (dark `#0A0B18`) → footer 6 kolom

Unbounce (KONSEP PENJUALAN — dari heading structure):
- Hook outcome dulu: "Convert more customers with one platform"
- Tiap section = 1 manfaat utama + 3 sub-feature card
- Section per niche/target (SaaS businesses, Ecommerce, Agencies)
- "Why marketers love" + CTA band berulang di tengah & akhir
- Copy singkat-padat per card, gak paragraf panjang

## 1. Posisi produk (tidak berubah, dari SRS/PRD)

TechSaaSWeb = productized service. Jualan web+chatbot+dashboard done-for-you,
3 tier: Starter $29 (no chatbot) / Business $69 (300 chat) / Automation $129
(1000 chat + booking). Build included, .com gratis thn 1, min. term 6 bln.
Bukan marketplace (model microns gak dipakai — hanya tampilan/listing grid-nya).

## 2. Design system baru (globals.css)

Palet (mengganti dark slate lama):
- bg cream `#FFF8F1`, surface putih `#FFFFFF`, panel peach `#F8E7D6`,
  panel soft `#ECEEF5`
- ink `#090A25`, body `#333333`, muted `#6B7280`
- primary (CTA) oranye `#EE4B02`, hover `#C93F02`
- info tag `#CCE8FE`, success `#0E9B5B`, danger `#E5484D`

Tipografi: heading Maven Pro 800/700 (48–80px), body Poppins 400 (16px).
Komponen: `.m-card` (radius 15, shadow microns), `.m-btn` (pill 100px),
`.m-tag` (pill biru muda), container 1320px, spacer 80–100px.

## 3. Arsitektur full stack

```
prisma/schema.prisma        SQLite (dev) → D1/Postgres saat deploy
lib/prisma.js               client singleton
app/api/auth/*              register/login/logout (cookie session)
app/api/leads/route.js      + GET list (auth), POST publik
app/api/chat/route.js       dipertahankan (pool OpenRouter + fallback)
app/api/newsletter/         + GET list (auth)
app/api/orders/route.js     order baru (plan_id) → admin
app/api/contacts/route.js   pesan dari form kontak (publik)
app/(site)/*                halaman marketing (home, pricing, demos, compare,
                            services, contact, blog list/detail)
app/(admin)/admin/*         dashboard client + admin (auth wajib)
middleware.js               proteksi /admin & /dashboard
```

Auth: session cookie httpOnly + bcrypt (JWT signed, no new heavy dep).
Deploy: tetap Cloudflare-ready; Prisma client dipakai via adapter saat deploy
(schema SQLite lokal = cermin D1).

## 4. Fitur yang diganti / disesuaikan

| Lama | Baru |
|---|---|
| Homepage dark 3D hero | Hero microns-style (h1 besar, sub, 2 CTA, card visual) |
| Demo card polos | Listing card ala microns: foto + tag niche + metrik hasil |
| Wall of Love dummy | Testimoni dari DB (seeding 6) |
| Blog: gak ada | `/blog` + `/blog/[slug]` (mdx-lite, 6 artikel SEO seeded) |
| Contact → leads inbox | Contact → tabel `contacts` + email notif (console dev) |
| Pricing statis 3 kartu | Pricing ala microns: toggle monthly/annual, compare table, FAQ |
| Dashboard mock statis | Dashboard real: leads client, chat log, quota bar, order status |
| Auth: gak ada | Register/login (client area) |
| Order: gak ada | Order flow: pilih plan → brief form → masuk DB → status |
| Newsletter in-memory | Tabel `subscribers` |

Yang dipertahankan: Mira chat widget (sudah bagus), FAQ, compare page,
3-tier pricing, honest "Available/Coming Soon/Planned".

## 5. Urutan eksekusi (fase)

F1 Design system + layout shell (globals.css, Navbar, footer) — MIGRASI TEMA
F2 Homepage ala microns+unbounce
F3 Prisma + SQLite + seed
F4 API: auth, leads, contacts, newsletter, orders, chat log
F5 Halaman: pricing baru, contact, blog, demos (listing grid)
F6 Dashboard client + admin (auth, leads, quota, orders)
F7 Verifikasi: build, e2e curl, seed data tampil

## 6. Verifikasi

- `npm run build` sukses
- curl 200: /, /pricing, /demos, /compare, /contact, /blog, /admin (302→login)
- POST /api/auth/register + login → cookie → GET /api/leads 200
- POST /api/chat (FAQ) → cached reply; over-quota → mode form
- Dashboard menampilkan leads dari DB

