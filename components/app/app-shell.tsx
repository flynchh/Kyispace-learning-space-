'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { BookOpen, Home, LogOut, TrendingUp, Volume2, VolumeX } from 'lucide-react';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { getGreeting } from '@/lib/personal-messages';
import { persistentSession } from '@/lib/persistent-session';
import { useSoundEffects } from '@/hooks/use-sound';

type AppShellProps = {
  userName: string;
  userRole: string;
  children: React.ReactNode;
};

const tabs = [
  { href: '/', label: 'Beranda', icon: Home },
  { href: '/materi', label: 'Buku', icon: BookOpen },
  { href: '/progress', label: 'Progress', icon: TrendingUp },
];

export function AppShell({ userName, userRole, children }: AppShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [greeting, setGreeting] = useState(`Halo, ${userName}`);
  const { isMuted, toggleMute } = useSoundEffects();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setGreeting(getGreeting(userName));
  }, [userName]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const res = await fetch('/api/auth/logout', { method: 'POST' });
      if (res.ok) {
        persistentSession.clear();
        router.refresh();
      } else {
        console.error('Logout failed');
        setIsLoggingOut(false);
      }
    } catch (error) {
      console.error('Logout error:', error);
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="app-shell">
      <header className="app-topbar">
        <div>
          <div className="flex items-center gap-2">
            {userRole === 'GUEST' && (
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Mode Tamu
              </span>
            )}
            {userRole === 'ADMIN' && (
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Admin
              </span>
            )}
          </div>
          <h1 className="app-greeting">{greeting}</h1>
        </div>
        <div className="app-topbar-actions">
          {mounted && (
            <button
              type="button"
              className="theme-toggle"
              onClick={toggleMute}
              aria-label={isMuted ? 'Nyalakan suara' : 'Matikan suara'}
              title={isMuted ? 'Suara Mati' : 'Suara Nyala'}
            >
              <span className="theme-toggle-icon">
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </span>
              <span className="theme-toggle-label">{isMuted ? 'Mute' : 'Sound'}</span>
            </button>
          )}
          <ThemeToggle />
          <button 
            type="button" 
            className="logout-btn" 
            onClick={handleLogout} 
            aria-label="Keluar"
            disabled={isLoggingOut}
          >
            <LogOut className="icon-small" />
            <span>{isLoggingOut ? 'Loading...' : 'Keluar'}</span>
          </button>
        </div>
      </header>

      <main className="app-main">{children}</main>

      <nav className="app-bottom-nav" aria-label="Navigasi utama">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = pathname === tab.href;
          return (
            <button
              key={tab.href}
              type="button"
              className={`nav-tab ${active ? 'is-active' : ''}`}
              onClick={() => router.push(tab.href)}
            >
              <Icon className="icon-small" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
