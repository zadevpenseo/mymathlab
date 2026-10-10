import React, { useRef, useState, useCallback, useMemo } from 'react';
import { ViewportDomain, Point, CharacteristicPoints } from '../domain/types';

interface CanvasViewportProps {
  a: number;
  b: number;
  c: number;
  domain: ViewportDomain;
  points: Point[];
  characteristics: CharacteristicPoints;
  isProjectorMode: boolean;
  onUpdateParams?: (updates: { a?: number; b?: number; c?: number }) => void;
  highlightAction?: string;
}

export const CanvasViewport: React.FC<CanvasViewportProps> = ({
  a,
  b,
  c,
  domain,
  points,
  characteristics,
  isProjectorMode,
  onUpdateParams,
  highlightAction
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoverCoord, setHoverCoord] = useState<{ mathX: number; mathY: number; px: number; py: number } | null>(null);
  const [isDraggingVertex, setIsDraggingVertex] = useState(false);

  // SVG internal viewport dimensions
  const viewBoxWidth = 800;
  const viewBoxHeight = 600;

  // Cartesian to Screen SVG Pixel coordinate transformation
  const mathToPixel = useCallback(
    (x: number, y: number) => {
      const px = ((x - domain.xMin) / (domain.xMax - domain.xMin)) * viewBoxWidth;
      const py = ((domain.yMax - y) / (domain.yMax - domain.yMin)) * viewBoxHeight;
      return { px, py };
    },
    [domain]
  );

  // Screen SVG Pixel to Cartesian coordinate transformation
  const pixelToMath = useCallback(
    (px: number, py: number) => {
      const mathX = domain.xMin + (px / viewBoxWidth) * (domain.xMax - domain.xMin);
      const mathY = domain.yMax - (py / viewBoxHeight) * (domain.yMax - domain.yMin);
      return { mathX, mathY };
    },
    [domain]
  );

  // Generate SVG path for the curve
  const curvePathD = useMemo(() => {
    if (points.length === 0) return '';
    const validPoints = points.filter((p) => Math.abs(p.y) <= Math.max(Math.abs(domain.yMax), Math.abs(domain.yMin)) * 2);
    if (validPoints.length === 0) return '';

    const first = mathToPixel(validPoints[0].x, validPoints[0].y);
    let d = `M ${first.px.toFixed(1)} ${first.py.toFixed(1)}`;

    for (let i = 1; i < validPoints.length; i++) {
      const pt = mathToPixel(validPoints[i].x, validPoints[i].y);
      d += ` L ${pt.px.toFixed(1)} ${pt.py.toFixed(1)}`;
    }

    return d;
  }, [points, mathToPixel, domain]);

  // Origin point
  const origin = mathToPixel(0, 0);

  // Grid steps
  const gridLines = useMemo(() => {
    const lines: { x1: number; y1: number; x2: number; y2: number; isMajor: boolean; label?: string; labelPos?: { px: number; py: number } }[] = [];

    // Vertical grid lines (X steps)
    const xStep = 1;
    for (let x = Math.ceil(domain.xMin); x <= Math.floor(domain.xMax); x += xStep) {
      if (x === 0) continue;
      const p1 = mathToPixel(x, domain.yMin);
      const p2 = mathToPixel(x, domain.yMax);
      lines.push({
        x1: p1.px,
        y1: p1.py,
        x2: p2.px,
        y2: p2.py,
        isMajor: x % 2 === 0,
        label: x % 2 === 0 ? x.toString() : undefined,
        labelPos: { px: p1.px, py: origin.py + 18 }
      });
    }

    // Horizontal grid lines (Y steps)
    const yStep = 1;
    for (let y = Math.ceil(domain.yMin); y <= Math.floor(domain.yMax); y += yStep) {
      if (y === 0) continue;
      const p1 = mathToPixel(domain.xMin, y);
      const p2 = mathToPixel(domain.xMax, y);
      lines.push({
        x1: p1.px,
        y1: p1.py,
        x2: p2.px,
        y2: p2.py,
        isMajor: y % 2 === 0,
        label: y % 2 === 0 ? y.toString() : undefined,
        labelPos: { px: origin.px - 14, py: p1.py + 4 }
      });
    }

    return lines;
  }, [domain, mathToPixel, origin]);

  // Handle Mouse movement on SVG canvas for hover inspection
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const scaleX = viewBoxWidth / rect.width;
    const scaleY = viewBoxHeight / rect.height;
    const px = (e.clientX - rect.left) * scaleX;
    const py = (e.clientY - rect.top) * scaleY;

    const { mathX } = pixelToMath(px, py);
    const mathY = a * mathX * mathX + b * mathX + c;
    const curvePixel = mathToPixel(mathX, mathY);

    setHoverCoord({
      mathX: Math.round(mathX * 100) / 100,
      mathY: Math.round(mathY * 100) / 100,
      px: curvePixel.px,
      py: curvePixel.py
    });

    // If dragging vertex
    if (isDraggingVertex && onUpdateParams && a !== 0) {
      const targetMath = pixelToMath(px, py);
      // New vertex (h, k) -> new b = -2*a*h, new c = k - a*h^2
      const newB = Math.round(-2 * a * targetMath.mathX * 2) / 2;
      const newC = Math.round((targetMath.mathY - a * targetMath.mathX * targetMath.mathX) * 2) / 2;
      onUpdateParams({ b: newB, c: newC });
    }
  };

  const handleMouseLeave = () => {
    setHoverCoord(null);
    setIsDraggingVertex(false);
  };

  const handleVertexMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDraggingVertex(true);
  };

  const handleMouseUp = () => {
    setIsDraggingVertex(false);
  };

  // Vertex position
  const vertexPixel = characteristics.vertex
    ? mathToPixel(characteristics.vertex.x, characteristics.vertex.y)
    : null;

  // Y-Intercept position
  const yInterceptPixel = characteristics.yIntercept
    ? mathToPixel(characteristics.yIntercept.x, characteristics.yIntercept.y)
    : null;

  // Roots positions
  const rootsPixels = characteristics.roots.map((r) => mathToPixel(r.x, r.y));

  return (
    <div className={`canvas-viewport-card ${isProjectorMode ? 'projector-mode' : ''}`}>
      <div className="canvas-header-strip">
        <span className="canvas-title-text">Kanvas Kartesian Interaktif (SVG Deterministik)</span>
        <div className="canvas-legend">
          <span className="legend-item"><span className="legend-dot dot-vertex"></span> Titik Puncak (h, k)</span>
          <span className="legend-item"><span className="legend-dot dot-intercept"></span> Potong Sumbu-y (0, c)</span>
          <span className="legend-item"><span className="legend-dot dot-root"></span> Akar Riil f(x)=0</span>
          {characteristics.axisOfSymmetry !== undefined && (
            <span className="legend-item"><span className="legend-line line-axis"></span> Sumbu Simetri</span>
          )}
        </div>
      </div>

      <div className="svg-wrapper">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
          className="math-svg-canvas"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
        >
          <defs>
            <filter id="glow-vertex" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Grid Lines */}
          <g className="grid-layer">
            {gridLines.map((line, idx) => (
              <line
                key={`grid-${idx}`}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke={line.isMajor ? (isProjectorMode ? '#cbd5e1' : 'var(--grid-major)') : (isProjectorMode ? '#f1f5f9' : 'var(--grid-minor)')}
                strokeWidth={line.isMajor ? 1 : 0.5}
                strokeDasharray={line.isMajor ? undefined : '2 2'}
              />
            ))}
          </g>

          {/* Coordinate Axes */}
          <g className="axes-layer">
            {/* X Axis */}
            <line
              x1={0}
              y1={origin.py}
              x2={viewBoxWidth}
              y2={origin.py}
              stroke={isProjectorMode ? '#0f172a' : 'var(--axis-stroke)'}
              strokeWidth={isProjectorMode ? 2.5 : 1.8}
            />
            {/* Y Axis */}
            <line
              x1={origin.px}
              y1={0}
              x2={origin.px}
              y2={viewBoxHeight}
              stroke={isProjectorMode ? '#0f172a' : 'var(--axis-stroke)'}
              strokeWidth={isProjectorMode ? 2.5 : 1.8}
            />

            {/* Axis Numeric Labels */}
            {gridLines.map(
              (line, idx) =>
                line.label &&
                line.labelPos && (
                  <text
                    key={`lbl-${idx}`}
                    x={line.labelPos.px}
                    y={line.labelPos.py}
                    fontSize={isProjectorMode ? 14 : 11}
                    fontFamily="JetBrains Mono, monospace"
                    fill={isProjectorMode ? '#0f172a' : 'var(--text-muted)'}
                    textAnchor="middle"
                    className="axis-label-text"
                  >
                    {line.label}
                  </text>
                )
            )}
            <text x={viewBoxWidth - 16} y={origin.py - 8} fontSize={13} fontWeight="bold" fill="var(--text-primary)">x</text>
            <text x={origin.px + 10} y={18} fontSize={13} fontWeight="bold" fill="var(--text-primary)">y</text>
          </g>

          {/* Axis of Symmetry (Dashed Vertical Line) */}
          {characteristics.axisOfSymmetry !== undefined && (
            <line
              x1={mathToPixel(characteristics.axisOfSymmetry, 0).px}
              y1={0}
              x2={mathToPixel(characteristics.axisOfSymmetry, 0).px}
              y2={viewBoxHeight}
              stroke="#94a3b8"
              strokeWidth={isProjectorMode ? 2 : 1.2}
              strokeDasharray="6 4"
            />
          )}

          {/* Function Curve (SVG Path) */}
          <path
            d={curvePathD}
            fill="none"
            stroke={isProjectorMode ? '#1e3a8a' : 'var(--curve-primary)'}
            strokeWidth={isProjectorMode ? 4.0 : 3.0}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="smooth-math-curve"
          />

          {/* Roots (Emerald Dots) */}
          {rootsPixels.map((rp, idx) => (
            <g key={`root-${idx}`}>
              <circle
                cx={rp.px}
                cy={rp.py}
                r={isProjectorMode ? 6 : 5}
                fill="#10b981"
                stroke="#ffffff"
                strokeWidth={2}
              />
              <text
                x={rp.px}
                y={rp.py - 10}
                fontSize={isProjectorMode ? 13 : 11}
                fontFamily="JetBrains Mono, monospace"
                fontWeight="600"
                fill="#047857"
                textAnchor="middle"
              >
                x{idx + 1}
              </text>
            </g>
          ))}

          {/* Y-Intercept (Indigo Dot) */}
          {yInterceptPixel && (
            <g className={highlightAction === 'highlight_y_intercept' ? 'pulse-highlight' : ''}>
              <circle
                cx={yInterceptPixel.px}
                cy={yInterceptPixel.py}
                r={isProjectorMode ? 7 : 5.5}
                fill="#6366f1"
                stroke="#ffffff"
                strokeWidth={2}
              />
              <text
                x={yInterceptPixel.px + 14}
                y={yInterceptPixel.py + 4}
                fontSize={isProjectorMode ? 13 : 11}
                fontFamily="JetBrains Mono, monospace"
                fontWeight="600"
                fill="#4338ca"
              >
                (0, {c})
              </text>
            </g>
          )}

          {/* Vertex Extrema Point (Red Draggable Handle) */}
          {vertexPixel && (
            <g
              className={`vertex-handle ${highlightAction === 'highlight_vertex' ? 'pulse-highlight' : ''}`}
              onMouseDown={handleVertexMouseDown}
              style={{ cursor: isDraggingVertex ? 'grabbing' : 'grab' }}
            >
              <circle
                cx={vertexPixel.px}
                cy={vertexPixel.py}
                r={isProjectorMode ? 9 : 7}
                fill="#ef4444"
                stroke="#ffffff"
                strokeWidth={2.5}
                filter="url(#glow-vertex)"
              />
              <circle
                cx={vertexPixel.px}
                cy={vertexPixel.py}
                r={isProjectorMode ? 16 : 14}
                fill="transparent"
                stroke="#ef4444"
                strokeWidth={1}
                strokeDasharray="2 2"
                opacity={0.6}
              />
              <text
                x={vertexPixel.px}
                y={vertexPixel.py + (a > 0 ? 22 : -12)}
                fontSize={isProjectorMode ? 13 : 11}
                fontFamily="JetBrains Mono, monospace"
                fontWeight="bold"
                fill="#b91c1c"
                textAnchor="middle"
              >
                Puncak ({characteristics.vertex?.x}, {characteristics.vertex?.y})
              </text>
            </g>
          )}

          {/* Hover Coordinate Tracking Callout */}
          {hoverCoord && (
            <g className="hover-callout">
              <circle cx={hoverCoord.px} cy={hoverCoord.py} r={4.5} fill="#f59e0b" stroke="#ffffff" strokeWidth={1.5} />
              <rect
                x={hoverCoord.px + 10}
                y={hoverCoord.py - 24}
                width={110}
                height={22}
                rx={4}
                fill="#1e293b"
                opacity={0.9}
              />
              <text
                x={hoverCoord.px + 65}
                y={hoverCoord.py - 9}
                fontSize={10.5}
                fontFamily="JetBrains Mono, monospace"
                fill="#ffffff"
                textAnchor="middle"
              >
                ({hoverCoord.mathX}, {hoverCoord.mathY})
              </text>
            </g>
          )}
        </svg>
      </div>
      <div className="canvas-footer-tip">
        <span>💡 Tips: Klik dan tahan titik merah (Puncak) untuk menggeser kurva langsung di kanvas.</span>
      </div>
    </div>
  );
};
