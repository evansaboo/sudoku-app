import type { Difficulty } from '../utils/sudokuGenerator';
import type { Lang } from '../constants/i18n';
import { translations } from '../constants/i18n';

interface NewGameModalProps {
  lang: Lang;
  onStart: (difficulty: Difficulty) => void;
  onClose: () => void;
}

interface DiffCard {
  id: Difficulty;
  color: string;
  emoji: string;
}

const CARDS: DiffCard[] = [
  { id: 'easy',   color: '#10b981', emoji: '🟢' },
  { id: 'medium', color: '#f59e0b', emoji: '🟡' },
  { id: 'hard',   color: '#ef4444', emoji: '🔴' },
];

export default function NewGameModal({ lang, onStart, onClose }: NewGameModalProps) {
  const t = translations[lang];

  const labels: Record<Difficulty, string> = { easy: t.easy, medium: t.medium, hard: t.hard };
  const descs:  Record<Difficulty, string> = { easy: t.easyDesc, medium: t.mediumDesc, hard: t.hardDesc };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{t.newGame}</h2>
          <button className="modal-close icon-btn" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <div className="diff-cards">
          {CARDS.map(({ id, color, emoji }) => (
            <button
              key={id}
              className="diff-card"
              style={{ '--diff-color': color } as React.CSSProperties}
              onClick={() => onStart(id)}
            >
              <span className="diff-card-top">
                <span className="diff-card-emoji">{emoji}</span>
                <span className="diff-card-name">{labels[id]}</span>
              </span>
              <span className="diff-card-desc">{descs[id]}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
