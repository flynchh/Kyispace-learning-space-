'use client';

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
      return <span className="status-badge status-new">🆕 Belum Mulai</span>;
    }
    if (progress.status === 'mastered') {
      return <span className="status-badge status-mastered">🏆 Master</span>;
    }
    if (progress.status === 'completed') {
      return <span className="status-badge status-completed">✅ Lulus</span>;
    }
    return <span className="status-badge status-progress">⚡ Dalam Proses</span>;
  };

  const getProgressColor = () => {
    if (progress.percentage >= 80) return 'from-emerald-400 to-green-500';
    if (progress.percentage >= 60) return 'from-cyan-400 to-blue-500';
    if (progress.percentage >= 40) return 'from-amber-400 to-orange-500';
    return 'from-rose-400 to-red-500';
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

      {/* Progress Section */}
      <div className="card-progress-section">
        <div className="flex justify-between items-center text-xs mb-1.5 font-semibold">
          <span className="text-[var(--muted)]">Penguasaan</span>
          <span className="font-bold text-[var(--accent)]">{progress.percentage}%</span>
        </div>
        <div className="progress-track">
          <motion.div
            className={`progress-fill bg-gradient-to-r ${getProgressColor()}`}
            initial={{ width: 0 }}
            animate={{ width: `${Math.max(progress.percentage, 2)}%` }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Stats Badges */}
      <div className="card-stats mt-3">
        {getStatusBadge()}
        {progress.attempts > 0 ? (
          <span className="score-badge">📝 {progress.attempts}x Kuis</span>
        ) : (
          <span className="score-badge">📚 15 Soal</span>
        )}
        {progress.bestScore !== null && (
          <span className="score-badge">⭐ Best: {progress.bestScore}%</span>
        )}
      </div>

      {/* Actions */}
      <div className="card-actions mt-4">
        <button
          type="button"
          className="btn-study"
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          📖 Belajar
        </button>
        <button
          type="button"
          className="btn-quiz"
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          🎯 Quiz
        </button>
      </div>
    </motion.div>
  );
}
