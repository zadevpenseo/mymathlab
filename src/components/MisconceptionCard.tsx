import React from 'react';
import { AlertCircle, X, Sparkles } from 'lucide-react';
import { MisconceptionAlert } from '../domain/types';

interface MisconceptionCardProps {
  alert: MisconceptionAlert;
  onDismiss: (ruleId: string) => void;
  onApplyAction?: (actionKey: string) => void;
}

export const MisconceptionCard: React.FC<MisconceptionCardProps> = ({
  alert,
  onDismiss,
  onApplyAction
}) => {
  return (
    <div className="misconception-card-banner">
      <div className="misconception-icon-col">
        <AlertCircle size={22} className="alert-icon-warning" />
      </div>

      <div className="misconception-body">
        <div className="misconception-title-row">
          <span className="misconception-tag">Pertanyaan Pemantik Sokrates</span>
          <h4 className="misconception-title">{alert.title}</h4>
        </div>
        <p className="misconception-prompt">{alert.prompt}</p>

        {alert.suggestedAction && onApplyAction && (
          <div className="misconception-action-row">
            <button
              onClick={() => onApplyAction(alert.suggestedAction!)}
              className="btn-inspect-highlight"
            >
              <Sparkles size={13} />
              <span>Sorot Titik Relevan di Kanvas</span>
            </button>
          </div>
        )}
      </div>

      <button
        onClick={() => onDismiss(alert.ruleId)}
        className="btn-dismiss-alert"
        title="Tutup catatan ini"
      >
        <X size={16} />
      </button>
    </div>
  );
};
