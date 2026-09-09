'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSwipe } from '@/hooks/use-swipe';
import { useSoundEffects } from '@/hooks/use-sound';

const chapters = [
  {
    title: 'Biologi',
    emoji: '🧬',
    color: '#10b981',
    topics: [
      { name: 'Bioteknologi', emoji: '🧬' },
      { name: 'Ekologi', emoji: '🌿' },
      { name: 'Keanekaragaman Makhluk Hidup', emoji: '🦋' },
      { name: 'Makhluk Hidup & Lingkungannya', emoji: '🌍' },
      { name: 'Molekuler, Sel & Organisme', emoji: '🔬' },
      { name: 'Organisasi Kehidupan', emoji: '🧫' },
      { name: 'Pewarisan Sifat', emoji: '👨‍👩‍👧' },
      { name: 'Sistem Manusia & Hewan', emoji: '🫁' },
    ],
  },
  {
    title: 'Fisika',
    emoji: '⚡',
    color: '#f59e0b',
    topics: [
      { name: 'Besaran, Satuan & Pengukuran', emoji: '📏' },
      { name: 'Zat & Kalor', emoji: '🌡️' },
      { name: 'Energi', emoji: '⚡' },
      { name: 'Gerak & Gaya', emoji: '🎯' },
      { name: 'Fluida', emoji: '💧' },
      { name: 'Getaran, Gelombang & Bunyi', emoji: '🔊' },
      { name: 'Cahaya & Optik', emoji: '💡' },
      { name: 'Kelistrikan & Kemagnetan', emoji: '🔌' },
    ],
  },
  {
    title: 'IPBA',
    emoji: '🪐',
    color: '#8b5cf6',
    topics: [
      { name: 'Bumi & Antariksa', emoji: '🪐' },
    ],
  },
];

interface BookPageProps {
  onSelectTopic: (topic: string) => void;
}

export function BookPage({ onSelectTopic }: BookPageProps) {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const chapter = chapters[page];
  const { playPageFlip } = useSoundEffects();

  const goToNext = () => {
    if (page < chapters.length - 1) {
      setDirection(1);
      playPageFlip();
      setPage(page + 1);
    }
  };

  const goToPrev = () => {
    if (page > 0) {
      setDirection(-1);
      playPageFlip();
      setPage(page - 1);
    }
  };

  const swipeHandlers = useSwipe({
    onSwipeLeft: goToNext,
    onSwipeRight: goToPrev,
    minSwipeDistance: 50,
  });

  const pageVariants = {
    enter: (direction: number) => ({
      rotateY: direction > 0 ? 180 : -180,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      rotateY: direction > 0 ? -180 : 180,
      opacity: 0,
      scale: 0.8,
    }),
  };

  return (
    <div className="book-wrapper" {...swipeHandlers}>
      <div className="book-header-new">
        <h2 className="text-xl font-bold">📚 Buku Materi KSR</h2>
        <p className="text-xs text-muted mt-1">Pilih topik untuk mulai latihan</p>
      </div>

      <div className="book-physical">
        {/* Book Spine */}
        <div className="book-spine" />

        {/* Page Container with Perspective */}
        <div className="book-page-container">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={page}
              custom={direction}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                rotateY: { type: 'spring', stiffness: 80, damping: 20 },
                opacity: { duration: 0.4 },
                scale: { duration: 0.4 },
              }}
              className="book-page"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Page Header */}
              <div className="page-header">
                <motion.div
                  className="chapter-emoji"
                  animate={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  {chapter.emoji}
                </motion.div>
                <h3 className="chapter-title" style={{ color: chapter.color }}>
                  {chapter.title}
                </h3>
                <p className="chapter-count">{chapter.topics.length} Topik Materi</p>
              </div>

              {/* Topic List */}
              <motion.div
                className="topic-list-new"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: { staggerChildren: 0.08, delayChildren: 0.3 },
                  },
                }}
              >
                {chapter.topics.map((topic, index) => (
                  <motion.button
                    key={topic.name}
                    type="button"
                    className="topic-item-new"
                    onClick={() => onSelectTopic(topic.name)}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 },
                    }}
                    whileHover={{ 
                      scale: 1.02, 
                      x: 8,
                      transition: { type: 'spring', stiffness: 300 }
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.span 
                      className="topic-emoji"
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      {topic.emoji}
                    </motion.span>
                    <span className="topic-name-new">{topic.name}</span>
                    <span className="topic-arrow">→</span>
                  </motion.button>
                ))}
              </motion.div>

              {/* Page Number */}
              <div className="page-number">
                Halaman {page + 1}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Book Shadow */}
        <div className="book-shadow" />
      </div>

      {/* Navigation */}
      <div className="book-nav-new">
        <motion.button
          type="button"
          onClick={goToPrev}
          disabled={page === 0}
          className="book-nav-btn-new"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Sebelumnya</span>
        </motion.button>

        <div className="page-indicator">
          {chapters.map((_, idx) => (
            <motion.button
              key={idx}
              className={`page-dot ${idx === page ? 'active' : ''}`}
              onClick={() => {
                setDirection(idx > page ? 1 : -1);
                setPage(idx);
              }}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>

        <motion.button
          type="button"
          onClick={goToNext}
          disabled={page === chapters.length - 1}
          className="book-nav-btn-new"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>Selanjutnya</span>
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
}
