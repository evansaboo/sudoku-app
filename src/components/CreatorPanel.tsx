import { useState, useCallback } from 'react';
import type { DisplayMode } from '../constants/numberMappings';
import type { Lang } from '../constants/i18n';
import { translations } from '../constants/i18n';
import type { Difficulty, PuzzleResult } from '../utils/sudokuGenerator';
import { generatePuzzle, countSolutions, solvePuzzle } from '../utils/sudokuGenerator';
import { encodePuzzle } from '../utils/puzzleEncoding';
import SudokuBoard from './SudokuBoard';
import NumberPad from './NumberPad';
import DifficultySelector from './DifficultySelector';
import CreatorGuide from './CreatorGuide';

interface CreatorPanelProps {
  mode: DisplayMode;
  lang: Lang;
  onPlay: (result: PuzzleResult) => void;
  onToast: (msg: string) => void;
}

const EMPTY_GRID = new Array<number>(81).fill(0);
const EMPTY_NOTES: Set<number>[] = Array.from({ length: 81 }, () => new Set<number>());

function hasConflicts(grid: number[]): boolean {
  for (let i = 0; i < 81; i++) {
    const val = grid[i];
    if (!val) continue;
    const row = Math.floor(i / 9);
    const col = i % 9;
    const box = Math.floor(row / 3) * 3 + Math.floor(col / 3);
    for (let j = i + 1; j < 81; j++) {
      if (grid[j] !== val) continue;
      const jRow = Math.floor(j / 9);
      const jCol = j % 9;
      const jBox = Math.floor(jRow / 3) * 3 + Math.floor(jCol / 3);
      if (jRow === row || jCol === col || jBox === box) return true;
    }
  }
  return false;
}

export default function CreatorPanel({ mode, lang, onPlay, onToast }: CreatorPanelProps) {
  const t = translations[lang];
  const [grid, setGrid] = useState<number[]>(EMPTY_GRID);
  const [selectedCell, setSelectedCell] = useState<number | null>(null);
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showGuide, setShowGuide] = useState(
    () => !localStorage.getItem('sudoku-creator-guide-seen')
  );

  const openGuide = () => setShowGuide(true);
  const closeGuide = () => {
    localStorage.setItem('sudoku-creator-guide-seen', '1');
    setShowGuide(false);
  };

  const givens = grid.map(() => false);

  const remaining: Record<number, number> = {};
  for (let n = 1; n <= 9; n++) {
    remaining[n] = Math.max(0, 9 - grid.filter(v => v === n).length);
  }

  const handleCellClick = useCallback((idx: number) => {
    if (selectedNumber !== null) {
      setGrid(prev => { const next = [...prev]; next[idx] = selectedNumber; return next; });
      setSelectedCell(idx);
      setSelectedNumber(null);
    } else {
      setSelectedCell(prev => prev === idx ? null : idx);
    }
  }, [selectedNumber]);

  const handleNumberSelect = useCallback((n: number | null) => {
    if (n === null) { setSelectedNumber(null); return; }
    if (selectedCell !== null) {
      setGrid(prev => { const next = [...prev]; next[selectedCell] = n; return next; });
      setSelectedNumber(null);
      // keep cell selected
    } else {
      setSelectedNumber(n);
    }
  }, [selectedCell]);

  const handleValidate = () => {
    if (hasConflicts(grid)) {
      onToast(t.invalidPuzzle);
      return;
    }
    const test = [...grid];
    const sols = countSolutions(test);
    if (sols === 1) {
      onToast(t.validPuzzle);
    } else if (sols === 0) {
      onToast(t.invalidPuzzle);
    } else {
      onToast(t.noUniqueSolution);
    }
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const result = generatePuzzle(difficulty);
      setGrid(result.puzzle);
      setIsGenerating(false);
      setSelectedCell(null);
      setSelectedNumber(null);
    }, 10);
  };

  const handleShare = () => {
    if (hasConflicts(grid)) { onToast(t.invalidPuzzle); return; }
    const sols = countSolutions([...grid]);
    if (sols === 0) { onToast(t.invalidPuzzle); return; }
    if (sols > 1)   { onToast(t.noUniqueSolution); return; }
    const encoded = encodePuzzle(grid);
    const url = `${window.location.origin}${window.location.pathname}?p=${encoded}&m=${mode}`;
    navigator.clipboard.writeText(url).then(() => onToast(t.linkCopied));
  };

  const handlePlay = () => {
    const sol = solvePuzzle(grid);
    if (sol) {
      onPlay({ puzzle: grid, solution: sol });
    } else {
      onToast(t.invalidPuzzle);
    }
  };

  return (
    <div className="creator-layout">
      {showGuide && <CreatorGuide lang={lang} onClose={closeGuide} />}

      <SudokuBoard
        puzzle={grid}
        givens={givens}
        userGrid={grid}
        solution={null}
        selectedCell={selectedCell}
        selectedNumber={selectedNumber}
        mode={mode}
        notesGrid={EMPTY_NOTES}
        checkedErrors={new Set<number>()}
        onCellClick={handleCellClick}
        allEditable={true}
      />

      <NumberPad
        mode={mode}
        selectedNumber={selectedNumber}
        remaining={remaining}
        notesMode={false}
        showNotesToggle={false}
        onSelect={handleNumberSelect}
        onToggleNotes={() => {}}
      />

      <div className="creator-difficulty">
        <DifficultySelector difficulty={difficulty} onChange={setDifficulty} lang={lang} />
      </div>

      <div className="creator-actions">
        <button className="mode-btn" onClick={handleGenerate} disabled={isGenerating}>
          {isGenerating ? t.generating : t.newGame}
        </button>
        <button className="mode-btn" onClick={handleValidate}>{t.validate}</button>
        <button className="mode-btn" onClick={handleShare}>{t.shareBtn}</button>
        <button className="mode-btn mode-btn--active" onClick={handlePlay}>{t.playMode}</button>
      </div>

      <button className="creator-guide-help-btn" onClick={openGuide}>
        ❓ {t.creatorGuideBtn}
      </button>
    </div>
  );
}
