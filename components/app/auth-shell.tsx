import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { AppShell } from './app-shell';

export async function AuthShell({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect('/');
  return (
    <AppShell userName={session.name} userRole={session.role}>
      {children}
    </AppShell>
  );
}
