/**
 * Math Lab Domain Types
 * Canonical TypeScript contracts for mathematical entities, representations, and telemetry.
 */

export interface Point {
  x: number;
  y: number;
  label?: string;
  isExtremum?: boolean;
  isRoot?: boolean;
  isIntercept?: boolean;
}

export interface ViewportDomain {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
}

export interface ParameterDef {
  paramId: string;
  symbol: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  unit?: string;
  description: string;
}

export interface CharacteristicPoints {
  vertex?: Point;
  yIntercept?: Point;
  roots: Point[];
  axisOfSymmetry?: number;
  discriminant?: number;
  extremaType?: 'minimum' | 'maximum' | 'saddle' | 'none';
}

export interface EvaluationResult {
  points: Point[];
  characteristics: CharacteristicPoints;
  isContinuous: boolean;
  domain: ViewportDomain;
}

export interface MisconceptionRule {
  id: string;
  title: string;
  triggerCondition: (params: Record<string, number>, history?: Record<string, number>[]) => boolean;
  socraticPrompt: string;
  conceptKey: string;
  suggestedAction?: 'highlight_vertex' | 'highlight_y_intercept' | 'split_area' | 'show_counterexample';
}

export interface MisconceptionAlert {
  ruleId: string;
  title: string;
  prompt: string;
  detectedAt: number;
  suggestedAction?: string;
}

export interface TelemetryRecord {
  sessionId: string;
  timestamp: string;
  sequenceNumber: number;
  elapsedMs: number;
  actionType: 'slider_move' | 'predict_submit' | 'tab_switch' | 'mode_toggle' | 'reset' | 'export';
  activeState: Record<string, number>;
  activeStep: 'predict' | 'manipulate' | 'observe' | 'explain' | 'apply';
  clientHash?: string;
}

export interface PolyglotCodeExport {
  pythonNumPyMatplotlib: string;
  rGgplot2: string;
  latexPgfplotsTikz: string;
}

export interface ExperimentModule {
  id: string;
  title: string;
  subtitle: string;
  domain: 'aljabar' | 'kalkulus' | 'geometri' | 'statistika' | 'terapan';
  fase: 'D' | 'E' | 'F' | 'KAMPUS' | 'INDUSTRI';
  bskapCode: string;
  canonicalFormula: string;
  parameters: ParameterDef[];
  initialState: Record<string, number>;
  defaultViewport: ViewportDomain;
  phenomenonDescription: (params: Record<string, number>) => string;
  misconceptions: MisconceptionRule[];
  guidedInquirySteps: {
    predict: {
      question: string;
      options: { id: string; text: string; isTargetReasoning: boolean }[];
    };
    observe: {
      prompt: string;
      guidingQuestions: string[];
    };
    explain: {
      reflectionPrompt: string;
      invariantsSummary: string;
    };
    apply: {
      realWorldCase: string;
      challengePrompt: string;
    };
  };
}

export interface ExperimentPluginDef {
  $schema: string;
  id: string;
  title: string;
  category: string;
  version: string;
  formulaTemplate: string;
  parameters: ParameterDef[];
  phenomenonMapping: Record<string, string>;
  misconceptions?: MisconceptionRule[];
}

export interface McpToolCallPayload {
  toolName: 'get_canvas_state' | 'set_canvas_parameter' | 'audit_math_invariance';
  arguments: Record<string, unknown>;
  correlationId: string;
}
