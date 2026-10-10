/**
 * Deterministic Mathematical Engine (Math Lab Core)
 * Evaluates functions, finds extrema, roots, and enforces float invariance (epsilon = 10^-9).
 */

import { EvaluationResult, Point, ViewportDomain, CharacteristicPoints } from './types';

export const EPSILON = 1e-9;

/**
 * Clean floating point number to prevent display of IEEE 754 precision artifacts.
 */
export function cleanFloat(val: number, precision: number = 4): number {
  if (Math.abs(val) < EPSILON) return 0;
  const factor = Math.pow(10, precision);
  return Math.round(val * factor) / factor;
}

/**
 * Format LaTeX representation of a quadratic polynomial ax^2 + bx + c
 */
export function formatQuadraticLatex(a: number, b: number, c: number): string {
  if (Math.abs(a) < EPSILON && Math.abs(b) < EPSILON && Math.abs(c) < EPSILON) {
    return 'f(x) = 0';
  }

  const parts: string[] = [];

  // Term a*x^2
  if (Math.abs(a) >= EPSILON) {
    if (Math.abs(a - 1) < EPSILON) {
      parts.push('x^2');
    } else if (Math.abs(a - (-1)) < EPSILON) {
      parts.push('-x^2');
    } else {
      parts.push(`${cleanFloat(a)}x^2`);
    }
  }

  // Term b*x
  if (Math.abs(b) >= EPSILON) {
    const isFirst = parts.length === 0;
    if (Math.abs(b - 1) < EPSILON) {
      parts.push(isFirst ? 'x' : '+ x');
    } else if (Math.abs(b - (-1)) < EPSILON) {
      parts.push('- x');
    } else if (b > 0) {
      parts.push(isFirst ? `${cleanFloat(b)}x` : `+ ${cleanFloat(b)}x`);
    } else {
      parts.push(`- ${cleanFloat(Math.abs(b))}x`);
    }
  }

  // Term c
  if (Math.abs(c) >= EPSILON || parts.length === 0) {
    const isFirst = parts.length === 0;
    if (c >= 0) {
      parts.push(isFirst ? `${cleanFloat(c)}` : `+ ${cleanFloat(c)}`);
    } else {
      parts.push(`- ${cleanFloat(Math.abs(c))}`);
    }
  }

  return `f(x) = ${parts.join(' ')}`;
}

/**
 * Evaluates a quadratic function f(x) = ax^2 + bx + c across a domain.
 */
export function evaluateQuadratic(
  a: number,
  b: number,
  c: number,
  domain: ViewportDomain,
  sampleCount: number = 200
): EvaluationResult {
  const points: Point[] = [];
  const step = (domain.xMax - domain.xMin) / (sampleCount - 1);

  for (let i = 0; i < sampleCount; i++) {
    const x = domain.xMin + i * step;
    const y = a * x * x + b * x + c;
    points.push({ x: cleanFloat(x), y: cleanFloat(y) });
  }

  // Calculate characteristics
  const characteristics: CharacteristicPoints = {
    roots: []
  };

  // Check if linear (a == 0)
  if (Math.abs(a) < EPSILON) {
    if (Math.abs(b) >= EPSILON) {
      const rootX = -c / b;
      characteristics.roots.push({
        x: cleanFloat(rootX),
        y: 0,
        label: `Akar (${cleanFloat(rootX)}, 0)`,
        isRoot: true
      });
    }
    characteristics.yIntercept = {
      x: 0,
      y: cleanFloat(c),
      label: `Titik Potong Sumbu-y (0, ${cleanFloat(c)})`,
      isIntercept: true
    };
    characteristics.extremaType = 'none';
  } else {
    // True quadratic
    const discriminant = b * b - 4 * a * c;
    characteristics.discriminant = cleanFloat(discriminant);

    const h = -b / (2 * a);
    const k = a * h * h + b * h + c;
    const isMin = a > 0;

    characteristics.axisOfSymmetry = cleanFloat(h);
    characteristics.vertex = {
      x: cleanFloat(h),
      y: cleanFloat(k),
      label: `Puncak (${cleanFloat(h)}, ${cleanFloat(k)})`,
      isExtremum: true
    };
    characteristics.extremaType = isMin ? 'minimum' : 'maximum';

    characteristics.yIntercept = {
      x: 0,
      y: cleanFloat(c),
      label: `Potong Sumbu-y (0, ${cleanFloat(c)})`,
      isIntercept: true
    };

    // Calculate roots
    if (discriminant > EPSILON) {
      const sqrtD = Math.sqrt(discriminant);
      // Numerically stable quadratic roots to prevent cancellation
      const q = -0.5 * (b + Math.sign(b || 1) * sqrtD);
      const r1 = q / a;
      const r2 = c / q;
      const sortedRoots = [r1, r2].sort((n1, n2) => n1 - n2);

      characteristics.roots.push(
        {
          x: cleanFloat(sortedRoots[0]),
          y: 0,
          label: `Akar x1 (${cleanFloat(sortedRoots[0])}, 0)`,
          isRoot: true
        },
        {
          x: cleanFloat(sortedRoots[1]),
          y: 0,
          label: `Akar x2 (${cleanFloat(sortedRoots[1])}, 0)`,
          isRoot: true
        }
      );
    } else if (Math.abs(discriminant) <= EPSILON) {
      characteristics.roots.push({
        x: cleanFloat(h),
        y: 0,
        label: `Akar Kembar (${cleanFloat(h)}, 0)`,
        isRoot: true
      });
    }
  }

  return {
    points,
    characteristics,
    isContinuous: true,
    domain
  };
}

/**
 * Generates coordinate table points at integer intervals for the tabular register.
 */
export function generateCoordinateTable(
  a: number,
  b: number,
  c: number,
  center: number = 0,
  span: number = 4
): { x: number; y: number }[] {
  const table: { x: number; y: number }[] = [];
  const start = Math.floor(center - span);
  const end = Math.ceil(center + span);

  for (let x = start; x <= end; x++) {
    const y = a * x * x + b * x + c;
    table.push({ x, y: cleanFloat(y) });
  }

  return table;
}
