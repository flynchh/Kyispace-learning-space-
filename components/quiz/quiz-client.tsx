'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Zap, BookOpen, Flame } from 'lucide-react';
import { motion } from 'framer-motion';
import { QuizInterface } from '@/components/quiz/quiz-interface';
import { ResultPage } from '@/components/results/result-page';
import { PandaReaction } from '@/components/mascot/panda-reaction';
import { jeyaMessages, randomPick } from '@/lib/personal-messages';

interface Question {
  question: string;
  options: { A: string; B: string; C: string; D: string };
  correctAnswer: string;
  explanation: string;
}

interface QuizResult {
  topic: string;
  difficulty: string;
  score: number;
  correctCount: number;
  totalQuestions: number;
  wrongQuestions: Array<{
    question: string;
    options: { A: string; B: string; C: string; D: string };
    userAnswer: string | null;
    correctAnswer: string;
    explanation: string;
  }>;
}

interface QuizClientProps {
  topic: string;
}

const difficulties = [
  { name: 'EASY', label: 'Mudah', desc: 'Konsep dasar, tanpa timer', color: 'from-emerald-500/20 to-green-500/20' },
  { name: 'MEDIUM', label: 'Sedang', desc: 'Pemahaman konsep & aplikasi', color: 'from-amber-500/20 to-orange-500/20' },
  { name: 'HARD', label: 'Sulit', desc: 'Analisis & penalaran KSR', color: 'from-rose-500/20 to-red-500/20' },
  { name: 'INSANE', label: 'Gila', desc: '15 soal, 10 detik tiap soal', color: 'from-purple-500/20 to-violet-500/20' },
];

export function QuizClient({ topic }: QuizClientProps) {
  const router = useRouter();
  const [phase, setPhase] = useState<'select-difficulty' | 'select-mode' | 'loading' | 'quiz' | 'result'>('select-difficulty');
  const [difficulty, setDifficulty] = useState('');
  const [mode, setMode] = useState<'STUDY' | 'EXAM'>('EXAM');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [error, setError] = useState('');

  const startQuiz = async (selectedDifficulty: string, selectedMode: 'STUDY' | 'EXAM') => {
    setDifficulty(selectedDifficulty);
    setMode(selectedMode);
    setPhase('loading');
    setError('');

    try {
      const res = await fetch('/api/quiz/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, difficulty: selectedDifficulty }),
      });
      const data = await res.json();

      if (!res.ok || !data.questions) {
        setError(data.error || 'Gagal generate soal. Coba lagi ya.');
        setPhase('select-difficulty');
        return;
      }

      setQuestions(data.questions);
      setPhase('quiz');
    } catch {
      setError('Gagal generate soal. Cek koneksi internet ya.');
      setPhase('select-difficulty');
    }
  };

  const handleQuizComplete = async (answers: (string | null)[], timeSpent: number) => {
    let correctCount = 0;
    const wrongQuestions: QuizResult['wrongQuestions'] = [];

    questions.forEach((q, i) => {
      if (answers[i] === q.correctAnswer) {
        correctCount++;
      } else {
        wrongQuestions.push({
          question: q.question,
          options: q.options,
          userAnswer: answers[i],
          correctAnswer: q.correctAnswer,
          explanation: q.explanation,
        });
      }
    });

    const score = Math.round((correctCount / questions.length) * 100);

    // Submit to server
    try {
      await fetch('/api/quiz/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          difficulty,
          mode,
          questions,
          answers,
          timeSpent,
        }),
      });
    } catch {
      // Still show results even if submit fails
    }

    setResult({
      topic,
      difficulty,
      score,
      correctCount,
      totalQuestions: questions.length,
      wrongQuestions,
    });
    setPhase('result');
  };

  // Loading screen
  if (phase === 'loading') {
    return (
      <div className="quiz-loading">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <PandaReaction type="thinking" size="lg" />
        </motion.div>

        <motion.h2
          className="text-xl font-bold mt-4"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Bentar ya Kiya...
        </motion.h2>

        <div className="thinking-dots flex gap-1 mt-2">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-2 h-2 bg-accent rounded-full"
              animate={{
                y: [0, -10, 0],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>

        <motion.p
          className="text-xs text-muted mt-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {randomPick(jeyaMessages.loading)}
        </motion.p>
      </div>
    );
  }

  // Difficulty selection
  if (phase === 'select-difficulty') {
    return (
      <div className="quiz-select-container space-y-4">
        <div className="quiz-select-header">
          <h2 className="text-xl font-bold">{topic}</h2>
          <p className="text-xs text-muted">Pilih tingkat kesulitan</p>
        </div>

        {error && (
          <div className="glass-card p-3 bg-rose-500/10 border-rose-500/30 text-rose-400 text-xs text-center">
            {error}
          </div>
        )}

        <div className="space-y-3">
          {difficulties.map((d) => (
            <button
              key={d.name}
              type="button"
              onClick={() => { setDifficulty(d.name); setPhase('select-mode'); }}
              className={`w-full glass-card bg-gradient-to-r ${d.color} text-left p-4 hover:scale-[1.02] transition-transform`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold">{d.label}</h3>
                  <p className="text-xs text-muted">{d.desc}</p>
                </div>
                {d.name === 'INSANE' && <Flame className="w-5 h-5 text-purple-400" />}
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Mode selection (Study vs Exam)
  if (phase === 'select-mode') {
    return (
      <div className="quiz-select-container space-y-4">
        <div className="quiz-select-header">
          <h2 className="text-xl font-bold">{topic} — {difficulties.find((d) => d.name === difficulty)?.label}</h2>
          <p className="text-xs text-muted">Pilih mode belajar</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => startQuiz(difficulty, 'STUDY')}
            className="glass-card bg-gradient-to-br from-cyan-500/20 to-blue-500/20 p-4 text-center hover:scale-[1.02] transition-transform"
          >
            <BookOpen className="w-6 h-6 text-accent mx-auto mb-2" />
            <h3 className="text-sm font-bold">Study</h3>
            <p className="text-[10px] text-muted mt-1">Langsung lihat penjelasan tiap soal</p>
          </button>

          <button
            type="button"
            onClick={() => startQuiz(difficulty, 'EXAM')}
            className="glass-card bg-gradient-to-br from-amber-500/20 to-orange-500/20 p-4 text-center hover:scale-[1.02] transition-transform"
          >
            <Zap className="w-6 h-6 text-amber-400 mx-auto mb-2" />
            <h3 className="text-sm font-bold">Exam</h3>
            <p className="text-[10px] text-muted mt-1">Seperti ujian sesungguhnya</p>
          </button>
        </div>
      </div>
    );
  }

  // Quiz active
  if (phase === 'quiz') {
    return (
      <QuizInterface
        topic={topic}
        difficulty={difficulty}
        mode={mode}
        questions={questions}
        onComplete={handleQuizComplete}
        onExit={() => router.push('/')}
      />
    );
  }

  // Results
  if (phase === 'result' && result) {
    return (
      <ResultPage
        result={result}
        onRestart={() => { setPhase('select-difficulty'); setQuestions([]); setResult(null); }}
        onBack={() => router.push('/materi')}
      />
    );
  }

  return null;
}
