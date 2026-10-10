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
- [x] **Task 0:** Initialize Project, Repository, & Cloudflare Edge Setup
  - *Persona:* DevOps (Deva)
  - *Scope:* S (Project scaffolding, Git repo initialization, Wrangler configuration)
  - *Acceptance:* Scaffold Vite 6 + React 19 + TypeScript, tautan remote Git ke repository `zadevpenseo/mymathlab`, konfigurasi `wrangler.toml` untuk Cloudflare Pages & Functions/Worker, instalasi KaTeX dan math.js.
  - *Verification:* `pnpm build` sukses, `git remote -v` terhubung.

### Checkpoint 0: Scaffold & Infrastructure Ready
- [x] Project scaffolds and compiles without error
- [x] Repository created and tracked (https://github.com/zadevpenseo/mymathlab)
- [x] Cloudflare deployment configuration valid


---

## Phase 1: Foundation (Flagship Deterministic Core & Registry)
- [x] **Task 1:** Generic Math Engine & AST Compiler [R-01, R-02]
  - *Persona:* Backend (Bora)
  - *Scope:* M (4 files)
  - *Acceptance:* Parser ekspresi analitis, evaluasi numerik fungsi kurva, pencarian titik kritis/akar/asimtot, toleransi floating point $\epsilon = 10^{-9}$.
- [x] **Task 2:** Built-in Canonical Registry & Reactive URL Hash [R-01, R-02, R-05]
  - *Persona:* Backend (Bora) & Designer (Aria)
  - *Scope:* M (2 files)
  - *Acceptance:* Serialisasi dua arah URL hash dinamis (`#a=...&b=...`).
- [x] **Task 3:** KaTeX Typesetting & Multi-Domain Discrete Table [R-02]
  - *Persona:* Designer (Aria) & Frontend (Felix)
  - *Scope:* S (2 files)
  - *Acceptance:* Tipografi simbol aljabar KaTeX formal dan tabel nilai koordinat diskret adaptif.

### Checkpoint 1: Foundation Complete
- [x] All unit tests pass (`pnpm test`) - 16/16 tests passing.
- [x] Zero floating point comparison bugs ($\epsilon < 10^{-9}$).
- [x] URL state hash reflects canvas parameters accurately.

---

## Phase 2: Core Experience (Universal SVG Viewport & Multi-Register Engine)
- [x] **Task 4:** Universal SVG Viewport & Coordinate Canvas [R-01]
  - *Persona:* Designer (Aria) & Frontend (Felix)
  - *Scope:* M (4 files)
  - *Acceptance:* Viewport 60 FPS SVG dengan grid adaptif dan Mode Proyektor kelas (garis 3.5px).
- [x] **Task 5:** Interactive Direct Manipulation Controls [R-01]
  - *Persona:* Designer (Aria) & Frontend (Felix)
  - *Scope:* S (2 files)
  - *Acceptance:* Slider kontrol reaktif dan manipulasi titik puncak langsung di kanvas sub-16ms.
- [x] **Task 6:** Universal Multi-Representation Invariance Sync [R-02]
  - *Persona:* Frontend (Felix)
  - *Scope:* M (3 files)
  - *Acceptance:* Kontainer terpadu 4 register semiotik Duval (Simbol KaTeX, Kanvas SVG, Tabel Koordinat, Narasi Fenomenologis).

### Checkpoint 2: Core Canvas Complete
- [x] 60 FPS direct manipulation on mobile & desktop
- [x] Bidirectional drag and slider reactivity
- [x] Multi-representation synchrony verified across all 4 registers

---

## Phase 3: Guided Inquiry, Socratic Diagnostics, & Universal LKPD Export
- [x] **Task 7:** 5-Step Guided Inquiry Workflow [R-03]
  - *Persona:* Designer (Aria) & Backend (Bora)
  - *Scope:* M (3 files)
  - *Acceptance:* Mesin status inkuiri (*Predict -> Manipulate -> Observe -> Explain -> Apply*) dengan penguncian input hipotesis.
- [x] **Task 8:** Socratic Misconception & Diagnostic Perturbation Engine [R-04]
  - *Persona:* Backend (Bora) & Designer (Aria)
  - *Scope:* S (2 files)
  - *Acceptance:* Deteksi otomatis miskonsepsi konstanta c, arah bukaan a, dan diskriminan D < 0.
- [x] **Task 9:** Universal Print-Ready Worksheet (LKPD) & Telemetry [R-06, R-07]
  - *Persona:* Designer (Aria) & DevOps (Deva)
  - *Scope:* M (3 files)
  - *Acceptance:* Generator LKPD format A4 2 halaman monokrom 100% photocopy-safe dan telemetri lokal Zero-PII.

---

## Phase 4: Polyglot Scientific Code, Schema & AI Agent Tooling
- [x] **Task 10:** Polyglot Scientific Code Generator (Python NumPy, R ggplot2, LaTeX PGFPlots) [R-09]
- [x] **Task 11:** Plugin-First Open Experiment Schema & Registry [R-10]
- [x] **Task 12:** Agent-Native FastMCP / WebMCP Tooling Layer (RFC 9727) [R-11]
- [x] **Task 13:** Professional Industry & Advanced STEM Presets [R-12]

### Checkpoint 3: Flagship Release Complete & Pushed to Remote
- [x] Seluruh 13 task terselesaikan, teruji via Vitest (16/16 tests passing).
- [x] Bundle terkompilasi optimal (index JS 81.21 KB gzip < 150 KB limit).
- [x] Kode terpublikasi di repositori GitHub https://github.com/zadevpenseo/mymathlab.
- [x] Endpoint WebMCP agent tooling (/api/mcp) terdaftar di Cloudflare Pages Functions.
- [x] Audit linter `./radar audit` mencatatkan 100% CLEAN.


