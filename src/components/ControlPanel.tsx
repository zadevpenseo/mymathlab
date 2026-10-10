import React from 'react';
import { RotateCcw, Lock } from 'lucide-react';
import { ParameterDef } from '../domain/types';

interface ControlPanelProps {
  parameters: ParameterDef[];
  values: Record<string, number>;
  onChange: (paramId: string, value: number) => void;
  onReset: () => void;
  isLockedByPredict?: boolean;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  parameters,
  values,
  onChange,
  onReset,
  isLockedByPredict = false
}) => {
  return (
    <div className={`control-panel-card ${isLockedByPredict ? 'controls-locked' : ''}`}>
      <div className="panel-header-row">
        <div className="panel-title-group">
          <span className="panel-title">Kontrol Parameter Variabel</span>
          {isLockedByPredict && (
            <span className="locked-badge">
              <Lock size={12} />
              <span>Selesaikan Prediksi untuk Membuka Kontrol</span>
            </span>
          )}
        </div>
        <button
          onClick={onReset}
          className="btn-reset-params"
          title="Kembalikan semua nilai ke kondisi awal"
          disabled={isLockedByPredict}
        >
          <RotateCcw size={13} />
          <span>Reset Nilai</span>
        </button>
      </div>

      <div className="sliders-list">
        {parameters.map((param) => {
          const val = values[param.paramId] ?? param.defaultValue;
          return (
            <div key={param.paramId} className="slider-item">
              <div className="slider-info-row">
                <div className="slider-label-group">
                  <span className="param-symbol">{param.symbol}</span>
                  <span className="param-desc">{param.description}</span>
                </div>
                <div className="slider-val-box">
                  <span className="current-val-number">{val}</span>
                </div>
              </div>

              <div className="slider-input-wrapper">
                <button
                  type="button"
                  className="btn-step"
                  onClick={() => onChange(param.paramId, Math.max(param.min, Math.round((val - param.step) * 100) / 100))}
                  disabled={isLockedByPredict || val <= param.min}
                >
                  -
                </button>
                <input
                  type="range"
                  min={param.min}
                  max={param.max}
                  step={param.step}
                  value={val}
                  onChange={(e) => onChange(param.paramId, parseFloat(e.target.value))}
                  disabled={isLockedByPredict}
                  className="range-input"
                />
                <button
                  type="button"
                  className="btn-step"
                  onClick={() => onChange(param.paramId, Math.min(param.max, Math.round((val + param.step) * 100) / 100))}
                  disabled={isLockedByPredict || val >= param.max}
                >
                  +
                </button>
              </div>

              <div className="slider-range-labels">
                <span>min: {param.min}</span>
                <span>step: {param.step}</span>
                <span>max: {param.max}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
