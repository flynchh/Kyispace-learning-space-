'use client';

import { useEffect } from 'react';
import { useThemeStore } from '@/lib/theme-store';
import { SkyBackground } from './sky-background';
import { SpaceBackground } from './space-background';

type ThemeProviderProps = {
  children: React.ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { theme, hydrated, hydrate } = useThemeStore();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return (
    <div className={`theme-shell theme-${hydrated ? theme : 'space'}`}>
      {hydrated ? theme === 'space' ? <SpaceBackground /> : <SkyBackground /> : <SpaceBackground />}
      <div className="theme-content">{children}</div>
    </div>
  );
}
