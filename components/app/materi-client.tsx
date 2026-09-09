'use client';

import { useRouter } from 'next/navigation';
import { BookPage } from './book-page';

export function MateriClient() {
  const router = useRouter();
  return <BookPage onSelectTopic={(topic) => router.push(`/quiz/${encodeURIComponent(topic)}`)} />;
}
