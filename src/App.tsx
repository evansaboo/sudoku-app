import { useState, useCallback, useEffect, useRef } from 'react';
import type { DisplayMode } from './constants/numberMappings';
import type { Lang } from './constants/i18n';
import { translations } from './constants/i18n';
import { useTheme } from './hooks/useTheme';
import type { Difficulty, PuzzleResult } from './utils/sudokuGenerator';
import { generatePuzzle, solvePuzzle } from './utils/sudokuGenerator';
import { encodePuzzle, decodePuzzle } from './utils/puzzleEncoding';

import SudokuBoard from './components/SudokuBoard';
import NumberPad from './components/NumberPad';
import WinScreen from './components/WinScreen';
import Timer from './components/Timer';
import Toast from './components/Toast';
import CreatorPanel from './components/CreatorPanel';
import NewGameModal from './components/NewGameModal';
import SettingsModal from './components/SettingsModal';
import WelcomeLanguagePicker from './components/WelcomeLanguagePicker';

import './App.css';

const EMPTY_GRID  = new Array<number>(81).fill(0);
const EMPTY_BOOLS = new Array<boolean>(81).fill(false);

function makeGivens(puzzle: number[]): boolean[] { return puzzle.map((v) => v !== 0); }
function makeEmptyNotes(): Set<number>[] {
  return Array.from({ length: 81 }, () => new Set<number>());
}

interface UndoEntry { idx: number; prev: number; prevNotes: Set<number>; }

export default function App() {
  // ── language ──────────────────────────────────────────────────────────
  const [lang, setLangState] = useState<Lang>(() =>
    (localStorage.getItem('sudoku-lang') as Lang) ?? 'en'
  );
  // Show welcome picker only if no lang has ever been saved
  const [showWelcome, setShowWelcome] = useState(() => !localStorage.getItem('sudoku-lang'));

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    localStorage.setItem('sudoku-lang', l);
    document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr';
  }, []);

  const handleWelcomeLang = useCallback((l: Lang) => {
    setLang(l);
    setShowWelcome(false);
  }, [setLang]);

  useEffect(() => { document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'; }, []); // eslint-disable-line

  // ── theme ─────────────────────────────────────────────────────────────
  const { theme, setTheme } = useTheme();
  const cycleTheme = useCallback(() => {
    const order = ['light', 'dark', 'system'] as const;
    setTheme(order[(order.indexOf(theme) + 1) % 3]);
  }, [theme, setTheme]);

  // ── display / app mode ────────────────────────────────────────────────
  const [displayMode, setDisplayMode] = useState<DisplayMode>(
    () => (localStorage.getItem('sudoku-display-mode') as DisplayMode) ?? 'standard'
  );
  const handleDisplayModeChange = (m: DisplayMode) => {
    setDisplayMode(m);
    localStorage.setItem('sudoku-display-mode', m);
  };
  const [appMode,     setAppMode]     = useState<'play' | 'create'>('play');

  // ── modals ────────────────────────────────────────────────────────────
  const [showNewGame,  setShowNewGame]  = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // ── puzzle state ──────────────────────────────────────────────────────
  const [puzzle,     setPuzzle]     = useState<number[]>(EMPTY_GRID);
  const [solution,   setSolution]   = useState<number[] | null>(null);
  const [givens,     setGivens]     = useState<boolean[]>(EMPTY_BOOLS);
  const [userGrid,   setUserGrid]   = useState<number[]>(EMPTY_GRID);
  const [hasStarted, setHasStarted] = useState(false);

  // ── interaction ───────────────────────────────────────────────────────
  const [selectedCell,   setSelectedCell]   = useState<number | null>(null);
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);

  // ── notes ─────────────────────────────────────────────────────────────
  const [notesMode, setNotesMode] = useState(false);
  const [notesGrid, setNotesGrid] = useState<Set<number>[]>(makeEmptyNotes);

  // ── undo ──────────────────────────────────────────────────────────────
  const [undoStack, setUndoStack] = useState<UndoEntry[]>([]);

  // ── timer ─────────────────────────────────────────────────────────────
  const [timerActive, setTimerActive] = useState(false);
  const [seconds,     setSeconds]     = useState(0);

  // ── win / errors ──────────────────────────────────────────────────────
  const [won,           setWon]           = useState(false);
  const [checkedErrors, setCheckedErrors] = useState<Set<number>>(new Set());

  // ── toast ─────────────────────────────────────────────────────────────
  const [toast,         setToast]         = useState<string | null>(null);
  const toastKey                          = useRef(0);
  const [toastKeyState, setToastKeyState] = useState(0);
  const showToast = useCallback((msg: string) => {
    toastKey.current += 1;
    setToastKeyState(toastKey.current);
    setToast(msg);
  }, []);

  const t = translations[lang];

  // ── stale-closure refs ────────────────────────────────────────────────
  const userGridRef    = useRef(userGrid);
  const notesGridRef   = useRef(notesGrid);
  const checkedErrRef  = useRef(checkedErrors);
  const timerActiveRef = useRef(timerActive);
  const solutionRef    = useRef(solution);
  const notesModeRef   = useRef(notesMode);
  useEffect(() => { userGridRef.current    = userGrid;      }, [userGrid]);
  useEffect(() => { notesGridRef.current   = notesGrid;     }, [notesGrid]);
  useEffect(() => { checkedErrRef.current  = checkedErrors; }, [checkedErrors]);
  useEffect(() => { timerActiveRef.current = timerActive;   }, [timerActive]);
  useEffect(() => { solutionRef.current    = solution;      }, [solution]);
  useEffect(() => { notesModeRef.current   = notesMode;     }, [notesMode]);

  // ── URL load on mount ─────────────────────────────────────────────────
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const p = params.get('p');
    const m = params.get('m') as DisplayMode | null;
    if (m && ['standard','arabic','syriac','words'].includes(m)) {
      setDisplayMode(m);
      localStorage.setItem('sudoku-display-mode', m);
    }
    if (!p) return;
    const decoded = decodePuzzle(p);
    if (!decoded) return;
    const sol = solvePuzzle(decoded);
    if (!sol) return;
    setPuzzle(decoded); setSolution(sol); setGivens(makeGivens(decoded));
    setUserGrid(EMPTY_GRID); setHasStarted(true); setWon(false);
    setSeconds(0); setTimerActive(false); setUndoStack([]);
    setNotesGrid(makeEmptyNotes()); setCheckedErrors(new Set());
  }, []); // eslint-disable-line

  // ── timer ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!timerActive) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [timerActive]);

  // ── win detection ─────────────────────────────────────────────────────
  useEffect(() => {
    if (!hasStarted || won || solution === null) return;
    const allFilled  = userGrid.every((v, i) => givens[i] || v !== 0);
    const allCorrect = userGrid.every((v, i) => givens[i] || v === solution[i]);
    if (allFilled && allCorrect) { setWon(true); setTimerActive(false); }
  }, [userGrid, hasStarted, won, solution, givens]);

  // ── fill logic ────────────────────────────────────────────────────────
  const applyFill = useCallback((idx: number, n: number) => {
    if (notesModeRef.current && n !== 0) {
      setNotesGrid((prev) => {
        const next = prev.map((s) => new Set(s));
        if (next[idx].has(n)) next[idx].delete(n); else next[idx].add(n);
        return next;
      });
      return;
    }
    setUndoStack((prev) => [
      ...prev, { idx, prev: userGridRef.current[idx], prevNotes: new Set(notesGridRef.current[idx]) },
    ]);
    setUserGrid((prev) => { const next = [...prev]; next[idx] = n; return next; });
    if (checkedErrRef.current.has(idx))
      setCheckedErrors((prev) => { const s = new Set(prev); s.delete(idx); return s; });
    if (!timerActiveRef.current && n !== 0) setTimerActive(true);
  }, []);

  const handleCellClick = useCallback((idx: number) => {
    if (selectedNumber !== null) {
      // Number already chosen — fill and clear number selection
      applyFill(idx, selectedNumber);
      setSelectedCell(idx);
      if (!notesModeRef.current) setSelectedNumber(null);
    } else {
      // No number — just move cell selection (toggle off if same)
      setSelectedCell((prev) => (prev === idx ? null : idx));
    }
  }, [selectedNumber, applyFill]);

  const handleNumberSelect = useCallback((n: number | null) => {
    if (n === null) { setSelectedNumber(null); return; }
    if (selectedCell !== null) {
      // Cell already chosen — fill and clear number selection
      applyFill(selectedCell, n);
      if (!notesModeRef.current) setSelectedNumber(null);
      // keep cell selected for easy next move
    } else {
      // No cell yet — arm the number
      setSelectedNumber(n);
    }
  }, [selectedCell, applyFill]);

  const handleUndo = useCallback(() => {
    setUndoStack((prev) => {
      if (prev.length === 0) return prev;
      const entry = prev[prev.length - 1];
      setUserGrid((g) => { const next = [...g]; next[entry.idx] = entry.prev; return next; });
      setNotesGrid((ng) => {
        const next = ng.map((s) => new Set(s));
        next[entry.idx] = new Set(entry.prevNotes);
        return next;
      });
      return prev.slice(0, -1);
    });
  }, []);

  const handleUndoRef = useRef(handleUndo);
  useEffect(() => { handleUndoRef.current = handleUndo; }, [handleUndo]);
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') { e.preventDefault(); handleUndoRef.current(); }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, []);

  const resetState = useCallback(() => {
    setUserGrid(EMPTY_GRID); setSeconds(0); setTimerActive(false);
    setUndoStack([]); setNotesGrid(makeEmptyNotes()); setCheckedErrors(new Set());
    setWon(false); setSelectedCell(null); setSelectedNumber(null);
  }, []);

  const handleGenerate = useCallback((difficulty: Difficulty) => {
    const result = generatePuzzle(difficulty);
    setPuzzle(result.puzzle); setSolution(result.solution);
    setGivens(makeGivens(result.puzzle));
    resetState(); setHasStarted(true); setShowNewGame(false);
  }, [resetState]);

  const handleReset = useCallback(() => {
    resetState(); setHasStarted(true);
  }, [resetState]);

  const handleCheck = useCallback(() => {
    if (!solutionRef.current) return;
    const errors = new Set<number>();
    userGridRef.current.forEach((v, i) => {
      if (!givens[i] && v !== 0 && v !== solutionRef.current![i]) errors.add(i);
    });
    setCheckedErrors(errors);
    showToast(errors.size === 0 ? `✓ ${t.checkPuzzle}` : t.hasErrors);
  }, [givens, showToast, t]);

  const handleShare = useCallback(() => {
    const encoded = encodePuzzle(puzzle);
    const url = `${window.location.origin}${window.location.pathname}?p=${encoded}`;
    navigator.clipboard.writeText(url).then(() => showToast(t.linkCopied));
  }, [puzzle, showToast, t]);

  const handleCreatorPlay = useCallback((result: PuzzleResult) => {
    setPuzzle(result.puzzle); setSolution(result.solution);
    setGivens(makeGivens(result.puzzle));
    resetState(); setHasStarted(true); setAppMode('play');
  }, [resetState]);

  const remaining: Record<number, number> = {};
  for (let n = 1; n <= 9; n++) {
    const placed = userGrid.filter((v, i) => (givens[i] ? puzzle[i] : v) === n).length;
    remaining[n] = Math.max(0, 9 - placed);
  }

  // ── render ────────────────────────────────────────────────────────────
  return (
    <div className="app">
      {showWelcome && <WelcomeLanguagePicker onSelect={handleWelcomeLang} />}
      {/* ── Header ───────────────────────────────────────────────────── */}
      <header className="header">
        <h1 className="app-title">{t.title}</h1>
        <div className="header-controls">
          <button
            className="icon-btn"
            onClick={() => setShowSettings(true)}
            aria-label={t.settings}
            title={t.settings}
          >
            ⚙️
          </button>
          {/* theme toggle stays in header for quick access */}
          <button
            className="icon-btn"
            onClick={cycleTheme}
            aria-label={`Theme: ${theme}`}
            title={theme}
          >
            {theme === 'light' ? '☀️' : theme === 'dark' ? '🌙' : '💻'}
          </button>
        </div>
      </header>

      {/* ── Mode tabs ────────────────────────────────────────────────── */}
      <div className="mode-tabs">
        <button
          className={`tab-btn${appMode === 'play' ? ' tab-btn--active' : ''}`}
          onClick={() => setAppMode('play')}
        >
          {t.playMode}
        </button>
        <button
          className={`tab-btn${appMode === 'create' ? ' tab-btn--active' : ''}`}
          onClick={() => setAppMode('create')}
        >
          {t.createMode}
        </button>
      </div>

      {/* ── CREATOR MODE ─────────────────────────────────────────────── */}
      {appMode === 'create' && (
        <CreatorPanel
          mode={displayMode}
          lang={lang}
          onPlay={handleCreatorPlay}
          onToast={showToast}
        />
      )}

      {/* ── PLAY MODE ────────────────────────────────────────────────── */}
      {appMode === 'play' && (
        <>
          {hasStarted && (
            <div className="game-info">
              <Timer seconds={seconds} />
            </div>
          )}

          {!hasStarted && <p className="hint">{t.hint}</p>}

          {hasStarted && (
            <SudokuBoard
              puzzle={puzzle}
              givens={givens}
              userGrid={userGrid}
              solution={solution}
              selectedCell={selectedCell}
              selectedNumber={selectedNumber}
              mode={displayMode}
              notesGrid={notesGrid}
              checkedErrors={checkedErrors}
              onCellClick={handleCellClick}
            />
          )}

          {hasStarted && (
            <NumberPad
              mode={displayMode}
              selectedNumber={selectedNumber}
              remaining={remaining}
              notesMode={notesMode}
              onSelect={handleNumberSelect}
              onToggleNotes={() => setNotesMode((m) => !m)}
            />
          )}

          {/* ── Bottom action bar ──────────────────────────────────── */}
          <div className="bottom-bar">
            {hasStarted ? (
              <>
                <button
                  className="bar-btn"
                  onClick={handleReset}
                  title={t.reset}
                >
                  <span className="bar-btn-icon">↺</span>
                  <span className="bar-btn-label">{t.reset}</span>
                </button>
                <button
                  className="bar-btn"
                  onClick={handleUndo}
                  disabled={undoStack.length === 0}
                  title={t.undo}
                >
                  <span className="bar-btn-icon">↩</span>
                  <span className="bar-btn-label">{t.undo}</span>
                </button>
                <button
                  className="bar-btn bar-btn--primary"
                  onClick={() => setShowNewGame(true)}
                >
                  <span className="bar-btn-icon">＋</span>
                  <span className="bar-btn-label">{t.newGame}</span>
                </button>
                <button
                  className="bar-btn"
                  onClick={handleCheck}
                  title={t.check}
                >
                  <span className="bar-btn-icon">✓</span>
                  <span className="bar-btn-label">{t.check}</span>
                </button>
                <button
                  className="bar-btn"
                  onClick={handleShare}
                  title={t.share}
                >
                  <span className="bar-btn-icon">⬆</span>
                  <span className="bar-btn-label">{t.share}</span>
                </button>
              </>
            ) : (
              <button
                className="bar-btn bar-btn--start"
                onClick={() => setShowNewGame(true)}
              >
                <span className="bar-btn-icon">＋</span>
                <span className="bar-btn-label">{t.newGame}</span>
              </button>
            )}
          </div>
        </>
      )}

      {/* ── Overlays ─────────────────────────────────────────────────── */}
      {won && (
        <WinScreen
          seconds={seconds}
          lang={lang}
          onNewGame={() => setShowNewGame(true)}
          onShare={handleShare}
        />
      )}

      {showNewGame && (
        <NewGameModal
          lang={lang}
          onStart={handleGenerate}
          onClose={() => setShowNewGame(false)}
        />
      )}

      {showSettings && (
        <SettingsModal
          lang={lang}
          displayMode={displayMode}
          theme={theme}
          onLangChange={setLang}
          onModeChange={handleDisplayModeChange}
          onCycleTheme={cycleTheme}
          onClose={() => setShowSettings(false)}
        />
      )}

      {toast !== null && (
        <Toast key={toastKeyState} message={toast} onDone={() => setToast(null)} />
      )}
    </div>
  );
}
