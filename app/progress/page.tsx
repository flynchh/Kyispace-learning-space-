import { AuthShell } from '@/components/app/auth-shell';
import { ProgressView } from '@/components/app/progress-view';

export default function ProgressPage() {
  return (
    <AuthShell>
      <ProgressView />
    </AuthShell>
  );
}
