import { describe, it, expect } from 'vitest';
import { MisconceptionEngine } from '../src/domain/misconception-engine';

describe('Misconception Engine', () => {
  it('triggers MISC-QUAD-01 when non-zero b is present', () => {
    const engine = new MisconceptionEngine();
    const alert = engine.recordState({ a: 1, b: -4, c: 3 });

    expect(alert).not.toBeNull();
    expect(alert?.ruleId).toBe('MISC-QUAD-01');
    expect(alert?.suggestedAction).toBe('highlight_y_intercept');
  });

  it('triggers MISC-QUAD-03 when discriminant is strictly negative (D < 0)', () => {
    const engine = new MisconceptionEngine();
    // a=1, b=0, c=4 -> D = -16 < 0
    const alert = engine.recordState({ a: 1, b: 0, c: 4 });

    expect(alert).not.toBeNull();
    expect(alert?.ruleId).toBe('MISC-QUAD-03');
  });

  it('allows dismissing alerts', () => {
    const engine = new MisconceptionEngine();
    engine.recordState({ a: 1, b: -4, c: 3 });
    expect(engine.getActiveAlerts()).toHaveLength(1);

    engine.dismissAlert('MISC-QUAD-01');
    expect(engine.getActiveAlerts()).toHaveLength(0);
  });
});
