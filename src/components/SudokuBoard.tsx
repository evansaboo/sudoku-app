import type { DisplayMode } from '../constants/numberMappings';
import SudokuCell from './SudokuCell';

interface SudokuBoardProps {
  puzzle: number[];
  givens: boolean[];
  userGrid: number[];
  solution: number[] | null;
  selectedCell: number | null;
  selectedNumber: number | null;
  mode: DisplayMode;
  notesGrid: Set<number>[];
  checkedErrors: Set<number>;
  onCellClick: (idx: number) => void;
  allEditable?: boolean;
}

export default function SudokuBoard({
  puzzle, givens, userGrid, solution: _solution, selectedCell, selectedNumber, mode,
  notesGrid, checkedErrors, onCellClick, allEditable = false,
}: SudokuBoardProps) {
  const selectedRow = selectedCell !== null ? Math.floor(selectedCell / 9) : -1;
  const selectedCol = selectedCell !== null ? selectedCell % 9 : -1;
  const selectedBox = selectedCell !== null
    ? Math.floor(selectedRow / 3) * 3 + Math.floor(selectedCol / 3)
    : -1;

  // Real-time conflict detection
  const conflictSet = new Set<number>();
  for (let idx = 0; idx < 81; idx++) {
    const val = allEditable ? userGrid[idx] : (givens[idx] ? puzzle[idx] : userGrid[idx]);
    if (!val) continue;
    const row = Math.floor(idx / 9);
    const col = idx % 9;
    const box = Math.floor(row / 3) * 3 + Math.floor(col / 3);
    for (let j = idx + 1; j < 81; j++) {
      const jVal = allEditable ? userGrid[j] : (givens[j] ? puzzle[j] : userGrid[j]);
      if (!jVal || jVal !== val) continue;
      const jRow = Math.floor(j / 9);
      const jCol = j % 9;
      const jBox = Math.floor(jRow / 3) * 3 + Math.floor(jCol / 3);
      if (jRow === row || jCol === col || jBox === box) {
        conflictSet.add(idx);
        conflictSet.add(j);
      }
    }
  }

  return (
    <div className={`board${mode === 'words' ? ' board--words' : ''}`}>
      {puzzle.map((_, idx) => {
        const row = Math.floor(idx / 9);
        const col = idx % 9;
        const box = Math.floor(row / 3) * 3 + Math.floor(col / 3);

        const isGiven = !allEditable && givens[idx];
        const value = isGiven ? puzzle[idx] : (userGrid[idx] ?? 0);
        const isSelected = selectedCell === idx;
        const isHighlighted = !isSelected && selectedCell !== null &&
          (row === selectedRow || col === selectedCol || box === selectedBox);
        const isSameNumber = !isSelected && selectedNumber !== null && selectedNumber !== 0 && value === selectedNumber;
        const isError = conflictSet.has(idx) || checkedErrors.has(idx);

        return (
          <SudokuCell
            key={idx}
            value={value}
            isGiven={isGiven}
            isSelected={isSelected}
            isHighlighted={isHighlighted}
            isSameNumber={isSameNumber}
            isError={isError}
            mode={mode}
            notes={notesGrid[idx]}
            onClick={() => {
              if (!isGiven || allEditable) onCellClick(idx);
            }}
          />
        );
      })}
    </div>
  );
}
