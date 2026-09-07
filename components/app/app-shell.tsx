'use client';

import { usePathname, useRouter } from 'next/navigation';
import { BookOpen, Home, LogOut, TrendingUp } from 'lucide-react';
import { ThemeToggle } from '@/components/theme/theme-toggle';

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

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.refresh();
  };

  return (
    <div className="app-shell">
      <header className="app-topbar">
        <div>
          <div className="flex items-center gap-2">
            <p className="app-kicker">KYI SPACE</p>
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
          <h1 className="app-greeting">Halo, {userName} ✨</h1>
        </div>
        <div className="app-topbar-actions">
          <ThemeToggle />
          <button type="button" className="logout-btn" onClick={handleLogout} aria-label="Keluar">
            <LogOut className="icon-small" />
            <span>Keluar</span>
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
