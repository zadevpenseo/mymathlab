/**
 * Professional Industry & Quantitative Applied Presets
 * Pre-configured mathematical models for quantitative analysts, engineers, and researchers.
 */

export interface IndustryPreset {
  id: string;
  name: string;
  category: 'Keuangan' | 'Rantai Pasok' | 'Epidemiologi' | 'Kendali Sistem' | 'Machine Learning';
  description: string;
  params: Record<string, number>;
  formulaTeX: string;
  appliedInterpretation: string;
  criticalBoundaries: Record<string, number | string>;
}

export const INDUSTRY_PRESETS: IndustryPreset[] = [
  {
    id: 'eoq-inventory',
    name: 'Optimasi Biaya Persediaan (EOQ - Wilson Model)',
    category: 'Rantai Pasok',
    description: 'Menemukan kuantitas pemesanan optimal untuk meminimalkan kompromi antara biaya pemesanan dan biaya penyimpanan.',
    params: { a: 0.5, b: -6, c: 25 },
    formulaTeX: 'TC(Q) = 0.5Q^2 - 6Q + 25',
    appliedInterpretation: 'Titik minimum parabola merepresentasikan kuantitas pemesanan paling hemat biaya (Economic Order Quantity).',
    criticalBoundaries: {
      'Titik Optimal Q*': '6 unit',
      'Total Biaya Minimum': 'Rp 7.000.000'
    }
  },
  {
    id: 'projectile-kinematics',
    name: 'Balistika & Lintasan Peluru Fisika',
    category: 'Kendali Sistem',
    description: 'Menghitung ketinggian apogee maksimum dan jarak jatuh proyektil dalam gravitasi bumi.',
    params: { a: -0.5, b: 4, c: 1.5 },
    formulaTeX: 'h(t) = -0.5t^2 + 4t + 1.5',
    appliedInterpretation: 'Puncak parabola (h, k) menunjukkan apogee ketinggian 9.5 meter pada detik ke-4.',
    criticalBoundaries: {
      'Waktu Apogee': '4.0 detik',
      'Ketinggian Puncak': '9.5 meter',
      'Waktu Tumbukan': '8.36 detik'
    }
  },
  {
    id: 'ml-gradient-descent',
    name: 'Optimasi Kuadratik Fungsi Loss Machine Learning',
    category: 'Machine Learning',
    description: 'Visualisasi permukaan convex loss 1D untuk mendemonstrasikan kestabilan learning rate pada proses optimasi gradient descent.',
    params: { a: 2, b: -8, c: 10 },
    formulaTeX: 'L(w) = 2w^2 - 8w + 10',
    appliedInterpretation: 'Bobot optimal w* = 2.0 menghasilkan loss global minimum sebesar 2.0. Gradien bernilai nol pada titik stasioner.',
    criticalBoundaries: {
      'Bobot Optimal w*': '2.0',
      'Loss Minimum L*': '2.0'
    }
  },
  {
    id: 'revenue-profit-maximization',
    name: 'Maksimasi Keuntungan Ekonomi Manajerial',
    category: 'Keuangan',
    description: 'Kurva penerimaan total kuadratik menghadapi fungsi permintaan linier dengan elastisitas harga.',
    params: { a: -1, b: 10, c: -9 },
    formulaTeX: '\\pi(P) = -P^2 + 10P - 9',
    appliedInterpretation: 'Titik impas (Break-even points) terjadi saat laba = 0 (P = 1 dan P = 9). Laba maksimum tercapai pada harga P = 5.',
    criticalBoundaries: {
      'Harga Optimal P*': 'Rp 5.000',
      'Laba Maksimum': 'Rp 16.000.000',
      'Batas Impas': 'P1 = 1, P2 = 9'
    }
  }
];
