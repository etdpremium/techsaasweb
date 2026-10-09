-- Fix: renderer hanya support ## (bukan ###) + typo di artikel website UMKM (9-Okt-2026)
-- 7 heading ### -> ## supaya jadi <h2>, bukan teks mentah "### 1. ..."

UPDATE "Post"
SET "body" = REPLACE("body", '### 1. Satu jenis huruf, dua ukuran', '## 1. Satu jenis huruf, dua ukuran')
WHERE "slug" = 'website-umkm-tampil-profesional-modal-kecil';

UPDATE "Post"
SET "body" = REPLACE("body", '### 2. Warna utama, warna pendamping, dan berhenti', '## 2. Warna utama, warna pendamping, dan berhenti')
WHERE "slug" = 'website-umkm-tampil-profesional-modal-kecil';

UPDATE "Post"
SET "body" = REPLACE("body", '### 3. Foto produk terang dan tajam', '## 3. Foto produk terang dan tajam')
WHERE "slug" = 'website-umkm-tampil-profesional-modal-kecil';

UPDATE "Post"
SET "body" = REPLACE("body", '### 4. Jarak yang sama di setiap bagian', '## 4. Jarak yang sama di setiap bagian')
WHERE "slug" = 'website-umkm-tampil-profesional-modal-kecil';

UPDATE "Post"
SET "body" = REPLACE("body", '### 5. Tulisan yang berbicara kepada satu orang', '## 5. Tulisan yang berbicara kepada satu orang')
WHERE "slug" = 'website-umkm-tampil-profesional-modal-kecil';

UPDATE "Post"
SET "body" = REPLACE("body", '### 6. Satu jalur pesan di setiap halaman', '## 6. Satu jalur pesan di setiap halaman')
WHERE "slug" = 'website-umkm-tampil-profesional-modal-kecil';

UPDATE "Post"
SET "body" = REPLACE("body", '### 7. Kecepatan adalah profesionalisme', '## 7. Kecepatan adalah profesionalisme')
WHERE "slug" = 'website-umkm-tampil-profesional-modal-kecil';

UPDATE "Post"
SET "body" = REPLACE("body", 'BahkanGratis.', 'Bahkan gratis.')
WHERE "slug" = 'website-umkm-tampil-profesional-modal-kecil';

UPDATE "Post"
SET "body" = REPLACE("body", 'Tidak perlu mahal untuk Hosting. Hosting Rp 50 ribu per bulan sudah cukup untuk website UMKM yang halamanstrukturnya sederhana.', 'Tidak perlu mahal untuk hosting. Hosting Rp 50 ribu per bulan sudah cukup untuk website UMKM yang strukturnya sederhana.')
WHERE "slug" = 'website-umkm-tampil-profesional-modal-kecil';
