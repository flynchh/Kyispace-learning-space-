'use client';

import { create } from 'zustand';

type Theme = 'space' | 'sky';

type ThemeStore = {
  theme: Theme;
  hydrated: boolean;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  hydrate: () => void;
};

export const useThemeStore = create<ThemeStore>((set, get) => ({
  theme: 'space',
  hydrated: false,
  setTheme: (theme) => {
    localStorage.setItem('kyi-theme', theme);
    set({ theme });
  },
  toggleTheme: () => {
    get().setTheme(get().theme === 'space' ? 'sky' : 'space');
  },
  hydrate: () => {
    const savedTheme = localStorage.getItem('kyi-theme');
    set({
      theme: savedTheme === 'sky' ? 'sky' : 'space',
      hydrated: true,
    });
  },
}));
