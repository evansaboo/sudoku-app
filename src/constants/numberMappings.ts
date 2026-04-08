/**
 * NUMBER MAPPINGS
 *
 * Display modes for digits 1–9:
 *
 *   standard     — Western Arabic numerals (1-9)
 *   arabic       — Arabic-Indic numerals (١-٩)
 *   syriac       — Syriac abjad numerals (ܐ-ܛ)
 *   words        — Syriac words (ܚܕ-ܬܫܥܐ)
 *   saints-ar    — Saints names in Arabic (ايليا-مرقس)
 *   saints-syr   — Saints names in Syriac/Chaldean (ܐܝܠܝܐ-ܡܪܩܘܗ)
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

export const SAINTS_AR: readonly [string, string, string, string, string, string, string, string, string] = [
  'ايليا',  // 1
  'يسوع',   // 2
  'مريم',   // 3
  'يوسف',   // 4
  'بطرس',   // 5
  'بولس',   // 6
  'يوحنا',  // 7
  'لوقا',   // 8
  'مرقس',   // 9
];

export const SAINTS_SYR: readonly [string, string, string, string, string, string, string, string, string] = [
  'ܐܝܠܝܐ',  // 1 — Elijah
  'ܐܝܫܘܥ',  // 2 — Jesus
  'ܡܪܝܡ',   // 3 — Mary
  'ܝܘܗܝܦ',  // 4 — Joseph
  'ܦܛܪܘܣ', // 5 — Peter
  'ܦܘܠܣ',   // 6 — Paul
  'ܝܘܚܢܐ',  // 7 — John
  'ܠܘܩܐ',   // 8 — Luke
  'ܡܪܩܘܗ', // 9 — Mark
];

export type DisplayMode = 'standard' | 'arabic' | 'syriac' | 'words' | 'saints-ar' | 'saints-syr';

export interface Mode {
  id: DisplayMode;
  label: string;
}

export const MODES: Mode[] = [
  { id: 'standard',   label: 'English' },
  { id: 'arabic',     label: 'Arabic' },
  { id: 'syriac',     label: 'Syriac #' },
  { id: 'words',      label: 'Syriac ܡܠܬܐ' },
  { id: 'saints-ar',  label: 'قديسين' },
  { id: 'saints-syr', label: 'ܩܕܝ̈ܫܐ' },
];

const ARABIC_INDIC = ['١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'] as const;
const SYRIAC_NUMS  = ['ܐ', 'ܒ', 'ܓ', 'ܕ', 'ܗ', 'ܘ', 'ܙ', 'ܚ', 'ܛ'] as const;

/** Maps an internal value (1-9) → display string for the given mode. Returns '' for 0/empty. */
export function toDisplay(value: number, mode: DisplayMode): string {
  if (!value) return '';
  const i = value - 1;
  switch (mode) {
    case 'standard':   return String(value);
    case 'arabic':     return ARABIC_INDIC[i];
    case 'syriac':     return SYRIAC_NUMS[i];
    case 'words':      return SYRIAC_WORDS[i];
    case 'saints-ar':  return SAINTS_AR[i];
    case 'saints-syr': return SAINTS_SYR[i];
  }
}

/** Returns true for modes that display multi-char text (need wider cells). */
export function isWordsMode(mode: DisplayMode): boolean {
  return mode === 'words' || mode === 'saints-ar' || mode === 'saints-syr';
}

