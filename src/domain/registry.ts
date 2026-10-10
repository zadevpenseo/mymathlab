/**
 * Canonical Experiment Registry
 * Houses the Flagship Quadratic Function module and initial STEM/Industry experiments.
 */

import { ExperimentModule } from './types';
import { QUADRATIC_MISCONCEPTIONS } from './misconception-engine';

export const FLAGSHIP_QUADRATIC_EXPERIMENT: ExperimentModule = {
  id: 'quadratic-vertex',
  title: 'Eksplorasi Fungsi Kuadrat & Titik Puncak',
  subtitle: 'Membedah peran koefisien a, b, dan konstanta c terhadap arah kecekungan, sumbu simetri, dan diskriminan kurva.',
  domain: 'aljabar',
  fase: 'E',
  bskapCode: 'MAT-E-ALG-03',
  canonicalFormula: 'f(x) = ax^2 + bx + c',
  parameters: [
    {
      paramId: 'a',
      symbol: 'a',
      min: -5,
      max: 5,
      step: 0.25,
      defaultValue: 1,
      description: 'Koefisien kuadrat (menentukan arah kecekungan dan kelengkungan kurva)'
    },
    {
      paramId: 'b',
      symbol: 'b',
      min: -8,
      max: 8,
      step: 0.5,
      defaultValue: -4,
      description: 'Koefisien linier (menggeser sumbu simetri dan posisi puncak secara diagonal)'
    },
    {
      paramId: 'c',
      symbol: 'c',
      min: -8,
      max: 8,
      step: 0.5,
      defaultValue: 3,
      description: 'Konstanta bebas (menentukan titik potong dengan sumbu-y)'
    }
  ],
  initialState: {
    a: 1,
    b: -4,
    c: 3
  },
  defaultViewport: {
    xMin: -8,
    xMax: 8,
    yMin: -8,
    yMax: 8
  },
  phenomenonDescription: (params) => {
    const a = params.a ?? 1;
    const b = params.b ?? 0;
    const c = params.c ?? 0;
    const d = b * b - 4 * a * c;

    const opening = a > 0 ? 'terbuka ke atas (memiliki titik minimum)' : a < 0 ? 'terbuka ke bawah (memiliki titik maksimum)' : 'berubah menjadi garis lurus (bukan parabola)';
    const rootStatus = d > 0 ? 'memotong sumbu-x di dua titik berbeda' : Math.abs(d) < 1e-9 ? 'menyinggung sumbu-x di tepat satu titik' : 'tidak memotong sumbu-x (definit)';

    return `Kurva parabola ini ${opening}, memotong sumbu-y pada ketinggian (0, ${c}), serta ${rootStatus} dengan nilai diskriminan D = ${d.toFixed(2)}.`;
  },
  misconceptions: QUADRATIC_MISCONCEPTIONS,
  guidedInquirySteps: {
    predict: {
      question: 'Jika nilai konstanta c dinaikkan dari 3 menjadi 7, apakah yang akan terjadi pada kurva parabola?',
      options: [
        {
          id: 'opt-1',
          text: 'Seluruh kurva terangkat naik secara vertikal tanpa mengubah lebar bukaan.',
          isTargetReasoning: true
        },
        {
          id: 'opt-2',
          text: 'Bukaan kurva menjadi semakin melebar ke kanan dan ke kiri.',
          isTargetReasoning: false
        },
        {
          id: 'opt-3',
          text: 'Kurva berputar terbalik menghadap ke bawah.',
          isTargetReasoning: false
        }
      ]
    },
    observe: {
      prompt: 'Geser slider parameter a, b, dan c di bawah ini secara perlahan. Amati bagaimana posisi titik merah (puncak) dan titik biru (titik potong sumbu) bergerak.',
      guidingQuestions: [
        'Apa yang terjadi tepat saat nilai a berubah dari positif ke negatif?',
        'Apakah nilai c sama persis dengan tinggi titik puncak saat b bukan nol?'
      ]
    },
    explain: {
      reflectionPrompt: 'Apakah pengamatan Anda sesuai dengan tebakan di awal? Mengapa nilai c hanya mempengaruhi pergeseran vertikal pada sumbu-y saat x = 0?',
      invariantsSummary: 'Invarian Kunci: Koefisien a mengendalikan kecekungan, rasio -b/(2a) mengendalikan sumbu simetri, dan konstanta c adalah nilai f(0).'
    },
    apply: {
      realWorldCase: 'Lintasan Peluru Fisika (Gerak Parabola)',
      challengePrompt: 'Sebuah roket air diluncurkan dengan rumus ketinggian h(t) = -5t^2 + 20t + 2 (dalam meter). Atur nilai a = -5, b = 20, c = 2. Berapakah ketinggian maksimum yang dicapai roket tersebut dan pada detik ke berapa?'
    }
  }
};

export const EXPERIMENT_REGISTRY: Record<string, ExperimentModule> = {
  'quadratic-vertex': FLAGSHIP_QUADRATIC_EXPERIMENT
};
