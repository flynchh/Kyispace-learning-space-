import { getSession } from '@/lib/auth';
import { SmartLoginScreen } from '@/components/auth/smart-login-screen';
import { AppShell } from '@/components/app/app-shell';
import { Dashboard } from '@/components/dashboard/dashboard-page';

export default async function Home() {
  const session = await getSession();

  if (!session) {
    return <SmartLoginScreen />;
  }

  return (
    <AppShell userName={session.name} userRole={session.role}>
      <Dashboard />
    </AppShell>
  );
}
