/**
 * Nibble-pack encoding: each cell (0–9) fits in 4 bits.
 * Two cells per byte → 41 bytes → ~55 base64url chars (vs 108 before).
 */
export function encodePuzzle(grid: number[]): string {
  const bytes = new Uint8Array(Math.ceil(81 / 2)); // 41 bytes
  for (let i = 0; i < 81; i++) {
    if (i % 2 === 0) bytes[i >> 1] = grid[i] << 4;
    else             bytes[i >> 1] |= grid[i];
  }
  let bin = '';
  bytes.forEach(b => (bin += String.fromCharCode(b)));
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function decodePuzzle(encoded: string): number[] | null {
  try {
    const bin = atob(encoded.replace(/-/g, '+').replace(/_/g, '/'));

    // Legacy: old links were btoa of the raw 81-digit string (length 108→81 after decode)
    if (bin.length === 81) {
      const nums = bin.split('').map(Number);
      if (nums.some(n => isNaN(n) || n < 0 || n > 9)) return null;
      return nums;
    }

    // Nibble-packed: 41 bytes → 81 cells
    const bytes = Uint8Array.from(bin, c => c.charCodeAt(0));
    const grid: number[] = [];
    for (let i = 0; i < 81; i++) {
      grid.push(i % 2 === 0 ? (bytes[i >> 1] >> 4) & 0xf : bytes[i >> 1] & 0xf);
    }
    if (grid.some(n => n < 0 || n > 9)) return null;
    return grid;
  } catch {
    return null;
  }
}
