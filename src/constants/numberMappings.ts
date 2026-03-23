/**
 * NUMBER MAPPINGS
 *
 * Four display modes for digits 1–9:
 *
 *   standard — Western Arabic numerals (1-9)
 *   arabic   — Arabic-Indic numerals (١-٩)
 *   syriac   — Syriac abjad numerals (ܐ-ܛ)
 *   words    — Syriac words (one per number, 1–9)
 *
 * ── CUSTOMIZE SYRIAC WORDS HERE ──────────────────────────────────────────────
 * Replace each entry in SYRIAC_WORDS with your preferred word.
 * Index 0 = word for 1, index 1 = word for 2, … index 8 = word for 9.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const SYRIAC_WORDS: readonly [string, string, string, string, string, string, string, string, string] = [
  'ܚܕ',      // 1
  'ܬܪܝܢ',   // 2
  'ܬܠܬܐ',  // 3
  'ܐܪܒܥܐ', // 4
  'ܚܡܫܐ',  // 5
  'ܫܬܐ',    // 6
  'ܫܒܥܐ',  // 7
  'ܬܡܢܝܐ', // 8
  'ܬܫܥܐ',  // 9
];

export type DisplayMode = 'standard' | 'arabic' | 'syriac' | 'words';

export interface Mode {
  id: DisplayMode;
  label: string;
}

export const MODES: Mode[] = [
  { id: 'standard', label: 'English' },
  { id: 'arabic',   label: 'Arabic' },
  { id: 'syriac',   label: 'Syriac #' },
  { id: 'words',    label: 'Syriac ܡܠܬܐ' },
];

const ARABIC_INDIC = ['١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'] as const;
const SYRIAC_NUMS  = ['ܐ', 'ܒ', 'ܓ', 'ܕ', 'ܗ', 'ܘ', 'ܙ', 'ܚ', 'ܛ'] as const;

/** Maps an internal value (1-9) → display string for the given mode. Returns '' for 0/empty. */
export function toDisplay(value: number, mode: DisplayMode): string {
  if (!value) return '';
  const i = value - 1;
  switch (mode) {
    case 'standard': return String(value);
    case 'arabic':   return ARABIC_INDIC[i];
    case 'syriac':   return SYRIAC_NUMS[i];
    case 'words':    return SYRIAC_WORDS[i];
  }
}
