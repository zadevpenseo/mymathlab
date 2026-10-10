import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { TheTrinityCanvas } from './components/TheTrinityCanvas';
import { ControlPanel } from './components/ControlPanel';
import { LearningCycleStepper } from './components/LearningCycleStepper';
import { MisconceptionCard } from './components/MisconceptionCard';
import { CodeExportModal } from './components/CodeExportModal';
import { WorksheetPrintModal } from './components/WorksheetPrintModal';
import { IndustryPresetModal } from './components/IndustryPresetModal';

import { FLAGSHIP_QUADRATIC_EXPERIMENT } from './domain/registry';
import { evaluateQuadratic } from './domain/math-engine';
import { MisconceptionEngine } from './domain/misconception-engine';
import { globalTelemetry } from './domain/telemetry-collector';
import { serializeStateToHash, deserializeHashToState, copyShareableLink } from './domain/url-state';
import { generatePolyglotScripts } from './domain/code-generators/polyglot-generator';
import { IndustryPreset } from './domain/presets/industry-toolkits';
import { MisconceptionAlert } from './domain/types';

export const App: React.FC = () => {
  const module = FLAGSHIP_QUADRATIC_EXPERIMENT;

  // App Parameters State
  const [params, setParams] = useState<Record<string, number>>(() => {
    const initial = deserializeHashToState(window.location.hash, module.initialState);
    return initial.params;
  });

  // Display and Theme Modes
  const [isProjectorMode, setIsProjectorMode] = useState<boolean>(() => {
    const initial = deserializeHashToState(window.location.hash, module.initialState);
    return initial.isProjectorMode ?? false;
  });

  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isFreeExplore, setIsFreeExplore] = useState<boolean>(() => {
    const initial = deserializeHashToState(window.location.hash, module.initialState);
    return initial.isFreeExplore ?? false;
  });

  // 5-Step Learning Cycle State
  const [activeStep, setActiveStep] = useState<'predict' | 'manipulate' | 'observe' | 'explain' | 'apply'>('predict');
  const [isControlsLocked, setIsControlsLocked] = useState<boolean>(!isFreeExplore);

  // Modals Visibility
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [isWorksheetModalOpen, setIsWorksheetModalOpen] = useState(false);
  const [isPresetModalOpen, setIsPresetModalOpen] = useState(false);
  const [hasCopiedLink, setHasCopiedLink] = useState(false);

  // Misconception Diagnostic Engine
  const misconceptionEngine = useMemo(() => new MisconceptionEngine(module.misconceptions), [module]);
  const [activeAlert, setActiveAlert] = useState<MisconceptionAlert | null>(null);
  const [highlightAction, setHighlightAction] = useState<string | undefined>(undefined);

  // Body theme class management
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (isProjectorMode) {
      document.body.classList.add('projector-mode');
    } else {
      document.body.classList.remove('projector-mode');
    }
  }, [isProjectorMode]);

  // Sync state to URL hash on change
  useEffect(() => {
    const hash = serializeStateToHash({
      params,
      step: activeStep,
      isProjectorMode,
      isFreeExplore
    });
    window.history.replaceState(null, '', hash);
  }, [params, activeStep, isProjectorMode, isFreeExplore]);

  // Evaluate mathematical curve
  const a = params.a ?? 1;
  const b = params.b ?? 0;
  const c = params.c ?? 0;

  const evalResult = useMemo(() => {
    return evaluateQuadratic(a, b, c, module.defaultViewport);
  }, [a, b, c, module.defaultViewport]);

  const phenomenonText = useMemo(() => {
    return module.phenomenonDescription(params);
  }, [params, module]);

  // Handle parameter changes from sliders or canvas dragging
  const handleUpdateParams = useCallback((updates: Partial<Record<string, number>>) => {
    setParams((prev) => {
      const next: Record<string, number> = { ...prev };
      for (const [key, val] of Object.entries(updates)) {
        if (typeof val === 'number') {
          next[key] = val;
        }
      }
      globalTelemetry.record('slider_move', next, activeStep);
      const alert = misconceptionEngine.recordState(next);
      if (alert) {
        setActiveAlert(alert);
      }
      return next;
    });
  }, [activeStep, misconceptionEngine]);


  const handleResetParams = () => {
    setParams({ ...module.initialState });
    globalTelemetry.record('reset', module.initialState, activeStep);
    misconceptionEngine.reset();
    setActiveAlert(null);
    setHighlightAction(undefined);
  };

  // Toggle Free Exploration Mode
  const handleToggleFreeExplore = () => {
    setIsFreeExplore((prev) => {
      const next = !prev;
      setIsControlsLocked(!next);
      globalTelemetry.record('mode_toggle', params, activeStep);
      return next;
    });
  };

  const handleShareLink = async () => {
    await copyShareableLink({
      params,
      step: activeStep,
      isProjectorMode,
      isFreeExplore
    });
    setHasCopiedLink(true);
    setTimeout(() => setHasCopiedLink(false), 2500);
  };

  const handleSelectIndustryPreset = (preset: IndustryPreset) => {
    setParams({ ...preset.params });
    globalTelemetry.record('slider_move', preset.params, 'apply');
    setActiveAlert(null);
  };

  const polyglotCode = useMemo(() => {
    return generatePolyglotScripts(a, b, c, module.defaultViewport.xMin, module.defaultViewport.xMax);
  }, [a, b, c, module.defaultViewport]);

  return (
    <div className="mathlab-app-root">
      {/* Top Navbar */}
      <Navbar
        isProjectorMode={isProjectorMode}
        onToggleProjectorMode={() => setIsProjectorMode((prev) => !prev)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode((prev) => !prev)}
        isFreeExplore={isFreeExplore}
        onToggleFreeExplore={handleToggleFreeExplore}
        onOpenCodeExport={() => setIsCodeModalOpen(true)}
        onOpenWorksheet={() => setIsWorksheetModalOpen(true)}
        onOpenIndustryPresets={() => setIsPresetModalOpen(true)}
        onShareLink={handleShareLink}
        hasCopiedLink={hasCopiedLink}
      />

      <main className="app-main-content">
        {/* Misconception Diagnostic Alert Banner */}
        {activeAlert && (
          <MisconceptionCard
            alert={activeAlert}
            onDismiss={() => {
              misconceptionEngine.dismissAlert(activeAlert.ruleId);
              setActiveAlert(null);
              setHighlightAction(undefined);
            }}
            onApplyAction={(action) => setHighlightAction(action)}
          />
        )}

        {/* The Trinity Canvas (4 Duval Semiotic Registers) */}
        <TheTrinityCanvas
          a={a}
          b={b}
          c={c}
          domain={module.defaultViewport}
          points={evalResult.points}
          characteristics={evalResult.characteristics}
          phenomenonText={phenomenonText}
          isProjectorMode={isProjectorMode}
          onUpdateParams={handleUpdateParams}
          highlightAction={highlightAction}
        />

        {/* Control Sliders Panel */}
        <ControlPanel
          parameters={module.parameters}
          values={params}
          onChange={(id, val) => handleUpdateParams({ [id]: val })}
          onReset={handleResetParams}
          isLockedByPredict={!isFreeExplore && isControlsLocked && activeStep === 'predict'}
        />

        {/* 5-Step Guided Inquiry Stepper (hidden if in full free exploration) */}
        {!isFreeExplore && (
          <LearningCycleStepper
            module={module}
            activeStep={activeStep}
            onStepChange={(st) => {
              setActiveStep(st);
              globalTelemetry.record('tab_switch', params, st);
            }}
            onUnlockControls={() => setIsControlsLocked(false)}
          />
        )}
      </main>

      {/* Code Export Modal (Python / R / LaTeX PGFPlots) */}
      <CodeExportModal
        isOpen={isCodeModalOpen}
        onClose={() => setIsCodeModalOpen(false)}
        codeExport={polyglotCode}
      />

      {/* Printable Worksheet Modal (A4 Photocopy-Safe) */}
      <WorksheetPrintModal
        isOpen={isWorksheetModalOpen}
        onClose={() => setIsWorksheetModalOpen(false)}
        module={module}
        currentParams={params}
      />

      {/* Industry Presets Modal */}
      <IndustryPresetModal
        isOpen={isPresetModalOpen}
        onClose={() => setIsPresetModalOpen(false)}
        onSelectPreset={handleSelectIndustryPreset}
      />
    </div>
  );
};

export default App;
