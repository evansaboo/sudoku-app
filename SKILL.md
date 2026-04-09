# SKILL.md — Sudoku App: Coding Standards & UX Design Guide

> This document is intended for AI agents and contributors working on this project.
> Follow these standards precisely to maintain consistency across all changes.

---

## Project Overview

A React 19 + TypeScript Sudoku app built with Vite. No external state libraries.
All game logic lives in utility functions. Components are focused and presentational.

**Live URL:** https://chaldeanorg.github.io/sudoku-app/  
**Repo:** https://github.com/ChaldeanOrg/sudoku-app  
**Stack:** React 19, TypeScript, Vite, native CSS (no CSS-in-JS, no Tailwind)

---

## File Structure

```
src/
  App.tsx                   # Central state, all game logic wiring, render tree
  App.css                   # All component styles (one file, sectioned)
  index.css                 # CSS variables only (light/dark themes, global reset)
  main.tsx                  # Entry point
  constants/
    numberMappings.ts       # DisplayMode type, MODES array, toDisplay(), isWordsMode()
    i18n.ts                 # Lang type, Translations interface, all translated strings
  utils/
    sudokuGenerator.ts      # Backtracking generator, countSolutions, solvePuzzle
    puzzleEncoding.ts       # Nibble-pack base64url encode/decode for share URLs
  hooks/
    useTheme.ts             # Theme persistence (light/dark/system → localStorage)
  components/
    SudokuBoard.tsx         # 9×9 grid, conflict detection, same-number highlight
    SudokuCell.tsx          # Individual cell — value or 3×3 notes grid
    NumberPad.tsx           # 9 number buttons + erase + notes toggle
    ModeSelector.tsx        # Number style pills (used inside SettingsModal)
    DifficultySelector.tsx  # Easy/Medium/Hard pills (used in Creator + NewGameModal)
    LanguageSelector.tsx    # EN/AR/SV pills (used inside SettingsModal)
    ThemeToggle.tsx         # ☀️→🌙→💻 cycle (header)
    Timer.tsx               # MM:SS display
    Toast.tsx               # Slide-in/out notification
    WinScreen.tsx           # Confetti overlay + stats + replay
    CreatorPanel.tsx        # Blank grid editor — validate, generate, share, play
    CreatorGuide.tsx        # 5-step how-to modal for creator mode
    NewGameModal.tsx        # Bottom-sheet difficulty picker
    SettingsModal.tsx       # Language + Number Style + Theme
    WelcomeLanguagePicker.tsx # First-visit full-screen language selector
public/
  og-image.png              # 1200×630 Open Graph preview image for social sharing
  og-image.svg              # Source SVG for the OG image
```

---

## TypeScript Standards

- **Strict mode** — no `any`, no implicit `any`.
- All component props use explicit `interface` declarations.
- Use `type` for union types and aliases, `interface` for prop shapes.
- Always run `npx tsc --noEmit` before committing. Zero errors required.
- Import types with `import type { ... }` (not `import { ... }`).

```ts
// ✅ correct
import type { DisplayMode } from '../constants/numberMappings';

// ❌ wrong
import { DisplayMode } from '../constants/numberMappings';
```

---

## Adding a New Display Mode

All 6 display modes live in `src/constants/numberMappings.ts`.

1. **Add the word array** (readonly tuple of 9 strings).
2. **Extend `DisplayMode`** union type.
3. **Add to `MODES` array** (id + label shown in the UI).
4. **Add a `case`** in `toDisplay()`.
5. **Update `isWordsMode()`** if the new mode needs wide cells (multi-char text).

```ts
// Example: adding a new mode
export const MY_WORDS = ['one','two','three','four','five','six','seven','eight','nine'] as const;

export type DisplayMode = 'standard' | 'arabic' | 'syriac' | 'words' | 'saints-ar' | 'saints-syr' | 'my-mode';

export const MODES: Mode[] = [
  ...
  { id: 'my-mode', label: 'My Mode' },
];

export function toDisplay(value: number, mode: DisplayMode): string {
  ...
  case 'my-mode': return MY_WORDS[i];
}

export function isWordsMode(mode: DisplayMode): boolean {
  return mode === 'words' || mode === 'saints-ar' || mode === 'saints-syr' || mode === 'my-mode';
}
```

**Font rules:**
- Syriac script modes (`syriac`, `words`, `saints-syr`): apply `fontFamily: "'Noto Sans Syriac Eastern', serif"` via inline style.
- Arabic script modes (`saints-ar`): no special font, no inline `direction: rtl` on cells (it breaks `border-inline-end` box borders — RTL is handled at document level only).

---

## Adding a New Language

All translations live in `src/constants/i18n.ts`.

1. **Extend `Lang`** type: `export type Lang = 'en' | 'ar' | 'sv' | 'xx';`
2. **Add to `Translations` interface** any new string keys first.
3. **Add the full translations object** under the new lang key.
4. **Add to `WelcomeLanguagePicker.tsx`** LANGS array with flag emoji.
5. **Add to `LanguageSelector.tsx`** labels array.
6. If RTL: `document.documentElement.dir = 'rtl'` is set in `setLang()` in `App.tsx`.

**Iraqi Arabic dialect** is the standard for Arabic (`ar`). Use colloquial Iraqi phrasing (e.g. *إلعب* not *إلعب*, *ربحت* not *لقد فزت*, *وسط* not *متوسط*).

---

## Internationalization Rules

- **Every** user-visible string must come from `translations[lang]`.
- Never hardcode English strings in component JSX.
- When adding a new UI string:
  1. Add the key to the `Translations` interface in `i18n.ts`.
  2. Add values for **all three languages** (en, ar, sv) before committing.
  3. TypeScript will error if any language is missing a key — use this as your safety net.

---

## CSS Architecture

### One file rule
All component styles go in `src/App.css`. `src/index.css` is CSS variables only.

### CSS Variables (defined in `index.css`)
```css
--bg, --surface, --border, --text, --text-muted,
--accent, --accent-bg, --highlight, --same-number,
--error, --given, --shadow
```
Always use these variables. Never hardcode colors.

### Theme system
- `data-theme="light|dark|system"` on `<html>`.
- CSS covers `[data-theme="dark"]`, `[data-theme="light"]`, and `@media (prefers-color-scheme: dark)` for system.

### RTL support
- Use **logical CSS properties** everywhere: `border-inline-end` not `border-right`, `padding-inline-start` not `padding-left`.
- Never set `direction: rtl` on individual cells or grid items — only on `document.documentElement`.

### Board borders — critical rule
The board uses `box-shadow: inset 0 0 0 2.5px var(--text)` **not** `border`. Reason: `border` on `box-sizing: border-box` reduces content area, causing subpixel overflow that clips the last column/row.

```css
/* ✅ correct */
.board { box-shadow: inset 0 0 0 2.5px var(--text), var(--shadow); }

/* ❌ breaks last column/row */
.board { border: 2.5px solid var(--text); }
```

### Cell box-sizing after `all: unset`
```css
.cell {
  all: unset;
  box-sizing: border-box; /* MUST re-add — all:unset resets to content-box */
  ...
}
```

### Words mode (wide cells)
When `isWordsMode(mode)` is true, add `board--words` class:
```css
.board--words { aspect-ratio: auto; width: min(540px, calc(100vw - 16px)); }
.board--words .cell {
  aspect-ratio: auto; height: 50px;
  font-size: clamp(0.78rem, 3.6vw, 1.3rem);
  white-space: nowrap; overflow: hidden;
}
```

### No background transitions on cells
```css
/* ✅ correct — instant selection, no flicker */
.cell { transition: color 0.1s; }

/* ❌ causes visible flash when 20+ cells change at once */
.cell { transition: background 0.1s; }
```

### Touch targets
All interactive elements must have `min-height: 44px` (Apple HIG minimum). Add:
```css
touch-action: manipulation;
-webkit-tap-highlight-color: transparent;
```

### Hover states
Always wrap hover styles in `@media (hover: hover)` so they don't activate on touch devices:
```css
@media (hover: hover) {
  .my-btn:hover { background: var(--highlight); }
}
```

---

## Control Flow (Game UX)

The interaction model is "fire and clear":

| Situation | Behaviour |
|---|---|
| Tap cell (no number armed) | Select cell |
| Tap same cell again (no number) | Deselect cell |
| Tap number → tap cell | Fill cell, **clear number**, keep cell selected |
| Tap cell → tap number | Fill cell, **clear number**, keep cell selected |
| Notes mode | Number stays selected after use (rapid multi-candidate entry) |
| Erase (0) | Clears cell value, clears number selection, keeps cell selected |

This applies to **both play mode and creator mode**.

---

## localStorage Keys

| Key | Value | Set when |
|---|---|---|
| `sudoku-lang` | `'en' \| 'ar' \| 'sv'` | Language changed or welcome picker used |
| `sudoku-display-mode` | `DisplayMode` | Number style changed |
| `sudoku-theme` | `'light' \| 'dark' \| 'system'` | Theme toggled |
| `sudoku-creator-guide-seen` | `'1'` | Creator guide dismissed |

**First-visit detection:** `!localStorage.getItem('sudoku-lang')` → show `WelcomeLanguagePicker`.

---

## Share URL Format

```
https://chaldeanorg.github.io/sudoku-app/?p=<encoded>&m=<mode>
```

- `p` — nibble-packed base64url of 81-digit grid (0=empty). ~55 chars. See `puzzleEncoding.ts`.
- `m` — `DisplayMode` string so recipients see the puzzle in the creator's chosen style.
- Decoded on mount in `App.tsx` `useEffect([], [])`.
- Old format (base64 of raw 81-char string, length 108) is still supported via length-based fallback.

---

## Modal / Overlay Pattern

```tsx
<div className="modal-overlay" onClick={onClose}>
  <div className="modal" onClick={(e) => e.stopPropagation()}>
    <div className="modal-header">
      <h2 className="modal-title">Title</h2>
      <button className="icon-btn modal-close" onClick={onClose}>✕</button>
    </div>
    {/* content */}
  </div>
</div>
```

- Mobile: bottom-sheet (`slideUp` animation, `border-radius: 20px 20px 0 0`).
- Desktop (`min-width: 560px`): centered dialog (`scaleIn` animation, full `border-radius: 16px`).
- Always include `padding-bottom: calc(20px + env(safe-area-inset-bottom))` for notched phones.

---

## Toast Pattern

`Toast.tsx` uses `useEffect([], [])` with `onDone` stored in a **ref** (not a dependency). This is intentional — avoids re-firing the timer when parent re-renders. Do not change to `useEffect([onDone])`.

---

## Creator Mode Rules

- Creator mode has its own isolated state (`selectedCell`, `selectedNumber`, `grid`) inside `CreatorPanel.tsx`. It does **not** share state with play mode.
- No notes mode, no undo stack, no timer in creator mode.
- `allEditable={true}` prop on `SudokuBoard` makes every cell clickable.
- Share button auto-validates (conflicts + unique solution check) — no separate validate step required.
- Guide auto-shows on first visit to creator mode (flag: `sudoku-creator-guide-seen`).

---

## Commit Convention

```
Short imperative title (50 chars)

Optional body explaining WHY, not what.

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>
```

Always include the `Co-authored-by` trailer.

---

## Deployment

- **Platform:** GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`)
- **Trigger:** Every push to `main` auto-deploys.
- **Vite base:** `/sudoku-app/` (set in `vite.config.ts`) — required for asset paths on Pages.
- **Manual trigger:** Actions tab → "Deploy to GitHub Pages" → "Run workflow".

---

## What NOT to Do

- ❌ Do not add external state management (Redux, Zustand, etc.).
- ❌ Do not use `border` on the `.board` element (use `box-shadow: inset` instead).
- ❌ Do not add `transition: background` to `.cell` (causes flicker).
- ❌ Do not set `direction: rtl` on individual cells or grid items.
- ❌ Do not hardcode any user-visible string in JSX — always use `t.keyName` from i18n.
- ❌ Do not add a new display mode without updating `isWordsMode()` if it needs wide cells.
- ❌ Do not add a new language without filling in **all** keys in the `Translations` interface.
- ❌ Do not install runtime npm dependencies without strong justification — keep the bundle lean.
