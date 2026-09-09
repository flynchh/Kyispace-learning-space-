import { AuthShell } from '@/components/app/auth-shell';
import { QuizClient } from '@/components/quiz/quiz-client';

interface QuizPageProps {
  params: Promise<{ topic: string }>;
}

export default async function QuizPage({ params }: QuizPageProps) {
  const { topic } = await params;
  return (
    <AuthShell>
      <QuizClient topic={decodeURIComponent(topic)} />
    </AuthShell>
  );
}
