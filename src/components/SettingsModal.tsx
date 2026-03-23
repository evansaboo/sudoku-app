import type { Lang } from '../constants/i18n';
import { translations } from '../constants/i18n';
import type { DisplayMode } from '../constants/numberMappings';
import type { Theme } from '../hooks/useTheme';
import ModeSelector from './ModeSelector';
import LanguageSelector from './LanguageSelector';

interface SettingsModalProps {
  lang: Lang;
  displayMode: DisplayMode;
  theme: Theme;
  onLangChange: (l: Lang) => void;
  onModeChange: (m: DisplayMode) => void;
  onCycleTheme: () => void;
  onClose: () => void;
}

const THEME_ICONS: Record<Theme, string> = { light: '☀️', dark: '🌙', system: '💻' };
const THEME_ORDER: Theme[] = ['light', 'dark', 'system'];

export default function SettingsModal({
  lang, displayMode, theme,
  onLangChange, onModeChange, onCycleTheme, onClose,
}: SettingsModalProps) {
  const t = translations[lang];
  const nextTheme = THEME_ORDER[(THEME_ORDER.indexOf(theme) + 1) % 3];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{t.settings}</h2>
          <button className="modal-close icon-btn" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <div className="settings-groups">
          <div className="settings-group">
            <p className="settings-label">{t.language}</p>
            <LanguageSelector lang={lang} onChange={onLangChange} />
          </div>

          <div className="settings-group">
            <p className="settings-label">{t.numberStyle}</p>
            <ModeSelector mode={displayMode} onChange={onModeChange} />
          </div>

          <div className="settings-group">
            <p className="settings-label">{t.darkMode} / {t.lightMode}</p>
            <button
              className="theme-row-btn"
              onClick={onCycleTheme}
            >
              <span className="theme-row-icon">{THEME_ICONS[theme]}</span>
              <span className="theme-row-label">
                {theme === 'light' ? t.lightMode : theme === 'dark' ? t.darkMode : t.systemMode}
              </span>
              <span className="theme-row-next">→ {THEME_ICONS[nextTheme]}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
