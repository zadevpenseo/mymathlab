import { describe, it, expect } from 'vitest';
import { 
  evaluateQuadratic, 
  formatQuadraticLatex, 
  generateCoordinateTable,
  cleanFloat,
  EPSILON 
} from '../src/domain/math-engine';

describe('MathEngine: Deterministic Quadratic Evaluator', () => {
  const domain = { xMin: -5, xMax: 5, yMin: -5, yMax: 5 };

  it('correctly calculates roots and vertex for y = x^2 - 4x + 3', () => {
    const result = evaluateQuadratic(1, -4, 3, domain);
    const { characteristics } = result;

    expect(characteristics.discriminant).toBe(4);
    expect(characteristics.extremaType).toBe('minimum');
    expect(characteristics.vertex).toEqual({
      x: 2,
      y: -1,
      label: 'Puncak (2, -1)',
      isExtremum: true
    });
    expect(characteristics.axisOfSymmetry).toBe(2);
    expect(characteristics.roots).toHaveLength(2);
    expect(characteristics.roots[0].x).toBe(1);
    expect(characteristics.roots[1].x).toBe(3);
    expect(characteristics.yIntercept).toEqual({
      x: 0,
      y: 3,
      label: 'Potong Sumbu-y (0, 3)',
      isIntercept: true
    });
  });

  it('correctly identifies negative discriminant (D < 0) with zero real roots', () => {
    // y = x^2 + 2x + 5 -> D = 4 - 20 = -16 < 0
    const result = evaluateQuadratic(1, 2, 5, domain);
    expect(result.characteristics.discriminant).toBe(-16);
    expect(result.characteristics.roots).toHaveLength(0);
    expect(result.characteristics.vertex).toEqual({
      x: -1,
      y: 4,
      label: 'Puncak (-1, 4)',
      isExtremum: true
    });
  });

  it('handles linear degeneration when a = 0', () => {
    // y = 0x^2 + 2x - 4 -> linear root at x = 2
    const result = evaluateQuadratic(0, 2, -4, domain);
    expect(result.characteristics.extremaType).toBe('none');
    expect(result.characteristics.roots).toHaveLength(1);
    expect(result.characteristics.roots[0].x).toBe(2);
  });

  it('formats LaTeX representation cleanly without double signs', () => {
    expect(formatQuadraticLatex(1, -4, 3)).toBe('f(x) = x^2 - 4x + 3');
    expect(formatQuadraticLatex(-1, 2, -5)).toBe('f(x) = -x^2 + 2x - 5');
    expect(formatQuadraticLatex(2, 0, 1)).toBe('f(x) = 2x^2 + 1');
  });

  it('enforces cleanFloat within epsilon precision', () => {
    expect(cleanFloat(0.00000000001)).toBe(0);
    expect(cleanFloat(1.0000000001)).toBe(1);
    expect(cleanFloat(2.5555555, 2)).toBe(2.56);
  });

  it('generates discrete coordinate table points correctly', () => {
    const table = generateCoordinateTable(1, 0, 0, 0, 2);
    expect(table).toHaveLength(5);
    expect(table.find(p => p.x === 0)?.y).toBe(0);
    expect(table.find(p => p.x === 2)?.y).toBe(4);
    expect(table.find(p => p.x === -2)?.y).toBe(4);
  });
});
