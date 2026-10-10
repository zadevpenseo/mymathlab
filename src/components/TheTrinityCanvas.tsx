import React, { useEffect, useRef } from 'react';
import katex from 'katex';
import { CanvasViewport } from './CanvasViewport';
import { ViewportDomain, Point, CharacteristicPoints } from '../domain/types';
import { formatQuadraticLatex, generateCoordinateTable } from '../domain/math-engine';

interface TheTrinityCanvasProps {
  a: number;
  b: number;
  c: number;
  domain: ViewportDomain;
  points: Point[];
  characteristics: CharacteristicPoints;
  phenomenonText: string;
  isProjectorMode: boolean;
  onUpdateParams?: (updates: { a?: number; b?: number; c?: number }) => void;
  highlightAction?: string;
}

export const TheTrinityCanvas: React.FC<TheTrinityCanvasProps> = ({
  a,
  b,
  c,
  domain,
  points,
  characteristics,
  phenomenonText,
  isProjectorMode,
  onUpdateParams,
  highlightAction
}) => {
  const formulaRef = useRef<HTMLDivElement>(null);
  const vertexRef = useRef<HTMLSpanElement>(null);
  const rootsRef = useRef<HTMLSpanElement>(null);

  // Render KaTeX dynamic formula
  useEffect(() => {
    if (formulaRef.current) {
      const latex = formatQuadraticLatex(a, b, c);
      katex.render(latex, formulaRef.current, {
        throwOnError: false,
        displayMode: true
      });
    }

    if (vertexRef.current && characteristics.vertex) {
      const vLatex = `(${characteristics.vertex.x},\\; ${characteristics.vertex.y})`;
      katex.render(vLatex, vertexRef.current, { throwOnError: false });
    }

    if (rootsRef.current) {
      if (characteristics.roots.length === 2) {
        const rLatex = `x_1 = ${characteristics.roots[0].x},\\; x_2 = ${characteristics.roots[1].x}`;
        katex.render(rLatex, rootsRef.current, { throwOnError: false });
      } else if (characteristics.roots.length === 1) {
        const rLatex = `x = ${characteristics.roots[0].x}`;
        katex.render(rLatex, rootsRef.current, { throwOnError: false });
      } else {
        rootsRef.current.innerText = 'Tidak ada akar riil (D < 0)';
      }
    }
  }, [a, b, c, characteristics]);

  // Discrete coordinate table points
  const tableData = generateCoordinateTable(a, b, c, characteristics.vertex?.x ?? 0, 3);

  return (
    <div className="trinity-layout">
      {/* Kolom Kiri: Kanvas Geometris & Deskripsi Verbal */}
      <div className="trinity-left-col">
        {/* Register 2: Geometris (SVG Canvas) */}
        <CanvasViewport
          a={a}
          b={b}
          c={c}
          domain={domain}
          points={points}
          characteristics={characteristics}
          isProjectorMode={isProjectorMode}
          onUpdateParams={onUpdateParams}
          highlightAction={highlightAction}
        />

        {/* Register 4: Verbal / Fenomenologis */}
        <div className="register-card phenomenon-card">
          <div className="register-header">
            <span className="register-badge">Register 4: Fenomenologis Verbal</span>
            <span className="register-desc">Deskripsi intuitif relasi matematika</span>
          </div>
          <p className="phenomenon-paragraph">{phenomenonText}</p>
        </div>
      </div>

      {/* Kolom Kanan: Simbolik Aljabar & Tabular Nilai */}
      <div className="trinity-right-col">
        {/* Register 1: Simbolik Formal (KaTeX) */}
        <div className="register-card formula-card">
          <div className="register-header">
            <span className="register-badge">Register 1: Simbolik Formal</span>
            <span className="register-desc">Ekspresi analitis KaTeX</span>
          </div>
          <div ref={formulaRef} className="katex-display-container"></div>

          <div className="formula-metrics-grid">
            <div className="metric-box">
              <span className="metric-title">Titik Puncak</span>
              <span ref={vertexRef} className="metric-val"></span>
            </div>
            <div className="metric-box">
              <span className="metric-title">Diskriminan (D)</span>
              <span className="metric-val font-mono">{characteristics.discriminant ?? '-'}</span>
            </div>
            <div className="metric-box col-span-2">
              <span className="metric-title">Akar-Akar Riil (f(x) = 0)</span>
              <span ref={rootsRef} className="metric-val"></span>
            </div>
          </div>
        </div>

        {/* Register 3: Tabular Diskret */}
        <div className="register-card table-card">
          <div className="register-header">
            <span className="register-badge">Register 3: Tabular Diskret</span>
            <span className="register-desc">Sampel titik koordinat (x, f(x))</span>
          </div>
          <div className="table-scroll-wrapper">
            <table className="coordinate-table">
              <thead>
                <tr>
                  <th>x</th>
                  <th>f(x)</th>
                  <th>Keterangan</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row) => {
                  const isVertex = characteristics.vertex && Math.abs(row.x - characteristics.vertex.x) < 1e-6;
                  const isIntercept = row.x === 0;
                  const isRoot = Math.abs(row.y) < 1e-6;

                  return (
                    <tr key={`t-${row.x}`} className={isVertex ? 'row-vertex' : isRoot ? 'row-root' : ''}>
                      <td className="font-mono">{row.x}</td>
                      <td className="font-mono font-bold">{row.y}</td>
                      <td className="row-annotation">
                        {isVertex && <span className="tag-vertex">Puncak</span>}
                        {isIntercept && <span className="tag-intercept">Potong-y</span>}
                        {isRoot && <span className="tag-root">Akar</span>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
