import React, { useState } from 'react';
import { CheckCircle2, ChevronRight, HelpCircle, Lightbulb, Rocket } from 'lucide-react';
import { ExperimentModule } from '../domain/types';

interface LearningCycleStepperProps {
  module: ExperimentModule;
  activeStep: 'predict' | 'manipulate' | 'observe' | 'explain' | 'apply';
  onStepChange: (step: 'predict' | 'manipulate' | 'observe' | 'explain' | 'apply') => void;
  onUnlockControls: () => void;
}

export const LearningCycleStepper: React.FC<LearningCycleStepperProps> = ({
  module,
  activeStep,
  onStepChange,
  onUnlockControls
}) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasSubmittedPredict, setHasSubmittedPredict] = useState(false);

  const steps: { id: 'predict' | 'manipulate' | 'observe' | 'explain' | 'apply'; label: string; icon: React.ReactNode }[] = [
    { id: 'predict', label: '1. Prediksi', icon: <HelpCircle size={14} /> },
    { id: 'manipulate', label: '2. Manipulasi', icon: <ChevronRight size={14} /> },
    { id: 'observe', label: '3. Observasi', icon: <CheckCircle2 size={14} /> },
    { id: 'explain', label: '4. Eksplanasi', icon: <Lightbulb size={14} /> },
    { id: 'apply', label: '5. Aplikasi', icon: <Rocket size={14} /> }
  ];

  const handlePredictSubmit = () => {
    if (!selectedOptionId) return;
    setHasSubmittedPredict(true);
    onUnlockControls();
    onStepChange('manipulate');
  };

  return (
    <div className="learning-cycle-card">
      <div className="cycle-steps-nav">
        {steps.map((st) => {
          const isActive = activeStep === st.id;
          const isDone = steps.findIndex((s) => s.id === activeStep) > steps.findIndex((s) => s.id === st.id);
          return (
            <button
              key={st.id}
              onClick={() => onStepChange(st.id)}
              className={`step-tab-btn ${isActive ? 'active' : ''} ${isDone ? 'done' : ''}`}
            >
              <span className="step-icon">{st.icon}</span>
              <span className="step-label">{st.label}</span>
            </button>
          );
        })}
      </div>

      <div className="cycle-content-body">
        {/* Step 1: Predict */}
        {activeStep === 'predict' && (
          <div className="step-pane step-predict">
            <div className="inquiry-prompt-box">
              <span className="prompt-badge">Tantangan Prediksi Awal</span>
              <h4 className="prompt-question">{module.guidedInquirySteps.predict.question}</h4>
            </div>

            <div className="options-list">
              {module.guidedInquirySteps.predict.options.map((opt) => (
                <label
                  key={opt.id}
                  className={`option-card ${selectedOptionId === opt.id ? 'selected' : ''}`}
                >
                  <input
                    type="radio"
                    name="predict-option"
                    value={opt.id}
                    checked={selectedOptionId === opt.id}
                    onChange={() => setSelectedOptionId(opt.id)}
                    className="radio-input"
                  />
                  <span className="option-text">{opt.text}</span>
                </label>
              ))}
            </div>

            <div className="pane-footer-actions">
              <button
                onClick={handlePredictSubmit}
                disabled={!selectedOptionId}
                className="btn-submit-predict"
              >
                Kunci Prediksi & Buka Slider Kontrol
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Manipulate */}
        {activeStep === 'manipulate' && (
          <div className="step-pane step-manipulate">
            <div className="inquiry-prompt-box">
              <span className="prompt-badge">Instruksi Eksplorasi</span>
              <p className="prompt-instruction">{module.guidedInquirySteps.observe.prompt}</p>
            </div>
            <div className="manipulate-tips">
              <span>👉 Silakan geser slider variabel di panel bawah atau tarik titik puncak merah langsung di kanvas.</span>
            </div>
            <div className="pane-footer-actions">
              <button onClick={() => onStepChange('observe')} className="btn-next-step">
                Lanjut ke Observasi & Catatan
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Observe */}
        {activeStep === 'observe' && (
          <div className="step-pane step-observe">
            <div className="inquiry-prompt-box">
              <span className="prompt-badge">Pertanyaan Panduan Observasi</span>
              <ul className="guiding-questions-list">
                {module.guidedInquirySteps.observe.guidingQuestions.map((q, idx) => (
                  <li key={`gq-${idx}`}>{q}</li>
                ))}
              </ul>
            </div>
            <div className="pane-footer-actions">
              <button onClick={() => onStepChange('explain')} className="btn-next-step">
                Lanjut ke Eksplanasi Konseptual
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Explain */}
        {activeStep === 'explain' && (
          <div className="step-pane step-explain">
            <div className="inquiry-prompt-box">
              <span className="prompt-badge">Refleksi Kognitif</span>
              <p className="prompt-instruction">{module.guidedInquirySteps.explain.reflectionPrompt}</p>
            </div>
            <div className="invariants-callout-box">
              <span className="callout-title">Sintesis Didaktik</span>
              <p className="callout-text">{module.guidedInquirySteps.explain.invariantsSummary}</p>
            </div>
            <div className="pane-footer-actions">
              <button onClick={() => onStepChange('apply')} className="btn-next-step">
                Uji Kasus Penerapan Nyata
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Apply */}
        {activeStep === 'apply' && (
          <div className="step-pane step-apply">
            <div className="inquiry-prompt-box">
              <span className="prompt-badge">{module.guidedInquirySteps.apply.realWorldCase}</span>
              <p className="prompt-instruction">{module.guidedInquirySteps.apply.challengePrompt}</p>
            </div>
            <div className="pane-footer-actions">
              <button onClick={() => onStepChange('predict')} className="btn-restart-cycle">
                Ulangi Siklus Inkuiri dengan Pertanyaan Baru
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
