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
  // Creator guide
  creatorGuideTitle: string;
  creatorGuideIntro: string;
  creatorGuideStep1Title: string;
  creatorGuideStep1Desc: string;
  creatorGuideStep2Title: string;
  creatorGuideStep2Desc: string;
  creatorGuideStep3Title: string;
  creatorGuideStep3Desc: string;
  creatorGuideStep4Title: string;
  creatorGuideStep4Desc: string;
  creatorGuideStep5Title: string;
  creatorGuideStep5Desc: string;
  creatorGuideDone: string;
  creatorGuideBtn: string;
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
    creatorGuideTitle: 'How to Create a Puzzle',
    creatorGuideIntro: 'Build your own Sudoku and share it with friends!',
    creatorGuideStep1Title: 'Fill cells manually',
    creatorGuideStep1Desc: 'Tap a number on the pad, then tap a cell to place it — or tap a cell first, then a number. The number clears after each placement.',
    creatorGuideStep2Title: 'Generate a puzzle',
    creatorGuideStep2Desc: 'Pick a difficulty (Easy / Medium / Hard) and tap Generate to auto-fill a valid puzzle as your starting point.',
    creatorGuideStep3Title: 'Clear a cell',
    creatorGuideStep3Desc: 'Tap the ✕ (erase) button on the number pad, then tap the cell you want to clear.',
    creatorGuideStep4Title: 'Validate',
    creatorGuideStep4Desc: 'Tap Validate to check your puzzle has no conflicts and has exactly one unique solution. Fix any issues before sharing.',
    creatorGuideStep5Title: 'Share & Play',
    creatorGuideStep5Desc: 'Tap Share to copy a link — anyone who opens it jumps straight into solving your puzzle. Tap Play to solve it yourself!',
    creatorGuideDone: 'Got it!',
    creatorGuideBtn: 'How to create?',
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
    creatorGuideTitle: 'كيف تصنع لغز؟',
    creatorGuideIntro: 'اصنع سودوكو خاص بيك وشاركه مع أصحابك!',
    creatorGuideStep1Title: 'اكتب الأرقام يدوياً',
    creatorGuideStep1Desc: 'اختار رقم من اللوحة بعدين اضغط على الخانة — أو اضغط الخانة أول ثم الرقم. الرقم يمسح بعد كل ما تحط.',
    creatorGuideStep2Title: 'ولّد لغز تلقائي',
    creatorGuideStep2Desc: 'اختار صعوبة (سهل / وسط / صعب) واضغط توليد يجيبلك لغز جاهز تبدأ منه.',
    creatorGuideStep3Title: 'امسح خانة',
    creatorGuideStep3Desc: 'اضغط زر ✕ (مسح) من اللوحة ثم اضغط الخانة الي تريد تمسحها.',
    creatorGuideStep4Title: 'تحقق',
    creatorGuideStep4Desc: 'اضغط تحقق تشوف اللغز ما عنده تعارضات وعنده حل واحد بس. صلح أي مشكلة قبل ما تشارك.',
    creatorGuideStep5Title: 'شارك وإلعب',
    creatorGuideStep5Desc: 'اضغط شارك تنكوبي الرابط — أي واحد يفتحه يبدأ يحل لغزك. اضغط إلعب إذا تريد تحله بنفسك!',
    creatorGuideDone: 'فهمت!',
    creatorGuideBtn: 'كيف أصنع؟',
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
    creatorGuideTitle: 'Hur skapar man ett pussel?',
    creatorGuideIntro: 'Bygg ett eget Sudoku och dela det med vänner!',
    creatorGuideStep1Title: 'Fyll celler manuellt',
    creatorGuideStep1Desc: 'Tryck på ett tal i panelen, sedan en cell — eller tryck cellen först och sedan talet. Talet rensas efter varje placering.',
    creatorGuideStep2Title: 'Generera ett pussel',
    creatorGuideStep2Desc: 'Välj svårighetsgrad (Lätt / Medel / Svårt) och tryck Generera för ett färdigt pussel att utgå från.',
    creatorGuideStep3Title: 'Rensa en cell',
    creatorGuideStep3Desc: 'Tryck på ✕ (radera) i panelen och sedan på cellen du vill rensa.',
    creatorGuideStep4Title: 'Validera',
    creatorGuideStep4Desc: 'Tryck Validera för att kontrollera att pusslet saknar konflikter och har exakt en unik lösning.',
    creatorGuideStep5Title: 'Dela & Spela',
    creatorGuideStep5Desc: 'Tryck Dela för att kopiera länken — den som öppnar den börjar direkt lösa ditt pussel. Tryck Spela för att lösa det själv!',
    creatorGuideDone: 'Fattat!',
    creatorGuideBtn: 'Hur skapar man?',
  },
};
