# Chatbot CS AI — Operasional

## Adaptasi dari Yoosr (dipelajari, ditulis ulang mandiri — bukan copy: beda stack + lisensi BSL non-komersial)

| Pola Yoosr | Adaptasi kita |
|---|---|
| Staged pipeline (reply → capture → condition → handoff) | Lapisan route: injection → canned → lead → FAQ → sapaan → AI → MD → form |
| Attributes lintas pesan | Ekstrak nama + WA dari satu pesan; riwayat 6 pesan ke AI |
| Canned responses (+ picker) | Model `CannedResponse` + CRUD di `/admin`, prioritas atas MD |
| Handoff agen manusia | Keyword manusia/operator → form + catatan untuk follow-up |
| i18n (en/ar/fr) | Deteksi EN heuristik → sapa + jawab English, default Indonesia |
| Knowledge base RAG | `docs/chatbot-info.md` + `docs/chatbot-qa.md` sebagai sumber (tanpa vector DB — cukup untuk skala ini) |
| Analytics/token tracking | Statistik mode + model di `/admin`, semua chat tercatat + bisa dicari |

## Otak: 2 file MD (sumber tunggal, edit tanpa sentuh kode)

- `docs/chatbot-info.md` — fakta layanan (produk, harga, alur, dukungan,
  jangkauan, fakta pembanding, manfaat per usaha). Masuk ke prompt AI.
- `docs/chatbot-qa.md` — 60+ blok Q&A deterministik. Urutan blok = prioritas.
  Format per blok: `## id` | `M:` flag (`buying`/`form`/`niche`) |
  `K:`/`Q:` pola dipisah `|` (awalan `=` = cocok persis saja) |
  `L:` label + `B:` benefit (niche) | `A:` jawaban (≤2 kalimat).
  Placeholder `{BOOKING}` `{KONTAK}` `{WA}` `{EMAIL}` diganti otomatis.
- Dev: MD dibaca tiap request (edit langsung terasa). Prod: sekali saat start.
- Kalau MD gagal dibaca → fallback minimal, AI tetap jalan.

## Cara kerja (full AI + deterministik seperlunya)

1. **Prompt injection** → tolak sopan + arahkan kontak (dicatat `blocked`)
2. **Nomor HP** → auto-catat lead SADAR KONTEKS: baca 6 pesan riwayat dulu —
   bila usaha sudah disebut, jawab pakai niche itu + tanya NAMA saja
   (jangan tanya "usaha apa" lagi); duplikat tidak dikabari ulang
3. **FAQ tenant** → jawaban cache (khusus halaman contoh)
4. **Canned owner** → balasan prioritas dari `/admin`
5. **Sapaan pertama** → template instan (`halo`, terima kasih)
6. **AI untuk SEMUA selebihnya** — dengan riwayat 6 pesan + info lengkap
7. **AI mati → form kontak langsung** (tanpa jaring template, sesuai keputusan owner)

Jawaban template/instan ditahan ±1,1 detik di widget agar terasa diketik manusia.
Balasan ambigu-pendek ("sudah", "iya", "ok") + ada riwayat → dilewati template,
dijawab AI pakai konteks percakapan (widget mengirim 6 pesan terakhir).
Basa-basi berulang (sapaan/terima kasih saat sudah ada riwayat) → juga ke AI
agar tidak copy-paste template yang sama.
URL di balasan otomatis jadi link klik (biru, teks tanpa https://).
Setiap balasan closing (beli, pesan, minta kontak, niat membuat) langsung
membuka form kontak — tapi form hanya otomatis terbuka di fallback PERTAMA
(AI tidak bisa jawab); fallback berikutnya cukup tombol "Tinggalkan kontak"
+ tombol Tutup. Isi form masuk tabel prospek + chat log di /admin.

## Aturan nada (jangan dilanggar)

- Gaya CS online santai: sapa "kak", variasikan pembuka (Siap/Oke/Noted/Beres).
  Langsung ke substansi — JANGAN mem-beo label usaha ("Siap, toko kain!").
- DILARANG mengarang kebijakan (nego/diskon/cicilan/garansi) — lihat `chatbot-info.md` §Kebijakan.
- Tanpa nama "Mira". Tanpa angka "24/7" (pakai "nonstop setiap hari" / "siap setiap hari").
- Tanpa klaim kuota/kredit ("300 balasan", "Dasar/Penuh").
- Akui kata pengunjung → info/closing sesuai niat → satu pertanyaan penutup.
- SATU balasan = SATU ajakan (minta kontak ATAU arahkan link — jangan keduanya sekaligus).
- Jangan ulangi pertanyaan yang sudah ditanyakan di riwayat (nama/WA/usaha).
  Kalau sudah minta WA, langkah berikut = link booking / tawarkan kirim ringkasan.
- Jawaban "ya/iya/oke/mau" atas tawaran konsultasi = langsung minta nama + WA
  satu kalimat, tanpa menyuruh hubungi via WA/email.
- Tanya harga = sebut NAMA paket yang cocok (tanpa angka) + arahkan halaman harga.
- Menjajaki ("mau buat", "rencana") ≠ membeli ("deal", "bayar", "minat", "kapan mulai").

## Model: tidak ada yang gratis-selamanya-tanpa-batas (jujur)

Semua provider gratis punya limit. Strategi kita: pool multi-provider + template + form,
jadi pengunjung tidak pernah blank apa pun yang terjadi.

| Provider | Gratisnya | Syarat |
|---|---|---|
| Cloudflare Workers AI (utama bila diisi) | 10.000 neurons/hari | `CF_ACCOUNT_ID` + `CF_API_TOKEN`, tanpa kartu |
| OpenRouter `:free` (Qwen dkk) | 20/menit, 50/hari per model | key, tanpa kartu |
| Pollinations (cadangan terakhir) | anonim, sering 429/500 | tanpa key |
| Groq (slot siap, perlu daftar) | ±1.000/hari/model, tanpa kartu | akun Groq + key |
| OpenRouter top-up $10 sekali | 50 → 1.000/hari per model | bayar sekali |

Self-host (Ollama) tidak viable di server ini (RAM bebas ±2GB; model Indonesia yang layak butuh ±5GB+).

## Loop belajar keyword (mingguan, 10 menit)

1. Buka dashboard → chat log → filter mode `ai` yang jawabannya jelek + pesan tanpa template.
2. Kumpulkan: typo baru ("boking"), sebutan usaha baru, pertanyaan berulang.
3. Tambahkan blok baru ke `docs/chatbot-qa.md` (ikuti format + aturan ≤2 kalimat) + uji 1× via curl.
4. Pesan dengan pola serangan baru → tambah ke `INJECTION_PATTERNS`.

## Keamanan key

- Key HANYA di `.env` (`OPENROUTER_API_KEY`), tidak pernah di kode/client. `.env` masuk `.gitignore`.
- Key yang pernah ditempel di chat dianggap bocor → regenerate di dashboard OpenRouter → ganti isi `.env` → restart dev.
