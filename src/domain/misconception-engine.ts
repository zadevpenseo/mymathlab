/**
 * Socratic Misconception Diagnostic Engine
 * Detects flawed student reasoning patterns and generates cognitive perturbations.
 */

import { MisconceptionRule, MisconceptionAlert } from './types';
import { EPSILON } from './math-engine';

export const QUADRATIC_MISCONCEPTIONS: MisconceptionRule[] = [
  {
    id: 'MISC-QUAD-01',
    title: 'Miskonsepsi Peran Konstanta c',
    conceptKey: 'c_is_vertex_not_intercept',
    socraticPrompt: 'Perhatikan titik di mana kurva memotong sumbu-y saat x = 0. Apakah nilai konstanta c menentukan tinggi titik potong sumbu-y, ataukah titik puncak paling atas/bawah?',
    suggestedAction: 'highlight_y_intercept',
    triggerCondition: (params) => {
      // Triggered if b is non-zero, meaning the vertex y is different from c,
      // but student keeps adjusting c to reach an extrema target.
      const b = params.b ?? 0;
      return Math.abs(b) >= 1.0;
    }
  },
  {
    id: 'MISC-QUAD-02',
    title: 'Miskonsepsi Arah Kecekungan (Tanda a)',
    conceptKey: 'sign_of_a_concavity',
    socraticPrompt: 'Saat nilai a positif, apakah kurva menampung air (terbuka ke atas) atau menumpahkan air (terbuka ke bawah)? Coba amati apa yang terjadi tepat saat nilai a berubah tanda menjadi negatif.',
    suggestedAction: 'highlight_vertex',
    triggerCondition: (params) => {
      const a = params.a ?? 1;
      return Math.abs(a) <= 0.2 && Math.abs(a) >= EPSILON;
    }
  },
  {
    id: 'MISC-QUAD-03',
    title: 'Miskonsepsi Diskriminan Negatif (D < 0)',
    conceptKey: 'negative_discriminant_roots',
    socraticPrompt: 'Ketika kurva berada sepenuhnya di atas atau di bawah sumbu-x (D < 0), kurva tetap ada dan berbentuk sempurna. Mengapa kurva tidak memotong garis sumbu-x?',
    suggestedAction: 'show_counterexample',
    triggerCondition: (params) => {
      const a = params.a ?? 1;
      const b = params.b ?? 0;
      const c = params.c ?? 0;
      const d = b * b - 4 * a * c;
      return d < -0.5;
    }
  },
  {
    id: 'MISC-QUAD-04',
    title: 'Miskonsepsi Pelebaran Kurva vs Pergeseran Vertikal',
    conceptKey: 'c_shifts_not_widens',
    socraticPrompt: 'Apakah mengubah nilai c membuat bentuk kurva menjadi lebih kurus/lebar, atau hanya menggeser seluruh kurva naik-turun secara utuh tanpa mengubah bentuknya?',
    suggestedAction: 'highlight_y_intercept',
    triggerCondition: (params) => {
      const a = params.a ?? 1;
      const c = params.c ?? 0;
      return Math.abs(c) >= 4.0 && Math.abs(a) === 1.0;
    }
  }
];

export class MisconceptionEngine {
  private history: Record<string, number>[] = [];
  private activeAlerts: Map<string, MisconceptionAlert> = new Map();

  constructor(private rules: MisconceptionRule[] = QUADRATIC_MISCONCEPTIONS) {}

  public recordState(params: Record<string, number>): MisconceptionAlert | null {
    this.history.push({ ...params });
    if (this.history.length > 50) {
      this.history.shift();
    }

    for (const rule of this.rules) {
      if (rule.triggerCondition(params, this.history)) {
        const alert: MisconceptionAlert = {
          ruleId: rule.id,
          title: rule.title,
          prompt: rule.socraticPrompt,
          detectedAt: Date.now(),
          suggestedAction: rule.suggestedAction
        };
        this.activeAlerts.set(rule.id, alert);
        return alert;
      }
    }

    return null;
  }

  public getActiveAlerts(): MisconceptionAlert[] {
    return Array.from(this.activeAlerts.values());
  }

  public dismissAlert(ruleId: string): void {
    this.activeAlerts.delete(ruleId);
  }

  public reset(): void {
    this.history = [];
    this.activeAlerts.clear();
  }
}
