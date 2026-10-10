import React from 'react';
import { 
  Projector, 
  Moon, 
  Sun, 
  Share2, 
  Code2, 
  Printer, 
  Briefcase, 
  Compass, 
  GraduationCap 
} from 'lucide-react';

interface NavbarProps {
  isProjectorMode: boolean;
  onToggleProjectorMode: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  isFreeExplore: boolean;
  onToggleFreeExplore: () => void;
  onOpenCodeExport: () => void;
  onOpenWorksheet: () => void;
  onOpenIndustryPresets: () => void;
  onShareLink: () => void;
  hasCopiedLink: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  isProjectorMode,
  onToggleProjectorMode,
  isDarkMode,
  onToggleDarkMode,
  isFreeExplore,
  onToggleFreeExplore,
  onOpenCodeExport,
  onOpenWorksheet,
  onOpenIndustryPresets,
  onShareLink,
  hasCopiedLink
}) => {
  return (
    <header className="navbar-container">
      <div className="navbar-brand">
        <div className="brand-logo-mark">
          <span className="logo-symbol">∫</span>
        </div>
        <div className="brand-titles">
          <div className="brand-name-row">
            <span className="brand-title">MATH LAB</span>
            <span className="badge-tag">Fase E · Aljabar</span>
          </div>
          <span className="brand-subtitle">Laboratorium Eksplorasi Inkuiri Visual 60 FPS</span>
        </div>
      </div>

      <div className="navbar-actions">
        {/* Toggle Mode: Inkuiri vs Eksplorasi Bebas */}
        <button
          onClick={onToggleFreeExplore}
          className={`btn-toggle-mode ${isFreeExplore ? 'active' : ''}`}
          title="Beralih antara Alur Inkuiri Terbimbing dan Eksplorasi Bebas"
        >
          {isFreeExplore ? (
            <>
              <Compass size={15} />
              <span>Eksplorasi Bebas</span>
            </>
          ) : (
            <>
              <GraduationCap size={15} />
              <span>Inkuiri Terbimbing</span>
            </>
          )}
        </button>

        {/* Toolkit Industri */}
        <button
          onClick={onOpenIndustryPresets}
          className="btn-nav-action"
          title="Buka Preset Terapan Industri & Model Bisnis"
        >
          <Briefcase size={15} />
          <span className="btn-label-desktop">Toolkit Industri</span>
        </button>

        {/* Ekspor Kode Saintifik */}
        <button
          onClick={onOpenCodeExport}
          className="btn-nav-action"
          title="Ekspor Skrip Python, R, dan LaTeX PGFPlots"
        >
          <Code2 size={15} />
          <span className="btn-label-desktop">Ekspor Kode</span>
        </button>

        {/* Cetak LKPD A4 */}
        <button
          onClick={onOpenWorksheet}
          className="btn-nav-action"
          title="Cetak Lembar Kerja Peserta Didik (LKPD) A4 Ramah Fotokopi"
        >
          <Printer size={15} />
          <span className="btn-label-desktop">LKPD Cetak</span>
        </button>

        {/* Mode Proyektor Kelas */}
        <button
          onClick={onToggleProjectorMode}
          className={`btn-nav-action ${isProjectorMode ? 'active-projector' : ''}`}
          title="Mode Proyektor Kelas: Garis tebal 3.5px & kontras tinggi"
        >
          <Projector size={15} />
          <span className="btn-label-desktop">Proyektor</span>
        </button>

        {/* Mode Gelap */}
        <button
          onClick={onToggleDarkMode}
          className="btn-icon-square"
          title={isDarkMode ? 'Beralih ke Tema Terang' : 'Beralih ke Mode Gelap Intelektual'}
        >
          {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {/* Salin Tautan Hash */}
        <button
          onClick={onShareLink}
          className={`btn-share-hash ${hasCopiedLink ? 'copied' : ''}`}
          title="Salin tautan kasus aktif ke clipboard"
        >
          <Share2 size={14} />
          <span>{hasCopiedLink ? 'Tautan Tersalin!' : 'Bagikan Kasus'}</span>
        </button>
      </div>
    </header>
  );
};
