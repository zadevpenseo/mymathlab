import { describe, it, expect } from 'vitest';
import { 
  handleGetCanvasState, 
  handleSetCanvasParameter, 
  handleAuditMathInvariance 
} from '../src/mcp/tools';

describe('FastMCP & WebMCP Tool Handlers', () => {
  it('returns valid canvas state and KaTeX string', () => {
    const res = handleGetCanvasState({ a: 1, b: -4, c: 3 });

    expect(res.parameters).toEqual({ a: 1, b: -4, c: 3 });
    expect(res.latexFormula).toBe('f(x) = x^2 - 4x + 3');
    expect(res.characteristics.vertex).toEqual({ x: 2, y: -1 });
    expect(res.characteristics.roots).toHaveLength(2);
    expect(res.invarianceStatus).toBe('valid');
  });

  it('updates parameters and re-evaluates characteristics', () => {
    const updated = handleSetCanvasParameter({ a: 1, b: -4, c: 3 }, { c: 5 });

    expect(updated.parameters.c).toBe(5);
    expect(updated.latexFormula).toBe('f(x) = x^2 - 4x + 5');
    // D = 16 - 20 = -4 < 0 -> 0 roots
    expect(updated.characteristics.roots).toHaveLength(0);
  });

  it('validates math invariance checks successfully', () => {
    const audit = handleAuditMathInvariance({ a: 2, b: -8, c: 6 });

    expect(audit.isInvariantValid).toBe(true);
    expect(audit.checks.vertexFormulaConsistent).toBe(true);
    expect(audit.checks.discriminantConsistent).toBe(true);
    expect(audit.checks.rootsCountMatchesDiscriminantSign).toBe(true);
  });
});
