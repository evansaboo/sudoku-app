function shuffle<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function isValid(grid: number[], pos: number, num: number): boolean {
  const row = Math.floor(pos / 9);
  const col = pos % 9;
  for (let c = 0; c < 9; c++) { if (grid[row * 9 + c] === num) return false; }
  for (let r = 0; r < 9; r++) { if (grid[r * 9 + col] === num) return false; }
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  for (let r = boxRow; r < boxRow + 3; r++) {
    for (let c = boxCol; c < boxCol + 3; c++) {
      if (grid[r * 9 + c] === num) return false;
    }
  }
  return true;
}

function fillGrid(grid: number[]): boolean {
  const empty = grid.indexOf(0);
  if (empty === -1) return true;
  for (const num of shuffle([1,2,3,4,5,6,7,8,9])) {
    if (isValid(grid, empty, num)) {
      grid[empty] = num;
      if (fillGrid(grid)) return true;
      grid[empty] = 0;
    }
  }
  return false;
}

export function countSolutions(grid: number[], limit = 2): number {
  const empty = grid.indexOf(0);
  if (empty === -1) return 1;
  let count = 0;
  for (let num = 1; num <= 9; num++) {
    if (isValid(grid, empty, num)) {
      grid[empty] = num;
      count += countSolutions(grid, limit);
      grid[empty] = 0;
      if (count >= limit) return count;
    }
  }
  return count;
}

/** Returns the filled solution grid, or null if unsolvable */
export function solvePuzzle(puzzle: number[]): number[] | null {
  const grid = [...puzzle];
  if (fillGrid(grid)) return grid;
  return null;
}

export type Difficulty = 'easy' | 'medium' | 'hard';

const CLUES: Record<Difficulty, number> = { easy: 45, medium: 34, hard: 26 };

export interface PuzzleResult {
  puzzle: number[];
  solution: number[];
}

export function generatePuzzle(difficulty: Difficulty = 'medium'): PuzzleResult {
  const clues = CLUES[difficulty];
  const solution = new Array<number>(81).fill(0);
  fillGrid(solution);
  const puzzle = [...solution];
  const positions = shuffle([...Array(81).keys()]);
  let removed = 0;
  const target = 81 - clues;
  for (const pos of positions) {
    if (removed >= target) break;
    const backup = puzzle[pos];
    puzzle[pos] = 0;
    const test = [...puzzle];
    if (countSolutions(test) === 1) {
      removed++;
    } else {
      puzzle[pos] = backup;
    }
  }
  return { puzzle, solution };
}
