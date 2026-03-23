import type { DisplayMode } from '../constants/numberMappings';
import { toDisplay } from '../constants/numberMappings';

interface NumberPadProps {
  mode: DisplayMode;
  selectedNumber: number | null;
  remaining: Record<number, number>;
  notesMode: boolean;
  showNotesToggle?: boolean;
  onSelect: (n: number | null) => void;
  onToggleNotes: () => void;
}

export default function NumberPad({
  mode, selectedNumber, remaining, notesMode,
  showNotesToggle = true, onSelect, onToggleNotes,
}: NumberPadProps) {
  const needsSyriacFont = mode === 'syriac' || mode === 'words';
  const isWords = mode === 'words';

  const fontStyle: React.CSSProperties = needsSyriacFont
    ? { fontFamily: "'Noto Sans Syriac Eastern', serif" }
    : {};

  return (
    <div className={`number-pad${isWords ? ' number-pad--words' : ''}`}>
      {([1, 2, 3, 4, 5, 6, 7, 8, 9] as const).map((n) => {
        const rem = remaining[n] ?? 0;
        const isDimmed = rem <= 0;
        return (
          <button
            key={n}
            className={[
              'pad-btn',
              isWords ? 'pad-btn--words' : '',
              selectedNumber === n ? 'pad-btn--active' : '',
              isDimmed ? 'pad-btn--dimmed' : '',
            ].filter(Boolean).join(' ')}
            style={fontStyle}
            onClick={() => onSelect(selectedNumber === n ? null : n)}
          >
            {isWords ? (
              /* stacked: word on top, badge below */
              <span className="pad-btn-words-inner">
                <span className="pad-btn-word">{toDisplay(n, mode)}</span>
                {rem > 0 && <span className="badge badge--below">{rem}</span>}
              </span>
            ) : (
              <span className="pad-btn-content">
                {toDisplay(n, mode)}
                {rem > 0 && <span className="badge">{rem}</span>}
              </span>
            )}
          </button>
        );
      })}

      <button
        className={`pad-btn pad-btn--erase${selectedNumber === 0 ? ' pad-btn--active' : ''}`}
        onClick={() => onSelect(selectedNumber === 0 ? null : 0)}
        title="Erase"
      >
        ✕
      </button>

      {showNotesToggle && (
        <button
          className={`pad-btn${notesMode ? ' pad-btn--notes-active' : ''}`}
          onClick={onToggleNotes}
          title="Notes mode"
        >
          ✏️
        </button>
      )}
    </div>
  );
}
