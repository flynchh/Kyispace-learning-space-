import { getSession } from '@/lib/auth';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { LoginScreen } from '@/components/auth/login-screen';

export default async function Home() {
  const session = await getSession();

  if (session) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
        <header className="absolute top-4 right-4 z-20">
          <ThemeToggle />
        </header>
        <section className="glass-card max-w-sm w-full p-6 text-center">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
            KYI SPACE · KSR IPA SMP
          </p>
          <h1 className="text-2xl font-bold mb-2">Halo, {session.name}! 👋</h1>
          <p className="text-sm text-muted-foreground mb-6">
            Kamu sudah terautentikasi. Dashboard siap dibangun di tahap berikutnya.
          </p>
          <div className="p-3 rounded-lg bg-black/20 text-xs border border-white/10 mb-4">
            Role: <span className="text-emerald-400 font-semibold">{session.role}</span> | Email: {session.email}
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen relative overflow-hidden">
      <ThemeToggle />
      <LoginScreen />
    </main>
  );
}
