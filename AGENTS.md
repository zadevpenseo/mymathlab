# MASTER DIRECTIVES & AGENT OPERATING PROTOCOL
## MODULE: MATH LAB (`apps/mymathlab`)

Dokumen ini adalah Micro-Kernel pengatur sistemik (*Single Source of Truth* & Direktif Operasional) bagi seluruh agen AI yang bekerja di dalam modul `apps/mymathlab`. Dokumen ini dirancang ringkas (< 15 KB) untuk mencegah *prompt truncation* dan menegakkan tata kelola *Code-over-Prose*. Seluruh spesifikasi arsitektur hidup berada di [CONTEXT.md](file:///Users/mac/Documents/AGENTS_WORK_HUB/apps/mymathlab/CONTEXT.md) dan panduan publik di [README.md](file:///Users/mac/Documents/AGENTS_WORK_HUB/apps/mymathlab/README.md).

---

## ⚡ 10 INVARIAN SISTEMIK MUTLAK MATH LAB

Setiap agen AI WAJIB mematuhi 10 invarian ini sebelum menulis kode, konfigurasi, atau respons obrolan:

| No | Invarian Mutlak | Mandat Sistem & Batasan Keras | Rujukan & Verifikasi |
| :--- | :--- | :--- | :--- |
| 1 | **Zero Em-Dash & Zero Double-Hyphen** | DILARANG memproduksi karakter em-dash (`\u2014`) dan DILARANG menggunakan strip ganda (`--`) di tengah kalimat naratif atau prosa. Gunakan koma berpasangan, tanda kurung `(...)`, atau titik dua (`:`). | Audit via `./radar audit` wajib 0 temuan. |
| 2 | **Zero AI Slop & Human Warmth** | DILARANG menggunakan kosakata klise mesin (*delve, pivotal, tapestry, beacon, evolving landscape, cutting-edge, game-changer*). Bahasa narasi wajib lugas, aktif, hangat, dan berorientasi pada kejelasan didaktik. | Terikat pada `audience_centric_unslop.md` & `anti-ai-slop`. |
| 3 | **Spektrum Holistik & Penugasan Multi-Persona** | DILARANG mereduksi Math Lab hanya sebagai kalkulator grafis atau mainan rumus parsial. Setiap modul wajib melayani kontinum lengkap: 1) Pemahaman Konsep, Konteks, dan Teori; 2) Aktivitas Pembelajaran, Riset Ilmiah (R&D/PTK/Eksperimen), dan Keputusan Praktikal; 3) Instrumen penugasan terpadu bagi Siswa, Mahasiswa, Guru, Dosen, dan Lembaga Pendidikan. | Mengacu pada [CONTEXT.md](file:///Users/mac/Documents/AGENTS_WORK_HUB/apps/mymathlab/CONTEXT.md) Bab 1.4 & 1.5. |
| 4 | **Kebenaran Matematis Deterministik** | DILARANG mengandalkan inferensi LLM untuk menghitung rumus, evaluasi fungsi, atau koordinat grafik. Seluruh kalkulasi wajib dieksekusi secara deterministik menggunakan pure TypeScript domain module dengan toleransi numerik floating-point (`Number.EPSILON`). | Verifikasi via pengujian unit deterministik (Vitest). |
| 5 | **Multirepresentasi Sinkron (Lesh & Duval)** | DILARANG menghasilkan representasi yang saling bertolak belakang. Satu model matematika tunggal (*Single Source of Truth*) wajib mengendalikan serentak: persamaan aljabar KaTeX, kurva/titik pada kanvas SVG, tabel data diskret, dan narasi konteks nyata. | Cek integrasi representasi ganda di kanvas. |
| 6 | **Reaktivitas Sub-16ms & Low-TDP Guard** | Manipulasi slider variabel wajib merespons instan (< 16 ms / 60 FPS). DILARANG memuat model WebGL/3D berat tanpa tujuan naratif fisis riil. Prioritaskan Native Reactive SVG DOM untuk menjaga efisiensi RAM (< 20 MB) pada perangkat low-end dan laptop 7W Amber Lake. | Standar `immersive-web-engineering` L2/L3 & `./radar audit`. |
| 7 | **Bento-Grid The Trinity Canvas & Minimalist UI** | Desain antarmuka wajib mengacu pada protokol `minimalist-ui`: latar warm off-white (`#FBF9F5`), kartu bento berbatas tegas (`1px solid #EAEAEA`), sudut lengkung `8px`, zero generic drop-shadows, dan segmented-tab adaptif pada smartphone. | Standar `minimalist-ui` & `ui-ux-pro-max`. |
| 8 | **Zero-Friction Sharing (Contagious & STEPPS)** | Eksplorasi wajib dapat dibagikan seketika tanpa keharusan login atau instalasi. Parameter kanvas wajib langsung tersinkronisasi ke URL hash (`#a=-2&h=3&k=5`), didukung oleh endpoint API Hono untuk opsi shortlink permanen. | Standar `contagious` & `hundred-million-offers`. |
| 9 | **Programmatic SEO (pSEO) & SXO Search Intent** | Halaman konsep kurikulum wajib di-generate secara programmatic dari registry data kanonikal dengan injeksi skema Schema.org `LearningResource`. Halaman wajib menyajikan kanvas interaktif langsung di atas batas gulir (*above the fold*). | Standar `seo-sxo` & `seo-programmatic`. |
| 10 | **Integritas Etika Telemetri Riset** | Data interaksi belajar untuk riset kampus (urutan geser slider, waktu jeda, respon prediksi) HANYA boleh dicatat secara lokal dan anonim tanpa identitas pribadi (*PII*). Ekspor data wajib menggunakan format terbuka (CSV/JSON) yang siap diolah di R, Python, SPSS, atau Jamovi. | Standar privasi data pendidikan & [CONTEXT.md](file:///Users/mac/Documents/AGENTS_WORK_HUB/apps/mymathlab/CONTEXT.md). |

---

## 🚦 PROTOKOL QUALITY GATES (COGNITIVE PRODUCT ARCHITECT)

Agen dilarang melompat langsung ke penulisan kode tanpa melewati 3 gerbang deterministik:

```
┌────────────────────────┐      ┌────────────────────────┐      ┌────────────────────────┐
│ GERBANG 1: PROBLEM     │ ───► │ GERBANG 2: ARCHITECT   │ ───► │ GERBANG 3: PRODUCTION  │
│ Kunci target pengguna, │      │ Kunci model domain TS, │      │ Tes matematis 100% pas,│
│ konsep kurikulum, dan  │      │ kontrak API, dan bento │      │ kontras WCAG AAA, dan  │
│ miskonsepsi spesifik.  │      │ layout The Trinity.    │      │ performa sub-16ms.     │
└────────────────────────┘      └────────────────────────┘      └────────────────────────┘
```

1. **Gerbang 1 (Problem Lock):** Pastikan konsep matematika terpetakan pada Capaian Pembelajaran Kurikulum Merdeka (Fase D/E/F), miskonsepsi inti teridentifikasi, dan relevansinya bagi riset/manajemen pendidikan jelas.
2. **Gerbang 2 (Architecture Lock):** Pastikan model domain TypeScript terdefinisi secara independen dari framework UI, kontrak API Hono terstandarisasi, dan layout antarmuka mengikuti spesifikasi *The Trinity Canvas*.
3. **Gerbang 3 (Production Lock):** Eksekusi pengujian deterministik matematika (Vitest), verifikasi aksesibilitas keyboard dan kontras warna (WCAG 2.2 AAA), serta validasi nol pelanggaran via `./radar audit`.

---

## 🏛️ DISPATCHING TEKNOLOGI & AGENT SKILLS

Ketika mengeksekusi tugas pada modul ini, aktifkan kapabilitas agen berikut:

- **Desain & UI:** `minimalist-ui`, `ui-ux-pro-max`, `anti-ai-slop`.
- **Komputasi & Kualitas:** `tdd`, `logic-lens`, `code-review-and-quality`.
- **Arsitektur & API:** `c4-architecture`, `api-and-interface-design`, `cognitive-product-architect`.
- **SEO & Viralitas:** `seo-sxo`, `seo-programmatic`, `contagious`, `hundred-million-offers`.
- **Edge & Runtime:** `cloudflare`, `hono`, `workers-best-practices`.

---

## 🛠️ PENEGAKAN INTEGRITAS KODE-OVER-PROSE

Sebelum menyatakan suatu tugas selesai atau mengajukan commit:
```bash
# 1. Jalankan pengujian unit matematika deterministik
npm test

# 2. Jalankan audit sistemik invariant workspace
./radar audit
```
*Skrip `./radar audit` wajib menghasilkan 0 pelanggaran sistemik.*