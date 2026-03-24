import type { Lang } from '../constants/i18n';

interface Props {
  onSelect: (lang: Lang) => void;
}

const LANGS: { id: Lang; label: string; native: string; flag: string }[] = [
  { id: 'en', label: 'English',  native: 'English', flag: '🇬🇧' },
  { id: 'ar', label: 'Arabic',   native: 'العربية', flag: '🇮🇶' },
  { id: 'sv', label: 'Swedish',  native: 'Svenska',  flag: '🇸🇪' },
];

export default function WelcomeLanguagePicker({ onSelect }: Props) {
  return (
    <div className="welcome-overlay">
      <div className="welcome-card">
        <div className="welcome-icon">🧩</div>
        <h1 className="welcome-title">Sudoku</h1>
        <p className="welcome-subtitle">Choose your language</p>
        <div className="welcome-langs">
          {LANGS.map((l) => (
            <button
              key={l.id}
              className="welcome-lang-btn"
              onClick={() => onSelect(l.id)}
            >
              <span className="welcome-lang-flag">{l.flag}</span>
              <span className="welcome-lang-native">{l.native}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
