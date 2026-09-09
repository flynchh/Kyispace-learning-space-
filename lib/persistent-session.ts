type QuickSession = {
  userId: string;
  name: string;
  timestamp: number;
};

export const persistentSession = {
  save(userId: string, name: string) {
    const session: QuickSession = {
      userId,
      name,
      timestamp: Date.now(),
    };
    localStorage.setItem('quick-session', JSON.stringify(session));
  },

  get(): QuickSession | null {
    if (typeof window === 'undefined') return null;
    
    const data = localStorage.getItem('quick-session');
    if (!data) return null;

    try {
      const session: QuickSession = JSON.parse(data);
      // Session expires after 30 days
      const thirtyDays = 30 * 24 * 60 * 60 * 1000;
      if (Date.now() - session.timestamp > thirtyDays) {
        this.clear();
        return null;
      }
      return session;
    } catch {
      return null;
    }
  },

  clear() {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('quick-session');
  },
};
