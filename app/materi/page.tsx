import { AuthShell } from '@/components/app/auth-shell';
import { MateriClient } from '@/components/app/materi-client';

export default function MateriPage() {
  return (
    <AuthShell>
      <MateriClient />
    </AuthShell>
  );
}
