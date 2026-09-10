'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useThemeStore } from '@/lib/theme-store';
import { StudyContentSections } from './study-content-sections';
import type { StudyContent } from '@/lib/study-content';

interface TopicDetailModalProps {
  topic: {
    name: string;
    icon: string;
    category: string;
  };
  content: StudyContent;
  onClose: () => void;
}

export function TopicDetailModal({ topic, content, onClose }: TopicDetailModalProps) {
  const router = useRouter();
  const { theme, hydrated } = useThemeStore();
  const isSpace = !hydrated || theme === 'space';

  const handleStartQuiz = (mode?: 'study') => {
    const url = mode 
      ? `/quiz/${encodeURIComponent(topic.name)}?mode=study`
      : `/quiz/${encodeURIComponent(topic.name)}`;
    router.push(url);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className={`study-modal ${isSpace ? 'theme-space' : 'theme-sky'}`}
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-header">
            <button
              type="button"
              className="modal-back-btn"
              onClick={onClose}
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Kembali</span>
            </button>

            <div className="modal-title-group">
              <span className="modal-icon">{topic.icon}</span>
              <div>
                <h2 className="modal-title">{topic.name}</h2>
                <span className="modal-category">[{topic.category}]</span>
              </div>
            </div>

            <button
              type="button"
              className="modal-close-btn"
              onClick={onClose}
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="modal-body">
            <StudyContentSections content={content} />
          </div>

          <div className="modal-footer">
            <motion.button
              type="button"
              className="btn-modal btn-study-mode"
              onClick={() => handleStartQuiz('study')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="btn-icon">📖</span>
              <div className="btn-content">
                <span className="btn-label">Mode Belajar</span>
                <span className="btn-desc">Lihat penjelasan langsung</span>
              </div>
            </motion.button>

            <motion.button
              type="button"
              className="btn-modal btn-quiz-mode"
              onClick={() => handleStartQuiz()}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="btn-icon">🎯</span>
              <div className="btn-content">
                <span className="btn-label">Mulai Quiz</span>
                <span className="btn-desc">15 soal latihan</span>
              </div>
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
