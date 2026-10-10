import React from 'react';
import { X, Briefcase, ArrowRight } from 'lucide-react';
import { INDUSTRY_PRESETS, IndustryPreset } from '../domain/presets/industry-toolkits';

interface IndustryPresetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPreset: (preset: IndustryPreset) => void;
}

export const IndustryPresetModal: React.FC<IndustryPresetModalProps> = ({
  isOpen,
  onClose,
  onSelectPreset
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container preset-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-group">
            <Briefcase size={18} className="modal-icon" />
            <span className="modal-title">Toolkit Matematika Terapan Industri & Model Bisnis</span>
          </div>
          <button onClick={onClose} className="btn-close-modal">
            <X size={18} />
          </button>
        </div>

        <div className="preset-intro-note">
          <p>Pilih model kuantitatif terverifikasi di bawah ini untuk mengamati dinamika parameter, titik kompromi kestabilan (*trade-offs*), dan optimasi keputusan dalam domain bisnis dan teknik.</p>
        </div>

        <div className="presets-grid">
          {INDUSTRY_PRESETS.map((preset) => (
            <div key={preset.id} className="preset-card">
              <div className="preset-header-row">
                <span className="preset-category-badge">{preset.category}</span>
                <span className="preset-formula-tag">{preset.formulaTeX}</span>
              </div>
              <h4 className="preset-name">{preset.name}</h4>
              <p className="preset-description">{preset.description}</p>

              <div className="preset-boundaries-box">
                <span className="boundaries-title">Ambang Batas Kritis:</span>
                <div className="boundaries-tags">
                  {Object.entries(preset.criticalBoundaries).map(([k, v]) => (
                    <span key={k} className="boundary-chip">
                      <strong>{k}:</strong> {v}
                    </span>
                  ))}
                </div>
              </div>

              <div className="preset-applied-note">
                <span>{preset.appliedInterpretation}</span>
              </div>

              <button
                onClick={() => {
                  onSelectPreset(preset);
                  onClose();
                }}
                className="btn-load-preset"
              >
                <span>Muat Kasus ke Kanvas</span>
                <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
