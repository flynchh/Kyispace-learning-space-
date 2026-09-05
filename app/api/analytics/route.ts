import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (session.role === 'GUEST') {
      return NextResponse.json({
        totalQuizzes: 0,
        averageScore: 0,
        studyStreak: 0,
        topicMastery: {},
        weakAreas: [],
        recentSessions: [],
        guest: true,
      });
    }

    const [sessions, settings, allTopics] = await Promise.all([
      prisma.quizSession.findMany({
        where: { userId: session.id },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.userSettings.findUnique({
        where: { userId: session.id },
      }),
      prisma.topic.findMany({
        select: { name: true },
      }),
    ]);

    const totalQuizzes = sessions.length;
    const averageScore =
      totalQuizzes > 0
        ? Math.round(sessions.reduce((sum, s) => sum + s.score, 0) / totalQuizzes)
        : 0;

    const topicScores: Record<string, number[]> = {};
    sessions.forEach((s) => {
      if (!topicScores[s.topic]) {
        topicScores[s.topic] = [];
      }
      topicScores[s.topic].push(s.score);
    });

    const topicMastery: Record<string, number> = {};
    Object.entries(topicScores).forEach(([topic, scores]) => {
      const avg = scores.reduce((sum, val) => sum + val, 0) / scores.length;
      topicMastery[topic] = Math.round(avg);
    });

    const weakAreas = Object.entries(topicMastery)
      .filter(([, avg]) => avg < 70)
      .map(([topic]) => topic);

    const recentSessions = sessions.slice(0, 5).map((s) => ({
      id: s.id,
      topic: s.topic,
      difficulty: s.difficulty,
      mode: s.mode,
      score: s.score,
      totalQuestions: s.totalQuestions,
      correctAnswers: s.correctAnswers,
      timeSpent: s.timeSpent,
      createdAt: s.createdAt,
    }));

    return NextResponse.json({
      totalQuizzes,
      averageScore,
      studyStreak: settings?.studyStreak || 0,
      topicMastery,
      weakAreas,
      allTopicsCount: allTopics.length,
      recentSessions,
      guest: false,
    });
  } catch (error) {
    console.error('Analytics fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}
