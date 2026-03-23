export function encodePuzzle(grid: number[]): string {
  return btoa(grid.join('')).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function decodePuzzle(encoded: string): number[] | null {
  try {
    const b64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
    const str = atob(b64);
    if (str.length !== 81) return null;
    const nums = str.split('').map(Number);
    if (nums.some(n => isNaN(n) || n < 0 || n > 9)) return null;
    return nums;
  } catch {
    return null;
  }
}
