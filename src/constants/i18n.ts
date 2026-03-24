export type Lang = 'en' | 'ar' | 'sv';

export interface Translations {
  title: string;
  newGame: string;
  reset: string;
  validate: string;
  createMode: string;
  playMode: string;
  shareBtn: string;
  linkCopied: string;
  easy: string;
  easyDesc: string;
  medium: string;
  mediumDesc: string;
  hard: string;
  hardDesc: string;
  difficulty: string;
  language: string;
  numberStyle: string;
  settings: string;
  youWon: string;
  time: string;
  playAgain: string;
  invalidPuzzle: string;
  validPuzzle: string;
  noUniqueSolution: string;
  generating: string;
  hint: string;
  hasErrors: string;
  undo: string;
  notes: string;
  remaining: string;
  checkPuzzle: string;
  darkMode: string;
  lightMode: string;
  systemMode: string;
  clearGrid: string;
  playThisPuzzle: string;
  pen: string;
  check: string;
  share: string;
}

export const translations: Record<Lang, Translations> = {
  en: {
    title: 'Sudoku',
    newGame: 'New Game',
    reset: 'Reset',
    validate: 'Validate',
    createMode: 'Create',
    playMode: 'Play',
    shareBtn: 'Share',
    linkCopied: 'Link copied!',
    easy: 'Easy',
    easyDesc: 'Plenty of clues — great for beginners',
    medium: 'Medium',
    mediumDesc: 'Balanced challenge',
    hard: 'Hard',
    hardDesc: 'Very few clues — experts only',
    difficulty: 'Difficulty',
    language: 'Language',
    numberStyle: 'Number Style',
    settings: 'Settings',
    youWon: '🎉 You Won!',
    time: 'Time',
    playAgain: 'Play Again',
    invalidPuzzle: 'Invalid — has conflicts',
    validPuzzle: '✓ Valid! Unique solution.',
    noUniqueSolution: 'Puzzle has multiple solutions',
    generating: 'Generating…',
    hint: 'Tap New Game to start',
    hasErrors: 'There are errors in your solution',
    undo: 'Undo',
    notes: 'Notes',
    remaining: 'remaining',
    checkPuzzle: 'Check',
    darkMode: 'Dark',
    lightMode: 'Light',
    systemMode: 'System',
    clearGrid: 'Clear',
    playThisPuzzle: 'Play this Puzzle',
    pen: 'Pen',
    check: 'Check',
    share: 'Share',
  },
  ar: {
    title: 'سودوكو',
    newGame: 'لعبة جديدة',
    reset: 'إعادة',
    validate: 'تحقق',
    createMode: 'إنشاء',
    playMode: 'إلعب',
    shareBtn: 'شارك',
    linkCopied: 'انكوبي الرابط!',
    easy: 'سهل',
    easyDesc: 'أرقام كثيرة — مناسب للمبتدئين',
    medium: 'وسط',
    mediumDesc: 'تحدي متوازن',
    hard: 'صعب',
    hardDesc: 'أرقام قليلة جداً — للخبراء بس',
    difficulty: 'الصعوبة',
    language: 'اللغة',
    numberStyle: 'نوع الأرقام',
    settings: 'الإعدادات',
    youWon: '🎉 ربحت!',
    time: 'الوقت',
    playAgain: 'إلعب مرة ثانية',
    invalidPuzzle: 'مو صح — في تعارضات',
    validPuzzle: '✓ صح! حل واحد بس.',
    noUniqueSolution: 'اللغز عنده أكثر من حل',
    generating: 'يولّد…',
    hint: 'اضغط لعبة جديدة تبدأ',
    hasErrors: 'في غلطات بحلك',
    undo: 'تراجع',
    notes: 'ملاحظات',
    remaining: 'باقية',
    checkPuzzle: 'تحقق',
    darkMode: 'داكن',
    lightMode: 'فاتح',
    systemMode: 'النظام',
    clearGrid: 'مسح',
    playThisPuzzle: 'إلعب هذا اللغز',
    pen: 'قلم',
    check: 'تحقق',
    share: 'شارك',
  },
  sv: {
    title: 'Sudoku',
    newGame: 'Nytt spel',
    reset: 'Återställ',
    validate: 'Validera',
    createMode: 'Skapa',
    playMode: 'Spela',
    shareBtn: 'Dela',
    linkCopied: 'Länk kopierad!',
    easy: 'Lätt',
    easyDesc: 'Många ledtrådar — bra för nybörjare',
    medium: 'Medel',
    mediumDesc: 'Balanserad utmaning',
    hard: 'Svår',
    hardDesc: 'Mycket få ledtrådar — endast för experter',
    difficulty: 'Svårighetsgrad',
    language: 'Språk',
    numberStyle: 'Sifferstil',
    settings: 'Inställningar',
    youWon: '🎉 Du vann!',
    time: 'Tid',
    playAgain: 'Spela igen',
    invalidPuzzle: 'Ogiltigt — har konflikter',
    validPuzzle: '✓ Giltigt! Unik lösning.',
    noUniqueSolution: 'Pusslet har flera lösningar',
    generating: 'Genererar…',
    hint: 'Tryck Nytt spel för att börja',
    hasErrors: 'Det finns fel i din lösning',
    undo: 'Ångra',
    notes: 'Anteckningar',
    remaining: 'kvar',
    checkPuzzle: 'Kontrollera',
    darkMode: 'Mörkt',
    lightMode: 'Ljust',
    systemMode: 'System',
    clearGrid: 'Rensa',
    playThisPuzzle: 'Spela detta pussel',
    pen: 'Penna',
    check: 'Kontrollera',
    share: 'Dela',
  },
};
