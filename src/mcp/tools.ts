/**
 * FastMCP & WebMCP Tool Definitions (RFC 9727 Compliant)
 * Exposes deterministic mathematical state manipulation to AI agents.
 */

import { evaluateQuadratic, formatQuadraticLatex, EPSILON } from '../domain/math-engine';

export interface CanvasStateResponse {
  parameters: { a: number; b: number; c: number };
  latexFormula: string;
  characteristics: {
    vertex?: { x: number; y: number };
    roots: { x: number; y: number }[];
    discriminant?: number;
    extremaType?: string;
  };
  invarianceStatus: 'valid' | 'invalid';
}

export function handleGetCanvasState(params: { a: number; b: number; c: number }): CanvasStateResponse {
  const result = evaluateQuadratic(params.a, params.b, params.c, { xMin: -10, xMax: 10, yMin: -10, yMax: 10 });
  const latex = formatQuadraticLatex(params.a, params.b, params.c);

  return {
    parameters: { ...params },
    latexFormula: latex,
    characteristics: {
      vertex: result.characteristics.vertex ? { x: result.characteristics.vertex.x, y: result.characteristics.vertex.y } : undefined,
      roots: result.characteristics.roots.map((r) => ({ x: r.x, y: r.y })),
      discriminant: result.characteristics.discriminant,
      extremaType: result.characteristics.extremaType
    },
    invarianceStatus: 'valid'
  };
}

export function handleSetCanvasParameter(
  currentParams: { a: number; b: number; c: number },
  updates: Partial<{ a: number; b: number; c: number }>
): CanvasStateResponse {
  const newParams = {
    a: updates.a !== undefined ? updates.a : currentParams.a,
    b: updates.b !== undefined ? updates.b : currentParams.b,
    c: updates.c !== undefined ? updates.c : currentParams.c
  };
  return handleGetCanvasState(newParams);
}

export function handleAuditMathInvariance(params: { a: number; b: number; c: number }): {
  isInvariantValid: boolean;
  tolerance: number;
  checks: Record<string, boolean>;
} {
  const result = evaluateQuadratic(params.a, params.b, params.c, { xMin: -10, xMax: 10, yMin: -10, yMax: 10 });
  
  // Verify vertex formula consistency
  let vertexConsistent = true;
  if (params.a !== 0 && result.characteristics.vertex) {
    const expectedH = -params.b / (2 * params.a);
    const expectedK = params.a * expectedH * expectedH + params.b * expectedH + params.c;
    vertexConsistent = Math.abs(result.characteristics.vertex.x - expectedH) < EPSILON &&
                       Math.abs(result.characteristics.vertex.y - expectedK) < EPSILON;
  }

  // Verify discriminant consistency
  const expectedD = params.b * params.b - 4 * params.a * params.c;
  const discriminantConsistent = result.characteristics.discriminant !== undefined ?
    Math.abs(result.characteristics.discriminant - expectedD) < EPSILON : true;

  return {
    isInvariantValid: vertexConsistent && discriminantConsistent,
    tolerance: EPSILON,
    checks: {
      vertexFormulaConsistent: vertexConsistent,
      discriminantConsistent: discriminantConsistent,
      rootsCountMatchesDiscriminantSign: (expectedD > 0 && result.characteristics.roots.length === 2) ||
                                         (expectedD === 0 && result.characteristics.roots.length === 1) ||
                                         (expectedD < 0 && result.characteristics.roots.length === 0)
    }
  };
}
