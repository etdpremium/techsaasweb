# KEKURANGAN — TechSaaSWeb (Foto & Info Penjualan yang Harus Disiapkan)

> File ini dibuat otomatis setelah implementasi homepage Voog-level + 3 paket terima-jadi. Isinya checklist apa yang masih placeholder dan harus kamu isi sebelum jualan scale. Semua foto sementara pakai `picsum.photos/seed/tsw-*` — ganti `src` di `app/page.jsx` (cari `PLACEHOLDER - ganti`).

---

## 1. Foto yang Dibutuhkan (8 foto utama)

| # | Lokasi di Web | Placeholder Sekarang | Foto Ideal (komposisi) | Ukuran & Format | Alt Text | Catatan Ganti |
|---|---|---|---|---|---|---|
| 1 | Hero kanan (configurator bg) | `picsum/seed/tsw-hero/640/400` | Laptop mock dashboard di meja kerja terang, lihat kanban/bookings | 640×400, 16:10, JPG/WebP, <150KB | “Dashboard TechSaaSWeb di laptop” | `app/page.jsx` HeroConfigurator bg — tidak perlu ganti src configurator, cukup pastikan screenshot dashboardsmu mirip |
| 2 | Zigzag Hemat (kiri) | `seed/tsw-hemat/640/400` | Website klinik/resto di HP + desktop, tanpa chat bubble (tonjolkan web bersih) | 640×400, 16:10 | “Website Hemat tanpa chatbot” | Ganti `src` zigzag 1 |
| 3 | Terminal (kanan zigzag Bisnis) | TerminalDemo (bukan foto) | Tidak perlu foto — animasi sudah ada. Jika mau, screenshot chat WA asli | — | — | Biarkan, atau ganti TerminalDemo dengan screenshot chat asli |
| 4 | Zigzag Bisnis — chat (kiri) | `seed/tsw-chat/640/400` | Close-up bubble chat Mira di HP: “Hi! Morning or afternoon? ...” | 640×400 | “Chat Mira di website” | Ganti `src` zigzag Bisnis |
| 5 | Zigzag Automasi — dashboard (kanan) | `seed/tsw-dash/640/400` | Dashboard ROI/kanban di desktop, lihat 47 leads, $3.2k, 6.4x | 640×400 | “Dashboard ROI & pipeline” | Ganti `src` zigzag Automasi 1 |
| 6 | Zigzag Automasi — kalender (kiri) | `seed/tsw-automasi/640/400` | Kalender booking hotel: slot tanggal, kapasitas, deposit | 640×400 | “Kalender automasi booking hotel” | Ganti `src` zigzag Automasi 2 |
| 7 | Diagram center (wide) | `seed/tsw-arch/900/400` | Diagram 7 langkah: Visitor → Website → (Mira) → Kanban → Email/WA → Kalender → Bayar | 900×400, 21:9, SVG/PNG | “Alur terima-jadi 7 langkah” | Ganti `src` diagram center — bisa buat di Figma/Canva |
| 8 | Kategori demos (6 cards) | DemoCard (tanpa foto) | Foto real tiap niche: klinik gigi, properti, SaaS, resto, rental, hotel/villa | 600×400 per card, konsisten lighting | “Demo [niche]” | Tambah `image` field di `lib/demos.js` lalu render di DemoCard |

**Cara ganti:** Buka `app/page.jsx`, cari `PLACEHOLDER - ganti dengan foto milikmu`, ganti URL `https://picsum.photos/...` jadi `/assets/fotomu.jpg` (taruh file di `public/assets/`). Tidak perlu edit CSS — sudah `aspect-ratio:16/10`, rounded, shadow.

**Style foto agar aesthetic (sesuai foto Pinggy):** background putih/terang, shadow lembut, rounded 16px, border tipis `rgba(255,255,255,.08)`, jangan pakai filter berat. Usahakan semua foto punya white space sama (jangan crop mepet).

---

## 2. Informasi Penjualan yang Harus Disiapkan (sebelum terima order)

### A. Harga & Kontrak
- [ ] Konfirmasi harga final: Hemat $29, Bisnis $69, Automasi $129 — mau pakai USD atau IDR? Jika IDR, tentukan kurs & tampilkan dual.
- [ ] Domain .com: harga tahun 1 gratis — tahun 2+ berapa? (cek Namecheap/Cloudflare Registrar, tulis di `/pricing` footnote, mis. $12–$15/tahun).
- [ ] Min. term 6 bulan: siapkan template kontrak 1 halaman (PDF) + portal cancel 1-klik (sementara manual via WA).
- [ ] Annual pay 10 get 12: mekanisme tagih & bukti transfer.
- [ ] Refund: 7-day money-back if not launched — tulis SOP refund.

### B. Mekanisme Operasional (7 Langkah) — SOP Internal
1. **Order:** Form `/contact?plan=` → `POST /api/leads` (sementara in-memory, produksi pindah D1 + email). Siapkan template WA balasan <5 menit.
2. **Brief 15 menit:** Buat Google Form 1 halaman (fields: nama usaha, kategori, layanan & harga, jadwal, domain impian 3 opsi, warna/logo, foto). Hasil jadi `build sheet` (Notion/Sheet).
3. **Build:** SOP clone boilerplate: copy `app/demos/[slug]` → ganti `lib/demos` entry baru → deploy preview → minta approval client (1–2 revisi).
4. **Domain & Deploy:** Akun Cloudflare, registrar, Turnstile, Stripe (jika butuh deposit). checklist: DNS, SSL, WAF, backup.
5. **Serah Terima:** Template email + video Loom 2 menit (cara login dashboard, cara request update, cara jawab chat fallback).
6. **Operasional:** Kalender update (Hemat 1×, Bisnis 2×, Automasi 4×/bulan) — pakai board Trello/Notion.
7. **Tagihan:** Reminder H-7, H-1 via WA/email (template siap).

### C. Template yang Harus Dibuat
- [ ] Template WA reminder booking (untuk Automasi): “Halo [Nama], janji [Layanan] besok jam [Jam] di [Alamat]. Balas YA untuk konfirmasi.”
- [ ] Template email lead baru ke owner (subject: “Lead baru dari website [Usaha]”)
- [ ] Template PDF laporan mingguan (leads, CPL, ROAS, komisi) — untuk Automasi.
- [ ] FAQ sales: 8 pertanyaan sudah ada di `Faq.jsx` — tambah 4 lagi spesifik paket (bedanya Hemat vs Bisnis vs Automasi, domain, revisi, cancel).

### D. Hal yang Masih “Segera hadir / Rencana” — Jujur di UI
- Pembayaran deposit via Stripe/Midtrans — **Segera hadir** (sekarang manual transfer).
- Reminder WA/email otomatis — **Segera hadir** (sekarang manual).
- Sinkron Google Calendar — **Rencana**.
- Multi-bahasa — **Segera hadir**.
- SEO lanjutan & laporan — **Segera hadir** (Automasi).

Jangan hapus label ini — justru bikin trust seperti Voog (mereka juga tulis “unlimited” dengan jelas batasnya).

### E. Legal & Trust
- [ ] Privacy Policy & Terms (copy dari Voog, sesuaikan).
- [ ] Testimoni real: ganti `WALL` dummy dengan 3 testimoni beta tester (minta foto + nama + kota).
- [ ] Logo “Dibuat dengan Cloudflare” — sudah ada di hero, tambahkan di footer jika mau.

---

## 3. Checklist Sebelum Launch Jualan

- [ ] Ganti 8 foto placeholder (tabel di atas) — minimal 4 pertama (hero, hemat, chat, automasi).
- [ ] Isi harga domain tahun 2 di `/pricing` footnote.
- [ ] Buat Form Brief (Google Form) & link di `/contact` sukses page.
- [ ] Siapkan 3 template WA/email (lead baru, reminder, laporan).
- [ ] Test end-to-end: order Hemat (tanpa chatbot) → cek form masuk `GET /api/leads`, order Bisnis → cek chat Mira kanban, order Automasi → cek kalender mock.
- [ ] Ganti `hello@techsaasweb.com` dengan email real & tes reply <24 jam.

---

## 4. Cara Update Setelah Foto Siap

```bash
# taruh foto di public/assets/
# contoh: public/assets/hemat.jpg, bisnis-chat.jpg, automasi-kalender.jpg, diagram-7langkah.svg

# lalu di app/page.jsx ganti:
# <img src="https://picsum.photos/seed/tsw-hemat/640/400" ... />
# jadi:
# <img src="/assets/hemat.jpg" ... />

npm run build && npm run start
# cek http://localhost:3000 — tidak perlu edit CSS lain
```

---

*Generated: 2026-09-23 — TechSaaSWeb Voog-level plan. Update file ini tiap foto/info sudah terisi (centang checklist).*
