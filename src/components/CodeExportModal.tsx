import React, { useState } from 'react';
import { X, Copy, Check, Terminal } from 'lucide-react';
import { PolyglotCodeExport } from '../domain/types';

interface CodeExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  codeExport: PolyglotCodeExport;
}

export const CodeExportModal: React.FC<CodeExportModalProps> = ({
  isOpen,
  onClose,
  codeExport
}) => {
  const [activeTab, setActiveTab] = useState<'python' | 'r' | 'latex'>('python');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentCode =
    activeTab === 'python'
      ? codeExport.pythonNumPyMatplotlib
      : activeTab === 'r'
      ? codeExport.rGgplot2
      : codeExport.latexPgfplotsTikz;

  const handleCopy = async () => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(currentCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container code-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-group">
            <Terminal size={18} className="modal-icon" />
            <span className="modal-title">Replikasi Riset 1 Klik (Polyglot Scientific Code)</span>
          </div>
          <button onClick={onClose} className="btn-close-modal">
            <X size={18} />
          </button>
        </div>

        <div className="code-modal-tabs">
          <button
            onClick={() => setActiveTab('python')}
            className={`tab-btn ${activeTab === 'python' ? 'active' : ''}`}
          >
            Python (NumPy + Matplotlib)
          </button>
          <button
            onClick={() => setActiveTab('r')}
            className={`tab-btn ${activeTab === 'r' ? 'active' : ''}`}
          >
            R (ggplot2)
          </button>
          <button
            onClick={() => setActiveTab('latex')}
            className={`tab-btn ${activeTab === 'latex' ? 'active' : ''}`}
          >
            LaTeX (PGFPlots / TikZ)
          </button>
        </div>

        <div className="code-display-wrapper">
          <div className="code-actions-bar">
            <span className="code-lang-label">
              {activeTab === 'python' ? 'python3 · standalone' : activeTab === 'r' ? 'R · tidyverse' : 'latex · standalone'}
            </span>
            <button onClick={handleCopy} className="btn-copy-code">
              {copied ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
              <span>{copied ? 'Tersalin ke Clipboard!' : 'Salin Kode'}</span>
            </button>
          </div>
          <pre className="code-pre">
            <code>{currentCode}</code>
          </pre>
        </div>

        <div className="modal-footer-note">
          <span>💡 Kode di atas bersifat mandiri (*self-contained*), mereplikasi nilai parameter persis saat ini, dan dapat langsung dieksekusi di Jupyter, RStudio, atau Overleaf.</span>
        </div>
      </div>
    </div>
  );
};
