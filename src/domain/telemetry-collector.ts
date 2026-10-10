/**
 * Privacy-First Learning Telemetry Collector
 * Records anonymous interaction logs, think-times, and exports verifiable CSV/JSON (Zero PII).
 */

import { TelemetryRecord } from './types';

export class TelemetryCollector {
  private sessionId: string;
  private records: TelemetryRecord[] = [];
  private sequenceCounter: number = 0;
  private startTime: number;

  constructor() {
    this.sessionId = this.generateAnonymousSessionId();
    this.startTime = Date.now();
  }

  private generateAnonymousSessionId(): string {
    const array = new Uint8Array(8);
    if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
      crypto.getRandomValues(array);
    } else {
      for (let i = 0; i < 8; i++) array[i] = Math.floor(Math.random() * 256);
    }
    return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
  }

  public record(
    actionType: TelemetryRecord['actionType'],
    activeState: Record<string, number>,
    activeStep: TelemetryRecord['activeStep'] = 'manipulate'
  ): TelemetryRecord {
    this.sequenceCounter++;
    const record: TelemetryRecord = {
      sessionId: this.sessionId,
      timestamp: new Date().toISOString(),
      sequenceNumber: this.sequenceCounter,
      elapsedMs: Date.now() - this.startTime,
      actionType,
      activeState: { ...activeState },
      activeStep
    };

    this.records.push(record);

    // Keep ring buffer at max 100 items to guarantee zero client memory bloat
    if (this.records.length > 100) {
      this.records.shift();
    }

    return record;
  }

  public getRecords(): TelemetryRecord[] {
    return [...this.records];
  }

  public exportJson(): string {
    return JSON.stringify(
      {
        sessionId: this.sessionId,
        exportedAt: new Date().toISOString(),
        totalEvents: this.records.length,
        events: this.records
      },
      null,
      2
    );
  }

  public exportCsv(): string {
    if (this.records.length === 0) {
      return 'sessionId,timestamp,sequenceNumber,elapsedMs,actionType,activeStep,parameters\n';
    }

    const headers = ['sessionId', 'timestamp', 'sequenceNumber', 'elapsedMs', 'actionType', 'activeStep', 'params'];
    const rows = this.records.map((r) => {
      const paramStr = Object.entries(r.activeState)
        .map(([k, v]) => `${k}:${v}`)
        .join(';');
      return [
        r.sessionId,
        r.timestamp,
        r.sequenceNumber,
        r.elapsedMs,
        r.actionType,
        r.activeStep,
        `"${paramStr}"`
      ].join(',');
    });

    return [headers.join(','), ...rows].join('\n');
  }

  public clear(): void {
    this.records = [];
    this.sequenceCounter = 0;
    this.startTime = Date.now();
  }
}

export const globalTelemetry = new TelemetryCollector();
