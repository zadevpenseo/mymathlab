/**
 * Cloudflare Pages Function: WebMCP Agent Tooling Endpoint (/api/mcp)
 * Conforms to RFC 9727 and Model Context Protocol specification.
 */

import { handleGetCanvasState, handleSetCanvasParameter, handleAuditMathInvariance } from '../../src/mcp/tools';

interface Env {
  DB?: unknown;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const body = await context.request.json() as {
      toolName?: string;
      arguments?: Record<string, unknown>;
    };

    const toolName = body.toolName;
    const args = body.arguments || {};

    if (toolName === 'get_canvas_state') {
      const a = Number(args.a ?? 1);
      const b = Number(args.b ?? 0);
      const c = Number(args.c ?? 0);
      const result = handleGetCanvasState({ a, b, c });
      return new Response(JSON.stringify({ status: 'success', data: result }), {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }

    if (toolName === 'set_canvas_parameter') {
      const current = (args.current as { a: number; b: number; c: number }) || { a: 1, b: 0, c: 0 };
      const updates = (args.updates as Partial<{ a: number; b: number; c: number }>) || {};
      const result = handleSetCanvasParameter(current, updates);
      return new Response(JSON.stringify({ status: 'success', data: result }), {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }

    if (toolName === 'audit_math_invariance') {
      const a = Number(args.a ?? 1);
      const b = Number(args.b ?? 0);
      const c = Number(args.c ?? 0);
      const result = handleAuditMathInvariance({ a, b, c });
      return new Response(JSON.stringify({ status: 'success', data: result }), {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }

    return new Response(JSON.stringify({ status: 'error', message: `Unknown tool: ${toolName}` }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return new Response(JSON.stringify({ status: 'error', error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }
};

export const onRequestGet: PagesFunction<Env> = async () => {
  // Returns MCP server metadata and available tools (RFC 9727)
  const manifest = {
    name: 'mymathlab-agent-tooling',
    version: '1.0.0',
    protocolVersion: '2024-11-05',
    description: 'Deterministic mathematical inquiry engine for AI agents',
    tools: [
      {
        name: 'get_canvas_state',
        description: 'Get current mathematical canvas state, roots, vertex, KaTeX formula, and discriminant',
        inputSchema: {
          type: 'object',
          properties: {
            a: { type: 'number', description: 'Quadratic coefficient' },
            b: { type: 'number', description: 'Linear coefficient' },
            c: { type: 'number', description: 'Constant term' }
          }
        }
      },
      {
        name: 'set_canvas_parameter',
        description: 'Update canvas parameters and recalculate mathematical characteristics',
        inputSchema: {
          type: 'object',
          properties: {
            current: { type: 'object' },
            updates: { type: 'object' }
          }
        }
      },
      {
        name: 'audit_math_invariance',
        description: 'Audit mathematical consistency and float invariance (tolerance epsilon = 10^-9)',
        inputSchema: {
          type: 'object',
          properties: {
            a: { type: 'number' },
            b: { type: 'number' },
            c: { type: 'number' }
          }
        }
      }
    ]
  };

  return new Response(JSON.stringify(manifest, null, 2), {
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
  });
};
