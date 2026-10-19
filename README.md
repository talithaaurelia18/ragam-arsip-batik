# RAGAM — Arsip Batik Indonesia

Website editorial tentang batik Indonesia, dibuat dengan React + Vite. Gaya visual mengikuti referensi: grid seperti majalah/arsip pameran, merah marun gelap, kertas krem, tipografi serif besar, foto tekstil, dan panel-panel asimetris.

## Fitur yang sudah ada
- Layout editorial responsif untuk desktop, tablet, dan HP.
- Arsip cerita batik: motif, perajin, teknik, dan budaya.
- Filter kategori dan pencarian.
- Simpan/hapus cerita dari koleksi tersimpan (state di browser selama halaman terbuka).
- Modal detail cerita.
- Tampilan fallback bermotif jika gambar gagal dimuat.
- Foto dapat disajikan lokal dari `public/images/`.

## 1. Yang perlu dipasang
1. Install **Node.js versi LTS** dari https://nodejs.org/.
2. Buat akun GitHub dan Vercel (gratis) jika belum punya.
3. Ekstrak ZIP project ini.

## 2. Jalankan di komputer sendiri
Buka folder `batik-heritage` lewat VS Code, lalu buka Terminal di folder tersebut. Jalankan:

```bash
npm install
npm run dev
```

Terminal akan menampilkan alamat lokal, biasanya `http://localhost:5173`. Buka alamat itu di browser.

## 3. Download foto ke folder public/images
Foto Wikimedia disiapkan melalui script agar file JPEG tersimpan lokal, bukan hanya dipanggil dari luar.

```bash
npm run assets:download
```

Setelah berhasil, cek `public/images/`. File yang diharapkan: `batik-cloth.jpg`, `batik-canting.jpg`, `batik-artisan.jpg`, `canting-tools.jpg`, dan `batik-drawing.jpg`.

**Catatan:** unduhan gambar memerlukan internet. Jika script gagal, coba lagi saat koneksi tersedia. Website punya fallback ke foto Wikimedia online, jadi foto dapat tampil saat situs dipublikasikan dan pengunjung memiliki koneksi internet. Sebelum deploy, sebaiknya pastikan semua file JPEG sudah ada di `public/images/` agar foto disajikan dari project sendiri.

Sumber, pembuat, dan lisensi foto dicatat di `public/images/SOURCES.md`. Ikuti ketentuan lisensi dan pertahankan atribusi bila foto digunakan atau diubah.

## 4. Sesuaikan isi website
- Isi cerita, kategori, dan teks: `src/main.jsx` pada array `stories`.
- Foto yang dipakai setiap cerita: properti `image` dan `fallback` pada `stories`.
- Warna, grid, font, dan responsivitas: `src/styles.css`.
- Judul dan deskripsi tab browser: `index.html`.

## 5. Build untuk production
Jalankan:

```bash
npm run build
```

Kalau sukses, Vite membuat folder `dist/`. Untuk melihat hasil production lokal:

```bash
npm run preview
```

## 6. Hosting gratis di Vercel
### Cara paling mudah: GitHub → Vercel
1. Buat repository baru di GitHub.
2. Upload semua isi folder project ke repository. Pastikan `package.json`, `index.html`, `src/`, `public/`, dan `scripts/` berada di root repository.
3. Pastikan foto lokal sudah diunduh dan folder `public/images/` berisi file JPEG sebelum upload.
4. Login ke https://vercel.com/ dan pilih **Add New → Project**.
5. Import repository GitHub tadi.
6. Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist`. Install command: `npm install`.
7. Klik **Deploy**. Tunggu build selesai, lalu buka URL `.vercel.app` yang diberikan Vercel.
8. Setelah mengubah kode, push perubahan ke GitHub. Vercel akan membuat deployment baru secara otomatis.

### Alternatif: Vercel CLI
Jika sudah memasang Node.js, jalankan `npm install -g vercel`, lalu dari root project jalankan `vercel` dan ikuti instruksinya. Untuk deployment production gunakan `vercel --prod`.

## Teknologi
- React 18
- Vite 6
- Lucide React icons
- Google Fonts (Playfair Display + DM Sans)

## Batasan versi awal
Data cerita masih statis di dalam kode; belum memakai database/CMS. Koleksi tersimpan memakai state React sehingga belum sinkron lintas perangkat dan dapat kembali kosong saat halaman dimuat ulang. Untuk versi portofolio awal, semua fitur tampilan bisa digunakan tanpa backend atau Laravel.

### Koleksi tambahan: Corak Insang Pontianak

Project ini memuat cerita `Corak Insang: Napas Sungai Kapuas` di arsip dengan foto lokal `public/images/corak.jpg`. Narasi membedakan Tenun Corak Insang sebagai tradisi wastra yang ditetapkan sebagai Warisan Budaya Takbenda pada 2017 dan pengembangan motifnya dalam batik kreasi. Sumber rujukan dan catatan atribusi ada di `public/images/SOURCES.md`.
