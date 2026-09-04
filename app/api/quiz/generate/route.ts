import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { generateQuiz } from '@/lib/ai';
import { Difficulty } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { topic, difficulty } = await request.json();

    if (!topic || !difficulty) {
      return NextResponse.json(
        { error: 'Topic and difficulty are required' },
        { status: 400 }
      );
    }

    const validDifficulties = ['EASY', 'MEDIUM', 'HARD', 'INSANE'];
    if (!validDifficulties.includes(difficulty)) {
      return NextResponse.json(
        { error: 'Invalid difficulty level' },
        { status: 400 }
      );
    }

    const questions = await generateQuiz(topic, difficulty as Difficulty, 15);

    return NextResponse.json({ questions });
  } catch (error) {
    console.error('Quiz generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate quiz' },
      { status: 500 }
    );
  }
}
