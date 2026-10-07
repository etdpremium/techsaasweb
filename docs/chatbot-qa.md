# Q&A Chatbot TechSaaSWeb — ARSIP (tidak lagi dipakai jalur utama sejak full-AI).
# Yang masih live: blok sapaan/sapaan-assalam/terima-kasih (sapaan pertama saja).
# Sisanya arsip pola + referensi jawaban. Jangan hapus — berguna bila AI mati total.
#
# FORMAT BLOK (urutan blok = prioritas pencocokan, jangan diacak):
# ## id-unik
# M: flag, dipisah koma. Flag: buying (closing, dilewati bila pengunjung
#    jelas bertanya info), form (bukakan form kontak setelah jawaban),
#    niche (jawaban dibangun dari L:/B:).
# K: pola, dipisah |. Awali pola dengan = agar HANYA cocok persis
#    (untuk kata pendek seperti =belum, =dp, =wa agar tak nyasar).
#    Tanpa =, pola cocok persis dulu lalu substring (min. 4 huruf).
# Q: sama seperti K: (untuk pertanyaan).
# L: label usaha (khusus niche). B: manfaat spesifik (khusus niche).
# A: jawaban (boleh multi-baris, digabung dengan spasi).
#    Placeholder: {BOOKING} {KONTAK} {WA} {EMAIL} diganti otomatis.
# Aturan jawaban: maksimal 2 kalimat pendek, Bahasa Indonesia, akhiri
# 1 pertanyaan/ajakan. Tanpa nama "Mira", tanpa angka "24/7".
# Tambahan (konsultasi manusiawi, sinkron dengan route /api/chat):
# - SATU balasan = SATU ajakan (minta kontak ATAU arahkan link, jangan dua-duanya).
# - Jangan tanya ulang hal yang sudah ada di riwayat (usaha/nama/WA).
# - "Iya/oke/mau" setelah tawaran konsultasi = langsung minta nama + WA.
# - Gaya santai "kak", pembuka bervariasi, langsung ke substansi (tanpa beo label usaha).
# - DILARANG mengarang kebijakan — lihat chatbot-info.md §Kebijakan.

## sapaan-assalam
K: assalamualaikum | assalamu’alaikum
A:
Waalaikumsalam! Ada yang bisa saya bantu soal website atau paket kami?

## sapaan
K: halo | hallo | hai | =hi | pagi | siang | sore | malam | =tes | =test | permisi
A:
Halo! Saya Elfaent, ada yang bisa saya bantu?

## terima-kasih
K: terima kasih | terimakasih | makasih | thanks | thank you
A:
Sama-sama! Butuh info paket atau cara pesan?

## obj-mahal
K: mahal | kemahalan
A:
Jasa lain Rp 1,5–5 jt, agensi Rp 15–40 jt — kami jauh di bawah itu. Cek lengkapnya di bagian harga?

## obj-lama
K: lama | kelamaan | kapan jadi
A:
Online 3–14 hari. Mulai dari paket mana?

## obj-ragu
K: ragu | takut | khawatir | yakin | percaya
A:
Ada konsultasi gratis tanpa komitmen. Usaha Anda apa?

## obj-pikir
K: pikir | nanti | besok | tunda
A:
Boleh dipikir dulu. Saya kirim ringkasannya via WA — nomornya berapa?

## timeline
K: berapa lama | berapa hari | kapan jadi | waktu pengerjaan | estimasi
A:
Website online dalam 3–14 hari, tergantung paket. Mau saya bantu pilihkan paketnya?

## harga
K: harga | biaya | berapa | bayar | tarif | murah
A:
Langsung cek di bagian harga: {HARGA}. Butuh rekomendasi? Ceritakan usaha Anda.

## paket
K: paket | pilihan | tipe | jenis
A:
Starter (website saja), Business (+ CS AI), Automation (+ booking). Butuh yang seperti apa?

## bayar-detail
M: form
K: cara bayar | bayar kemana | transfer kemana | rekening | qris | dp berapa
A:
Transfer bank, QRIS, VA, atau e-wallet — detail dikirim setelah isi form. Silakan isi form di bawah.

## beli-close
M: buying, form
K: minat | tertarik | deal | bayar | transfer | =dp | kapan mulai | kapan bisa | diskon | nego | promo | gaskeun | saya ambil | oke jadi | =fix | jadi ambil | lanjut proses
A:
Mantap! Amankan di {BOOKING} — atau balas nama + WA di sini.

## booking-fitur
M: form
K: booking | boking | reservasi | slot | antri | antrean
A:
Booking otomatis di paket Automation: slot + pengingat. Siapa nama dan nomor WA Anda?

## pesan
M: form
K: pesan | cara order | cara pesan | order | daftar | mulai
A:
Siap! Silakan konsultasi langsung — balas nama + WA/email di sini.

## email-bisnis
K: email bisnis | email usaha
A:
Email bisnis belum termasuk paket. Mau info paket mana?

## kontak
M: form
K: kontak | hubungi | whatsapp | =wa | email | telepon | nomor | =cs | admin
A:
Silakan konsultasi langsung: {KONTAK}.

## garansi
K: garansi | jaminan | refund | kembali | uang kembali
A:
Kami tidak memakai garansi uang kembali — yang pasti: revisi, update, dan dukungan sesuai paket. Mau info paket mana?

## domain
K: domain | hosting | ssl
A:
Domain .com/.id gratis thn pertama + hosting + SSL. Ada lagi?

## kota
K: kota | lokasi | daerah | wilayah | melayani mana
A:
Melayani seluruh Indonesia, 100% online. Anda di kota mana?

## demo
K: demo | contoh | portofolio | hasil
A:
Lihat contoh di halaman utama bagian Contoh. Usaha Anda apa?

## fitur
K: fitur | fasilitas | dapat apa | termasuk apa
A:
Website 8–15 halaman + domain/hosting/SSL. Business tambah CS AI. Detail paket mana?

## benefit
K: benefit | keuntungan | untung | manfaat | kelebihan | untungnya
A:
Website custom + CS AI + booking otomatis, update tiap bulan. Mau info paket mana?

## revisi
K: revisi | ubah | edit | ganti
A:
Revisi sepuasnya sampai cocok. Ada lagi?

## custom-halaman
K: custom | costum | 8 halaman | 8 pages | berapa halaman | halaman
A:
Bisa, 8–15 halaman custom sesuai usaha Anda. Mau saya bantu pilihkan paketnya?

## milik
K: milik | hak milik | punya saya | ownership | milik saya
A:
Ya, website dan domain atas nama Anda. Ada lagi?

## wordpress
K: wordpress | wix | blogspot
A:
Kami bangun custom, bukan template — jadi cepat dan aman. Tertarik paket mana?

## logo-desain
K: logo | desain | design
A:
Warna, foto, dan teks disesuaikan usaha Anda. Ada lagi?

## layanan-jual
K: layanan | layanan apa | jasa | jasa apa | jual | dijual | menjual | produk | jualan apa | dijual apa | apa yang dijual
A:
Kami menjual website custom, CS AI otomatis, dan booking otomatis. Mau info yang mana?

## beda-paket
K: beda | perbedaan | bandingkan | pembanding
A:
Starter website saja, Business tambah CS AI, Automation tambah booking. Butuh yang seperti apa?

## bukti-aman
K: bukti | testimoni | review | ulasan | aman | amanah | tipu | penipu | scam
A:
Pembayaran setelah setuju paket via transfer/QRIS/e-wallet. Mulai dari paket mana?

## update-rawat
K: update | maintenance | rawat | perawatan
A:
Update konten 1–4×/bulan tergantung paket. Ada lagi?

## bahasa
K: bahasa inggris | english | bilingual | dua bahasa
A:
Bisa dua bahasa di paket Automation. Butuh yang seperti apa?

## niche-pesantren
M: niche
K: pesantren
L: pesantren
B: calon santri daftar dan lihat info pondok online

## niche-toko
M: niche
K: toko | olshop | warung online | distro | butik | kelontong | minimarket | supermarket | swalayan | pasar | buah | sayur | fashion | pakaian | baju | kain | tekstil | konveksi | jahit | tailor | kaos | kemeja | celana | jaket | gamis | mukena | daster | hijab | sepatu | tas | handphone | smartphone | laptop | gadget | elektronik
L: toko online
B: pembeli lihat katalog dan checkout kapan pun

## niche-resto
M: niche
K: resto | restoran | rumah makan | warung | warteg | kafe | cafe | cafee | caaffe | caffe | coffee | kedai | angkringan | depot | kantin | bakery | kue | roti | dapur | seafood
L: resto
B: tamu lihat menu dan pesan meja tanpa telepon

## niche-klinik
M: niche
K: klinik | dokter | gigi | praktik | bidan | apotek | puskesmas | rumah sakit
L: klinik
B: pasien daftar online dan lihat jadwal praktik

## niche-travel
M: niche
K: travel | tour | wisata | open trip | trekking
L: travel
B: peserta lihat paket dan daftar online

## niche-properti
M: niche
K: properti | kos | kosan | kos-kosan | kost | kontrakan | apartemen | agen | perumahan | indekos | tanah | kavling | ruko
L: properti
B: calon penyewa lihat unit dan ajukan survei online

## niche-rental
M: niche
K: rental | sewa mobil | sewa motor | carter
L: rental
B: penyewa cek unit dan pesan pakai deposit online

## niche-penginapan
M: niche
K: hotel | villa | pondok | penginapan | homestay | guesthouse | guest house | losmen | resort | glamping
L: penginapan
B: tamu cari info dan pesan kamar online

## niche-salon
M: niche
K: salon | barbershop | barber | spa | pijat | refleksi | =mua
L: salon
B: pelanggan booking jadwal tanpa antre telepon

## niche-bengkel
M: niche
K: bengkel | servis | tambal
L: bengkel
B: pelanggan booking servis dan pantau antrean

## niche-laundry
M: niche
K: laundry | londri | cuci
L: laundry
B: pelanggan lihat harga dan order antar-jemput

## niche-olahraga
M: niche
K: gym | fitness | sanggar | yoga | futsal | badminton
L: olahraga
B: member lihat jadwal dan daftar online

## niche-sekolah
M: niche
K: sekolah | kursus | bimbel | =les
L: sekolah
B: calon siswa lihat info dan daftar online

## niche-catering
M: niche
K: catering | katering
L: catering
B: pelanggan lihat paket dan pesan untuk acara

## niche-petshop
M: niche
K: petshop | pet shop | hewan
L: petshop
B: pecinta hewan lihat layanan dan booking grooming

## niche-pertanian
M: niche
K: tani | kebun | sawah | ternak | tambak | nelayan | kolam ikan | perkebunan | perikanan | pertanian
L: pertanian
B: pembeli lihat hasil panen dan pesan langsung dari kebun

## niche-wedding
M: niche
K: wedding | pernikahan | dekorasi | rias pengantin
L: wedding
B: calon pengantin lihat paket dan portofolio

## niche-percetakan
M: niche
K: percetakan | sablon | fotokopi | printing | cetak
L: percetakan
B: pelanggan lihat harga dan order cetak online

## niche-skincare
M: niche
K: skincare | kosmetik | makeup
L: skincare
B: pembeli lihat katalog dan order kapan pun

## niche-konter
M: niche
K: konter | pulsa | perdana | voucher | counter
L: konter
B: pembeli lihat daftar harga dan order pulsa online

## niche-grosir
M: niche
K: grosir | distributor | supplier | sembako
L: grosir
B: reseller lihat harga grosir dan order partai besar

## niche-event
M: niche
K: event | organizer | =eo
L: event
B: peserta lihat acara dan daftar online

## niche-dealer
M: niche
K: dealer | showroom
L: dealer
B: pembeli lihat unit dan ajukan test drive

## handoff
M: form
K: manusia | orang asli | cs asli | operator | customer service | dilayani orang | orang beneran
A:
Siap, saya sambungkan ke tim. Tinggalkan nama + WA di sini, tim kami hubungi segera.

## bisa-apa
K: bisa buat | bisa bikin | bisa buatkan | apapun | apa saja bisa | semua bisa
A:
Bisa! Website apapun dan sistem apapun bisa kami buatkan. Ceritakan kebutuhan Anda?

## sudah
K: sudah punya website | sudah ada website | punya website | ada website | website sudah | web sudah
A:
Bagus, tinggal upgrade + CS otomatis. Kurangnya di mana?

## belum
M: form
K: belum punya | belum ada website | =belum
A:
Pas, kami buatkan dari nol sampai online. Siapa nama dan nomor WA Anda?

## kurang-cs
M: form
K: tidak ada cs | belum ada cs | belum ada ai | kurang cs | kurang ai | tidak ada ai
A:
CS otomatis ada di paket Business. Cek harganya di bagian harga?

## buat-intent
K: mau buat | mau bikin | mau pesan | mau order | mau daftar | ingin buat | ingin bikin | pengen buat | pengen bikin | buatkan | buatin | bikinkan | rencana buat | rencana bikin | jadi buat | mau uat | mau biat | mau buuat | mau biki | mau bikim | mau pesen | mau mesen
A:
Siap! Mau buat web untuk usaha apa? Ceritakan sedikit biar saya arahkan ke paket yang pas.

## needs
K: bingung | pilih mana | rekomendasi | saran | butuh | perlu | cocok untuk | usaha saya
A:
Siap dibantu! Usaha Anda apa dan butuh yang seperti apa?

## perpanjangan
K: perpanjangan | perpanjang | tahun kedua | tahun ke 2 | renew | renewal | setengah harga | diskon perpanjang
A:
Perpanjangan tahun ke-2 paket Starter & Business cukup setengah harga. Mau saya bantu pilihkan paketnya?

## booking-umum
K: booking | reservasi | reservasi online | appointment | jadwal otomatis | slot | sistem booking
A:
Ada kak — sistem booking otomatis (tanggal, slot, kapasitas, pengingat) untuk semua jenis bisnis. Lengkapnya di paket Automation. Mau saya jelaskan?
