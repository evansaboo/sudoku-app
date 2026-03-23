import type { Lang } from '../constants/i18n';
import { translations } from '../constants/i18n';
import Timer from './Timer';

interface WinScreenProps {
  seconds: number;
  lang: Lang;
  onNewGame: () => void;
  onShare: () => void;
}

export default function WinScreen({ seconds, lang, onNewGame, onShare }: WinScreenProps) {
  const t = translations[lang];
  return (
    <div className="win-screen">
      <div className="confetti-container" aria-hidden="true">
        {Array.from({ length: 24 }, (_, i) => (
          <div key={i} className="confetti-piece" style={{ '--ci': i } as React.CSSProperties} />
        ))}
      </div>
      <div className="win-panel">
        <h2 className="win-title">{t.youWon}</h2>
        <div className="win-stats">
          <span>{t.time}: <Timer seconds={seconds} /></span>
        </div>
        <button className="generate-btn" onClick={onNewGame}>{t.newGame}</button>
        <button className="generate-btn generate-btn--secondary" onClick={onShare} style={{ marginTop: 10 }}>
          {t.shareBtn}
        </button>
      </div>
    </div>
  );
}
