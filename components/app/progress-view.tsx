'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AlertCircle, Award, Flame, Target, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { PandaReaction } from '@/components/mascot/panda-reaction';

interface AnalyticsData {
  totalQuizzes: number;
  averageScore: number;
  studyStreak: number;
  topicMastery: Record<string, number>;
  weakAreas: string[];
}

export function ProgressView() {
  const router = useRouter();
  const [data, setData] = useState<AnalyticsData | null>(null);
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
      <div className="flex items-center justify-center min-h-[50vh]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        >
          <PandaReaction type="thinking" size="lg" />
        </motion.div>
      </div>
    );
  }

  if (!data) {
    return <p className="empty-state glass-card">Error loading progress</p>;
  }

  return (
    <div className="progress-container">
      <div className="progress-header">
        <h2>Progress Belajar Kiyaa</h2>
        <p>Statistik evaluasi latihan kamu</p>
      </div>

      <div className="stats-row">
        <motion.article 
          className="stat-card glass-card"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="stat-icon"><Flame className="w-4 h-4" /></div>
          <div className="stat-value">{data.studyStreak}</div>
          <div className="stat-label">Streak</div>
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
          <div className="stat-label">Rata-rata</div>
        </motion.article>
        <motion.article 
          className="stat-card glass-card"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="stat-icon"><Award className="w-4 h-4" /></div>
          <div className="stat-value">{data.totalQuizzes}</div>
          <div className="stat-label">Total Kuis</div>
        </motion.article>
      </div>

      {data.weakAreas.length > 0 && (
        <motion.div 
          className="weak-box glass-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="weak-title">
            <AlertCircle className="w-4 h-4" />
            <h3>Perlu ditingkatkan</h3>
          </div>
          <p>Materi dengan skor di bawah 70%. Klik untuk latihan lagi yuk! 🐼</p>
          <div className="weak-tags">
            {data.weakAreas.map((area, index) => (
              <motion.button
                key={area}
                className="weak-tag"
                onClick={() => router.push(`/quiz/${encodeURIComponent(area)}`)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                {area}
                <ArrowRight className="w-3 h-3 ml-1" />
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      <div className="mastery-box glass-card">
        <h3>Penguasaan materi</h3>
        {Object.keys(data.topicMastery).length === 0 ? (
          <p>Belum ada data penguasaan. Selesaikan kuis dulu.</p>
        ) : (
          Object.entries(data.topicMastery).map(([topic, score]) => (
            <div key={topic} className="mastery-row">
              <div>
                <span>{topic}</span>
                <strong className={score >= 70 ? 'is-good' : 'is-need'}>{score}%</strong>
              </div>
              <div className="mastery-bar">
                <i className={score >= 70 ? 'is-good' : 'is-need'} style={{ width: `${score}%` }} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
