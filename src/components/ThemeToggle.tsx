import type { Theme } from '../hooks/useTheme';

interface ThemeToggleProps {
  theme: Theme;
  onCycle: () => void;
}

const ICONS: Record<Theme, string> = { light: '☀️', dark: '🌙', system: '💻' };

export default function ThemeToggle({ theme, onCycle }: ThemeToggleProps) {
  return (
    <button className="icon-btn" onClick={onCycle} aria-label={`Theme: ${theme}`} title={theme}>
      {ICONS[theme]}
    </button>
  );
}
