'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useThemeStore } from '@/lib/theme-store';

interface TopicProgress {
  status: 'new' | 'in_progress' | 'completed' | 'mastered';
  attempts: number;
  bestScore: number | null;
  lastAttempt: Date | null;
  percentage: number;
}

interface TopicCardProps {
  topic: {
    id: string;
    name: string;
    icon: string;
    category: string;
  };
  progress: TopicProgress;
  onClick: () => void;
}

export function TopicCard({ topic, progress, onClick }: TopicCardProps) {
  const { theme, hydrated } = useThemeStore();
  const isSpace = !hydrated || theme === 'space';

  const getStatusBadge = () => {
    if (progress.status === 'new') {
      return <span className="status-badge status-new">🆕 Baru</span>;
    }
    if (progress.status === 'mastered') {
      return <span className="status-badge status-mastered">🏆 Master</span>;
    }
    if (progress.status === 'completed') {
      return <span className="status-badge status-completed">✅ Lulus</span>;
    }
    return <span className="status-badge status-progress">⚠️ Progress</span>;
  };

  const getProgressColor = () => {
    if (progress.percentage >= 80) return 'from-emerald-500 to-green-500';
    if (progress.percentage >= 60) return 'from-cyan-500 to-blue-500';
    if (progress.percentage >= 40) return 'from-amber-500 to-orange-500';
    return 'from-rose-500 to-red-500';
  };

  return (
    <motion.div
      className={`topic-card-new ${isSpace ? 'theme-space' : 'theme-sky'}`}
      onClick={onClick}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="card-header">
        <span className="card-emoji">{topic.icon}</span>
        <span className="card-category">{topic.category}</span>
      </div>

      <h3 className="card-title">{topic.name}</h3>

      {progress.status !== 'new' && (
        <>
          <div className="progress-container">
            <div className="progress-track">
              <motion.div
                className={`progress-fill bg-gradient-to-r ${getProgressColor()}`}
                initial={{ width: 0 }}
                animate={{ width: `${progress.percentage}%` }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />
            </div>
            <span className="progress-text">{progress.percentage}%</span>
          </div>

          <div className="card-stats">
            {getStatusBadge()}
            {progress.bestScore !== null && (
              <span className="score-badge">⭐ {progress.bestScore}%</span>
            )}
          </div>
        </>
      )}

      {progress.status === 'new' && (
        <div className="card-stats">
          {getStatusBadge()}
        </div>
      )}

      <div className="card-actions">
        <button className="btn-study">📖 Belajar</button>
        <button className="btn-quiz">🎯 Quiz</button>
      </div>
    </motion.div>
  );
}
