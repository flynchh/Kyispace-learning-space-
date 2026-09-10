'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useThemeStore } from '@/lib/theme-store';
import { getStudyContent } from '@/lib/study-content';
import { SearchBar } from './search-bar';
import { FilterDropdown } from './filter-dropdown';
import { ProgressOverviewCard } from './progress-overview-card';
import { TopicCard } from './topic-card';
import { TopicDetailModal } from './topic-detail-modal';

interface Topic {
  id: string;
  name: string;
  category: string;
  icon: string;
  order: number;
}

interface TopicProgress {
  status: 'new' | 'in_progress' | 'completed' | 'mastered';
  attempts: number;
  bestScore: number | null;
  lastAttempt: Date | null;
  percentage: number;
}

interface MaterialDashboardProps {
  topics: Topic[];
  progressData: Record<string, TopicProgress>;
  overallProgress: {
    completed: number;
    total: number;
    percentage: number;
    streak: number;
    avgScore: number;
  };
}

export function MaterialDashboard({ topics, progressData, overallProgress }: MaterialDashboardProps) {
  const { theme, hydrated } = useThemeStore();
  const isSpace = !hydrated || theme === 'space';

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  const filteredTopics = topics.filter((topic) => {
    const matchesSearch = topic.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || topic.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleTopicClick = (topic: Topic) => {
    setSelectedTopic(topic);
  };

  const handleCloseModal = () => {
    setSelectedTopic(null);
  };

  return (
    <div className={`material-dashboard ${isSpace ? 'theme-space' : 'theme-sky'}`}>
      <div className="dashboard-header">
        <motion.h1
          className="dashboard-title"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Kiyaa Learning Space
        </motion.h1>
        <p className="dashboard-subtitle" style={{ color: 'var(--muted)' }}>Pilih topik untuk mulai belajar</p>
      </div>

      <div className="dashboard-controls">
        <div className="search-wrapper">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>
        <div className="filter-wrapper">
          <FilterDropdown value={categoryFilter} onChange={setCategoryFilter} />
        </div>
      </div>

      <ProgressOverviewCard {...overallProgress} />

      <motion.div
        className="topics-grid"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05 },
          },
        }}
      >
        {filteredTopics.map((topic) => (
          <TopicCard
            key={topic.id}
            topic={topic}
            progress={progressData[topic.name] || {
              status: 'new',
              attempts: 0,
              bestScore: null,
              lastAttempt: null,
              percentage: 0,
            }}
            onClick={() => handleTopicClick(topic)}
          />
        ))}
      </motion.div>

      {filteredTopics.length === 0 && (
        <motion.div
          className="empty-state"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-muted text-center py-12">
            Tidak ada topik yang cocok dengan pencarian "{searchQuery}"
          </p>
        </motion.div>
      )}

      {selectedTopic && (
        <TopicDetailModal
          topic={selectedTopic}
          content={getStudyContent(selectedTopic.name)!}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
