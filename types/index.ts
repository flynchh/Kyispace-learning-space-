export type Role = 'ADMIN' | 'USER' | 'GUEST';
export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD' | 'INSANE';
export type QuizMode = 'STUDY' | 'EXAM';

export type Topic = {
  id: string;
  name: string;
  category: string;
  icon: string;
  description: string;
  order: number;
};

export type QuizQuestion = {
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
};

export type QuizSession = {
  id: string;
  topic: string;
  difficulty: Difficulty;
  mode: QuizMode;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number;
  createdAt: Date;
};

export type UserStats = {
  totalQuizzes: number;
  averageScore: number;
  studyStreak: number;
  topicMastery: Record<string, number>;
  weakAreas: string[];
};
