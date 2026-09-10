'use client';

import { useState, useEffect } from 'react';
import { MaterialDashboard } from '@/components/materi/material-dashboard';

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

export function MateriClient() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [progressData, setProgressData] = useState<Record<string, TopicProgress>>({});
  const [overallProgress, setOverallProgress] = useState({
    completed: 0,
    total: 17,
    percentage: 0,
    streak: 0,
    avgScore: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [topicsRes, progressRes] = await Promise.all([
          fetch('/api/topics'),
          fetch('/api/materi/progress'),
        ]);

        const topicsData = await topicsRes.json();
        const progressResponse = await progressRes.json();

        setTopics(topicsData.topics || []);
        setProgressData(progressResponse.progressData || {});
        setOverallProgress(progressResponse.overallProgress || {
          completed: 0,
          total: 17,
          percentage: 0,
          streak: 0,
          avgScore: 0,
        });
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4" />
          <p className="text-muted">Memuat materi...</p>
        </div>
      </div>
    );
  }

  return (
    <MaterialDashboard
      topics={topics}
      progressData={progressData}
      overallProgress={overallProgress}
    />
  );
}
