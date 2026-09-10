import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

interface TopicProgress {
  status: 'new' | 'in_progress' | 'completed' | 'mastered';
  attempts: number;
  bestScore: number | null;
  lastAttempt: Date | null;
  percentage: number;
}

async function getUserTopicProgress(userId: string, topicName: string): Promise<TopicProgress> {
  const sessions = await prisma.quizSession.findMany({
    where: { userId, topic: topicName },
    orderBy: { createdAt: 'desc' },
  });

  if (sessions.length === 0) {
    return {
      status: 'new',
      attempts: 0,
      bestScore: null,
      lastAttempt: null,
      percentage: 0,
    };
  }

  const bestScore = Math.max(...sessions.map((s) => s.score));
  const lastAttempt = sessions[0].createdAt;

  let status: 'in_progress' | 'completed' | 'mastered';
  if (bestScore < 60) status = 'in_progress';
  else if (bestScore < 80) status = 'completed';
  else status = 'mastered';

  return {
    status,
    attempts: sessions.length,
    bestScore,
    lastAttempt,
    percentage: bestScore,
  };
}

async function calculateStreak(userId: string): Promise<number> {
  const sessions = await prisma.quizSession.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    select: { createdAt: true },
  });

  if (sessions.length === 0) return 0;

  let streak = 1;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const lastSession = new Date(sessions[0].createdAt);
  lastSession.setHours(0, 0, 0, 0);

  const daysDiff = Math.floor((today.getTime() - lastSession.getTime()) / (1000 * 60 * 60 * 24));
  
  if (daysDiff > 1) return 0;

  for (let i = 1; i < sessions.length; i++) {
    const current = new Date(sessions[i - 1].createdAt);
    const previous = new Date(sessions[i].createdAt);
    current.setHours(0, 0, 0, 0);
    previous.setHours(0, 0, 0, 0);

    const diff = Math.floor((current.getTime() - previous.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diff === 1) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

export async function GET() {
  try {
    const session = await getSession();

    const allTopics = await prisma.topic.findMany({
      orderBy: { order: 'asc' },
    });

    const progressData: Record<string, TopicProgress> = {};

    if (session) {
      for (const topic of allTopics) {
        progressData[topic.name] = await getUserTopicProgress(session.id, topic.name);
      }
    } else {
      for (const topic of allTopics) {
        progressData[topic.name] = {
          status: 'new',
          attempts: 0,
          bestScore: null,
          lastAttempt: null,
          percentage: 0,
        };
      }
    }

    const completedCount = Object.values(progressData).filter(
      (p) => p.status !== 'new'
    ).length;

    const scores = Object.values(progressData)
      .filter((p) => p.bestScore !== null)
      .map((p) => p.bestScore!);

    const avgScore =
      scores.length > 0
        ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
        : 0;

    const streak = session ? await calculateStreak(session.id) : 0;

    const overallProgress = {
      completed: completedCount,
      total: allTopics.length,
      percentage: Math.round((completedCount / allTopics.length) * 100),
      avgScore,
      streak,
    };

    return NextResponse.json({
      progressData,
      overallProgress,
    });
  } catch (error) {
    console.error('Progress API error:', error);
    return NextResponse.json({
      progressData: {},
      overallProgress: {
        completed: 0,
        total: 17,
        percentage: 0,
        avgScore: 0,
        streak: 0,
      },
    });
  }
}
