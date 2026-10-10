# MATH LAB TASK LIST TARGET (TODO)
## apps/mymathlab/tasks/todo.md

**Modul:** `apps/mymathlab`  
**Governing Standard:** Planning and Task Breakdown, Vibe Coder Workflow  
**Current State:** Ready for Execution (Aligned via /grill-me)  

### Kesepakatan Desain Hasil Grilling:
- **Repositori & Deployment:** Repositori publik baru `zadevpenseo/mymathlab` + deploy edge Cloudflare Pages.
- **Cakupan Irisan Pertama:** Flagship Vertical Slice Parabola/Fungsi Kuadrat (4 Register Duval, Siklus 5 Inkuiri, Miskonsepsi Sokrates, Ekspor Python/R/LaTeX, LKPD A4).
- **Tema Visual Default:** Editorial terang (ivory/clean white) + sakelar 1-klik ke Mode Proyektor Kelas & Mode Gelap.
- **Alur Inkuiri:** Alur inkuiri terbimbing default (Predict mengunci slider) + sakelar Mode Eksplorasi Bebas untuk guru.
- **LKPD Cetak A4:** Format 2 halaman A4 monokrom 100% photocopy-safe dengan opsi cetak dinamis.
- **Arsitektur Agen AI:** Dual-transport FastMCP (Cloudflare Worker `/api/mcp` dan CLI stdio TypeScript lokal).

---


## Phase 0: Project, Repository, & Cloudflare Edge Setup
- [ ] **Task 0:** Initialize Project, Repository, & Cloudflare Edge Setup
  - *Persona:* DevOps (Deva)
  - *Scope:* S (Project scaffolding, Git repo initialization, Wrangler configuration)
  - *Acceptance:* Scaffold Vite 6 + React 19 + TypeScript, tautan remote Git ke repository `zadevpenseo/mymathlab`, konfigurasi `wrangler.toml` untuk Cloudflare Pages & Functions/Worker, instalasi KaTeX dan math.js.
  - *Verification:* `pnpm build` sukses, `git remote -v` terhubung.

### Checkpoint 0: Scaffold & Infrastructure Ready
- [ ] Project scaffolds and compiles without error
- [ ] Repository created and tracked
- [ ] Cloudflare deployment configuration valid

---

## Phase 1: Foundation (Generic Deterministic Core & Multi-Module Registry)
- [ ] **Task 1:** Generic Math Engine & AST Compiler [R-01, R-02]
  - *Persona:* Backend (Bora)
  - *Scope:* M (4 files)
  - *Acceptance:* Parser ekspresi analitis, evaluasi numerik fungsi kurva, pencarian titik kritis/akar/asimtot, toleransi floating point $\epsilon = 10^{-9}$.
- [ ] **Task 2:** Built-in 10-Module Canonical Registry [R-01, R-02, R-08]
  - *Persona:* Backend (Bora) & Designer (Aria)
  - *Scope:* M (10 catalog files)
  - *Acceptance:* Registrasi 10 modul kurikulum lengkap (Fase D: Linier, Pythagoras, Statistik; Fase E: Kuadrat, Eksponensial; Fase F: Trigonometri; Lanjut: Diferensial, Integral Riemann; Terapan: Kinematika & Ekonomi; Etnomatematika: Batik Kawung).
- [ ] **Task 3:** Reactive State & Universal URL Hash Serializer [R-05]
  - *Persona:* Backend (Bora) & Frontend (Felix)
  - *Scope:* S (2 files)
  - *Acceptance:* Serialisasi dua arah URL hash dinamis (`/lab/:experiment_id#p1=val1&p2=val2`) untuk seluruh 10 modul tanpa autentikasi.
- [ ] **Task 4:** KaTeX Typesetting & Multi-Domain Discrete Table [R-02]
  - *Persona:* Designer (Aria) & Frontend (Felix)
  - *Scope:* S (2 files)
  - *Acceptance:* Tipografi simbol aljabar KaTeX formal dan tabel nilai koordinat diskret adaptif sesuai domain aktif.

### Checkpoint 1: Foundation Complete
- [ ] All unit tests pass (`pnpm test tests/math-engine.test.ts`)
- [ ] Zero floating point comparison bugs ($\epsilon < 10^{-9}$)
- [ ] URL state hash reflects canvas parameters accurately

---

## Phase 2: Core Experience (Universal SVG Viewport & Multi-Register Engine)
- [ ] **Task 5:** Universal SVG Viewport & Multi-Domain Coordinate Canvas [R-01]
  - *Persona:* Designer (Aria) & Frontend (Felix)
  - *Scope:* M (4 files)
  - *Acceptance:* Viewport multi-fungsi 60 FPS: kartesian $x-y$, polar/lingkaran satuan trigonometri, poligon luas geometris, dan strip sebaran data statistik, dengan grid adaptif dan Mode Proyektor kelas (garis 3.5px).
- [ ] **Task 6:** Interactive Direct Manipulation Controls [R-01]
  - *Persona:* Designer (Aria) & Frontend (Felix)
  - *Scope:* S (2 files)
  - *Acceptance:* Slider kontrol reaktif (area sentuh 44px + floating value pill) dan manipulasi titik langsung (vertex/intercept drag) sub-16ms.
- [ ] **Task 7:** Universal Multi-Representation Invariance Sync [R-02]
  - *Persona:* Frontend (Felix)
  - *Scope:* M (3 files)
  - *Acceptance:* Kontainer terpadu 4 register semiotik Duval (Simbol KaTeX, Kanvas SVG, Tabel Koordinat, Narasi Fenomenologis) yang tersinkronisasi otomatis untuk seluruh 10 modul.

### Checkpoint 2: Core Canvas Complete
- [ ] 60 FPS direct manipulation on mobile & desktop across all 10 modules
- [ ] Bidirectional drag and slider reactivity
- [ ] Multi-representation synchrony verified across all 4 registers

---

## Phase 3: Guided Inquiry, Socratic Diagnostics, & Universal LKPD Export
- [ ] **Task 8:** 5-Step Guided Inquiry Workflow [R-03]
  - *Persona:* Designer (Aria) & Backend (Bora)
  - *Scope:* M (3 files)
  - *Acceptance:* Mesin status inkuiri (*Predict -> Manipulate -> Observe -> Explain -> Apply*) yang terkonfigurasi untuk seluruh 10 modul dengan penguncian input hipotesis.
- [ ] **Task 9:** Socratic Misconception & Diagnostic Perturbation Engine [R-04]
  - *Persona:* Backend (Bora) & Designer (Aria)
  - *Scope:* M (3 files)
  - *Acceptance:* Deteksi otomatis salah tafsir konsep umum pada 10 modul (gradien linier, puncak parabola, kuadran trigonometri, asimtot eksponensial) dan penyajian kartu pertanyaan sokrates.
- [ ] **Task 10:** Privacy-First Telemetry & Open Data / LKPD Print Engine [R-06, R-07]
  - *Persona:* Backend (Bora) & DevOps (Deva)
  - *Scope:* M (4 files)
  - *Acceptance:* Pencatatan telemetri inkuiri formatif anonim (Zero PII ring-buffer), ekspor koordinat kurva (CSV/JSON), dan generator Lembar Kerja Peserta Didik (LKPD A4 PDF monokrom) yang photocopy-safe untuk seluruh 10 eksperimen.

### Checkpoint 3: Complete & Production Ready
- [ ] End-to-end 5-step learning flow operational across 10 modules
- [ ] Diagnostic perturbation cards trigger reliably
- [ ] Ekspor data terbuka (CSV/JSON) dan lembar kerja cetak A4 (LKPD PDF) tervalidasi
- [ ] `./radar audit` passes 100% CLEAN

