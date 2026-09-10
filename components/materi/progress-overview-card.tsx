'use client';

import { motion } from 'framer-motion';

interface ProgressOverviewProps {
  completed: number;
  total: number;
  percentage: number;
  streak: number;
  avgScore: number;
}

export function ProgressOverviewCard({
  completed,
  total,
  percentage,
  streak,
  avgScore,
}: ProgressOverviewProps) {
  return (
    <motion.div
      className="glass-card p-4 sm:p-6"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-sm font-bold mb-3">📊 Progress Pembelajaran</h3>
      
      <div className="relative w-full h-3 rounded-full overflow-hidden mb-3" style={{ background: 'var(--surface)' }}>
        <motion.div
          className="absolute h-full bg-gradient-to-r from-accent to-purple-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>

      <div className="flex items-center justify-between text-xs sm:text-sm">
        <span className="flex items-center gap-1">
          ✅ <span className="font-semibold">{completed}/{total}</span> Topik
        </span>
        <span className="flex items-center gap-1">
          🔥 <span className="font-semibold">{streak}</span> Hari
        </span>
        <span className="flex items-center gap-1">
          ⭐ <span className="font-semibold">{avgScore}%</span>
        </span>
      </div>
    </motion.div>
  );
}
