# Tutorial Google Search Console — techsaasweb.com

**Tanggal dibuat:** 9 Oktober 2026
**Status:** Situs on-page SEO sudah siap (audit 0 critical, sitemap 98 URL), tapi
Google belum mengindeks. Hanya 1 URL di indeks: `http://www.techsaasweb.com`
yang isinya masih snapshot halaman parkir Namecheap.

Tutorial ini adalah satu-satunya jalan tercepat supaya Google mengenal situsmu.

---

## Kenapa ini wajib (bukan opsional)

Google saat ini tidak tahu situsmu ada. Domain baru lulus dari status "parked
domain" di Namecheap, dan Google jarang meng-crawl domain seperti itu.

Tanpa GSC: tunggu **2–8 minggu** sampai Google secara alami menemukan situsmu.
Dengan GSC + request indexing: biasanya **2–7 hari**.

Semua optimasi SEO yang sudah dikerjakan (title, sitemap, JSON-LD, canonical)
tidak akan berpengaruh apa-apa selama Google belum menjelajah halamannya.

---

## Langkah 1 — Daftar dan verifikasi properti

### 1.1 Buka Google Search Console

Buka https://search.google.com/search-console

Login dengan akun Google. Kalau kamu punya akun Google bisnis
(misal Gmail yang dipakai untuk Google Business Profile), pakai itu — biar
semua data Google kamu di satu tempat.

### 1.2 Tambah properti

Klik panah di samping nama properti (atau tombol "Add property" di pojok kanan
atas) → **Add property**.

Kamu akan disuruh milih:

```
○ Domain          → tangkap semua varian: techsaasweb.com, www.techsaasweb.com,
                     http, https, sekalian
○ URL prefix      → cuma satu varian yang kamu ketik manual
```

**Pilih "Domain"** (rekomendasi). Dengan ini kamu tidak perlu daftar 4 properti
terpisah untuk www, non-www, http, https — semuanya ke tangkap satu akun.

Ketik: `techsaasweb.com`

### 1.3 Verifikasi via DNS TXT record

Setelah pilih "Domain", Google kasih kamu sebuah kode verifikasi seperti ini:

```
google-site-verification=ABCDEFGHIJ1234567890abcdefghijklmnopqrstuvwxyz
```

**Cara pasangnya:**

Karena DNS techsaasweb.com kamu kelola di **Cloudflare** (bukan Namecheap — di
sana juga kamu set redirect rules www→apex kemarin), lakukan di Cloudflare:

1. Login ke https://dash.cloudflare.com
2. Pilih domain `techsaasweb.com`
3. Klik menu **DNS** di sidebar kiri → tab **Records**
4. Klik **Add record**:
   - Type: `TXT`
   - Name: `@` (artinya root domain)
   - Content: paste kode verifikasi dari Google tadi, utuh
   - TTL: Auto
5. Klik **Save**

**Kalau ternyata DNS-mu masih di Namecheap** (bukan Cloudflare):

1. Login ke https://www.namecheap.com
2. Domain List → Manage → **Advanced DNS**
3. Add New Record:
   - Type: `TXT Record`
   - Host: `@`
   - Value: kode verifikasi Google
   - TTL: Automatic
4. Save All Changes

### 1.4 Klik Verify di Google

Klik tombol **Verify** di GSC.

**Catatan penting:** propagasi DNS TXT biasanya 5–15 menit, tapi bisa sampai
jam. Kalau Google bilang verifikasi gagal, tunggu 15 menit, klik Verify lagi.
Jangan hapus record TXT-nya setelah berhasil — Google cek secara berkala.

Setelah berhasil, kamu akan masuk ke dashboard GSC dengan data mulai dikumpulkan.

---

## Langkah 2 — Submit sitemap.xml (langsung setelah verifikasi)

Ini bilang ke Google: "ini daftar lengkap 98 halaman yang harus kamu indeks."

1. Di GSC, klik **Sitemaps** (sidebar kiri, bagian Indexing)
2. Kolom "Add a new sitemap", ketik: `sitemap.xml`
   (URL lengkap jadinya `https://techsaasweb.com/sitemap.xml`)
3. Klik **Submit**

Tunggu 1–3 menit, refresh halaman. Status harusnya berubah jadi **Success**.

Kalau statusnya "Couldn't fetch": tunggu 10 menit lalu coba lagi. Kalau masih
gagal setelah 3x, catat pesan error-nya dan kasih tau aku.

Sitemap kamu saat ini berisi **98 URL**:
- 5 halaman utama (Beranda, Layanan, Harga, Pemesanan, Blog)
- 40 artikel blog
- 45 halaman kota (`/jasa-website/<kota>`)
- 8 halaman lainnya

---

## Langkah 3 — Request indexing untuk URL prioritas

Ini akseleratornya. Google akan langsung antri menjelajah URL yang kamu request.

**PENTING: Jangan request semua 98 URL sekaligus.** Google anggap itu
manipulasi. Batasi **10–20 URL per hari**.

### 3.1 Urutan prioritas (kerjakan sesuai urutan ini)

**Hari pertama (4 URL utama):**

1. `https://techsaasweb.com/`
2. `https://techsaasweb.com/blog`
3. `https://techsaasweb.com/services`
4. `https://techsaasweb.com/pricing`

**Hari kedua (halaman konversi):**

5. `https://techsaasweb.com/booking`
6. `https://techsaasweb.com/jasa-website`

**Hari ketiga (4 artikel blog terkuat):**

7. `https://techsaasweb.com/blog/seo-lokal-jasa-kota`
8. `https://techsaasweb.com/blog/harga-jasa-website-komponen-jujur`
9. `https://techsaasweb.com/blog/chatbot-rule-based-vs-ai-umkm`
10. `https://techsaasweb.com/blog/ai-menjawab-pelanggan-saat-toko-tutup`

**Hari keempat (2 artikel baru):**

11. `https://techsaasweb.com/blog/chatbot-jawab-pertanyaan-harga-24-jam`
12. `https://techsaasweb.com/blog/website-umkm-tampil-profesional-modal-kecil`

Setelah itu biarkan Google menemukan 86 URL sisanya sendiri lewat sitemap +
internal link. Homepage kamu sudah punya 37 internal link ke halaman kota dan
blog, jadi sekali Google masuk ke homepage, dia akan menjelajah semuanya.

### 3.2 Cara request

1. Di GSC, klik **URL inspection** (di kanan atas, kolom pencarian)
2. Paste URL lengkap (misal `https://techsaasweb.com/`), tekan Enter
3. Tunggu Google loading (5–15 detik). Akan muncul:
   - **"URL is not on Google"** → wajar, memang belum diindeks
   - **"URL is on Google"** → sudah ada, tidak perlu request
4. Kalau belum, klik tombol **Request indexing**
5. Tunggu sampai muncul konfirmasi "Indexing requested"

Ulangi untuk setiap URL.

### 3.3 Cara cek progresnya

Di dashboard utama GSC, lihat grafik **"Pages indexed"**.

Atau cek lewat Google langsung: ketik `site:techsaasweb.com` di Google Search.
Saat ini hasilnya 1. Target dalam 1–2 minggu: puluhan.

---

## Langkah 4 — Ambil 1 backlink (pemicu crawl)

Domain muda tanpa backlink = Google tidak punya alasan memprioritaskan. Tapi
cukup **satu** backlink berkualitas. Jangan beli backlink murah — itu justru
bisa menghancurkan peringkat.

### 4.1 Google Business Profile (rekomendasi #1)

Ini sekaligus: backlink + muncul di Google Maps + review.

1. Buka https://www.google.com/business
2. Klik **Manage now** / **Add your business**
3. Nama bisnis: `TechSaaSWeb`
4. Kategori: `Website designer` (atau `Internet marketing service`)
5. Alamat: isi alamat usahamu (atau centang "I don't want to show my address"
   kalau murni online)
6. Nomor WA: `+62 851-1329-4575`
7. Website: `https://techsaasweb.com`
8. Verifikasi via SMS / video (Google akan minta foto tempat usaha — kalau
   murni online, biasanya verifikasi video lokasi kerja)

Setelah terverifikasi, Google otomatis meletakkan link ke techsaasweb.com dari
halaman profil bisnismu — itu backlink berkualitas tinggi dari domain
google.com.

### 4.2 Alternatif lain (kalau GBP ditolak / lama)

- **Direktori UMKM Indonesia**: daftarkan di direktori bisnis lokal yang
  terpercaya (misal yang dikelola kamar dagang atau komunitas UMKM kotamu)
- **Forum/komunitas relevan**: jawab pertanyaan di forum web developer atau
  grup UMKM dengan profile link. Bukan spam — jawab beneran, link ada di
  profile.

**Yang GAK boleh kamu lakukan:**
- Beli backlink dari Fiverr/layanan "1000 backlink Rp 50rb"
- Daftar ke ribuhan web directory acak (SCAM detection Google akan blok)
- Tukar link massal dengan situs tidak relevan

Semua itu bisa kena **manual penalty** dari Google, dan pulihnya butuh bulanan.

---

## Langkah 5 — Cek hasil & lapor ke aku

### 5.1 Yang harus kamu screenshot/kasih tau aku setelah 3–7 hari

1. **Hasil `site:techsaasweb.com` di Google** — jumlah hasilnya. Kalau masih 1
   setelah 1 minggu full, ada masalah teknis yang harus aku investigasi
   (mungkin robots.txt terlalu ketat atau ada `noindex` nyasar).
2. **GSC → Sitemaps** — statusnya Success atau error
3. **GSC → URL inspection** untuk `https://techsaasweb.com/` — bilang "not on
   Google" atau "on Google"

### 5.2 Yang aku bisa bantu setelah GSC aktif

Kasih tau aku hasilnya, dan aku bisa:

- **Baca pesan error GSC** — kalau Google laporkan masalah (crawl error,
  mobile usability, manual action), aku diagnose + fix kodenya dari sini
- **Prioritas konten blog selanjutnya** — pakai data "Queries" dan "Pages"
  GSC untuk lihat keyword mana yang mulai dapet impresi, lalu tulis artikel
  lanjutan yang memperkuat keyword itu
- **Cek halaman yang GAGAL diindeks** — kadang ada halaman tertentu yang
  Google dateng tapi tolak. Aku bisa lihat polanya

---

## Troubleshooting cepat

**Verifikasi DNS gagal terus?**
- Cek apakah TXT record sudah benar-benah tersimpan (DNS checker online,
  cari "TXT lookup techsaasweb.com")
- Pastikan tidak ada TXT record lama yang konflik
- Tunggu 30 menit, coba Verify lagi

**Sitemap "Couldn't fetch"?**
- Cek https://techsaasweb.com/robots.txt — pastikan tidak ada baris
  `Disallow: /` (itu akan memblokir semua)
- Cek https://techsaasweb.com/sitemap.xml langsung di browser, harus muncul
  XML dengan 98 URL. Kalau error, kasih tau aku

**"URL is not on Google" setelah 1 minggu?**
- Itu wajar untuk domain baru. Tapi kalau homepage saja belum masuk setelah
  7 hari penuh, screenshot GSC-nya dan kasih aku — aku cek robots.txt +
  canonical + X-Robots-Tag dari sisi server

**Muncul error "Duplicate without user-selected canonical"?**
- JANGAN panik. Itu wajar — ini terjadi karena varian www/http/apex. Redirect
  301 sudah dipasang kemarin (www→apex, http→https), jadi ini akan
  menghilang sendiri saat Google memproses 301-nya (biasanya 1–3 minggu)

---

## Estimasi waktu realistis

| Langkah | Waktu |
|---|---|
| Daftar + verifikasi GSC | 15–30 menit |
| Submit sitemap + 4 request indexing | 10 menit |
| Google mulai menjelajah homepage | 1–3 hari |
| Homepage muncul di `site:` search | 3–7 hari |
| Mayoritas 98 URL terindeks | 2–4 minggu |
| Ranking mulai stabil (bukan halaman 1) | 1–3 bulan |
| Halaman 1 untuk keyword long-tail | 3–6 bulan (bisa lebih lama) |

**Catatan keras kepala:** SEO bukan seminggu jadi. Domain baru selalu mulai
dari bawah. Yang kamu kerjakan sekarang adalah memastikan Google cepat kenal
situsmu — setelah itu, konten blog yang akan menentukan peringkat.

Jangan percaya siapa pun yang bilang bisa bikin kamu halaman 1 dalam seminggu.
Yang bisa dijanjikan cuma: situsmu terindeks dengan benar. Peringkat adalah
hasil algoritma, bukan jualan.

---

## Checklist (print / centang sendiri)

- [ ] Akun GSC dibuka, properti "Domain" ditambahkan
- [ ] Kode verifikasi dipasang di DNS (Cloudflare / Namecheap)
- [ ] Verify berhasil
- [ ] Sitemap `sitemap.xml` di-submit, status Success
- [ ] Request indexing: homepage
- [ ] Request indexing: /blog
- [ ] Request indexing: /services
- [ ] Request indexing: /pricing
- [ ] Request indexing: /booking
- [ ] Request indexing: /jasa-website
- [ ] Request indexing: 4 artikel blog prioritas
- [ ] Request indexing: 2 artikel baru
- [ ] Google Business Profile didaftarkan + diverifikasi
- [ ] Hari ke-7: cek `site:techsaasweb.com`, lapor hasilnya ke Hermes
