import type { Lang } from '../constants/i18n';

interface LanguageSelectorProps {
  lang: Lang;
  onChange: (l: Lang) => void;
}

const LANGS: { id: Lang; label: string }[] = [
  { id: 'en', label: 'EN' },
  { id: 'ar', label: 'AR' },
  { id: 'sv', label: 'SV' },
];

export default function LanguageSelector({ lang, onChange }: LanguageSelectorProps) {
  return (
    <div className="mode-selector lang-selector">
      {LANGS.map((l) => (
        <button key={l.id} className={`mode-btn mode-btn--sm${lang === l.id ? ' mode-btn--active' : ''}`} onClick={() => onChange(l.id)}>
          {l.label}
        </button>
      ))}
    </div>
  );
}
