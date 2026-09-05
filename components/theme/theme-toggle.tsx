'use client';

import { useThemeStore } from '@/lib/theme-store';

export function ThemeToggle() {
  const { theme, hydrated, toggleTheme } = useThemeStore();
  const isSpace = !hydrated || theme === 'space';

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={isSpace ? 'Ganti ke tema langit' : 'Ganti ke tema angkasa'}
      title={isSpace ? 'Sky Realm' : 'Space Realm'}
    >
      <span className={`theme-toggle-icon ${isSpace ? 'is-space' : 'is-sky'}`}>
        {isSpace ? '☾' : '☀'}
      </span>
      <span className="theme-toggle-label">{isSpace ? 'Space' : 'Sky'}</span>
    </button>
  );
}
