'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Flame, Target, Clock, RotateCcw, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { PandaReaction } from '@/components/mascot/panda-reaction';
import { relativeTime } from '@/lib/personal-messages';

interface QuizResult {
  id: string;
  topic: string;
  difficulty: string;
  mode: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number;
  createdAt: string;
}

interface DashboardData {
  totalQuizzes: number;
  averageScore: number;
  studyStreak: number;
  recentSessions: QuizResult[];
}

export function Dashboard() {
  const router = useRouter();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/analytics')
      .then((r) => r.json())
      .then(setData)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="dashboard-loading">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        >
          <PandaReaction type="thinking" size="lg" />
        </motion.div>
        <p className="text-sm text-muted mt-3">Loading...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="dashboard-loading">
        <p>Error loading data</p>
      </div>
    );
  }

  return (
    <div className="dashboard-grid">
      <section className="stats-row">
        <motion.article 
          className="stat-card glass-card"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="stat-icon">
            <motion.div
              animate={{
                rotate: [0, -10, 10, 0],
                scale: [1, 1.15, 1],
              }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Flame className="w-4 h-4" />
            </motion.div>
          </div>
          <motion.div 
            className="stat-value"
            key={data.studyStreak}
            initial={{ scale: 1.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring' }}
          >
            {data.studyStreak}
          </motion.div>
          <div className="stat-label">Hari Berturut-turut</div>
          {data.studyStreak >= 7 && (
            <motion.div
              className="text-[10px] text-accent mt-1"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
            >
              🎉 Konsisten banget Kiya!
            </motion.div>
          )}
        </motion.article>
        <motion.article 
          className="stat-card glass-card"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="stat-icon"><Target className="w-4 h-4" /></div>
          <div className="stat-value">{data.averageScore}%</div>
          <div className="stat-label">Rata-rata Skor</div>
        </motion.article>
        <motion.article 
          className="stat-card glass-card"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="stat-icon"><Clock className="w-4 h-4" /></div>
          <div className="stat-value">{data.totalQuizzes}</div>
          <div className="stat-label">Kuis Selesai</div>
        </motion.article>
      </section>

      <section className="activity-section">
        <h3 className="section-title">Aktivitas Terakhir</h3>
        {data.recentSessions.length === 0 ? (
          <motion.div 
            className="empty-state glass-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <BookOpen className="w-16 h-16 text-accent mx-auto mb-4" />
            </motion.div>
            <p className="text-sm mb-4">Belum ada aktivitas nih, Kiya!</p>
            <motion.button
              className="px-4 py-2 rounded-lg bg-accent text-black font-bold text-sm"
              onClick={() => router.push('/materi')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Mulai dari Buku Materi! 🚀
            </motion.button>
          </motion.div>
        ) : (
          <ul className="activity-list">
            {data.recentSessions.map((s: QuizResult, index: number) => (
              <motion.li 
                key={s.id} 
                className="activity-item glass-card"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="activity-info">
                  <span className="activity-topic">{s.topic}</span>
                  <span className="activity-meta">
                    {s.difficulty} &middot; {s.mode} &middot; {relativeTime(s.createdAt)}
                  </span>
                </div>
                <div className="activity-score">
                  <span className={`score-badge ${s.score >= 70 ? 'score-good' : 'score-need'}`}>
                    {s.score}%
                  </span>
                </div>
              </motion.li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
