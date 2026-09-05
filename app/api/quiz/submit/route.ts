import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { QuizQuestion } from '@/types';

type SubmitRequestBody = {
  topic: string;
  difficulty: string;
  mode?: string;
  questions: QuizQuestion[];
  answers: (string | null)[];
  timeSpent: number;
};

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let body: SubmitRequestBody;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON body. Set Content-Type: application/json' },
        { status: 400 }
      );
    }

    const { topic, difficulty, mode = 'EXAM', questions, answers, timeSpent } = body;

    if (!topic || !difficulty || !Array.isArray(questions) || !Array.isArray(answers)) {
      return NextResponse.json(
        { error: 'topic, difficulty, questions, and answers are required' },
        { status: 400 }
      );
    }

    if (questions.length === 0 || questions.length !== answers.length) {
      return NextResponse.json(
        { error: 'questions and answers length mismatch or empty' },
        { status: 400 }
      );
    }

    let correctCount = 0;
    const wrongQuestions: Array<{
      index: number;
      question: string;
      options: { A: string; B: string; C: string; D: string };
      userAnswer: string | null;
      correctAnswer: string;
      explanation: string;
    }> = [];

    questions.forEach((q, index) => {
      const userAnswer = answers[index];
      if (userAnswer === q.correctAnswer) {
        correctCount++;
      } else {
        wrongQuestions.push({
          index,
          question: q.question,
          options: q.options,
          userAnswer,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation,
        });
      }
    });

    const totalQuestions = questions.length;
    const score = Math.round((correctCount / totalQuestions) * 100);
    const wrongCount = totalQuestions - correctCount;

    if (session.role === 'GUEST') {
      return NextResponse.json({
        sessionId: 'guest-session',
        score,
        correctCount,
        wrongCount,
        totalQuestions,
        wrongQuestions,
        streak: 0,
        guest: true,
      });
    }

    const quizSession = await prisma.quizSession.create({
      data: {
        userId: session.id,
        topic,
        difficulty,
        mode,
        score,
        totalQuestions,
        correctAnswers: correctCount,
        timeSpent: Math.max(0, Math.floor(timeSpent || 0)),
        questions: JSON.stringify(questions),
        answers: JSON.stringify(answers),
        completedAt: new Date(),
      },
    });

    let currentStreak = 1;
    const userSettings = await prisma.userSettings.findUnique({
      where: { userId: session.id },
    });

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    if (userSettings) {
      if (userSettings.lastStudyDate) {
        const lastStudy = new Date(userSettings.lastStudyDate);
        const lastStudyDay = new Date(
          lastStudy.getFullYear(),
          lastStudy.getMonth(),
          lastStudy.getDate()
        );

        const diffTime = today.getTime() - lastStudyDay.getTime();
        const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) {
          currentStreak = Math.max(1, userSettings.studyStreak);
        } else if (diffDays === 1) {
          currentStreak = userSettings.studyStreak + 1;
        } else {
          currentStreak = 1;
        }
      } else {
        currentStreak = 1;
      }

      await prisma.userSettings.update({
        where: { userId: session.id },
        data: {
          studyStreak: currentStreak,
          lastStudyDate: now,
        },
      });
    } else {
      await prisma.userSettings.create({
        data: {
          userId: session.id,
          studyStreak: 1,
          lastStudyDate: now,
        },
      });
    }

    return NextResponse.json({
      sessionId: quizSession.id,
      score,
      correctCount,
      wrongCount,
      totalQuestions,
      wrongQuestions,
      streak: currentStreak,
      guest: false,
    });
  } catch (error) {
    console.error('Quiz submit error:', error);
    return NextResponse.json(
      { error: 'Failed to submit quiz' },
      { status: 500 }
    );
  }
}
