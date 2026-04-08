import type { DisplayMode } from '../constants/numberMappings';
import { toDisplay, isWordsMode } from '../constants/numberMappings';

interface SudokuCellProps {
  value: number;
  isGiven: boolean;
  isSelected: boolean;
  isHighlighted: boolean;
  isSameNumber: boolean;
  isError: boolean;
  mode: DisplayMode;
  notes: Set<number>;
  onClick: () => void;
}

export default function SudokuCell({
  value, isGiven, isSelected, isHighlighted, isSameNumber, isError, mode, notes, onClick,
}: SudokuCellProps) {
  const classes = [
    'cell',
    isGiven        ? 'cell--given'       : '',
    isSelected     ? 'cell--selected'    : '',
    isHighlighted  ? 'cell--highlighted' : '',
    isSameNumber   ? 'cell--same-number' : '',
    isError        ? 'cell--error'       : '',
  ].filter(Boolean).join(' ');

  const needsSyriacFont = mode === 'syriac' || mode === 'words' || mode === 'saints-syr';
  const style: React.CSSProperties = needsSyriacFont
    ? { fontFamily: "'Noto Sans Syriac Eastern', serif" }
    : {};

  const showNotes = !value && notes.size > 0;

  return (
    <button className={classes} onClick={onClick} style={style}>
      {showNotes ? (
        <span className="notes-grid">
          {([1,2,3,4,5,6,7,8,9] as const).map((n) => (
            <span key={n} className={`note-num${notes.has(n) ? ' note-num--visible' : ''}`}>
              {notes.has(n) ? toDisplay(n, mode) : ''}
            </span>
          ))}
        </span>
      ) : (
        toDisplay(value, mode)
      )}
    </button>
  );
}
