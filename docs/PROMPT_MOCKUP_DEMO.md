# Prompt Foto Mockup Demo — 1 Gambar per Kategori

> Cara pakai: salin **Prompt umum** + salah satu **prompt kategori** ke
> **Google Gemini** (maksimal hasilnya bila prompt Bahasa Inggris + spesifikasi
> ukuran eksplisit). Minta **satu gambar komposit vertikal** berisi 4 panel:
> homepage + panel admin + chatbot + booking. Ukuran: **portrait 3:4,
> resolusi setinggi mungkin (minta "1536 × 2048 px, ultra detailed")**.
> Semua teks antarmuka Bahasa Indonesia + harga Rupiah (lihat tiap kategori).
> Bahasa Inggris hanya untuk nama brand.

## Gaya umum (tempel di setiap request)

```
Clean modern SaaS promotional composite, single tall image, 4 stacked panels with
soft rounded corners and light blue-gray background (#F4F8FF):
1) TOP: desktop browser mockup of a small business homepage — navigation bar,
big headline, CTA button, hero photo on the right, three service cards below.
2) UPPER-MIDDLE: dark navy admin dashboard panel — KPI numbers, status table
with green/blue/purple pills.
3) LOWER-MIDDLE: white chatbot card — greeting bubble, question bubble,
answer bubble, quick-reply pills.
4) BOTTOM: white booking form card — option rows and a blue confirm button.
Flat vector UI style, crisp readable text, navy #0F1B4C + royal blue #1E3A8A +
mint green #16A870 palette, soft shadows, generous whitespace, professional,
no watermark, no lorem ipsum. All prices in Indonesian Rupiah (Rp), all UI text
in Bahasa Indonesia except brand names.
```

## Alur request pengunjung (untuk konteks visual panel booking)

```
Pengunjung mencentang 15 pilihan halaman (Beranda, Layanan, Harga, Pemesanan,
Blog, Tentang, Portofolio, FAQ, Galeri, Testimoni, Kontak, Promo, Kebijakan
Privasi, Syarat & Ketentuan, Karier) lalu menekan "Request" — request masuk ke
halaman pemesanan dengan niche + daftar halaman terisi otomatis.
```

## Negative prompt (bila didukung)

```
blurry text, gibberish, misspelled words, distorted hands, watermark,
photorealistic people, dark background, crowded layout
```

## 1. Klinik Gigi — BrightSmile Dental

```
[STYLE UMUM] Business: dental clinic "BrightSmile Dental", Austin TX.
Homepage headline "Booking 30 detik.", sub "Scaling Rp150 ribu — Bleaching
Rp1,2 juta — IGD gigi hari yang sama.", hero photo: bright modern dental
clinic interior. Service cards: Scaling Rp150rb, Bleaching Rp1,2jt, IGD.
Admin rows: patient names with treatment + time + status pills (Baru, Cocok,
Menang). Chatbot Q: "harga" → price list answer in Rupiah. Booking options:
Jum/Sab/Min slots + "Konfirmasi booking" button.
```

## 2. Agen Properti — MapleKey Realty

```
[STYLE UMUM] Business: real estate agency "MapleKey Realty", Denver CO.
Homepage headline "Lihat rumah 3KT Sabtu ini.", sub "3KT Rp2,4 M — 2KT
Rp1,8 M — survei Sabtu.", hero photo: suburban house exterior at dusk.
Service cards: Tur 3KT Sab 11.00, Tur 2KT Sab 14.00, Call dengan Ana.
Admin rows: buyer names with tour slot + status. Chatbot Q about listings.
Booking options: tour slots + "Confirm visit" button.
```

## 3. Micro-SaaS — FlowTrack

```
[STYLE UMUM] Business: SaaS startup "FlowTrack", remote-first.
Homepage headline "Pantau semua prospek.", sub "Starter Rp190rb — Pro Rp490rb —
Business Rp990rb.", hero photo: laptop with analytics dashboard on a desk.
Service cards: Trial Pro, Trial Starter, Trial Business.
Admin rows: company names with plan stage + status. Chatbot Q about trial.
Booking options: trial plans + "Start 14-day trial" button.
```

## 4. Restoran — Ember and Oak

```
[STYLE UMUM] Business: restaurant "Ember and Oak", Chicago IL.
Homepage headline "Reservasi 30 detik.", sub "Rombongan 2–8 — deposit Rp200rb,
gratis batal H-4.", hero photo: cozy restaurant interior, warm light, set
tables. Service cards: reservation slots Jum/Sab/Min.
Admin rows: table numbers with party + time + status. Chatbot Q about menu.
Booking options: party slots + "Reserve table" button.
```

## 5. Rental Mobil — SwiftWheels

```
[STYLE UMUM] Business: car rental "SwiftWheels", Miami FL.
Homepage headline "Kunci di tangan.", sub "SUV Rp750rb/hari — deposit kartu
kapan saja.", hero photo: silver SUV in front of a modern building.
Service cards: SUV, Sedan, Van mingguan. Admin rows: plate numbers with package + status. Chatbot Q about fleet.
Booking options: car classes + "Pay deposit" button.
```

## 6. Toko Online — NorthBloom Store

```
[STYLE UMUM] Business: online store "NorthBloom Store", ships US-wide.
Homepage headline "Pesan sekali sentuh.", sub "40 produk — COD + konfirmasi
WhatsApp.", hero photo: neatly arranged retail products / packages.
Service cards: Paket bestseller, Satuan, Gift set. Admin rows: order numbers with item + payment + status. Chatbot Q about
shipping. Booking options: bundles + "Place order" button.
```

## Setelah gambar jadi

1. Simpan sebagai `public/demos/{slug}.webp` (lebar 1500px, kualitas ~85).
2. Ganti `SHOTS` di `app/page.jsx` dan hero di `app/demos/[slug]/page.jsx`
   ke path lokal + cantumkan width/height asli (cegah layout shift).
3. Lihat kembali: teks terbaca saat lebar 390px, tidak ada typo gibberish
   (regenerate bila ada teks ngaco — kelemahan umum AI image).
