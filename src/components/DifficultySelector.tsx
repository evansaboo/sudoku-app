import type { Difficulty } from '../utils/sudokuGenerator';
import type { Lang } from '../constants/i18n';
import { translations } from '../constants/i18n';

interface DifficultySelectorProps {
  difficulty: Difficulty;
  onChange: (d: Difficulty) => void;
  lang: Lang;
}

const DIFFICULTIES: Difficulty[] = ['easy', 'medium', 'hard'];

export default function DifficultySelector({ difficulty, onChange, lang }: DifficultySelectorProps) {
  const t = translations[lang];
  const labels: Record<Difficulty, string> = { easy: t.easy, medium: t.medium, hard: t.hard };
  return (
    <div className="mode-selector">
      {DIFFICULTIES.map((d) => (
        <button key={d} className={`mode-btn${difficulty === d ? ' mode-btn--active' : ''}`} onClick={() => onChange(d)}>
          {labels[d]}
        </button>
      ))}
    </div>
  );
}
