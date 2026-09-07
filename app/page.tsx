import { getSession } from '@/lib/auth';
import { LoginScreen } from '@/components/auth/login-screen';
import { AppShell } from '@/components/app/app-shell';

export default async function Home() {
  const session = await getSession();

  if (!session) {
    return <LoginScreen />;
  }

  return (
    <AppShell userName={session.name} userRole={session.role}>
      <section className="dashboard-content">
        <div className="glass-card p-6 text-center">
          <p className="text-xs uppercase tracking-widest text-muted mb-2">
            KYI SPACE · KSR IPA SMP
          </p>
          <h2 className="text-2xl font-bold mb-2">Halo, {session.name}! 👋</h2>
          <p className="text-sm text-muted mb-4">
            Kamu berhasil masuk. Layar Beranda, Buku Materi, dan Progress siap dibangun di tahap berikutnya.
          </p>
          <div className="p-3 rounded-lg bg-black/20 text-xs border border-white/10">
            Role: <span className="text-accent font-semibold">{session.role}</span> | Email: {session.email}
          </div>
        </div>
      </section>
    </AppShell>
  );
}
