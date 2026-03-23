import type { DisplayMode } from '../constants/numberMappings';
import { MODES } from '../constants/numberMappings';

interface ModeSelectorProps {
  mode: DisplayMode;
  onChange: (mode: DisplayMode) => void;
}

export default function ModeSelector({ mode, onChange }: ModeSelectorProps) {
  return (
    <div className="mode-selector">
      {MODES.map((m) => (
        <button
          key={m.id}
          className={`mode-btn${mode === m.id ? ' mode-btn--active' : ''}`}
          onClick={() => onChange(m.id)}
          style={
            m.id === 'words'
              ? { fontFamily: "'Noto Sans Syriac Eastern', serif" }
              : {}
          }
        >
          {m.label}
        </button>
      ))}
    </div>
  );
}
