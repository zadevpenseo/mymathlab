import React from 'react';
import { X, Printer } from 'lucide-react';
import { ExperimentModule } from '../domain/types';

interface WorksheetPrintModalProps {
  isOpen: boolean;
  onClose: () => void;
  module: ExperimentModule;
  currentParams: Record<string, number>;
}

export const WorksheetPrintModal: React.FC<WorksheetPrintModalProps> = ({
  isOpen,
  onClose,
  module,
  currentParams
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container print-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header no-print">
          <div className="modal-title-group">
            <Printer size={18} className="modal-icon" />
            <span className="modal-title">Pratinjau Lembar Kerja Peserta Didik (LKPD A4 Siap Cetak)</span>
          </div>
          <div className="modal-header-actions">
            <button onClick={handlePrint} className="btn-primary-print">
              <Printer size={15} />
              <span>Cetak / Simpan PDF (A4)</span>
            </button>
            <button onClick={onClose} className="btn-close-modal">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Lembar Cetak Monokrom Siap Fotokopi (A4 Layout) */}
        <div className="printable-worksheet-content" id="printable-worksheet">
          {/* ================= HALAMAN 1 ================= */}
          <div className="worksheet-page page-1">
            <div className="ws-header-table">
              <div className="ws-school-col">
                <span className="ws-school-title">LEMBAR KERJA PESERTA DIDIK (LKPD) INKUIRI</span>
                <span className="ws-subject-title">Mata Pelajaran: Matematika · Fase E (SMA/SMK)</span>
              </div>
              <div className="ws-identity-box">
                <div className="ws-field-row"><span>Nama:</span> <div className="ws-line"></div></div>
                <div className="ws-field-row"><span>Kelas / No:</span> <div className="ws-line"></div></div>
                <div className="ws-field-row"><span>Tanggal:</span> <div className="ws-line"></div></div>
              </div>
            </div>

            <div className="ws-section-box">
              <span className="ws-section-heading">Topik Pembelajaran: {module.title}</span>
              <p className="ws-objective-text">
                <strong>Tujuan Pembelajaran:</strong> Melalui inkuiri visual terbimbing, peserta didik mampu mengidentifikasi karakteristik grafik fungsi kuadrat f(x) = ax² + bx + c, menentukan sumbu simetri dan titik puncak, serta mengaitkannya dengan fenomena gerak proyektil secara mandiri.
              </p>
            </div>

            {/* Bagian 1: Prediksi */}
            <div className="ws-section-box">
              <span className="ws-step-tag">Tahap 1: Prediksi Awal (Hipotesis)</span>
              <p className="ws-question-text">
                1. Jika nilai koefisien <em>a</em> bernilai positif (misal a = 1), menurut dugaanmu apakah kurva parabola akan terbuka ke atas (menampung air) atau terbuka ke bawah? Berikan alasan singkatmu!
              </p>
              <div className="ws-answer-lines">
                <div className="ws-write-line"></div>
                <div className="ws-write-line"></div>
              </div>
            </div>

            {/* Bagian 2: Manipulasi & Gambar Kisi Manual */}
            <div className="ws-section-box">
              <span className="ws-step-tag">Tahap 2: Eksplorasi & Gambar Grafik Manual</span>
              <p className="ws-question-text">
                Gunakan fungsi acuan: <strong>f(x) = {currentParams.a}x² + ({currentParams.b})x + ({currentParams.c})</strong>. Lengkapi tabel nilai di bawah ini, kemudian plot titik-titik koordinatnya pada bidang kartesian yang disediakan!
              </p>

              <div className="ws-grid-and-table-row">
                {/* Tabel Nilai Manual */}
                <table className="ws-manual-table">
                  <thead>
                    <tr>
                      <th>x</th>
                      <th>Perhitungan f(x)</th>
                      <th>(x, y)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[-2, -1, 0, 1, 2, 3, 4].map((xVal) => (
                      <tr key={`ws-t-${xVal}`}>
                        <td>{xVal}</td>
                        <td></td>
                        <td></td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Kisi Kartesian Kosong Untuk Digambar Siswa */}
                <div className="ws-cartesian-canvas-box">
                  <div className="ws-empty-grid-placeholder">
                    {/* Sumbu X dan Y */}
                    <div className="ws-grid-cross-y"></div>
                    <div className="ws-grid-cross-x"></div>
                    <span className="ws-grid-label-y">+y</span>
                    <span className="ws-grid-label-x">+x</span>
                    <span className="ws-grid-origin">0</span>
                  </div>
                  <span className="ws-caption-text">Bidang Gambar Kartesian (Gunakan Pensil & Penggaris)</span>
                </div>
              </div>
            </div>

            <div className="ws-page-footer">
              <span>Math Lab · Platform Eksplorasi Inkuiri Matematika · Halaman 1 dari 2</span>
            </div>
          </div>

          {/* ================= HALAMAN 2 ================= */}
          <div className="worksheet-page page-2">
            {/* Bagian 3: Observasi & Temuan Karakteristik */}
            <div className="ws-section-box">
              <span className="ws-step-tag">Tahap 3: Observasi Nilai Karakteristik</span>
              <p className="ws-question-text">
                Berdasarkan grafik yang telah kamu gambar pada Halaman 1:
              </p>
              <div className="ws-subquestions-list">
                <p>a. Di manakah letak koordinat titik terendah / tertinggi (titik puncak) dari kurva tersebut?</p>
                <div className="ws-answer-lines"><div className="ws-write-line"></div></div>

                <p>b. Pada titik koordinat berapakah kurva memotong garis sumbu-y (saat x = 0)? Apakah nilai tersebut sama dengan nilai konstanta <em>c</em>?</p>
                <div className="ws-answer-lines"><div className="ws-write-line"></div></div>

                <p>c. Tuliskan persamaan garis tegak yang membelah kurva menjadi dua bagian simetris (sumbu simetri)!</p>
                <div className="ws-answer-lines"><div className="ws-write-line"></div></div>
              </div>
            </div>

            {/* Bagian 4: Eksplanasi & Konfrontasi Miskonsepsi */}
            <div className="ws-section-box">
              <span className="ws-step-tag">Tahap 4: Eksplanasi & Refleksi Konseptual</span>
              <p className="ws-question-text">
                Andi berpendapat bahwa <em>"Nilai konstanta c selalu menentukan koordinat titik puncak parabola"</em>. Apakah kamu setuju dengan pernyataan Andi? Jelaskan mengapa Andi keliru berdasarkan pengamatan grafikmu!
              </p>
              <div className="ws-answer-lines">
                <div className="ws-write-line"></div>
                <div className="ws-write-line"></div>
                <div className="ws-write-line"></div>
              </div>
            </div>

            {/* Bagian 5: Aplikasi Nyata */}
            <div className="ws-section-box">
              <span className="ws-step-tag">Tahap 5: Tantangan Penerapan Kontekstual</span>
              <p className="ws-question-text">
                Sebuah roket air diluncurkan dari ketinggian 2 meter di atas tanah. Lintasan ketinggian roket dinyatakan dengan rumus: <strong>h(t) = -5t² + 20t + 2</strong> (dengan t dalam detik, h dalam meter).
              </p>
              <div className="ws-subquestions-list">
                <p>1. Tentukan waktu (detik) yang dibutuhkan roket untuk mencapai ketinggian tertinggi!</p>
                <div className="ws-answer-lines"><div className="ws-write-line"></div></div>

                <p>2. Berapakah ketinggian maksimum yang dicapai roket tersebut?</p>
                <div className="ws-answer-lines"><div className="ws-write-line"></div></div>
              </div>
            </div>

            {/* Nilai & Paraf */}
            <div className="ws-signature-row">
              <div className="ws-sig-box">
                <span>Catatan Guru:</span>
                <div className="ws-teacher-notes-space"></div>
              </div>
              <div className="ws-score-box">
                <span>Nilai / Capaian:</span>
                <div className="ws-score-circle"></div>
                <span>Paraf Guru</span>
              </div>
            </div>

            <div className="ws-page-footer">
              <span>Math Lab · Platform Eksplorasi Inkuiri Matematika · Halaman 2 dari 2</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
